import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 29,
    description: 'Best for small teams & startups',
    features: [
      '5 workflows',
      'Basic analytics',
      'Standard integrations',
      'Team collaboration',
      'Email support',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    price: 79,
    description: 'Best for growing operations',
    features: [
      'Unlimited workflows',
      'AI copilot',
      'Advanced analytics',
      'Automation templates',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    featured: true,
    badge: 'Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Best for large-scale organizations',
    features: [
      'Enterprise security',
      'Custom AI models',
      'Dedicated infrastructure',
      'Advanced permissions',
      'Dedicated onboarding',
    ],
    cta: 'Talk to Sales',
    featured: false,
  },
];

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const navigate = useNavigate();

  return (
    <section
      id="pricing"
      className="relative flex flex-col justify-center overflow-hidden bg-white py-12 transition-colors duration-300 md:py-24 dark:bg-[#0B0F19]"
    >
      {/* Signature vertical rhythm lines */}
      <div className="bg-vertical-grid" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <span className="mb-4 block font-mono text-sm font-bold tracking-[0.2em] text-[var(--orbit-accent-primary)] uppercase">
            Pricing
          </span>
          <h2 className="mb-4 text-2xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
            Flexible pricing for teams of every size.
          </h2>
          <p className="leading-relaxed mx-auto max-w-md text-base text-gray-500 dark:text-gray-500">
            Choose a plan designed for startups, growing operations, and enterprise-scale workflows.
          </p>
        </div>

        {/* Annual / Monthly Toggle */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <span className={`text-sm font-semibold ${!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>Monthly</span>
          <button
            type="button"
            onClick={() => setIsYearly(!isYearly)}
            className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
              isYearly ? 'bg-[var(--orbit-accent-primary)]' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            aria-label="Toggle annual billing"
          >
            <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${isYearly ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm font-semibold ${isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
            Annual <span className="ml-1 rounded-full bg-teal-50 px-1.5 py-0.5 text-xs font-bold text-teal-600 dark:bg-teal-900/30 dark:text-teal-700 dark:text-teal-400">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-8">
          {plans.map((plan, i) => {
            const calculatedPrice =
              typeof plan.price === 'number' && isYearly
                ? Math.round(plan.price * 0.8)
                : plan.price;

            const isSelected = plan.name === selectedPlan;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedPlan(plan.name)}
                className={`relative flex cursor-pointer flex-col justify-between rounded-3xl border bg-white p-5 transition-all duration-300 md:p-8 dark:bg-[#111827] ${
                  isSelected
                    ? 'z-10 border-[var(--orbit-accent-primary)] shadow-[0_16px_40px_rgba(14,165,164,0.12)] hover:-translate-y-1 dark:shadow-[0_16px_40px_rgba(14,165,164,0.22)]'
                    : 'hover:border-gray-450 border-gray-200 shadow-sm hover:shadow-md dark:border-gray-800 dark:hover:border-gray-700'
                }`}
              >
                {/* Popular Badge */}
                {plan.featured && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full border border-teal-200/50 bg-teal-50 px-2.5 py-0.5 text-xs font-bold tracking-wider text-teal-600 uppercase">
                    <Star size={8} className="fill-current" /> {plan.badge || 'Popular'}
                  </div>
                )}

                <div>
                  {/* Header */}
                  <div className="mb-6 text-left">
                    <span className="mb-1 block font-mono text-sm font-bold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                      {plan.name}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        {typeof calculatedPrice === 'number'
                          ? `$${calculatedPrice}`
                          : calculatedPrice}
                      </span>
                      {typeof calculatedPrice === 'number' && (
                        <span className="text-gray-450 font-mono text-sm tracking-wider uppercase dark:text-gray-500">
                          / mo
                        </span>
                      )}
                    </div>
                    <p className="leading-relaxed mt-2 text-sm font-normal text-gray-500 dark:text-gray-500">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6 h-px w-full bg-gray-50 dark:bg-gray-800/60" />

                  {/* Features */}
                  <ul className="mb-8 space-y-3.5 text-left">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="mt-0.5 rounded-full bg-teal-50 p-0.5 text-[var(--orbit-accent-primary)] dark:bg-[var(--orbit-accent-primary)]/10">
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span className="text-base leading-tight font-normal text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (plan.name === 'Enterprise') {
                      navigate('/contact');
                    } else {
                      navigate(`/auth/register?plan=${encodeURIComponent(plan.name)}`);
                    }
                  }}
                  className={`w-full cursor-pointer rounded-xl border py-3.5 text-sm font-bold transition-all ${
                    isSelected
                      ? 'border-[var(--orbit-accent-primary)] bg-[var(--orbit-accent-primary)] text-white hover:scale-[1.01] hover:bg-[#0c9594] active:scale-[0.99]'
                      : 'border-gray-200 bg-white text-gray-600 hover:scale-[1.01] hover:border-[var(--orbit-accent-primary)] hover:bg-[var(--orbit-accent-primary)]/5 hover:text-[var(--orbit-accent-primary)] active:scale-[0.99] dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
