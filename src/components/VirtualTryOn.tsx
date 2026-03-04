import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const THEME_RED = "hsl(0, 100%, 56.19%)";

export default function GuerillaMazeSection() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isHacked, setIsHacked] = useState(false);
  const [error, setError] = useState(false);

  // Simple "Guerilla" logic: If mouse hits a wall, reset.
  const handleWallCollision = () => {
    if (hasStarted && !isHacked) {
      setError(true);
      setHasStarted(false);
      setTimeout(() => setError(false), 500);
    }
  };

  const handleFinish = () => {
    if (hasStarted) setIsHacked(true);
  };

  return (
    <section className="py-24 bg-black overflow-hidden flex flex-col items-center">
      <div className="max-w-4xl w-full px-6">
        
        {/* Terminal Header */}
        <div className="mb-10 font-mono text-[10px] sm:text-xs">
          <p className="text-white/40 uppercase tracking-widest">
            {isHacked ? "> ACCESS_GRANTED" : "> RESTRICTED_AREA_UNAUTHORIZED_PROXIMITY"}
          </p>
          <h2 className="text-4xl sm:text-6xl font-black text-white mt-4 italic uppercase">
            The <span style={{ color: THEME_RED }}>Breach</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-sm">
            Navigate the security field without touching the red sectors to unlock the 'META_VOID' discount.
          </p>
        </div>

        {/* Maze Container */}
        <div className="relative bg-[#050505] border border-white/10 rounded-sm cursor-crosshair overflow-hidden p-4">
          
          {!isHacked ? (
            <div className="relative h-[400px] w-full" onMouseLeave={() => setHasStarted(false)}>
              
              {/* The "Walls" (The Maze Layout) */}
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ${error ? 'opacity-100' : 'opacity-20'}`}
                onMouseEnter={handleWallCollision}
              >
                {/* Horizontal & Vertical Wall Blocks - Custom Layout */}
                <div className="absolute top-[20%] left-0 w-[80%] h-2" style={{ backgroundColor: THEME_RED }} />
                <div className="absolute top-[40%] right-0 w-[80%] h-2" style={{ backgroundColor: THEME_RED }} />
                <div className="absolute top-[60%] left-0 w-[80%] h-2" style={{ backgroundColor: THEME_RED }} />
                <div className="absolute top-[20%] left-[80%] w-2 h-[20%]" style={{ backgroundColor: THEME_RED }} />
                <div className="absolute top-[40%] left-[15%] w-2 h-[20%]" style={{ backgroundColor: THEME_RED }} />
              </div>

              {/* Start Trigger */}
              <button
                onMouseEnter={() => setHasStarted(true)}
                className={`absolute top-4 left-4 z-20 px-4 py-2 text-[10px] font-bold border ${hasStarted ? 'bg-white text-black' : 'text-white border-white/20'}`}
              >
                {hasStarted ? "TRACE_ACTIVE" : "START_TRACE"}
              </button>

              {/* End Trigger */}
              <div
                onMouseEnter={handleFinish}
                className="absolute bottom-4 right-4 z-20 px-6 py-4 bg-white text-black font-black text-xs animate-bounce"
              >
                EXIT_VOID
              </div>

              {/* Visual Glitch Layer */}
              {error && (
                <div className="absolute inset-0 z-30 bg-red-600/20 flex items-center justify-center backdrop-blur-sm">
                  <p className="text-white font-mono font-black text-4xl italic">SIGNAL LOST</p>
                </div>
              )}
            </div>
          ) : (
            /* Success State */
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-[400px] flex flex-col items-center justify-center text-center p-8"
            >
              <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center mb-6">
                <span className="text-4xl text-white">✓</span>
              </div>
              <h3 className="text-white text-3xl font-black mb-2">ENCRYPTION BROKEN</h3>
              <p className="text-white/60 font-mono text-sm mb-8">Use code 'VOID_WALKER' for 25% off</p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-3 bg-white text-black font-bold uppercase text-[10px] tracking-widest hover:invert transition-all"
              >
                Deploy Configuration
              </button>
            </motion.div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-6 flex justify-between font-mono text-[9px] text-white/20">
          <span>PACKET_LOSS: 0%</span>
          <span>ENCRYPTION: AES-256</span>
          <span>STATUS: {hasStarted ? 'UPLOADING...' : 'IDLE'}</span>
        </div>
      </div>
    </section>
  );
}
