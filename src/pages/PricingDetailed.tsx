import React, { useState } from 'react';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  ArrowRight,
  Zap,
  Shield,
  Users,
  Star,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/vertex/Navbar';
import Footer from '../components/vertex/Footer';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 0, annual: 0 },
    desc: 'For individuals and small projects exploring automation.',
    badge: null,
    badgeColor: '',
    cta: 'Get started free',
    ctaStyle:
      'border border-gray-300 bg-white dark:bg-[#0B0F19] text-gray-900 dark:text-[var(--orbit-text-primary)] hover:border-[var(--orbit-accent-primary)] hover:bg-[var(--orbit-accent-primary)]/5 hover:text-[var(--orbit-accent-primary)] dark:hover:bg-[var(--orbit-accent-primary)]/5 dark:hover:text-[var(--orbit-accent-primary)]',
    features: [
      { text: '500 workflow executions / mo', included: true },
      { text: '3 active workflows', included: true },
      { text: '10+ native integrations', included: true },
      { text: 'Basic AI nodes', included: true },
      { text: 'Community support', included: true },
      { text: 'Custom domains', included: false },
      { text: 'Team collaboration', included: false },
      { text: 'Advanced AI models', included: false },
      { text: 'Priority support', included: false },
      { text: 'SSO & SAML', included: false },
      { text: 'Audit logs', included: false },
      { text: 'SLA guarantee', included: false },
    ],
  },
  {
    name: 'Growth',
    price: { monthly: 79, annual: 63 },
    desc: 'For growing teams that need power, speed, and collaboration.',
    badge: 'Most Popular',
    badgeColor: 'bg-[var(--orbit-accent-primary)] text-white',
    cta: 'Start free trial',
    ctaStyle:
      'bg-[var(--orbit-accent-primary)] text-white hover:bg-[#0c9594] transition-all hover:scale-[1.01] active:scale-[0.99]',
    features: [
      { text: '25,000 workflow executions / mo', included: true },
      { text: 'Unlimited active workflows', included: true },
      { text: '200+ native integrations', included: true },
      { text: 'Advanced AI nodes + GPT-4o', included: true },
      { text: 'Email & chat support', included: true },
      { text: 'Custom domains', included: true },
      { text: 'Team collaboration (up to 10)', included: true },
      { text: 'Advanced AI models', included: true },
      { text: 'Priority support', included: false },
      { text: 'SSO & SAML', included: false },
      { text: 'Audit logs', included: false },
      { text: 'SLA guarantee', included: false },
    ],
  },
  {
    name: 'Business',
    price: { monthly: 229, annual: 183 },
    desc: 'For teams that need compliance, governance, and scale.',
    badge: 'Best Value',
    badgeColor: 'bg-violet-600 text-white',
    cta: 'Start free trial',
    ctaStyle:
      'border border-gray-300 bg-white dark:bg-[#0B0F19] text-gray-900 dark:text-[var(--orbit-text-primary)] hover:border-[var(--orbit-accent-primary)] hover:bg-[var(--orbit-accent-primary)]/5 hover:text-[var(--orbit-accent-primary)] dark:hover:bg-[var(--orbit-accent-primary)]/5 dark:hover:text-[var(--orbit-accent-primary)]',
    features: [
      { text: '200,000 workflow executions / mo', included: true },
      { text: 'Unlimited active workflows', included: true },
      { text: '200+ native integrations', included: true },
      { text: 'All AI models incl. custom endpoints', included: true },
      { text: 'Dedicated support manager', included: true },
      { text: 'Custom domains', included: true },
      { text: 'Team collaboration (up to 50)', included: true },
      { text: 'Advanced AI models', included: true },
      { text: 'Priority support', included: true },
      { text: 'SSO & SAML', included: true },
      { text: 'Full audit logs', included: true },
      { text: '99.9% SLA guarantee', included: true },
    ],
  },
  {
    name: 'Enterprise',
    price: null,
    desc: 'Custom infrastructure, dedicated instances, and white-glove onboarding.',
    badge: null,
    badgeColor: '',
    cta: 'Talk to sales',
    ctaHref: '/schedule-demo',
    ctaStyle:
      'border border-gray-300 bg-white dark:bg-[#0B0F19] text-gray-900 dark:text-[var(--orbit-text-primary)] hover:border-[var(--orbit-accent-primary)] hover:bg-[var(--orbit-accent-primary)]/5 hover:text-[var(--orbit-accent-primary)] dark:hover:bg-[var(--orbit-accent-primary)]/5 dark:hover:text-[var(--orbit-accent-primary)]',
    features: [
      { text: 'Unlimited executions', included: true },
      { text: 'Unlimited active workflows', included: true },
      { text: 'All integrations + custom connectors', included: true },
      { text: 'Custom AI model deployment', included: true },
      { text: '24/7 white-glove support', included: true },
      { text: 'Custom domains + vanity URLs', included: true },
      { text: 'Unlimited team members', included: true },
      { text: 'All AI models + private deployments', included: true },
      { text: 'Dedicated success manager', included: true },
      { text: 'SSO, SAML, SCIM', included: true },
      { text: 'Advanced audit logs + SIEM export', included: true },
      { text: 'Custom SLA + uptime guarantee', included: true },
    ],
  },
];

const comparisonCategories = [
  {
    name: 'Core Features',
    features: [
      { name: 'Workflow Executions / mo', values: ['500', '25,000', '200,000', 'Unlimited'] },
      { name: 'Active Workflows', values: ['3', 'Unlimited', 'Unlimited', 'Unlimited'] },
      { name: 'Team Members', values: ['1 User', 'Up to 10', 'Up to 50', 'Unlimited'] },
      { name: 'Execution History', values: ['7 Days', '30 Days', '90 Days', 'Unlimited'] },
      { name: 'Custom Domains', values: [false, true, true, true] },
    ],
  },
  {
    name: 'Integrations & APIs',
    features: [
      { name: 'Native Integrations', values: ['10+', '200+', '200+', '200+ & Custom'] },
      { name: 'Custom API Nodes', values: [true, true, true, true] },
      { name: 'Webhooks (Inbound/Outbound)', values: [true, true, true, true] },
      { name: 'Database Connectors', values: [false, true, true, true] },
      { name: 'Custom Integration Builder', values: [false, false, true, true] },
    ],
  },
  {
    name: 'AI & Automation',
    features: [
      { name: 'Basic AI Trigger Nodes', values: [true, true, true, true] },
      { name: 'Advanced Models (GPT-4o, Claude 3.5)', values: [false, true, true, true] },
      { name: 'Fine-tuned Model Deployment', values: [false, false, true, true] },
      { name: 'Private LLM Endpoints', values: [false, false, false, true] },
    ],
  },
  {
    name: 'Security & Governance',
    features: [
      { name: 'Data Encryption (Rest/Transit)', values: [true, true, true, true] },
      { name: 'SSO & SAML Authentication', values: [false, false, true, true] },
      { name: 'SCIM Provisioning', values: [false, false, false, true] },
      { name: 'Full Audit Logs', values: [false, false, true, true] },
      { name: 'Dedicated Cluster (VPC)', values: [false, false, false, true] },
    ],
  },
  {
    name: 'Support & SLA',
    features: [
      {
        name: 'Support Channels',
        values: ['Community', 'Email & Chat', 'Dedicated Manager', '24/7 White-Glove'],
      },
      { name: 'Response Time SLA', values: [false, 'Under 4h', 'Under 1h', 'Custom Guarantee'] },
      { name: 'Uptime SLA', values: [false, false, '99.9%', '99.99%'] },
    ],
  },
];

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

export const PricingDetailed = () => {
  const scrollRef = useHorizontalScroll();
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)]">
      <Navbar />
      <div className="h-20" />

      {/* -- HERO -- */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-white py-20 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)]/5 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-4xl space-y-5 px-6 text-center">
          <span className="block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase">
            Pricing
          </span>
          <h1 className="text-5xl leading-[1.05] font-black tracking-tight text-gray-900 md:text-7xl dark:text-[var(--orbit-text-primary)]">
            Simple,{' '}
            <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
              transparent
            </span>{' '}
            pricing
          </h1>
          <p className="mx-auto max-w-lg text-base leading-relaxed font-normal text-gray-500 dark:text-[var(--orbit-text-muted)]">
            No hidden fees. No per-seat pricing games. One plan that scales with you.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span
              className={`text-xs font-bold transition-colors ${billing === 'monthly' ? 'text-gray-900 dark:text-[var(--orbit-text-primary)]' : 'text-gray-400 dark:text-[var(--orbit-text-muted)]'}`}
            >
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setBilling((b) => (b === 'monthly' ? 'annual' : 'monthly'))}
              className={`relative h-6 w-12 cursor-pointer rounded-full border transition-all ${billing === 'annual' ? 'border-[var(--orbit-accent-primary)] bg-[var(--orbit-accent-primary)]' : 'border-gray-200 bg-gray-200 dark:border-[var(--orbit-border-subtle)] dark:bg-[var(--orbit-surface)]'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform dark:bg-[#0B0F19] ${billing === 'annual' ? 'translate-x-6' : ''}`}
              />
            </button>
            <span
              className={`text-xs font-bold transition-colors ${billing === 'annual' ? 'text-gray-900 dark:text-[var(--orbit-text-primary)]' : 'text-gray-400 dark:text-[var(--orbit-text-muted)]'}`}
            >
              Annual
            </span>
            {billing === 'annual' && (
              <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-bold tracking-wider text-emerald-600 uppercase">
                Save 20%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* -- PLAN CARDS -- */}
      <section className="bg-gray-50 px-6 py-16 dark:bg-[var(--orbit-surface)]/30">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`relative flex flex-col rounded-3xl border bg-white p-6 transition-all dark:bg-[#0B0F19] ${
                plan.badge === 'Most Popular'
                  ? 'border-[var(--orbit-accent-primary)]/40 shadow-[0_8px_40px_rgba(14,165,164,0.12)]'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] dark:border-[var(--orbit-border-subtle)]'
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase shadow-sm ${plan.badgeColor}`}
                >
                  {plan.badge}
                </span>
              )}

              <div className="mb-5">
                <h3 className="mb-3 text-base font-black tracking-widest text-gray-900 uppercase dark:text-[var(--orbit-text-primary)]">
                  {plan.name}
                </h3>
                {plan.price ? (
                  <div className="mb-2 flex items-end gap-1">
                    <span className="text-4xl font-black text-gray-950 dark:text-[var(--orbit-text-primary)]">
                      ${billing === 'annual' ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="mb-1 font-mono text-sm text-gray-400 dark:text-[var(--orbit-text-muted)]">
                      /mo
                    </span>
                  </div>
                ) : (
                  <div className="mb-2">
                    <span className="text-2xl font-black text-gray-950 dark:text-[var(--orbit-text-primary)]">
                      Custom
                    </span>
                  </div>
                )}
                <p className="text-sm leading-relaxed font-normal text-gray-500 dark:text-[var(--orbit-text-muted)]">
                  {plan.desc}
                </p>
              </div>

              {plan.ctaHref ? (
                <Link
                  to={plan.ctaHref}
                  className={`mb-5 block w-full rounded-xl py-4 text-center text-xs font-bold tracking-wider uppercase transition-all ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>
              ) : (
                <button
                  type="button"
                  className={`mb-5 w-full cursor-pointer rounded-xl py-4 text-xs font-bold tracking-wider uppercase transition-all ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </button>
              )}

              <div className="flex-1 space-y-2.5">
                {plan.features.map(({ text, included }) => (
                  <div key={text} className="flex items-start gap-2">
                    {included ? (
                      <Check
                        size={13}
                        className="mt-0.5 shrink-0 text-[var(--orbit-accent-primary)]"
                      />
                    ) : (
                      <X size={13} className="mt-0.5 shrink-0 text-gray-300" />
                    )}
                    <span
                      className={`text-sm leading-snug font-medium ${included ? 'text-gray-700 dark:text-[var(--orbit-text-secondary)]' : 'text-gray-400 dark:text-[var(--orbit-text-muted)]'}`}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* -- TRUST STRIP -- */}
      <section className="border-y border-gray-100 bg-white px-6 py-12 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8">
          {[
            { icon: Shield, label: 'SOC2 Type II Certified' },
            { icon: Zap, label: '99.98% Uptime SLA' },
            { icon: Users, label: 'Trusted by 8,000+ teams' },
            { icon: Star, label: '4.9/5 on G2' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 text-gray-600 dark:text-[var(--orbit-text-secondary)]"
            >
              <Icon size={16} className="text-[var(--orbit-accent-primary)]" />
              <span className="text-xs font-bold">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* -- DETAILED COMPARISON TABLE -- */}
      <section className="border-t border-gray-100 bg-white px-6 py-20 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Compare Plans
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl dark:text-[var(--orbit-text-primary)]">
              Detailed Feature Comparison
            </h2>
            <p className="leading-relaxed mx-auto mt-2 max-w-md text-sm font-normal text-gray-500 dark:text-[var(--orbit-text-muted)]">
              Find the plan that best fits your engineering and automation requirements.
            </p>
          </div>

          <div 
            ref={scrollRef}
            className="w-full cursor-grab overflow-x-auto rounded-2xl border-2 border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
          >
            <table
              className="w-full min-w-[800px] text-left"
              style={{ borderCollapse: 'separate', borderSpacing: 0 }}
            >
              <thead>
                <tr className="bg-gray-900">
                  <th className="w-1/3 border-b-2 border-gray-800 px-6 py-5 text-xs font-extrabold tracking-widest text-gray-300 uppercase">
                    Features
                  </th>
                  <th className="border-b-2 border-gray-800 px-6 py-5 text-center text-xs font-extrabold tracking-widest text-white uppercase">
                    Starter
                  </th>
                  <th className="border-b-2 border-gray-800 bg-[var(--orbit-accent-primary)]/20 px-6 py-5 text-center text-xs font-extrabold tracking-widest text-white uppercase">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-xs font-bold tracking-wider text-[#5EEAD4]">
                        Star POPULAR
                      </span>
                      Growth
                    </div>
                  </th>
                  <th className="border-b-2 border-gray-800 px-6 py-5 text-center text-xs font-extrabold tracking-widest text-white uppercase">
                    Business
                  </th>
                  <th className="border-b-2 border-gray-800 px-6 py-5 text-center text-xs font-extrabold tracking-widest text-white uppercase">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonCategories.map((category) => (
                  <React.Fragment key={category.name}>
                    {/* Category Header Row */}
                    <tr className="border-t-2 border-gray-200 bg-gray-100 dark:border-[var(--orbit-border-subtle)] dark:bg-[var(--orbit-surface)]">
                      <td
                        colSpan={5}
                        className="border-b border-gray-200 px-6 py-3.5 text-xs font-extrabold tracking-[0.15em] text-[var(--orbit-accent-primary)] uppercase dark:border-[var(--orbit-border-subtle)]"
                      >
                        {category.name}
                      </td>
                    </tr>
                    {/* Category Feature Rows */}
                    {category.features.map((feat, fIdx) => (
                      <tr
                        key={feat.name}
                        className={`border-b border-gray-200 transition-colors hover:bg-[var(--orbit-accent-primary)]/[0.03] dark:border-[var(--orbit-border-subtle)] ${fIdx % 2 === 0 ? 'bg-white dark:bg-[#0B0F19]' : 'bg-gray-50 dark:bg-[var(--orbit-surface)]/60'}`}
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-[var(--orbit-text-primary)]">
                          {feat.name}
                        </td>
                        {feat.values.map((val, idx) => (
                          <td
                            key={idx}
                            className={`border-l border-gray-200 px-6 py-4 text-center text-sm dark:border-[var(--orbit-border-subtle)] ${idx === 1 ? 'bg-[var(--orbit-accent-primary)]/[0.02]' : ''}`}
                          >
                            {typeof val === 'boolean' ? (
                              val ? (
                                <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50">
                                  <Check size={14} className="text-emerald-600" strokeWidth={3} />
                                </div>
                              ) : (
                                <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-gray-50 dark:border-[var(--orbit-border-subtle)] dark:bg-[var(--orbit-surface)]">
                                  <X size={12} className="text-gray-300" strokeWidth={2.5} />
                                </div>
                              )
                            ) : (
                              <span className="font-bold text-gray-900 dark:text-[var(--orbit-text-primary)]">
                                {val}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

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
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-gray-300 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between p-5 text-left"
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

      {/* -- BOTTOM CTA -- */}
      <section className="border-t border-gray-100 bg-white px-6 py-20 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-3 text-2xl font-extrabold text-gray-900 md:text-3xl dark:text-[var(--orbit-text-primary)]">
            Still deciding?
          </h2>
          <p className="leading-relaxed mb-8 text-sm font-normal text-gray-500 dark:text-[var(--orbit-text-muted)]">
            Try OrbitFlow free for 14 days - no credit card needed. Or talk to our team and we'll
            help you find the right plan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-all hover:scale-[1.01] hover:bg-[#0c9594] active:scale-[0.99]"
            >
              Start Free Trial
            </button>
            <Link
              to="/schedule-demo"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-xs font-bold tracking-wider text-gray-900 uppercase transition-all hover:border-gray-400 dark:text-[var(--orbit-text-primary)]"
            >
              Talk to Sales <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingDetailed;
