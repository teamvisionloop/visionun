import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SunglassesPreview from "./SunglassesPreview";

const THEME_RED = "hsl(0, 100%, 56.19%)";

interface Props {
  frameShape: string;
  frameColor: string;
  lensColor: string;
  templeStyle: string;
}

export default function GravityMazeSection({ frameShape, frameColor, lensColor, templeStyle }: Props) {
  // We use coordinates to track the position in the maze
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isColliding, setIsColliding] = useState(false);

  const move = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 40;
    const limit = 160; // Keeps the glasses inside the circle

    setPos(prev => {
      let newX = prev.x;
      let newY = prev.y;

      if (direction === 'up') newY -= step;
      if (direction === 'down') newY += step;
      if (direction === 'left') newX -= step;
      if (direction === 'right') newX += step;

      // Simple boundary check
      if (Math.abs(newX) > limit || Math.abs(newY) > limit) {
        setIsColliding(true);
        setTimeout(() => setIsColliding(false), 300);
        return prev;
      }

      return { x: newX, y: newY };
    });
  };

  return (
    <section className="py-24 bg-black overflow-hidden flex flex-col items-center justify-center relative min-h-[800px]">
      
      {/* Background HUD Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] border border-white rounded-full animate-[spin_20s_linear_infinite]" />
      </div>

      <div className="relative z-10 text-center mb-10 px-6">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-2">
          Stress Test Protocol
        </h2>
        <p className="text-4xl md:text-5xl font-display font-light text-white italic">
          Manual <span style={{ color: THEME_RED }} className="font-bold uppercase">Calibration</span>
        </p>
      </div>

      {/* The Testing Chamber (Maze) */}
      <div className={`relative w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-white rounded-full transition-all duration-300 ${isColliding ? 'ring-8 ring-red-600' : 'ring-4 ring-white/20 shadow-[0_0_100px_rgba(255,255,255,0.05)]'}`}>
        
        {/* Decorative Internal Lines */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {/* The Sunglasses "Character" */}
        <motion.div
          animate={{ x: pos.x, y: pos.y }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <div className="w-32 sm:w-48 drop-shadow-2xl">
            <SunglassesPreview
              frameShape={frameShape}
              frameColor={frameColor}
              lensColor={lensColor}
              templeStyle={templeStyle}
            />
          </div>
        </motion.div>

        {/* Hazard Zone */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/5" />
        <div className="absolute top-0 left-1/2 w-[2px] h-full bg-black/5" />
      </div>

      {/* Control Console - The Guerilla Remote */}
      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-3xl shadow-2xl">
          <div /> {/* Spacer */}
          <ControlButton icon="↑" onClick={() => move('up')} />
          <div /> {/* Spacer */}
          
          <ControlButton icon="←" onClick={() => move('left')} />
          <ControlButton icon="•" onClick={() => setPos({x:0, y:0})} center />
          <ControlButton icon="→" onClick={() => move('right')} />
          
          <div /> {/* Spacer */}
          <ControlButton icon="↓" onClick={() => move('down')} />
          <div /> {/* Spacer */}
        </div>
        <p className="font-mono text-[9px] text-white/40 tracking-widest mt-4">
          SYSTEM_X: {pos.x} // SYSTEM_Y: {pos.y}
        </p>
      </div>

      {/* Warning Flash */}
      <AnimatePresence>
        {isColliding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-600/20 pointer-events-none z-50 flex items-center justify-center"
          >
            <span className="text-white font-black text-6xl italic">BOUNDARY_HIT</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Sub-component for the buttons to keep the main code clean
function ControlButton({ icon, onClick, center = false }: { icon: string, onClick: () => void, center?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl font-bold transition-colors
        ${center 
          ? 'bg-slate-100 text-slate-400' 
          : 'bg-[hsl(0,100%,56.19%)] text-white shadow-lg'}`}
    >
      {icon}
    </motion.button>
  );
}
