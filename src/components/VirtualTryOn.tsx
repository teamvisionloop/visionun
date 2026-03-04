import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import SunglassesPreview from "./SunglassesPreview";

const THEME_RED = "hsl(0, 100%, 56.19%)";

interface Props {
  frameShape: string;
  frameColor: string;
  lensColor: string;
  templeStyle: string;
}

export default function GravityMazeSection({ frameShape, frameColor, lensColor, templeStyle }: Props) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isSupported, setIsSupported] = useState(false);

  // Smooth out the "gravity" movement
  const springX = useSpring(0, { stiffness: 100, damping: 20 });
  const springY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      setIsSupported(true);
      // Beta (tilt front/back) and Gamma (tilt left/right)
      const x = e.gamma ? Math.max(-30, Math.min(30, e.gamma)) : 0;
      const y = e.beta ? Math.max(-30, Math.min(30, e.beta)) : 0;
      
      springX.set(x * 4); // Multiplier for sensitivity
      springY.set((y - 45) * 4); // Subtracting 45 assumes user holds phone at an angle
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [springX, springY]);

  // Request permission for iOS
  const requestPermission = () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            setIsSupported(true);
          }
        });
    }
  };

  return (
    <section className="py-24 bg-black overflow-hidden flex flex-col items-center justify-center relative min-h-[600px]">
      
      {/* Maze Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none border-[40px] border-white/5" />
      
      <div className="relative z-10 text-center mb-12 px-6">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-2">
          Gravity Calibration
        </h2>
        <p className="text-4xl font-display font-light text-white italic">
          Tilt to <span style={{ color: THEME_RED }} className="font-bold">Navigate</span>
        </p>
        
        {!isSupported && (
          <button 
            onClick={requestPermission}
            className="mt-6 px-6 py-2 border border-white text-white text-[10px] uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Enable Motion Sensors
          </button>
        )}
      </div>

      {/* The Maze Pit */}
      <div className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#0a0a0a] border-4 border-white/10 rounded-full shadow-[0_0_100px_rgba(255,0,0,0.1)] overflow-hidden">
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* The Sunglasses (The Character) */}
        <motion.div
          style={{
            x: springX,
            y: springY,
          }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <div className="w-40 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
            <SunglassesPreview
              frameShape={frameShape}
              frameColor={frameColor}
              lensColor={lensColor}
              templeStyle={templeStyle}
            />
          </div>
        </motion.div>

        {/* Maze Obstacles (Visual only for this demo, can be functional) */}
        <div className="absolute top-1/4 left-1/4 w-32 h-2 bg-red-600/20 blur-sm rounded-full rotate-45" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-2 bg-red-600/20 blur-sm rounded-full -rotate-12" />
        <div className="absolute top-1/2 right-10 w-2 h-32 bg-red-600/20 blur-sm rounded-full" />
      </div>

      {/* Status Bar */}
      <div className="mt-12 w-full max-w-xs space-y-2">
        <div className="flex justify-between text-[9px] font-mono text-white/30 uppercase">
          <span>X-AXIS_SHIFT</span>
          <span>{Math.round(springX.get())}px</span>
        </div>
        <div className="h-1 w-full bg-white/5 overflow-hidden">
          <motion.div 
            className="h-full" 
            style={{ width: "50%", x: springX, backgroundColor: THEME_RED }} 
          />
        </div>
      </div>
    </section>
  );
}
