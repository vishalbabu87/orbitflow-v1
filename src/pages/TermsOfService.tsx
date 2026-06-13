import { motion } from 'framer-motion';
import {
  FileText,
  Shield,
  CreditCard,
  AlertTriangle,
  Globe,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';

const sections = [
  {
    number: '1',
    icon: FileText,
    title: 'Acceptance of Terms',
    content: [
      'By accessing or using OrbitFlow - including its dashboard, API, and all associated services - you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.',
      'If you are using OrbitFlow on behalf of an organization, you represent and warrant that you have authority to bind that organization to these terms.',
      'These Terms apply to all visitors, users, and others who access the Service.',
    ],
  },
  {
    number: '2',
    icon: Shield,
    title: 'Use of Service',
    content: [
      'You agree to use OrbitFlow only for lawful orchestration purposes and in full compliance with all applicable laws and regulations.',
      'You are fully responsible for all workflows configured inside your account, all credentials you authorize, and all data processed through the platform.',
      "You may not use the Service to: scrape or harvest data without permission, send spam, distribute malware, or interfere with other users' access.",
      'We reserve the right to suspend or terminate accounts found in violation of these terms, with or without prior notice.',
    ],
  },
  {
    number: '3',
    icon: CreditCard,
    title: 'Account & Billing',
    content: [
      'You must provide accurate registration information and keep your login credentials confidential. Notify us immediately of any unauthorized account access.',
      'Subscription fees are billed monthly or annually in advance, depending on your plan. All fees are non-refundable except as required by law.',
      "We may change pricing with 30 days' notice. Continued use after notice constitutes acceptance of new pricing.",
      'Your subscription auto-renews unless cancelled before the billing date. You can cancel at any time from the account settings.',
    ],
  },
  {
    number: '4',
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    content: [
      'OrbitFlow is provided "as is" and "as available" without warranties of any kind, express or implied.',
      'We are not liable for any indirect, incidental, or consequential damages arising from your use of the Service.',
      'We are not responsible for service interruptions, API connection failures from third-party integrations, or loss of data resulting from execution errors in custom code blocks.',
      "In no event shall OrbitFlow's total liability to you exceed the amounts paid by you during the 12 months preceding the claim.",
    ],
  },
  {
    number: '5',
    icon: Globe,
    title: 'Intellectual Property',
    content: [
      'OrbitFlow and its original content, features, and functionality are and will remain the exclusive property of OrbitFlow, Inc. and its licensors.',
      'You retain ownership of all data, workflows, and content you create through the Service.',
      'By using OrbitFlow, you grant us a limited license to host and process your data solely to provide and improve the Service.',
      'You may not copy, modify, or reverse-engineer any part of our platform without prior written consent.',
    ],
  },
  {
    number: '6',
    icon: RefreshCw,
    title: 'Changes & Termination',
    content: [
      "We may update these Terms at any time. We will provide at least 30 days' notice for material changes via email or in-app notification.",
      'Continued use of the Service after the effective date of changes constitutes acceptance of the revised Terms.',
      'You may terminate your account at any time. We may terminate your access for breach of these Terms.',
      'Upon termination, your right to use the Service ceases immediately. Provisions that by their nature survive termination will remain in effect.',
    ],
  },
];

const TermsOfService = () => (
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
            <FileText size={12} />
            Legal
          </div>
          <h1 className="mb-5 text-4xl leading-tight font-black tracking-tight md:text-5xl">
            Terms of Service
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--orbit-text-secondary)]">
            Please read these terms carefully before using OrbitFlow. They govern your access to and
            use of our platform, services, and APIs.
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
                  {section.number}. {section.title}
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

        {/* Governing Law */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-elevated)] p-6 text-sm text-[var(--orbit-text-secondary)]"
        >
          <p className="leading-relaxed mb-2 font-semibold text-[var(--orbit-text-primary)]">Governing Law</p>
          <p>
            These Terms are governed by the laws of the State of California, United States, without
            regard to its conflict of law principles. Any disputes shall be resolved exclusively in
            the state or federal courts located in San Francisco, California.
          </p>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/5 p-6 text-center"
        >
          <p className="leading-relaxed text-sm text-[var(--orbit-text-secondary)]">
            If you have questions about these Terms, please contact us at{' '}
            <a
              href="mailto:legal@orbitflow.io"
              className="font-semibold text-[var(--orbit-accent-primary)] hover:underline"
            >
              legal@orbitflow.io
            </a>
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link
              to="/privacy-policy"
              className="text-xs font-semibold text-[var(--orbit-accent-primary)] hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="text-[var(--orbit-text-muted)]">-</span>
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

export default TermsOfService;
