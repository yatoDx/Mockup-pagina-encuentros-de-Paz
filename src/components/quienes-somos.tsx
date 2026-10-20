import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Users,
  Building2,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  GraduationCap,
  Calendar,
  Award,
  ChevronRight,
  School,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogoUDistrital, LogoIPAZUD, LogoEPAZ } from './institutional-logos';
import bear from '@/assets/peace-bear.png';
import photo from '@/assets/peace-circle.jpg';

export function QuienesSomosSection() {
  const [activeTab, setActiveTab] = useState<'alianza' | 'trayectoria' | 'red' | 'pilares'>('alianza');

  return (
    <section id="quienes-somos" className="section-quienes-somos" aria-label="Módulo Quiénes Somos">
      <div className="wrap">
        {/* Encabezado del Módulo */}
        <div className="qs-header">
          <div className="eyebrow">
            <span className="live-dot" /> Identidad y Propósito
          </div>
          <div className="qs-title-row">
            <div>
              <h2>¿Quiénes Somos?</h2>
              <p className="section-description">
                Somos una alianza interinstitucional entre la academia, organizaciones de paz y comunidades escolares,
                comprometidas con sembrar convivencia pacífica, mediación escolar y diálogo transformador desde las aulas hacia toda Colombia.
              </p>
            </div>
            <div className="qs-badge-alianza">
              <img src={bear} alt="Oso gestor de paz" className="w-12 h-14 object-contain" />
              <div>
                <strong>Alianza Tripartita</strong>
                <span>U. Distrital · IPAZUD · E-PAZ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas de Navegación del Módulo */}
        <div className="qs-nav-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'alianza'}
            className={`qs-tab-btn ${activeTab === 'alianza' ? 'active' : ''}`}
            onClick={() => setActiveTab('alianza')}
          >
            <Building2 size={16} />
            Alianza Universitaria y Corporativa
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'trayectoria'}
            className={`qs-tab-btn ${activeTab === 'trayectoria' ? 'active' : ''}`}
            onClick={() => setActiveTab('trayectoria')}
          >
            <Calendar size={16} />
            Trayectoria de los Encuentros
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'red'}
            className={`qs-tab-btn ${activeTab === 'red' ? 'active' : ''}`}
            onClick={() => setActiveTab('red')}
          >
            <School size={16} />
            Red de Colegios Participantes
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'pilares'}
            className={`qs-tab-btn ${activeTab === 'pilares' ? 'active' : ''}`}
            onClick={() => setActiveTab('pilares')}
          >
            <Sparkles size={16} />
            Pilares y Pedagogía de Paz
          </button>
        </div>

        {/* Tab 1: Alianza Universitaria y Corporativa */}
        {activeTab === 'alianza' && (
          <div className="qs-tab-content qs-alianza-view animate-in fade-in duration-300">
            <div className="qs-alianza-intro">
              <div className="qs-tagline">
                <ShieldCheck className="text-primary inline-block mr-1" size={16} />
                Respaldo Institucional Oficial
              </div>
              <h3>La sinergia que hace posible el movimiento de paz escolar</h3>
              <p>
                El Encuentro de Gestores de Paz Escolares nace de la unión estratégica entre la universidad pública,
                institutos especializados en investigación de conflicto urbano y corporaciones con amplia trayectoria en mediación comunitaria.
                Juntos brindamos rigor académico, acompañamiento metodológico y sostenibilidad a las iniciativas escolares.
              </p>
            </div>

            <div className="qs-entities-grid">
              {/* Entidad 1 */}
              <article className="qs-entity-card">
                <div className="qs-entity-logo-wrap">
                  <LogoUDistrital className="h-12" />
                </div>
                <h4>Universidad Distrital Francisco José de Caldas</h4>
                <p className="qs-entity-role">Facultad de Ciencias y Educación · Respaldo Académico</p>
                <p className="qs-entity-text">
                  Aporta el marco pedagógico, la sistematización académica de experiencias formativas y la apertura de espacios universitarios para que niños, niñas y jóvenes sean escuchados como sujetos de derechos.
                </p>
                <ul className="qs-entity-points">
                  <li><CheckCircle2 size={13} className="text-primary shrink-0" /> Sede Macarena A y Auditorio Hermanos San Juan</li>
                  <li><CheckCircle2 size={13} className="text-primary shrink-0" /> Formación docente e investigación curricular</li>
                </ul>
                <div className="qs-entity-footer">
                  <Button variant="link" size="sm" asChild className="px-0">
                    <a href="https://www.udistrital.edu.co" target="_blank" rel="noreferrer">
                      Portal universitario <ArrowUpRight size={14} />
                    </a>
                  </Button>
                </div>
              </article>

              {/* Entidad 2 */}
              <article className="qs-entity-card">
                <div className="qs-entity-logo-wrap">
                  <LogoIPAZUD className="h-12" />
                </div>
                <h4>Instituto IPAZUD</h4>
                <p className="qs-entity-role">Pedagogía, Paz y Conflicto Urbano · Investigación</p>
                <p className="qs-entity-text">
                  Lidera la investigación sobre dinámicas de convivencia urbana y escolar en Bogotá y Colombia, promoviendo pedagogías activas contra la violencia y metodologías de memoria colectiva.
                </p>
                <ul className="qs-entity-points">
                  <li><CheckCircle2 size={13} className="text-primary shrink-0" /> Compilación del Libro Virtual de Gestores de Paz</li>
                  <li><CheckCircle2 size={13} className="text-primary shrink-0" /> Producción de contenidos formativos y transmisiones</li>
                </ul>
                <div className="qs-entity-footer">
                  <Button variant="link" size="sm" asChild className="px-0">
                    <a href="https://ipazud.udistrital.edu.co" target="_blank" rel="noreferrer">
                      Conocer IPAZUD <ArrowUpRight size={14} />
                    </a>
                  </Button>
                </div>
              </article>

              {/* Entidad 3 */}
              <article className="qs-entity-card">
                <div className="qs-entity-logo-wrap">
                  <LogoEPAZ className="h-12" />
                </div>
                <h4>Corporación E-PAZ</h4>
                <p className="qs-entity-role">Escenarios para la Paz · Articulación Comunitaria</p>
                <p className="qs-entity-text">
                  Especialistas en trabajo de campo, formación de jueces escolares de paz, dinámicas teatrales y vinculación directa con los comités de convivencia de los colegios de Bogotá y las regiones.
                </p>
                <ul className="qs-entity-points">
                  <li><CheckCircle2 size={13} className="text-primary shrink-0" /> Talleres vivenciales y círculos de la palabra</li>
                  <li><CheckCircle2 size={13} className="text-primary shrink-0" /> Red de mediadores juveniles en territorio</li>
                </ul>
                <div className="qs-entity-footer">
                  <Button variant="link" size="sm" asChild className="px-0">
                    <Link to="/red">
                      Unirse a la alianza <ArrowUpRight size={14} />
                    </Link>
                  </Button>
                </div>
              </article>
            </div>
          </div>
        )}

        {/* Tab 2: Trayectoria de los Encuentros */}
        {activeTab === 'trayectoria' && (
          <div className="qs-tab-content qs-trayectoria-view animate-in fade-in duration-300">
            <div className="qs-timeline-wrap">
              <div className="qs-timeline-card">
                <div className="qs-timeline-year">2025</div>
                <div className="qs-timeline-body">
                  <span className="badge">I Encuentro · El origen del camino</span>
                  <h3>El nacimiento de la Red de Gestores de Paz</h3>
                  <p>
                    Se consolidó la primera mesa de trabajo intercolegial con la participación de 19 colegios oficiales y privados de Bogotá.
                    Se recopilaron 20 experiencias iniciales organizadas en seis metodologías pedagógicas pioneras.
                  </p>
                  <div className="qs-timeline-stats">
                    <div><strong>19</strong> Colegios fundadores</div>
                    <div><strong>20</strong> Experiencias registradas</div>
                    <div><strong>100+</strong> Estudiantes mediadores</div>
                  </div>
                  <Button variant="outline" size="sm" asChild className="mt-3">
                    <Link to="/encuentros">Ver archivo 2025 <ChevronRight size={14} /></Link>
                  </Button>
                </div>
              </div>

              <div className="qs-timeline-card qs-timeline-card-highlight">
                <div className="qs-timeline-year current">2026</div>
                <div className="qs-timeline-body">
                  <span className="badge">II Encuentro Oficial · Septiembre 2026</span>
                  <h3>De las aulas para el mundo: Expansión y Libro Virtual</h3>
                  <p>
                    Con sede central en el Auditorio Hermanos San Juan (Universidad Distrital - Sede Macarena A),
                    el II Encuentro integra el mapa pedagógico de Colombia, el Libro Virtual de Sistematización y la incorporación de colegios a nivel nacional.
                  </p>
                  <div className="qs-timeline-stats">
                    <div><strong>1 y 2</strong> Septiembre de 2026</div>
                    <div><strong>Auditorio</strong> Hnos. San Juan</div>
                    <div><strong>Libro</strong> Memorias de Paz</div>
                  </div>
                  <Button size="sm" asChild className="mt-3">
                    <Link to="/libro">Explorar libro virtual <ArrowUpRight size={14} /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Red de Colegios Participantes */}
        {activeTab === 'red' && (
          <div className="qs-tab-content qs-red-view animate-in fade-in duration-300">
            <div className="qs-red-grid">
              <div className="qs-red-info">
                <div className="eyebrow"><Users size={14} /> Comunidad en Crecimiento</div>
                <h3>Los estudiantes y docentes son los verdaderos protagonistas</h3>
                <p>
                  Nuestra red no es una estructura burocrática; es un tejido vivo de colegios oficiales, distritales y privados de diversas localidades (Kennedy, Suba, Ciudad Bolívar, Santa Fe, Usaquén, Bosa y municipios aledaños)
                  donde los estudiantes asumen el rol de gestores, facilitadores de diálogo y protectores del bienestar escolar.
                </p>
                <div className="qs-actors-list">
                  <div className="qs-actor-item">
                    <GraduationCap className="qs-actor-icon" size={20} />
                    <div>
                      <strong>Estudiantes Mediadores</strong>
                      <p>Lideran círculos de palabra, resuelven desacuerdos entre pares y promueven empatía en el recreo y las aulas.</p>
                    </div>
                  </div>
                  <div className="qs-actor-item">
                    <Award className="qs-actor-icon" size={20} />
                    <div>
                      <strong>Docentes y Coordinadores</strong>
                      <p>Articulan la convivencia con las áreas de ciencias sociales, ética, artes y semilleros de investigación.</p>
                    </div>
                  </div>
                  <div className="qs-actor-item">
                    <Building2 className="qs-actor-icon" size={20} />
                    <div>
                      <strong>Directivos e Instituciones</strong>
                      <p>Respaldan institucionalmente los acuerdos de paz e integran metodologías restaurativas en sus manuales escolares.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button asChild>
                    <Link to="/red">Vincular a mi colegio <ArrowUpRight size={14} /></Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/experiencias">Ver experiencias <ChevronRight size={14} /></Link>
                  </Button>
                </div>
              </div>

              <div className="qs-red-visual">
                <img
                  src={photo}
                  alt="Estudiantes en círculo de diálogo"
                  className="rounded-lg shadow-md w-full h-72 object-cover"
                />
                <div className="qs-red-quote">
                  <p>"La paz no es la ausencia de conflictos, sino la capacidad comunitaria de abordarlos con respeto, escucha y palabra viva."</p>
                  <span>— Comunidad de Gestores de Paz Escolares</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Pilares y Metodologías */}
        {activeTab === 'pilares' && (
          <div className="qs-tab-content qs-pilares-view animate-in fade-in duration-300">
            <div className="qs-pillars-grid">
              <div className="qs-pillar-card">
                <div className="qs-pillar-num">01</div>
                <h4>Círculos de la Palabra</h4>
                <p>Mesas circulares donde no hay jerarquías: hablar desde el sentir, escuchar sin juzgar y llegar a acuerdos restaurativos.</p>
              </div>
              <div className="qs-pillar-card">
                <div className="qs-pillar-num">02</div>
                <h4>Jueces Escolares de Paz</h4>
                <p>Estudiantes capacitados en mediación pedagógica que guían procesos de resolución pacífica entre sus compañeros.</p>
              </div>
              <div className="qs-pillar-card">
                <div className="qs-pillar-num">03</div>
                <h4>Teatro y Sociodrama</h4>
                <p>Ponerse en la piel del otro a través de la representación teatral, canalizando emociones y desarmando prejuicios.</p>
              </div>
              <div className="qs-pillar-card">
                <div className="qs-pillar-num">04</div>
                <h4>Clínicas de las Emociones</h4>
                <p>Pedagogía del autocuidado y la salud mental: aprender a nombrar la rabia, el miedo y la tristeza para transformarlos en empatía.</p>
              </div>
              <div className="qs-pillar-card">
                <div className="qs-pillar-num">05</div>
                <h4>Museos de la Memoria</h4>
                <p>Archivos vivos en las escuelas para recordar la historia comunitaria y honrar la resiliencia estudiantil.</p>
              </div>
              <div className="qs-pillar-card">
                <div className="qs-pillar-num">06</div>
                <h4>Semilleros de Investigación</h4>
                <p>Jóvenes investigadores que analizan la convivencia de su entorno con rigor y proponen soluciones innovadoras.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
