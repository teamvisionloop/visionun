import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SunglassesPreview from "./SunglassesPreview";

// --- Types & Data ---
import glassesWayfarer from "@/assets/glasses-wayfarer.jpg";
import glassesAviator from "@/assets/glasses-aviator.jpg";
import glassesRound from "@/assets/glasses-round.jpg";
import glassesClubmaster from "@/assets/glasses-clubmaster.jpg";
import glassesMeta from "@/assets/glasses-meta.jpg";

const THEME_RED = "hsl(0, 100%, 56.19%)";

const frameShapes = [
  { id: "Meta wayfarer", label: "Meta Wayfarer", model: "SC-2140", img: glassesWayfarer, price: 189 },
  { id: "Meta aviator", label: "Meta Aviator", model: "SC-3025", img: glassesAviator, price: 199 },
  { id: "Meta round", label: "Meta Round", model: "SC-3447", img: glassesRound, price: 179 },
  { id: "Metaclubmaster", label: "Meta Clubmaster", model: "SC-3016", img: glassesClubmaster, price: 209 },
  { id: "meta", label: "Meta Smart", model: "SC-META", img: glassesMeta, price: 299, tag: "SMART" },
];

const frameColors = [
  { id: "#111111", label: "Matte Black" },
  { id: "#C5A55A", label: "Brushed Gold" },
  { id: "#7B5B3A", label: "Havana" },
  { id: "#A0A0A0", label: "Gunmetal" },
  { id: "#3C2415", label: "Dark Havana" },
  { id: "#8B2020", label: "Burgundy" },
  { id: "#2B3D5B", label: "Navy" },
  { id: "#D6CFC0", label: "Ivory" },
];

const lensOptions = [
  { id: "dark", label: "G-15 Classic", color: "#1a2a1a" },
  { id: "blue", label: "Gradient Blue", color: "#2a4a7a" },
  { id: "green", label: "Classic Green", color: "#2a5a3a" },
  { id: "amber", label: "Brown Gradient", color: "#6a4a2a" },
  { id: "rose", label: "Rose", color: "#7a3a4a" },
  { id: "mirror", label: "Silver Mirror", color: "linear-gradient(135deg, #8aa, #aac)" },
];

const templeStyles = [
  { id: "standard", label: "Classic", h: "3px" },
  { id: "thick", label: "Bold", h: "6px" },
  { id: "thin", label: "Slim", h: "1.5px" },
];

const tabs = ["Model", "Frame", "Lens", "Temple"] as const;

interface Props {
  frameShape: string;
  setFrameShape: (v: string) => void;
  frameColor: string;
  setFrameColor: (v: string) => void;
  lensColor: string;
  setLensColor: (v: string) => void;
  templeStyle: string;
  setTempleStyle: (v: string) => void;
}

export default function SunglassesCustomizer({
  frameShape, setFrameShape, frameColor, setFrameColor,
  lensColor, setLensColor, templeStyle, setTempleStyle,
}: Props) {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Model");

  const selectedModel = frameShapes.find(f => f.id === frameShape) || frameShapes[0];
  const selectedColor = frameColors.find(c => c.id === frameColor) || frameColors[0];
  const selectedLens = lensOptions.find(l => l.id === lensColor) || lensOptions[0];

  return (
    <section className="min-h-screen py-12 sm:py-20 px-4 transition-colors duration-500" style={{ backgroundColor: THEME_RED }}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-white/70 uppercase tracking-[0.4em] text-xs font-bold"
          >
            Exclusive Collection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-light text-white mt-2"
          >
            Design Your <span className="italic font-bold">Vision</span>
          </h2 >
        </header>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Preview Card (The Main Viewport) */}
          <div className="lg:col-span-7">
            <motion.div 
              layout
              className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 lg:sticky lg:top-10"
            >
              <div className="relative aspect-video flex items-center justify-center">
                 <SunglassesPreview
                    frameShape={frameShape}
                    frameColor={frameColor}
                    lensColor={lensColor}
                    templeStyle={templeStyle}
                  />
              </div>

              <div className="mt-12 text-center border-t border-slate-100 pt-8">
                <h3 className="text-2xl font-display font-bold text-slate-900">
                  {selectedModel.label}
                </h3>
                <p className="text-slate-400 text-sm tracking-widest mt-1 uppercase">
                  {selectedColor.label} • {selectedLens.label} • {templeStyle}
                </p>
                
                <div className="mt-8 flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                    <div className="text-left">
                        <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-tight">Total Price</span>
                        <span className="text-3xl font-display font-black text-slate-900">${selectedModel.price}</span>
                    </div>
                    <button 
                      className="px-8 py-4 rounded-xl text-white font-bold tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-lg"
                      style={{ backgroundColor: THEME_RED }}
                    >
                        CONFIRM ORDER
                    </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Customization Controls */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
              
              {/* Navigation Tabs */}
              <div className="flex bg-slate-50/50 p-2 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-2xl transition-all
                      ${activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6 h-[450px] overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-3"
                  >
                    {/* Models Tab */}
                    {activeTab === "Model" && frameShapes.map((shape) => (
                      <button
                        key={shape.id}
                        onClick={() => setFrameShape(shape.id)}
                        className={`w-full group flex items-center gap-4 p-3 rounded-2xl border-2 transition-all
                          ${frameShape === shape.id ? "bg-red-50" : "border-slate-50 hover:border-slate-100"}`}
                        style={{ borderColor: frameShape === shape.id ? THEME_RED : "" }}
                      >
                        <div className="w-20 h-14 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={shape.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-bold text-slate-900">{shape.label}</p>
                          <p className="text-[10px] text-slate-400 uppercase">{shape.model}</p>
                        </div>
                        <span className="font-bold text-slate-900">${shape.price}</span>
                      </button>
                    ))}

                    {/* Frame Color Tab */}
                    {activeTab === "Frame" && (
                      <div className="grid grid-cols-2 gap-3">
                        {frameColors.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setFrameColor(c.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${frameColor === c.id ? "bg-slate-50" : "border-slate-50"}`}
                            style={{ borderColor: frameColor === c.id ? THEME_RED : "" }}
                          >
                            <span className="w-6 h-6 rounded-full shadow-inner border border-black/10" style={{ backgroundColor: c.id }} />
                            <span className="text-xs font-bold text-slate-700">{c.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Lens Tab */}
                    {activeTab === "Lens" && lensOptions.map((lens) => (
                      <button
                        key={lens.id}
                        onClick={() => setLensColor(lens.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${lensColor === lens.id ? "bg-slate-50" : "border-slate-50"}`}
                        style={{ borderColor: lensColor === lens.id ? THEME_RED : "" }}
                      >
                        <div className="w-8 h-8 rounded-full" style={{ background: lens.color }} />
                        <span className="font-bold text-slate-700">{lens.label}</span>
                      </button>
                    ))}

                    {/* Temple Tab */}
                    {activeTab === "Temple" && templeStyles.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setTempleStyle(s.id)}
                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${templeStyle === s.id ? "bg-slate-50" : "border-slate-50"}`}
                        style={{ borderColor: templeStyle === s.id ? THEME_RED : "" }}
                      >
                        <div className="w-12 flex flex-col gap-1">
                            <div className="bg-slate-900 rounded-full w-full" style={{ height: s.h }} />
                        </div>
                        <span className="font-bold text-slate-700">{s.label} Thickness</span>
                      </button>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
