import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';
import { Twitter, Github, Linkedin, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const departments = ['All', 'Leadership', 'Engineering', 'Product', 'Design', 'Marketing'];

const team = [
  {
    name: 'Marcus Webb',
    role: 'Co-Founder & CEO',
    dept: 'Leadership',
    avatar:
      '/images/avatars/anya.svg',
    bio: 'Former VP Engineering at Stripe. 12 years building developer infrastructure. Obsessed with making software teams faster.',
    quote: '"Automation should feel like a natural extension of how you already work."',
    twitter: '#',
    devrepo: '#',
    linkedin: '#',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Co-Founder & CPO',
    dept: 'Product',
    avatar:
      '/images/avatars/aria.svg',
    bio: 'Ex-Notion product lead. Built products used by 10M+ people. Believes great UX is invisible.',
    quote: '"The best product decision is usually the one that removes a step."',
    twitter: '#',
    devrepo: '#',
    linkedin: '#',
  },
  {
    name: 'Anya Rossi',
    role: 'VP of Engineering',
    dept: 'Engineering',
    avatar:
      '/images/avatars/james.svg',
    bio: 'Built distributed systems at Cloudflare. Expert in edge computing, real-time data pipelines, and SOC2 compliance.',
    quote: '"Security is not a layer you add last — it\'s the foundation."',
    twitter: '#',
    devrepo: '#',
    linkedin: '#',
  },
  {
    name: 'James Okafor',
    role: 'Lead Architect',
    dept: 'Engineering',
    avatar:
      '/images/avatars/marcus.svg',
    bio: 'Core contributor to open-source workflow engines. Built the OrbitFlow execution runtime from the ground up.',
    quote: '"Clean architecture is the only architecture that scales."',
    twitter: '#',
    devrepo: '#',
    linkedin: '#',
  },
  {
    name: 'Sofia Delgado',
    role: 'Head of Design',
    dept: 'Design',
    avatar:
      '/images/avatars/sarah.svg',
    bio: 'Prev. Linear and Loom design team. Crafts interfaces that users fall in love with on first click.',
    quote: '"Every pixel has a purpose. Decoration is a design failure."',
    twitter: '#',
    devrepo: '#',
    linkedin: '#',
  },
  {
    name: 'Kai Nakamura',
    role: 'Senior AI Engineer',
    dept: 'Engineering',
    avatar:
      '/images/avatars/sofia.svg',
    bio: "ML research background from DeepMind. Builds the AI reasoning nodes that power OrbitFlow's copilot layer.",
    quote: '"The best AI model is the one you never notice."',
    twitter: '#',
    devrepo: '#',
    linkedin: '#',
  },
  {
    name: 'Priya Nair',
    role: 'Growth Lead',
    dept: 'Marketing',
    avatar:
      '/images/avatars/anya.svg',
    bio: 'Scaled TableSync from 500K to 5M users. Data-driven growth thinker with a passion for community building.',
    quote: '"Growth is a product problem in disguise."',
    twitter: '#',
    devrepo: '#',
    linkedin: '#',
  },
  {
    name: 'Luca Ferretti',
    role: 'Senior Frontend Engineer',
    dept: 'Engineering',
    avatar:
      '/images/avatars/aria.svg',
    bio: 'React core enthusiast. Built the OrbitFlow visual canvas and drag-and-drop node editor from scratch.',
    quote: '"A slow UI is a broken UI."',
    twitter: '#',
    devrepo: '#',
    linkedin: '#',
  },
];

const perks = [
  { emoji: '🌏', label: 'Remote-first globally' },
  { emoji: '💰', label: 'Competitive equity packages' },
  { emoji: '🏥', label: 'Full health & dental' },
  { emoji: '📚', label: '$2K yearly learning budget' },
  { emoji: '🏖️', label: 'Unlimited PTO policy' },
  { emoji: '⚡', label: 'Latest MacBook & gear' },
];

export const Team = () => {
  const [activeDept, setActiveDept] = useState('All');
  const [selectedMember, setSelectedMember] = useState<(typeof team)[0] | null>(null);
  const filtered = activeDept === 'All' ? team : team.filter((m) => m.dept === activeDept);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-gray-900 transition-colors duration-300 selection:bg-teal-500/30 dark:bg-[#0B0F19] dark:text-gray-100">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-6 pt-40 pb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="pointer-events-none absolute top-[-20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)]/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[300px] w-[500px] rounded-full bg-[#06B6D4]/15 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase"
          >
            The People
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-sans text-5xl leading-[1.05] font-extrabold tracking-tight text-gray-900 md:text-7xl dark:text-white"
          >
            Builders who care
            <br />
            <span className="font-normal text-[var(--orbit-accent-primary)] italic">
              deeply about craft.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="dark:text-gray-450 mx-auto max-w-xl text-base leading-relaxed font-normal text-gray-500"
          >
            We're a distributed team of 32 people across 11 time zones. Remote-first,
            async-friendly, and deeply committed to building tools we'd actually use.
          </motion.p>
        </div>
      </section>

      {/* ── DEPARTMENT FILTER ── */}
      <section className="border-y border-gray-100 bg-white px-6 py-6 transition-colors duration-300 dark:border-gray-800 dark:bg-[#111827]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2">
          {departments.map((dept) => (
            <button
              type="button"
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`cursor-pointer rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                activeDept === dept
                  ? 'border-[var(--orbit-accent-primary)] bg-[var(--orbit-accent-primary)] text-white shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </section>

      {/* ── TEAM GRID ── */}
      <section className="bg-[#FAFAFA] px-6 py-20 transition-colors duration-300 dark:bg-[#0B0F19]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              onClick={() => setSelectedMember(member)}
              className="elite-card glow-border-hover group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl"
            >
              {/* Avatar area */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-teal-50 to-gray-50">
                <img
                  src={member.avatar}
                  alt={`Profile photo of ${member.name}, ${member.role}`}
                  width={224}
                  height={224}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-gray-900/60 via-transparent to-transparent p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <p className="text-xs leading-relaxed font-normal text-white italic">
                    {member.quote}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-1 font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
                  {member.dept}
                </span>
                <h3 className="mb-0.5 text-sm font-extrabold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="leading-relaxed dark:text-gray-550 mb-3 font-mono text-xs tracking-wider text-gray-500 uppercase">
                  {member.role}
                </p>
                <p className="text-gray-505 flex-1 text-xs leading-relaxed font-normal dark:text-gray-500">
                  {member.bio}
                </p>

                {/* Socials */}
                <div className="mt-4 flex gap-2 border-t border-gray-50 pt-4 dark:border-gray-800/40">
                  {[
                    { Icon: Twitter, href: member.twitter },
                    { Icon: Github, href: member.devrepo },
                    { Icon: Linkedin, href: member.linkedin },
                  ].map(({ Icon, href }, sIdx) => (
                    <a
                      key={sIdx}
                      href={href}
                      onClick={(e) => e.stopPropagation()}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-gray-400 transition-all hover:border-teal-200/50 hover:bg-teal-50 hover:text-[var(--orbit-accent-primary)] dark:border-gray-800 dark:bg-gray-900 dark:hover:border-teal-900/30 dark:hover:bg-teal-950/20"
                    >
                      <Icon size={11} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CULTURE / PERKS ── */}
      <section className="border-t border-gray-100 bg-white px-6 py-20 transition-colors duration-300 dark:border-gray-800 dark:bg-[#111827]">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="text-left">
              <span className="mb-4 block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase">
                Life at OrbitFlow
              </span>
              <h2 className="mb-4 text-3xl leading-tight font-extrabold text-gray-900 md:text-4xl dark:text-white">
                A culture built on
                <br />
                <span className="font-normal text-[var(--orbit-accent-primary)] italic">
                  trust & craft.
                </span>
              </h2>
              <p className="mb-8 text-sm leading-relaxed font-normal text-gray-500 dark:text-gray-500">
                We hire for curiosity and integrity. We build in the open, move fast without chaos,
                and believe the best ideas can come from anywhere in the org.
              </p>
              <Link
                to="/careers"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--orbit-accent-primary)] px-10 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,165,164,0.25)] sm:w-auto"
              >
                See Open Roles <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {perks.map((perk, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#FAFAFA] p-5 dark:border-gray-800 dark:bg-gray-900"
                >
                  <span className="text-2xl">{perk.emoji}</span>
                  <span className="xs:text-xs text-xs leading-tight font-bold whitespace-normal text-gray-700 sm:text-xs dark:text-gray-300">
                    {perk.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="border-t border-gray-100 bg-[#FAFAFA] px-6 py-16 transition-colors duration-300 dark:border-gray-800 dark:bg-[#0B0F19]">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_32px_rgba(0,0,0,0.04)] dark:border-gray-800 dark:bg-[#111827]">
          <h2 className="mb-3 text-2xl font-extrabold text-gray-900 md:text-3xl dark:text-white">
            Want to join this team?
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-500 dark:text-gray-500">
            We're always looking for exceptional people. View our open roles or send us a
            spontaneous application.
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-8 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-all hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Explore Careers <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedMember && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 z-[2100] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="elite-card fixed inset-0 z-[2200] m-auto h-fit max-h-[90vh] w-[90%] max-w-lg overflow-y-auto rounded-3xl p-6 sm:p-8"
            >
              <div className="modal-backlight" />
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 cursor-pointer rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="mb-6 h-32 w-32 rounded-full object-cover shadow-lg"
                />
                <span className="mb-2 font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
                  {selectedMember.dept}
                </span>
                <h3 className="mb-1 text-2xl font-extrabold text-gray-900 dark:text-white">
                  {selectedMember.name}
                </h3>
                <p className="leading-relaxed mb-6 font-mono text-xs tracking-wider text-gray-500 uppercase dark:text-gray-500">
                  {selectedMember.role}
                </p>

                <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {selectedMember.bio}
                </p>

                <div className="mb-8 w-full rounded-2xl bg-gray-50 p-6 dark:bg-gray-800/50">
                  <p className="leading-relaxed text-sm font-medium text-gray-900 italic dark:text-white">
                    {selectedMember.quote}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { Icon: Twitter, href: selectedMember.twitter, label: 'Twitter' },
                    { Icon: Github, href: selectedMember.devrepo, label: 'GitHub' },
                    { Icon: Linkedin, href: selectedMember.linkedin, label: 'LinkedIn' },
                  ].map(({ Icon, href, label }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-xs font-bold text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <Icon size={14} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Team;
