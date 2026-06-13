import { motion } from 'framer-motion';
import { Zap, TrendingDown, Brain, Clock, Cpu, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Sub-50ms Telemetry Velocity',
    description:
      'Execute webhooks, distribute payloads, and trigger conditional routing steps in under 50ms.',
  },
  {
    icon: TrendingDown,
    title: 'Zero Ingestion Failures',
    description:
      'Ingest multi-tenant event batches continuously without data loss using isolated queue replicas.',
  },
  {
    icon: Brain,
    title: 'Behavioral Forecasting',
    description:
      'Detect churn-risk customer segments 14 days earlier utilizing transaction history data analysis.',
  },
  {
    icon: Clock,
    title: 'Active Webhook Continuity',
    description:
      'Maintain live synchronization logs automatically, even during peak operational loads.',
  },
  {
    icon: Cpu,
    title: 'One-Click Schema Sync',
    description:
      'Bridge Notion, Slack, TableSync, and Stripe databases with instant validation layers.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Vault Isolation',
    description:
      'Protect sensitive workspace API keys and encryption variables under SOC2 compliance.',
  },
];

export const BenefitsSection = () => {
  return (
    <section
      id="benefits"
      className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden bg-white py-12 md:py-24 dark:bg-[#0B0F19]"
    >
      {/* Signature vertical rhythm lines */}
      <div className="bg-vertical-grid" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center sm:mb-12 md:mb-24">
          <span className="mb-4 block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase">
            Benefits
          </span>
          <h2 className="mx-auto max-w-xl text-4xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
            Let your team focus on what matters most.
          </h2>
        </div>

        {/* Airy 6-Item Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 max-sm:gap-y-12 md:grid-cols-3 md:gap-x-16 md:gap-y-12">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col items-start space-y-4 text-left"
            >
              {/* Minimal floating icon in custom dark-teal container */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-teal-300 shadow-sm transition-transform duration-300 group-hover:translate-y-[-3px] group-hover:shadow-[0_4px_12px_rgba(14,165,164,0.15)]"
                style={{
                  background: 'linear-gradient(180deg, #17374A 0%, #102836 100%)',
                }}
              >
                <benefit.icon size={18} strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed font-normal text-gray-500 dark:text-gray-500">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
