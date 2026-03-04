import { useRef, useState } from "react";
import HeroSection from "@/components/HeroSection";
import SunglassesCustomizer from "@/components/SunglassesCustomizer";
import VirtualTryOn from "@/components/VirtualTryOn";
/ The new Maze component

const THEME_RED = "hsl(0, 100%, 56.19%)";

const Index = () => {
  const customizerRef = useRef<HTMLDivElement>(null);
  const tryOnRef = useRef<HTMLDivElement>(null);
  const mazeRef = useRef<HTMLDivElement>(null);

  const [frameShape, setFrameShape] = useState("Meta wayfarer");
  const [frameColor, setFrameColor] = useState("#111111");
  const [lensColor, setLensColor] = useState("dark");
  const [templeStyle, setTempleStyle] = useState("standard");

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      {/* 1. HERO SECTION */}
      <HeroSection
        onStartCustomizing={() => scrollTo(mazeRef)} // Direct them to the Maze first!
        onTryOn={() => scrollTo(tryOnRef)}
      />

      {/* 2. THE MAZE (The Guerilla Bridge) */}


      {/* 3. CUSTOMIZER SECTION */}
      <div ref={customizerRef} id="customizer-section">
        <SunglassesCustomizer
          frameShape={frameShape} setFrameShape={setFrameShape}
          frameColor={frameColor} setFrameColor={setFrameColor}
          lensColor={lensColor} setLensColor={setLensColor}
          templeStyle={templeStyle} setTempleStyle={setTempleStyle}
        />
      </div>

      {/* 4. VIRTUAL TRY-ON */}
      <div ref={tryOnRef}>
        <VirtualTryOn
          frameShape={frameShape}
          frameColor={frameColor}
          lensColor={lensColor}
          templeStyle={templeStyle}
        />
      </div>

      {/* 5. THEMED FOOTER */}
      <footer 
        className="py-20 px-4 sm:px-6 border-t border-white/10"
        style={{ backgroundColor: THEME_RED }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12 border-b border-white/20 pb-12">
            <div className="max-w-xs">
              <span className="font-display text-4xl font-black text-white italic tracking-tighter">
                Vision-Unfiltered
              </span>
              <p className="text-white/70 text-xs font-body leading-relaxed mt-4 uppercase tracking-widest">
                Disrupting vision since 2024. Engineered for the bold, the custom, and the wild.
              </p>
            </div>
            
            <div className="flex gap-8 text-white/50 font-mono text-[10px] uppercase tracking-[0.3em]">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Archive</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase">
              © 2026 Vision-Unfiltered. SCHOOL PROJECT — NOT A REAL BRAND.
            </p>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse bg-white" />
                <span className="text-white/60 text-[9px] font-mono uppercase">System_Active</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
