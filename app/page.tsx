"use client";

import { useState } from "react";
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import CreativeHero from "../components/CreativeHero";
// import Services from "../components/Services";
import { useMediaLoader } from "../hooks/useMediaLoader";
// import SectionServicios from "../components/SectionServicios";
import ServicesSection from "../components/ServicesSection";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const { progress, mediaItems } = useMediaLoader();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {!showContent && (
        <Preloader
          onComplete={() => {
            setShowContent(true);
          }}
          progress={progress}
        />
      )}

      <div className="relative w-full h-full">
        <Header />
        <CreativeHero isReady={showContent} mediaItems={mediaItems} />
        {/* <Services /> */}
        <ServicesSection />
        <footer className="p-20 text-center border-t border-white/5 relative z-20">
          <p className="text-[10px] tracking-widest text-white/20">
            © 2026 BACKΛNDERLUST STUDIO
          </p>
        </footer>
      </div>

      <footer className="py-20 text-center border-t border-white/5 relative z-20 bg-[#050505]">
        <p className="text-[10px] tracking-[0.5em] text-white/20 uppercase font-light">
          © 2026 BLACKANDERLUST STUDIO
        </p>
      </footer>
    </main>
  );
}
