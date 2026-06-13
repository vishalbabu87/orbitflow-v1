import { motion } from 'framer-motion';
import { NumberTicker } from '../ui/NumberTicker';

const stats = [
  { label: 'Active Users', value: 10000, suffix: '+', color: 'var(--orbit-accent-primary)' },
  { label: 'Workflow Accuracy', value: 98, suffix: '%', color: 'var(--orbit-accent-primary)' },
  { label: 'Tasks Automated', value: 50, suffix: 'M+', color: 'var(--orbit-accent-primary)' },
  {
    label: 'Integrations Available',
    value: 150,
    suffix: '+',
    color: 'var(--orbit-accent-primary)',
  },
];

export const StatsSection = () => {
  return (
    <section className="stats-section relative overflow-hidden bg-white transition-colors duration-300 dark:bg-[#0B0F19] py-16 md:py-20 lg:py-24">
      {/* Subtle vertical signature rhythm lines */}
      <div className="bg-vertical-grid" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-10 md:grid-cols-4 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col items-center text-center"
            >
              {/* Animated Counter */}
              <h3 className="stat-counter mb-2 flex items-baseline justify-center gap-0.5 font-sans text-7xl font-black tracking-tight text-[var(--orbit-accent-primary)] lg:text-7xl">
                <NumberTicker
                  value={stat.value}
                  className="font-extrabold tracking-tight text-[var(--orbit-accent-primary)] tabular-nums"
                />
                <span className="text-5xl font-medium text-[var(--orbit-accent-primary)]/70 italic lg:text-4xl">
                  {stat.suffix}
                </span>
              </h3>

              {/* Muted Label */}
              <p className="stat-label max-w-[180px] font-mono text-lg leading-relaxed font-bold tracking-widest text-gray-500 uppercase lg:text-lg">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
