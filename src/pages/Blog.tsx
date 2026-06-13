import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Calendar, User, Clock, Tag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/vertex/Navbar';
import Footer from '../components/vertex/Footer';

const blogPosts = [
  {
    id: 1,
    title: '10 AI Workflows You Can Deploy in Under 5 Minutes',
    excerpt:
      'Discover how to connect Slack, Notion, and OpenAI to automate lead scoring, customer support responses, and data entry â€” without writing a single line of code.',
    cover:
      '/images/ai_feature_1.jpg',
    date: 'May 24, 2026',
    author: 'Elena Rostova',
    readTime: '4 min read',
    category: 'Automation',
    slug: 'ai-workflows-deploy-five-minutes',
    featured: true,
  },
  {
    id: 2,
    title: 'Why We Built OrbitFlow: The Future of Collaborative Orchestration',
    excerpt:
      "SaaS automation shouldn't require complex setups. Here is our vision for a visual developer-friendly automation engine.",
    cover:
      '/images/ai_feature_2.jpg',
    date: 'May 18, 2026',
    author: 'Marcus Webb',
    readTime: '6 min read',
    category: 'Engineering',
    slug: 'why-we-built-orbitflow',
    featured: false,
  },
  {
    id: 3,
    title: 'The Ultimate Guide to SOC2 Compliance for SaaS Startups',
    excerpt:
      'Keep client workflows secure. Learn how to configure sandboxed runners, key vault sharding, and database access logs.',
    cover:
      '/images/ai_feature_3.jpg',
    date: 'May 12, 2026',
    author: 'Anya Rossi',
    readTime: '8 min read',
    category: 'Security',
    slug: 'guide-soc2-compliance-saas',
    featured: false,
  },
  {
    id: 4,
    title: 'How to Build a Custom Customer Support Copilot with Webhooks',
    excerpt:
      'A step-by-step tutorial on building a context-aware chatbot using OpenAI API endpoints, Slack webhooks, and Google Docs.',
    cover:
      '/images/ai_feature_4.jpg',
    date: 'May 06, 2026',
    author: 'Sofia Delgado',
    readTime: '5 min read',
    category: 'AI Tutorials',
    slug: 'build-custom-support-copilot',
    featured: false,
  },
  {
    id: 5,
    title: 'Scaling Workflow Pipelines to 150M Monthly Executions',
    excerpt:
      "Behind the scenes: how OrbitFlow's distributed runtime handles massive concurrency using Go, Kafka, and edge runners across 12 regions.",
    cover:
      '/images/ai_bg_1.jpg',
    date: 'April 29, 2026',
    author: 'James Okafor',
    readTime: '7 min read',
    category: 'Engineering',
    slug: 'scaling-workflow-pipelines',
    featured: false,
  },
  {
    id: 6,
    title: "Design Principles Behind OrbitFlow's Visual Canvas",
    excerpt:
      'How we designed a node-based editor that feels intuitive for non-technical users while preserving full power for developers.',
    cover:
      '/images/ai_bg_2.jpg',
    date: 'April 21, 2026',
    author: 'Sofia Delgado',
    readTime: '5 min read',
    category: 'Design',
    slug: 'visual-canvas-design-principles',
    featured: false,
  },
  {
    id: 7,
    title: 'Mastering the AI Trigger: Best Practices for NLP Routing',
    excerpt:
      'Learn how to use natural language triggers to route incoming customer requests to the correct department with 99% accuracy.',
    cover:
      '/images/ai_office_1.jpg',
    date: 'April 14, 2026',
    author: 'Elena Rostova',
    readTime: '6 min read',
    category: 'AI Tutorials',
    slug: 'mastering-ai-trigger-nlp-routing',
    featured: false,
  },
  {
    id: 8,
    title: 'From Monolith to Serverless Micro-Automations',
    excerpt:
      'A deep dive into our architectural journey. How breaking down workflow steps into independent serverless functions reduced latency by 400%.',
    cover:
      '/images/ai_office_2.jpg',
    date: 'April 02, 2026',
    author: 'Marcus Webb',
    readTime: '9 min read',
    category: 'Engineering',
    slug: 'monolith-to-serverless-micro-automations',
    featured: false,
  },
  {
    id: 9,
    title: 'Introducing the New Teams Collaboration Feature',
    excerpt:
      'Collaborate on workflows in real-time. Role-based access control, version history, and inline comments are now live.',
    cover:
      '/images/ai_feature_1.jpg',
    date: 'March 28, 2026',
    author: 'Anya Rossi',
    readTime: '4 min read',
    category: 'Product Updates',
    slug: 'introducing-teams-collaboration',
    featured: false,
  },
  {
    id: 10,
    title: 'Automating Your FinOps: Real-time Cloud Cost Alerts',
    excerpt:
      'How to build a workflow that monitors your AWS bill and alerts your Slack channel before you blow through your monthly budget.',
    cover:
      '/images/ai_feature_2.jpg',
    date: 'March 15, 2026',
    author: 'James Okafor',
    readTime: '5 min read',
    category: 'Automation',
    slug: 'automating-finops-cloud-alerts',
    featured: false,
  },
];

const categories = [
  'All',
  'Automation',
  'Engineering',
  'Security',
  'AI Tutorials',
  'Design',
  'Product Updates',
];

export const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const featuredPost = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  const filteredPosts = (
    selectedCategory === 'All' && !searchQuery ? rest : blogPosts.filter((p) => !p.featured)
  ).filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const POSTS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const showFeatured = !searchQuery && selectedCategory === 'All';
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 transition-colors duration-300 dark:bg-[#0B0F19] dark:text-gray-100">
      <Navbar />
      <div className="h-20" />

      {/* â”€â”€ HERO HEADER â”€â”€ */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-transparent py-24 transition-colors duration-300 dark:border-gray-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="pointer-events-none absolute top-[-20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)]/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[300px] w-[500px] rounded-full bg-[#06B6D4]/15 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-6 text-center">
          <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-full border border-[var(--orbit-accent-primary)]/30 bg-[var(--orbit-accent-primary)]/10 px-4 py-1.5 shadow-[0_0_15px_rgba(14,165,164,0.15)]">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--orbit-accent-primary)] uppercase">
              OrbitFlow Resources
            </span>
          </div>
          <h1 className="text-5xl leading-[1.05] font-extrabold tracking-tight text-gray-900 md:text-7xl dark:text-white">
            The OrbitFlow{' '}
            <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(14,165,164,0.4)]">
              Blog
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed font-light tracking-wide text-gray-500 md:text-lg">
            Tutorials, product updates, engineering deep-dives, and automation playbooks from the
            engineers and designers behind OrbitFlow.
          </p>
        </div>
      </section>

      {/* â”€â”€ FILTER BAR â”€â”€ */}
      <section className="sticky top-[68px] z-30 border-b border-gray-100 bg-gray-50/50 py-6 backdrop-blur-sm transition-colors duration-300 dark:border-gray-800 dark:bg-[#111827]">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`cursor-pointer rounded-xl border px-4 py-1.5 text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'border-[var(--orbit-accent-primary)] bg-[var(--orbit-accent-primary)] text-white shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-60">
            <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-gray-200 bg-white py-2 pr-9 pl-10 text-xs text-gray-900 transition-all placeholder:text-gray-400 focus:border-[var(--orbit-accent-primary)]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* â”€â”€ FEATURED POST â”€â”€ */}
      {showFeatured && featuredPost && (
        <section className="bg-white px-6 py-16 transition-colors duration-300 dark:bg-[#0B0F19]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--orbit-accent-primary)]/10">
                <Tag size={16} className="text-[var(--orbit-accent-primary)]" />
              </span>
              <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Featured Article
              </h2>
            </div>
            <Link to={`/blog/${featuredPost.slug}`} className="group block">
              <div className="relative grid grid-cols-1 overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-[var(--orbit-accent-primary)] hover:shadow-[var(--orbit-accent-primary)]/20 hover:shadow-2xl lg:grid-cols-5 dark:border-gray-800 dark:bg-[#111827] dark:hover:border-[var(--orbit-accent-primary)]">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden lg:col-span-3 lg:aspect-auto">
                  <img
                    src={featuredPost.cover}
                    alt={`Featured article cover: ${featuredPost.title}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-6 left-6 rounded-lg border border-white/20 bg-white/20 px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md">
                    {featuredPost.category}
                  </span>
                </div>
                {/* Content */}
                <div className="flex flex-col justify-center p-8 transition-colors duration-300 md:p-12 lg:col-span-2">
                  <div className="mb-6 flex items-center gap-4 font-mono text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[var(--orbit-accent-primary)]" />{' '}
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[var(--orbit-accent-primary)]" />{' '}
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="mb-5 text-3xl leading-tight font-extrabold tracking-tight text-gray-900 transition-colors group-hover:text-[var(--orbit-accent-primary)] md:text-4xl dark:text-white dark:group-hover:text-teal-700 dark:text-teal-400">
                    {featuredPost.title}
                  </h2>
                  <p className="mb-8 text-base leading-relaxed font-light text-gray-600 dark:text-gray-300">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--orbit-accent-primary)]/20 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/40 dark:to-teal-900/20">
                        <User size={16} className="text-[var(--orbit-accent-primary)]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-xs tracking-widest text-gray-500 uppercase">
                          Author
                        </span>
                        <span className="text-sm font-extrabold text-gray-900 dark:text-gray-100">
                          {featuredPost.author}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--orbit-accent-primary)]/10 px-4 py-2 text-xs font-bold text-[var(--orbit-accent-primary)] transition-all group-hover:bg-[var(--orbit-accent-primary)] group-hover:text-white dark:text-teal-700 dark:text-teal-400">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* â”€â”€ ALL POSTS GRID â”€â”€ */}
      <section className="bg-gray-50/30 px-6 py-16 transition-colors duration-300 dark:bg-[#0B0F19]">
        <div className="mx-auto max-w-5xl">
          {!showFeatured && (
            <p className="leading-relaxed mb-8 font-mono text-xs font-bold tracking-widest text-gray-500 uppercase">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          )}
          {showFeatured && (
            <p className="leading-relaxed mb-8 font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Latest Articles
            </p>
          )}

          {filteredPosts.length === 0 ? (
            <div className="py-24 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-900">
                <Search size={20} className="text-gray-400" />
              </div>
              <h3 className="mb-1 text-base font-extrabold text-gray-900 dark:text-white">
                No articles found
              </h3>
              <p className="leading-relaxed mb-6 text-xs text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setCurrentPage(1);
                }}
                className="cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedPosts.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-gray-200/80 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl dark:border-gray-800 dark:bg-[#111827] dark:hover:border-gray-700"
                  >
                    {/* Cover */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <img
                        src={post.cover}
                        alt={`Article thumbnail: ${post.title}`}
                        width={360}
                        height={200}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 flex items-center gap-1 rounded-lg border border-white/50 bg-white/90 px-2.5 py-1 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/90 dark:text-teal-700 dark:text-teal-400">
                        <Tag size={8} /> {post.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-3 flex items-center gap-3 font-mono text-xs text-gray-400 uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar size={9} /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={9} /> {post.readTime}
                        </span>
                      </div>
                      <h2 className="mb-2 flex-1 text-base leading-snug font-bold text-gray-950 transition-colors group-hover:text-[var(--orbit-accent-primary)] dark:text-white dark:group-hover:text-teal-700 dark:text-teal-400">
                        {post.title}
                      </h2>
                      <p className="text-gray-505 mb-5 line-clamp-2 text-xs leading-relaxed font-normal dark:text-gray-500">
                        {post.excerpt}
                      </p>
                      <div className="dark:border-gray-850 flex items-center justify-between border-t border-gray-50 pt-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/20 dark:to-teal-900/10">
                            <User size={10} className="text-[var(--orbit-accent-primary)]" />
                          </div>
                          <span className="text-gray-605 text-xs font-bold dark:text-gray-300">
                            {post.author}
                          </span>
                        </div>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-gray-705 inline-flex items-center gap-1 text-xs font-bold transition-colors group-hover:text-[var(--orbit-accent-primary)] dark:text-teal-700 dark:text-teal-400"
                        >
                          Read{' '}
                          <ArrowRight
                            size={11}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination UI */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold tracking-wider text-gray-700 uppercase transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNumber = idx + 1;
                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => {
                          setCurrentPage(pageNumber);
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        className={`h-9 w-9 cursor-pointer rounded-xl text-xs font-bold transition-all ${
                          currentPage === pageNumber
                            ? 'bg-[var(--orbit-accent-primary)] text-white shadow-sm'
                            : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold tracking-wider text-gray-700 uppercase transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* â”€â”€ NEWSLETTER CTA â”€â”€ */}
      <section className="border-t border-gray-100 bg-white px-6 py-20 transition-colors duration-300 dark:border-gray-800 dark:bg-[#111827]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 block font-mono text-xs font-bold tracking-[0.3em] text-[var(--orbit-accent-primary)] uppercase">
            Stay Updated
          </span>
          <h2 className="mb-3 text-2xl leading-tight font-extrabold text-gray-900 md:text-3xl dark:text-white">
            Get new articles in your inbox.
          </h2>
          <p className="leading-relaxed mb-8 text-sm font-normal text-gray-500 dark:text-gray-500">
            Weekly drops â€” tutorials, engineering deep-dives, and automation playbooks. No spam,
            ever.
          </p>
          <div className="mx-auto flex max-w-md gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-900 transition-all focus:border-[var(--orbit-accent-primary)]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
             aria-label="your@email.com" />
            <button
              type="button"
              className="cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3 text-xs font-bold tracking-wider whitespace-nowrap text-white uppercase shadow-sm transition-all hover:shadow-[0_6px_20px_rgba(14,165,164,0.25)]"
            >
              Subscribe
            </button>
          </div>
          <p className="leading-relaxed mt-3 font-mono text-sm text-gray-500 dark:text-gray-500">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
