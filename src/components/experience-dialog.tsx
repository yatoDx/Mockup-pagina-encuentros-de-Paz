import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { experiences } from '@/lib/peace-data';
import { Building2, MapPin, Mail, Phone, Users, Sparkles } from 'lucide-react';

export function ExperienceDialog({ id, onClose }: { id: number | null; onClose: () => void }) {
  const experience = experiences.find((item) => item.id === id);

  return (
    <Dialog open={Boolean(experience)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="dialog-content max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogTitle className="text-xl font-bold leading-snug">{experience?.name}</DialogTitle>
        <DialogDescription className="flex items-center gap-2 text-sm text-muted-foreground pt-1 pb-2">
          <Building2 size={15} />
          <span>{experience?.school}</span>
          <span>·</span>
          <span className="font-medium text-foreground">{experience?.legalNature}</span>
        </DialogDescription>

        {experience && (
          <div className="space-y-4 pt-2">
            <div className="field">
              <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                <Sparkles size={14} /> Metodología y Categoría
              </h4>
              <p className="font-medium text-foreground">{experience.category}</p>
            </div>

            <div className="field">
              <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                <MapPin size={14} /> Ubicación
              </h4>
              <p className="text-foreground">{experience.city}, {experience.department}</p>
            </div>

            <div className="field">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Descripción y Enfoque Pedagógico
              </h4>
              <p className="text-foreground text-sm leading-relaxed">{experience.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t">
              <div className="field bg-muted/30 p-2.5 rounded-lg border">
                <h4 className="text-xs font-semibold text-muted-foreground mb-1">Rectoría / Dirección</h4>
                {experience.rectors.map((r, i) => (
                  <p key={i} className="text-sm font-medium">
                    {r.name}
                    {r.phone && <span className="block text-xs text-muted-foreground">Tel: {r.phone}</span>}
                  </p>
                ))}
              </div>

              <div className="field bg-muted/30 p-2.5 rounded-lg border">
                <h4 className="text-xs font-semibold text-muted-foreground mb-1">Docente Tutor / Acompañante</h4>
                {experience.tutors.map((t, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-medium">{t.name}</p>
                    {t.phone && <p className="text-xs text-muted-foreground">Tel: {t.phone}</p>}
                    {t.email && (
                      <p className="text-xs text-primary truncate" title={t.email}>
                        {t.email}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="field bg-muted/30 p-2.5 rounded-lg border">
                <h4 className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1">
                  <Users size={13} /> Voceros Estudiantiles Principales
                </h4>
                <ul className="text-sm space-y-1">
                  {experience.primarySpokespersons.map((s, i) => (
                    <li key={i}>
                      <span className="font-medium">{s.name}</span>
                      {s.phone && <span className="text-xs text-muted-foreground ml-1">({s.phone})</span>}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="field bg-muted/30 p-2.5 rounded-lg border">
                <h4 className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1">
                  <Users size={13} /> Vocero Estudiantil Suplente
                </h4>
                <ul className="text-sm space-y-1">
                  {experience.alternateSpokespersons.length > 0 ? (
                    experience.alternateSpokespersons.map((s, i) => (
                      <li key={i}>
                        <span className="font-medium">{s.name}</span>
                        {s.phone && <span className="text-xs text-muted-foreground ml-1">({s.phone})</span>}
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-muted-foreground italic">Por registrar</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="field pt-2 border-t flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail size={13} /> Contacto institucional:
                <strong className="text-foreground">{experience.institutionalEmail}</strong>
              </span>
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded font-mono font-semibold">
                Ficha #{experience.id}
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
