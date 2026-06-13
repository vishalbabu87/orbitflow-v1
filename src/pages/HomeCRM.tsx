import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Check, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';
import { Link } from 'react-router-dom';
import { DashboardShowcase } from '../components/vertex/DashboardShowcase';

const steps = [
  {
    num: '01',
    title: 'Import Contacts',
    desc: 'Sync your existing customer contacts and lead files from CSV, HubSpot, or Salesforce databases instantly.',
  },
  {
    num: '02',
    title: 'Set Up Pipeline',
    desc: 'Customize stages, define workflow automation rules, and trigger Slack notifications on deal updates.',
  },
  {
    num: '03',
    title: 'Close & Grow',
    desc: 'Leverage AI scoring models to target hot accounts, send custom contracts, and increase revenue velocity.',
  },
];

const plans = [
  {
    name: 'Starter Rep',
    price: 19,
    desc: 'For individual sales reps.',
    features: [
      '1 Pipeline Board',
      '1,000 Contact Accounts',
      'Basic AI Lead Scoring',
      'Email integrations',
    ],
  },
  {
    name: 'Sales Team',
    price: 89,
    desc: 'For scaling business sales teams.',
    features: [
      'Unlimited Pipelines',
      '25,000 Contact Accounts',
      'Advanced AI forecasting',
      'Custom sequences',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    price: 299,
    desc: 'Dedicated resources and audit logs.',
    features: [
      'Unlimited Pipelines',
      'Unlimited Contacts',
      'Custom AI scoring algorithms',
      'SSO & SAML integration',
      'SOC2 security gateway',
    ],
  },
];

const faqs = [
  {
    q: 'Can I import data from my existing CRM?',
    a: 'Yes, you can import leads and contacts directly via CSV files, or connect HubSpot and Salesforce APIs in one click.',
  },
  {
    q: 'How does AI lead scoring work?',
    a: 'Our AI model analyzes historical close rates, company size, website engagement, and demographic parameters to score leads from 1-100.',
  },
  {
    q: 'Is my customer data secure?',
    a: 'Yes. All contact databases and communication logs are encrypted in transit and at rest using banking-grade AES-256 protocols.',
  },
];

// High-fidelity live CRM dashboard pipeline visual mockup (replaces 584kB SVG)
const CRMHeroPanelVisual = () => {
  return (
    <div className="relative w-full rounded-2xl bg-gray-50/50 p-4 text-left select-none dark:bg-gray-950/40">
      {/* Mockup Header */}
      <div className="mb-4 flex items-center justify-between border-b border-gray-200/60 pb-3 dark:border-gray-800/60">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="xs:inline ml-2 hidden font-mono text-xs font-bold tracking-wider text-gray-400 uppercase dark:text-gray-500">
            sales_pipeline_v2.db
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-teal-50 px-2 py-0.5 font-mono text-xs font-extrabold text-teal-600 dark:bg-teal-950/40 dark:text-teal-700 dark:text-teal-400">
            AUTO-SYNC ON
          </span>
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Columns Container: stacked vertically on mobile, grid columns on desktop */}
      <div data-lenis-prevent className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-3">
        {/* Column 1: Qualified */}
        <div className="w-full space-y-3 md:w-auto">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold tracking-wider text-gray-500 uppercase dark:text-gray-400">
              Qualified
            </span>
            <span className="dark:text-gray-450 rounded-md bg-gray-200/65 px-1.5 py-0.5 text-xs font-bold text-gray-600 dark:bg-gray-800">
              2
            </span>
          </div>

          <div className="rounded-xl border border-gray-200/70 bg-white p-3.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-gray-400 uppercase dark:text-gray-500">
                ACME Corp
              </span>
              <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs font-extrabold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                Score 94
              </span>
            </div>
            <span className="mt-2 block text-xs font-bold text-gray-900 dark:text-white">
              $18,200 &bull; Enterprise
            </span>
            <div className="mt-3 flex items-center gap-1.5">
              <img
                src="/images/ai_feature_1.jpg"
                alt="Sofia D. avatar"
                className="h-5 w-5 rounded-full object-cover"
              />
              <span className="dark:text-gray-455 text-xs font-medium text-gray-500">Sofia D.</span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200/70 bg-white p-3.5 opacity-90 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-gray-400 uppercase dark:text-gray-500">
                Globex Inc
              </span>
              <span className="rounded-full bg-teal-100 px-1.5 py-0.5 text-xs font-extrabold text-teal-700 dark:bg-teal-950/30 dark:text-teal-700 dark:text-teal-400">
                Score 89
              </span>
            </div>
            <span className="mt-2 block text-xs font-bold text-gray-900 dark:text-white">
              $9,500 &bull; Pro Tier
            </span>
            <div className="mt-3 flex items-center gap-1.5">
              <img
                src="/images/ai_feature_2.jpg"
                alt="Marcus W. avatar"
                className="h-5 w-5 rounded-full object-cover"
              />
              <span className="dark:text-gray-455 text-xs font-medium text-gray-500">
                Marcus W.
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: In Proposal */}
        <div className="w-full space-y-3 md:w-auto">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold tracking-wider text-gray-500 uppercase dark:text-gray-400">
              Proposal
            </span>
            <span className="dark:text-gray-455 rounded-md bg-gray-200/65 px-1.5 py-0.5 text-xs font-bold text-gray-600 dark:bg-gray-800">
              1
            </span>
          </div>
          <div className="rounded-xl border border-gray-200/70 bg-white p-3.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-gray-400 uppercase dark:text-gray-500">
                Initech Labs
              </span>
              <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs font-extrabold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                Score 98
              </span>
            </div>
            <span className="mt-2 block text-xs font-bold text-gray-900 dark:text-white">
              $45,000 &bull; Custom SLA
            </span>
            <div className="mt-3 flex items-center gap-1.5">
              <img
                src="/images/ai_feature_3.jpg"
                alt="Sarah M. avatar"
                className="h-5 w-5 rounded-full object-cover"
              />
              <span className="dark:text-gray-455 text-xs font-medium text-gray-500">Sarah M.</span>
            </div>
            <div className="mt-2.5 rounded-lg bg-teal-50/70 p-2 text-xs font-semibold text-teal-700 dark:bg-teal-950/30 dark:text-teal-700 dark:text-teal-400">
              âš¡ Autopilot: Send contract template
            </div>
          </div>
        </div>

        {/* Column 3: Won */}
        <div className="w-full space-y-3 md:w-auto">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold tracking-wider text-gray-500 uppercase dark:text-gray-400">
              Won
            </span>
            <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
              1
            </span>
          </div>
          <div className="rounded-xl border border-gray-200/70 bg-white p-3.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-gray-400 uppercase dark:text-gray-500">
                Hooli Corp
              </span>
              <span className="text-xs font-bold text-emerald-500">Completed</span>
            </div>
            <span className="mt-2 block text-xs font-bold text-gray-950 dark:text-white">
              $120,000 &bull; Annual
            </span>
            <div className="mt-3 flex items-center gap-1.5">
              <img
                src="/images/ai_feature_4.jpg"
                alt="James O. avatar"
                className="h-5 w-5 rounded-full object-cover"
              />
              <span className="dark:text-gray-455 text-xs font-medium text-gray-500">James O.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomeCRM = () => {
  const [selectedPlan, setSelectedPlan] = useState('Sales Team');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--orbit-base)] text-[var(--orbit-text-primary)] selection:bg-teal-500/30">
      <Navbar />

      {/* -- HERO -- */}
      <section
        id="main-content"
        className="relative overflow-hidden px-6 pt-40 pb-20 dark:bg-transparent"
      >
        <div className="bg-vertical-grid" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-teal-500/5 blur-[120px]" />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Hero Text */}
          <div className="text-left">
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-teal-200/50 bg-teal-50 px-3 py-1 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
              <Target size={12} /> AI-Powered Sales CRM
            </span>
            <h1 className="mb-6 font-sans text-5xl leading-none font-extrabold tracking-tight text-gray-900 md:text-6xl dark:text-white">
              Close More Deals
              <br />
              <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
                With AI Pipelines
              </span>
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed font-medium text-gray-500 md:text-lg dark:text-gray-500">
              OrbitFlow's CRM template accelerates deal velocity. Automate email sequences, predict
              lead scores, and monitor sales telemetry in real time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/auth"
                className="cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,165,164,0.25)]"
              >
                Launch CRM Free
              </Link>
              <Link
                to="/schedule-demo"
                className="cursor-pointer rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-xs font-bold tracking-wider text-gray-800 uppercase transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-800"
              >
                Request Demo
              </Link>
            </div>
          </div>

          {/* Right Column: Premium Custom Adapted SVG panel */}
          <div className="relative z-10 flex w-full flex-col gap-6">
            {/* Custom Adapted CRM Hero Panel Display (Loads Instantly) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-[2.5rem] border border-gray-200/80 bg-white p-6 shadow-[0_12px_48px_rgba(0,0,0,0.04)] dark:border-gray-800 dark:bg-[#111827] dark:shadow-[0_12px_48px_rgba(0,0,0,0.35)]"
            >
              <CRMHeroPanelVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Showcase */}
      <DashboardShowcase defaultPreset="crm" />

      {/* -- FEATURES GRID -- */}
      <section className="border-t border-gray-100 bg-transparent px-6 py-24 dark:border-gray-800 dark:bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-16 max-w-2xl">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Capabilities
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Your Sales Pipeline Accelerated
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            {[
              {
                title: 'Visual Pipeline Board',
                desc: 'Drag and drop accounts between deal stages. Sync pipeline adjustments automatically with sales reps.',
              },
              {
                title: 'AI Lead Scoring',
                desc: 'Prioritize accounts based on engagement history, company profiles, and custom predictive criteria.',
              },
              {
                title: 'Revenue Forecasting',
                desc: 'Forecast quarterly earnings dynamically based on close probability scoring algorithms.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="elite-card rounded-3xl p-8 transition-all hover:scale-[1.01] dark:hover:border-[var(--orbit-accent-primary)]/50"
              >
                <h3 className="mb-2 text-2xl font-black text-gray-900 lg:text-lg dark:text-white">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed font-normal text-gray-500 dark:text-gray-500">
                  {f.desc}
                </p>
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
              Workflow
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Start Closing Deals in Minutes
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
              Plans That Scale With You
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
                    <div className="bg-teal-55 absolute top-4 right-4 flex items-center gap-1 rounded-full border border-teal-200/50 px-2.5 py-0.5 text-xs font-bold tracking-wider text-teal-600 uppercase">
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
              Got Questions?
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="elite-card cursor-pointer overflow-hidden rounded-2xl transition-all hover:border-[var(--orbit-accent-primary)]/40 hover:shadow-[0_0_20px_rgba(14,165,164,0.08)]"
              >
                <div
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={14} className="shrink-0 text-gray-400" />
                  ) : (
                    <ChevronDown size={14} className="shrink-0 text-gray-400" />
                  )}
                </div>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-left">
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
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
            Ready to Supercharge Your Sales?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-gray-500 dark:text-gray-500">
            Deploy your sales pipeline board with custom automation flows, email sequences, and lead
            telemetry in minutes.
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
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-xs font-bold tracking-wider text-gray-800 uppercase transition-all hover:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
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

export default HomeCRM;
