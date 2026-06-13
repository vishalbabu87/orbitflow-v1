import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Check, ArrowRight, PieChart, ChevronDown, ChevronUp } from 'lucide-react';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';
import { Link } from 'react-router-dom';
import { DashboardShowcase } from '../components/vertex/DashboardShowcase';

const steps = [
  {
    num: '01',
    title: 'Connect Your Data',
    desc: 'Link your database, data warehouse, or cloud endpoints using our secure API integrations in seconds.',
  },
  {
    num: '02',
    title: 'Query in Plain English',
    desc: 'Use our conversational AI interface to write complex queries, compile retention cohorts, and create telemetry alerts.',
  },
  {
    num: '03',
    title: 'Build Dashboards',
    desc: 'Drag and drop analytics widgets, customize charts, and deploy live tracking streams to your workspace.',
  },
];

const plans = [
  {
    name: 'Explorer',
    price: 29,
    desc: 'For individual analysts.',
    features: [
      '3 Connected Data Sources',
      '100 Queries / day',
      'Standard charts library',
      'Weekly email updates',
    ],
  },
  {
    name: 'Team Hub',
    price: 99,
    desc: 'For modern business units.',
    features: [
      '15 Connected Data Sources',
      'Unlimited queries',
      'Custom telemetry alerts',
      'Shared team dashboards',
      'Priority Slack support',
    ],
  },
  {
    name: 'Enterprise',
    price: 349,
    desc: 'Private clusters and custom compliance.',
    features: [
      'Unlimited Data Sources',
      'Unlimited queries',
      'Custom chart integrations',
      'SOC2 compliance auditing',
      'Dedicated success manager',
    ],
  },
];

const faqs = [
  {
    q: 'What data sources can I connect?',
    a: 'We support Postgres, MySQL, MongoDB, Snowflake, BigQuery, HubSpot, Google Sheets, and custom REST API endpoints.',
  },
  {
    q: 'How does the natural language query work?',
    a: "Our AI engine parses English sentences ('Show me new user signup cohorts from last week') and converts them into valid SQL or Mongo aggregates dynamically.",
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. All warehouse connection credentials are encrypted using AES-256 keys, and data query streams are encrypted end-to-end.',
  },
];

export const HomeAnalyticsPlatform = () => {
  const [selectedPlan, setSelectedPlan] = useState('Team Hub');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--orbit-base)] text-[var(--orbit-text-primary)] selection:bg-teal-500/30">
      <Navbar />

      {/* -- HERO -- */}
      <section id="main-content" className="relative overflow-hidden px-6 pt-40 pb-20 dark:bg-transparent">
        <div className="bg-vertical-grid" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-teal-500/5 blur-[120px]" />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-teal-200/50 bg-teal-50 px-3 py-1 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase dark:border-teal-900/30 dark:bg-teal-950/20">
              <BarChart3 size={12} /> Deep Data Analytics
            </span>
            <h1 className="mb-6 font-sans text-5xl leading-none font-extrabold tracking-tight text-gray-900 md:text-7xl dark:text-white">
              Understand Data
              <br />
              <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed font-medium text-gray-500 md:text-lg dark:text-gray-500">
              OrbitFlow's analytics template lets you visualize retention cohorts, ask questions in
              plain English, and build custom telemetry dashboards instantly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/auth"
                className="rounded-xl bg-[var(--orbit-accent-primary)] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,165,164,0.25)]"
              >
                Analyze Free Now
              </Link>
              <Link
                to="/schedule-demo"
                className="rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-xs font-bold tracking-wider text-gray-800 uppercase transition-all hover:border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
              >
                Schedule Walkthrough
              </Link>
            </div>
          </div>

          {/* Analytics Chart & Cohorts Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full space-y-6 rounded-[2.5rem] border-2 border-gray-200 bg-white p-8 shadow-[0_12px_48px_rgba(0,0,0,0.06)] dark:border-gray-800 dark:bg-[#111827]"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <PieChart size={16} className="text-[var(--orbit-accent-primary)]" />
                <span className="text-xs font-extrabold text-gray-900">
                  Weekly Performance Retention
                </span>
              </div>
              <span className="rounded border border-teal-200 bg-teal-50 px-2 py-0.5 text-xs font-bold text-[var(--orbit-accent-primary)]">
                Updated 2m ago
              </span>
            </div>

            {/* Custom mini charts */}
            <div className="space-y-3">
              {[
                {
                  label: 'Direct Referral Loop',
                  percent: 84,
                  color: 'bg-[var(--orbit-accent-primary)]',
                },
                { label: 'Search Engine Optimization', percent: 56, color: 'bg-teal-400' },
                { label: 'Campaign Email CTR', percent: 32, color: 'bg-violet-500' },
              ].map((chart) => (
                <div key={chart.label} className="text-xs">
                  <div className="mb-1 flex justify-between">
                    <span className="font-extrabold text-gray-800 dark:text-gray-200">
                      {chart.label}
                    </span>
                    <span className="font-black text-gray-950 dark:text-white">
                      {chart.percent}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full ${chart.color}`}
                      style={{ width: `${chart.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 text-center dark:border-gray-800">
              <div>
                <span className="block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Uptime
                </span>
                <span className="mt-1 block text-sm font-black text-gray-950 dark:text-white">
                  99.99%
                </span>
              </div>
              <div>
                <span className="block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Monthly Runs
                </span>
                <span className="mt-1 block text-sm font-black text-gray-950 dark:text-white">
                  150M
                </span>
              </div>
              <div>
                <span className="block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Response time
                </span>
                <span className="mt-1 block text-sm font-black text-gray-950 dark:text-white">
                  22ms
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Showcase */}
      <DashboardShowcase defaultPreset="analytics" />

      {/* -- FEATURES GRID -- */}
      <section className="border-t border-gray-100 bg-transparent px-6 py-24 dark:border-gray-800 dark:bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-16 max-w-2xl">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Capabilities
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Data Analytics That Help You Grow
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            {[
              {
                title: 'Real-Time Dashboards',
                desc: 'Build customized charts, telemetry graphs, and metrics tabs. View live updates with zero delay.',
              },
              {
                title: 'Cohort Analysis',
                desc: 'Analyze user behaviors over time. Segment databases by activation triggers and signup cohorts.',
              },
              {
                title: 'Custom Alert Triggers',
                desc: 'Notify team Slack channels automatically when metrics pass safety threshold values.',
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
              Simple and Powerful Data Access
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
              Invest in Smart Analytics
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
              Common Questions
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
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
            Start Making Data-Driven Decisions
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-gray-500 dark:text-gray-500">
            Deploy your data analytics tracking dashboard, configure metrics alerts, and map
            database loops in minutes.
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

export default HomeAnalyticsPlatform;
