import { motion } from 'framer-motion';
import { Brain, Zap, TrendingUp, ShieldCheck, Activity, Globe, ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'AI Workflow Automation',
    description:
      "OrbitFlow's neural engine processes trigger actions automatically, routing fields and mapping values across platforms dynamically.",
    icon: Brain,
    tag: 'Predictive',
  },
  {
    title: 'Intelligent AI Agent Nodes',
    description:
      'Incorporate intelligent reasoning, summaries, translation, and structured data extraction directly inside your execution pipelines.',
    icon: TrendingUp,
    tag: 'AI reasoning',
  },
  {
    title: 'Multi-App Integration Mesh',
    description:
      'Connect HubSpot, Slack, Mailchimp, Notion, Salesforce, Google Drive, and more. Sync your tools without writing custom webhook listeners.',
    icon: Zap,
    tag: 'Automation',
  },
  {
    title: 'Enterprise Compliance Vault',
    description:
      'SOC2 compliant and GDPR ready. Every single task runs in isolated secure sandboxes with AES-256 bank-grade sharding.',
    icon: ShieldCheck,
    tag: 'Security',
  },
  {
    title: 'Real-time Telemetry Logs',
    description:
      'Track execution latency, active runs, node outputs, and connection health logs as they happen with zero delay.',
    icon: Activity,
    tag: 'Analytics',
  },
  {
    title: 'Visual Workflow Canvas',
    description:
      'Map out your conditional logic in a drag-and-drop builder, set trigger rules, check logs, and monitor outputs easily.',
    icon: Globe,
    tag: 'Network',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative overflow-hidden bg-white py-[clamp(4rem,10vw,8rem)] dark:bg-[#0B0F19]">
      {/* Signature vertical rhythm lines */}
      <div className="bg-vertical-grid" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mx-auto mb-[clamp(3rem,8vw,6rem)] max-w-2xl text-center">
          <span className="mb-4 block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase">
            Features
          </span>
          <h2 className="mx-auto max-w-xl text-fluid-5xl leading-tight font-extrabold tracking-tight text-gray-900 dark:text-white">
            Engineered for workflow efficiency.
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ willChange: 'transform, opacity' }}
              className="group h-full"
            >
              <div className="elite-card relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-8">
                <div className="mb-8 flex min-w-0 flex-row items-center justify-between gap-3">
                  <div className="shrink-0 rounded-2xl border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 p-3 text-[var(--orbit-accent-primary)] transition-transform duration-300 group-hover:scale-105">
                    <feature.icon size={24} />
                  </div>
                  <span className="dark:text-gray-550 shrink-0 rounded-md border border-gray-100 bg-gray-50 px-1.5 py-0.5 font-mono text-xs font-bold tracking-widest text-gray-400 uppercase sm:text-xs dark:border-gray-800 dark:bg-gray-800/50">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="mb-3 font-sans text-base font-extrabold tracking-tight text-gray-900 sm:text-xl dark:text-white">
                  {feature.title}
                </h3>
                <p className="mb-8 flex-1 text-sm leading-relaxed font-normal text-gray-500 sm:text-base dark:text-gray-500">
                  {feature.description}
                </p>

                <div className="group/link mt-auto flex cursor-pointer items-center justify-between border-t border-gray-50 pt-6 dark:border-gray-800">
                  <span className="dark:text-gray-550 text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group-hover/link:text-[var(--orbit-accent-primary)]">
                    Technical Specs
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-gray-300 transition-all group-hover/link:translate-x-1 group-hover/link:text-[var(--orbit-accent-primary)] dark:text-gray-600"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
