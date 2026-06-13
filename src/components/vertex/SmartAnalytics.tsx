import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Marquee } from '@/components/ui/Marquee';
import { ArrowRight, Activity, Server, ShieldCheck, Database, ChevronRight } from 'lucide-react';

// --- REGION LATENCY COMPONENT ------------------------------
const RegionLatency = ({
  region,
  latency,
  status,
}: {
  region: string;
  latency: number;
  status: 'nominal' | 'degraded';
}) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)] p-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-primary)] uppercase">
          {region}
        </span>
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              'h-1.5 w-1.5 animate-pulse rounded-full',
              status === 'nominal'
                ? 'bg-[var(--orbit-accent-cyan)] shadow-[0_0_8px_var(--orbit-accent-cyan)]'
                : 'bg-[var(--orbit-error)] shadow-[0_0_8px_var(--orbit-error)]'
            )}
          />
          <span className="font-mono text-xs text-[var(--orbit-text-secondary)]">
            {status === 'nominal' ? 'OK' : 'WARN'}
          </span>
        </div>
      </div>
      <div className="flex items-end gap-1">
        <span
          className={cn(
            'font-mono text-xl leading-none font-black',
            status === 'nominal' ? 'text-[var(--orbit-text-primary)]' : 'text-[var(--orbit-error)]'
          )}
        >
          {latency}
        </span>
        <span className="mb-0.5 font-mono text-xs text-[var(--orbit-text-muted)]">ms</span>
      </div>
    </div>
  );
};

export const SmartAnalytics = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="neural-grid relative overflow-hidden bg-[var(--orbit-base)] px-6 py-40 transition-colors duration-300"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--orbit-accent-primary)]/[0.04] blur-[160px]"></div>

      <div className="mx-auto max-w-7xl">
        {/* Header Area */}
        <div className="mb-20 flex flex-col items-end justify-between px-2 md:flex-row">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="mb-8 flex items-center gap-3"
            >
              <div className="flex items-center gap-2.5 rounded-full border border-[var(--orbit-accent-primary)]/30 bg-[var(--orbit-accent-primary)]/10 px-4 py-1.5 shadow-[0_0_20px_color-mix(in_srgb,var(--orbit-accent-primary)_15%,transparent)]">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--orbit-accent-primary)] shadow-[0_0_8px_var(--orbit-accent-primary)]" />
                <span className="font-mono text-xs font-black tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase">
                  Neural Command Center
                </span>
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-left text-4xl leading-[1] font-black tracking-tighter text-[var(--orbit-text-primary)] uppercase md:text-6xl"
            >
              Unprecedented visibility.
              <br />
              <span className="font-medium text-[var(--orbit-text-muted)] italic">
                Zero blind spots.
              </span>
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="group mt-8 flex items-center gap-3 rounded-2xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-elevated)]/30 px-10 py-5 text-xs font-black tracking-widest text-[var(--orbit-text-primary)] uppercase transition-all hover:border-[var(--orbit-accent-primary)] hover:bg-[var(--orbit-accent-primary)] hover:text-white hover:shadow-[0_0_30px_color-mix(in_srgb,var(--orbit-accent-primary)_30%,transparent)] active:scale-95 md:mt-0"
          >
            Open Live Demo
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* TOP ROW: 3 Columns */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Network Graph Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="elite-card group relative overflow-hidden rounded-[2.5rem] border-[var(--orbit-border-mid)] p-1 lg:col-span-1"
          >
            <div className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[2.25rem] bg-[var(--orbit-surface)] p-10">
              <div className="absolute inset-0 bg-[var(--orbit-accent-primary)]/5 transition-colors duration-700 group-hover:bg-[var(--orbit-accent-primary)]/10" />
              <div className="neural-grid pointer-events-none absolute inset-0 opacity-[0.2]" />

              <div className="relative z-10 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <Activity className="h-5 w-5 animate-pulse text-[var(--orbit-accent-primary)]" />
                  <span className="font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-text-secondary)] uppercase">
                    Global Neural Mesh
                  </span>
                </div>
                <div className="mb-3 text-5xl leading-none font-black tracking-tighter text-[var(--orbit-text-primary)] italic">
                  4.2M
                </div>
                <div className="font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
                  Nodes Actively Connected
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Cluster Health */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="elite-card flex flex-col items-center justify-center rounded-[2.5rem] p-10 text-center"
          >
            <div className="mb-8 flex w-full items-center justify-between text-left">
              <h3 className="text-xl font-black tracking-tighter text-[var(--orbit-text-primary)] uppercase">
                Cluster Health
              </h3>
              <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_12px_#10B981]" />
            </div>

            <div className="relative mb-10 h-44 w-44">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--orbit-border-subtle)"
                  strokeWidth="6"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="6"
                  strokeDasharray="263.89"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 263.89 }}
                  animate={isInView ? { strokeDashoffset: 263.89 * (1 - 0.999) } : {}}
                  transition={{ duration: 2.5, ease: 'circOut', delay: 0.5 }}
                  style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.4))' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="text-4xl font-black tracking-tighter text-[var(--orbit-text-primary)] italic"
                >
                  99.9%
                </motion.span>
                <span className="mt-2 font-mono text-xs font-bold tracking-[0.3em] text-emerald-400">
                  OPTIMAL
                </span>
              </div>
            </div>

            <div className="mt-auto grid w-full grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)]/40 p-4 text-left">
                <div className="text-xl font-black tracking-tighter text-[var(--orbit-text-primary)] italic">
                  0
                </div>
                <div className="mt-1 text-xs font-bold tracking-[0.2em] text-[var(--orbit-text-muted)] uppercase">
                  Dropped
                </div>
              </div>
              <div className="rounded-2xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)]/40 p-4 text-left">
                <div className="text-xl font-black tracking-tighter text-[var(--orbit-text-primary)] italic">
                  1.2ms
                </div>
                <div className="mt-1 text-xs font-bold tracking-[0.2em] text-[var(--orbit-text-muted)] uppercase">
                  P99 Latency
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Edge Regions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="elite-card flex flex-col rounded-[2.5rem] p-10"
          >
            <h3 className="mb-8 text-left text-xl font-black tracking-tighter text-[var(--orbit-text-primary)] uppercase">
              Edge Infrastructure
            </h3>
            <div className="flex flex-1 flex-col gap-4">
              <RegionLatency region="us-east-cluster" latency={12} status="nominal" />
              <RegionLatency region="eu-west-cluster" latency={24} status="nominal" />
              <RegionLatency region="ap-asia-cluster" latency={145} status="degraded" />
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-[var(--orbit-border-subtle)] pt-6">
              <span className="font-mono text-xs tracking-widest text-[var(--orbit-text-muted)] uppercase italic">
                All nodes healthy
              </span>
              <ChevronRight className="h-4 w-4 text-[var(--orbit-text-muted)]" />
            </div>
          </motion.div>
        </div>

        {/* BOTTOM ROW: 4 Columns */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 4: Throughput */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="elite-card flex h-80 flex-col justify-between rounded-[2.5rem] p-10 text-left"
          >
            <div>
              <div className="mb-8 flex items-center justify-between">
                <div className="rounded-2xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)]/40 p-3 text-[var(--orbit-accent-primary)]">
                  <Server className="h-5 w-5" />
                </div>
                <span className="rounded-lg border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-3 py-1 font-mono text-xs font-black tracking-widest text-[var(--orbit-accent-primary)] uppercase">
                  LIVE_IO
                </span>
              </div>
              <div className="mb-1 font-mono text-xs tracking-[0.3em] text-[var(--orbit-text-muted)] uppercase">
                Peak Throughput
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl leading-none font-black tracking-tighter text-[var(--orbit-text-primary)] italic">
                  1.8
                </span>
                <span className="font-mono text-sm font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
                  GB/s
                </span>
              </div>
            </div>

            <div className="mt-8 flex h-16 items-end gap-[3px] opacity-40">
              {[40, 45, 35, 50, 42, 60, 55, 70, 65, 80, 75, 90].map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0, opacity: 0 }}
                  animate={isInView ? { height: `${v}%`, opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.8, ease: 'circOut' }}
                  className="flex-1 rounded-t-md bg-[var(--orbit-accent-primary)]"
                />
              ))}
            </div>
          </motion.div>

          {/* Card 5: Query Performance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="elite-card group relative h-80 overflow-hidden rounded-[2.5rem] p-10 text-left lg:col-span-2"
          >
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-10 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-black tracking-tighter text-[var(--orbit-text-primary)] uppercase italic">
                    Neural Query Engine
                  </h3>
                  <p className="leading-relaxed mb-8 font-mono text-xs font-bold tracking-[0.2em] text-[var(--orbit-text-muted)] uppercase">
                    P99 Trace Latency vs System Load
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)]/40 text-[var(--orbit-accent-primary)]">
                  <Database size={20} />
                </div>
              </div>

              <div className="relative mb-6 w-full flex-1">
                <svg viewBox="0 0 100 40" className="preserve-3d h-full w-full overflow-visible">
                  <defs>
                    <linearGradient id="lineGradElite" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--orbit-accent-primary)" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="var(--orbit-accent-primary)" stopOpacity="1" />
                      <stop
                        offset="100%"
                        stopColor="var(--orbit-accent-primary)"
                        stopOpacity="0.2"
                      />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0,30 C20,30 30,10 50,15 C70,20 80,5 100,20"
                    fill="none"
                    stroke="url(#lineGradElite)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 3, delay: 1, ease: 'easeInOut' }}
                    style={{
                      filter:
                        'drop-shadow(0 0 12px color-mix(in_srgb,var(--orbit-accent-primary)_50%,transparent))',
                    }}
                  />
                </svg>
              </div>

              <div className="mt-auto flex gap-8">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-[var(--orbit-accent-primary)] shadow-[0_0_8px_var(--orbit-accent-primary)]" />
                  <div className="font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-secondary)] uppercase">
                    Read: <span className="text-[var(--orbit-text-primary)]">4.2ms</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-[var(--orbit-border-mid)]" />
                  <div className="font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-secondary)] uppercase">
                    Write: <span className="text-[var(--orbit-text-primary)]">12.1ms</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Glow Overlay */}
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[var(--orbit-accent-primary)]/10 blur-[100px] transition-all duration-1000 group-hover:bg-[var(--orbit-accent-primary)]/15" />
          </motion.div>

          {/* Card 7: Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="elite-card flex h-80 flex-col justify-between rounded-[2.5rem] p-10 text-left"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
              </div>
              <div className="mb-1 font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-text-muted)] uppercase">
                Compliance Suite
              </div>
              <div className="text-2xl font-black tracking-tighter text-[var(--orbit-text-primary)] uppercase italic">
                SOC2 TYPE II
                <br />
                ACTIVE_NODE
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 border-t border-[var(--orbit-border-subtle)] pt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  DR_RETENTION
                </span>
                <span className="font-mono text-xs font-black tracking-widest text-[var(--orbit-text-primary)] uppercase">
                  365_D
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  CIPHER_SYS
                </span>
                <span className="font-mono text-xs font-black tracking-widest text-[var(--orbit-accent-primary)] uppercase">
                  AES_256
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ticker Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="elite-card relative mt-6 overflow-hidden rounded-2xl border border-[var(--orbit-border-mid)] px-10 py-5"
        >
          <div className="absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-[var(--orbit-surface)] to-transparent" />
          <div className="absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-[var(--orbit-surface)] to-transparent" />
          <Marquee className="gap-20 [--duration:40s]">
            {[
              '10M+ Events Processed/sec',
              'Zero-Drop Data Architecture',
              'Predictive Neural Drifts Active',
              '99.99% Guaranteed SLA',
              'SOC2 Compliance: Verified',
              'Kernel-Level eBPF Tracing',
              'Sub-millisecond Global Latency',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-10">
                <span className="font-mono text-xs font-black tracking-[0.4em] text-[var(--orbit-text-secondary)] uppercase italic">
                  {item}
                </span>
                <div className="h-2 w-2 rounded-full bg-[var(--orbit-accent-primary)] shadow-[0_0_10px_var(--orbit-accent-primary)]" />
              </div>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
};
export default SmartAnalytics;
