import { motion } from 'framer-motion';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';
import { ChevronRight, HelpCircle, ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: 'How does OrbitFlow execute automation workflows?',
    answer:
      'OrbitFlow uses an event-driven worker network to execute multi-step pipelines. When a trigger event is received (via webhook, email, or API), our engine processes the payload in isolated enclaves, runs any AI logic, and dispatches actions to connected systems in sub-50ms.',
  },
  {
    question: 'What apps can I integrate with OrbitFlow?',
    answer:
      'We support direct connectors for Slack, HubSpot, Mailchimp, Notion, GitHub, Linear, Stripe, Google Drive, Salesforce, and Zapier. You can also connect custom private endpoints using our Webhook and API nodes.',
  },
  {
    question: 'Is my workspace and AI data secure?',
    answer:
      'Yes, security is our primary focus. OrbitFlow is SOC2 compliant and GDPR ready. Every execution runs in a sandboxed, isolated environment. We encrypt all data in transit using TLS 1.3 and at rest with AES-256 multi-shard vault locks. Your AI prompt payloads are never stored or used to train external models.',
  },
  {
    question: 'What happens if a workflow run fails or errors?',
    answer:
      'OrbitFlow tracks failures with exact trace IDs and provides automatic exponential backoff retries for third-party rate limits (like HTTP 429). You receive instant alerts in Slack or via push notification, and can review detailed step-by-step logs to debug and manually trigger retries.',
  },
  {
    question: 'Can I self-host OrbitFlow worker nodes?',
    answer:
      "Yes, our Enterprise plan supports deploying private execution worker nodes inside your AWS or GCP VPC using Docker containers. This keeps sensitive data fully local while using OrbitFlow's cloud command center for mapping logic.",
  },
  {
    question: 'Is there a limit to the number of automated tasks?',
    answer:
      'Each pricing tier includes a monthly task run quota. Starter has 10,000 tasks/mo, Pro has 1,000,000 tasks/mo, and Enterprise offers custom high-throughput quotas. If you exceed your quota, tasks queue rather than drop, and we alert you to adjust settings.',
  },
];

export const FAQ = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-gray-900 selection:bg-[var(--orbit-accent-primary)]/30 dark:text-[var(--orbit-text-primary)]">
      <Navbar />

      <main className="relative flex-grow px-6 pt-32 pb-20">
        {/* Signature vertical rhythm lines */}
        <div className="bg-vertical-grid" />

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-20 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-4 block font-mono text-xs font-bold tracking-[0.4em] text-[var(--orbit-accent-primary)] uppercase"
            >
              KNOWLEDGE BASE
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-6 font-sans text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl dark:text-[var(--orbit-text-primary)]"
            >
              Frequently Asked <br />
              <span className="font-display font-normal text-gray-400 italic dark:text-[var(--orbit-text-muted)]">
                Questions
              </span>
            </motion.h1>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 dark:text-[var(--orbit-text-muted)]">
              Everything you need to know about setting up integrations, AI nodes, and managing
              automated pipelines on OrbitFlow.
            </p>
          </div>

          {/* FAQs List */}
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-gray-200 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
              >
                <div className="mb-3 flex items-start gap-4">
                  <div className="mt-0.5 shrink-0 rounded-xl border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 p-2 text-[var(--orbit-accent-primary)]">
                    <HelpCircle size={16} />
                  </div>
                  <h3 className="text-base font-bold tracking-tight text-gray-900 dark:text-[var(--orbit-text-primary)]">
                    {faq.question}
                  </h3>
                </div>
                <p className="pl-12 text-sm leading-relaxed text-gray-500 dark:text-[var(--orbit-text-muted)]">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Help Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] md:flex-row dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--orbit-accent-primary)]/10 text-[var(--orbit-accent-primary)]">
                <ChevronRight size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-[var(--orbit-text-primary)]">
                  Still have questions?
                </h4>
                <p className="leading-relaxed mt-0.5 text-xs text-gray-500 dark:text-[var(--orbit-text-muted)]">
                  Can't find the answer you're looking for? Reach out to support.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition-all hover:bg-[#0C8F8E]"
            >
              Contact Support <ArrowRight size={12} />
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
