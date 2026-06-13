import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Sparkles, Monitor, Chrome, Database, MessageSquare } from 'lucide-react';
import { AreaChart, Area } from 'recharts';

/* ---------------------------------------------
   Individual Visual Mockup Components (Rich Illustrations)
   ----------------------------------------------*/

// Feature 1: AI Workflow Automation Mockup (Drag & Drop Canvas)
const WorkflowMockup = () => (
  <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-6 select-none">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />

    {/* Visual Node Graph */}
    <div className="relative z-10 flex w-full max-w-[280px] items-center justify-between max-sm:origin-center max-sm:scale-[0.82]">
      {/* Node 1: Generic Trigger */}
      <div className="group relative flex h-14 w-14 flex-col items-center justify-center rounded-2xl border border-pink-200/50 bg-white shadow-md">
        <div className="border-pink-150 flex h-8 w-8 items-center justify-center rounded-xl border bg-pink-50/70 text-pink-500">
          <MessageSquare size={16} />
        </div>
        <span className="mt-1 font-mono text-xs font-bold text-gray-500">Trigger</span>
      </div>

      {/* SVG Connecting Curve 1 */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-8 -translate-y-1/2">
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
        >
          <path
            d="M 20 20 Q 100 -5 180 20"
            fill="none"
            stroke="rgba(244, 63, 94, 0.15)"
            strokeWidth="2.5"
          />
          <motion.path
            d="M 20 20 Q 100 -5 180 20"
            fill="none"
            stroke="#EC4899"
            strokeWidth="2.5"
            strokeDasharray="8 12"
            animate={{ strokeDashoffset: -40 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
          />
        </svg>
      </div>

      {/* Node 2: AI Logic Block */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="relative z-10 flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-pink-500/20 bg-white shadow-lg"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500 text-white shadow-md shadow-pink-500/20">
          <GitBranch size={18} />
        </div>
        <span className="text-pink-650 mt-1 font-mono text-xs font-black">AI Logic</span>
      </motion.div>

      {/* SVG Connecting Curve 2 */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-8 -translate-y-1/2">
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
        >
          <path
            d="M 180 20 Q 100 45 20 20"
            fill="none"
            stroke="rgba(244, 63, 94, 0.15)"
            strokeWidth="2.5"
          />
          <motion.path
            d="M 180 20 Q 100 45 20 20"
            fill="none"
            stroke="#EC4899"
            strokeWidth="2.5"
            strokeDasharray="8 12"
            animate={{ strokeDashoffset: 40 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
          />
        </svg>
      </div>

      {/* Node 3: Database Output */}
      <div className="relative flex h-14 w-14 flex-col items-center justify-center rounded-2xl border border-purple-200/50 bg-white shadow-md">
        <div className="border-purple-150 flex h-8 w-8 items-center justify-center rounded-xl border bg-purple-50/70 text-purple-500">
          <Database size={16} />
        </div>
        <span className="mt-1 font-mono text-xs font-bold text-gray-500">Action</span>
      </div>
    </div>

    {/* Floating tooltip badge */}
    <div className="text-pink-650 absolute bottom-4 z-20 rounded-full border border-pink-500/20 bg-white px-3 py-1 font-mono text-xs font-bold tracking-wider uppercase shadow-sm">
      Pipeline Status: Active (1.2ms)
    </div>
  </div>
);

// Feature 2: AI Copilot Assistance Mockup (Chat and Logs Interface)
const CopilotMockup = () => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6 select-none">
    <div className="relative z-10 w-full max-w-[250px] space-y-3 rounded-2xl border border-amber-500/20 bg-white p-4 text-left shadow-md max-sm:origin-center max-sm:scale-[0.82]">
      {/* Bot Chat Header */}
      <div className="border-gray-150 flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-amber-500 text-white">
            <Sparkles size={11} className="fill-current" />
          </div>
          <span className="text-xs font-black tracking-tight text-gray-800 uppercase">
            Orbit Copilot
          </span>
        </div>
        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
      </div>

      {/* Message bubble: User request */}
      <div className="rounded-xl bg-gray-50 px-3 py-2 text-xs leading-relaxed font-normal text-gray-600">
        "Suggest a conditional path for incoming customer support leads."
      </div>

      {/* Message bubble: Copilot suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-amber-100 bg-amber-50/70 p-3 text-xs leading-normal text-amber-900"
      >
        <span className="mb-1 block font-bold">Generated Output:</span>
        <span className="text-amber-850 font-mono text-xs leading-tight">
          IF priority &gt; 3 THEN route_to_channel() ELSE route_to_db()
        </span>
      </motion.div>
    </div>
  </div>
);

// Feature 3: Real-Time Analytics Mockup (Interactive Telemetry Dashboard)
const AnalyticsMockup = () => {
  const chartData = [
    { val: 35 },
    { val: 55 },
    { val: 45 },
    { val: 80 },
    { val: 70 },
    { val: 95 },
    { val: 85 },
    { val: 100 },
  ];

  const [chartWidth, setChartWidth] = React.useState(280);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setChartWidth(entry.contentRect.width || 280);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden p-5 select-none max-sm:origin-center max-sm:scale-[0.85]">
      {/* Top dashboard stats */}
      <div className="z-10 grid w-full grid-cols-3 gap-2">
        {[
          { label: 'P99 Latency', val: '4.2ms', color: 'text-teal-600' },
          { label: 'CPU Load', val: '12%', color: 'text-indigo-600' },
          { label: 'Active Pipes', val: '8/8', color: 'text-emerald-600' },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-xl border border-teal-100 bg-white px-2 py-2.5 text-left shadow-sm"
          >
            <span className="block font-mono text-xs leading-none font-bold text-gray-400 uppercase max-sm:text-xs">
              {stat.label}
            </span>
            <span
              className={`mt-1 block text-xs leading-none font-black tracking-tight max-sm:text-lg ${stat.color}`}
            >
              {stat.val}
            </span>
          </div>
        ))}
      </div>

      {/* Middle metric heading */}
      <div className="z-10 mt-3 px-1 text-left">
        <span className="text-emerald-600 block font-mono text-xs font-bold tracking-widest uppercase max-sm:text-xs">
          LIVE STREAM
        </span>
        <h4 className="mt-0.5 text-base leading-none font-extrabold text-gray-800 max-sm:text-xl">
          14,842 requests
        </h4>
      </div>

      {/* Telemetry charts - full bleed horizontally, correctly scaled vertically */}
      <div
        ref={containerRef}
        className="relative -bottom-1 mt-2 h-[75px] w-full border-0 border-none [&_*]:border-0 [&_*]:border-none"
      >
        <AreaChart
          width={chartWidth}
          height={75}
          data={chartData}
          margin={{ left: 0, right: 0, top: 8, bottom: 2 }}
        >
          <Area
            type="monotone"
            dataKey="val"
            stroke="#10B981"
            strokeWidth={2.2}
            fill="rgba(16,185,129,0.06)"
          />
        </AreaChart>
      </div>
    </div>
  );
};

/* ---------------------------------------------
   Unified Premium Browser Frame Container
  -----------------------------------------------*/
interface BrowserFrameProps {
  children: React.ReactNode;
  bgClass: string;
}

const BrowserFrame = ({ children, bgClass }: BrowserFrameProps) => (
  <div className="relative flex w-full flex-col justify-between rounded-[20px] border border-gray-200/80 bg-gray-100/70 p-1 shadow-sm transition-all duration-300 md:p-1.5 dark:border-white/10 dark:bg-gray-900/60 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
    {/* Browser mockup card inside */}
    <div
      className={`relative flex aspect-[4/3] w-full flex-col overflow-hidden rounded-[14px] border border-gray-200/30 dark:border-white/5 ${bgClass} shadow-[0_12px_32px_rgba(0,0,0,0.02)] transition-colors duration-300`}
    >
      {/* Browser top header */}
      <div className="flex h-8 shrink-0 items-center border-b border-black/5 px-4 select-none">
        {/* Window Controls */}
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-black/10 dark:bg-black/20" />
          <div className="h-2 w-2 rounded-full bg-black/10 dark:bg-black/20" />
          <div className="h-2 w-2 rounded-full bg-black/10 dark:bg-black/20" />
        </div>
      </div>

      {/* Live Mockup View Body */}
      <div className="relative flex flex-grow flex-col">{children}</div>
    </div>

    {/* Sub-label showing system availability */}
    <div className="mt-3 flex items-center justify-center gap-3 text-xs font-semibold text-gray-500 select-none">
      <span>Available on Web, macOS & Windows</span>
      <div className="flex gap-1.5 text-gray-400">
        <Chrome size={11} className="stroke-[2.5]" />
        <Monitor size={11} className="stroke-[2.5]" />
      </div>
    </div>
  </div>
);

const features = [
  {
    id: 1,
    label: 'Workflow Orchestration',
    heading: 'Build intelligent workflows without complexity.',
    description:
      'Design AI-powered automations visually with triggers, actions, and real-time orchestration.',
    Mockup: WorkflowMockup,
    bgClass: 'bg-[#FFECFE]',
    isReversed: false,
  },
  {
    id: 2,
    label: 'Embedded Intelligence',
    heading: 'Your AI assistant for smarter operations.',
    description:
      "Let OrbitFlow's context-aware copilot help write drafts, summarize logs, and resolve issues dynamically.",
    Mockup: CopilotMockup,
    bgClass: 'bg-[#FFF2D4]',
    isReversed: true, // Mockup left, text right
  },
  {
    id: 3,
    label: 'Live Telemetry',
    heading: 'Track performance as workflows evolve.',
    description:
      'Monitor workflow trigger volumes, API response times, and system load counters in real time.',
    Mockup: AnalyticsMockup,
    bgClass: 'bg-[#E0FAF4]',
    isReversed: false,
  },
];

export const FeatureDeepDive = () => {
  return (
    <section
      id="feature-deep-dive"
      className="relative overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-[#0B0F19]"
    >
      {/* Signature vertical rhythm lines */}
      <div className="bg-vertical-grid" />

      <div className="relative z-10 mx-auto max-w-5xl space-y-32 px-6">
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <span className="mb-4 block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase">
            Features
          </span>
          <h2 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-6xl dark:text-white">
            Powerful capabilities for every team.
          </h2>
        </div>

        {features.map((feature) => (
          <div
            key={feature.id}
            className={`flex flex-col items-center gap-12 md:flex-row lg:gap-16 ${
              feature.isReversed ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Left/Right Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="flex-1 flex-grow space-y-4 text-left"
            >
              <span className="feature-deep-dive-card-label block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase">
                {feature.label}
              </span>
              <h3
                className={`feature-deep-dive-card-title leading-tight font-extrabold tracking-tight text-gray-900 dark:text-white ${
                  feature.id === 2 ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
                }`}
              >
                {feature.heading}
              </h3>
              <p className="feature-deep-dive-card-desc max-w-md text-sm leading-relaxed font-normal text-gray-500 dark:text-gray-500">
                {feature.description}
              </p>
            </motion.div>

            {/* Left/Right Mockup Illustration wrapped in browser frame */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="w-full flex-1 shrink-0 flex-grow mockup-visual"
            >
              <BrowserFrame bgClass={feature.bgClass}>
                <feature.Mockup />
              </BrowserFrame>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureDeepDive;
