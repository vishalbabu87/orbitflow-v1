import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight, Compass, Layout, ChevronDown, ChevronUp } from 'lucide-react';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';
import { Link } from 'react-router-dom';

const steps = [
  {
    num: '01',
    title: 'Discovery & Research',
    desc: 'We align on your product spec, target audience personas, technology parameters, and brand values.',
  },
  {
    num: '02',
    title: 'Prototyping & UX',
    desc: 'We design complete wireframes, high-fidelity interactive prototypes in Figma, and build core style tokens.',
  },
  {
    num: '03',
    title: 'Delivery & Code',
    desc: 'We deliver full source designs and write semantic frontend React/Next.js/TypeScript code ready for deployment.',
  },
];

const plans = [
  {
    name: 'Single Design Sprint',
    price: 4999,
    desc: 'For launching a single MVP project.',
    features: [
      'Full Figma source files',
      'UI/UX component design',
      'Landing page setup',
      '1 Round of revisions',
      'Delivery in 10 days',
    ],
  },
  {
    name: 'Product Retainer',
    price: 9999,
    desc: 'For companies needing ongoing support.',
    features: [
      'Dedicated designer & developer',
      'Unlimited sprint tasks',
      'Figma & React/Next.js code',
      'Daily Slack updates',
      'Weekly sync meetings',
    ],
  },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'MVP designs and landing pages are typically delivered in 2-3 weeks, while comprehensive software design retainers are structured in monthly sprints.',
  },
  {
    q: 'What is your pricing model?',
    a: 'We offer clear, fixed flat-rate sprint pricing for defined scopes, or monthly retainers for ongoing product iterations.',
  },
  {
    q: 'Do you provide backend developer support?',
    a: 'We focus on UI/UX design and frontend React/Next.js development, but we provide API integration schemas for your backend engineering team.',
  },
];

export const HomeAgency = () => {
  const [selectedPlan, setSelectedPlan] = useState('Product Retainer');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--orbit-base)] text-[var(--orbit-text-primary)] selection:bg-teal-500/30">
      <Navbar />

      {/* â”€â”€ HERO â”€â”€ */}
      <section
        id="main-content"
        className="relative overflow-hidden px-6 pt-40 pb-20 dark:bg-transparent"
      >
        <div className="bg-vertical-grid" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-teal-500/5 blur-[120px]" />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-left">
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-teal-200/50 bg-teal-50 px-3 py-1 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase dark:border-teal-900/30 dark:bg-teal-950/20">
              <Compass size={12} /> Digital Design Studio
            </span>
            <h1 className="mb-6 font-sans text-5xl leading-none font-extrabold tracking-tight text-gray-900 md:text-7xl dark:text-white">
              We Build Products
              <br />
              <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
                That People Love
              </span>
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed font-medium text-gray-500 md:text-lg dark:text-gray-500">
              We partner with seed-stage startups and enterprises to craft high-fidelity UI/UX
              design systems, performant code, and AI integrations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,165,164,0.25)]"
              >
                Start A Project
              </Link>
              <Link
                to="/team"
                className="dark:text-gray-250 cursor-pointer rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-xs font-bold tracking-wider text-gray-800 uppercase transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
              >
                Meet the Experts
              </Link>
            </div>
          </div>

          {/* Advanced Interactive Design Studio Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative flex w-full flex-col overflow-hidden rounded-[2.5rem] border border-gray-200/80 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.04),0_12px_24px_rgba(14,165,164,0.02)] md:p-8 dark:border-white/10 dark:bg-[#1A2333]/80 dark:backdrop-blur-xl dark:shadow-[0_24px_60px_rgba(0,0,0,0.6),0_12px_24px_rgba(14,165,164,0.15)]"
          >
            {/* Soft Ambient Spotlight Glow */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-[240px] w-[240px] rounded-full bg-gradient-to-br from-teal-500/20 to-[var(--orbit-accent-primary)]/0 blur-[60px] transition-transform duration-1000 group-hover:scale-110" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-[200px] w-[200px] rounded-full bg-gradient-to-br from-cyan-500/10 to-teal-500/0 blur-[60px]" />

            {/* Design Workspace Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 sm:h-8 sm:w-8 dark:border-teal-900/50 dark:bg-teal-950/40">
                  <Layout size={14} className="text-[var(--orbit-accent-primary)]" />
                </div>
                <div className="text-left">
                  <span className="block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-400">
                    Figma Canvas
                  </span>
                  <span className="text-xs leading-none font-extrabold text-gray-900 dark:text-white">
                    OrbitFlow Design Spec
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 dark:bg-[var(--orbit-accent-primary)]/20 dark:border-[var(--orbit-accent-primary)]/30">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--orbit-accent-primary)]" />
                <span className="text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
                  Sprint V2.4
                </span>
              </div>
            </div>

            {/* Simulated Live Canvas */}
            <div className="relative my-6 flex min-h-[280px] flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/50 bg-gray-50/50 p-4 md:min-h-[220px] dark:border-white/5 dark:bg-[#0B0F19]/80 dark:shadow-inner">
              {/* Grid backdrop */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70 dark:bg-[radial-gradient(#374151_1px,transparent_1px)] dark:opacity-40" />

              {/* Top Row: Floating Typography Selection and Active Avatars */}
              <div className="relative z-10 flex w-full items-start justify-between">
                {/* Active Tool selection */}
                <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-white/90 px-2.5 py-1.5 shadow-sm dark:border-white/10 dark:bg-[#1E293B]/90 dark:backdrop-blur-md">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-100">
                    Font: Outfit
                  </span>
                  <ChevronDown size={10} className="text-gray-400 dark:text-gray-300" />
                </div>

                {/* User Beads */}
                <div className="flex -space-x-2">
                  {[
                    '/images/ai_office_1.jpg',
                    '/images/ai_office_2.jpg',
                    '/images/ai_bg_1.jpg',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      width={20}
                      height={20}
                      className="h-5 w-5 rounded-full border border-white object-cover shadow-sm dark:border-[#070A0F]"
                      alt="Collaborator"
                    />
                  ))}
                </div>
              </div>

              {/* Center: Beautiful Glass Card Component Node */}
              <div className="relative z-10 mx-auto my-auto w-full max-w-[260px] rounded-xl border-2 border-[var(--orbit-accent-primary)]/40 bg-white/80 p-4 shadow-lg backdrop-blur-md dark:bg-[#1E293B]/85 dark:border-[var(--orbit-accent-primary)]/60">
                {/* Dimension Coordinates box */}
                <div className="absolute -top-3.5 -left-3.5 hidden rounded-md bg-[var(--orbit-accent-primary)] px-2 py-0.5 font-mono text-xs font-bold text-white md:block">
                  W: 320 H: 180
                </div>
                <div className="absolute -right-3.5 -bottom-3.5 hidden rounded-md bg-[var(--orbit-accent-primary)] px-2 py-0.5 font-mono text-xs font-bold text-white md:block">
                  X: 480 Y: 240
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--orbit-accent-primary)] to-[#06B6D4] text-white">
                    <Sparkles size={18} />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <h5 className="truncate text-xs font-black text-gray-900 dark:text-white">
                      Smart Trigger Component
                    </h5>
                    <span className="mt-0.5 block truncate text-xs text-gray-500 dark:text-gray-400">
                      Auto-compiled Next.js button element
                    </span>
                  </div>
                </div>

                {/* Component code visual outline */}
                <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3 dark:border-white/10">
                  <div className="h-1.5 w-1/3 rounded bg-gray-200 dark:bg-gray-600" />
                  <div className="h-1.5 w-1/4 rounded bg-[var(--orbit-accent-primary)]/30" />
                  <div className="h-1.5 w-1/5 rounded bg-gray-200 dark:bg-gray-600" />
                </div>
              </div>

              {/* Bottom: Simulated Multi-user active pointers and interactive palette */}
              <div className="relative z-10 flex w-full items-end justify-between">
                {/* Floating active designing cursor */}
                <div className="flex translate-x-4 flex-col items-start">
                  {/* Cursor Arrow SVG */}
                  <svg
                    className="h-4 w-4 -scale-x-100 text-[var(--orbit-accent-primary)]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4 4l12 12h-6l-6 6z" />
                  </svg>
                  <div className="-mt-1 ml-2 flex items-center gap-1 rounded-md bg-[var(--orbit-accent-primary)] px-2 py-1 font-mono text-xs font-bold text-white shadow-md">
                    <span>Sofia.d</span>
                  </div>
                </div>

                {/* Color swatches palette selector */}
                <div className="flex gap-1.5 rounded-xl border border-gray-100 bg-white/90 p-1.5 shadow-sm dark:border-white/10 dark:bg-[#1E293B]/90 dark:backdrop-blur-md">
                  {['var(--orbit-accent-primary)', '#06B6D4', '#F43F5E', '#10B981'].map(
                    (color, i) => (
                      <div
                        key={i}
                        className="h-3.5 w-3.5 cursor-pointer rounded-full border border-white/50 shadow-sm transition-transform hover:scale-115 dark:border-white/20"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Design Spec Summary metadata */}
            <div className="relative z-10 flex items-center justify-between text-xs">
              <div className="text-left">
                <p className="leading-relaxed font-extrabold text-gray-800 dark:text-gray-200">
                  Delivered in Design Sprint
                </p>
                <p className="leading-relaxed text-xs text-gray-500 dark:text-gray-500">
                  Includes responsive React frontend code
                </p>
              </div>
              <Link
                to="/schedule-demo"
                className="inline-flex cursor-pointer items-center gap-1.5 font-bold text-[var(--orbit-accent-primary)] transition-colors hover:text-[#0C8F8E]"
              >
                View design specs <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Creative Showcase Board Section */}
      <section className="relative overflow-hidden bg-transparent py-24 transition-colors duration-305 dark:bg-transparent">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--orbit-accent-primary)]/22 bg-[var(--orbit-accent-primary)]/8 px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--orbit-accent-primary)]" />
              <span className="font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
                Creative Workspace
              </span>
            </div>
            <h2 className="mb-4 font-sans text-4xl leading-tight font-extrabold text-gray-900 md:text-6xl dark:text-white">
              Collaborative design <br />
              sprints{' '}
              <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
                In Action
              </span>
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 md:text-base dark:text-gray-500">
              We manage our active design pipelines, high-fidelity portfolios, and client feedback
              cycles in a single, transparent workspace.
            </p>
          </div>

          {/* Grid Container */}
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Left Panel: Active Design Sprints Board */}
            <div className="flex flex-col justify-between rounded-[2.5rem] border-2 border-gray-200 bg-white p-8 text-left shadow-[0_12px_48px_rgba(0,0,0,0.04)] lg:col-span-6 dark:border-gray-800 dark:bg-[#111827]">
              <div>
                <div className="dark:border-gray-850 mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Layout size={16} className="text-[var(--orbit-accent-primary)]" />
                    <h3 className="text-sm font-black tracking-wider text-gray-900 uppercase dark:text-white">
                      Sprint Board
                    </h3>
                  </div>
                  <span className="rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
                    Sprint 12
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      task: 'Brand Identity Guidelines',
                      assignee: 'Sofia D.',
                      state: 'Approved',
                      color: 'bg-emerald-500',
                      labelColor:
                        'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
                    },
                    {
                      task: 'SaaS Mobile App UI Kit',
                      assignee: 'Sarah M.',
                      state: 'In Review',
                      color: 'bg-amber-500',
                      labelColor:
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
                    },
                    {
                      task: 'Figma Typography Tokens Sync',
                      assignee: 'Marcus W.',
                      state: 'In Progress',
                      color: 'bg-[var(--orbit-accent-primary)]',
                      labelColor:
                        'bg-teal-500/10 text-teal-600 dark:text-teal-700 dark:text-teal-400 border-teal-500/20',
                    },
                    {
                      task: 'Landing Page Frontend Code',
                      assignee: 'Alex R.',
                      state: 'Planned',
                      color: 'bg-gray-400',
                      labelColor:
                        'bg-gray-150 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="dark:border-gray-850 flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all hover:border-[var(--orbit-accent-primary)]/30 dark:bg-gray-900/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${item.color} shrink-0`} />
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                            {item.task}
                          </h4>
                          <p className="leading-relaxed mt-0.5 text-xs text-gray-500">
                            Assigned to {item.assignee}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`rounded border px-2 py-0.5 font-mono text-xs font-bold ${item.labelColor}`}
                      >
                        {item.state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-teal-500/10 bg-teal-500/5 p-4">
                <div>
                  <span className="dark:text-gray-550 block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Operational Progress
                  </span>
                  <h4 className="mt-1 text-xs font-black text-gray-900 dark:text-white">
                    Product MVP Delivery
                  </h4>
                </div>
                <span className="rounded-xl border border-teal-500/20 bg-white px-3 py-1 text-xs font-black text-[var(--orbit-accent-primary)] dark:bg-gray-900">
                  92% complete
                </span>
              </div>
            </div>

            {/* Right Panel: Collaborative Preview & Comments */}
            <div className="flex flex-col justify-between rounded-[2.5rem] border-2 border-gray-200 bg-white p-8 text-left shadow-[0_12px_48px_rgba(0,0,0,0.04)] lg:col-span-6 dark:border-gray-800 dark:bg-[#111827]">
              <div>
                <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Compass size={16} className="text-[var(--orbit-accent-primary)]" />
                    <h3 className="text-sm font-black tracking-wider text-gray-900 uppercase dark:text-white">
                      Live Workspace Feedback
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="animate-pulse font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
                      Sync active
                    </span>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  </div>
                </div>

                {/* Simulated Collaboration Feed */}
                <div className="space-y-4">
                  {[
                    {
                      author: 'Sarah Delgado',
                      role: 'VP of Product',
                      text: 'The primary brand gradient is pristine! Love the subtle HSL teal accents on the dashboard layout.',
                      avatar:
                        '/images/ai_bg_2.jpg',
                    },
                    {
                      author: 'Marcus Webb',
                      role: 'Lead Architect',
                      text: 'Outstanding design details. Figma design tokens are fully compiled and ready to be integrated into Next.js/Tailwind components.',
                      avatar:
                        '/images/ai_feature_1.jpg',
                    },
                  ].map((comment, index) => (
                    <div
                      key={index}
                      className="dark:border-gray-850 flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:bg-gray-900/30"
                    >
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        width={32}
                        height={32}
                        className="h-11 w-11 shrink-0 rounded-full border border-white/20 object-cover shadow-sm sm:h-8 sm:w-8 dark:border-gray-800"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-1.5">
                          <h5 className="text-xs font-bold text-gray-900 dark:text-white">
                            {comment.author}
                          </h5>
                          <span className="text-gray-405 font-mono text-xs font-bold tracking-wider uppercase">
                            {comment.role}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-500">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Token Palette Preview */}
              <div className="mt-6">
                <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Syncing Style Tokens
                </span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    {
                      label: 'HSL Teal',
                      value: '#0EA5A4',
                      gradient: 'from-[var(--orbit-accent-primary)] to-[#0A8786]',
                    },
                    {
                      label: 'HSL Cyan',
                      value: '#06B6D4',
                      gradient: 'from-[#06B6D4] to-[#0891B2]',
                    },
                    {
                      label: 'Slate Deep',
                      value: '#0B0F14',
                      gradient: 'from-[#0B0F14] to-[#0D131A]',
                    },
                    {
                      label: 'Glow Accent',
                      value: '#22D3EE',
                      gradient: 'from-[#22D3EE] to-[#06B6D4]',
                    },
                  ].map((token, i) => (
                    <div
                      key={i}
                      className="border-gray-150 dark:border-gray-850 flex flex-col items-center rounded-xl border bg-gray-50 p-2.5 text-center dark:bg-gray-900/40"
                    >
                      <div
                        className={`h-11 w-11 rounded-lg bg-gradient-to-br sm:h-8 sm:w-8 ${token.gradient} mb-1.5 border border-white/10 shadow-sm`}
                      />
                      <span className="text-gray-955 block w-full truncate text-xs font-bold dark:text-white">
                        {token.label}
                      </span>
                      <span className="mt-0.5 block font-mono text-xs font-bold text-gray-400 dark:text-gray-500">
                        {token.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ SERVICES â”€â”€ */}
      <section className="dark:border-gray-850 border-t border-gray-100 bg-transparent px-6 py-24 dark:bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-16 max-w-2xl">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Our Services
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              What We Do Best
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            {[
              {
                title: 'UI/UX Design',
                desc: 'Crafting beautiful interfaces, user journey mapping, high-fidelity prototypes, and comprehensive design systems.',
              },
              {
                title: 'Product Development',
                desc: 'Writing semantic React, Next.js, and TypeScript code, deploying serverless APIs, and database structures.',
              },
              {
                title: 'Brand Identity',
                desc: 'Rebranding packages, logo variations design, SVG animations, guidelines, and corporate styling assets.',
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

      {/* â”€â”€ HOW IT WORKS â”€â”€ */}
      <section className="dark:border-gray-850 border-t border-gray-100 bg-transparent px-6 py-24 dark:bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-16 max-w-2xl">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Process
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Working With Us
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

      {/* â”€â”€ PRICING â”€â”€ */}
      <section className="dark:border-gray-850 border-t border-gray-100 bg-transparent px-6 py-24 dark:bg-transparent">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-16 max-w-2xl">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Pricing
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Flat-Rate Product Sprints
            </h2>
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-1 items-stretch gap-8 md:grid-cols-2">
            {plans.map((p) => {
              const isSelected = p.name === selectedPlan; // Highlight second card ( retainer )
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
                      <span className="font-mono text-xs text-gray-400">
                        {p.name.includes('Sprint') ? '/project' : '/mo'}
                      </span>
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
                    to="/contact"
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

      {/* â”€â”€ FAQ â”€â”€ */}
      <section className="dark:border-gray-850 border-y border-gray-100 bg-transparent px-6 py-24 dark:bg-transparent">
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

      {/* â”€â”€ BOTTOM CTA â”€â”€ */}
      <section className="relative overflow-hidden bg-transparent px-6 py-24 dark:bg-transparent">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
            Have a Product Idea in Mind?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-gray-500 dark:text-gray-500">
            Tell us about your startup, design files parameters, and target timeline. We will help
            you draft a roadmap.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/contact"
              className="cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,165,164,0.2)]"
            >
              Start A Conversation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeAgency;
