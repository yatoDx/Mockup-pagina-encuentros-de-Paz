import { createFileRoute } from '@tanstack/react-router';
import { PeaceLayout, PageHeading, peaceHead } from '@/components/peace-layout';
import { QuienesSomosSection } from '@/components/quienes-somos';
import { InstitutionalLogosBanner } from '@/components/institutional-logos';
import { CanalesRedesSection } from '@/components/canales-redes';

export const Route = createFileRoute('/quienes-somos')({
  head: () =>
    peaceHead(
      '¿Quiénes Somos?',
      'Alianza institucional entre la Universidad Distrital, IPAZUD y la Corporación E-PAZ con la Red de Colegios de Gestores de Paz Escolares.'
    ),
  component: QuienesSomosPage,
});

function QuienesSomosPage() {
  return (
    <PeaceLayout>
      <PageHeading
        label="Identidad y Alianza Institucional"
        title="¿Quiénes Somos?"
        description="Conoce la trayectoria de los Encuentros de Gestores de Paz Escolares, la alianza entre la Universidad Distrital, IPAZUD y la Corporación E-PAZ, y la red de colegios participantes."
      />
      <InstitutionalLogosBanner />
      <QuienesSomosSection />
      <CanalesRedesSection />
    </PeaceLayout>
  );
}
