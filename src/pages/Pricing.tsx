import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Sparkles,
  Zap,
  Shield,
  Command,
  ArrowRight,
  HelpCircle,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'Can I change my plan anytime?',
    a: "Yes. Upgrade or downgrade at any time. Changes take effect immediately, and we'll prorate billing automatically.",
  },
  {
    q: 'What happens when I exceed my execution limit?',
    a: 'On Starter, workflows pause until the next cycle. On paid plans, executions continue and overage is billed at $0.002 per run.',
  },
  {
    q: 'Is there a free trial for paid plans?',
    a: 'Yes. All paid plans include a 14-day free trial. No credit card required to start.',
  },
  {
    q: "What counts as a 'workflow execution'?",
    a: 'Each time a workflow is triggered and completes at least one node run, that counts as one execution.',
  },
  {
    q: 'Do you offer non-profit or startup discounts?',
    a: "Yes. Contact us at sales@orbitflow.io with proof of eligibility and we'll apply a custom discount.",
  },
  {
    q: 'Can I self-host OrbitFlow?',
    a: 'Self-hosting is available on Enterprise plans. We provide container images, Helm charts, and dedicated onboarding support.',
  },
];

const plans = [
  {
    name: 'Starter',
    price: { monthly: 29, annual: 23 },
    description: 'Perfect for individuals & small teams exploring automation.',
    icon: Command,
    accent: 'text-gray-500 bg-gray-50',
    features: [
      '5 active workflows',
      'Basic AI reasoner nodes',
      '10+ native app integrations',
      'Community forum support',
      'Standard telemetry dashboard',
    ],
    cta: 'Get Started Free',
    ctaStyle:
      'border border-gray-300 bg-white text-gray-800 hover:border-[var(--orbit-accent-primary)] hover:bg-[var(--orbit-accent-primary)]/5 hover:text-[var(--orbit-accent-primary)] dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200',
    popular: false,
  },
  {
    name: 'Growth',
    price: { monthly: 79, annual: 63 },
    description: 'Built for scaling teams with high-speed automation needs.',
    icon: Zap,
    accent: 'text-[var(--orbit-accent-primary)] bg-teal-50',
    features: [
      'Unlimited workflows',
      'Advanced AI reasoning (GPT-4o)',
      '200+ native integrations',
      'Priority email & Slack support',
      'Custom webhooks & alerts',
      'Team collaboration (up to 10)',
    ],
    cta: 'Start 14-Day Free Trial',
    ctaStyle:
      'bg-[var(--orbit-accent-primary)] text-white shadow-sm hover:shadow-[0_8px_24px_rgba(14,165,164,0.3)] hover:-translate-y-0.5',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: 229, annual: 183 },
    description: 'Infinite scale and security for large organizations.',
    icon: Shield,
    accent: 'text-violet-600 bg-violet-50',
    features: [
      'Custom monthly workflow volume',
      'Unlimited execution history',
      'Dedicated account manager',
      'Private cluster deployments',
      '99.99% uptime SLA guarantee',
      'Full compliance audit logs',
    ],
    cta: 'Contact Infrastructure Team',
    ctaStyle:
      'border border-gray-300 bg-white text-gray-800 hover:border-[var(--orbit-accent-primary)] hover:bg-[var(--orbit-accent-primary)]/5 hover:text-[var(--orbit-accent-primary)] dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200',
    popular: false,
  },
];

export const Pricing = () => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState('Growth');

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-gray-900 dark:bg-[#0B0F19] dark:text-white selection:bg-teal-500/30">
      <Navbar />

      <div id="pricing-section" className="relative flex-grow overflow-hidden px-6 pt-40 pb-24 dark:bg-[#0B0F19]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="pointer-events-none absolute top-[-20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)]/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[300px] w-[500px] rounded-full bg-[#06B6D4]/15 blur-[100px]" />

        {/* Header */}
        <div className="relative z-10 mx-auto mb-16 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 shadow-sm dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)]"
          >
            <Sparkles size={12} className="text-[var(--orbit-accent-primary)]" />
            <span className="text-xs font-bold tracking-wider text-gray-600 dark:text-gray-300 uppercase">
              Transparent Pricing
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 font-sans text-5xl leading-none font-extrabold tracking-tight text-gray-900 dark:text-white md:text-7xl"
          >
            Predictable Plans for
            <br />
            <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
              Every Team Scale
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base leading-relaxed font-normal text-gray-500 dark:text-gray-400 md:text-lg"
          >
            Choose the automation scale your workflow infrastructure requires. Start free, scale as
            you grow.
          </motion.p>

          {/* Premium Billing Toggle Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center justify-center"
          >
            <div className="inline-flex items-center justify-center rounded-full bg-gray-150 p-1 border border-gray-200/50 dark:bg-gray-800/85 dark:border-gray-700/60 shadow-inner">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={`rounded-full px-5 py-2 min-h-11 text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  billing === 'monthly'
                    ? 'bg-white text-gray-950 shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:bg-[var(--orbit-accent-primary)] dark:text-white'
                    : 'text-gray-450 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2 min-h-11 text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  billing === 'annual'
                    ? 'bg-white text-gray-950 shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:bg-[var(--orbit-accent-primary)] dark:text-white'
                    : 'text-gray-450 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                Annually
                <span className={`rounded-full px-2 py-0.5 font-mono text-xs font-black tracking-wider uppercase transition-colors ${
                  billing === 'annual'
                    ? 'bg-teal-50 text-[var(--orbit-accent-primary)] dark:bg-teal-950/40 dark:text-teal-200'
                    : 'bg-teal-50/70 text-[var(--orbit-accent-primary)]/80 dark:bg-teal-950/20 dark:text-teal-400/80'
                }`}>
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-8 md:grid-cols-3">
          {plans.map((plan, i) => {
            const calculatedPrice = billing === 'annual' ? plan.price.annual : plan.price.monthly;
            const Icon = plan.icon;

            const isSelected = plan.name === selectedPlan;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setSelectedPlan(plan.name)}
                className={`relative flex cursor-pointer flex-col justify-between rounded-3xl border bg-white p-8 transition-all duration-300 dark:bg-[#0B0F19] ${
                  isSelected
                    ? 'z-10 border-[var(--orbit-accent-primary)] shadow-[0_16px_40px_rgba(14,165,164,0.12)] hover:-translate-y-1 dark:shadow-[0_16px_40px_rgba(14,165,164,0.22)]'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:border-[var(--orbit-border-subtle)] dark:hover:border-gray-700'
                }`}
              >
                {/* Popular Ribbon */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)] px-4 py-1 text-xs font-bold tracking-widest text-white uppercase shadow-sm">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Top Header Card */}
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-100 dark:border-gray-800/60 ${plan.accent} dark:bg-[var(--orbit-accent-primary)]/10 dark:text-[var(--orbit-accent-primary)]`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black tracking-tight text-gray-900 dark:text-white uppercase">
                        {plan.name}
                      </h3>
                      <p className="leading-relaxed text-xs font-normal text-gray-500 dark:text-gray-400">
                        {plan.name === 'Starter'
                          ? 'Basic tools'
                          : plan.name === 'Growth'
                            ? 'Team power'
                            : 'Full access'}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-gray-900 dark:text-white">${calculatedPrice}</span>
                      <span className="font-mono text-sm text-gray-400 dark:text-gray-550">/mo</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed font-normal text-gray-500 dark:text-gray-400">
                      {plan.description}
                    </p>
                  </div>

                  <div className="my-6 h-px bg-gray-100 dark:bg-gray-800/60" />

                  {/* Features List */}
                  <div className="mb-8 space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="group flex items-start gap-3">
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-teal-100 bg-teal-50 dark:border-teal-900/30 dark:bg-teal-950/20">
                          <Check
                            size={10}
                            className="text-[var(--orbit-accent-primary)]"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-sm leading-tight font-medium text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  to={plan.name === 'Enterprise' ? '/schedule-demo' : '/auth'}
                  className={`w-full rounded-2xl py-4 text-center text-xs font-bold tracking-wider uppercase transition-all ${
                    isSelected
                      ? 'border-[var(--orbit-accent-primary)] bg-[var(--orbit-accent-primary)] text-white hover:scale-[1.01] hover:bg-[#0c9594] active:scale-[0.99]'
                      : 'border-gray-300 bg-white text-gray-800 hover:scale-[1.01] hover:border-[var(--orbit-accent-primary)] hover:bg-[var(--orbit-accent-primary)]/5 hover:text-[var(--orbit-accent-primary)] active:scale-[0.99] dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Comparison CTA Grid */}
        <div className="relative z-10 mx-auto mt-20 max-w-4xl text-center">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.01)] transition-all hover:border-gray-300 dark:border-gray-800 dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)]">
            <h4 className="mb-2 text-base font-bold text-gray-900 dark:text-white">
              Need a feature-by-feature breakdown?
            </h4>
            <p className="leading-relaxed mb-6 text-sm font-normal text-gray-500 dark:text-gray-400">
              Compare our plans side-by-side to understand execution limits, audit logs, and
              security levels.
            </p>
            <Link
              to="/pricing-detailed"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase transition-colors hover:text-teal-600 dark:hover:text-teal-400"
            >
              View detailed comparison matrix <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* -- FAQ -- */}
      <section className="bg-gray-50 px-6 py-20 dark:bg-[var(--orbit-surface)]/30">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              FAQ
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl dark:text-[var(--orbit-text-primary)]">
              Pricing questions answered
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-[var(--orbit-accent-primary)]/40 hover:shadow-[0_0_20px_rgba(14,165,164,0.08)] dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
              >
                <button
                  type="button"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between p-5 text-left focus:ring-2 focus:ring-[var(--orbit-accent-primary)] focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={14} className="shrink-0 text-[var(--orbit-accent-primary)]" />
                    <span className="text-sm font-bold text-gray-900 dark:text-[var(--orbit-text-primary)]">
                      {faq.q}
                    </span>
                  </div>
                  {openFaq === i ? (
                    <ChevronUp
                      size={14}
                      className="shrink-0 text-gray-400 dark:text-[var(--orbit-text-muted)]"
                    />
                  ) : (
                    <ChevronDown
                      size={14}
                      className="shrink-0 text-gray-400 dark:text-[var(--orbit-text-muted)]"
                    />
                  )}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-5 pb-5 pl-[3.25rem]"
                  >
                    <p className="text-xs leading-relaxed font-normal text-gray-600 dark:text-[var(--orbit-text-secondary)]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
