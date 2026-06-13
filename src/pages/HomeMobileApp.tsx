import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Check, ArrowRight, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';
import { Link } from 'react-router-dom';

const steps = [
  {
    num: '01',
    title: 'Write Your Code',
    desc: 'Build your app using React Native, Flutter, or native Swift/Kotlin. Install our lightweight SDK in seconds.',
  },
  {
    num: '02',
    title: 'Push to Git',
    desc: 'Trigger automatic builds, runs tests, creates OTA updates, and routes build logs to your terminal.',
  },
  {
    num: '03',
    title: 'Go Live',
    desc: 'Submit directly to App Store and Google Play, managing rollout percentages and feature flags on our dashboard.',
  },
];

const plans = [
  {
    name: 'Hobbyist',
    price: 0,
    desc: 'For developers launching solo apps.',
    features: [
      '1 Mobile App Project',
      '10,000 Push Notifications / mo',
      'Basic OTA updates',
      'Analytics dashboard',
    ],
  },
  {
    name: 'Growth App',
    price: 79,
    desc: 'For scaling startup mobile apps.',
    features: [
      '3 Mobile App Projects',
      '500,005 Push Notifications / mo',
      'Unlimited OTA updates',
      'Offline sync relay',
      'Priority Slack support',
    ],
  },
  {
    name: 'Enterprise',
    price: 299,
    desc: 'Isolated nodes and white-glove setup.',
    features: [
      'Unlimited App Projects',
      'Unlimited Push Notifications',
      'Custom build servers',
      'SLA uptime guarantee',
      'SOC2 compliance vault',
    ],
  },
];

const faqs = [
  {
    q: 'What frameworks do you support?',
    a: 'We support React Native, Flutter, Expo, Swift, Kotlin, and Unity engines with native packages.',
  },
  {
    q: 'How does auto-scaling OTA updates work?',
    a: 'When you push updates to git, our edge nodes build files and sync modifications to active client devices dynamically without resubmitting to app stores.',
  },
  {
    q: 'Is there a limit on push notification volume?',
    a: 'Hobby plans have basic caps, while growth/enterprise plans scale to billions of push notifications monthly via high-throughput lanes.',
  },
];

export const HomeMobileApp = () => {
  const [selectedPlan, setSelectedPlan] = useState('Growth App');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--orbit-base)] text-[var(--orbit-text-primary)] selection:bg-teal-500/30">
      <Navbar />

      {/* -- HERO -- */}
      <section id="main-content" className="relative overflow-hidden px-6 pt-40 pb-20">
        <div className="bg-vertical-grid" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-teal-500/5 blur-[120px]" />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-teal-200/50 bg-teal-50 px-3 py-1 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
              <Smartphone size={12} /> Mobile-First Framework
            </span>
            <h1 className="mb-6 font-sans text-5xl leading-none font-extrabold tracking-tight text-gray-900 md:text-7xl dark:text-[var(--orbit-text-primary)]">
              Launch Your App
              <br />
              <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
                in Days, Not Months
              </span>
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed font-medium text-gray-500 md:text-lg dark:text-[var(--orbit-text-muted)]">
              OrbitFlow's mobile template provides the complete stack: push notifications, in-app
              telemetry, offline state sync, and user verification.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/auth/login"
                className="rounded-xl bg-[var(--orbit-accent-primary)] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,165,164,0.25)]"
              >
                Get Started Free
              </Link>
              <Link
                to="/schedule-demo"
                className="cursor-pointer rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-center text-xs font-bold tracking-wider text-gray-800 uppercase transition-all duration-300 hover:scale-105 hover:border-[var(--orbit-accent-primary)] hover:bg-[var(--orbit-accent-primary)] hover:text-white dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)]"
              >
                Book a Demo
              </Link>
            </div>
          </div>

          {/* Interactive Mobile Device Mockup */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] w-full max-w-[400px] overflow-hidden rounded-[3rem] border-[10px] border-gray-900 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.2)] md:h-[600px] md:h-[650px] md:max-w-[440px]"
            >
              {/* Speaker / Notch */}
              <div className="absolute top-0 left-1/2 z-50 flex h-6 w-32 -translate-x-1/2 items-center justify-center rounded-b-2xl bg-gray-900">
                <div className="bg-gray-850 mb-1 h-1 w-12 rounded-full" />
              </div>

              {/* Mobile Content */}
              <div className="flex h-full w-full flex-col justify-between bg-[#FAFAFA] p-6 pt-10 font-sans text-xs dark:bg-[#0B0F19]">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 dark:text-[var(--orbit-text-muted)]">
                      DASHBOARD
                    </span>
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
                  </div>

                  <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]">
                    <span className="block text-xs font-bold tracking-wider text-gray-400 uppercase dark:text-[var(--orbit-text-muted)]">
                      Active Users
                    </span>
                    <span className="mt-1 block text-2xl font-black text-gray-900 dark:text-[var(--orbit-text-primary)]">
                      12,840
                    </span>
                    <span className="text-xs font-bold text-emerald-600">+18% this week</span>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-xs font-extrabold tracking-wider text-gray-400 uppercase dark:text-[var(--orbit-text-muted)]">
                      Push Events
                    </span>
                    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-2.5 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-50 text-[var(--orbit-accent-primary)]">
                        <Zap size={12} />
                      </div>
                      <div>
                        <span className="block text-xs font-extrabold text-gray-900 dark:text-[var(--orbit-text-primary)]">
                          Sign-up completed
                        </span>
                        <span className="block text-xs text-gray-400 dark:text-[var(--orbit-text-muted)]">
                          User #8942 logged in
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-2.5 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                        <Smartphone size={12} />
                      </div>
                      <div>
                        <span className="block text-xs font-extrabold text-gray-900 dark:text-[var(--orbit-text-primary)]">
                          In-App Purchase
                        </span>
                        <span className="block text-xs text-gray-400 dark:text-[var(--orbit-text-muted)]">
                          Upgrade to Pro confirmed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-[var(--orbit-border-subtle)]">
                  <span className="font-semibold text-gray-400 dark:text-[var(--orbit-text-muted)]">
                    Offline sync active
                  </span>
                  <span className="rounded border border-teal-200/50 bg-teal-50 px-2 py-0.5 text-xs font-bold text-[var(--orbit-accent-primary)] uppercase">
                    v2.0
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* -- FEATURES GRID -- */}
      <section className="border-t border-gray-100 bg-transparent px-6 py-24 dark:border-[var(--orbit-border-subtle)] dark:bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-16 max-w-2xl">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Capabilities
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-[var(--orbit-text-primary)]">
              Everything You Need to Scale
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            {[
              {
                title: 'Push Notification Gateway',
                desc: 'Target user segments based on trigger behavior rules with high-deliverability edge queues.',
              },
              {
                title: 'Offline Data Sync',
                desc: 'Queue operations locally while internet connection is drops. Sync perfectly on reconnect.',
              },
              {
                title: 'Universal App State',
                desc: 'Synchronize local state variables automatically with cloud servers via secure websocket relays.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border-2 border-gray-200 bg-white p-8 transition-all hover:border-[var(--orbit-accent-primary)]/30 max-sm:p-5 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
              >
                <h3 className="mb-2 text-2xl font-black text-gray-900 lg:text-lg dark:text-[var(--orbit-text-primary)]">
                  {f.title}
                </h3>
                <p className="text-lg leading-relaxed font-normal text-gray-500 lg:text-sm dark:text-[var(--orbit-text-muted)]">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- HOW IT WORKS -- */}
      <section className="border-t border-gray-100 bg-transparent px-6 py-24 dark:border-[var(--orbit-border-subtle)] dark:bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-16 max-w-2xl">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Process
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-[var(--orbit-text-primary)]">
              From Idea to Production
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="border-gray-250 flex flex-col justify-between rounded-3xl border bg-white p-8 text-left dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
              >
                <div>
                  <span className="mb-4 block font-mono text-3xl font-black text-[var(--orbit-accent-primary)]/20">
                    {step.num}
                  </span>
                  <h3 className="mb-2 text-2xl font-extrabold text-gray-900 lg:text-base dark:text-[var(--orbit-text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-lg leading-relaxed font-normal text-gray-500 lg:text-sm dark:text-[var(--orbit-text-muted)]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- PRICING -- */}
      <section className="border-t border-gray-100 bg-transparent px-6 py-24 dark:border-[var(--orbit-border-subtle)] dark:bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-16 max-w-2xl">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Pricing
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-[var(--orbit-text-primary)]">
              Start Free, Scale as You Grow
            </h2>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
            {plans.map((p) => {
              const isSelected = p.name === selectedPlan;
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
                    <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full border border-teal-200/50 bg-teal-50 px-2.5 py-0.5 text-xs font-bold tracking-wider text-teal-600 uppercase">
                      Popular
                    </div>
                  )}
                  <div>
                    <h3 className="mb-2 text-2xl font-black tracking-wider text-gray-900 uppercase lg:text-lg dark:text-white">
                      {p.name}
                    </h3>
                    <div className="mb-4 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-gray-900 lg:text-3xl dark:text-white">
                        ${p.price}
                      </span>
                      <span className="font-mono text-xs text-gray-400">/mo</span>
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
                    to="/auth"
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

      {/* -- FAQ -- */}
      <section className="border-y border-gray-100 bg-transparent px-6 py-24 dark:border-[var(--orbit-border-subtle)] dark:bg-transparent">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              FAQ
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 md:text-3xl lg:text-2xl dark:text-[var(--orbit-text-primary)]">
              Common Questions
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="cursor-pointer overflow-hidden rounded-2xl border border-gray-250 bg-white transition-all hover:border-[var(--orbit-accent-primary)]/40 hover:shadow-[0_0_20px_rgba(14,165,164,0.08)] dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
              >
                <div
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="text-xl font-bold text-gray-900 lg:text-sm dark:text-[var(--orbit-text-primary)]">
                    {faq.q}
                  </span>
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
                </div>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-xs leading-relaxed font-normal text-gray-600 dark:text-[var(--orbit-text-secondary)]">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- BOTTOM CTA -- */}
      <section className="relative overflow-hidden bg-transparent px-6 py-24 dark:bg-transparent">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-[var(--orbit-text-primary)]">
            Ready to Ship Your Next Big Idea?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-gray-500 dark:text-[var(--orbit-text-muted)]">
            Deploy your startup mobile app with push notifications, OTA synchronization, and
            analytics telemetry in minutes.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/auth/login"
              className="rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,165,164,0.2)]"
            >
              Get Started Free
            </Link>
            <Link
              to="/pricing-detailed"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-xs font-bold tracking-wider text-gray-800 uppercase transition-all hover:border-gray-400 dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)]"
            >
              Compare Plans <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeMobileApp;
