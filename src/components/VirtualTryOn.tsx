import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SunglassesPreview from "./SunglassesPreview";

const THEME_RED = "hsl(0, 100%, 56.19%)";

// Maze Grid Layout (0 = Path, 1 = Wall, 2 = Start, 3 = End)
const MAZE_GRID = [
  [2, 0, 1, 0, 0],
  [1, 0, 1, 0, 1],
  [0, 0, 0, 0, 1],
  [0, 1, 1, 0, 0],
  [0, 0, 1, 1, 3],
];

interface Props {
  frameShape: string;
  frameColor: string;
  lensColor: string;
  templeStyle: string;
}

export default function TechMazeSection({ frameShape, frameColor, lensColor, templeStyle }: Props) {
  const [pos, setPos] = useState({ r: 0, c: 0 }); // row and column
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(false);

  const move = (dr: number, dc: number) => {
    const newR = pos.r + dr;
    const newC = pos.c + dc;

    // Check boundaries
    if (newR >= 0 && newR < MAZE_GRID.length && newC >= 0 && newC < MAZE_GRID[0].length) {
      // Check for walls
      if (MAZE_GRID[newR][newC] !== 1) {
        setPos({ r: newR, c: newC });
        
        // Check for Finish
        if (MAZE_GRID[newR][newC] === 3) {
          setTimeout(() => setShowPopup(true), 400);
        }
      } else {
        triggerError();
      }
    } else {
      triggerError();
    }
  };

  const triggerError = () => {
    setError(true);
    setTimeout(() => setError(false), 300);
  };

  return (
    <section className="py-24 bg-white flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      
      {/* Background Text Decor */}
      <div className="absolute top-10 left-10 opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[20vw] font-black leading-none">MAZE_01</h2>
      </div>

      <div className="text-center mb-10 z-10 px-4">
        <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-2" style={{ color: THEME_RED }}>
          Restricted Navigation
        </h2>
        <p className="text-4xl md:text-5xl font-display font-light text-slate-900 leading-tight">
          Find the <span className="italic font-bold">Exit</span>
        </p>
      </div>

      {/* The Maze Grid */}
      <div 
        className={`relative p-2 bg-slate-900 rounded-3xl shadow-2xl border-8 transition-colors duration-300 ${error ? 'border-red-500' : 'border-slate-800'}`}
        style={{ display: 'grid', gridTemplateColumns: `repeat(${MAZE_GRID[0].length}, 1fr)` }}
      >
        {MAZE_GRID.map((row, rIndex) => 
          row.map((cell, cIndex) => (
            <div 
              key={`${rIndex}-${cIndex}`}
              className={`w-16 h-16 sm:w-24 sm:h-24 border border-white/5 flex items-center justify-center relative
                ${cell === 1 ? 'bg-slate-800/50' : 'bg-transparent'}
                ${cell === 3 ? 'bg-red-500/20' : ''}`}
            >
              {cell === 3 && (
                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                   <span className="text-white text-[10px] font-black font-mono">FINISH</span>
                </div>
              )}

              {/* The Sunglasses Player */}
              {pos.r === rIndex && pos.c === cIndex && (
                <motion.div 
                  layoutId="player"
                  className="z-20 w-12 sm:w-20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <SunglassesPreview 
                     frameShape={frameShape} frameColor={frameColor} 
                     lensColor={lensColor} templeStyle={templeStyle} 
                  />
                </motion.div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Controller Controls */}
      <div className="mt-12 flex flex-col items-center gap-6 z-10">
        <div className="grid grid-cols-3 gap-2">
          <div />
          <MazeBtn icon="↑" onClick={() => move(-1, 0)} />
          <div />
          <MazeBtn icon="←" onClick={() => move(0, -1)} />
          <MazeBtn icon="↓" onClick={() => move(1, 0)} />
          <MazeBtn icon="→" onClick={() => move(0, 1)} />
        </div>
      </div>

      {/* WIN POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-10 max-w-md w-full text-center shadow-[0_0_100px_rgba(255,0,0,0.4)]"
            >
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl"
                style={{ backgroundColor: THEME_RED }}
              >
                ★
              </div>
              <h3 className="text-3xl font-display font-black text-slate-900 mb-4 uppercase italic">Access Granted</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                You've successfully navigated the void. Your signature look is ready for final assembly.
              </p>
              <button 
                onClick={() => {
                  setShowPopup(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-5 rounded-2xl text-white font-bold tracking-[0.2em] uppercase transition-transform hover:scale-105"
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

function MazeBtn({ icon, onClick }: { icon: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xl hover:bg-black active:scale-90 transition-all border border-white/10"
    >
      {icon}
    </button>
  );
}
