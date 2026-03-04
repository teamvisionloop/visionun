import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SunglassesPreview from "./SunglassesPreview";

// --- Theme Config ---
const THEME_RED = "hsl(0, 100%, 56.19%)";

// 0 = Walkable Path, 1 = Solid Wall, 2 = Start, 3 = Finish
const MAZE_LAYOUT = [
  [2, 0, 1, 0, 0],
  [1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 1, 3],
];

interface Props {
  frameShape: string;
  frameColor: string;
  lensColor: string;
  templeStyle: string;
}

export default function MissionMaze({ frameShape, frameColor, lensColor, templeStyle }: Props) {
  const [pos, setPos] = useState({ r: 0, c: 0 });
  const [status, setStatus] = useState<"playing" | "won" | "error">("playing");

  const move = (dr: number, dc: number) => {
    const nr = pos.r + dr;
    const nc = pos.c + dc;

    // Check if within grid bounds
    if (nr >= 0 && nr < MAZE_LAYOUT.length && nc >= 0 && nc < MAZE_LAYOUT[0].length) {
      // Check if path is clear (not a wall)
      if (MAZE_LAYOUT[nr][nc] !== 1) {
        setPos({ r: nr, c: nc });
        if (MAZE_LAYOUT[nr][nc] === 3) setStatus("won");
      } else {
        handleError();
      }
    } else {
      handleError();
    }
  };

  const handleError = () => {
    setStatus("error");
    setTimeout(() => setStatus("playing"), 400);
  };

  return (
    <section 
      className="py-24 px-4 min-h-screen flex flex-col items-center justify-center transition-colors duration-500"
      style={{ backgroundColor: THEME_RED }}
    >
      {/* Header Info */}
      <div className="text-center mb-10">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/70 uppercase tracking-[0.4em] text-xs font-bold">
          Security Protocol
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-display font-light text-white mt-2">
          The <span className="font-bold italic">Warehouse</span> Maze
        </h2>
        <p className="text-white/80 mt-4 text-sm font-body tracking-wide">Navigate the glasses to the exit to unlock the studio.</p>
      </div>

      {/* The Maze Container */}
      <div className="relative p-4 bg-white rounded-[2.5rem] shadow-2xl">
        <div 
          className="grid gap-1 sm:gap-2 p-2 bg-slate-100 rounded-3xl overflow-hidden"
          style={{ 
            gridTemplateColumns: `repeat(${MAZE_LAYOUT[0].length}, 1fr)`,
            border: status === "error" ? "4px solid black" : "4px solid transparent"
          }}
        >
          {MAZE_LAYOUT.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className={`w-14 h-14 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center relative transition-all
                  ${cell === 1 ? 'bg-slate-900 shadow-inner' : 'bg-white'} 
                  ${cell === 3 ? 'ring-4 ring-inset ring-green-400' : ''}`}
              >
                {/* Visual indicator for Walls */}
                {cell === 1 && (
                  <div className="w-1/2 h-1/2 border border-white/10 rotate-45 opacity-20" />
                )}
                
                {/* Finish Icon */}
                {cell === 3 && <span className="text-[10px] font-black text-green-500 uppercase tracking-tighter">Exit</span>}

                {/* THE PLAYER (Sunglasses) */}
                {pos.r === r && pos.c === c && (
                  <motion.div
                    layoutId="maze-player"
                    className="z-10 w-10 sm:w-16 drop-shadow-lg"
                  >
                    <SunglassesPreview
                      frameShape={frameShape}
                      frameColor={frameColor}
                      lensColor={lensColor}
                      templeStyle={templeStyle}
                    />
                  </motion.div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Controller Controls (Styled like Customizer Buttons) */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="grid grid-cols-3 gap-3 p-4 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20">
          <div />
          <NavButton icon="↑" onClick={() => move(-1, 0)} />
          <div />
          <NavButton icon="←" onClick={() => move(0, -1)} />
          <NavButton icon="↓" onClick={() => move(1, 0)} />
          <NavButton icon="→" onClick={() => move(0, 1)} />
        </div>
      </div>

      {/* SUCCESS POPUP */}
      <AnimatePresence>
        {status === "won" && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-10 max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl">✓</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">ACCESS GRANTED</h3>
              <p className="text-slate-500 text-sm mb-8 font-body leading-relaxed">
                You navigated the warehouse flawlessly. Ready to assemble your signature pair?
              </p>
              <button 
                onClick={() => {
                  setStatus("playing");
                  setPos({ r: 0, c: 0 });
                  document.getElementById('customizer-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 rounded-2xl text-white font-bold tracking-widest uppercase text-xs"
                style={{ backgroundColor: THEME_RED }}
              >
                Customize Your Glasses
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function NavButton({ icon, onClick }: { icon: string; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="w-14 h-14 bg-white text-slate-900 rounded-2xl shadow-xl flex items-center justify-center text-xl font-bold hover:bg-slate-50"
    >
      {icon}
    </motion.button>
  );
}
