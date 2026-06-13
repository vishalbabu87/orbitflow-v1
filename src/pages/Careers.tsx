import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';
import {
  Briefcase,
  MapPin,
  Zap,
  Clock,
  Send,
  Check,
  Globe,
  DollarSign,
  BookOpen,
  Heart,
  Monitor,
  Coffee,
  ArrowRight,
  X,
  Bookmark,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const deptFilters = ['All', 'Engineering', 'Product', 'Design', 'Marketing', 'Operations'];

const positions = [
  {
    title: 'Senior Frontend Engineer',
    dept: 'Engineering',
    loc: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    level: 'Senior',
    salary: '$160k - $200k + Equity',
    desc: "Own the visual canvas, node editor, and real-time collaboration layer. You'll work closely with design and build performant React interfaces that millions of workflows run through.",
    requirements: [
      '5+ years of React experience',
      'Deep understanding of Canvas API/WebGL',
      'Experience building complex UI architectures',
      'Strong TypeScript skills',
    ],
    niceToHave: [
      'Experience with CRDTs',
      'Open source contributions',
      'Background in design systems',
    ],
    skills: ['React', 'TypeScript', 'Canvas API', 'WebSockets'],
  },
  {
    title: 'Senior AI Research Engineer',
    dept: 'Engineering',
    loc: 'Remote (Worldwide)',
    type: 'Full-time',
    level: 'Senior',
    salary: '$180k - $240k + Equity',
    desc: "Design and productionize the AI reasoning nodes at the core of OrbitFlow's copilot layer. Fine-tune context models, build evaluation pipelines, and scale inference.",
    requirements: [
      'PhD or 4+ years applied AI experience',
      'Expertise in LLM fine-tuning',
      'Experience deploying PyTorch models to production',
      'Strong Python backend engineering',
    ],
    niceToHave: ['Published papers in NLP', 'Experience with vLLM/TGI', 'CUDA optimization skills'],
    skills: ['Python', 'PyTorch', 'LLM Fine-tuning', 'Inference'],
  },
  {
    title: 'Growth Product Manager',
    dept: 'Product',
    loc: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Mid-Senior',
    salary: '$140k - $170k + Equity',
    desc: 'Own the full funnel from first visit to power user. Run experiments, analyze cohorts, and partner with engineering to ship features that drive activation and retention.',
    requirements: [
      '3+ years in growth PM roles',
      'Strong SQL and analytics skills',
      'Experience running A/B tests at scale',
      'User psychology intuition',
    ],
    niceToHave: [
      'B2B SaaS experience',
      'Basic coding skills for scraping/prototyping',
      'Marketing background',
    ],
    skills: ['Analytics', 'A/B Testing', 'SQL', 'Roadmapping'],
  },
  {
    title: 'Developer Relations Lead',
    dept: 'Marketing',
    loc: 'Remote (Worldwide)',
    type: 'Full-time',
    level: 'Senior',
    salary: '$150k - $180k + Equity',
    desc: "Build OrbitFlow's developer community. Write guides, run live workshops, speak at conferences, and make OrbitFlow the automation tool every developer recommends.",
    requirements: [
      'Active developer presence/following',
      'Excellent technical writing',
      'Experience giving conference talks',
      'Empathy for developer workflows',
    ],
    niceToHave: [
      'Experience building developer tools',
      'Twitch/YouTube streaming experience',
      'Go/TypeScript knowledge',
    ],
    skills: ['Technical Writing', 'API Design', 'Community', 'Public Speaking'],
  },
  {
    title: 'Product Designer â€” Workflows',
    dept: 'Design',
    loc: 'London, UK (Hybrid)',
    type: 'Full-time',
    level: 'Mid-Senior',
    salary: 'Â£90k - Â£120k + Equity',
    desc: "Design the next generation of our visual workflow builder. You'll craft interactions that make complex orchestration feel simple and intuitive for every user.",
    requirements: [
      'Strong portfolio of B2B/SaaS web apps',
      'Expertise in Figma',
      'Experience designing complex node-based UIs',
      'Systems thinking',
    ],
    niceToHave: [
      'CSS/Framer Motion prototyping',
      'Experience conducting user research',
      'Illustration skills',
    ],
    skills: ['Figma', 'Prototyping', 'Motion Design', 'Design Systems'],
  },
  {
    title: 'Backend Engineer â€” Execution Engine',
    dept: 'Engineering',
    loc: 'Remote (Worldwide)',
    type: 'Full-time',
    level: 'Senior',
    salary: '$160k - $210k + Equity',
    desc: "Scale OrbitFlow's distributed execution engine to handle billions of workflow events monthly. Work with Go, Kubernetes, and custom scheduling algorithms.",
    requirements: [
      '5+ years of Go or Rust experience',
      'Deep knowledge of distributed systems',
      'Experience with Kubernetes at scale',
      'PostgreSQL optimization skills',
    ],
    niceToHave: [
      'Experience writing schedulers',
      'Knowledge of Temporal or Celery',
      'Open source backend contributions',
    ],
    skills: ['Go', 'Kubernetes', 'Distributed Systems', 'gRPC'],
  },
];

const perks = [
  {
    icon: Globe,
    title: 'Remote-first',
    desc: 'Work from anywhere. We have team members in 11 countries.',
  },
  {
    icon: DollarSign,
    title: 'Competitive Equity',
    desc: 'Meaningful equity in a Series A company growing fast.',
  },
  {
    icon: Heart,
    title: 'Full Health Coverage',
    desc: 'Medical, dental, and vision for you and your dependents.',
  },
  {
    icon: BookOpen,
    title: '$2K Learning Budget',
    desc: 'Courses, books, conferences â€” whatever helps you grow.',
  },
  {
    icon: Clock,
    title: 'Async by Default',
    desc: 'Deep work over endless meetings. Calendar is yours to protect.',
  },
  {
    icon: Monitor,
    title: 'Premium Setup',
    desc: 'Latest MacBook Pro, 4K monitor, and $500 peripherals budget.',
  },
  {
    icon: Coffee,
    title: 'Team Offsites',
    desc: 'Twice yearly whole-team retreats in amazing locations.',
  },
  {
    icon: Zap,
    title: 'Calm Pace',
    desc: 'We sprint smart, not hard. Sustainable output beats burnout.',
  },
];

const values = [
  {
    label: '01 â€” Ownership',
    text: 'Every person on the team has a clear domain they own. We trust each other to make decisions without waiting for permission.',
  },
  {
    label: '02 â€” Craft',
    text: 'We take pride in the details â€” a well-written commit message, a perfectly timed animation, a test suite that actually covers the edge cases.',
  },
  {
    label: '03 â€” Transparency',
    text: 'All decisions, metrics, and roadmaps are visible to the whole team. No information silos, no hidden strategies.',
  },
];

export const Careers = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<(typeof positions)[0] | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', link: '', note: '' });
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('orbitflow_saved_jobs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('orbitflow_saved_jobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  const toggleSaveJob = (jobTitle: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobTitle) ? prev.filter((t) => t !== jobTitle) : [...prev, jobTitle]
    );
  };

  const filtered =
    activeFilter === 'All' ? positions : positions.filter((p) => p.dept === activeFilter);

  const ROLES_PER_PAGE = 4;
  const totalPages = Math.ceil(filtered.length / ROLES_PER_PAGE);
  const displayedRoles = filtered.slice(
    (currentPage - 1) * ROLES_PER_PAGE,
    currentPage * ROLES_PER_PAGE
  );

  const submitApp = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedJob(null);
      setIsApplying(false);
      setFormData({ name: '', email: '', link: '', note: '' });
    }, 4000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-gray-900 transition-colors duration-300 selection:bg-teal-500/30 dark:bg-[#0B0F19] dark:text-gray-100">
      <Navbar />
      <div className="h-20" />

      {/* â”€â”€ HERO HEADER â”€â”€ */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-transparent py-24 dark:border-gray-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="pointer-events-none absolute top-[-20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)]/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[300px] w-[500px] rounded-full bg-[#06B6D4]/15 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-6 text-center">
          <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-full border border-[var(--orbit-accent-primary)]/30 bg-[var(--orbit-accent-primary)]/10 px-4 py-1.5 shadow-[0_0_15px_rgba(14,165,164,0.15)]">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--orbit-accent-primary)] uppercase">
              Join Our Mission
            </span>
          </div>
          <h1 className="text-5xl leading-[1.05] font-extrabold tracking-tight text-gray-900 md:text-7xl dark:text-white">
            Help Us Automate{' '}
            <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(14,165,164,0.4)]">
              The Future
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed font-light tracking-wide text-gray-500 md:text-lg">
            We are looking for creative thinkers, expert craftsmen, and continuous learners who want
            to build the standard framework for distributed automation.
          </p>
        </div>
      </section>

      {/* â”€â”€ VALUES SECTION â”€â”€ */}
      <section className="bg-white px-6 py-20 transition-colors duration-300 dark:bg-[#0B0F19]">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center sm:text-left">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Our Core Beliefs
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              How We Work Together
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.label}
                className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 transition-colors duration-300 dark:border-gray-800 dark:bg-[#111827]/30"
              >
                <span className="mb-6 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
                  {v.label}
                </span>
                <p className="text-sm leading-relaxed font-light text-gray-650 dark:text-gray-300">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ PERKS SECTION â”€â”€ */}
      <section className="border-t border-b border-gray-100 bg-gray-50/30 px-6 py-20 transition-colors duration-300 dark:border-gray-800 dark:bg-[#111827]/10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center sm:text-left">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Benefits
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Life at OrbitFlow
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, idx) => (
              <div
                key={idx}
                className="elite-card flex flex-col items-center rounded-2xl p-6 text-center"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--orbit-accent-primary)]/10 text-[var(--orbit-accent-primary)] dark:bg-teal-950/40 dark:text-teal-700 dark:text-teal-400">
                  <p.icon size={18} />
                </div>
                <h4 className="mb-2 text-sm font-extrabold text-gray-900 dark:text-white">
                  {p.title}
                </h4>
                <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-500">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ OPEN POSITIONS â”€â”€ */}
      <section className="bg-white px-6 py-20 transition-colors duration-300 dark:bg-[#0B0F19]">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex flex-col items-center justify-between gap-6 border-b border-gray-100 pb-8 sm:flex-row dark:border-gray-800">
            <div className="text-center sm:text-left">
              <span className="mb-2 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
                Find Your Role
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Open Positions
              </h2>
            </div>
            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {deptFilters.map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => {
                    setActiveFilter(f);
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                    activeFilter === f
                      ? 'border-[var(--orbit-accent-primary)] bg-[var(--orbit-accent-primary)] text-white'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {displayedRoles.map((pos, idx) => (
                <motion.div
                  key={pos.title}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: idx * 0.05 }}
                  className="elite-card overflow-hidden rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {/* Job header */}
                  <div
                    className="flex cursor-pointer flex-col justify-between gap-4 p-6 md:flex-row md:items-center"
                    onClick={() => {
                      setSelectedJob(pos);
                      setIsApplying(false);
                    }}
                  >
                    <div className="text-left">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <span className="rounded-md border border-teal-200/50 bg-teal-50 px-2 py-0.5 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase dark:border-teal-900/30 dark:bg-teal-950/20">
                          {pos.dept}
                        </span>
                        <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-bold tracking-wider text-gray-500 uppercase dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          {pos.level}
                        </span>
                      </div>
                      <h3 className="mb-1.5 text-base font-extrabold text-gray-900 dark:text-white">
                        {pos.title}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs tracking-wider text-gray-400 uppercase dark:text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={10} /> {pos.loc}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase size={10} /> {pos.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJob(pos);
                          setIsApplying(true);
                          setSubmitted(false);
                        }}
                        className="cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(14,165,164,0.25)]"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2 pt-6">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 900, behavior: 'smooth' });
                  }}
                  className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold tracking-wider text-gray-700 uppercase transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNumber = idx + 1;
                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => {
                        setCurrentPage(pageNumber);
                        window.scrollTo({ top: 900, behavior: 'smooth' });
                      }}
                      className={`h-9 w-9 cursor-pointer rounded-xl text-xs font-bold transition-all ${
                        currentPage === pageNumber
                          ? 'bg-[var(--orbit-accent-primary)] text-white shadow-sm'
                          : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    window.scrollTo({ top: 900, behavior: 'smooth' });
                  }}
                  className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold tracking-wider text-gray-700 uppercase transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* â”€â”€ JOB DETAILS & APPLICATION MODAL â”€â”€ */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 pt-24 sm:pt-4"
            onClick={() => {
              setSelectedJob(null);
              setIsApplying(false);
              setSubmitted(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="elite-card relative flex max-h-[85dvh] w-full flex-col overflow-hidden rounded-[1.5rem] border border-[var(--orbit-border-mid)] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] backdrop-blur-2xl dark:border-white/12 dark:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.8)] max-w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/20 to-transparent dark:from-white/5" />
              {/* Modal Header */}
              <div className="relative z-10 flex items-start justify-between border-b border-gray-150/50 p-5 dark:border-gray-800/50">
                <div className="space-y-1">
                  <span className="inline-block rounded-full bg-[var(--orbit-accent-primary)]/10 px-2.5 py-0.5 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
                    {selectedJob.dept}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-gray-950 dark:text-white">
                    {selectedJob.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs font-semibold tracking-wider text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-gray-400 dark:text-gray-500" /> {selectedJob.loc}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={11} className="text-gray-400 dark:text-gray-500" /> {selectedJob.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={11} className="text-[var(--orbit-accent-primary)]" /> {selectedJob.salary}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedJob(null);
                    setIsApplying(false);
                    setSubmitted(false);
                  }}
                  className="rounded-xl p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-5 md:p-6">
                {submitted ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-green-200 bg-green-50 text-green-600 dark:border-green-900/30 dark:bg-green-950/20">
                      <Check size={24} />
                    </div>
                    <h3 className="mb-1.5 text-base font-bold text-gray-950 dark:text-white">
                      Application Submitted!
                    </h3>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                      Thanks for applying to <strong>{selectedJob.title}</strong>. We will review your
                      application and reach out within 3-5 business days.
                    </p>
                  </div>
                ) : isApplying ? (
                  <form onSubmit={submitApp} className="space-y-4 text-left">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Submit your details below to apply for the <strong className="text-gray-900 dark:text-white">{selectedJob.title}</strong> position.
                    </p>
                    <div className="space-y-3.5">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-800 dark:text-gray-200">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Alex Johnson"
                          className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-gray-950 placeholder-gray-400 transition-all focus:border-[var(--orbit-accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/20 dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-white dark:placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-800 dark:text-gray-200">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@domain.com"
                          className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-gray-950 placeholder-gray-400 transition-all focus:border-[var(--orbit-accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/20 dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-white dark:placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-800 dark:text-gray-200">
                          LinkedIn / Portfolio URL <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          required
                          value={formData.link}
                          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-gray-950 placeholder-gray-400 transition-all focus:border-[var(--orbit-accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/20 dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-white dark:placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-800 dark:text-gray-200">
                          Spontaneous Note
                        </label>
                        <textarea
                          value={formData.note}
                          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                          placeholder="Tell us what excites you about this role..."
                          rows={3}
                          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-gray-950 placeholder-gray-400 transition-all focus:border-[var(--orbit-accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/20 dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-white dark:placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6 text-left">
                    <div>
                      <p className="text-sm leading-relaxed text-gray-750 dark:text-gray-300 font-light">
                        {selectedJob.desc}
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-2 font-sans text-xs font-bold uppercase tracking-wider text-gray-950 dark:text-white">
                        Requirements
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                        {selectedJob.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-sans text-xs font-bold uppercase tracking-wider text-gray-950 dark:text-white">
                        Nice to Have
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                        {selectedJob.niceToHave.map((nth, i) => (
                          <li key={i}>{nth}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2.5 font-sans text-xs font-bold uppercase tracking-wider text-gray-950 dark:text-white">
                        Key Skills
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedJob.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg border border-gray-150 bg-gray-50/50 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              {!submitted && (
                <div className="flex items-center justify-end gap-2.5 border-t border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
                  {isApplying ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsApplying(false)}
                        className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4.5 py-2.5 text-xs font-bold tracking-wider text-gray-600 uppercase transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-[#111827] dark:text-gray-400 dark:hover:bg-gray-800"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={submitApp}
                        className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--orbit-accent-primary)] px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-all hover:shadow-[0_6px_20px_rgba(14,165,164,0.3)] hover:-translate-y-0.5"
                      >
                        <Send size={11} /> Submit Application
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleSaveJob(selectedJob.title)}
                        className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold tracking-wider uppercase transition-all dark:border-gray-700 ${
                          savedJobs.includes(selectedJob.title)
                            ? 'border-teal-200 bg-teal-50 text-[var(--orbit-accent-primary)] dark:border-teal-900/50 dark:bg-teal-950/30'
                            : 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-[#111827] dark:text-gray-400 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Bookmark
                          size={11}
                          fill={savedJobs.includes(selectedJob.title) ? 'currentColor' : 'none'}
                        />
                        {savedJobs.includes(selectedJob.title) ? 'Saved' : 'Save Job'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsApplying(true)}
                        className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(14,165,164,0.25)]"
                      >
                        <Send size={11} /> Apply Now
                      </button>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* â”€â”€ NO OPEN ROLE CTA â”€â”€ */}
      <section className="border-t border-gray-100 bg-[#FAFAFA] px-6 py-16 transition-colors duration-300 dark:border-gray-800 dark:bg-[#0B0F19]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="leading-relaxed text-gray-555 mb-2 text-sm font-medium dark:text-gray-500">
            Don't see a perfect fit?
          </p>
          <h3 className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white">
            Send us a spontaneous application.
          </h3>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-xs font-bold tracking-wider text-gray-700 uppercase transition-all hover:-translate-y-0.5 hover:border-gray-400 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600"
          >
            Contact Us <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
