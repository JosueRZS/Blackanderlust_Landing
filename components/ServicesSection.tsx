"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    section: "Marketing Digital",
    subtitle: "Estrategia y Alcance",
    items: [
      {
        title: "Social Authority",
        desc: "Dominio de algoritmos y construcción de comunidades leales.",
      },
      {
        title: "Paid Media High-End",
        desc: "Inversión inteligente con enfoque en ROI masivo y escalado.",
      },
      {
        title: "Content Cinematic",
        desc: "Narrativas visuales que elevan el valor percibido del producto.",
      },
      {
        title: "Brand Identity",
        desc: "Creación de marcas icónicas que trascienden modas efímeras.",
      },
    ],
  },
  {
    section: "Desarrollo de Software",
    subtitle: "Ingeniería Vanguardista",
    items: [
      {
        title: "Performance Web",
        desc: "Velocidad extrema y experiencias fluidas con Next.js.",
      },
      {
        title: "E-commerce Luxury",
        desc: "Plataformas de venta boutique diseñadas para la exclusividad.",
      },
      {
        title: "Sistemas Dinámicos",
        desc: "Automatización de procesos complejos mediante software a medida.",
      },
      {
        title: "Interactive UI",
        desc: "Micro-interacciones y diseño que respira y reacciona al usuario.",
      },
    ],
  },
  {
    section: "Growth Partner",
    subtitle: "Resultados Exponenciales",
    items: [
      {
        title: "Ecosistemas de CRM",
        desc: "Gestión inteligente de leads para maximizar el ciclo de vida.",
      },
      {
        title: "Growth Design",
        desc: "Iteración constante basada en datos reales de comportamiento.",
      },
      {
        title: "Escalado de Venture",
        desc: "Preparación de infraestructura para crecimientos exponenciales.",
      },
      {
        title: "Data Analytics",
        desc: "Dashboarding y toma de decisiones sin margen de error.",
      },
    ],
  },
];

export default function ServicesSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>(".service-block");

      blocks.forEach((block, idx) => {
        const track = block.querySelector(".cards-track") as HTMLElement;
        const titleEl = block.querySelector(".title-content") as HTMLElement;
        const overlay = block.querySelector(".overlay-gradient") as HTMLElement;
        if (!track || !titleEl) return;

        const goesLeft = idx % 2 === 0;
        const vw = window.innerWidth;
        const trackW = track.scrollWidth;
        const pad = vw >= 768 ? 80 : 40;
        const titleW = titleEl.offsetWidth;

        // Título: distancia del centro al borde
        const titleShift = vw / 2 - pad - titleW / 2;
        const titleDx = goesLeft ? -titleShift : titleShift;

        // Cards arrancan TOTALMENTE FUERA (overflow) y terminan dejando un gap 'pad'
        const cardStart = goesLeft ? vw : -trackW;
        const cardEnd = goesLeft ? -(trackW - vw + pad) : pad;
        const totalTravel = Math.abs(cardEnd - cardStart) + 400;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top top",
            end: `+=${totalTravel}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Título: movimiento lineal suave desde el centro hacia el lado opuesto de las cards 
        tl.to(titleEl, { x: titleDx, duration: 0.4, ease: "power2.inOut" }, 0);

        // Overlay: aparece gradualmente a medida que el título se mueve
        if (overlay) {
          tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.1);
        }

        // Cards: Ingreso desde overflow del viewport y cruce horizontal completo
        tl.fromTo(
          track,
          { x: cardStart },
          { x: cardEnd, duration: 1, ease: "none" },
          0
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-[#050505] w-full relative overflow-hidden"
    >
      {SERVICES.map((svc, idx) => {
        const goesLeft = idx % 2 === 0;
        return (
          <div key={idx} className="service-block relative">
            <div className="h-screen w-full overflow-hidden relative">
              {/* Overlay en el lado donde aterriza el título */}
              <div
                className={`overlay-gradient absolute inset-y-0 w-1/2 z-20 pointer-events-none opacity-0 ${
                  goesLeft
                    ? "left-0 bg-linear-to-r from-[#050505] via-[#050505]/80 to-transparent"
                    : "right-0 bg-linear-to-l from-[#050505] via-[#050505]/80 to-transparent"
                }`}
              />

              {/* Título — empieza centrado, GSAP lo lleva al lado correspondiente */}
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <div className="title-content">
                  <h2 className="text-5xl md:text-7xl font-thin text-white leading-none mb-4">
                    {svc.section.split(" ")[0]}
                    <br />
                    <span className="italic text-zinc-500">
                      {svc.section.split(" ").slice(1).join(" ")}
                    </span>
                  </h2>
                  <p className="text-xs uppercase tracking-[0.5em] text-zinc-600">
                    {svc.subtitle}
                  </p>
                </div>
              </div>

              {/* Cards — posicionadas en absolute para que el título se centre sin su interferencia */}
              <div 
                className="cards-track flex h-screen items-center gap-8 will-change-transform absolute top-0 left-0 w-max"
                style={{ transform: goesLeft ? "translateX(100vw)" : "translateX(-100%)" }}
              >
                {svc.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="shrink-0 w-[25vw] h-[50vh] bg-zinc-900/30 border border-white/5 overflow-hidden group hover:bg-white/5 transition-all duration-500"
                  >
                    <div className="h-full p-8 flex flex-col justify-between">
                      <span className="text-4xl font-thin text-white/20 group-hover:text-white/30 transition-colors">
                        {String(itemIdx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xl font-light text-white mb-3 tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
