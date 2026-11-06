import { geoCentroid, geoMercator, geoPath } from "d3-geo";
import type { FeatureCollection } from "geojson";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Maximize2, Minus, Plus, SearchX } from "lucide-react";
import { colombia } from "@/lib/colombia-geo";
import { colombiaDepartments } from "@/lib/colombia-departments-geo";
import {
  mapCategoryColor,
  mapExperiences,
  mapRegions,
  regionOf,
  type MapExperience,
} from "@/lib/map-data";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const PAD = 52;
const MIN_K = 1;
const MAX_K = 7;
const FOCUS_K = 2.6;
const LABEL_MIN_K = 1.35;
const REGION_FADE_K = 1.8;
const REGION_MAX_K = 2.9;
const DEPT_LINE_MIN_K = 1.4;
const DEPT_LINE_MAX_K = 2.0;
const DEPT_LABEL_MIN_K = 2.2;
const DEPT_LABEL_MAX_K = 2.8;

const fade = (k: number, min: number, max: number) =>
  Math.max(0, Math.min(1, (k - min) / (max - min)));

interface NeighborLabel {
  name: string;
  lng: number;
  lat: number;
  type?: "country" | "water";
}

const NEIGHBOR_LABELS: NeighborLabel[] = [
  { name: "PANAMÁ", lng: -78.8, lat: 8.6, type: "country" },
  { name: "VENEZUELA", lng: -70.2, lat: 7.9, type: "country" },
  { name: "BRASIL", lng: -68.4, lat: -0.7, type: "country" },
  { name: "PERÚ", lng: -74.8, lat: -3.5, type: "country" },
  { name: "ECUADOR", lng: -78.7, lat: 0.1, type: "country" },
  { name: "Océano Pacífico", lng: -80.6, lat: 4.2, type: "water" },
  { name: "Mar Caribe", lng: -74.6, lat: 12.2, type: "water" },
];

interface View {
  k: number;
  x: number;
  y: number;
}

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
  filteredExperiences: MapExperience[];
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export function ColombiaMap({ selectedId, onSelect, filteredExperiences }: Props) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ px: number; py: number; x: number; y: number } | null>(null);
  const lastSelectionRef = useRef<string | null>(mapExperiences[0]?.id ?? null);
  const wheelNoticeTimeoutRef = useRef<number | null>(null);

  const [size, setSize] = useState({ w: 1200, h: 780 });
  const [view, setView] = useState<View>({ k: 1, x: 0, y: 0 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [showWheelNotice, setShowWheelNotice] = useState(false);

  const filteredIdSet = useMemo(
    () => new Set(filteredExperiences.map((e) => e.id)),
    [filteredExperiences],
  );

  useIsomorphicLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const clampView = useCallback(
    (next: View): View => {
      const k = Math.min(MAX_K, Math.max(MIN_K, next.k));
      const minX = size.w * (1 - k);
      const minY = size.h * (1 - k);
      return {
        k,
        x: Math.min(0, Math.max(minX, next.x)),
        y: Math.min(0, Math.max(minY, next.y)),
      };
    },
    [size.w, size.h],
  );

  const focusOn = useCallback(
    (bx: number, by: number, k: number): View =>
      clampView({ k, x: size.w / 2 - k * bx, y: size.h / 2 - k * by }),
    [clampView, size.w, size.h],
  );

  const zoomAt = useCallback(
    (factor: number, cx: number, cy: number) => {
      setView((current) => {
        const k = Math.min(MAX_K, Math.max(MIN_K, current.k * factor));
        const ratio = k / current.k;
        return clampView({
          k,
          x: cx - ratio * (cx - current.x),
          y: cy - ratio * (cy - current.y),
        });
      });
    },
    [clampView],
  );

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        setShowWheelNotice(true);
        if (wheelNoticeTimeoutRef.current) {
          window.clearTimeout(wheelNoticeTimeoutRef.current);
        }
        wheelNoticeTimeoutRef.current = window.setTimeout(() => {
          setShowWheelNotice(false);
        }, 2200);
        return;
      }

      event.preventDefault();
      const rect = el.getBoundingClientRect();
      zoomAt(event.deltaY < 0 ? 1.3 : 0.77, event.clientX - rect.left, event.clientY - rect.top);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelNoticeTimeoutRef.current) {
        window.clearTimeout(wheelNoticeTimeoutRef.current);
      }
    };
  }, [zoomAt]);

  const base = useMemo(() => {
    const collection = {
      type: "FeatureCollection",
      features: [
        colombia,
        ...mapExperiences.map((experience) => ({
          type: "Feature" as const,
          properties: {},
          geometry: {
            type: "Point" as const,
            coordinates: [experience.lng, experience.lat] as [number, number],
          },
        })),
      ],
    } as FeatureCollection;
    const projection = geoMercator().fitExtent(
      [
        [PAD, PAD],
        [size.w - PAD, size.h - PAD],
      ],
      collection,
    );
    const path = geoPath(projection);
    return {
      land: path(colombia) ?? "",
      points: mapExperiences.map((experience) => {
        const projected = projection([experience.lng, experience.lat]) ?? [0, 0];
        return { id: experience.id, bx: projected[0], by: projected[1] };
      }),
      regions: mapRegions.map((region) => {
        const projected = projection([region.lng, region.lat]) ?? [0, 0];
        return { key: region.key, bx: projected[0], by: projected[1] };
      }),
      departments: colombiaDepartments.features.map((feature) => ({
        name: feature.properties.name,
        d: path(feature) ?? "",
      })),
      departmentLabels: colombiaDepartments.features
        .map((feature) => {
          const projected = projection(geoCentroid(feature));
          if (!projected || !Number.isFinite(projected[0]) || !Number.isFinite(projected[1])) {
            return null;
          }
          return { name: feature.properties.name, bx: projected[0], by: projected[1] };
        })
        .filter((item): item is { name: string; bx: number; by: number } => item !== null),
      neighbors: NEIGHBOR_LABELS.map((item) => {
        const projected = projection([item.lng, item.lat]) ?? [0, 0];
        return { name: item.name, bx: projected[0], by: projected[1], type: item.type };
      }),
    };
  }, [size.w, size.h]);

  useIsomorphicLayoutEffect(() => {
    if (!selectedId || selectedId === lastSelectionRef.current) return;
    lastSelectionRef.current = selectedId;
    const point = base.points.find((item) => item.id === selectedId);
    if (!point) return;
    setView((current) => focusOn(point.bx, point.by, Math.max(current.k, FOCUS_K)));
  }, [selectedId, base.points, focusOn]);

  const project = (bx: number, by: number) => ({
    left: view.x + view.k * bx,
    top: view.y + view.k * by,
  });

  const reset = () => {
    setView({ k: 1, x: 0, y: 0 });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.detail > 1) {
      event.preventDefault();
    }
    dragRef.current = { px: event.clientX, py: event.clientY, x: view.x, y: view.y };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    zoomAt(1.5, event.clientX - rect.left, event.clientY - rect.top);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = dragRef.current;
    if (!start) return;
    const dx = event.clientX - start.px;
    const dy = event.clientY - start.py;
    setView((current) => clampView({ k: current.k, x: start.x + dx, y: start.y + dy }));
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const hoveredPoint = hovered ? base.points.find((point) => point.id === hovered) : undefined;
  const hoveredExperience = hovered
    ? mapExperiences.find((experience) => experience.id === hovered)
    : undefined;
  const selectedExperience = mapExperiences.find((experience) => experience.id === selectedId);
  const selectedRegion = selectedExperience ? regionOf(selectedExperience) : null;
  const showLabels = view.k >= LABEL_MIN_K;

  const regionOpacity =
    view.k <= REGION_FADE_K
      ? 1
      : Math.max(0, 1 - (view.k - REGION_FADE_K) / (REGION_MAX_K - REGION_FADE_K));
  const deptLineOpacity = fade(view.k, DEPT_LINE_MIN_K, DEPT_LINE_MAX_K);
  const deptLabelOpacity = fade(view.k, DEPT_LABEL_MIN_K, DEPT_LABEL_MAX_K);

  // Agrupamiento inteligente de etiquetas para evitar colisiones de texto (ej. Bogotá)
  const renderedCities = new Set<string>();

  return (
    <div
      className={`pmap-stage ${dragging ? "is-dragging" : ""}`}
      ref={stageRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => setHovered(null)}
      onDoubleClick={onDoubleClick}
    >
      <svg
        className="pmap-svg"
        viewBox={`0 0 ${size.w} ${size.h}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="pmap-country-clip">
            <path d={base.land} />
          </clipPath>

          {/* Sombra suave de relieve natural sobre Colombia */}
          <filter id="pmap-land-shadow" x="-5%" y="-5%" width="112%" height="114%">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="10"
              floodColor="#0f4528"
              floodOpacity="0.14"
            />
          </filter>

          {/* Gradiente natural esmeralda suave para el territorio colombiano */}
          <linearGradient id="pmap-land-gradient" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#eaf6ee" />
            <stop offset="45%" stopColor="#d8f0df" />
            <stop offset="100%" stopColor="#c7e6d0" />
          </linearGradient>
        </defs>

        <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
          {/* Capa de sombra de Colombia */}
          <path className="pmap-land-shadow" d={base.land} filter="url(#pmap-land-shadow)" />

          {/* Masa continental de Colombia con gradiente natural */}
          <path className="pmap-land" d={base.land} fill="url(#pmap-land-gradient)" />

          {/* Líneas divisorias departamentales con trazo punteado sutil */}
          {deptLineOpacity > 0.02 && (
            <g
              className="pmap-depts"
              clipPath="url(#pmap-country-clip)"
              style={{ opacity: deptLineOpacity }}
            >
              {base.departments.map((department) => (
                <path key={department.name} d={department.d} />
              ))}
            </g>
          )}
        </g>
      </svg>

      {/* Rótulos geográficos de países vecinos y mares */}
      {base.neighbors.map((neighbor) => {
        const position = project(neighbor.bx, neighbor.by);
        return (
          <span
            key={`neighbor-${neighbor.name}`}
            className={`pmap-neighbor-label ${neighbor.type === "water" ? "is-water" : ""}`}
            style={{ left: position.left, top: position.top }}
          >
            {neighbor.name}
          </span>
        );
      })}

      {/* Macro-regiones naturales */}
      {regionOpacity > 0.04 &&
        base.regions.map((region) => {
          const position = project(region.bx, region.by);
          const activeRegion = region.key === selectedRegion;
          return (
            <span
              key={`region-${region.key}`}
              className={`pmap-region${activeRegion ? " is-active" : ""}`}
              style={{
                left: position.left,
                top: position.top,
                opacity: activeRegion ? 1 : regionOpacity,
              }}
            >
              {region.key}
            </span>
          );
        })}

      {/* Rótulos sutiles de departamentos (solo visibles con zoom medio-alto) */}
      {deptLabelOpacity > 0.05 &&
        base.departmentLabels.map((department) => {
          const position = project(department.bx, department.by);
          return (
            <span
              key={`dept-${department.name}`}
              className="pmap-dept-label"
              style={{
                left: position.left,
                top: position.top,
                opacity: deptLabelOpacity,
              }}
            >
              {department.name}
            </span>
          );
        })}

      {/* Marcadores circulares de experiencias de paz */}
      {mapExperiences.map((experience) => {
        const point = base.points.find((item) => item.id === experience.id);
        if (!point) return null;
        const position = project(point.bx, point.by);
        const active = experience.id === selectedId;
        const isMatch = filteredIdSet.has(experience.id);

        return (
          <button
            key={experience.id}
            type="button"
            className={`pmap-marker pmap-c${mapCategoryColor(experience.category)}${
              active ? " is-active" : ""
            }${!isMatch ? " is-dimmed" : ""}`}
            style={{ left: position.left, top: position.top }}
            aria-label={`${experience.school} - ${experience.name}, ${experience.city}`}
            aria-pressed={active}
            disabled={!isMatch}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onSelect(experience.id)}
            onMouseEnter={() => {
              if (isMatch) setHovered(experience.id);
            }}
            onMouseLeave={() =>
              setHovered((current) => (current === experience.id ? null : current))
            }
            onFocus={() => {
              if (isMatch) setHovered(experience.id);
            }}
            onBlur={() => setHovered((current) => (current === experience.id ? null : current))}
          />
        );
      })}

      {/* Rótulos ordenados de colegios: sin colisiones caóticas */}
      {mapExperiences.map((experience) => {
        const point = base.points.find((item) => item.id === experience.id);
        if (!point) return null;
        const active = experience.id === selectedId;
        const isHovered = experience.id === hovered;
        const isMatch = filteredIdSet.has(experience.id);

        if (!isMatch) return null;

        // Si está activo o sobrevolado, SIEMPRE se muestra la etiqueta destacada
        if (active || isHovered) {
          const position = project(point.bx, point.by);
          return (
            <span
              key={`label-active-${experience.id}`}
              className={`pmap-label pmap-c${mapCategoryColor(experience.category)} is-active`}
              style={{ left: position.left, top: position.top }}
            >
              {experience.school}
            </span>
          );
        }

        // Si no hay suficiente zoom, no saturar
        if (!showLabels) return null;

        // Evitar amontonar múltiples etiquetas sobre el mismo municipio (ej. Bogotá)
        const cityKey = `${experience.city}-${Math.round(point.bx / 25)}-${Math.round(point.by / 25)}`;
        if (renderedCities.has(cityKey) && view.k < 2.5) {
          return null;
        }
        renderedCities.add(cityKey);

        const position = project(point.bx, point.by);
        const labelText =
          experience.school.length > 30 ? experience.city : experience.school;

        return (
          <span
            key={`label-${experience.id}`}
            className={`pmap-label pmap-c${mapCategoryColor(experience.category)}`}
            style={{ left: position.left, top: position.top }}
          >
            {labelText}
          </span>
        );
      })}

      {/* Tooltip flotante al pasar el cursor */}
      {hoveredPoint && hoveredExperience && filteredIdSet.has(hoveredExperience.id) && (
        <div className="pmap-tip" style={project(hoveredPoint.bx, hoveredPoint.by)}>
          <strong>{hoveredExperience.school}</strong>
          <span className="text-xs opacity-90 block">{hoveredExperience.name}</span>
          <span className="text-[11px] opacity-75 block mt-0.5">
            {hoveredExperience.city}, {hoveredExperience.department} · Región{" "}
            {regionOf(hoveredExperience)}
          </span>
        </div>
      )}

      {/* Estado vacío cuando no hay resultados de búsqueda */}
      {filteredExperiences.length === 0 && (
        <div className="pmap-empty-overlay">
          <SearchX size={32} className="mx-auto text-primary/70 mb-2" />
          <h4>Sin colegios encontrados</h4>
          <p>Ninguna experiencia coincide con tu búsqueda o filtros actuales.</p>
        </div>
      )}

      {/* Controles de navegación y zoom en tarjeta compacta */}
      <div className="pmap-controls">
        <button
          type="button"
          className="pmap-zoom"
          title="Acercar mapa (+)"
          aria-label="Acercar mapa"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => zoomAt(1.4, size.w / 2, size.h / 2)}
        >
          <Plus size={16} />
        </button>
        <button
          type="button"
          className="pmap-zoom"
          title="Alejar mapa (-)"
          aria-label="Alejar mapa"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => zoomAt(0.71, size.w / 2, size.h / 2)}
        >
          <Minus size={16} />
        </button>
        <button
          type="button"
          className="pmap-zoom"
          title="Restablecer vista general de Colombia"
          aria-label="Restablecer vista general de Colombia"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={reset}
        >
          <Maximize2 size={15} />
        </button>
      </div>

      {/* Aviso amigable para zoom */}
      {showWheelNotice && (
        <div className="pmap-wheel-notice" role="status" aria-live="polite">
          💡 Usa <strong>Ctrl + rueda</strong> para hacer zoom en el mapa, o usa los botones{" "}
          <strong>+</strong> y <strong>−</strong>
        </div>
      )}
    </div>
  );
}
