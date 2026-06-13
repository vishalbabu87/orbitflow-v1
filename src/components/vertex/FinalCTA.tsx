import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FinalCTA = () => {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-white text-center dark:bg-transparent py-16 md:py-20 lg:py-24">
      {/* Signature vertical rhythm lines */}
      <div className="bg-vertical-grid" />

      {/* Soft teal radial glow behind the content */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--orbit-accent-primary)]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-6 md:space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase">
            Start Building
          </span>

          <h2 className="mx-auto max-w-3xl font-sans text-2xl leading-none font-extrabold tracking-tight text-gray-900 md:text-7xl dark:text-white">
            Start building intelligent workflows today.
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base dark:text-gray-500">
            Automate repetitive operations, connect your tools, and empower teams with AI-powered
            workflows.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/auth/register"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--orbit-accent-primary)] px-8 py-3.5 text-xs font-bold text-white shadow-[0_8px_20px_rgba(14,165,164,0.15)] transition-all hover:bg-[#0c9594] active:scale-95 sm:w-auto"
          >
            <span>Get Started</span>
            <ArrowRight size={13} />
          </Link>
          <Link
            to="/schedule-demo"
            className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-center text-xs font-bold text-gray-700 transition-all hover:bg-gray-50 sm:w-auto dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Book a Demo
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
