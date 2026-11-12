import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  MapPin,
  X,
  Search,
  RotateCcw,
  BookOpen,
  Leaf,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Layers,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Users,
  Mail,
  GraduationCap,
} from "lucide-react";
import photo from "@/assets/peace-circle.jpg";
import workshop from "@/assets/peace-workshop.jpg";
import mural from "@/assets/peace-mural.jpg";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  mapCategoryColor,
  mapExperiences,
  regionOf,
  CATEGORY_DESCRIPTIONS,
  matchesExperienceSearch,
  mapRegions,
  REGION_COLORS,
} from "@/lib/map-data";
import { categories } from "@/lib/peace-data";
import { ColombiaMap } from "./colombia-map";
import "./peace-map.css";

const cardImages = [photo, workshop, mural];

interface ExperienceMapProps {
  /** Id numérico de la experiencia a enfocar al llegar desde otra página. */
  focusNumericId?: number | undefined;
}

export function ExperienceMap({ focusNumericId }: ExperienceMapProps = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [region, setRegion] = useState("Todas");
  const [legalNature, setLegalNature] = useState("Todas");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCanvasLegend, setShowCanvasLegend] = useState(false);
  const [isExplorerMinimized, setIsExplorerMinimized] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<"category" | "region" | "nature" | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (focusNumericId) {
      const target = mapExperiences.find((experience) => experience.numericId === focusNumericId);
      if (target) return target.id;
    }
    return mapExperiences[0]?.id ?? null;
  });
  const [openId, setOpenId] = useState<string | null>(null);

  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const legendRef = useRef<HTMLDivElement | null>(null);

  // Enlace profundo desde "Nuestra red" (/?exp=ID): enfocar esa experiencia.
  useEffect(() => {
    if (!focusNumericId) return;
    const target = mapExperiences.find((experience) => experience.numericId === focusNumericId);
    if (target) setSelectedId(target.id);
  }, [focusNumericId]);

  // Cerrar desplegables al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
      if (legendRef.current && !legendRef.current.contains(e.target as Node)) {
        setShowCanvasLegend(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtrado reactivo de experiencias
  const filteredExperiences = useMemo(() => {
    return mapExperiences.filter((exp) => {
      const matchSearch = matchesExperienceSearch(exp, searchQuery);
      const matchCategory = category === "Todas" || exp.category === category;
      const matchRegion = region === "Todas" || regionOf(exp) === region;
      const matchNature = legalNature === "Todas" || exp.legalNature === legalNature;
      return matchSearch && matchCategory && matchRegion && matchNature;
    });
  }, [searchQuery, category, region, legalNature]);

  // Sincronizar selección con el resultado de filtros
  useEffect(() => {
    if (filteredExperiences.length === 0) {
      setSelectedId(null);
    } else if (selectedId && !filteredExperiences.some((e) => e.id === selectedId)) {
      setSelectedId(filteredExperiences[0]?.id ?? null);
    }
  }, [filteredExperiences, selectedId]);

  // Conteos
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const exp of mapExperiences) {
      counts[exp.category] = (counts[exp.category] || 0) + 1;
    }
    return counts;
  }, []);

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const exp of mapExperiences) {
      const reg = regionOf(exp);
      counts[reg] = (counts[reg] || 0) + 1;
    }
    return counts;
  }, []);

  const natureCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const exp of mapExperiences) {
      counts[exp.legalNature] = (counts[exp.legalNature] || 0) + 1;
    }
    return counts;
  }, []);

  const selected = mapExperiences.find((experience) => experience.id === selectedId) ?? null;
  const open = mapExperiences.find((experience) => experience.id === openId) ?? null;

  const handleResetFilters = () => {
    setSearchQuery("");
    setCategory("Todas");
    setRegion("Todas");
    setLegalNature("Todas");
    setShowSuggestions(false);
    setOpenAccordion(null);
    if (mapExperiences.length > 0) {
      setSelectedId(mapExperiences[0]?.id ?? null);
    }
  };

  const toggleAccordion = (tab: "category" | "region" | "nature") => {
    setOpenAccordion((prev) => (prev === tab ? null : tab));
  };

  return (
    <section id="mapa" className="pmap-outer-section" aria-label="Explorador del Territorio Escolar">
      {/* Elementos botánicos decorativos de fondo en las esquinas */}
      <svg
        className="botanical-leaf botanical-top-left"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 0C60 10 110 50 130 110C110 120 70 120 30 90C10 75 0 40 0 0Z"
          fill="currentColor"
        />
        <path
          d="M10 20C55 35 90 70 105 115M30 50C55 60 75 80 85 105"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
      </svg>
      <svg
        className="botanical-leaf botanical-bottom-right"
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M180 180C120 170 70 130 50 70C70 60 110 60 150 90C170 105 180 140 180 180Z"
          fill="currentColor"
        />
        <path
          d="M170 160C125 145 90 110 75 65M150 130C125 120 105 100 95 75"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
      </svg>

      <div className="pmap-wide-container">
        {/* Tarjeta principal contenedora con bordes redondeados y formato panorámico */}
        <div className="pmap-card">
          {/* 1. Lienzo del Mapa de Colombia */}
          <div className="pmap-stage-canvas">
            <ColombiaMap
              selectedId={selectedId}
              onSelect={setSelectedId}
              filteredExperiences={filteredExperiences}
              activeCategory={category}
              onSelectCategory={setCategory}
            />
          </div>

          {/* 2. Botón flotante superior "Leyenda" con desplazamiento dinámico */}
          <div
            className="pmap-canvas-legend-wrap"
            ref={legendRef}
            style={{
              left: isExplorerMinimized ? "190px" : "395px",
            }}
          >
            <button
              type="button"
              className={`pmap-legend-btn ${showCanvasLegend ? "is-open" : ""}`}
              onClick={() => setShowCanvasLegend((prev) => !prev)}
              aria-expanded={showCanvasLegend}
              aria-label="Alternar leyenda de metodologías"
            >
              <Layers size={14} className="text-primary" />
              <span>Leyenda</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${showCanvasLegend ? "rotate-180" : ""}`}
              />
            </button>

            {showCanvasLegend && (
              <div className="pmap-legend-popover">
                <div className="popover-header">
                  <strong>Metodologías Pedagógicas</strong>
                  <button
                    type="button"
                    className="popover-close"
                    onClick={() => setShowCanvasLegend(false)}
                    aria-label="Cerrar leyenda"
                  >
                    <X size={13} />
                  </button>
                </div>
                <div className="popover-list">
                  {categories.map((cat, idx) => {
                    const isSelected = category === cat;
                    const count = categoryCounts[cat] || 0;
                    return (
                      <button
                        key={cat}
                        type="button"
                        className={`popover-row pmap-c${idx} ${isSelected ? "is-active" : ""}`}
                        onClick={() => {
                          setCategory(isSelected ? "Todas" : cat);
                        }}
                      >
                        <span className="popover-dot" />
                        <span className="popover-name">{cat}</span>
                        <span className="popover-count">{count}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="popover-symbology">
                  <div className="popover-subhead">Regiones naturales</div>
                  {mapRegions.map((naturalRegion) => (
                    <div className="sym-item" key={naturalRegion.key}>
                      <span
                        className="sym-region"
                        style={{ background: REGION_COLORS[naturalRegion.key] }}
                      />
                      <span>{naturalRegion.key}</span>
                    </div>
                  ))}
                  <div className="popover-subhead">Simbología</div>
                  <div className="sym-item">
                    <span className="sym-ring" />
                    <span>Colegio seleccionado</span>
                  </div>
                  <div className="sym-item">
                    <span className="sym-line" />
                    <span>Límites departamentales</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Tarjeta flotante izquierda: Explorador (Minimizable) */}
          {isExplorerMinimized ? (
            <button
              type="button"
              className="explorer-minimized-pill"
              onClick={() => setIsExplorerMinimized(false)}
              title="Abrir explorador de colegios y filtros"
              aria-label="Abrir explorador"
            >
              <span className="badge-pin-icon">
                <MapPin size={12} />
              </span>
              <span className="font-bold text-[12px]">Explorador</span>
              <span className="minimized-count">{filteredExperiences.length}</span>
              <ChevronRight size={14} className="text-primary" />
            </button>
          ) : (
            <div className="explorer-card" role="search" aria-label="Buscador y filtros del mapa">
              {/* Barra superior con botón de minimizar */}
              <div className="explorer-card-header">
                <div className="explorer-badge">
                  <span className="badge-pin-icon">
                    <MapPin size={12} />
                  </span>
                  <span>Explorador del Territorio Escolar</span>
                </div>
                <button
                  type="button"
                  className="explorer-minimize-btn"
                  onClick={() => setIsExplorerMinimized(true)}
                  title="Minimizar panel explorador"
                  aria-label="Minimizar panel"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>

              {/* Título de sección */}
              <h2 className="explorer-title">
                Descubre, explora y
                <br />
                construye <span className="highlight-peace">paz</span>.
              </h2>
              <p className="explorer-desc">
                Conoce la red de colegios y sus experiencias en todo el país.
              </p>

              {/* Buscador interactivo en formato píldora */}
              <div className="explorer-search" ref={searchBoxRef}>
                <div className="search-input-pill">
                  <Search size={15} className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar por colegio, ciudad, sector..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => {
                      if (searchQuery.trim().length > 0) setShowSuggestions(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && filteredExperiences[0]) {
                        setSelectedId(filteredExperiences[0]?.id ?? null);
                        setShowSuggestions(false);
                      } else if (e.key === "Escape") {
                        setShowSuggestions(false);
                      }
                    }}
                    aria-label="Buscar por colegio, ciudad, sector"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="search-clear-btn"
                      onClick={() => {
                        setSearchQuery("");
                        setShowSuggestions(false);
                      }}
                      aria-label="Borrar búsqueda"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                {/* Sugerencias en tiempo real */}
                {showSuggestions && searchQuery.trim().length > 0 && (
                  <div className="explorer-suggestions-dropdown">
                    <div className="sugg-header">
                      <span>{filteredExperiences.length} colegios encontrados</span>
                      <button
                        type="button"
                        onClick={() => setShowSuggestions(false)}
                        className="text-primary text-[11px] hover:underline"
                      >
                        Cerrar
                      </button>
                    </div>
                    {filteredExperiences.length === 0 ? (
                      <div className="sugg-empty">
                        No encontramos colegios para &ldquo;{searchQuery}&rdquo;.
                      </div>
                    ) : (
                      <div className="sugg-list">
                        {filteredExperiences.slice(0, 5).map((exp) => (
                          <button
                            key={exp.id}
                            type="button"
                            className="sugg-item"
                            onClick={() => {
                              setSelectedId(exp.id);
                              setShowSuggestions(false);
                            }}
                          >
                            <span className={`sugg-dot pmap-c${mapCategoryColor(exp.category)}`} />
                            <div className="sugg-text">
                              <strong>{exp.school}</strong>
                              <small>
                                {exp.city}, {exp.department} · {exp.category}
                              </small>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Acordeones de Filtros interactivos */}
              <div className="explorer-accordions">
                {/* Acordeón 1: Metodología pedagógica */}
                <div className="accordion-block">
                  <button
                    type="button"
                    className={`accordion-trigger ${openAccordion === "category" ? "is-open" : ""}`}
                    onClick={() => toggleAccordion("category")}
                    aria-expanded={openAccordion === "category"}
                  >
                    <div className="trigger-left">
                      <BookOpen size={15} className="text-primary" />
                      <span>Metodología pedagógica</span>
                    </div>
                    <ChevronRight
                      size={14}
                      className={`trigger-arrow ${openAccordion === "category" ? "rotate-90" : ""}`}
                    />
                  </button>
                  {openAccordion === "category" && (
                    <div className="accordion-content animate-in fade-in duration-150">
                      <div className="chips-list">
                        <button
                          type="button"
                          className={`chip-pill ${category === "Todas" ? "is-selected" : ""}`}
                          onClick={() => setCategory("Todas")}
                        >
                          Todas ({mapExperiences.length})
                        </button>
                        {categories.map((cat, idx) => {
                          const isCurrent = category === cat;
                          const count = categoryCounts[cat] || 0;
                          return (
                            <button
                              key={cat}
                              type="button"
                              className={`chip-pill pmap-c${idx} ${isCurrent ? "is-selected" : ""}`}
                              onClick={() => setCategory(isCurrent ? "Todas" : cat)}
                            >
                              <i className="chip-dot" />
                              <span>{cat}</span>
                              <small>({count})</small>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Acordeón 2: Región geográfica */}
                <div className="accordion-block">
                  <button
                    type="button"
                    className={`accordion-trigger ${openAccordion === "region" ? "is-open" : ""}`}
                    onClick={() => toggleAccordion("region")}
                    aria-expanded={openAccordion === "region"}
                  >
                    <div className="trigger-left">
                      <MapPin size={15} className="text-primary" />
                      <span>Región geográfica</span>
                    </div>
                    <ChevronRight
                      size={14}
                      className={`trigger-arrow ${openAccordion === "region" ? "rotate-90" : ""}`}
                    />
                  </button>
                  {openAccordion === "region" && (
                    <div className="accordion-content animate-in fade-in duration-150">
                      <div className="chips-list">
                        {(["Todas", "Andina", "Caribe", "Pacífico"] as const).map((reg) => {
                          const isCurrent = region === reg;
                          const count = regionCounts[reg] || 0;
                          return (
                            <button
                              key={reg}
                              type="button"
                              className={`chip-pill ${isCurrent ? "is-selected" : ""}`}
                              onClick={() => setRegion(reg)}
                            >
                              <span>{reg}</span>
                              {reg !== "Todas" && <small>({count})</small>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Acordeón 3: Naturaleza jurídica */}
                <div className="accordion-block">
                  <button
                    type="button"
                    className={`accordion-trigger ${openAccordion === "nature" ? "is-open" : ""}`}
                    onClick={() => toggleAccordion("nature")}
                    aria-expanded={openAccordion === "nature"}
                  >
                    <div className="trigger-left">
                      <Leaf size={15} className="text-primary" />
                      <span>Naturaleza</span>
                    </div>
                    <ChevronRight
                      size={14}
                      className={`trigger-arrow ${openAccordion === "nature" ? "rotate-90" : ""}`}
                    />
                  </button>
                  {openAccordion === "nature" && (
                    <div className="accordion-content animate-in fade-in duration-150">
                      <div className="chips-list">
                        {(["Todas", "Pública", "Privada"] as const).map((nat) => {
                          const isCurrent = legalNature === nat;
                          const count = natureCounts[nat] || 0;
                          return (
                            <button
                              key={nat}
                              type="button"
                              className={`chip-pill ${isCurrent ? "is-selected" : ""}`}
                              onClick={() => setLegalNature(nat)}
                            >
                              <span>{nat}</span>
                              {nat !== "Todas" && <small>({count})</small>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botón principal oscuro "Limpiar filtros" */}
              <button
                type="button"
                className="btn-clean-filters"
                onClick={handleResetFilters}
                title="Restablecer todos los filtros"
              >
                <RotateCcw size={14} />
                <span>Limpiar filtros</span>
              </button>
            </div>
          )}

          {/* 4. Tarjeta flotante derecha: Vista previa del Colegio seleccionado */}
          {selected && (
            <div
              className="school-preview-card"
              role="region"
              aria-label={`Ficha de ${selected.school}`}
            >
              <button
                type="button"
                className="preview-close-btn"
                onClick={() => setSelectedId(null)}
                aria-label="Cerrar vista previa"
              >
                <X size={15} />
              </button>

              <div className="preview-image-wrap">
                <img
                  src={cardImages[(selected.numericId - 1) % cardImages.length]}
                  alt={selected.school}
                  className="preview-image"
                />
              </div>

              <div className="preview-body">
                <h3 className="preview-school-name">{selected.school}</h3>
                <p className="preview-location">
                  <MapPin size={12} className="location-pin" />
                  <span>
                    {selected.city}, {selected.department}
                  </span>
                </p>

                <div className="preview-meta">
                  <div className="meta-item">
                    <strong>Metodología:</strong> <span>{selected.category}</span>
                  </div>
                  <div className="meta-item">
                    <strong>Naturaleza:</strong> <span>{selected.legalNature}</span>
                  </div>
                </div>

                <div className="preview-actions">
                  <button
                    type="button"
                    className="btn-view-more"
                    onClick={() => setOpenId(selected.id)}
                    title="Ver ficha rápida del colegio"
                  >
                    <span>Ver más</span>
                    <ArrowRight size={13} />
                  </button>
                  <Link
                    to="/experiencias"
                    search={{ id: selected.numericId }}
                    className="btn-preview-link"
                    title={`Ir a la experiencia de ${selected.school}`}
                  >
                    <span>Ir a la experiencia</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 5. Barra inferior flotante de Estadísticas destacadas */}
          <div className="pmap-stats-pill">
            <div className="stat-col">
              <div className="stat-icon-wrap">
                <Building2 size={18} />
              </div>
              <div className="stat-text">
                <strong>21</strong>
                <span>Colegios</span>
              </div>
            </div>

            <div className="stat-divider" />

            <div className="stat-col">
              <div className="stat-icon-wrap">
                <MapPin size={18} />
              </div>
              <div className="stat-text">
                <strong>8</strong>
                <span>Departamentos</span>
              </div>
            </div>

            <div className="stat-divider" />

            <div className="stat-col">
              <div className="stat-icon-wrap">
                <Users size={18} />
              </div>
              <div className="stat-text">
                <strong>Conectando</strong>
                <span>por la paz</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ficha Completa de la Experiencia */}
      <Dialog
        open={Boolean(open)}
        onOpenChange={(value) => {
          if (!value) setOpenId(null);
        }}
      >
        <DialogContent className="dialog-content max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogTitle className="text-lg font-bold leading-snug">{open?.name}</DialogTitle>
          <DialogDescription className="text-sm font-medium text-foreground">
            {open?.school} · {open?.city}, {open?.department} ({open?.legalNature})
          </DialogDescription>
          {open && (
            <div className="space-y-3 pt-2 text-sm">
              <div className="field">
                <h4 className="text-xs uppercase text-muted-foreground font-semibold">
                  Metodología y Enfoque Pedagógico
                </h4>
                <p className="font-medium text-foreground flex items-center gap-2 mt-1">
                  <span
                    className={`w-2.5 h-2.5 rounded-full pmap-c${mapCategoryColor(open.category)} inline-block bg-[var(--marker,var(--primary))]`}
                  />
                  {open.category}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {CATEGORY_DESCRIPTIONS[open.category]}
                </p>
              </div>

              <div className="field">
                <h4 className="text-xs uppercase text-muted-foreground font-semibold">
                  Resumen de la Experiencia Escolar
                </h4>
                <p className="text-foreground leading-relaxed mt-1">{open.summary}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t text-xs">
                <div className="bg-muted/40 p-2.5 rounded border">
                  <span className="font-semibold block text-muted-foreground mb-0.5 flex items-center gap-1.5">
                    <Building2 size={12} className="text-primary" /> Rectoría
                  </span>
                  <span className="font-medium text-foreground">{open.rector}</span>
                </div>
                <div className="bg-muted/40 p-2.5 rounded border">
                  <span className="font-semibold block text-muted-foreground mb-0.5 flex items-center gap-1.5">
                    <GraduationCap size={12} className="text-primary" /> Docente Tutor / Acompañante
                  </span>
                  <span className="font-medium text-foreground">{open.tutor}</span>
                </div>
              </div>

              <div className="bg-muted/40 p-2.5 rounded border text-xs">
                <span className="font-semibold block text-muted-foreground mb-0.5 flex items-center gap-1.5">
                  <Users size={12} className="text-primary" /> Voceros Estudiantiles
                </span>
                <span className="text-foreground">{open.spokespersons}</span>
              </div>

              <div className="pt-3 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs text-muted-foreground">
                <div className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-1.5">
                    <Mail size={12} className="text-primary" />
                    Contacto: <strong className="text-foreground">{open.institutionalEmail}</strong>
                  </span>
                  <span className="font-semibold text-primary">Región {regionOf(open)}</span>
                </div>

                <Link
                  to="/experiencias"
                  search={{ id: open.numericId }}
                  className="btn-experience-redirect"
                  title={`Ir al catálogo completo de la experiencia de ${open.school}`}
                >
                  <span>Ir a la experiencia</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
