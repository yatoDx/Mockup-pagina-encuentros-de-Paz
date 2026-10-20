import { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Sparkles } from 'lucide-react';
import bear from '@/assets/peace-bear.png';

export function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMessage = encodeURIComponent(
    'Hola equipo de Gestores de Paz Escolares (IPAZUD / U. Distrital / E-PAZ). Me comunico para solicitar información sobre la vinculación de colegios al II Encuentro de Gestores de Paz.'
  );
  const whatsappUrl = `https://wa.me/573001234567?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover / Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-background border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-emerald-700 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 p-1 flex items-center justify-center">
                <img src={bear} alt="Oso Gestor de Paz" className="w-7 h-7 object-contain" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-display text-white">Red Gestores de Paz</h4>
                <span className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Equipo Gestor en Línea
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-md"
              aria-label="Cerrar ventana de WhatsApp"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-4 bg-muted/30 text-xs text-foreground space-y-2.5">
            <div className="bg-background border border-border/70 p-3 rounded-lg shadow-xs leading-relaxed">
              👋 <strong>¡Bienvenido(a)!</strong><br />
              ¿Tienes preguntas sobre el II Encuentro 2026, quieres registrar la experiencia de tu colegio o vincularte a la red?
            </div>
            <div className="text-[10.5px] text-muted-foreground flex items-center gap-1 px-1">
              <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
              Canal institucional · U. Distrital, IPAZUD y E-PAZ
            </div>
          </div>

          <div className="p-3 bg-background border-t border-border flex items-center justify-between gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-all"
              onClick={() => setIsOpen(false)}
            >
              <MessageCircle size={15} />
              Iniciar conversación en WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-background border border-border py-1.5 px-3 rounded-full text-xs font-medium text-foreground shadow-md cursor-pointer hover:border-emerald-500 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            ¿Dudas o vinculación? <strong>Chatea aquí</strong>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp'}
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 relative"
        >
          <MessageCircle size={26} />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
