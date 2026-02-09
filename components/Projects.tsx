"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Projects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
    cards.forEach((card, i) => {
      if (i !== cards.length - 1) {
        gsap.to(card, {
          scale: 0.8,
          opacity: 0.5,
          scrollTrigger: {
            trigger: card,
            start: "top top", // When card hits top of stack area
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
  }, []);

  return (
    <section id="proyectos" className="relative pb-40 min-h-[300vh]">
      {/* Use min-h-300vh to give enough scroll room for sticky, or rely on content spacing */}
      <div className="px-10 py-20 text-center">
        <h2 className="text-xs uppercase tracking-[0.5em] text-white/30 mb-4">
          Selección Técnica
        </h2>
        <h3 className="text-6xl font-light mb-20">
          Casos de{" "}
          <span className="italic font-serif text-white/40">Éxito</span>
        </h3>
      </div>

      {/* Stack 1 */}
      <div className="stack-card sticky top-[10vh] w-[90vw] h-[80vh] mx-auto mb-[5vh] flex items-center justify-center overflow-hidden border border-white/5 bg-[#080808] z-10 shadow-2xl">
        <div className="absolute inset-0 opacity-20 video-placeholder grayscale"></div>
        <div className="relative z-20 text-center p-10 max-w-2xl">
          <span className="text-xs tracking-[0.5em] text-white/20 mb-6 block">
            01 / BRANDING & WEB
          </span>
          <h4 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 leading-tight">
            Vanguard Luxury Real Estate
          </h4>
          <p className="text-white/40 font-light text-lg">
            Ecosistema digital completo para el sector inmobiliario premium.
          </p>
        </div>
      </div>

      {/* Stack 2 */}
      <div className="stack-card sticky top-[10vh] w-[90vw] h-[80vh] mx-auto mb-[5vh] flex items-center justify-center overflow-hidden border border-white/5 bg-[#080808] z-20 shadow-2xl">
        <div className="absolute inset-0 opacity-20 video-placeholder grayscale"></div>
        <div className="relative z-20 text-center p-10 max-w-2xl">
          <span className="text-xs tracking-[0.5em] text-white/20 mb-6 block">
            02 / PRODUCT DESIGN
          </span>
          <h4 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 leading-tight">
            Nebula Fintech Ecosystem
          </h4>
          <p className="text-white/40 font-light text-lg">
            Interfaz de alta fidelidad para gestión de activos digitales.
          </p>
        </div>
      </div>

      {/* Stack 3 */}
      <div className="stack-card sticky top-[10vh] w-[90vw] h-[80vh] mx-auto mb-[5vh] flex items-center justify-center overflow-hidden border border-white/5 bg-[#080808] z-30 shadow-2xl">
        <div className="absolute inset-0 opacity-20 video-placeholder grayscale"></div>
        <div className="relative z-20 text-center p-10 max-w-2xl">
          <span className="text-xs tracking-[0.5em] text-white/20 mb-6 block">
            03 / MULTIMEDIA PRODUCTION
          </span>
          <h4 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 leading-tight">
            Epic Sportswear Campaign
          </h4>
          <p className="text-white/40 font-light text-lg">
            Contenido audiovisual viral que generó +1M en ventas orgánicas.
          </p>
        </div>
      </div>
    </section>
  );
}
