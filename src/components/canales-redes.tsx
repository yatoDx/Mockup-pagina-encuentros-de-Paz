import { useState } from 'react';
import {
  Youtube,
  Facebook,
  MessageCircle,
  Play,
  Tv,
  Share2,
  ExternalLink,
  Radio,
  Sparkles,
  Users,
  Video,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  embedUrl: string;
  date: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: 'encuentro-live',
    title: 'Transmisión Oficial: II Encuentro de Gestores de Paz Escolares',
    category: 'Transmisión en Vivo · IPAZUD',
    duration: 'En vivo / Archivo',
    description:
      'Transmisión audiovisual y cobertura directa desde el Auditorio Hermanos San Juan, Sede Macarena A de la Universidad Distrital Francisco José de Caldas.',
    // Video institucional o playlist de IPAZUD / UDistrital
    embedUrl: 'https://youtu.be/lBwss223LWA?si=wh1rvzz4dYSorLPP',
    date: '1 y 2 Septiembre 2026',
  },
  {
    id: 'ipazud-pedagogias',
    title: 'IPAZUD: Pedagogía, Conflicto Urbano y Diálogo en las Aulas',
    category: 'Cátedra Institucional',
    duration: '24:15 min',
    description:
      'Docentes e investigadores del Instituto para la Pedagogía, la Paz y el Conflicto Urbano analizan el impacto de los círculos de la palabra en la juventud de Bogotá.',
    embedUrl: 'https://www.youtube.com/live/ybJwYEIBefc?si=z8mYZPppTaM4VqFh',
    date: 'Archivo Académico',
  },
  {
    id: 'voces-estudiantes',
    title: 'De las Aulas para el Mundo: Testimonios de Mediadores Escolares',
    category: 'Experiencias de Paz',
    duration: '14:30 min',
    description:
      'Estudiantes de diversas localidades de Bogotá comparten cómo la mediación escolar y el teatro transformaron los conflictos de sus colegios en acuerdos de amistad.',
    embedUrl: 'https://youtu.be/L83lVampN-U?si=7N-0PLFQAr67E2ZO',
    date: 'Memorias de Paz',
  },
];

export function CanalesRedesSection() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(VIDEOS[0]!);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    'Hola equipo de Gestores de Paz Escolares (IPAZUD / U. Distrital / E-PAZ). Me gustaría recibir información para vincular a mi colegio al encuentro y conocer las actividades de mediación escolar.'
  );

  return (
    <section id="canales-redes" className="section-canales-redes" aria-label="Canales de Comunicación y Redes Sociales">
      <div className="wrap">
        {/* Encabezado de la Sección */}
        <div className="section-top">
          <div>
            <div className="eyebrow">
              <Radio size={14} className="text-red-500 animate-pulse" />
              Ecosistema Digital y Comunicación Externa
            </div>
            <h2>Canales, Transmisiones y Redes</h2>
            <p className="section-description">
              Sigue en vivo las transmisiones oficiales, accede a contenidos audiovisuales pedagógicos y conéctate directamente con el equipo gestor a través de nuestras redes sociales y canal de WhatsApp.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              {copied ? <CheckCircle size={14} className="text-primary mr-1" /> : <Share2 size={14} className="mr-1" />}
              {copied ? '¡Enlace copiado!' : 'Compartir portal'}
            </Button>
          </div>
        </div>

        {/* Bloque Principal: Embebido de YouTube + Lista de Transmisiones */}
        <div className="youtube-player-container">
          <div className="youtube-screen-box">
            <div className="youtube-responsive-wrapper">
              <iframe
                title={selectedVideo.title}
                src={(() => {
                  const url = selectedVideo.embedUrl;
                  if (url.includes('/embed/')) return url;
                  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
                  return match && match[1]
                    ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=0`
                    : url;
                })()}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="youtube-iframe"
              />
            </div>
            <div className="youtube-video-meta">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="badge-live">
                  <span className="live-dot-red" /> {selectedVideo.category}
                </span>
                <span className="text-xs text-muted-foreground">{selectedVideo.date}</span>
              </div>
              <h3 className="text-xl font-bold font-display text-foreground">{selectedVideo.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{selectedVideo.description}</p>
              <div className="youtube-actions-bar mt-4 pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Tv size={14} className="text-red-600" />
                  Canal Oficial: IPAZUD / Universidad Distrital Francisco José de Caldas
                </span>
                <Button size="sm" variant="heroOutline" asChild className="text-xs h-8">
                  <a
                    href="https://www.youtube.com/@ipazududistrital"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Youtube size={14} className="text-red-600 mr-1" />
                    Abrir canal en YouTube <ExternalLink size={12} className="ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Lista de Selección de Videos / Transmisiones */}
          <div className="youtube-playlist-side">
            <div className="playlist-header">
              <Video size={16} className="text-primary" />
              <span>Contenidos Audiovisuales ({VIDEOS.length})</span>
            </div>
            <div className="playlist-items-list">
              {VIDEOS.map((item) => {
                const isActive = item.id === selectedVideo.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedVideo(item)}
                    className={`playlist-item-card ${isActive ? 'active' : ''}`}
                  >
                    <div className="playlist-thumb-icon">
                      {isActive ? (
                        <Radio size={18} className="text-red-500 animate-pulse" />
                      ) : (
                        <Play size={16} className="text-muted-foreground" />
                      )}
                    </div>
                    <div className="text-left">
                      <span className="block text-[11px] font-semibold text-primary">{item.category}</span>
                      <strong className="block text-xs text-foreground font-medium line-clamp-2 mt-0.5">
                        {item.title}
                      </strong>
                      <span className="block text-[10px] text-muted-foreground mt-1">
                        {item.duration} · {item.date}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="playlist-footer-note">
              <p>
                Transmisiones en vivo desde el Auditorio Hermanos San Juan (Sede Macarena A) y coberturas audiovisuales del encuentro.
              </p>
            </div>
          </div>
        </div>

        {/* Tarjetas de Ecosistema Digital: Facebook, WhatsApp y Redes */}
        <div className="social-ecosystem-grid mt-10">
          {/* Tarjeta YouTube */}
          <article className="social-card social-card-youtube">
            <div className="social-card-top">
              <div className="social-icon-badge bg-red-100 text-red-600">
                <Youtube size={26} />
              </div>
              <span className="badge">Transmisiones</span>
            </div>
            <h4>YouTube Institucional</h4>
            <p>
              Emisiones oficiales del Encuentro, cátedras abiertas de paz y archivos pedagógicos del IPAZUD y la Universidad Distrital.
            </p>
            <div className="social-card-action">
              <Button size="sm" className="w-full" variant="outline" asChild>
                <a
                  href="https://www.youtube.com/@ipazududistrital"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Youtube size={15} className="mr-1.5 text-red-600" />
                  Ir al canal de YouTube <ExternalLink size={12} className="ml-auto" />
                </a>
              </Button>
            </div>
          </article>

          {/* Tarjeta Facebook */}
          <article className="social-card social-card-facebook">
            <div className="social-card-top">
              <div className="social-icon-badge bg-blue-100 text-blue-700">
                <Facebook size={26} />
              </div>
              <span className="badge">Comunidad</span>
            </div>
            <h4>Facebook Oficial IPAZUD</h4>
            <p>
              Conéctate con la comunidad de docentes, estudiantes y familias. Fotos del encuentro, novedades y convocatorias de paz.
            </p>
            <div className="social-card-action">
              <Button size="sm" className="w-full" variant="outline" asChild>
                <a
                  href="https://www.facebook.com/ipazud"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Facebook size={15} className="mr-1.5 text-blue-700" />
                  Página de Facebook <ExternalLink size={12} className="ml-auto" />
                </a>
              </Button>
            </div>
          </article>

          {/* Tarjeta WhatsApp */}
          <article className="social-card social-card-whatsapp">
            <div className="social-card-top">
              <div className="social-icon-badge bg-emerald-100 text-emerald-700">
                <MessageCircle size={26} />
              </div>
              <span className="badge bg-emerald-100 text-emerald-800">Conexión Directa</span>
            </div>
            <h4>Línea y Red de WhatsApp</h4>
            <p>
              Canal directo de articulación para coordinadores de convivencia, docentes y colegios que deseen sumarse a la red.
            </p>
            <div className="social-card-action">
              <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                <a
                  href={`https://wa.me/573001234567?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={15} className="mr-1.5" />
                  Escribir por WhatsApp <ExternalLink size={12} className="ml-auto" />
                </a>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
