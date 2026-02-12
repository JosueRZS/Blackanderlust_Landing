import { useState, useEffect, useCallback } from "react";

export type MediaItem = {
  readonly type: "video" | "image";
  readonly src: string;
};

const MEDIA_ITEMS: readonly MediaItem[] = [
  { type: "video", src: "/videos/mkt/advertising/agencia-viajes.mp4" },
  { type: "video", src: "/videos/mkt/advertising/agencia.mp4" },
  { type: "video", src: "/videos/mkt/advertising/anzuelo.mp4" },
  { type: "video", src: "/videos/mkt/advertising/bloque.mp4" },
  { type: "video", src: "/videos/mkt/advertising/demo-app-2.mp4" },
  { type: "video", src: "/videos/mkt/advertising/demo-app-3.mp4" },
  { type: "video", src: "/videos/mkt/advertising/demo-app.mp4" },
  { type: "video", src: "/videos/mkt/advertising/demo-tarjeta.mp4" },
  { type: "video", src: "/videos/mkt/advertising/digital.mp4" },
  { type: "video", src: "/videos/mkt/advertising/ecommerce.mp4" },
  { type: "video", src: "/videos/mkt/advertising/sisesco.mp4" },
  { type: "video", src: "/videos/mkt/advertising/vegas.mp4" },
  { type: "video", src: "/videos/mkt/products/joya1.mp4" },
  { type: "video", src: "/videos/mkt/products/joya2.mp4" },
  { type: "video", src: "/videos/mkt/products/reloj.mp4" },
] as const;

/**
 * Hook universal de precarga de media.
 *
 * Escanea TODOS los elementos del DOM que tengan `data-preload`:
 *   - <video data-preload> → espera readyState >= 3 (HAVE_FUTURE_DATA)
 *   - <img data-preload>   → espera naturalWidth > 0 (decoded)
 *
 * Funciona para CreativeHero, ServiceCards, Header, Footer, etc.
 * Cualquier componente solo necesita agregar data-preload a su <video> o <img>.
 */
export function useMediaLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const checkMedia = useCallback(() => {
    const elements = document.querySelectorAll("[data-preload]");
    if (elements.length === 0) return;

    let ready = 0;
    elements.forEach((el) => {
      if (el.tagName === "VIDEO") {
        if ((el as HTMLVideoElement).readyState >= 3) ready++;
      } else if (el.tagName === "IMG") {
        if (
          (el as HTMLImageElement).complete &&
          (el as HTMLImageElement).naturalWidth > 0
        )
          ready++;
      }
    });

    const pct = Math.round((ready / elements.length) * 100);
    setProgress(pct);
    if (ready === elements.length) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(checkMedia, 250);

    // Fallback: después de 8s forzar completar
    const fallback = setTimeout(() => {
      setProgress(100);
      setIsLoaded(true);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallback);
    };
  }, [checkMedia]);

  return { progress, isLoaded, mediaItems: MEDIA_ITEMS };
}
