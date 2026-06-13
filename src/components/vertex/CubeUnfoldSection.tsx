import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Brain, Zap, BarChart2, Shield, ArrowRight } from 'lucide-react';

const PANELS = [
  {
    id: 'top',
    origin: 'top center',
    folded: { rotateX: 90, opacity: 0 },
    unfolded: { rotateX: 0, opacity: 1 },
    className: 'top-0 left-0 right-0 h-1/2',
    delay: 0,
  },
  {
    id: 'bottom',
    origin: 'bottom center',
    folded: { rotateX: -90, opacity: 0 },
    unfolded: { rotateX: 0, opacity: 1 },
    className: 'bottom-0 left-0 right-0 h-1/2',
    delay: 0.1,
  },
  {
    id: 'left',
    origin: 'left center',
    folded: { rotateY: -90, opacity: 0 },
    unfolded: { rotateY: 0, opacity: 1 },
    className: 'top-0 bottom-0 left-0 w-1/2',
    delay: 0.2,
  },
  {
    id: 'right',
    origin: 'right center',
    folded: { rotateY: 90, opacity: 0 },
    unfolded: { rotateY: 0, opacity: 1 },
    className: 'top-0 bottom-0 right-0 w-1/2',
    delay: 0.3,
  },
];

interface CubeUnfoldWidgetProps {
  isTriggered: boolean;
}

function CubeUnfoldWidget({ isTriggered }: CubeUnfoldWidgetProps) {
  return (
    <div className="preserve-3d relative mx-auto aspect-[4/3] w-full max-w-[520px] perspective-[1500px]">
      {/* Central Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isTriggered ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.8, duration: 1, ease: 'circOut' }}
        className="absolute inset-0 z-20"
      >
        <div className="elite-card flex h-full flex-col justify-center overflow-hidden rounded-[2.5rem] bg-[#070C18] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <Brain className="h-5 w-5 text-[#6366F1] shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            </div>
            <span className="font-mono text-xs font-black tracking-[0.4em] text-white/30 uppercase">
              Neural Expansion Core
            </span>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs font-black tracking-widest text-white/30 uppercase">
                <span>Expansion Potential</span>
                <span className="text-[#10B981]">+12.4%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isTriggered ? { width: '70%' } : {}}
                  transition={{ delay: 1.2, duration: 1.5, ease: 'circOut' }}
                  className="h-full bg-[#6366F1] shadow-[0_0_15px_#6366F1]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs font-black tracking-widest text-white/30 uppercase">
                <span>Usage Drift Intensity</span>
                <span className="text-[#6366F1]">Low</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isTriggered ? { width: '40%' } : {}}
                  transition={{ delay: 1.4, duration: 1.5, ease: 'circOut' }}
                  className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                />
              </div>
            </div>
          </div>
          <div className="mt-10 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
            <p className="font-mono text-xs leading-relaxed tracking-widest text-white/50 uppercase italic">
              AI detects <span className="font-black text-white">Consumption_Drift</span> in{' '}
              <span className="font-black text-[#6366F1]">cluster_02</span>. Expansion yield
              confirmed at <span className="font-black text-[#10B981]">+12.4% ARR</span>.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Unfolding Panels */}
      {PANELS.map((panel) => (
        <motion.div
          key={panel.id}
          initial={panel.folded}
          animate={isTriggered ? panel.unfolded : panel.folded}
          transition={{ delay: panel.delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: panel.origin }}
          className={`absolute ${panel.className} z-10 rounded-[1.5rem] border border-white/10 bg-[#070C18]/80 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md`}
        />
      ))}
    </div>
  );
}

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface SectionBlockProps {
  label: string;
  heading: string;
  headingAccent: string;
  body: string;
  features: FeatureItem[];
  cta: string;
}

function SectionBlock({ label, heading, headingAccent, body, features, cta }: SectionBlockProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 items-center gap-24 border-b border-white/5 py-40 lg:grid-cols-2"
    >
      <div className="flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="w-fit rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-4 py-1.5 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
        >
          <span className="font-mono text-xs font-black tracking-[0.4em] text-[#6366F1] uppercase">
            {label}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl leading-[0.9] font-black tracking-tighter text-white uppercase italic md:text-6xl"
        >
          {heading} <br />
          <span className="font-medium text-white/30 not-italic">{headingAccent}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-lg text-xl leading-relaxed font-medium text-white/50"
        >
          {body}
        </motion.p>

        <div className="flex flex-wrap gap-4">
          {features.map((f: FeatureItem, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
            >
              <f.icon className="h-4 w-4 text-[#6366F1]" />
              <span className="font-mono text-xs font-black tracking-widest text-white/70 uppercase">
                {f.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="group flex w-fit items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-xs font-black tracking-[0.2em] text-white uppercase transition-all hover:border-[#6366F1] hover:bg-[#6366F1] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] active:scale-95"
        >
          {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 1, ease: 'circOut' }}
        className="relative"
      >
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[#6366F1]/10 blur-[120px]" />
        <CubeUnfoldWidget isTriggered={isInView} />
      </motion.div>
    </div>
  );
}

export default function CubeUnfoldSection() {
  return (
    <section className="neural-grid relative mx-auto max-w-7xl overflow-visible px-6 py-16 md:py-20 lg:py-24">
      <div className="absolute top-0 left-1/2 h-32 w-px -translate-x-1/2 bg-gradient-to-b from-[#6366F1] to-transparent opacity-40"></div>

      <SectionBlock
        label="Neural Intelligence"
        heading="Intelligence that anticipates"
        headingAccent="Your Expansion."
        body="Vertex identifies churn risk and expansion potential before it happens. Our Neural OS analyzes account behavior 24/7 to surface growth opportunities automatically."
        cta="Deploy Neural Core"
        features={[
          { icon: Activity, label: 'Behavioral Triggers' },
          { icon: Brain, label: 'Expansion Scoring' },
          { icon: Shield, label: 'Auto-Mitigation' },
        ]}
      />

      <SectionBlock
        label="Revenue Orchestration"
        heading="Unify your consumption"
        headingAccent="Data Streams."
        body="Track every cent of usage-based revenue in real time. Unify your infrastructure logs with your billing engine for 100% accurate financial forecasting and drift detection."
        cta="Analyze Streams"
        features={[
          { icon: Zap, label: 'Real-time Usage' },
          { icon: BarChart2, label: 'Revenue Attribution' },
          { icon: Activity, label: 'Neural Telemetry' },
        ]}
      />
    </section>
  );
}
