"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -20,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      delay: 1.5, // Espera a que el preloader empiece a subir
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-50 w-full p-8 flex justify-between items-center bg-linear-to-b from-black/20 to-transparent backdrop-blur-[2px]"
    >
      {/* Logo */}
      <div className="text-xl font-bold tracking-tighter">BΛ.</div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-12 text-[11px] uppercase tracking-widest text-white/50">
        <a
          href="#servicios"
          data-cursor="link"
          className="hover:text-white transition-colors"
        >
          Servicios
        </a>
        <a
          href="#proyectos"
          data-cursor="link"
          className="hover:text-white transition-colors"
        >
          Proyectos
        </a>
        <a
          href="#"
          data-cursor="link"
          className="hover:text-white transition-colors"
        >
          Agencia
        </a>
      </div>

      {/* CTA Button */}
      <button
        data-cursor="link"
        className="text-[11px] uppercase tracking-widest border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all"
      >
        Contacto
      </button>
    </header>
  );
}
