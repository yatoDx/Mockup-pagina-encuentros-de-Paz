import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, Building2, MapPin } from 'lucide-react';
import { PeaceLayout, PageHeading, peaceHead } from '@/components/peace-layout';
import { ExperienceCard } from '@/components/peace-content';
import { ExperienceDialog } from '@/components/experience-dialog';
import { Button } from '@/components/ui/button';
import { categories, experiences } from '@/lib/peace-data';

export const Route = createFileRoute('/experiencias')({
  head: () =>
    peaceHead(
      'Catálogo de experiencias',
      'Metodologías y fichas de sistematización para las 21 experiencias de paz de los colegios participantes.'
    ),
  component: Experiencias,
});

function Experiencias() {
  const [category, setCategory] = useState('Todas');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  const normalizedQuery = query.trim().toLocaleLowerCase('es');

  const shown = experiences.filter((e) => {
    const matchesCategory = category === 'Todas' || e.category === category;
    const searchableText = `${e.name} ${e.category} ${e.school} ${e.city} ${e.department} ${e.description}`.toLocaleLowerCase(
      'es'
    );
    const matchesQuery = normalizedQuery === '' || searchableText.includes(normalizedQuery);
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
          {['Todas', ...categories].map((c) => (
            <Button
              key={c}
              size="sm"
              variant="outline"
              className={category === c ? 'selected' : ''}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground my-2 px-1">
          <span>Mostrando <strong>{shown.length}</strong> de <strong>{experiences.length}</strong> experiencias</span>
          <span>Colegios públicos y privados de Bolívar, Nariño, Bogotá, Atlántico, La Guajira, Cauca y Sucre</span>
        </div>

        <div className="experience-grid">
          {shown.map((e) => (
            <ExperienceCard key={e.id} experience={e} onOpen={() => setSelected(e.id)} />
          ))}
        </div>

        {shown.length === 0 && (
          <p className="no-results">
            No se encontraron experiencias que coincidan con &ldquo;{query}&rdquo;. Prueba con otra búsqueda o categoría.
          </p>
        )}

        <ExperienceDialog id={selected} onClose={() => setSelected(null)} />
      </section>
    </PeaceLayout>
  );
}
