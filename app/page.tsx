"use client";

import { useState } from "react";
import Header from "../components/Header";
import Services from "../components/Services";
import Preloader from "../components/Preloader";
import CreativeHero from "../components/CreativeHero";
import { useMediaLoader } from "../hooks/useMediaLoader";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const { progress, mediaItems } = useMediaLoader();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Preloader
        onComplete={() => {
          setShowContent(true);
        }}
        progress={progress}
      />

      <div className="relative w-full h-full">
        <Header />
        <CreativeHero isReady={showContent} mediaItems={mediaItems} />
        <Services />

        <footer className="p-20 text-center border-t border-white/5 relative z-20">
          <p className="text-[10px] tracking-widest text-white/20">
            © 2026 BACKΛNDERLUST STUDIO
          </p>
        </footer>
      </div>
    </main>
  );
}
