import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, Database, Network } from 'lucide-react';

// â”€â”€â”€ TILE COMPONENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const MosaicTile = ({
  index,
  image,
  isInView,
}: {
  index: number;
  image: string;
  isInView: boolean;
}) => {
  const row = Math.floor(index / 10);
  const col = index % 10;

  // Randomize the initial scatter for a more organic "pop"
  const randomDelay = useMemo(() => Math.random() * 0.18, []);
  const initialOffset = useMemo(
    () => ({
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 60,
      rotate: (Math.random() - 0.5) * 45,
      scale: 0.2 + Math.random() * 0.5,
    }),
    []
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: initialOffset.scale,
        x: initialOffset.x,
        y: initialOffset.y,
        rotate: initialOffset.rotate,
        borderColor: 'rgba(255, 255, 255, 0.2)',
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotate: 0,
              borderColor: 'rgba(255, 255, 255, 0)', // Fade border to 0 for seamless look
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: randomDelay,
        type: 'spring',
        bounce: 0.2,
        borderColor: { delay: randomDelay + 0.4, duration: 0.5 }, // Delay the border fade until after it snaps
      }}
      className="relative aspect-square overflow-hidden border-r border-b border-solid bg-[#0c0c0e]"
      style={{ borderWidth: '1px' }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: '1000% 1000%',
          backgroundPosition: `${col * 11.11}% ${row * 11.11}%`,
          width: '100%',
          height: '100%',
        }}
      />
    </motion.div>
  );
};

// â”€â”€â”€ STAGGERED TEXT COMPONENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const StaggeredText = ({
  subtitle,
  title,
  text,
  side,
  isInView,
  icon: Icon,
}: {
  subtitle: string;
  title: string;
  text: string;
  side: 'left' | 'right';
  isInView: boolean;
  icon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'right' ? 40 : -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'flex max-w-md flex-col',
        side === 'right' ? 'items-end text-right' : 'items-start text-left'
      )}
    >
      <div
        className={cn(
          'mb-6 flex items-center gap-3',
          side === 'right' ? 'flex-row' : 'flex-row-reverse'
        )}
      >
        <div className="rounded-lg border border-[#6366F1]/20 bg-[#6366F1]/10 p-2">
          <Icon className="h-4 w-4 text-[#6366F1]" />
        </div>
        <span className="font-mono text-xs font-black tracking-[0.4em] text-[#6366F1] uppercase">
          {subtitle}
        </span>
      </div>

      <h2 className="mb-8 text-4xl leading-[1] font-black tracking-tighter text-white uppercase italic md:text-6xl">
        {title}
      </h2>

      <p className="font-body mb-10 text-lg leading-relaxed text-white/60">{text}</p>

      <button
        type="button"
        className={cn(
          'group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-10 py-5 text-xs font-black tracking-[0.2em] text-white uppercase transition-all hover:border-[#6366F1] hover:bg-[#6366F1] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] active:scale-95',
          side === 'right' ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        View Documentation
        <ArrowRight
          size={14}
          className={cn(
            'transition-transform',
            side === 'right' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
          )}
        />
      </button>
    </motion.div>
  );
};

// â”€â”€â”€ MAIN COMPONENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const FeatureUnfold = () => {
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);

  // Trigger animations when the container is 10% visible (softer trigger for all devices)
  const isBlock1InView = useInView(block1Ref, { amount: 0.1, once: true });
  const isBlock2InView = useInView(block2Ref, { amount: 0.1, once: true });

  const tiles = useMemo(() => Array.from({ length: 100 }), []);

  // High-fidelity telemetry and code mockups. Using same reliable image to prevent loading bugs.
  const img1 =
    '/images/ai_feature_1.jpg';
  const img2 =
    '/images/ai_feature_2.jpg';

  return (
    <section className="relative overflow-hidden bg-[var(--orbit-base)] py-16 md:py-20 lg:py-24">
      {/* Decorative Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* BLOCK 1: INGESTION ENGINE */}
      <div
        ref={block1Ref}
        className="relative z-10 mx-auto mb-40 grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:gap-24 lg:grid-cols-2"
      >
        <div className="relative aspect-square w-full max-w-[500px]">
          <div className="grid h-full w-full grid-cols-10 grid-rows-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070C18] p-1.5 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            {tiles.map((_, i) => (
              <MosaicTile key={i} index={i} image={img1} isInView={isBlock1InView} />
            ))}
          </div>
          <div className="absolute inset-0 -z-10 rounded-full bg-[#00E5FF]/5 blur-[120px]" />
        </div>

        <div className="flex justify-end">
          <StaggeredText
            side="right"
            isInView={isBlock1InView}
            icon={Database}
            subtitle="Neural Ingestion"
            title="Every user action. Captured."
            text="Watch as fragmented user events snap into a complete behavioral map. Vertex ingests millions of interactions and surfaces the signals that actually predict what happens next."
          />
        </div>
      </div>

      {/* BLOCK 2: UNIFIED TELEMETRY */}
      <div
        ref={block2Ref}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:gap-24 lg:grid-cols-2"
      >
        <div className="flex justify-start">
          <StaggeredText
            side="left"
            isInView={isBlock2InView}
            icon={Network}
            subtitle="Global Resolution"
            title="One view. Your entire journey."
            text="Vertex collapses the chaos of distributed data into a single, continuously updated picture of your product. No SQL required. No waiting for weekly reports."
          />
        </div>

        <div className="relative aspect-square w-full max-w-[500px] lg:ml-auto">
          <div className="grid h-full w-full grid-cols-10 grid-rows-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070C18] p-1.5 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            {tiles.map((_, i) => (
              <MosaicTile key={i} index={i} image={img2} isInView={isBlock2InView} />
            ))}
          </div>
          <div className="absolute inset-0 -z-10 rounded-full bg-[#6366F1]/5 blur-[120px]" />
        </div>
      </div>
    </section>
  );
};
