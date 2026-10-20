import { useState } from "react";
import { ArrowUpRight, MapPin, X, Building2, Users, Mail, Phone, Sparkles } from "lucide-react";
import bear from "@/assets/peace-bear.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DEMO_MAP_NOTICE, mapCategoryColor, mapExperiences, regionOf } from "@/lib/map-data";
import { ColombiaMap } from "./colombia-map";
import "./peace-map.css";

export function ExperienceMap() {
  const [selectedId, setSelectedId] = useState<string | null>(mapExperiences[0]?.id ?? null);
  const [openId, setOpenId] = useState<string | null>(null);

  const selected = mapExperiences.find((experience) => experience.id === selectedId) ?? null;
  const open = mapExperiences.find((experience) => experience.id === openId) ?? null;
  const regions = new Set(mapExperiences.map((experience) => regionOf(experience))).size;

  return (
    <section className="pmap" aria-label="Mapa de experiencias del encuentro">
      <div className="pmap-inner">
        <div className="pmap-side">
          <div className="pmap-step">
            <span className="num">01</span> Colombia · Colegios participantes
          </div>
          <div className="pmap-encuentro">II Encuentro 2026</div>
          <h2>
            Explora las historias
            <br />
            que construyen <em>paz</em>.
          </h2>
          <p className="pmap-lead">Haz clic en un punto para descubrir cada colegio y experiencia.</p>
          <div className="pmap-stats">
            <span>
              <strong>{mapExperiences.length}</strong> experiencias
            </span>
            <span>
              <strong>{regions}</strong> regiones
            </span>
          </div>
          <div className="pmap-bear">
            <img src={bear} alt="" width="46" height="50" />
            <p>Navega por el mapa y conoce a sus protagonistas.</p>
          </div>
          <p className="pmap-notice">{DEMO_MAP_NOTICE}</p>
        </div>

        <div className="pmap-stage-wrap">
          <div className="pmap-mobile-head">
            <span className="num">01</span>
            <div>
              <strong>Explora las historias que construyen paz</strong>
              <small>Colombia · II Encuentro 2026</small>
            </div>
          </div>
          <ColombiaMap selectedId={selectedId} onSelect={setSelectedId} />
          {selected && (
            <div className="pmap-summary">
              <button
                type="button"
                className="close"
                aria-label="Cerrar resumen"
                onClick={() => setSelectedId(null)}
              >
                <X size={15} />
              </button>
              <span className={`cat pmap-c${mapCategoryColor(selected.category)}`}>
                <i /> {selected.category}
              </span>
              <h3>{selected.name}</h3>
              <p className="text-xs font-semibold text-primary/90 mt-0.5">
                {selected.school} ({selected.legalNature})
              </p>
              <p className="meta">
                <MapPin size={12} /> {selected.city}, {selected.department} · Región {regionOf(selected)}
              </p>
              <p>{selected.summary}</p>
              <Button size="sm" onClick={() => setOpenId(selected.id)}>
                Ver ficha completa <ArrowUpRight />
              </Button>
            </div>
          )}
        </div>
      </div>

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
                  Metodología y Enfoque
                </h4>
                <p className="font-medium text-foreground">{open.category}</p>
              </div>

              <div className="field">
                <h4 className="text-xs uppercase text-muted-foreground font-semibold">
                  Resumen de la Experiencia
                </h4>
                <p className="text-foreground leading-relaxed">{open.summary}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t text-xs">
                <div className="bg-muted/40 p-2.5 rounded border">
                  <span className="font-semibold block text-muted-foreground mb-0.5">Rectoría</span>
                  <span className="font-medium text-foreground">{open.rector}</span>
                </div>
                <div className="bg-muted/40 p-2.5 rounded border">
                  <span className="font-semibold block text-muted-foreground mb-0.5">Docente Tutor / Acompañante</span>
                  <span className="font-medium text-foreground">{open.tutor}</span>
                </div>
              </div>

              <div className="bg-muted/40 p-2.5 rounded border text-xs">
                <span className="font-semibold block text-muted-foreground mb-0.5">Voceros Estudiantiles</span>
                <span className="text-foreground">{open.spokespersons}</span>
              </div>

              <div className="pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                <span>Contacto institucional: <strong className="text-foreground">{open.institutionalEmail}</strong></span>
                <span className="font-semibold text-primary">Región {regionOf(open)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
