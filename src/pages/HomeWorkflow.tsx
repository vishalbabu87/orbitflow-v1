import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  ArrowRight,
  Zap,
  GitBranch,
  Check,
  Mail,
  MessageSquare,
  Database,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';
import { Link } from 'react-router-dom';
import { DashboardShowcase } from '../components/vertex/DashboardShowcase';

const workflowSteps = [
  {
    icon: Mail,
    title: '1. Webhook Lead Trigger',
    desc: 'A user submits a form on your web app. OrbitFlow receives lead details in milliseconds.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: GitBranch,
    title: '2. Conditional Router',
    desc: 'If company size > 100, route to priority HubSpot database. Otherwise, log in standard pipeline.',
    color: 'text-[var(--orbit-accent-primary)] bg-teal-50',
  },
  {
    icon: Database,
    title: '3. Enrich Profile',
    desc: 'Run a python script sandbox to fetch lead social profiles and compile contact information.',
    color: 'text-purple-600 bg-purple-50',
  },
  {
    icon: MessageSquare,
    title: '4. Slack Integration',
    desc: 'Send a structured rich markdown card alert containing profile details to your sales channel.',
    color: 'text-amber-600 bg-amber-50',
  },
];

const coreCapabilities = [
  {
    title: 'Multi-Step Workflows',
    desc: 'Chain together triggers, delays, custom scripts, integrations, and loops on a single collaborative canvas.',
  },
  {
    title: 'JS/Python Sandbox Block',
    desc: 'Write native Javascript or Python to format JSON payloads, parse parameters, or run custom helper operations.',
  },
  {
    title: 'Automatic Retry Queues',
    desc: 'If an external API suffers downtime, OrbitFlow queues the payload and retries execution exponentially.',
  },
  {
    title: 'State Encryption',
    desc: 'Data processed inside pipelines is encrypted at rest using AES-256 keys, and deleted upon execution completion.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Connect Apps',
    desc: 'Authenticate your services using OAuth keys or custom headers inside our encrypted vault.',
  },
  {
    num: '02',
    title: 'Define Triggers',
    desc: 'Set database webhooks, queue alerts, or schedules to trigger workflow pipelines.',
  },
  {
    num: '03',
    title: 'Automate Loops',
    desc: 'Visually map data variables, add conditional branches, and run automation loops at the edge.',
  },
];

const plans = [
  {
    name: 'Starter Flow',
    price: 39,
    desc: 'For launching simple automations.',
    features: [
      '1,000 Executions / mo',
      '5 Active Pipelines',
      'Standard integrations',
      '1 Day log history',
    ],
  },
  {
    name: 'Business Flow',
    price: 119,
    desc: 'For scaling business workflows.',
    features: [
      '50,000 Executions / mo',
      'Unlimited active pipelines',
      'Premium integrations',
      'JS/Python scripting block',
      '30 Day log history',
    ],
  },
  {
    name: 'Enterprise',
    price: 399,
    desc: 'Private clusters for high-frequency operations.',
    features: [
      'Unlimited Executions',
      'Unlimited pipelines',
      'On-Prem connectors',
      'SLA uptime guarantee',
      'SOC2 compliance auditing',
    ],
  },
];

const faqs = [
  {
    q: 'Can the workflow engine scale to high-frequency volumes?',
    a: 'Yes, our execution engine is built in Go and runs across edge clusters to handle millions of concurrent webhook events instantly.',
  },
  {
    q: 'How secure are my credential keys?',
    a: 'All authentication secrets are encrypted using AES-256-GCM keys before writing to our isolated hashicorp vault nodes.',
  },
  {
    q: 'Can I run custom scripting logic?',
    a: 'Yes, you can write custom Javascript or Python code blocks directly inside the workflow node editor to parse arrays or format variables.',
  },
];

export const HomeWorkflow = () => {
  const [selectedPlan, setSelectedPlan] = useState('Business Flow');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--orbit-base)] text-[var(--orbit-text-primary)] selection:bg-teal-500/30">
      <Navbar />

      {/* -- HERO -- */}
      <section id="main-content" className="relative overflow-hidden px-6 pt-40 pb-20 dark:bg-transparent">
        <div className="bg-vertical-grid" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)]/5 blur-[120px]" />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-teal-200/50 bg-teal-50 px-3 py-1 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase dark:border-teal-900/30 dark:bg-teal-950/20">
              <Zap size={12} /> Pipeline Engine
            </span>

            <h1 className="mb-6 font-sans text-5xl leading-none font-extrabold tracking-tight text-gray-900 md:text-7xl dark:text-white">
              Automate Your
              <br />
              <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
                Workflow Loops
              </span>
              <br />
              at Any Scale
            </h1>

            <p className="mb-8 max-w-lg text-base leading-relaxed font-medium text-gray-500 md:text-lg dark:text-gray-500">
              Connect your databases, webhooks, and SaaS APIs together. Visually design logic flows
              that run reliably in milliseconds.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/auth"
                className="rounded-xl bg-[var(--orbit-accent-primary)] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,165,164,0.25)]"
              >
                Create Pipeline Free
              </Link>
              <Link
                to="/schedule-demo"
                className="rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-xs font-bold tracking-wider text-gray-800 uppercase transition-all hover:border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
              >
                Schedule Demo
              </Link>
            </div>
          </div>

          {/* Interactive Pipeline Visualiser */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative space-y-4 rounded-[2.5rem] border-2 border-gray-200 bg-white p-8 shadow-[0_12px_48px_rgba(0,0,0,0.06)] dark:border-gray-800 dark:bg-[#111827]"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
              <span className="font-mono text-xs font-extrabold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
                LeadNotify Flow
              </span>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[var(--orbit-accent-primary)] px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#0c9594]"
              >
                <Play size={10} className="fill-current" /> Run Pipeline
              </button>
            </div>

            <div className="space-y-4">
              {workflowSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative flex items-center gap-4">
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 dark:border-gray-800 ${step.color}`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">
                        {step.title}
                      </h4>
                      <span className="mt-0.5 block text-xs leading-snug font-normal text-gray-500 dark:text-gray-400">
                        {step.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Showcase */}
      <DashboardShowcase defaultPreset="automation" />

      {/* -- CORE CAPABILITIES GRID -- */}
      <section className="border-t border-gray-100 bg-transparent px-6 py-24 dark:border-gray-800 dark:bg-transparent">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Workflow Loop
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Complete Operational Control
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {coreCapabilities.map((cap) => (
              <div
                key={cap.title}
                className="flex flex-col justify-between rounded-3xl border-2 border-gray-200 bg-white p-8 transition-all hover:border-[var(--orbit-accent-primary)]/30 hover:shadow-[0_8px_32px_rgba(14,165,164,0.05)] dark:border-gray-800 dark:bg-[#111827] dark:hover:border-[var(--orbit-accent-primary)]/50"
              >
                <div>
                  <h3 className="mb-2 text-2xl font-black text-gray-900 lg:text-lg dark:text-white">
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-normal text-gray-500 dark:text-gray-500">
                    {cap.desc}
                  </p>
                </div>
                <div className="mt-6 flex cursor-pointer items-center justify-between border-t border-gray-100 pt-4 text-xs font-bold text-[var(--orbit-accent-primary)] dark:border-gray-800">
                  <span>Learn more</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- HOW IT WORKS -- */}
      <section className="border-t border-gray-100 bg-transparent px-6 py-24 dark:border-gray-800 dark:bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-16 max-w-2xl">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Process
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Your Pipeline Build Process
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="elite-card flex flex-col justify-between rounded-3xl p-8 text-left"
              >
                <div>
                  <span className="mb-4 block font-mono text-3xl font-black text-[var(--orbit-accent-primary)]/20">
                    {step.num}
                  </span>
                  <h3 className="mb-2 text-2xl font-extrabold text-gray-900 lg:text-base dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-normal text-gray-500 dark:text-gray-500">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- PRICING -- */}
      <section className="border-t border-gray-100 bg-transparent px-6 py-24 dark:border-gray-800 dark:bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-16 max-w-2xl">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Pricing
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Invest in Your Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
            {plans.map((p) => {
              const isSelected = p.name === selectedPlan;
              return (
                <div
                  key={p.name}
                  onClick={() => setSelectedPlan(p.name)}
                  className={`relative flex cursor-pointer flex-col justify-between rounded-3xl border-2 p-8 text-left transition-all duration-300 ${
                    isSelected
                      ? 'border-[var(--orbit-accent-primary)] bg-white shadow-[0_16px_40px_rgba(14,165,164,0.12)] md:scale-[1.03] dark:bg-[#111827] dark:shadow-[0_16px_40px_rgba(14,165,164,0.22)]'
                      : 'border-gray-200 bg-white hover:border-[var(--orbit-accent-primary)] dark:border-gray-800 dark:bg-[#111827] dark:hover:border-[var(--orbit-accent-primary)]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full border border-teal-200/50 bg-teal-50 px-2.5 py-0.5 text-xs font-bold tracking-wider text-teal-600 uppercase">
                      Popular
                    </div>
                  )}
                  <div>
                    <h3 className="mb-2 text-2xl font-black tracking-wider text-gray-900 uppercase lg:text-lg dark:text-white">
                      {p.name}
                    </h3>
                    <div className="mb-4 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-gray-900 dark:text-white">
                        ${p.price}
                      </span>
                      <span className="font-mono text-xs text-gray-400">/mo</span>
                    </div>
                    <p className="leading-relaxed mb-6 text-xs text-gray-500 dark:text-gray-500">{p.desc}</p>
                    <ul className="space-y-3">
                      {p.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300"
                        >
                          <Check
                            size={12}
                            className="text-[var(--orbit-accent-primary)]"
                            strokeWidth={3}
                          />{' '}
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to="/auth"
                    className={`mt-8 w-full rounded-xl py-3 text-center text-xs font-extrabold tracking-wider uppercase transition-all hover:scale-[1.01] active:scale-[0.99] ${
                      isSelected
                        ? 'border border-[var(--orbit-accent-primary)] bg-[var(--orbit-accent-primary)] text-white shadow-md shadow-teal-500/10 hover:bg-[#0c9594]'
                        : 'border border-gray-200 bg-gray-50 text-gray-700 hover:border-[var(--orbit-accent-primary)] hover:bg-[var(--orbit-accent-primary)]/5 hover:text-[var(--orbit-accent-primary)] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    Select {p.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="border-y border-gray-100 bg-transparent px-6 py-24 dark:border-gray-800 dark:bg-transparent">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              FAQ
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="elite-card overflow-hidden rounded-2xl transition-all hover:border-[var(--orbit-accent-primary)]/40 hover:shadow-[0_0_20px_rgba(14,165,164,0.08)]"
              >
                <button
                  type="button"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between p-5 text-left focus:ring-2 focus:ring-[var(--orbit-accent-primary)] focus:outline-none"
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={14} className="shrink-0 text-gray-400" />
                  ) : (
                    <ChevronDown size={14} className="shrink-0 text-gray-400" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-xs leading-relaxed font-normal text-gray-600 dark:text-gray-300">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- BOTTOM CTA -- */}
      <section className="relative overflow-hidden bg-transparent px-6 py-24 dark:bg-transparent">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
            Ready to Boost Conversions by 300%?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-gray-500 dark:text-gray-500">
            Start triggering lead routing, database management, and Slack notifications instantly
            with our drag-and-drop workflow canvas.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/auth"
              className="rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,165,164,0.2)]"
            >
              Get Started Free
            </Link>
            <Link
              to="/pricing-detailed"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-xs font-bold tracking-wider text-gray-800 uppercase transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Compare Plans <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeWorkflow;
