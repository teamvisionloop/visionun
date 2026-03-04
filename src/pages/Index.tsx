import { useRef, useState } from "react";
import HeroSection from "@/components/HeroSection";
import SunglassesCustomizer from "@/components/SunglassesCustomizer";
import VirtualTryOn from "@/components/VirtualTryOn";

const THEME_RED = "hsl(0, 100%, 56.19%)";

const Index = () => {
  const customizerRef = useRef<HTMLDivElement>(null);
  const tryOnRef = useRef<HTMLDivElement>(null);

  const [frameShape, setFrameShape] = useState("Meta wayfarer");
  const [frameColor, setFrameColor] = useState("#111111");
  const [lensColor, setLensColor] = useState("dark");
  const [templeStyle, setTempleStyle] = useState("standard");

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        onStartCustomizing={() => scrollTo(customizerRef)}
        onTryOn={() => scrollTo(tryOnRef)}
      />
      
      <div ref={customizerRef}>
        <SunglassesCustomizer
          frameShape={frameShape} setFrameShape={setFrameShape}
          frameColor={frameColor} setFrameColor={setFrameColor}
          lensColor={lensColor} setLensColor={setLensColor}
          templeStyle={templeStyle} setTempleStyle={setTempleStyle}
        />
      </div>

      <div ref={tryOnRef}>
        <VirtualTryOn
          frameShape={frameShape}
          frameColor={frameColor}
          lensColor={lensColor}
          templeStyle={templeStyle}
        />
      </div>

      {/* Footer - Vision Unfiltered Production Theme */}
      <footer 
        className="py-16 px-4 sm:px-6 border-t border-white/10"
        style={{ backgroundColor: THEME_RED }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/20 pb-12">
            <div className="text-center md:text-left">
              <span className="font-display text-3xl sm:text-4xl font-black text-white italic tracking-tighter uppercase">
                VISION-UNFILTERED
              </span>
              <p className="text-white/60 text-[10px] font-mono leading-relaxed mt-2 uppercase tracking-[0.3em]">
                Raw detail. No compromise.
              </p>
            </div>
            
            <div className="flex gap-6 text-white/80 font-body text-[10px] font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-black transition-colors duration-300">Instagram</a>
              <a href="#" className="hover:text-black transition-colors duration-300">Manifesto</a>
              <a href="#" className="hover:text-black transition-colors duration-300">Contact</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <p className="text-white/40 text-[9px] font-mono tracking-widest uppercase">
              © 2026 VISION-UNFILTERED. SCHOOL PROJECT — NOT A REAL BRAND.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-white" />
              <span className="text-white/40 text-[9px] font-mono uppercase tracking-tighter">Live_Feed_Active</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
