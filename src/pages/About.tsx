import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';
import { Target, Users, Zap, Shield, Globe, Code2, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

/* â”€â”€ Animated counter hook â”€â”€ */
function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }
    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return count;
}

const stats = [
  { value: 20000, suffix: '+', label: 'Teams using OrbitFlow' },
  { value: 150, suffix: 'M+', label: 'Workflow executions monthly' },
  { value: 99, suffix: '.9%', label: 'Platform uptime SLA' },
  { value: 4, suffix: 'x', label: 'Faster than manual ops' },
];

const values = [
  {
    icon: Target,
    title: 'Radical Clarity',
    desc: 'We strip every interaction down to its essence. Complexity is the enemy â€” clear, minimal, purposeful design wins.',
  },
  {
    icon: Zap,
    title: 'Speed as a Feature',
    desc: 'Latency is a bug. Every part of OrbitFlow is engineered for instant response â€” from UI to pipeline execution.',
  },
  {
    icon: Shield,
    title: 'Trust by Default',
    desc: "Security isn't an add-on. End-to-end encryption, AES-256 vaults, and SOC2 compliance come built-in.",
  },
  {
    icon: Users,
    title: 'Teams First',
    desc: 'We build for teams that do real work. Collaboration, audit trails, and role-based access are first-class features.',
  },
  {
    icon: Globe,
    title: 'Globally Distributed',
    desc: 'Our edge runners are distributed across 12 regions, ensuring workflows execute within milliseconds anywhere.',
  },
  {
    icon: Code2,
    title: 'Dev-Friendly Core',
    desc: 'Power users can write custom code blocks in Python, JS, or any language. The visual layer sits atop a full API.',
  },
];

const timeline = [
  {
    year: '2023',
    tag: 'Ideation',
    title: 'The Problem Space',
    desc: 'Three engineers frustrated with clunky automation tools started sketching a better way. The first prototype was a single visual canvas with five node types.',
  },
  {
    year: '2024 Q1',
    tag: 'Seed',
    title: 'Platform Birth',
    desc: 'Raised $3.2M seed round. Built the core execution engine, encrypted credential vault, and first 20 native integrations from the ground up.',
  },
  {
    year: '2024 Q4',
    tag: 'Beta',
    title: 'Developer Beta',
    desc: 'Launched closed beta with 500 developers. Iterated weekly on trigger logic, custom code blocks, and the real-time execution log viewer.',
  },
  {
    year: '2025',
    tag: 'Launch',
    title: 'Public Launch & Series A',
    desc: 'OrbitFlow v1.0 launched publicly. 8,000 teams onboarded in the first 90 days. Raised $18M Series A to accelerate the AI copilot layer.',
  },
  {
    year: '2026',
    tag: 'Scale',
    title: 'OrbitFlow v2.0',
    desc: 'Launched v2.0 with AI reasoning nodes, multi-region execution, and the collaborative live canvas. Now powering 150M+ monthly workflow executions.',
  },
];

const photos = [
  '/images/ai_office_1.jpg',
  '/images/ai_office_2.jpg',
  '/images/ai_bg_1.jpg',
  '/images/ai_bg_2.jpg',
];

/* â”€â”€ Stat Counter Component â”€â”€ */
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(visible ? value : 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="mb-2 text-4xl leading-none font-black text-[var(--orbit-accent-primary)] tabular-nums md:text-5xl">
        {count}
        {suffix}
      </div>
      <p className="leading-relaxed font-mono text-xs tracking-widest text-gray-500 uppercase dark:text-gray-500">
        {label}
      </p>
    </div>
  );
}

export const About = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--orbit-base)] text-[var(--orbit-text-primary)] selection:bg-teal-500/30">
      <Navbar />

      {/* â”€â”€ HERO â”€â”€ */}
      <section className="relative overflow-hidden px-6 pt-40 pb-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="pointer-events-none absolute top-[-20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)]/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[300px] w-[500px] rounded-full bg-[#06B6D4]/15 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase"
          >
            About OrbitFlow
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 font-sans text-5xl leading-[1.05] font-extrabold tracking-tight text-[var(--orbit-text-primary)] md:text-7xl"
          >
            We're building the
            <br />
            <span className="font-normal text-[var(--orbit-accent-primary)] italic">
              operating layer
            </span>
            <br />
            for modern teams.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-550 mx-auto max-w-2xl text-base leading-relaxed font-normal md:text-lg dark:text-gray-400"
          >
            OrbitFlow connects your tools, automates your workflows, and surfaces insights using AI
            â€” so your team can focus on work that actually matters.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex justify-center gap-4"
          >
            <Link
              to="/schedule-demo"
              className="rounded-xl bg-[var(--orbit-accent-primary)] px-7 py-4 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-all hover:shadow-[0_8px_24px_rgba(14,165,164,0.25)]"
            >
              Get a Demo
            </Link>
            <Link
              to="/team"
              className="rounded-xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] px-7 py-4 text-xs font-bold tracking-wider text-[var(--orbit-text-secondary)] uppercase transition-all hover:border-gray-300 hover:text-[var(--orbit-text-primary)] dark:hover:border-gray-700"
            >
              Meet the Team
            </Link>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ STATS BAR â”€â”€ */}
      <section className="border-y border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] px-6 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 items-center justify-items-center gap-10 divide-y-0 divide-[var(--orbit-border-subtle)] md:grid-cols-4 md:gap-0 md:divide-x">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex w-full flex-col items-center justify-center px-6 text-center"
            >
              <StatCard value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>
      </section>

      {/* â”€â”€ PHOTO COLLAGE â”€â”€ */}
      <section className="bg-[var(--orbit-base)] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {photos.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`overflow-hidden rounded-3xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] shadow-sm ${i === 1 ? 'md:mt-8' : i === 3 ? 'md:mt-4' : ''}`}
                style={{ aspectRatio: i % 2 === 0 ? '4/5' : '4/4' }}
              >
                <img
                  src={src}
                  alt={`OrbitFlow team members working collaboratively in local office hubs ${i + 1}`}
                  className="h-full w-full object-cover"
                  width={280}
                  height={350}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
          <p className="leading-relaxed mt-6 text-center font-mono text-sm tracking-widest text-gray-500 uppercase dark:text-gray-500">
            Our team distributed across San Francisco, London, and Singapore
          </p>
        </div>
      </section>

      {/* â”€â”€ MISSION STATEMENT â”€â”€ */}
      <section className="border-t border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-5 block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase">
            Our Mission
          </span>
          <blockquote className="mb-8 text-2xl leading-tight font-extrabold text-[var(--orbit-text-primary)] md:text-4xl">
            "Every team deserves software that thinks with them â€” not just for them. We're building
            the intelligence layer that makes operational work frictionless."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <img
              src="/images/ai_feature_1.jpg"
              alt="Marcus Webb, Co-Founder and CEO of OrbitFlow"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border-2 border-[var(--orbit-border-subtle)] object-cover"
              loading="lazy"
            />
            <div className="text-left">
              <p className="leading-relaxed text-xs font-extrabold text-[var(--orbit-text-primary)]">Marcus Webb</p>
              <p className="leading-relaxed dark:text-gray-505 font-mono text-xs tracking-wider text-gray-500 uppercase">
                Co-Founder & CEO
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ CORE VALUES â”€â”€ */}
      <section className="bg-[var(--orbit-base)] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span className="mb-4 block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase">
              What We Believe
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--orbit-text-primary)] md:text-5xl">
              Our core values
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col rounded-3xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] p-7 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-[var(--orbit-accent-primary)]/20 hover:shadow-[0_8px_32px_rgba(14,165,164,0.08)]"
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 text-[var(--orbit-accent-primary)] transition-transform group-hover:scale-110 dark:from-teal-950/20 dark:to-teal-900/10">
                  <v.icon size={20} />
                </div>
                <h3 className="mb-2 text-base font-extrabold text-[var(--orbit-text-primary)]">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed font-normal text-gray-500 dark:text-gray-500">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ TIMELINE â”€â”€ */}
      <section id="our-story" className="border-t border-[var(--orbit-border-subtle)] bg-[var(--orbit-base)] px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <span className="mb-4 block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase">
              Our Story
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--orbit-text-primary)] md:text-5xl">
              How we got here
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-[28px] w-px bg-gradient-to-b from-transparent via-[var(--orbit-accent-primary)]/30 to-transparent md:left-1/2" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`relative flex gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 pl-14 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}
                  >
                    <span className="mb-3 inline-block rounded-md border border-teal-200/50 bg-teal-50 px-2.5 py-1 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase dark:border-teal-900/30 dark:bg-teal-950/20">
                      {item.tag}
                    </span>
                    <div className="mb-1 font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                      {item.year}
                    </div>
                    <h3 className="mb-2 text-base font-extrabold text-[var(--orbit-text-primary)]">
                      {item.title}
                    </h3>
                    <p className="text-gray-750 text-sm leading-relaxed font-semibold dark:text-gray-200">
                      {item.desc}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="absolute top-2 left-[20px] z-10 h-5 w-5 rounded-full border-4 border-[var(--orbit-accent-primary)] bg-[var(--orbit-surface)] shadow-[0_0_0_4px_rgba(14,165,164,0.1)] md:left-1/2 md:-translate-x-1/2" />

                  {/* Empty side */}
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ INVESTORS / TRUST â”€â”€ */}
      <section className="border-t border-[var(--orbit-border-subtle)] bg-[var(--orbit-base)] px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="leading-relaxed mb-8 font-mono text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-500">
            Backed by world-class investors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-50 grayscale dark:invert">
            {['Sequoia Capital', 'Andreessen Horowitz', 'YCombinator', 'Tiger Global'].map(
              (name, i) => (
                <span
                  key={i}
                  className="text-sm font-extrabold tracking-tight text-[var(--orbit-text-primary)]"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* â”€â”€ CTA â”€â”€ */}
      <section className="border-t border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold text-[var(--orbit-text-primary)] md:text-4xl">
            Join 20,000+ teams already
            <br />
            <span className="text-[var(--orbit-accent-primary)]">
              working smarter with OrbitFlow.
            </span>
          </h2>
          <p className="text-gray-550 mb-8 text-sm leading-relaxed dark:text-gray-500">
            Start free â€” no credit card required. Deploy your first workflow in under 5 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--orbit-accent-primary)] px-8 py-4 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-all hover:shadow-[0_8px_24px_rgba(14,165,164,0.25)]"
            >
              Start Free Today <ArrowRight size={14} />
            </Link>
            <Link
              to="/careers"
              className="rounded-xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-base)] px-8 py-4 text-xs font-bold tracking-wider text-[var(--orbit-text-secondary)] uppercase transition-all hover:border-gray-300 hover:text-[var(--orbit-text-primary)] dark:hover:border-gray-700"
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
