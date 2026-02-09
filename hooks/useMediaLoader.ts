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
    let loadedCount = 0;
    const total = MEDIA_ITEMS.length;

    const incrementProgress = () => {
      loadedCount++;
      const newProgress = Math.round((loadedCount / total) * 100);
      setProgress(newProgress);

      if (loadedCount === total) {
        setIsLoaded(true);
      }
    };

    MEDIA_ITEMS.forEach((item) => {
      const video = document.createElement("video");
      video.src = item.src;
      video.preload = "auto";
      video.onloadedmetadata = incrementProgress;
      video.onerror = incrementProgress;
    });
  }, []);

  return {
    progress,
    isLoaded,
    mediaItems: MEDIA_ITEMS,
  };
}
