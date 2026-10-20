import React from 'react';
import logoUDistrital from '@/assets/logo-udistrital.png';
import logoIPAZUD from '@/assets/logo-ipazud.png';
import logoEPAZ from '@/assets/logo-epaz.png';

export function LogoUDistrital({ className = 'h-10' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoUDistrital}
        alt="Escudo de la Universidad Distrital Francisco José de Caldas"
        className="h-10 w-auto max-h-12 object-contain shrink-0 drop-shadow-xs"
        loading="lazy"
      />
      <div className="leading-tight text-left">
        <span className="block text-[11px] font-bold text-slate-900 tracking-tight font-display">
          UNIVERSIDAD DISTRITAL
        </span>
        <span className="block text-[9.5px] font-medium text-slate-600">
          Francisco José de Caldas
        </span>
        <span className="block text-[8px] text-amber-700 font-semibold tracking-wider uppercase">
          Facultad de Ciencias y Educación
        </span>
      </div>
    </div>
  );
}

export function LogoIPAZUD({ className = 'h-10' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoIPAZUD}
        alt="Logo IPAZUD - Instituto de Paz"
        className="h-9 w-auto max-h-11 object-contain shrink-0 drop-shadow-xs"
        loading="lazy"
      />
      <div className="leading-tight text-left">
        <span className="block text-[12px] font-black text-emerald-900 tracking-wide font-display">
          IPAZUD
        </span>
        <span className="block text-[9px] font-semibold text-emerald-800">
          Inst. Pedagogía, Paz y Conflicto Urbano
        </span>
        <span className="block text-[8px] text-slate-500">
          U. Distrital Francisco José de Caldas
        </span>
      </div>
    </div>
  );
}

export function LogoEPAZ({ className = 'h-10' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoEPAZ}
        alt="Logo Corporación E-PAZ"
        className="h-10 w-auto max-h-12 object-contain shrink-0 drop-shadow-xs rounded-xs"
        loading="lazy"
      />
      <div className="leading-tight text-left">
        <span className="block text-[11px] font-bold text-teal-950 font-display">
          CORPORACIÓN E-PAZ
        </span>
        <span className="block text-[9px] font-medium text-teal-800">
          Escenarios para la Paz
        </span>
        <span className="block text-[8px] text-teal-600 font-semibold uppercase tracking-wider">
          Alianza Corporativa y Comunitaria
        </span>
      </div>
    </div>
  );
}

export function InstitutionalLogosBanner() {
  return (
    <aside aria-label="Alianza institucional y respaldo" className="institutional-banner">
      <div className="wrap institutional-banner-inner">
        <div className="institutional-lead">
          <span className="institutional-tag">Alianza y Respaldo Institucional</span>
          <p className="institutional-motto">
            Construcción colectiva de paz desde la academia, el territorio y la escuela
          </p>
        </div>
        <div className="institutional-grid">
          <a
            href="https://www.udistrital.edu.co"
            target="_blank"
            rel="noreferrer"
            className="institutional-card"
            title="Sitio oficial de la Universidad Distrital Francisco José de Caldas"
          >
            <LogoUDistrital />
          </a>
          <a
            href="https://ipazud.udistrital.edu.co"
            target="_blank"
            rel="noreferrer"
            className="institutional-card"
            title="Sitio oficial de IPAZUD"
          >
            <LogoIPAZUD />
          </a>
          <div className="institutional-card" title="Corporación Escenarios para la Paz (E-PAZ)">
            <LogoEPAZ />
          </div>
        </div>
      </div>
    </aside>
  );
}

export { logoUDistrital, logoIPAZUD, logoEPAZ };
