import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Database, Brain, RefreshCcw, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: Database,
    tag: 'INGESTION',
    title: 'Universal Data Ingestion',
    desc: 'Connect your entire stack in minutes. Vertex ingests raw events, logs, and DB transactions with sub-50ms latency.',
    badge: 'SOC2 COMPLIANT',
    color: '#00E5FF',
  },
  {
    icon: Brain,
    tag: 'ANALYSIS',
    title: 'AI Behavioral Mapping',
    desc: 'Our neural engine correlates feature adoption with churn risk, building a dynamic health score for every account.',
    badge: 'VERTEX AI ACTIVE',
    color: '#6366F1',
  },
  {
    icon: RefreshCcw,
    tag: 'RETENTION',
    title: 'Predictive Revenue Recovery',
    desc: 'Identify at-risk revenue before it churns. Automate expansion playbooks based on real product usage signals.',
    badge: 'LIVE RECOVERY',
    color: '#10B981',
  },
];

export const FeatureFanOut = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="neural-grid relative overflow-hidden border-t border-white/5 bg-[var(--orbit-base)] py-40"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6366F1]/5 blur-[140px]"></div>

      <div className="relative z-10 mx-auto mb-32 max-w-7xl px-6 text-center">
        <span className="glow-text mb-6 block font-mono text-xs font-bold tracking-[0.5em] text-[#6366F1] uppercase">
          THE ENGINE
        </span>
        <h2 className="mx-auto mb-8 max-w-4xl text-5xl leading-[0.9] font-black tracking-tighter text-white uppercase md:text-7xl">
          Engineering <br />
          <span className="text-[#6366F1] italic">Predictable Growth.</span>
        </h2>
        <p className="mx-auto max-w-xl text-lg leading-relaxed font-medium text-white/40">
          Traditional analytics show you the past. Vertex maps the future of your revenue using
          high-fidelity behavioral neural traces.
        </p>
      </div>

      <div className="relative mx-auto flex min-h-[500px] max-w-7xl flex-col items-center px-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ rotate: 0, x: 0, opacity: 0, y: 50 }}
            whileInView={{
              rotate: (i - 1) * 12,
              x: (i - 1) * 380,
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 30,
              damping: 12,
              delay: i * 0.15,
              duration: 2,
            }}
            className="elite-card group flex h-[480px] w-[380px] flex-col rounded-[3rem] p-12 transition-all duration-700 hover:z-50 hover:border-[#6366F1]/50 hover:shadow-[0_20px_80px_rgba(99,102,241,0.15)] md:absolute"
          >
            <div className="mb-10 flex items-center justify-between">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:border-[#6366F1]/20 group-hover:bg-[#6366F1]/10">
                <feature.icon className="h-7 w-7" style={{ color: feature.color }} />
              </div>
              <span className="font-mono text-xs font-bold tracking-[0.3em] text-white/30 uppercase">
                {feature.tag}
              </span>
            </div>

            <h3 className="mb-6 text-3xl leading-[1] font-black tracking-tighter text-white uppercase transition-colors duration-500 group-hover:text-[#6366F1]">
              {feature.title}
            </h3>
            <p className="mb-10 font-sans text-base leading-relaxed font-medium text-white/50">
              {feature.desc}
            </p>

            <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-8">
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-bold tracking-widest text-white/40 uppercase transition-colors group-hover:text-white">
                {feature.badge}
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white/20 transition-all duration-500 group-hover:bg-[#6366F1] group-hover:text-white sm:h-8 sm:w-8">
                <ChevronRight size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
