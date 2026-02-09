"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({
  onComplete,
  progress,
}: {
  onComplete: () => void;
  progress: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  // Timeline lineal que corre 3 segundos independiente
  useEffect(() => {
    if (!timelineRef.current) {
      timelineRef.current = gsap.timeline({ paused: true });

      timelineRef.current.to(
        { val: 0 },
        {
          val: 90,
          duration: 3,
          ease: "none", // Lineal puro
          onUpdate(e) {
            const value = Math.floor(e.targets()[0].val);
            setDisplayProgress(value);
          },
        },
      );

      timelineRef.current.play();
    }
  }, []);

  // Cuando la carga real termina
  useEffect(() => {
    if (progress === 100 && containerRef.current) {
      // Pausar timeline
      if (timelineRef.current) {
        timelineRef.current.pause();
      }

      // Completar al 100%
      gsap.to(
        { val: displayProgress },
        {
          val: 100,
          duration: 0.3,
          ease: "power2.out",
          onUpdate(e) {
            setDisplayProgress(Math.floor(e.targets()[0].val));
          },
          onComplete: () => {
            // Esperar 300ms antes de subir
            setTimeout(() => {
              gsap.to(containerRef.current, {
                y: "-100%",
                duration: 1.4,
                ease: "expo.inOut",
                onComplete: onComplete,
              });
            }, 300);
          },
        },
      );
    }
  }, [progress, displayProgress, onComplete]);

  return (
    <div
      ref={containerRef}
      id="preloader"
      className="fixed inset-0 z-100 flex items-center justify-center bg-black"
    >
      <div className="text-center">
        <div className="mb-4 h-px w-64 bg-white/10 overflow-hidden relative">
          <div
            ref={barRef}
            className="h-full bg-white absolute top-0 left-0 transition-none"
            style={{ width: `${displayProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center w-64">
          <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase">
            Cargando
          </p>
          <p className="text-[10px] font-mono text-white/40">
            {displayProgress}%
          </p>
        </div>
      </div>
    </div>
  );
}
