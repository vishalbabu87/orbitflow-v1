import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, UserCheck, Mail, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: [
      'Account information (name, email, company) when you register for OrbitFlow.',
      'Usage data including workflows executed, pages visited, features used, and performance metrics.',
      'Device information: browser type, OS, IP address, and session timestamps.',
      'Payment data processed securely through our PCI-DSS compliant billing partner - we never store raw card numbers.',
      'Communications you send us (support tickets, demo requests, feedback forms).',
    ],
  },
  {
    icon: Database,
    title: 'How We Use Your Information',
    content: [
      'Provide, operate, and improve OrbitFlow products and services.',
      'Send product updates, security alerts, and transactional emails related to your account.',
      'Analyze usage patterns to build better features and resolve performance issues.',
      'Comply with legal obligations and enforce our Terms of Service.',
      'Personalise the dashboard experience based on your connected integrations and preferences.',
    ],
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: [
      'All data in transit is encrypted using TLS 1.3 (HTTPS). Data at rest is encrypted with AES-256.',
      'We perform regular third-party penetration tests and security audits.',
      'Access to production systems is restricted via MFA and role-based permissions.',
      'Our infrastructure runs on SOC 2 Type II certified cloud providers (AWS).',
      'In the event of a breach, we will notify affected users within 72 hours per GDPR requirements.',
    ],
  },
  {
    icon: UserCheck,
    title: 'Your Rights & Choices',
    content: [
      'Access: Request a copy of all personal data we hold about you at any time.',
      'Correction: Update or correct inaccurate information via your account settings.',
      'Deletion: Request deletion of your account and associated data ("right to be forgotten").',
      'Portability: Export your data in machine-readable JSON/CSV format.',
      'Opt-out: Unsubscribe from marketing emails at any time via the link in each email.',
    ],
  },
  {
    icon: Shield,
    title: 'Cookies & Tracking',
    content: [
      'We use strictly necessary cookies for authentication and session management.',
      'Optional analytics cookies (Plausible/PostHog) collect anonymous, aggregated page-view data. No cross-site tracking.',
      'We do not sell your data to third parties or use it for behavioural advertising.',
      'You can clear or disable cookies in your browser settings at any time.',
    ],
  },
  {
    icon: Mail,
    title: 'Contact & Complaints',
    content: [
      'For privacy inquiries or data requests, email us at: privacy@orbitflow.io',
      'For EU/UK users, our Data Protection Officer (DPO) can be reached at: privacy@orbitflow.io',
      'We will respond to all verified requests within 30 days.',
      'If you believe we have violated your privacy rights, you may lodge a complaint with your local supervisory authority.',
    ],
  },
];

const PrivacyPolicy: React.FC = () => (
  <div className="min-h-screen bg-[var(--orbit-base)] text-[var(--orbit-text-primary)]">
    <Navbar />

    {/* Hero Banner */}
    <section className="relative overflow-hidden pt-48 pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)]/6 blur-[120px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-4 py-1.5 font-mono text-xs tracking-widest text-[var(--orbit-accent-primary)] uppercase">
            <Shield size={12} />
            Legal
          </div>
          <h1 className="mb-5 text-4xl leading-tight font-black tracking-tight md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--orbit-text-secondary)]">
            We respect your privacy and are committed to protecting your personal data. This policy
            explains what we collect, why, and how you can control it.
          </p>
          <p className="leading-relaxed mt-4 font-mono text-sm text-[var(--orbit-text-muted)]">
            Last updated: May 28, 2025 &nbsp;-&nbsp; Effective: June 1, 2025
          </p>
        </motion.div>
      </div>
    </section>

    {/* Content */}
    <section className="pb-28">
      <div className="mx-auto max-w-4xl space-y-6 px-6">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-8 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--orbit-accent-primary)]/10">
                  <Icon size={18} className="text-[var(--orbit-accent-primary)]" />
                </div>
                <h2 className="text-xl font-bold text-[var(--orbit-text-primary)]">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[var(--orbit-text-secondary)]"
                  >
                    <ChevronRight
                      size={14}
                      className="mt-0.5 shrink-0 text-[var(--orbit-accent-primary)]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/5 p-6 text-center"
        >
          <p className="leading-relaxed text-sm text-[var(--orbit-text-secondary)]">
            By using OrbitFlow, you agree to this Privacy Policy. We may update this document
            periodically - we will notify you of material changes via email or an in-app
            notification.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link
              to="/terms-of-service"
              className="text-xs font-semibold text-[var(--orbit-accent-primary)] hover:underline"
            >
              Terms of Service
            </Link>
            <span className="text-[var(--orbit-border-mid)]">-</span>
            <Link
              to="/contact"
              className="text-xs font-semibold text-[var(--orbit-accent-primary)] hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default PrivacyPolicy;
