import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpeg";

interface HeroSectionProps {
  onStartCustomizing: () => void;
  onTryOn: () => void;
}

const THEME_RED = "hsl(0, 100%, 56.19%)";

export default function HeroSection({ onStartCustomizing, onTryOn }: HeroSectionProps) {
  return (
    <section 
      className="relative min-h-[100dvh] flex items-center overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: THEME_RED }}
    >
      {/* Background Layers */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Premium eyewear" 
          className="w-full h-full object-cover opacity-40 mix-blend-multiply grayscale" 
        />
        {/* Subtle red-to-transparent gradients to keep the text readable */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" 
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[hsl(0,100%,56.19%)] via-transparent to-black/20" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white/80 font-body text-xs sm:text-sm font-bold tracking-[0.4em] uppercase mb-4 sm:mb-6"
          >
            Premium Custom Eyewear
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-light leading-[0.9] text-white mb-6 sm:mb-8"
          >
            Design Your
            <br />
            <span className="font-bold italic">Signature</span> Pair
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-white/90 text-base sm:text-lg font-body font-light leading-relaxed mb-10 max-w-sm"
          >
            Customize every detail. Try them on with your camera. Made to order, crafted for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Primary Action: Solid White */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#f8f8f8" }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartCustomizing}
              className="px-10 py-5 bg-white text-slate-900 font-body text-[11px] font-bold tracking-[0.2em] uppercase rounded-2xl shadow-xl transition-all"
            >
              Start Customizing
            </motion.button>

            {/* Secondary Action: Outlined White */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onTryOn}
              className="px-10 py-5 border-2 border-white/40 text-white font-body text-[11px] font-bold tracking-[0.2em] uppercase rounded-2xl backdrop-blur-sm transition-all"
            >
              Virtual Try-On
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Subtle branding element */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <p className="text-white/20 font-display text-9xl font-black select-none pointer-events-none uppercase">
          Vision
        </p>
      </div>
    </section>
  );
}
