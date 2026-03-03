import { motion } from "framer-motion";
import { ShoppingBag, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-display text-2xl font-semibold tracking-wide text-foreground">
          SHADECRAFT
        </span>

        <div className="hidden md:flex items-center gap-10">
          {["Home", "Customize", "Collection", "About"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-muted-foreground text-[13px] font-body font-medium tracking-widest uppercase hover:text-foreground transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative text-foreground">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </motion.button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground">
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
