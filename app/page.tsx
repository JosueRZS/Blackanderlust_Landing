"use client";

import Header from "../components/Header";
// import SectionServicios from "../components/SectionServicios";
import ServicesSection from "../components/ServicesSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <Header />

      <div className="relative z-10 pt-[20vh]">
        {/* <SectionServicios /> */}
        <ServicesSection />
      </div>

      <footer className="py-20 text-center border-t border-white/5 relative z-20 bg-[#050505]">
        <p className="text-[10px] tracking-[0.5em] text-white/20 uppercase font-light">
          © 2026 BLACKANDERLUST STUDIO
        </p>
      </footer>
    </main>
  );
}
