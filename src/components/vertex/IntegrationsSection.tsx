import { motion } from 'framer-motion';
import {
  Mail,
  Calendar,
  Cloud,
  MessageSquare,
  Trello,
  Database,
  Code2,
  BarChart3,
} from 'lucide-react';

const integrationCategories = [
  {
    name: 'Email',
    description: 'Mailchimp, Outlook',
    icon: Mail,
  },
  {
    name: 'Calendar',
    description: 'Google, Cal.com',
    icon: Calendar,
  },
  {
    name: 'Storage',
    description: 'Drive, Dropbox',
    icon: Cloud,
  },
  {
    name: 'Messaging',
    description: 'Slack, Discord',
    icon: MessageSquare,
  },
  {
    name: 'Projects',
    description: 'Notion, Trello',
    icon: Trello,
  },
  {
    name: 'Databases',
    description: 'Postgres, Mongo',
    icon: Database,
  },
  {
    name: 'Dev Tools',
    description: 'GitHub, Vercel',
    icon: Code2,
  },
  {
    name: 'Analytics',
    description: 'Mixpanel, GA4',
    icon: BarChart3,
  },
];

export const IntegrationsSection = () => {
  return (
    <section
      id="integrations"
      className="relative flex flex-col justify-center overflow-hidden bg-white py-12 md:py-28 dark:bg-transparent"
    >
      {/* Signature vertical rhythm lines */}
      <div className="bg-vertical-grid" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl md:mb-16">
          <span className="mb-4 block font-mono text-sm font-bold tracking-[0.2em] text-[var(--orbit-accent-primary)] uppercase">
            Integrations
          </span>
          <h2 className="mb-4 text-2xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
            Works With Your{' '}
            <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
              Favorite Tools
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 md:text-base dark:text-gray-500">
            Seamlessly connect with 150+ apps and services you already use every day.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {integrationCategories.map((category, i) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:border-[var(--orbit-accent-primary)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] dark:border-gray-800 dark:bg-[#111827] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]"
              >
                {/* Icon Container with subtle background wash */}
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--orbit-accent-primary)]/10 transition-transform duration-300 group-hover:scale-110 dark:bg-[var(--orbit-accent-primary)]/20">
                  <IconComponent
                    size={20}
                    className="text-[var(--orbit-accent-primary)]"
                    strokeWidth={2}
                  />
                </div>

                {/* Name */}
                <h3 className="mb-0.5 text-sm font-extrabold text-gray-900 dark:text-white">
                  {category.name}
                </h3>

                {/* Description / Subtext */}
                <p className="font-mono text-xs leading-none tracking-tight text-gray-500 uppercase dark:text-gray-500">
                  {category.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
