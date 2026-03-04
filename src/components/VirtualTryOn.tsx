import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SunglassesPreview from "./SunglassesPreview";

const THEME_RED = "hsl(0, 100%, 56.19%)";

interface Props {
  frameShape: string;
  frameColor: string;
  lensColor: string;
  templeStyle: string;
}

export default function Glass3DSection({ frameShape, frameColor, lensColor, templeStyle }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for the 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smoothing the movement
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Mapping mouse position to degrees of rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize values between -0.5 and 0.5
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-24 bg-white flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-4xl w-full px-6 text-center mb-16">
        <h2 className="text-[10px] font-black uppercase tracking-[0.6em] mb-4" style={{ color: THEME_RED }}>
          360° Tactical View
        </h2>
        <p className="text-4xl md:text-6xl font-display font-light text-slate-900 leading-tight">
          Inspect Your <span className="italic font-bold">Creation</span>
        </p>
      </div>

      <div 
        className="relative perspective-1000 w-full max-w-2xl aspect-video flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={cardRef}
      >
        {/* Floating Background Element */}
        <motion.div 
          className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center"
          style={{ rotateX, rotateY, z: -50 }}
        >
          <span className="text-[20vw] font-black italic text-black">META</span>
        </motion.div>

        {/* The 3D Rotating Card */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full bg-white/50 backdrop-blur-xl border border-slate-100 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] flex items-center justify-center p-12"
        >
          {/* Internal Glow */}
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
             <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-red-500/10 to-transparent blur-3xl" />
          </div>

          {/* Sunglasses Render */}
          <motion.div 
            style={{ translateZ: 100 }} // Gives the glasses actual "pop" out of the card
            className="w-full h-full flex items-center justify-center"
          >
            <SunglassesPreview
              frameShape={frameShape}
              frameColor={frameColor}
              lensColor={lensColor}
              templeStyle={templeStyle}
            />
          </motion.div>

          {/* UI Details inside the 3D space */}
          <motion.div 
            style={{ translateZ: 50 }}
            className="absolute bottom-10 left-10 flex flex-col items-start"
          >
            <span className="text-[10px] font-mono text-slate-400 uppercase">Model_Status</span>
            <span className="text-xs font-bold text-slate-900">ENCRYPTED // {frameShape.toUpperCase()}</span>
          </motion.div>

          <motion.div 
            style={{ translateZ: 50 }}
            className="absolute top-10 right-10"
          >
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: THEME_RED }} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-12 text-slate-400 font-mono text-[10px] tracking-widest animate-pulse">
        [ MOVE CURSOR TO ROTATE ]
      </div>
    </section>
  );
}
