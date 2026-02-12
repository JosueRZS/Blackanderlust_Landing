"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Preloader({
  onComplete,
  progress,
}: {
  onComplete: () => void;
  progress: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const progressValueRef = useRef({ value: 0 });
  const hasCompletedRef = useRef(false);

  // Función para completar el preloader
  const completePreloader = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    // Asegurar que llegue al 100% con GSAP para suavidad total
    gsap.to(progressValueRef.current, {
      value: 100,
      duration: 0.8, // Damos tiempo a que se vea el 100
      ease: "power2.out",
      onUpdate: () => {
        setDisplayProgress(Math.round(progressValueRef.current.value));
      },
      onComplete: () => {
        // Solo cuando llega al 100% real, esperamos un poco y subimos
        setTimeout(() => {
          gsap.to(containerRef.current, {
            y: "-100%",
            duration: 1.4, // Salida más majestuosa
            ease: "expo.inOut",
            onComplete,
          });
        }, 600); // Un respiro mayor en el 100%
      },
    });
  }, [onComplete]);

  // Sincronizar displayProgress de forma suave con GSAP
  useEffect(() => {
    if (progress === 100) {
      completePreloader();
      return;
    }

    // Animamos el valor interno para que la transición de números sea fluida
    gsap.to(progressValueRef.current, {
      value: progress,
      duration: 0.5, // Reducimos para que sea más reactivo
      ease: "none", // Lineal para que no parezca que frena ante pequeños incrementos
      overwrite: true, // Evita conflictos entre tweens sucesivos
      onUpdate: () => {
        setDisplayProgress(Math.round(progressValueRef.current.value));
      },
    });
  }, [progress, completePreloader]);

  return (
    <div
      ref={containerRef}
      id="preloader"
      className="fixed inset-0 z-100 bg-black flex items-center justify-center"
    >
      <div className="text-center w-full max-w-sm px-10">
        <div className="mb-4 h-px w-full bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-white absolute top-0 left-0 transition-all duration-300 ease-out"
            style={{ width: `${displayProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center w-full px-1">
          <p className="text-[11px] tracking-[0.6em] text-white/70 uppercase font-medium">
            Cargando
          </p>
          <p className="text-[11px] font-mono text-white/90">
            {displayProgress}%
          </p>
        </div>
      </div>
    </div>
  );
}
