import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LogoMarquee } from './LogoMarquee';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ft(delay: number) {
  return { duration: 0.9, delay, ease: EASE };
}

interface FinProps {
  index: number;
  total: number;
  customLeft?: number;
  customWidth?: number;
}

function Fin({ index, total, customLeft, customWidth }: FinProps) {
  const actualLeft = customLeft !== undefined ? customLeft : (index / Math.max(1, total - 1)) * 100;
  // Increase width slightly to prevent any potential sub-pixel gaps
  const actualWidth = customWidth !== undefined ? customWidth + 1.5 : (100 / Math.max(1, total - 1)) + 1.5;
  const t =
    customLeft !== undefined
      ? Math.max(0, Math.min(1, ((customLeft ?? 0) + 12.5) / 112.5))
      : index / (total - 1); // 0 -> left edge, 1 -> right edge

  // Combined light sources (one in center-right, one secondary on left to illuminate leftmost fins)
  const lightSource1 = 0.62;
  const rawGlow1 = 1 - Math.abs(t - lightSource1) / Math.max(lightSource1, 1 - lightSource1);
  const glow1 = Math.pow(Math.max(0, rawGlow1), 1.4);

  const lightSource2 = 0.15;
  const rawGlow2 = 1 - Math.abs(t - lightSource2) / Math.max(lightSource2, 1 - lightSource2);
  const glow2 = Math.pow(Math.max(0, rawGlow2), 1.4) * 0.45; // softer secondary accent

  const glow = Math.max(glow1, glow2);
  const edgeFade = 0.9 + 0.1 * Math.pow(Math.sin(t * Math.PI), 0.65);

  // -- HIGHLIGHT FACE (left edge of each fin - catches the "light") --
  // Dark slate-blue
  const hlR = Math.round((12 + glow * 16) * edgeFade);
  const hlG = Math.round((20 + glow * 54) * edgeFade);
  const hlB = Math.round((30 + glow * 82) * edgeFade);
  const highlightColor = `rgb(${Math.round(hlR)},${Math.round(hlG)},${Math.round(hlB)})`;

  // -- SHADOW FACE (right edge of each fin - falls into shadow) --
  // Deep navy
  const shR = Math.round((4 + glow * 8) * edgeFade);
  const shG = Math.round((6 + glow * 16) * edgeFade);
  const shB = Math.round((10 + glow * 28) * edgeFade);
  const shadowColor = `rgb(${Math.round(shR)},${Math.round(shG)},${Math.round(shB)})`;

  // Border opacity - subtle white highlight on left edge only
  const borderHighlightOpacity = (0.02 + glow * 0.1) * edgeFade;
  const borderHighlight = `rgba(255,255,255,${borderHighlightOpacity})`;

  return (
    <div
      className="absolute top-0 h-full"
      style={{
        left: `${actualLeft}%`,
        width: `${actualWidth}%`,
        borderLeft: `1px solid ${borderHighlight}`,
        zIndex: 10,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${highlightColor} 0%, ${shadowColor} 100%)`,
        }}
      />
    </div>
  );
}

/* ===============================================================
   HERO
   =============================================================== */
export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const [finCount, setFinCount] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setFinCount(6); // 6 panels on mobile
      } else if (window.innerWidth < 1024) {
        setFinCount(8); // 8 panels on tablet
      } else {
        setFinCount(12); // 12 panels on desktop
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  /* Cursor spring for glow tracking */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 45, damping: 15 });
  const sy = useSpring(my, { stiffness: 45, damping: 15 });
  const glowX = useTransform(sx, (v) => `calc(${v * 100}% - 280px)`);
  const glowY = useTransform(sy, (v) => `calc(${v * 100}% - 280px)`);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  /* Scroll - hero fades/scales, white card rises naturally below */
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 700], [1, 1]);
  const heroOpacity = useTransform(scrollY, [100, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 700], [0, -180]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Guard 1: respect prefers-reduced-motion OS setting
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    // Guard 2: disable on mobile viewports (< 768px) to prevent battery drain
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const numParticles = 30;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(14, 165, 164, 0.05)';
      ctx.fillStyle = 'rgba(14, 165, 164, 0.15)';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      draw();
    } else {
      ctx.fillStyle = 'rgba(14, 165, 164, 0.08)';
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setMounted(true);

    const handler = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [mx, my]);


  /* Hero background - always dark regardless of theme (fins + white text require dark bg) */
  const BG = '#0b0f19';

  return (
    <div className="relative min-h-[125svh] md:min-h-[140svh]">
      {/* == STICKY HERO == */}
      <motion.section
        id="main-content"
        ref={heroRef}
        style={{ scale: heroScale, transformOrigin: 'top center', background: BG }}
        className="hero-section sticky top-0 z-0 flex h-[100svh] w-[calc(100%+2px)] -ml-[1px] flex-col overflow-hidden"
      >
        {/* -- BACKGROUND LAYER: panels + lights -- */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          {/* -- FOREST-GREEN FLUTED PANELS -- */}

          {/* Mobile view uses 5 fins (some partially hidden) */}
          <div
            className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden sm:hidden"
            style={{ zIndex: 10 }}
          >
            {[
              { left: -12.5, width: 25 },
              { left: 12.5, width: 25 },
              { left: 37.5, width: 25 },
              { left: 62.5, width: 25 },
              { left: 87.5, width: 25 },
            ].map((cfg, i) => (
              <Fin key={i} index={i} total={5} customLeft={cfg.left} customWidth={cfg.width} />
            ))}
          </div>

          {/* Desktop/tablet view shows regular spacing */}
          <div
            className="absolute top-0 right-0 bottom-0 left-0 hidden overflow-hidden sm:block"
            style={{ zIndex: 10 }}
          >
            {[...Array(finCount)].map((_, i) => (
              <Fin key={i} index={i} total={finCount} />
            ))}
          </div>


          {/* -- INTERACTIVE CANVAS PARTICLES -- */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ zIndex: 11 }}
          />

          {/* -- AURORA: sweeping emerald/teal glow over panels -- */}
          <motion.div
            animate={{
              opacity: [0.45, 0.85, 0.45],
              x: ['-5%', '5%', '-5%'],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute"
            style={{
              top: '-20%',
              left: '30%',
              width: '70%',
              height: '90%',
              background:
                'radial-gradient(ellipse at 50% 40%, rgba(6,182,212,0.35) 0%, rgba(79,70,229,0.22) 45%, transparent 75%)',
              filter: 'blur(55px)',
              borderRadius: '50%',
              zIndex: 20,
              mixBlendMode: 'screen',
            }}
          />

          {/* -- SECONDARY AURORA: cooler teal, shifts opposite phase -- */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              x: ['8%', '-4%', '8%'],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="pointer-events-none absolute"
            style={{
              top: '10%',
              right: '10%',
              width: '55%',
              height: '70%',
              background:
                'radial-gradient(ellipse at 60% 35%, rgba(14,165,164,0.20) 0%, rgba(79,70,229,0.09) 44%, transparent 72%)',
              filter: 'blur(70px)',
              borderRadius: '50%',
              zIndex: 21,
              mixBlendMode: 'screen',
            }}
          />

          {/* -- VOLUMETRIC BEAM - top-right diagonal, green-to-teal -- */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
            style={{ zIndex: 22, mixBlendMode: 'screen' }}
          >
            <defs>
              <filter id="gBeam" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation={72} />
              </filter>
              {/* Beam sweeping top-right into center */}
              <linearGradient
                id="beamGreen"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="var(--orbit-accent-primary)" stopOpacity={0.85} />
                <stop offset="60%" stopColor="#06B6D4" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
              {/* Subtle left beam */}
              <linearGradient
                id="beamTeal"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.75} />
                <stop offset="55%" stopColor="var(--orbit-accent-primary)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* Main beam - sweeps from top-right */}
            <motion.path
              d="M 1420 -80 L 780 200 L 660 420 L 1440 80 Z"
              fill="url(#beamGreen)"
              filter="url(#gBeam)"
              animate={{ opacity: [0, 1, 0.6, 1, 0] }}
              transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            {/* Secondary beam - left accent */}
            <motion.path
              d="M -160 620 L 380 360 L 310 570 L -230 800 Z"
              fill="url(#beamTeal)"
              filter="url(#gBeam)"
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
            />
          </svg>

          {/* -- CURSOR GLOW - green tint -- */}
          {!isTouchDevice && (
            <motion.div
              className="pointer-events-none absolute rounded-full"
              style={{
                width: 520,
                height: 520,
                background:
                  'radial-gradient(circle, rgba(14,165,164,0.12) 0%, rgba(6,182,212,0.06) 45%, transparent 70%)',
                filter: 'blur(30px)',
                left: glowX,
                top: glowY,
                zIndex: 23,
              }}
            />
          )}

          {/* -- BOTTOM FEATHER - REMOVED to prevent gray/white overlay band -- */}
        </div>

        {/* -- HERO CONTENT -- */}
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
          }}
          className="relative z-10 mx-auto flex w-full max-w-4xl flex-grow flex-col items-center justify-center px-4 text-center md:px-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={ft(0)}
            className="mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 max-lg:mb-0 sm:mb-3 sm:gap-2 sm:px-3"
            style={{
              border: '1px solid rgba(14,165,164,0.65)',
              background: 'rgba(14,165,164,0.2)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orbit-accent-primary)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--orbit-accent-primary)]" />
            </span>
            <span
              className="font-mono text-xs font-bold tracking-[0.16em] uppercase sm:text-sm sm:tracking-[0.20em]"
              style={{ color: '#0eebe9', textShadow: '0 0 8px rgba(14,165,164,0.45)' }}
            >
              Introducing OrbitFlow
            </span>
            <ArrowRight
              className="h-2 w-2 sm:h-[9px] sm:w-[9px]"
              style={{ color: '#0eebe9' }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={ft(0.12)}
            className="mb-0 w-full text-center leading-[1.05] font-bold tracking-[-0.045em] max-lg:mt-[12px]"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: '#FFFFFF',
              textShadow: '0 2px 40px rgba(0,0,0,0.5)',
            }}
          >
            <span className="block text-[clamp(2.2rem,7vw+0.5rem,4.5rem)] leading-none">Work Smarter.</span>
            <span className="block text-[clamp(2.2rem,7vw+0.5rem,4.5rem)] leading-none lg:whitespace-nowrap">
              <span>with </span>
              <span
                className="inline-block"
                style={{
                  background:
                    'linear-gradient(135deg, var(--orbit-accent-primary) 0%, #06B6D4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 20px rgba(14,165,164,0.4))',
                }}
              >
                AI Automation.
              </span>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={ft(0.26)}
            className="mx-auto mb-3 mt-0 w-full max-w-2xl text-center text-sm leading-relaxed sm:text-base md:mb-4 md:text-lg"
            style={{ color: 'var(--orbit-text-secondary)' }}
          >
            OrbitFlow brings your teams, tools, and AI together to automate workflows, accelerate
            decisions, and drive real results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={ft(0.36)}
            className="mb-4 flex w-full flex-col items-center justify-center gap-3 sm:mb-8 sm:max-w-none sm:flex-row sm:gap-3 md:mb-3"
          >
            <Link
              to="/auth/register"
              className="group relative flex w-full cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-full px-5 py-3 text-sm font-extrabold tracking-[0.08em] whitespace-nowrap uppercase transition-all duration-200 active:scale-[0.98] sm:w-auto sm:gap-1.5 sm:px-8 sm:py-4 sm:text-base sm:tracking-widest md:px-6 md:py-3.5"
              style={{
                background: 'linear-gradient(135deg, var(--orbit-accent-primary) 0%, #06B6D4 100%)',
                color: '#FFFFFF',
                boxShadow: '0 4px 15px rgba(14,165,164,0.3)',
              }}
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 h-3 w-3 transition-transform group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
              <div className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
            </Link>
            <Link
              to="/schedule-demo"
              className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-full border border-[var(--orbit-accent-primary)]/40 bg-[var(--orbit-accent-primary)]/10 px-5 py-3 text-sm font-extrabold tracking-[0.08em] whitespace-nowrap text-[var(--orbit-accent-primary)] uppercase transition-all duration-300 hover:scale-105 hover:border-[var(--orbit-accent-primary)] hover:bg-[var(--orbit-accent-primary)] hover:text-white active:scale-[0.98] sm:w-auto sm:gap-1.5 sm:px-8 sm:py-4 sm:text-base sm:tracking-widest md:px-6 md:py-3.5"
            >
              Book a Demo
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : undefined}
            transition={ft(0.48)}
            className="flex w-full flex-row flex-wrap items-center justify-center gap-2 text-center text-xs sm:gap-3.5 sm:text-lg"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <div className="flex -space-x-2 sm:-space-x-2.5">
              {[
                '/images/ai_bg_1.jpg',
                '/images/ai_bg_2.jpg',
                '/images/ai_feature_1.jpg',
                '/images/ai_feature_2.jpg',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Active team member profile avatar ${i + 1}`}
                  loading="lazy"
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8"
                  style={{ border: `2px solid ${BG}` }}
                />
              ))}
            </div>
            <div className="flex flex-row items-center gap-2 sm:gap-2.5">
              <div className="flex" role="img" aria-label="5 star rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400 sm:h-4 sm:w-4" />
                ))}
              </div>
              <span className="text-xs font-semibold text-white/80 sm:text-sm">
                Trusted by 20k+ teams
              </span>
            </div>
          </motion.div>
        </motion.div>
        {/* -- LOGO MARQUEE - preserved exactly as-is -- */}
        <div className="absolute right-0 bottom-[5px] left-0 z-40 h-14 bg-transparent sm:bottom-0 md:h-[72px]">
          <div className="flex h-full w-full items-center">
            <LogoMarquee />
          </div>
        </div>
      </motion.section>

      {/* ==========================================================
          WHITE CARD RISES UP OVER THE HERO (AI Supply effect)
          Uses natural document flow: hero is sticky/pinned,
          this card scrolls up over it as user scrolls.
          border-radius + shadow creates the physical sheet feel.
      ========================================================== */}
      <div className="hero-bottom-divider absolute bottom-0 left-0 right-0 z-10 w-full">
        {/* Drag handle pill */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-9 rounded-full bg-black/10 dark:bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
