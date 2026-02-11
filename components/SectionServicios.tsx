"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    section: "Marketing Digital",
    subtitle: "Estrategia y Alcance",
    items: [
      { title: "Social Authority", desc: "Dominio de algoritmos y construcción de comunidades leales." },
      { title: "Paid Media High-End", desc: "Inversión inteligente con enfoque en ROI masivo y escalado." },
      { title: "Content Cinematic", desc: "Narrativas visuales que elevan el valor percibido del producto." },
      { title: "Brand Identity", desc: "Creación de marcas icónicas que trascienden modas efímeras." },
    ],
  },
  {
    section: "Desarrollo de Software",
    subtitle: "Ingeniería Vanguardista",
    items: [
      { title: "Performance Web", desc: "Velocidad extrema y experiencias fluidas con Next.js." },
      { title: "E-commerce Luxury", desc: "Plataformas de venta boutique diseñadas para la exclusividad." },
      { title: "Sistemas Dinámicos", desc: "Automatización de procesos complejos mediante software a medida." },
      { title: "Interactive UI", desc: "Micro-interacciones y diseño que respira y reacciona al usuario." },
    ],
  },
  {
    section: "Growth Partner",
    subtitle: "Resultados Exponenciales",
    items: [
      { title: "Ecosistemas de CRM", desc: "Gestión inteligente de leads para maximizar el ciclo de vida." },
      { title: "Growth Design", desc: "Iteración constante basada en datos reales de comportamiento." },
      { title: "Escalado de Venture", desc: "Preparación de infraestructura para crecimientos exponenciales." },
      { title: "Data Analytics", desc: "Dashboarding y toma de decisiones sin margen de error." },
    ],
  },
];

export default function SectionServicios() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [serviceIndex, setServiceIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const trackWidth = track.scrollWidth;
      const containerWidth = section.clientWidth;
      const distance = trackWidth - containerWidth;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${distance}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateService = () => {
      const cards = track.querySelectorAll("[data-card-idx]");
      let active = 0;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        // Si el card está en la mitad izquierda de la pantalla
        if (rect.left < window.innerWidth / 2 && rect.right > window.innerWidth / 6) {
          const idx = parseInt(card.getAttribute("data-card-idx") || "0");
          // Determinar qué servicio (0-3: Marketing, 4-7: Desarrollo, 8-11: Growth)
          active = Math.floor(idx / 4);
        }
      });

      setServiceIndex(Math.min(active, SERVICES.length - 1));
    };

    const observer = new ResizeObserver(updateService);
    observer.observe(track);

    window.addEventListener("scroll", updateService);
    updateService();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateService);
    };
  }, []);

  const service = SERVICES[serviceIndex] || SERVICES[0];

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative h-screen overflow-hidden"
    >
      {/* Overlay - Tailwind Puro */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-[#050505] to-transparent z-20 pointer-events-none" />

      {/* Header - Título que transiciona */}
      <div className="absolute inset-0 flex items-center z-30 pointer-events-none px-20">
        <div className="max-w-2xl">
          {service && (
            <>
              <h2 className="text-7xl font-thin text-white leading-none mb-4 transition-all duration-500">
                {service.section.split(" ")[0]}
                <br />
                <span className="italic text-zinc-500">
                  {service.section.split(" ").slice(1).join(" ")}
                </span>
              </h2>
              <p className="text-xs uppercase tracking-[0.5em] text-zinc-600 transition-all duration-500">
                {service.subtitle}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Track - Todas las secciones */}
      <div
        ref={trackRef}
        className="flex h-screen items-center gap-8 pl-[50vw] pr-[50vw]"
      >
        {SERVICES.map((svc, svcIdx) =>
          svc.items.map((item, itemIdx) => {
            const globalIdx = svcIdx * 4 + itemIdx;
            return (
              <div
                key={`${svcIdx}-${itemIdx}`}
                data-card-idx={globalIdx}
                className="w-[25vw] h-[50vh] bg-zinc-900/30 border border-white/5 shrink-0 overflow-hidden"
              >
                <div className="h-full p-8 flex flex-col justify-between">
                  <span className="text-4xl font-thin text-white/20">
                    {String(itemIdx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-light text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
