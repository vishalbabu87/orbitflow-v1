import { motion } from 'framer-motion';
import { Share2, GitBranch } from 'lucide-react';

/* --------------------------------------------- */
// Step 1: Connect Your Tools
const StepOneVisual = () => (
  <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl border border-teal-200/60 bg-[#D1F2F0] select-none dark:border-teal-900/40 dark:bg-teal-950/20">
    <div className="relative h-full w-[192px] flex items-center justify-center max-sm:origin-center max-sm:scale-[0.82]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 192 128" preserveAspectRatio="xMidYMid meet">
        <line
          x1="25%"
          y1="50%"
          x2="50%"
          y2="50%"
          className="stroke-gray-300 dark:stroke-teal-900/50"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <line
          x1="75%"
          y1="50%"
          x2="50%"
          y2="50%"
          className="stroke-gray-300 dark:stroke-teal-900/50"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <line
          x1="50%"
          y1="20%"
          x2="50%"
          y2="50%"
          className="stroke-gray-300 dark:stroke-teal-900/50"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        <circle r="2.5" fill="var(--orbit-accent-primary)">
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M 48 64 L 96 64" />
        </circle>
        <circle r="2.5" fill="var(--orbit-accent-primary)">
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M 144 64 L 96 64" />
        </circle>
      </svg>

      <div className="relative z-10 flex items-center justify-center gap-6">
        <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-xl border border-teal-300/40 bg-teal-50/50 font-mono text-xs font-bold text-teal-700 shadow-sm dark:border-teal-800/40 dark:bg-teal-900/30 dark:text-teal-700 dark:text-teal-400">
          SL
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-300/60 bg-teal-50/70 font-bold text-teal-600 shadow-md dark:border-teal-800/60 dark:bg-teal-900/50 dark:text-teal-300">
          <Share2 size={20} />
        </div>
        <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-xl border border-teal-300/40 bg-teal-50/50 font-mono text-xs font-bold text-teal-700 shadow-sm dark:border-teal-800/40 dark:bg-teal-900/30 dark:text-teal-700 dark:text-teal-400">
          NO
        </div>
      </div>
    </div>
  </div>
);

// Step 2: Build AI Workflows (Center - highlighted)
const StepTwoVisual = () => (
  <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-indigo-200/80 bg-[#DEE2FF] select-none dark:border-indigo-900/40 dark:bg-indigo-950/20">
    <div className="relative h-full w-[192px] max-sm:origin-center max-sm:scale-[0.82]">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 192 128"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="step2-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--orbit-accent-primary)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#33D0D0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.15" />
          </linearGradient>
          <filter id="step2-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M 40 64 Q 96 20 152 64"
          fill="none"
          className="leading-relaxed stroke-gray-300 dark:stroke-indigo-900/50"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <motion.path
          d="M 40 64 Q 96 20 152 64"
          fill="none"
          stroke="url(#step2-grad)"
          strokeWidth="2.5"
          filter="url(#step2-glow)"
          strokeDasharray="40 100"
          animate={{ strokeDashoffset: -140 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
        />
      </svg>

      {/* Absolutely positioned nodes aligned precisely with SVG path start, curve peak, and end */}
      <div className="absolute top-[64px] left-[40px] -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-200/50 bg-indigo-50/50 text-indigo-600 shadow-sm dark:border-indigo-800/40 dark:bg-indigo-900/30 dark:text-indigo-400">
          <span className="text-xs font-bold">IF</span>
        </div>
      </div>

      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute top-[42px] left-[96px] z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-indigo-300/60 bg-indigo-50/70 text-indigo-600 shadow-md dark:border-indigo-800/60 dark:bg-indigo-900/50 dark:text-indigo-300"
      >
        <GitBranch size={16} />
      </motion.div>

      <div className="absolute top-[64px] left-[152px] -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-200/50 bg-indigo-50/50 text-indigo-600 shadow-sm dark:border-indigo-800/40 dark:bg-indigo-900/30 dark:text-indigo-400">
          <span className="text-xs font-bold">THEN</span>
        </div>
      </div>
    </div>
  </div>
);

// Step 3: Monitor & Optimize
const StepThreeVisual = () => (
  <div className="relative flex h-32 w-full flex-col justify-end overflow-hidden rounded-2xl border-2 border-emerald-200/80 bg-[#CBFADB] p-3 select-none dark:border-emerald-900/40 dark:bg-emerald-950/20">
    <div className="relative flex h-full w-full flex-col justify-end max-sm:origin-center max-sm:scale-[0.82]">
      <div className="absolute top-0 left-0 text-left">
        <span className="block font-mono text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          Trigger Rate
        </span>
        <h4 className="text-sm leading-none font-bold text-gray-800 dark:text-gray-200">99.8%</h4>
      </div>

      <div className="flex h-[55px] w-full items-end gap-1.5 px-2">
        {[40, 70, 55, 90, 65, 85, 95].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="flex-1 rounded-t-sm border-t-2 border-teal-500 bg-teal-500/20 dark:bg-teal-500/30"
          />
        ))}
      </div>
    </div>
  </div>
);

const steps = [
  {
    number: '01',
    label: 'Step 1',
    title: 'Bind Webhook Schemas',
    body: 'Map your Slack, Notion, TableSync, and Stripe credentials using secure, authenticated vault connections.',
    Visual: StepOneVisual,
  },
  {
    number: '02',
    label: 'Step 2',
    title: 'Configure Dynamic Nodes',
    body: 'Design multi-branch routing logic visually by defining custom workflow criteria and triggers.',
    Visual: StepTwoVisual,
    highlight: true,
  },
  {
    number: '03',
    label: 'Step 3',
    title: 'Inspect Telemetry Analytics',
    body: 'Track task status in real time with continuous execution velocity tracking and latency charts.',
    Visual: StepThreeVisual,
  },
];

export const HowItWorks = () => {
  return (
    <section
      className="relative overflow-hidden bg-white dark:bg-[#0B0F19] py-16 md:py-20 lg:py-24"
      id="how-it-works"
    >
      {/* Decorative vertical lines */}
      <div className="bg-vertical-grid" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <span className="mb-4 block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase">
            How It Works
          </span>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
            Automate workflows in three simple steps.
          </h2>
          <p className="leading-relaxed mx-auto max-w-lg text-sm text-gray-500 dark:text-gray-500">
            OrbitFlow helps teams connect tools, automate operations, and optimize performance with
            intelligent AI workflows.
          </p>
        </div>

        {/* Process Cards Wrapper */}
        <div className="relative">
          {/* Premium Animated Glowing Connector Line (Adjusted for wider container max-w-[1200px] and aligned at top-[45%]) */}
          <div className="pointer-events-none absolute top-[44%] right-[6%] left-[6%] z-20 hidden h-12 md:block">
            <svg className="w-full overflow-visible" height="60" viewBox="0 0 1000 60" fill="none">
              <defs>
                {/* Clean neon glow filter */}
                <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Linear gradient for flowing power segment (reverted to lighter fading design) */}
                <linearGradient id="power-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--orbit-accent-primary)" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#33D0D0" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* 1. Underlying clean dashed base wire (sleek design) */}
              <path
                d="M 10 30 Q 250 5 500 20 T 990 30"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="4 6"
                fill="none"
              />

              {/* 2. Flowing power stream (glowing gradient path that translates infinitely, lighter fade) */}
              <path
                d="M 10 30 Q 250 5 500 20 T 990 30"
                stroke="url(#power-grad)"
                strokeWidth="3.5"
                strokeDasharray="140 360"
                filter="url(#neon-glow)"
                fill="none"
              >
                <animate
                  attributeName="strokeDashoffset"
                  values="500;0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>

              {/* 3. Leading glowing energy packet (pulses at the tip of the flow) */}
              <circle r="5" fill="#33D0D0" filter="url(#neon-glow)">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M 10 30 Q 250 5 500 20 T 990 30"
                />
              </circle>
              <circle r="2.2" fill="#FFF">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M 10 30 Q 250 5 500 20 T 990 30"
                />
              </circle>
            </svg>
          </div>

          {/* Grid layout with wider cards (gap-12, max-w-[1200px]) */}
          <div className="relative z-10 grid grid-cols-1 items-stretch gap-12 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative z-10 flex min-h-[385px] flex-col justify-between rounded-3xl border-2 border-gray-200 bg-white p-6 transition-all duration-300 sm:p-7 dark:border-gray-800 dark:bg-[#11161d] ${
                  step.highlight
                    ? 'scale-[1.03] shadow-[0_12px_36px_rgba(14,165,164,0.06)] md:translate-y-[-8px] dark:shadow-none'
                    : 'shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)]'
                }`}
              >
                {/* z-40 for text content */}
                <div className="relative z-40 pb-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="how-it-works-step-label font-mono text-base font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase lg:text-sm">
                      {step.label}
                    </span>
                    <span className="text-2xl font-black text-gray-200 dark:text-gray-800">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="how-it-works-step-title mb-1.5 text-base font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="how-it-works-step-body pr-4 text-xs leading-relaxed font-normal text-gray-600 dark:text-gray-500">
                    {step.body}
                  </p>
                </div>

                <div className="relative z-40 mt-auto rounded-2xl bg-transparent">
                  <step.Visual />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
