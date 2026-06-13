import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'Can I connect OrbitFlow with existing tools?',
    answer:
      'Yes. OrbitFlow integrates with Slack, Notion, TableSync, HubSpot, Zapier, and many other platforms.',
  },
  {
    question: 'Do I need coding knowledge to build workflows?',
    answer:
      'No. OrbitFlow provides a visual workflow builder designed for teams without technical experience.',
  },
  {
    question: 'How secure are AI workflows and automations?',
    answer:
      'OrbitFlow uses encrypted infrastructure, permission controls, and enterprise-grade security practices.',
  },
  {
    question: 'Can I customize workflows for my team?',
    answer:
      'Yes. Workflows, dashboards, permissions, and automations can all be tailored to your operations.',
  },
  {
    question: 'Does OrbitFlow support real-time analytics?',
    answer:
      'Absolutely. Monitor workflow performance, AI activity, and operational metrics in real time.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Yes. OrbitFlow offers a free trial so teams can explore workflows and automation capabilities before upgrading.',
  },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
      className="elite-card group flex cursor-pointer flex-col rounded-2xl p-4 text-left transition-all hover:border-[var(--orbit-accent-primary)]/40 hover:shadow-[0_0_20px_rgba(14,165,164,0.08)] md:p-6"
    >
      <div
        className="flex w-full items-center justify-between gap-5 text-left"
      >
        <h3 className="text-lg leading-snug font-bold text-gray-900 dark:text-white">
          {question}
        </h3>
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-200/80 bg-gray-50 text-gray-500 transition-colors group-hover:border-[var(--orbit-accent-primary)]/40 group-hover:text-[var(--orbit-accent-primary)] md:h-8 md:w-8 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Plus size={12} strokeWidth={3} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-3 text-sm leading-relaxed font-normal text-gray-600 dark:text-gray-300">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQAccordion = () => {
  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden bg-white dark:bg-[#0B0F19] py-[clamp(4rem,8vw,6rem)]"
      id="faq"
    >
      {/* Signature vertical rhythm lines */}
      <div className="bg-vertical-grid" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-16">
          {/* Left Column - Sticky Section Header */}
          <div className="space-y-4 text-left lg:sticky lg:top-28 lg:col-span-5">
            <div>
              <span className="mb-2 block font-mono text-base font-bold tracking-[0.2em] text-[var(--orbit-accent-primary)] uppercase">
                FAQ
              </span>
              <h2 className="mb-2 text-fluid-5xl leading-tight font-extrabold tracking-tight text-gray-900 dark:text-white">
                Frequently asked <br />
                questions.
              </h2>
              <p className="max-w-sm text-lg leading-relaxed text-gray-500 sm:text-xl dark:text-gray-500">
                Everything you need to know about OrbitFlow, integrations, workflows, and AI
                automation.
              </p>
            </div>

            <div className="pt-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-4 py-2 text-sm font-bold text-gray-800 shadow-sm transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-800 dark:text-gray-200 dark:hover:border-gray-200 dark:hover:text-white"
              >
                <span>Contact Support</span>
                <span className="text-gray-400 dark:text-gray-500">{'->'}</span>
              </Link>
            </div>
          </div>

          {/* Right Column - Stack of Accordions */}
          <div className="space-y-3 lg:col-span-7">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
