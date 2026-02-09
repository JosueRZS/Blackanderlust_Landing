"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from("#hero-title", {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      delay: 0.2,
    });
    gsap.from("#hero-sub", {
      y: 30,
      opacity: 0,
      duration: 1.5,
      delay: 0.7,
      ease: "power4.out",
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col items-center justify-center px-10 text-center text-white overflow-hidden"
    >
      {/* Usando la clase exacta del Sketch para el background */}
      <div className="video-placeholder absolute inset-0 -z-10 opacity-40"></div>

      <div className="max-w-5xl relative z-10">
        <h1
          id="hero-title"
          className="text-6xl md:text-8xl font-light tracking-tight mb-8"
        >
          Creatividad <br />{" "}
          <span className="italic font-serif">con Resultados.</span>
        </h1>
        <p
          id="hero-sub"
          className="max-w-xl mx-auto text-white/40 text-lg font-light leading-relaxed"
        >
          Boceto: Aquí el video de fondo será 4K, con un degradado sutil para
          resaltar el texto minimalista.
        </p>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-50">
        <div className="h-12 w-px bg-linear-to-b from-white to-transparent"></div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">
          Scroll para explorar
        </span>
      </div>
    </section>
  );
}
