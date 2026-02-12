"use client";

import gsap from "gsap";
import SplitType from "split-type";
import { useState, useEffect, useRef } from "react";
import { MediaItem } from "../hooks/useMediaLoader";

function VideoItem({ src }: { src: string }) {
  return (
    <video
      src={src}
      loop
      muted
      autoPlay
      playsInline
      preload="metadata"
      className="w-full h-full object-cover grayscale brightness-[0.8] contrast-[1.15]"
    />
  );
}

function HorizontalRow({
  items,
  speed,
  reverse = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  speed: number;
  reverse?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    let tween: gsap.core.Tween;

    const startAnimation = () => {
      const totalWidth = row.scrollWidth / 2;
      if (totalWidth <= 0) return;

      gsap.set(row, { x: reverse ? -totalWidth : 0 });

      tween = gsap.to(row, {
        x: reverse ? 0 : -totalWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
        force3D: true,
        overwrite: "auto",
      });
    };

    const timeout = setTimeout(startAnimation, 200);
    return () => {
      clearTimeout(timeout);
      if (tween) tween.kill();
    };
  }, [speed, reverse]);

  const displayItems = [...items, ...items];

  return (
    <div className="w-full relative overflow-hidden h-36 md:h-44 will-change-transform">
      <div ref={rowRef} className="flex gap-4 px-2 w-max">
        {displayItems.map((item, i) => (
          <div
            key={i}
            className="relative aspect-video h-32 md:h-40 shrink-0 bg-[#0a0a0a] overflow-hidden rounded-2xl border border-white/5 shadow-2xl"
          >
            <VideoItem src={item.src} />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

function VerticalColumn({
  items,
  speed,
  reverse = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  speed: number;
  reverse?: boolean;
}) {
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const column = columnRef.current;
    if (!column) return;

    const startAnimation = () => {
      const totalHeight = column.scrollHeight / 2;
      gsap.set(column, { y: reverse ? -totalHeight : 0 });
      gsap.to(column, {
        y: reverse ? 0 : -totalHeight,
        duration: speed,
        ease: "none",
        repeat: -1,
        force3D: true,
      });
    };

    const timeout = setTimeout(startAnimation, 100);
    return () => clearTimeout(timeout);
  }, [speed, reverse]);

  const displayItems = [...items, ...items];

  return (
    <div className="flex-1 min-w-37.5 md:min-w-50 lg:min-w-60 relative h-full hero-column will-change-transform">
      <div ref={columnRef} className="flex flex-col gap-6 py-4">
        {displayItems.map((item, i) => (
          <div
            key={i}
            className="relative aspect-4/5 w-full bg-[#0a0a0a] overflow-hidden rounded-2xl border border-white/5 shadow-2xl"
          >
            <VideoItem src={item.src} />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CreativeHero({
  isReady = false,
  mediaItems,
}: {
  isReady?: boolean;
  mediaItems: readonly MediaItem[];
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detección de dispositivo para evitar renderizar videos innecesarios
  // isMobile === null indica que aún no se ha montado en el cliente (evita hidratación errónea)
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Ref para controlar que la animación ya se ejecutó o está en proceso
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Si no está listo o faltan referencias, salir.
    if (
      !isReady ||
      !titleRef.current ||
      !subRef.current ||
      !containerRef.current
    )
      return;

    // Si ya animamos, no volvemos a ejecutar (evita efecto doble máquina de escribir en StrictMode)
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    // Variables para las instancias de SplitType con alcance para el cleanup
    let titleSplit: SplitType;

    const ctx = gsap.context(() => {
      // 1. Inicializar SplitType DENTRO del contexto
      try {
        titleSplit = new SplitType(titleRef.current!, { types: "chars,words" });
      } catch (e) {
        console.error("SplitType error:", e);
        return;
      }

      // 2. Estado Inicial (Seteamos inmediatamente para evitar FOUC)
      gsap.set(titleSplit.chars, { opacity: 0, y: 30, rotateX: -90 });
      gsap.set(subRef.current, { opacity: 0, y: 20 }); // Párrafo como bloque - oculto
      gsap.set(".hero-column-group", { opacity: 0, y: 50 });
      gsap.set(".scroll-indicator", { opacity: 0 });

      // IMPORTANTE: Hacer visible el título ahora que está listo (con letras ocultas)
      // NO hacemos visible el párrafo aún - dejamos que GSAP lo controle en la animación
      gsap.set(titleRef.current, { opacity: 1 });

      const tl = gsap.timeline();

      // 3. Secuencia de Animación (más rápida)
      tl.to(titleSplit.chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.015,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          subRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "+=0.2",
        ) // Inicia 0.2s DESPUÉS de que el título termine
        .to(
          ".hero-column-group",
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.6",
        ) // Los videos entran suavemente mientras se termina de leer
        .to(
          ".scroll-indicator",
          {
            opacity: 0.6,
            duration: 0.6,
          },
          "-=0.3",
        );

      // 4. Animación del indicador de scroll (Solo movimiento interno del punto)
      gsap.fromTo(
        ".scroll-dot",
        { y: -8, opacity: 1 },
        {
          y: 24,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          ease: "power2.inOut",
        },
      );
    }, containerRef);

    // Cleanup function
    return () => {
      ctx.revert(); // Revierte cambios de GSAP
      if (titleSplit) titleSplit.revert(); // Revierte el DOM split
      hasAnimatedRef.current = false; // Permitimos re-animar si el componente se reinicia por completo
    };
  }, [isReady]);

  const col1 = mediaItems.slice(0, 4);
  const col2 = mediaItems.slice(4, 8);
  const col3 = mediaItems.slice(8, 12);
  const col4 = mediaItems.slice(12, 15);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center"
    >
      {/* Background Marquee Columns - Renderizado condicional para ahorrar red */}
      <div className="absolute inset-0 hero-column-group opacity-0 overflow-hidden">
        {isMobile === false && (
          <div className="flex h-full w-full gap-4 p-4">
            <VerticalColumn items={col1} speed={40} />
            <VerticalColumn items={col2} speed={50} reverse />
            <div className="hidden md:block flex-1">
              <VerticalColumn items={col3} speed={45} />
            </div>
            <div className="hidden lg:block flex-1">
              <VerticalColumn items={col4} speed={55} reverse />
            </div>
          </div>
        )}

        {isMobile === true && (
          <div className="flex flex-col h-full w-full justify-center gap-4 py-10 translate-y-[-2%] scale-110">
            <HorizontalRow items={col1} speed={25} />
            <HorizontalRow items={col3} speed={30} reverse />
            <HorizontalRow items={col2} speed={22} />
            <HorizontalRow items={col4} speed={28} reverse />
          </div>
        )}
      </div>

      {/* Overlays - mucho más oscuro y visible para que se note el contraste con el texto */}
      {/* Overlay DETRÁS del texto solamente - MÁS VISIBLE */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 1200px 600px at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,1) 90%)",
        }}
      />

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-20 text-center">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-light tracking-tight mb-8 text-white leading-tight opacity-0"
        >
          Creatividad <br />{" "}
          <span className="italic font-serif">con Resultados</span>
        </h1>
        <p
          ref={subRef}
          className="max-w-xl mx-auto text-white/80 text-lg font-light leading-relaxed opacity-0"
        >
          Agencia creativa especializada en experiencias digitales <br />
          de alto impacto y diseño centrado en el usuario.
        </p>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-0 z-20 scroll-indicator">
        <div className="w-7 h-11 border border-white/30 rounded-full flex justify-center p-2 overflow-hidden scroll-mouse">
          <div className="w-1 h-3 bg-white rounded-full scroll-dot"></div>
        </div>
        <span className="text-[10px] font-light tracking-[0.4em] uppercase">
          Scroll para explorar
        </span>
      </div>
    </section>
  );
}
