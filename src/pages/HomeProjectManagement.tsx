import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  ArrowRight,
  FolderKanban,
  CheckSquare,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';
import { Link } from 'react-router-dom';
import { DashboardShowcase } from '../components/vertex/DashboardShowcase';

const tasks = [
  {
    id: '1',
    title: 'Refactor core visual node canvas',
    tag: 'Engineering',
    status: 'In Progress',
    color:
      'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30',
  },
  {
    id: '2',
    title: 'Design pricing comparison table',
    tag: 'Design',
    status: 'Completed',
    color:
      'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30',
  },
  {
    id: '3',
    title: 'Write technical documentation guide',
    tag: 'Product',
    status: 'To Do',
    color:
      'text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
  },
];

const steps = [
  {
    num: '01',
    title: 'Create a Project',
    desc: 'Define task lists, sprint objectives, customize workflow stages, and import backlog lists from CSV.',
  },
  {
    num: '02',
    title: 'Add Your Team',
    desc: 'Invite members, set role-based access permissions, and assign tasks directly on the Kanban board.',
  },
  {
    num: '03',
    title: 'Start Delivering',
    desc: 'Track sprint velocity charts, generate project reports, and trigger automated Slack channel reports.',
  },
];

const plans = [
  {
    name: 'Starter Team',
    price: 9,
    desc: 'For small workspace collaboration.',
    features: [
      '5 Active Projects',
      '10 Team Members',
      'Kanban & Timeline views',
      '1GB file storage',
    ],
  },
  {
    name: 'Professional Team',
    price: 29,
    desc: 'For scaling engineering projects.',
    features: [
      'Unlimited Projects',
      '50 Team Members',
      'AI task summary node',
      'Time tracking logs',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    price: 149,
    desc: 'Dedicated instance for organizations.',
    features: [
      'Unlimited Projects',
      'Unlimited Members',
      'Custom integrations',
      'Dedicated database clusters',
      'SOC2 compliance auditing',
    ],
  },
];

const faqs = [
  {
    q: 'Can I migrate from other project management tools?',
    a: 'Yes, you can import files directly from Jira, Trello, Asana, and Monday.com in one click.',
  },
  {
    q: 'How does the AI task assistant work?',
    a: 'The AI agent reads task descriptions, suggests sub-tasks, highlights dependencies, and summarizes thread messages.',
  },
  {
    q: 'Is there a limit on team members?',
    a: 'Starter and Pro plans have caps on members, while Enterprise plans allow unlimited seats with customized permissions.',
  },
];

export const HomeProjectManagement = () => {
  const [selectedPlan, setSelectedPlan] = useState('Professional Team');
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
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-teal-200/50 bg-teal-50 px-3 py-1 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
              <FolderKanban size={12} /> Collaborative Workspace
            </span>
            <h1 className="mb-6 font-sans text-5xl leading-none font-extrabold tracking-tight text-gray-900 md:text-7xl dark:text-white">
              Manage Projects
              <br />
              <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
                With Clarity & Speed
              </span>
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed font-medium text-gray-500 md:text-lg dark:text-gray-500">
              OrbitFlow's project management template streamlines team execution. Track timelines,
              assign visual tasks, and check workload metrics instantly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/auth"
                className="rounded-xl bg-[var(--orbit-accent-primary)] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,165,164,0.25)]"
              >
                Start Managing Free
              </Link>
              <Link
                to="/schedule-demo"
                className="rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-xs font-bold tracking-wider text-gray-800 uppercase transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-800"
              >
                Request Consultation
              </Link>
            </div>
          </div>

          {/* Kanban / Tasks Board Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full space-y-4 rounded-[2.5rem] border-2 border-gray-200 bg-white p-6 shadow-[0_12px_48px_rgba(0,0,0,0.06)] dark:border-gray-800 dark:bg-[#111827]"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <CheckSquare size={16} className="text-[var(--orbit-accent-primary)]" />
                <span className="text-xs font-extrabold text-gray-900 dark:text-white">
                  Sprint Backlog
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs tracking-wider text-gray-400 uppercase dark:text-gray-500">
                <Clock size={11} /> 12 days left
              </div>
            </div>

            {/* Task list items */}
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="max-w-[70%]">
                    <h4 className="text-xs leading-tight font-extrabold text-gray-900 dark:text-white">
                      {task.title}
                    </h4>
                    <span className="mt-1.5 block text-xs font-bold text-gray-400 dark:text-gray-500">
                      {task.tag}
                    </span>
                  </div>
                  <span
                    className={`rounded-lg border px-2 py-0.5 text-xs font-bold tracking-wider uppercase ${task.color}`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Showcase */}
      <DashboardShowcase defaultPreset="project" />

      {/* -- FEATURES GRID -- */}
      <section className="border-t border-gray-100 bg-transparent px-6 py-24 dark:border-gray-800 dark:bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-16 max-w-2xl">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Capabilities
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Everything Your Team Needs
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            {[
              {
                title: 'Kanban Boards',
                desc: 'Organize visual workflows with custom columns. Limit work-in-progress to avoid team burnout.',
              },
              {
                title: 'Timeline Charts',
                desc: 'Map dependencies, track key milestone targets, and manage project schedules in calendar views.',
              },
              {
                title: 'Workload Telemetry',
                desc: 'Audit task loads per developer to distribute operations and handle deliverables efficiently.',
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
              Get Organized in 3 Simple Steps
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
              Plans for Every Team Size
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
            Ready to Deliver Projects On Time?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-gray-500 dark:text-gray-500">
            Start managing team tasks, building timelines, and reviewing task loads per rep in
            minutes.
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

export default HomeProjectManagement;
