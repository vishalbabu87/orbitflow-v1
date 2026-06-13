import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Zap,
  Share2,
  Cpu,
  MousePointer,
  Smile,
  MessageSquare,
  Layers,
  Link2,
} from 'lucide-react';
import { AreaChart, Area } from 'recharts';

// Card 1: AI Workflow Engine (Drag & Drop Editor style)
const WorkflowVisual = () => (
  <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#FAE1FF] select-none">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />

    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* Floating toolbar */}
      <div className="relative z-10 mb-4 flex scale-100 gap-3 rounded-2xl border border-pink-200/50 bg-pink-50/40 px-4 py-2.5 shadow-sm">
        <div className="text-pink-650 flex h-7 w-7 items-center justify-center rounded-lg border border-pink-200/60 bg-pink-50/60 shadow-sm">
          <MousePointer size={15} />
        </div>
        <div className="text-pink-650 flex h-7 w-7 items-center justify-center rounded-lg border border-pink-200/60 bg-pink-50/60 text-xs font-bold shadow-sm">
          T
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500 text-white shadow-md shadow-pink-500/20">
          <Zap size={15} className="fill-current" />
        </div>
        <div className="text-pink-650 flex h-7 w-7 items-center justify-center rounded-lg border border-pink-200/60 bg-pink-50/60 shadow-sm">
          <Share2 size={15} />
        </div>
      </div>

      {/* Dashed Upload Box */}
      <div className="relative flex h-28 w-56 items-center justify-center rounded-2xl border-2 border-dashed border-pink-300/40 bg-pink-200/10">
        <motion.div
          animate={{
            x: [-18, 18, -18],
            y: [-8, 8, -8],
          }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="relative z-10 flex items-center gap-1.5 rounded-xl border border-pink-200/60 bg-pink-50/70 px-4 py-2.5 text-xs font-bold text-pink-600 shadow-sm"
        >
          <GitBranch size={13} />
          <span>Workflow.js</span>
        </motion.div>

        {/* Floating hand cursor */}
        <motion.div
          animate={{
            x: [-12, 22, -12],
            y: [10, 28, 10],
          }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="pointer-events-none absolute z-20"
        >
          <MousePointer size={20} className="text-pink-750 fill-current" />
        </motion.div>
      </div>
    </div>
  </div>
);

// Card 2: AI Agent Control (Prototyping Node Chart style)
const AgentVisual = () => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#FDEED6] select-none">
    <div className="relative flex h-full w-full items-center justify-center">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 55 50 C 90 20, 110 80, 145 50"
          fill="none"
          stroke="#E8CBA0"
          strokeWidth="2.5"
          strokeDasharray="5 5"
          animate={{ strokeDashoffset: -20 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
        />
      </svg>

      <div className="relative z-10 flex w-full items-center justify-around gap-14 px-4">
        <div
          style={{ background: 'linear-gradient(135deg,#FFD86B,#E8B84A)' }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/40 shadow-lg"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-white">
            <Cpu size={18} />
          </div>
        </div>

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          style={{ background: 'linear-gradient(135deg,#FFD0C4,#FF8E75)' }}
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/40 shadow-lg"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-white">
            <Smile size={18} />
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

// Card 3: Team Collaboration Sync (Real-time collaboration concentric circles)
const CollabVisual = () => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#E0E4FF] select-none">
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Concentric rings */}
      <div className="border-indigo-300/20 absolute flex h-52 w-52 items-center justify-center rounded-full border-2">
        <div className="border-indigo-300/30 flex h-38 w-38 items-center justify-center rounded-full border-2">
          <div className="border-indigo-300/40 flex h-24 w-24 items-center justify-center rounded-full border-2">
            <div
              style={{
                background: 'radial-gradient(circle at top, #A6B4FF, #5966FF)',
              }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-white shadow-lg"
            >
              <MessageSquare size={22} className="fill-current" />
            </div>
          </div>
        </div>
      </div>

      {/* Orbiting avatars */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
        className="pointer-events-none absolute z-10 h-40 w-40"
      >
        <div className="absolute top-0 left-1/2 h-8 w-8 -translate-x-1/2 overflow-hidden rounded-full border border-indigo-300 shadow-sm">
          <img
            src="/images/ai_feature_1.jpg"
            alt="avatar"
            className="h-full w-full object-cover"
            width={32}
            height={32}
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-0 left-1/2 h-8 w-8 -translate-x-1/2 overflow-hidden rounded-full border border-indigo-300 shadow-sm">
          <img
            src="/images/ai_feature_2.jpg"
            alt="avatar"
            className="h-full w-full object-cover"
            width={32}
            height={32}
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  </div>
);

// Card 4: Real-Time Telemetry Charts
const AnalyticsVisual = () => {
  const chartData = [
    { val: 20 },
    { val: 45 },
    { val: 30 },
    { val: 65 },
    { val: 50 },
    { val: 85 },
    { val: 70 },
    { val: 98 },
  ];
  return (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden bg-[#D2FBE4] p-5 select-none">
      <div className="absolute top-4 left-4 z-10 text-left sm:top-5 sm:left-5">
        <span className="font-mono text-xs font-bold tracking-widest text-emerald-600 uppercase">
          LIVE TELEMETRY
        </span>
        <h4 className="mt-0.5 text-xs font-extrabold !text-black sm:text-sm">147 requests/sec</h4>
      </div>
      <div className="relative flex h-full w-full flex-col justify-end">
        <div className="h-[95px] w-full flex justify-center items-end">
          <AreaChart width={306} height={95} data={chartData} margin={{ left: 6, right: 6, top: 8, bottom: 2 }}>
            <Area
              type="monotone"
              dataKey="val"
              stroke="#10B981"
              strokeWidth={3}
              fill="rgba(16,185,129,0.06)"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

// Card 5: Integrations & API Sync (Slack, GitHub, Figma connected to central database/integration hub)
const IntegrationsVisual = () => (
  <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-[#E8E1FF] select-none">
    <div className="relative flex h-full w-full flex-col items-center justify-between p-6">
      {/* SVG connecting paths - direct curves to central hub */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
      >
        {/* Left to Hub */}
        <path
          d="M 40 50 Q 45 110, 92 135"
          fill="none"
          stroke="#A5B4FC"
          strokeWidth="2.5"
          strokeDasharray="5 5"
        />
        {/* Middle to Hub */}
        <line
          x1="100"
          y1="50"
          x2="100"
          y2="135"
          stroke="#A5B4FC"
          strokeWidth="2.5"
          strokeDasharray="5 5"
        />
        {/* Right to Hub */}
        <path
          d="M 160 50 Q 155 110, 108 135"
          fill="none"
          stroke="#A5B4FC"
          strokeWidth="2.5"
          strokeDasharray="5 5"
        />
      </svg>

      {/* Top Row: Fictional/Integration Logos */}
      <div className="relative z-10 mt-2 flex w-full items-center justify-between px-2">
        {/* Slack -> MessageSquare */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-200/40 bg-white text-indigo-500 shadow-md">
          <MessageSquare size={18} />
        </div>

        {/* GitHub -> GitBranch */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-200/40 bg-white text-emerald-500 shadow-md">
          <GitBranch size={18} />
        </div>

        {/* Figma -> Layers */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-200/40 bg-white text-pink-500 shadow-md">
          <Layers size={18} />
        </div>
      </div>

      {/* Bottom: Central Connection Hub */}
      <div className="relative z-10 mb-2">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-indigo-400 bg-indigo-600 text-white shadow-xl shadow-indigo-600/30"
        >
          <Link2 size={24} className="animate-pulse" />
        </motion.div>
      </div>
    </div>
  </div>
);

const carouselCards = [
  {
    id: 'workflow',
    label: 'AI Pipelines',
    title: 'Workflow Visualizer',
    description:
      'Design complex AI actions visually with automated triggers, runs, and latency checks.',
    strokeColor: '#EC4899',
    Visual: WorkflowVisual,
    bgColor: '#FAE1FF',
  },
  {
    id: 'copilot',
    label: 'Autonomous Agent',
    title: 'AI Diagnostics',
    description:
      'Let our context-aware diagnostic engine inspect, optimize, and sync logs in real time.',
    strokeColor: '#F59E0B',
    Visual: AgentVisual,
    bgColor: '#FDEED6',
  },
  {
    id: 'collab',
    label: 'Team Sync',
    title: 'Collaborative Center',
    description:
      'Invite team workspace owners, distribute credentials, and monitor flows together.',
    strokeColor: '#6366F1',
    Visual: CollabVisual,
    bgColor: '#E0E4FF',
  },
  {
    id: 'analytics',
    label: 'Telemetry Engine',
    title: 'Real-Time Analytics',
    description:
      'Monitor execution history, latency averages, and token credits within telemetry charts.',
    strokeColor: '#10B981',
    Visual: AnalyticsVisual,
    bgColor: '#D2FBE4',
  },
  {
    id: 'integrations',
    label: 'Universal Bridges',
    title: 'API Integrations',
    description:
      'Sync database servers, messenger nodes, developer repositories, and custom webhook streams in seconds.',
    strokeColor: '#4F46E5',
    Visual: IntegrationsVisual,
    bgColor: '#E8E1FF',
  },
];

export const ProductCarousel = () => {
  const lastInteractionTime = useRef(Date.now());
  const [index, setIndex] = useState(2); // Center on Team Sync initially
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Touch swipe state for mobile
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use a fluid scale factor instead of rigid breakpoints
  const isMobile = windowWidth < 768;
  
  // Calculate dynamic card width that fits proportionally
  // On desktop (1200+), width is 370. On mobile/tablet, it scales down.
  const maxCardWidth = 370;
  const padding = isMobile ? 32 : 64; // Horizontal padding for the container
  
  // If we want to show 3 cards on screen without cutoff, the theoretical max is roughly windowWidth / 3.
  // But we want the center card prominent, and side cards can be pushed to the edges or overlap.
  const cardWidth = Math.min(maxCardWidth, Math.max(260, windowWidth * 0.35));
  const cardHeight = cardWidth * 1.25; // Maintain aspect ratio with extra breathing height
  
  const cardGap = windowWidth < 768 ? 16 : 24;
  
  // Offset distance determines how far apart the cards are. 
  // If 3 cards don't fit (3 * cardWidth > windowWidth), we make them overlap by reducing offsetDistance.
  const maxOffset = cardWidth + cardGap;
  const safeOffset = (windowWidth - padding - cardWidth) / 2; // Distance from center to edge minus half card
  const offsetDistance = Math.min(maxOffset, safeOffset);
  const scaleFactor = cardWidth / maxCardWidth;

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % carouselCards.length);
  }, []);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + carouselCards.length) % carouselCards.length);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 3500);
  }, [handleNext, stopAutoPlay]);

  const registerInteraction = () => {
    lastInteractionTime.current = Date.now();
    stopAutoPlay();
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    // Temporarily pause scroll for 10 seconds after user click interaction
    interactionTimeoutRef.current = setTimeout(() => {
      if (!isPaused) {
        startAutoPlay();
      }
    }, 10000);
  };

  const handleManualNext = () => {
    registerInteraction();
    handleNext();
  };

  const handleManualPrev = () => {
    registerInteraction();
    handlePrev();
  };

  const handleCardClick = (i: number) => {
    registerInteraction();
    setIndex(i);
  };

  // Set up auto-scrolling lifecycle
  useEffect(() => {
    if (!isPaused) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => {
      stopAutoPlay();
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, [isPaused, startAutoPlay, stopAutoPlay]);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#0B0F19] py-[clamp(4rem,8vw,6rem)]" id="showcase">
      {/* Premium Ambient Backlight Spotlight (Professional Silhouette Separation) */}
      <div className="carousel-spotlight" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 text-center">
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-4 py-1.5 shadow-sm dark:border-gray-800 dark:bg-[#11161d]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
            <span className="font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
              Platform Features
            </span>
          </div>
          <h2 className="mb-3 font-sans text-fluid-5xl leading-tight font-extrabold tracking-tight text-gray-900 dark:text-white">
            Everything you need <br />
            in a{' '}
            <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
              single platform
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 dark:text-gray-500">
            Create, prototype, and collaborate effortlessly.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative mt-4 flex w-full items-center justify-center overflow-hidden"
          style={{ minHeight: `${cardHeight + 24}px`, touchAction: 'pan-y' }}
          onMouseEnter={() => !isMobile && setIsPaused(true)}
          onMouseLeave={() => !isMobile && setIsPaused(false)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null || touchStartY.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            const dy = e.changedTouches[0].clientY - touchStartY.current;
            // Only treat as horizontal swipe if it's more horizontal than vertical
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
              if (dx < 0) {
                handleManualNext();
              } else {
                handleManualPrev();
              }
            }
            touchStartX.current = null;
            touchStartY.current = null;
          }}
        >
          <div className="relative flex w-full max-w-[1200px] items-center justify-center">
            {carouselCards.map((card, i) => {
              let offset = i - index;
              if (offset < -2) offset += carouselCards.length;
              if (offset > 2) offset -= carouselCards.length;

              const isActive = offset === 0;
              const isSide = Math.abs(offset) === 1;
              const isVisible = windowWidth < 500 ? isActive : isActive || isSide;

              const xPos = offset * offsetDistance;

              return (
                <motion.div
                  key={card.id}
                  style={{
                    position: 'absolute',
                    zIndex: isActive ? 10 : isSide ? 5 : 1,
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    visibility: isVisible ? 'visible' : 'hidden',
                    willChange: 'transform',
                  }}
                  animate={{
                    x: xPos,
                    scale: isActive ? 1.02 : 0.96,
                    y: isActive ? -4 : 0,
                    opacity: isVisible ? 1.0 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                  transition={{
                    type: 'tween',
                    ease: [0.25, 1, 0.5, 1],
                    duration: 0.65,
                  }}
                  className={`carousel-card relative flex cursor-pointer flex-col overflow-hidden rounded-[24px] transition-all duration-300 ${
                    isActive
                      ? 'active-card border border-[var(--orbit-accent-primary)] shadow-[0_6px_0_0_rgba(14,165,164,0.25)] dark:shadow-[0_6px_0_0_rgba(14,165,164,0.15)]'
                      : 'border border-gray-200 shadow-[0_3px_0_0_#E5E7EB] dark:border-gray-800/85 dark:shadow-[0_3px_0_0_#181F2A]'
                  }`}
                  onClick={() => handleCardClick(i)}
                >
                  {/* Glowing Top Accent Bar */}
                  {isActive && (
                    <div
                      className="absolute top-0 right-0 left-0 z-30 h-[2px]"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, ${card.strokeColor} 50%, transparent 100%)`,
                      }}
                    />
                  )}

                  {/* Top Illustration Area - Thin gap with elevated 3D button style */}
                  <div className="shrink-0 p-3 pb-0 select-none">
                    <div
                      className="relative aspect-[1.4/1] w-full overflow-hidden rounded-[18px] border border-gray-200/60 shadow-[0_4px_0_0_#E5E7EB] transition-all dark:border-gray-800/80 dark:shadow-[0_4px_0_0_#1F2937] flex items-center justify-center"
                      style={{ backgroundColor: card.bgColor }}
                    >
                      <div
                        style={{
                          width: '346px',
                          height: '247px',
                          transform: `scale(${scaleFactor})`,
                          transformOrigin: 'center center',
                          flexShrink: 0
                        }}
                        className="relative mockup-visual"
                      >
                        <card.Visual />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Text Area - Reduced space, transparent background */}
                  <div className="relative z-20 flex flex-grow flex-col justify-center bg-transparent p-4 pb-6 text-center sm:p-5 sm:pb-7">
                    <span
                      className="mb-1 block font-mono text-xs font-bold tracking-wider uppercase max-sm:text-xs sm:text-xs"
                      style={{ color: card.strokeColor }}
                    >
                      {card.label}
                    </span>
                    <h4 className="mb-1 text-base leading-snug font-bold text-gray-900 max-sm:text-base sm:text-lg dark:text-white">
                      {card.title}
                    </h4>
                    <p className="text-gray-750 px-1 text-xs leading-relaxed font-semibold max-sm:text-xs sm:px-2 sm:text-xs dark:text-gray-500">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Next/Prev Navigation */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleManualPrev}
            className="cursor-pointer rounded-full border-2 border-gray-200 bg-white p-3.5 text-gray-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-[#11161d] dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={handleManualNext}
            className="cursor-pointer rounded-full border-2 border-gray-200 bg-white p-3.5 text-gray-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-[#11161d] dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
