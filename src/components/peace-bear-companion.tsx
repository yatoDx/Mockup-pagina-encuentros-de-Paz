import { useState, useEffect } from 'react';
import { Sparkles, Heart, Footprints, MessageSquare, Volume2, X } from 'lucide-react';
import bear from '@/assets/peace-bear.png';

const PEACE_QUOTES = [
  '«La palabra nos une: escuchar con respeto es el primer paso hacia la paz escolar.»',
  '«¡En el II Encuentro 2026, los estudiantes somos los protagonistas del cambio!»',
  '«Un círculo de diálogo desarma cualquier desacuerdo en el recreo.»',
  '«De las aulas para el mundo: sembremos semillas de convivencia y empatía.»',
  '«La Universidad Distrital, IPAZUD y E-PAZ tejiendo comunidad con 19 colegios.»',
  '«¿Sabías que los jueces escolares de paz median pacíficamente entre compañeros?»',
];

interface Paw {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export function PeaceBearCompanion() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);
  const [pawsMode, setPawsMode] = useState(true);
  const [paws, setPaws] = useState<Paw[]>([]);
  const [isWaving, setIsWaving] = useState(false);

  // Huellitas al hacer clic en cualquier parte cuando pawsMode está activo
  useEffect(() => {
    if (!pawsMode) return;

    const handleClick = (e: MouseEvent) => {
      // Evitar crear huellas si se hace clic dentro del widget del oso o controles
      const target = e.target as HTMLElement | null;
      if (target?.closest('.peace-bear-widget') || target?.closest('button') || target?.closest('a') || target?.closest('input')) {
        return;
      }

      const newPaw: Paw = {
        id: Date.now() + Math.random(),
        x: e.pageX,
        y: e.pageY,
        rotation: (Math.random() * 40) - 20,
      };

      setPaws((prev) => [...prev.slice(-12), newPaw]);

      // Remover la huella después de 2.5s
      setTimeout(() => {
        setPaws((prev) => prev.filter((p) => p.id !== newPaw.id));
      }, 2500);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [pawsMode]);

  const handleBearClick = () => {
    setIsWaving(true);
    setShowSpeech(true);
    setQuoteIndex((prev) => (prev + 1) % PEACE_QUOTES.length);
    setTimeout(() => setIsWaving(false), 900);
  };

  return (
    <>
      {/* Contenedor de huellitas animadas flotantes en la página */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
        {paws.map((paw) => (
          <div
            key={paw.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 animate-in fade-in zoom-in-75"
            style={{
              left: `${paw.x}px`,
              top: `${paw.y}px`,
              transform: `rotate(${paw.rotation}deg)`,
            }}
          >
            {/* SVG Huellita de Oso Gestor de Paz */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary/40 drop-shadow-xs"
            >
              {/* Almohadilla central */}
              <ellipse cx="12" cy="15" rx="5" ry="4" fill="currentColor" />
              {/* 4 dedos superiores */}
              <circle cx="6" cy="9" r="2" fill="currentColor" />
              <circle cx="10" cy="7" r="2.2" fill="currentColor" />
              <circle cx="14" cy="7" r="2.2" fill="currentColor" />
              <circle cx="18" cy="9" r="2" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>

      {/* Widget Interactivo del Oso en la esquina inferior izquierda */}
      <aside aria-label="Mascota del proyecto: Oso Gestor de Paz" className="peace-bear-widget fixed bottom-6 left-6 z-50 flex items-end gap-2.5">
        <div className="relative group">
          {/* Globo de diálogo */}
          {showSpeech && (
            <div className="absolute bottom-20 left-0 w-64 sm:w-72 bg-background border border-border rounded-xl p-3.5 shadow-xl text-xs text-foreground animate-in fade-in slide-in-from-bottom-2 duration-200">
              <button
                type="button"
                onClick={() => setShowSpeech(false)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                aria-label="Cerrar mensaje"
              >
                <X size={13} />
              </button>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                <Sparkles size={12} /> Oso Gestor de Paz
              </div>
              <p className="italic leading-relaxed text-muted-foreground">
                {PEACE_QUOTES[quoteIndex]}
              </p>
              <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
                <button
                  type="button"
                  onClick={() => setQuoteIndex((prev) => (prev + 1) % PEACE_QUOTES.length)}
                  className="text-primary hover:underline font-semibold"
                >
                  Siguiente mensaje →
                </button>
                <button
                  type="button"
                  onClick={() => setPawsMode(!pawsMode)}
                  className="hover:underline flex items-center gap-1"
                >
                  <Footprints size={11} /> {pawsMode ? 'Huellitas activas' : 'Activar huellas'}
                </button>
              </div>
              {/* Flechita del globo */}
              <div className="absolute -bottom-2 left-6 w-3 h-3 bg-background border-r border-b border-border transform rotate-45" />
            </div>
          )}

          {/* Botón Mascota con animación */}
          <button
            type="button"
            onClick={handleBearClick}
            aria-label="Oso Gestor de Paz interactivo: presiona para recibir un mensaje de paz"
            className={`relative p-2 rounded-2xl bg-secondary/90 hover:bg-secondary border border-border shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${
              isWaving ? 'animate-bounce' : ''
            }`}
          >
            <img
              src={bear}
              alt="Oso Gestor de Paz oficial"
              className="w-11 h-12 object-contain"
            />
            {/* Pequeña insignia de huellita */}
            <span
              className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center shadow-xs text-white text-[10px] ${
                pawsMode ? 'bg-primary' : 'bg-muted-foreground'
              }`}
              title={pawsMode ? 'Huellas interactivas activas al hacer clic' : 'Huellas desactivadas'}
            >
              <Footprints size={11} />
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
