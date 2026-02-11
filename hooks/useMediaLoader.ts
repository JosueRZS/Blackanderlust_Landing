import { useState, useEffect } from "react";

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

export function useMediaLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000; // 3 segundos
    let isMounted = true;

    // Actualizar progreso con un poco de aleatoriedad para que se sienta real
    const progressInterval = setInterval(() => {
      if (!isMounted) return;

      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        // Añadimos una pequeña variación aleatoria para que no sea estrictamente lineal
        const baseProgress = (elapsed / duration) * 92;
        const randomFactor = Math.sin(elapsed / 200) * 2; // Oscilación suave
        const newProgress = Math.min(
          95,
          Math.round(baseProgress + randomFactor),
        );

        setProgress((prev) => {
          // Solo actualizamos si el nuevo progreso es mayor para evitar retrocesos
          return newProgress > prev ? newProgress : prev;
        });
      }
    }, 100);

    // Completar después de 3 segundos
    const completeTimer = setTimeout(() => {
      if (isMounted) {
        clearInterval(progressInterval);
        setProgress(100);
        setIsLoaded(true);
      }
    }, duration + 50);

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, []);

  return {
    progress,
    isLoaded,
    mediaItems: MEDIA_ITEMS,
  };
}
