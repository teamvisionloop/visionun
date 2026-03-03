import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onStartCustomizing: () => void;
}

export default function HeroSection({ onStartCustomizing }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Luxury eyewear" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-muted-foreground font-body text-xs tracking-[0.35em] uppercase mb-6"
          >
            Handcrafted Eyewear — Since 2024
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-6xl md:text-8xl font-light leading-[0.9] text-foreground mb-6"
          >
            Design
            <br />
            <span className="font-semibold italic">Your</span> Pair
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground text-base font-body font-light leading-relaxed mb-10 max-w-sm"
          >
            Customize every detail — from frame shape and color to lens tint and temple width. Made to order, made for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartCustomizing}
              className="px-8 py-3.5 bg-primary text-primary-foreground font-body text-sm font-medium tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-foreground"
            >
              Start Customizing
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 border border-foreground/20 text-foreground font-body text-sm font-medium tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-foreground/5"
            >
              View Collection
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
