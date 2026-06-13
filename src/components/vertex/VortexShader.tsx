import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const VortexBackground = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className="pointer-events-none absolute top-0 left-0 z-0 h-[900px] w-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in srgb, var(--orbit-accent-violet) 15%, transparent) 0%, transparent 70%)',
        backgroundColor: 'var(--orbit-base)',
      }}
    >
      {/* Static ambient glows - always visible, no JS dependency */}
      <div
        className="absolute top-[-20%] left-[20%] h-[800px] w-[800px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--orbit-accent-violet) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute top-[10%] right-[10%] h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, var(--orbit-accent-cyan) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute top-[30%] left-[5%] h-[400px] w-[400px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, var(--orbit-accent-violet) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Animated Rings - only render after mount (prevents SSR flash) */}
      {mounted && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: 'rotateX(60deg) translateY(-20%)', transformStyle: 'preserve-3d' }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-[var(--orbit-accent-violet)]"
              style={{
                width: `${ring * 140}px`,
                height: `${ring * 140}px`,
                opacity: 0.06 + ring * 0.01,
                boxShadow: `0 0 ${ring * 4}px rgba(99,102,241,0.3), inset 0 0 ${ring * 4}px rgba(99,102,241,0.1)`,
              }}
              animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: 30 + ring * 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};
