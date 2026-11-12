import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * Selectores de las zonas donde los widgets flotantes (oso y WhatsApp)
 * estorban: el mapa interactivo y el pie de página con los créditos.
 */
const WATCHED_SELECTORS = ["#mapa", "footer"];

function isNearViewport(element: Element) {
  const rect = element.getBoundingClientRect();
  // Margen inferior: evita que los widgets tapen el final de la página.
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

/**
 * Devuelve `true` cuando el mapa o el footer están a la vista, para ocultar
 * los widgets flotantes y dejar libres esas zonas.
 */
export function useFloatingWidgetsHidden() {
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return;
    }

    const visible = new Set<Element>();
    const targets = WATCHED_SELECTORS.flatMap((selector) =>
      Array.from(document.querySelectorAll(selector)),
    );

    targets.forEach((target) => {
      if (isNearViewport(target)) visible.add(target);
    });
    setHidden(visible.size > 0);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setHidden(visible.size > 0);
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [pathname]);

  return hidden;
}
