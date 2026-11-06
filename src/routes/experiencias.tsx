import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { PeaceLayout, PageHeading, peaceHead } from "@/components/peace-layout";
import { ExperienceCard } from "@/components/peace-content";
import { ExperienceDialog } from "@/components/experience-dialog";
import { Button } from "@/components/ui/button";
import { categories, experiences } from "@/lib/peace-data";

interface ExperienciasSearch {
  id?: number;
  q?: string;
}

export const Route = createFileRoute("/experiencias")({
  validateSearch: (search: Record<string, unknown>): ExperienciasSearch => {
    const rawId = search.id;
    const numId = rawId !== undefined && rawId !== null ? Number(rawId) : undefined;
    return {
      id: Number.isFinite(numId) ? numId : undefined,
      q: typeof search.q === "string" ? search.q : undefined,
    };
  },
  head: () =>
    peaceHead(
      "Catálogo de experiencias",
      "Metodologías y fichas de sistematización para las 21 experiencias de paz de los colegios participantes.",
    ),
  component: Experiencias,
});

function Experiencias() {
  const search = Route.useSearch();
  const [category, setCategory] = useState("Todas");
  const [query, setQuery] = useState(search.q ?? "");
  const [selected, setSelected] = useState<number | null>(search.id ?? null);

  useEffect(() => {
    let targetId = search.id;
    if (!targetId && typeof window !== "undefined") {
      const param = new URLSearchParams(window.location.search).get("id");
      if (param && !isNaN(Number(param))) {
        targetId = Number(param);
      }
    }
    if (targetId) {
      setSelected(targetId);
      const found = experiences.find((e) => e.id === targetId);
      if (found) {
        setCategory("Todas");
      }
      const timer = setTimeout(() => {
        const el = document.getElementById(`exp-${targetId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [search.id]);

  const normalizedQuery = query.trim().toLocaleLowerCase("es");

  const shown = experiences.filter((e) => {
    const matchesCategory = category === "Todas" || e.category === category;
    const searchableText =
      `${e.name} ${e.category} ${e.school} ${e.city} ${e.department} ${e.description}`.toLocaleLowerCase(
        "es",
      );
    const matchesQuery = normalizedQuery === "" || searchableText.includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });

  return (
    <PeaceLayout>
      <PageHeading
        label="La paz se vive en la escuela"
        title="Experiencias que inspiran"
        description="21 experiencias sistematizadas de 20 colegios e instituciones en Colombia. Voces, metodologías y liderazgos que construyen cultura de paz."
      />

      <section className="section wrap">
        <div className="search-box">
          <Search size={17} />
          <input
            aria-label="Buscar experiencias"
            placeholder="Buscar por experiencia, colegio, ciudad o metodología…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="chips">
          {["Todas", ...categories].map((c) => (
            <Button
              key={c}
              size="sm"
              variant="outline"
              className={category === c ? "selected" : ""}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground my-2 px-1">
          <span>
            Mostrando <strong>{shown.length}</strong> de <strong>{experiences.length}</strong>{" "}
            experiencias
          </span>
          <span>
            Colegios públicos y privados de Bolívar, Nariño, Bogotá, Atlántico, La Guajira, Cauca y
            Sucre
          </span>
        </div>

        <div className="experience-grid">
          {shown.map((e) => (
            <div key={e.id} id={`exp-${e.id}`}>
              <ExperienceCard experience={e} onOpen={() => setSelected(e.id)} />
            </div>
          ))}
        </div>

        {shown.length === 0 && (
          <p className="no-results">
            No se encontraron experiencias que coincidan con &ldquo;{query}&rdquo;. Prueba con otra
            búsqueda o categoría.
          </p>
        )}

        <ExperienceDialog id={selected} onClose={() => setSelected(null)} />
      </section>
    </PeaceLayout>
  );
}
