import { motion } from 'framer-motion';
import { Brain, Zap, TrendingUp, ShieldCheck, Activity, Globe, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';

const features = [
  {
    title: 'AI Workflow Automation',
    description:
      "OrbitFlow's neural engine processes trigger actions automatically, routing fields and mapping values across platforms dynamically.",
    icon: Brain,
    color: 'var(--orbit-accent-primary)',
    tag: 'Predictive',
  },
  {
    title: 'Intelligent AI Agent Nodes',
    description:
      'Incorporate intelligent reasoning, summaries, translation, and structured data extraction directly inside your execution pipelines.',
    icon: TrendingUp,
    color: 'var(--orbit-accent-primary)',
    tag: 'AI reasoning',
  },
  {
    title: 'Multi-App Integration Mesh',
    description:
      'Connect HubSpot, Slack, Mailchimp, Notion, Salesforce, Google Drive, and more. Sync your tools without writing custom webhook listeners.',
    icon: Zap,
    color: 'var(--orbit-accent-primary)',
    tag: 'Automation',
  },
  {
    title: 'Enterprise Compliance Vault',
    description:
      'SOC2 compliant and GDPR ready. Every single task runs in isolated secure sandboxes with AES-256 bank-grade sharding.',
    icon: ShieldCheck,
    color: 'var(--orbit-success)',
    tag: 'Security',
  },
  {
    title: 'Real-time Telemetry Logs',
    description:
      'Track execution latency, active runs, node outputs, and connection health logs as they happen with zero delay.',
    icon: Activity,
    color: 'var(--orbit-accent-primary)',
    tag: 'Analytics',
  },
  {
    title: 'Visual Workflow Canvas',
    description:
      'Map out your conditional logic in a drag-and-drop builder, set trigger rules, check logs, and monitor outputs easily.',
    icon: Globe,
    color: 'var(--orbit-accent-primary)',
    tag: 'Network',
  },
];

export const Features = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-gray-900 selection:bg-[var(--orbit-accent-primary)]/30 dark:text-[var(--orbit-text-primary)]">
      <Navbar />

      <main className="relative flex-grow px-6 pt-32 pb-20">
        {/* Signature vertical rhythm lines */}
        <div className="bg-vertical-grid" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-20 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-4 block font-mono text-xs font-bold tracking-[0.4em] text-[var(--orbit-accent-primary)] uppercase"
            >
              CAPABILITIES MESH
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-6 font-sans text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl dark:text-[var(--orbit-text-primary)]"
            >
              Engineered for <br />
              <span className="font-display font-normal text-gray-400 italic dark:text-[var(--orbit-text-muted)]">
                Workflow Efficiency
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 dark:text-[var(--orbit-text-muted)]"
            >
              OrbitFlow isn't just a webhook router. It's an autonomous AI productivity system that
              triggers, transforms, and automates your entire daily operations.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group h-full"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-all duration-500 hover:border-gray-200 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]">
                  <div className="mb-8 flex min-w-0 flex-row items-center justify-between gap-3">
                    <div className="shrink-0 rounded-2xl border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 p-3 text-[var(--orbit-accent-primary)] transition-transform duration-300 group-hover:scale-110">
                      <feature.icon size={24} />
                    </div>
                    <span className="shrink-0 rounded-md border border-gray-100 bg-gray-50 px-1.5 py-0.5 font-mono text-xs font-bold tracking-widest text-gray-400 uppercase sm:text-xs dark:border-[var(--orbit-border-subtle)] dark:bg-[var(--orbit-surface)] dark:text-[var(--orbit-text-muted)]">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="mb-3 font-sans text-base font-bold tracking-tight text-gray-900 sm:text-lg dark:text-[var(--orbit-text-primary)]">
                    {feature.title}
                  </h3>
                  <p className="mb-8 flex-1 text-sm leading-relaxed font-normal text-gray-500 dark:text-[var(--orbit-text-muted)]">
                    {feature.description}
                  </p>

                  <div className="group/link mt-auto flex cursor-pointer items-center justify-between border-t border-gray-50 pt-6">
                    <span className="text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group-hover/link:text-[var(--orbit-accent-primary)] dark:text-[var(--orbit-text-muted)]">
                      Technical Specs
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-gray-300 transition-all group-hover/link:translate-x-1 group-hover/link:text-[var(--orbit-accent-primary)]"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative mt-24 overflow-hidden rounded-[3rem] border border-gray-100 bg-white p-12 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] md:p-20 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
          >
            <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)]/5 blur-[120px]" />

            <h2 className="mb-6 font-sans text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-[var(--orbit-text-primary)]">
              Ready to Automate?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-gray-500 dark:text-[var(--orbit-text-muted)]">
              Join 15,000+ high-growth teams using OrbitFlow to connect their workspace apps
              and automate their operations.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                className="w-full cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-8 py-3.5 text-xs font-bold tracking-widest text-white uppercase transition-all hover:bg-[#0C8F8E] hover:shadow-[0_4px_12px_rgba(14,165,164,0.2)] sm:w-auto"
              >
                Request Access
              </button>
              <button
                type="button"
                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-xs font-bold tracking-widest text-gray-700 uppercase transition-all hover:bg-gray-50 sm:w-auto dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:bg-[var(--orbit-surface)] dark:text-[var(--orbit-text-secondary)]"
              >
                Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
