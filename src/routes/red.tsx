import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Mail, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PeaceLayout, PageHeading, peaceHead } from '@/components/peace-layout';
import { Button } from '@/components/ui/button';
import { SchoolsDirectory } from '@/components/schools-directory';

export const Route = createFileRoute('/red')({
  head: () =>
    peaceHead(
      'Nuestra red de colegios',
      'Directorio y comunidad de instituciones participantes, estudiantes voceros y docentes gestores de paz escolares de Colombia.'
    ),
  component: Red,
});

function Red() {
  const [sent, setSent] = useState(false);

  return (
    <PeaceLayout>
      <PageHeading
        label="Juntos construimos comunidad"
        title="Nuestra red de gestores de paz"
        description="Directorio de las 20 instituciones participantes y punto de encuentro para estudiantes, docentes, coordinadores y directivos que construyen paz en sus colegios."
      />

      <div className="wrap">
        <SchoolsDirectory />

        <section className="section form-layout border-t">
          <div>
            {sent ? (
              <div role="status">
                <CheckCircle2 className="text-primary" size={35} />
                <h2>Gracias por ser parte.</h2>
                <p className="section-description">
                  Has completado la demostración del formulario. No se enviaron ni guardaron tus datos.
                </p>
                <Button variant="outline" onClick={() => setSent(false)}>
                  Volver al formulario
                </Button>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="eyebrow">Vinculación</div>
                <h3 className="text-xl font-bold">¿Deseas vincular tu colegio a la red?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Déjanos tus datos institucionales para invitarte a los próximos encuentros y círculos pedagógicos.
                </p>

                <label>
                  Nombre completo
                  <input required name="name" placeholder="Tu nombre y apellidos" />
                </label>
                <label>
                  Institución o colegio
                  <input required name="school" placeholder="Nombre completo de tu institución" />
                </label>
                <label>
                  Correo electrónico institucional o personal
                  <input required type="email" name="email" placeholder="nombre@institucion.edu.co" />
                </label>
                <label>
                  Tu rol en la institución
                  <select name="role" defaultValue="">
                    <option value="" disabled>
                      Selecciona tu rol
                    </option>
                    <option>Estudiante Vocero/a</option>
                    <option>Docente Tutor/a</option>
                    <option>Rector/a o Directivo/a</option>
                    <option>Coordinador/a de Convivencia</option>
                    <option>Orientador/a Escolar</option>
                    <option>Otro</option>
                  </select>
                </label>
                <label>
                  Mensaje o breve descripción de tu iniciativa
                  <textarea
                    required
                    name="message"
                    placeholder="Cuéntanos brevemente sobre la experiencia o interés de tu comunidad…"
                  />
                </label>
                <p className="notice">
                  Formulario de registro y demostración para la articulación con el IPAZUD y la red de gestores de paz.
                </p>
                <Button type="submit" className="justify-self-start">
                  Enviar información <ArrowUpRight />
                </Button>
              </form>
            )}
          </div>

          <aside className="contact-details">
            <div className="eyebrow">De las aulas para el mundo</div>
            <h3>La conversación continúa.</h3>
            <p>
              Instituto para la Pedagogía, la Paz y el Conflicto Urbano (IPAZUD)
              <br />
              Universidad Distrital Francisco José de Caldas
            </p>
            <p className="mt-4">Contacto del encuentro, según el afiche oficial:</p>
            <Button variant="link" className="px-0 text-primary" asChild>
              <a href="mailto:gestorespazbogota@gmail.com">
                <Mail /> gestorespazbogota@gmail.com
              </a>
            </Button>
            <p className="notice">
              Los datos del directorio provienen de la Matriz Básica de Datos de Colegios Participantes del encuentro.
            </p>
            <Button variant="outline" asChild>
              <a href="https://ipazud.udistrital.edu.co/" target="_blank" rel="noreferrer">
                Conocer IPAZUD <ArrowUpRight />
              </a>
            </Button>
          </aside>
        </section>
      </div>
    </PeaceLayout>
  );
}
