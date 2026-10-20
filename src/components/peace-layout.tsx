import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, Menu, X, HeartHandshake, Youtube, Facebook, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import bear from '@/assets/peace-bear.png';
import { WhatsAppFloatingButton } from './whatsapp-button';
import { PeaceBearCompanion } from './peace-bear-companion';
import { LogoUDistrital, LogoIPAZUD, LogoEPAZ } from './institutional-logos';

export const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/quienes-somos', label: '¿Quiénes Somos?' },
  { to: '/encuentros', label: 'Encuentros' },
  { to: '/experiencias', label: 'Experiencias' },
  { to: '/libro', label: 'Libro virtual' },
  { to: '/galeria', label: 'Galería' },
] as const;

export function Brand() {
  return (
    <Link to="/" className="brand">
      <img src={bear} alt="Osito gestor de paz" width="54" height="60" />
      <div>
        <strong>
          Gestores de Paz
          <br />
          Escolares
        </strong>
        <small>BOGOTÁ · COLOMBIA</small>
      </div>
    </Link>
  );
}

export function PeaceLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      {/* Barra superior de respaldo institucional permanente */}
      <div className="institution-bar">
        <div className="wrap">
          <div className="flex items-center gap-3">
            <a
              href="https://www.udistrital.edu.co/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline font-medium text-foreground"
            >
              Universidad Distrital Francisco José de Caldas
            </a>
            <span className="opacity-40">|</span>
            <a
              href="https://ipazud.udistrital.edu.co/"
              target="_blank"
              rel="noreferrer"
              className="institution-extra hover:underline"
            >
              IPAZUD
            </a>
            <span className="opacity-40">|</span>
            <span className="institution-extra font-medium">Corporación E-PAZ</span>
          </div>
          <span className="hidden md:inline font-semibold text-primary">
            De las aulas para el mundo… sembrando paz
          </span>
        </div>
      </div>

      {/* Encabezado Principal y Navegación */}
      <header className="nav wrap">
        <Brand />
        <nav
          aria-label="Navegación principal"
          className={`nav-links ${open ? 'open' : ''}`}
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${pathname === item.to ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button size="sm" asChild>
            <Link to="/red">
              Nuestra red <ArrowUpRight />
            </Link>
          </Button>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="menu-button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </header>

      {/* Contenido de la página */}
      <main>{children}</main>

      {/* Franja de Comunidad */}
      <section className="community-band">
        <div className="wrap">
          <div>
            <h2>La paz crece cuando la construimos juntos.</h2>
            <p>Una red de estudiantes, docentes y colegios que transforma su entorno.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/red">
                <HeartHandshake /> Conoce nuestra red <ArrowUpRight />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/quienes-somos">
                Ver ¿Quiénes Somos? <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer con respaldo institucional y redes */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <Brand />
            <div className="flex flex-col md:items-end gap-2 text-left md:text-right">
              <div className="flex items-center gap-3 mb-1">
                <a
                  href="https://www.youtube.com/@ipazuduniversidaddistrital"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-red-600 hover:bg-muted transition-colors"
                  title="Canal de YouTube IPAZUD"
                >
                  <Youtube size={16} />
                </a>
                <a
                  href="https://www.facebook.com/ipazud"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-blue-700 hover:bg-muted transition-colors"
                  title="Facebook IPAZUD"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-emerald-600 hover:bg-muted transition-colors"
                  title="Canal de WhatsApp Gestores de Paz"
                >
                  <MessageCircle size={16} />
                </a>
              </div>
              <div className="footer-partners">
                Una iniciativa interinstitucional de
                <br />
                <strong>Universidad Distrital Francisco José de Caldas · IPAZUD</strong>
                <br />
                Corporación Escenarios para la Paz (E-PAZ)
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Gestores de Paz Escolares · Bogotá, Colombia</span>
            <span>Respaldo institucional: Universidad Distrital, IPAZUD y Corporación E-PAZ</span>
            <div className="flex items-center gap-4">
              <a href="https://ipazud.udistrital.edu.co/" target="_blank" rel="noreferrer">
                Sitio IPAZUD ↗
              </a>
              <a href="https://www.udistrital.edu.co" target="_blank" rel="noreferrer">
                Portal U. Distrital ↗
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Elementos interactivos dinámicos: WhatsApp y Mascota */}
      <WhatsAppFloatingButton />
      <PeaceBearCompanion />
    </>
  );
}

export function PageHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-heading">
      <div className="wrap">
        <div className="eyebrow">{label}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function peaceHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | Gestores de Paz Escolares` },
      { name: 'description', content: description },
      { property: 'og:title', content: `${title} | Gestores de Paz Escolares` },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  };
}
