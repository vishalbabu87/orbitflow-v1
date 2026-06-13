import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

// Testimonials dataset using custom SVG avatars

const testimonials = [
  {
    id: 0,
    name: 'Sofia Delgado',
    role: 'Product Manager',
    company: 'NovaTech',
    quote:
      "Before OrbitFlow, we juggled five different tools to manage clients, tasks, and reports. Now it's all in one place. We launched 3 campaigns faster this quarter than ever before.",
    avatar:
      '/images/avatars/anya.svg',
    rotation: -8,
  },
  {
    id: 1,
    name: 'Marcus Webb',
    role: 'Lead Systems Architect',
    company: 'CloudBase',
    quote:
      'The visual designer is incredibly clean, but the real power is the pipeline latency. Running automations across our entire infrastructure now takes milliseconds instead of minutes.',
    avatar:
      '/images/avatars/aria.svg',
    rotation: 5,
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'VP of Product',
    company: 'Funnelr',
    quote:
      'We connected over 20 workflows in 10 minutes. The context-aware suggestions helped us catch trigger logic errors immediately during active testing stages.',
    avatar:
      '/images/avatars/james.svg',
    rotation: -4,
  },
  {
    id: 3,
    name: 'James Okafor',
    role: 'CTO & Co-Founder',
    company: 'BuildStack',
    quote:
      'Outstanding performance and reliability. Having single-workspace access for all client channels while maintaining tight permission control is exactly what growing tech startups need.',
    avatar:
      '/images/avatars/marcus.svg',
    rotation: 6,
  },
  {
    id: 4,
    name: 'Anya Rossi',
    role: 'SRE Lead',
    company: 'DataLayer',
    quote:
      'SOC2 compliance and complete webhook monitoring makes this suitable for enterprise deployments. Highly recommend the secure workflow engine to any developer.',
    avatar:
      '/images/avatars/sarah.svg',
    rotation: -7,
  },
];

export const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeReviewer = testimonials[activeIdx];

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden border-y border-gray-100 bg-white transition-colors duration-300 dark:border-gray-800 dark:bg-[#0B0F19] py-[clamp(4rem,8vw,6rem)]">
      {/* Signature vertical rhythm lines */}
      <div className="bg-vertical-grid" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl md:mb-16">
          <span className="mb-4 block font-mono text-sm font-bold tracking-[0.2em] text-[var(--orbit-accent-primary)] uppercase">
            Client Stories
          </span>
          <h2 className="text-fluid-5xl leading-tight font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Trusted by modern teams.
          </h2>
        </div>

        {/* Interactive Main Testimonial Card */}
        <div
          onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="relative mb-12 min-h-[auto] rounded-3xl border border-gray-100/80 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02),0_12px_40px_rgba(0,0,0,0.04)] transition-colors duration-300 md:min-h-[280px] md:p-10 dark:border-gray-800 dark:bg-[#111827] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-8 text-left md:flex-row"
            >
              {/* Left Side: Large Portrait */}
              <img
                src={activeReviewer.avatar}
                alt={`Portrait of ${activeReviewer.name}, ${activeReviewer.role} at ${activeReviewer.company}`}
                width={144}
                height={144}
                loading="lazy"
                className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-gray-100 object-cover shadow-md md:h-36 md:w-36 dark:border-white/10"
              />

              {/* Right Side: Quote and Metadata */}
              <div className="flex-1 space-y-4">
                {/* 5-Star Row */}
                <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-current" aria-hidden="true" />
                  ))}
                </div>

                {/* Main Quote */}
                <p className="text-lg leading-relaxed font-medium text-gray-800 italic dark:text-gray-200">
                  &ldquo;{activeReviewer.quote}&rdquo;
                </p>

                {/* Reviewer Details */}
                <div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
                    {activeReviewer.name}
                  </h4>
                  <p className="leading-relaxed mt-0.5 font-mono text-sm tracking-wider text-gray-500 uppercase">
                    {activeReviewer.role} &middot;{' '}
                    <span className="text-[var(--orbit-accent-primary)]">
                      {activeReviewer.company}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Small Tilted Portraits Reviewer Selector */}
        <div
          className="flex items-center justify-center gap-3"
          role="tablist"
          aria-label="Select testimonial"
          onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {testimonials.map((reviewer, i) => {
            const isActive = i === activeIdx;
            return (
              <motion.button
                key={reviewer.id}
                onClick={() => setActiveIdx(i)}
                whileHover={{ scale: 1.05 }}
                role="tab"
                aria-selected={isActive}
                aria-label={`View testimonial from ${reviewer.name}`}
                className={`testimonial-card relative h-12 w-12 cursor-pointer overflow-hidden rounded-xl border shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-accent-primary)] focus-visible:ring-offset-2 ${
                  isActive
                    ? 'z-10 scale-110 border-indigo-500 ring-2 ring-indigo-500/20'
                    : 'border-gray-200 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 dark:border-white/10'
                }`}
                style={{
                  transform: `rotate(${reviewer.rotation}deg)`,
                }}
              >
                <img
                  src={reviewer.avatar}
                  alt={reviewer.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
