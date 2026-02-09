"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = gsap.utils.toArray<HTMLElement>(".reveal-item");
    items.forEach((item) => {
      gsap.from(item, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <section
      id="servicios"
      ref={containerRef}
      className="py-40 px-10 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
        {/* 01. Growth Partner */}
        <div className="reveal-item">
          <div className="aspect-4/5 rounded-lg mb-10 bg-linear-to-br from-[#111] to-[#1a1a1a] flex items-center justify-center border border-white/5 overflow-hidden">
            <span className="text-white/5 font-black uppercase tracking-widest text-xl">
              VIDEO ASSET
            </span>
          </div>
          <h3 className="text-2xl font-normal mb-4 text-white">
            01. Growth Partner
          </h3>
          <p className="text-white/40 leading-relaxed font-normal">
            Estrategia técnica para escalar marcas. Animación: Al hacer hover,
            el video se reproduce a velocidad x1.5.
          </p>
        </div>

        {/* 02. Multimedia */}
        <div className="reveal-item md:mt-40">
          <div className="aspect-4/5 rounded-lg mb-10 bg-linear-to-br from-[#111] to-[#1a1a1a] flex items-center justify-center border border-white/5 overflow-hidden">
            <span className="text-white/5 font-black uppercase tracking-widest text-xl">
              VIDEO ASSET
            </span>
          </div>
          <h3 className="text-2xl font-normal mb-4 text-white">
            02. Multimedia
          </h3>
          <p className="text-white/40 leading-relaxed font-normal">
            Producción de contenido 4K. Animación: Desplazamiento parallax de la
            miniatura.
          </p>
        </div>
      </div>
    </section>
  );
}
