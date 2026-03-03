import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SunglassesPreview from "./SunglassesPreview";
import glassesWayfarer from "@/assets/glasses-wayfarer.jpg";
import glassesAviator from "@/assets/glasses-aviator.jpg";
import glassesRound from "@/assets/glasses-round.jpg";
import glassesClubmaster from "@/assets/glasses-clubmaster.jpg";

const frameShapes = [
  { id: "wayfarer", label: "Wayfarer", model: "SC-2140", img: glassesWayfarer },
  { id: "aviator", label: "Aviator", model: "SC-3025", img: glassesAviator },
  { id: "round", label: "Round", model: "SC-3447", img: glassesRound },
  { id: "clubmaster", label: "Clubmaster", model: "SC-3016", img: glassesClubmaster },
];

const frameColors = [
  { id: "#1a1a1a", label: "Matte Black" },
  { id: "#C5A55A", label: "Brushed Gold" },
  { id: "#7B5B3A", label: "Havana Tortoise" },
  { id: "#A8A8A8", label: "Gunmetal Silver" },
  { id: "#3C2415", label: "Dark Havana" },
  { id: "#8B1A1A", label: "Burgundy" },
  { id: "#2B3D5B", label: "Navy" },
  { id: "#E8DCC8", label: "Ivory" },
];

const lensOptions = [
  { id: "dark", label: "G-15 Classic", color: "hsl(120, 8%, 18%)" },
  { id: "blue", label: "Gradient Blue", color: "hsl(210, 50%, 35%)" },
  { id: "green", label: "Classic Green", color: "hsl(150, 30%, 28%)" },
  { id: "amber", label: "Brown Gradient", color: "hsl(30, 50%, 35%)" },
  { id: "rose", label: "Rose Gradient", color: "hsl(340, 35%, 42%)" },
  { id: "mirror", label: "Silver Mirror", color: "linear-gradient(135deg, hsl(0,0%,70%), hsl(200,20%,75%))" },
];

const templeStyles = [
  { id: "standard", label: "Classic", width: "3px" },
  { id: "thick", label: "Bold", width: "6px" },
  { id: "thin", label: "Slim", width: "1.5px" },
];

const tabs = ["Model", "Frame", "Lens", "Temple"] as const;

export default function SunglassesCustomizer() {
  const [frameShape, setFrameShape] = useState("wayfarer");
  const [frameColor, setFrameColor] = useState("#1a1a1a");
  const [lensColor, setLensColor] = useState("dark");
  const [templeStyle, setTempleStyle] = useState("standard");
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Model");

  const selectedFrame = frameShapes.find(f => f.id === frameShape);
  const selectedColor = frameColors.find(c => c.id === frameColor);
  const selectedLens = lensOptions.find(l => l.id === lensColor);

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-muted-foreground font-body text-xs tracking-[0.35em] uppercase mb-4">
            Custom Eyewear Studio
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-light text-foreground">
            Build Your <span className="italic font-semibold">Perfect</span> Pair
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Preview - 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-card p-8 md:p-14 sticky top-24"
          >
            <SunglassesPreview
              frameShape={frameShape}
              frameColor={frameColor}
              lensColor={lensColor}
              templeStyle={templeStyle}
            />

            {/* Model info */}
            <div className="mt-10 pt-6 border-t border-border text-center">
              <p className="font-display text-2xl font-semibold text-foreground">
                {selectedFrame?.label} {selectedFrame?.model}
              </p>
              <div className="flex justify-center gap-3 mt-3">
                {[selectedColor?.label, selectedLens?.label, templeStyle + " temple"].map((item, i) => (
                  <span key={i} className="text-[11px] font-body tracking-widest uppercase text-muted-foreground">
                    {i > 0 && <span className="mr-3">·</span>}
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs font-body tracking-wider uppercase">Starting from</p>
                <p className="font-display text-4xl font-semibold text-foreground mt-1">$189</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-primary text-primary-foreground font-body text-sm font-medium tracking-widest uppercase rounded-sm hover:bg-foreground transition-colors duration-300"
              >
                Add to Bag
              </motion.button>
            </div>
          </motion.div>

          {/* Options - 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Tabs */}
            <div className="flex border-b border-border mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 pb-3 text-xs font-body font-medium tracking-widest uppercase transition-all duration-300 relative
                    ${activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "Model" && (
                  <div className="space-y-3">
                    {frameShapes.map((shape) => (
                      <motion.button
                        key={shape.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setFrameShape(shape.id)}
                        className={`w-full option-button flex items-center gap-4 text-left ${frameShape === shape.id ? "option-button-active" : ""}`}
                      >
                        <img src={shape.img} alt={shape.label} className="w-20 h-14 object-contain rounded-lg bg-background" />
                        <div>
                          <span className="font-display text-lg font-semibold block">{shape.label}</span>
                          <span className="text-muted-foreground text-xs font-body tracking-wider">{shape.model}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {activeTab === "Frame" && (
                  <div>
                    <p className="text-muted-foreground text-sm font-body mb-5">Frame color</p>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {frameColors.map((color) => (
                        <motion.button
                          key={color.id}
                          whileHover={{ scale: 1.12 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFrameColor(color.id)}
                          className={`color-swatch ${frameColor === color.id ? "color-swatch-active" : ""}`}
                          style={{ backgroundColor: color.id }}
                          title={color.label}
                        />
                      ))}
                    </div>
                    <p className="text-center font-display text-xl text-foreground">
                      {selectedColor?.label}
                    </p>
                  </div>
                )}

                {activeTab === "Lens" && (
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm font-body mb-5">Lens tint</p>
                    {lensOptions.map((lens) => (
                      <motion.button
                        key={lens.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setLensColor(lens.id)}
                        className={`w-full option-button flex items-center gap-4 ${lensColor === lens.id ? "option-button-active" : ""}`}
                      >
                        <div
                          className="w-8 h-8 rounded-full border border-border/50 flex-shrink-0"
                          style={{ background: lens.color }}
                        />
                        <span className="font-body text-sm">{lens.label}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {activeTab === "Temple" && (
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm font-body mb-5">Temple width</p>
                    {templeStyles.map((style) => (
                      <motion.button
                        key={style.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setTempleStyle(style.id)}
                        className={`w-full option-button flex items-center gap-4 ${templeStyle === style.id ? "option-button-active" : ""}`}
                      >
                        <div className="w-12 flex items-center justify-center">
                          <div className="bg-foreground rounded-full" style={{ width: "36px", height: style.width }} />
                        </div>
                        <span className="font-body text-sm">{style.label}</span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
