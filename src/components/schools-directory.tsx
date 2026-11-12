import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Search, Building2, MapPin, ShieldCheck } from 'lucide-react';
import { schoolsData } from '@/lib/schools-data';
import { Button } from '@/components/ui/button';

export function SchoolsDirectory() {
  const [query, setQuery] = useState('');
  const [legalFilter, setLegalFilter] = useState<'Todas' | 'Pública' | 'Privada'>('Todas');
  const [selectedDept, setSelectedDept] = useState<string>('Todos');

  const departments = ['Todos', ...Array.from(new Set(schoolsData.map((s) => s.department)))];

  const normalizedQuery = query.trim().toLocaleLowerCase('es');

  const filtered = schoolsData.filter((item) => {
    const matchesLegal = legalFilter === 'Todas' || item.legalNature === legalFilter;
    const matchesDept = selectedDept === 'Todos' || item.department === selectedDept;

    const searchable = `${item.school} ${item.name} ${item.city} ${item.department} ${item.legalNature} ${item.category}`.toLocaleLowerCase('es');
    const matchesQuery = normalizedQuery === '' || searchable.includes(normalizedQuery);

    return matchesLegal && matchesDept && matchesQuery;
  });

  return (
    <section className="directory-section pt-8 pb-12 border-t">
      <div className="section-top flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="eyebrow flex items-center gap-2 text-primary font-semibold text-xs tracking-wider uppercase mb-2">
            <Building2 size={15} /> Red Institucional
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Directorio de Colegios Participantes</h2>
          <p className="text-muted-foreground text-sm max-w-2xl mt-1">
            Conoce las 20 instituciones educativas y organizaciones de 8 departamentos que forman la red nacional de gestores de paz escolares.
          </p>
          <p className="mt-2 flex max-w-2xl items-start gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-primary" />
            Por protección de datos no publicamos nombres, teléfonos ni correos de la comunidad
            educativa. Usa «Ver en el mapa» para ubicar cada institución.
          </p>
        </div>
        <div className="text-xs text-muted-foreground bg-secondary/80 px-3 py-2 rounded-lg border self-start sm:self-end">
          Total: <strong className="text-foreground">{filtered.length}</strong> de {schoolsData.length} registros
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="search-box flex items-center gap-2.5 border rounded-lg px-3.5 py-2.5 max-w-md w-full bg-background">
            <Search size={16} className="text-muted-foreground" />
            <input
              aria-label="Buscar colegios o participantes"
              placeholder="Buscar por colegio, ciudad o experiencia…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-0 outline-none w-full text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted-foreground font-medium mr-1">Carácter:</span>
            {(['Todas', 'Pública', 'Privada'] as const).map((filter) => (
              <Button
                key={filter}
                size="sm"
                variant="outline"
                className={`h-8 text-xs ${
                  legalFilter === filter
                    ? 'chip-filter-active border-link bg-link text-white hover:bg-link-strong hover:text-white'
                    : ''
                }`}
                onClick={() => setLegalFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-muted-foreground font-medium mr-1">Departamento:</span>
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDept(dept)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                selectedDept === dept
                  ? 'chip-filter-active bg-link text-white border-link font-medium'
                  : 'bg-background hover:bg-muted text-muted-foreground border-border'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg bg-muted/20">
          <p className="text-sm text-muted-foreground">
            No se encontraron instituciones que coincidan con la búsqueda &ldquo;{query}&rdquo;.
          </p>
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              setQuery('');
              setLegalFilter('Todas');
              setSelectedDept('Todos');
            }}
          >
            Restablecer filtros
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="bg-card border rounded-lg p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#EFE7F0] text-[#6A4A6C] px-2 py-0.5 rounded">
                    {item.legalNature}
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    #{item.id}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground leading-snug mb-1">
                  {item.school}
                </h3>

                <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin size={13} className="text-[#C17A52] shrink-0" />
                  <span>{item.city}, {item.department}</span>
                </p>

                <div className="border-t pt-2.5 mb-3">
                  <span className="text-[11px] text-muted-foreground uppercase font-semibold block mb-0.5">
                    Experiencia
                  </span>
                  <p className="text-xs font-medium text-foreground line-clamp-2" title={item.name}>
                    {item.name}
                  </p>
                  <span className="inline-block text-[10px] text-link bg-link-soft px-1.5 py-0.5 rounded mt-1 font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2 border-t pt-3">
                <span className="text-[10px] text-muted-foreground">Colombia</span>
                <Link
                  to="/"
                  search={{ exp: item.id }}
                  hash="mapa"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  title={`Ver ${item.school} en el mapa`}
                >
                  <MapPin size={13} /> Ver en el mapa
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
