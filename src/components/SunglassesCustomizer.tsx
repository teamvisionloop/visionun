import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SunglassesPreview from "./SunglassesPreview";

// --- Assets ---
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
    <section className="min-h-screen py-12 sm:py-24 px-4 transition-colors duration-700" style={{ backgroundColor: THEME_RED }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-white/80 uppercase tracking-[0.4em] text-[10px] sm:text-xs font-bold mb-4"
          >
            Customization Studio
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-light text-white"
          >
            Craft Your <span className="italic font-bold">Icon</span>
          </motion.h2>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Preview Panel */}
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] shadow-2xl p-6 sm:p-12 lg:sticky lg:top-12"
            >
              <div className="relative min-h-[300px] flex items-center justify-center">
                <SunglassesPreview
                  frameShape={frameShape}
                  frameColor={frameColor}
                  lensColor={lensColor}
                  templeStyle={templeStyle}
                />
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-display font-bold text-slate-900 leading-none">
                    {selectedModel.label}
                  </h3>
                  <p className="text-slate-400 text-[11px] tracking-[0.2em] uppercase mt-3 font-medium">
                    {selectedColor.label} / {selectedLens.label} / {templeStyle}
                  </p>
                </div>
                
                <div className="flex items-center gap-6 bg-slate-50 px-6 py-4 rounded-3xl w-full md:w-auto justify-between md:justify-start">
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-tight mb-0.5">Price</span>
                    <span className="text-3xl font-display font-black text-slate-900">${selectedModel.price}</span>
                  </div>
                  <button 
                    className="px-8 py-4 rounded-2xl text-white font-bold tracking-tighter hover:brightness-110 active:scale-95 transition-all shadow-lg"
                    style={{ backgroundColor: THEME_RED }}
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Selection Panel */}
          <div className="lg:col-span-5 xl:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden"
            >
              {/* Tabs */}
              <div className="flex bg-slate-50/80 p-2 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest rounded-[1.25rem] transition-all
                      ${activeTab === tab 
                        ? "bg-white text-slate-900 shadow-sm" 
                        : "text-slate-400 hover:text-slate-600"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6 max-h-[600px] overflow-y-auto overflow-x-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {/* Model Tab */}
                    {activeTab === "Model" && frameShapes.map((shape) => (
                      <button
                        key={shape.id}
                        onClick={() => setFrameShape(shape.id)}
                        className={`w-full group flex items-center gap-4 p-3 rounded-2xl border-2 transition-all
                          ${frameShape === shape.id ? "bg-red-50/50" : "border-slate-50 hover:border-slate-100"}`}
                        style={{ borderColor: frameShape === shape.id ? THEME_RED : "" }}
                      >
                        <div className="w-20 h-14 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 p-1">
                          <img src={shape.img} alt="" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-bold text-slate-900 text-sm">{shape.label}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{shape.model}</p>
                        </div>
                        <span className="font-bold text-slate-900 text-sm px-2">${shape.price}</span>
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
                            <span 
                              className="w-6 h-6 rounded-full shadow-inner border border-black/5 flex-shrink-0" 
                              style={{ backgroundColor: c.id }} 
                            />
                            <span className="text-xs font-bold text-slate-700 truncate">{c.label}</span>
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
                        <div 
                          className="w-8 h-8 rounded-full shadow-sm flex-shrink-0" 
                          style={{ background: lens.color }} 
                        />
                        <span className="font-bold text-slate-700 text-sm">{lens.label}</span>
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
                        <div className="w-12 flex items-center">
                          <div className="bg-slate-900 rounded-full w-full" style={{ height: s.h }} />
                        </div>
                        <span className="font-bold text-slate-700 text-sm">{s.label} Profile</span>
                      </button>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
