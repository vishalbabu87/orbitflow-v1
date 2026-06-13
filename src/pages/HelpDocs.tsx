import { useState } from 'react';
import { HelpCircle, Search, Book, MessageCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HelpDocs = () => {
  const [query, setQuery] = useState('');

  const categories = [
    {
      title: 'Getting Started',
      desc: 'Learn the basics of OrbitFlow.',
      icon: Book,
      link: '/docs/getting-started',
    },
    {
      title: 'API Reference',
      desc: 'Integrate with our endpoints.',
      icon: FileText,
      link: '/docs/api',
    },
    {
      title: 'Community Support',
      desc: 'Ask questions in our forums.',
      icon: MessageCircle,
      link: '/community',
    },
  ];

  const filteredCategories = categories.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="animate-in fade-in relative mx-auto w-full max-w-7xl flex-1 p-4 pt-6 text-left duration-500">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--orbit-accent-primary)]/10">
            <HelpCircle size={32} className="text-[var(--orbit-accent-primary)]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--orbit-text-primary)] sm:text-3xl">
            How can we help?
          </h1>
          <p className="leading-relaxed mt-2 text-sm text-[var(--orbit-text-secondary)]">
            Search our documentation, tutorials, and knowledge base.
          </p>

          <div className="relative mx-auto mt-6 max-w-xl">
            <Search
              className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--orbit-text-muted)]"
              size={18}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full rounded-2xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] py-3 pr-4 pl-12 text-sm focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="block cursor-pointer rounded-2xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] p-6 transition-all hover:border-[var(--orbit-accent-primary)]/50 hover:bg-[var(--orbit-elevated)]"
              >
                <item.icon size={24} className="mb-4 text-[var(--orbit-accent-primary)]" />
                <h3 className="mb-2 text-base font-bold text-[var(--orbit-text-primary)]">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-sm text-[var(--orbit-text-secondary)]">{item.desc}</p>
              </Link>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center text-sm text-[var(--orbit-text-muted)]">
              No articles found matching "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpDocs;
