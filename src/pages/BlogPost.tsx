import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Twitter,
  Linkedin,
  Copy,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Navbar } from '../components/vertex/Navbar';
import Footer from '../components/vertex/Footer';

const blogPosts = [
  {
    id: 1,
    title: '10 AI Workflows You Can Deploy in Under 5 Minutes',
    excerpt:
      'Discover how to connect Slack, Notion, and OpenAI to automate lead scoring, customer support responses, and data entry.',
    cover:
      '/images/ai_feature_1.jpg',
    date: 'May 24, 2026',
    author: 'Elena Rostova',
    authorRole: 'Head of Automation Research',
    authorAvatar:
      '/images/avatars/aria.svg',
    category: 'Automation',
    readTime: '4 min read',
    slug: 'ai-workflows-deploy-five-minutes',
    content: `
      <p>Automation used to require complex backend infrastructure and custom scripting. With OrbitFlow, you can construct custom event chains that ingest data, reason using models, and output actions in seconds.</p>

      <h2>1. Automated Support Routing</h2>
      <p>Instead of manually prioritizing and routing support tickets, you can set up a simple workflow in less than five minutes:</p>
      <ul>
        <li><strong>Trigger:</strong> New ticket received in Zendesk or Intercom.</li>
        <li><strong>AI Action:</strong> Run prompt to classify severity (High, Medium, Low) and extract language.</li>
        <li><strong>Action:</strong> If high priority, ping your team in Slack; otherwise, log to Notion database.</li>
      </ul>

      <h2>2. AI-Powered Lead Enrichment</h2>
      <p>When a new lead fills out a form on your landing page, enrich the details automatically. Connect a webhook trigger from your form tool to OrbitFlow. Send the email domain to an AI block that extracts company details, size, and funding logs, then updates HubSpot CRM directly. Your sales representatives will receive fully enriched details before they place their first call.</p>

      <h2>3. Daily Summary Generation</h2>
      <p>Collate your operations updates. Trigger a pipeline at 5 PM every day that aggregates Slack logs or Notion tasks from the last 24 hours, summarizes them using the copilot node, and emails a clean bullet list to your inbox.</p>

      <h2>4. Invoice Auto-Processing</h2>
      <p>Connect your email inbox trigger to an AI extraction block. When an invoice PDF arrives, parse the vendor name, amount, and due date automatically. Route to your accounting software and Slack your finance team with a digest â€” no manual entry required.</p>

      <h2>5. Customer Churn Early Warning</h2>
      <p>Set a scheduled trigger that runs daily against your product analytics data. Flag accounts that have dropped below usage thresholds, enrich with CRM context, and automatically create follow-up tasks for your customer success team.</p>
    `,
  },
  {
    id: 2,
    title: 'Why We Built OrbitFlow: The Future of Collaborative Orchestration',
    excerpt:
      "SaaS automation shouldn't require complex setups. Here is our vision for a visual developer-friendly automation engine.",
    cover:
      '/images/ai_feature_3.jpg',
    date: 'May 18, 2026',
    author: 'Marcus Webb',
    authorRole: 'Co-Founder & CEO',
    authorAvatar:
      '/images/avatars/marcus.svg',
    category: 'Engineering',
    readTime: '6 min read',
    slug: 'why-we-built-orbitflow',
    content: `
      <p>At OrbitFlow, we believe software should adjust to how teams operate, not the other way around. Most workflow builders are either too basic or require deep scripting knowledge. OrbitFlow bridges this gap with a collaborative, drag-and-drop workspace powered by embedded intelligence.</p>

      <h2>The Core Dilemma</h2>
      <p>Modern enterprises run on dozens of SaaS platforms. When teams want to sync data across these platforms, they face a choice: write and host custom scripts, or use builders that fail when complex logic or transformations are needed.</p>

      <h2>Enter Visual Pipelines</h2>
      <p>Our goal was to make pipelines representable as standard node charts. When you build a flow in OrbitFlow, you are arranging blocks that map variables, apply conditional rules, and track triggers in a visual sandbox. Adding an AI block lets you apply custom logic easily, bringing developer-level capabilities to everyone.</p>

      <h2>The Technical Architecture</h2>
      <p>Under the hood, every workflow is compiled into a deterministic execution graph. Nodes are isolated runtime containers with defined input/output schemas. This means workflows are testable, versionable, and auditable â€” just like code.</p>
    `,
  },
  {
    id: 3,
    title: 'The Ultimate Guide to SOC2 Compliance for SaaS Startups',
    excerpt:
      'Keep client workflows secure. Learn how to configure sandboxed runners, key vault sharding, and database access logs.',
    cover:
      '/images/ai_bg_1.jpg',
    date: 'May 12, 2026',
    author: 'Anya Rossi',
    authorRole: 'VP of Engineering',
    authorAvatar:
      '/images/avatars/sofia.svg',
    category: 'Security',
    readTime: '8 min read',
    slug: 'guide-soc2-compliance-saas',
    content: `
      <p>Security is not just a checkbox; it is a core business requirement. As startups handle increasingly sensitive customer data, SOC2 compliance becomes a key gatekeeper for unlocking enterprise clients. Here is how OrbitFlow protects your operational workflows.</p>

      <h2>1. Encrypted Environment Variable Vaults</h2>
      <p>All credentials, access tokens, and API keys used inside your pipelines are encrypted using bank-grade AES-256 sharding. Nodes only access decryption keys during active runtime. No database holds decrypted keys at rest.</p>

      <h2>2. Sandboxed Isolated Runners</h2>
      <p>Every single task trigger and custom code execution runs in fully isolated, virtualized sandboxes. This prevents memory leakage across pipelines and protects system integrity from malicious actions.</p>

      <h2>3. Audit Logs and Immutable Trails</h2>
      <p>Every execution event, credential access, and configuration change is logged to an append-only audit ledger. Logs are cryptographically signed and can be exported to your SIEM of choice.</p>
    `,
  },
  {
    id: 4,
    title: 'How to Build a Custom Customer Support Copilot with Webhooks',
    excerpt:
      'A step-by-step tutorial on building a context-aware chatbot using OpenAI API endpoints, Slack webhooks, and Google Docs.',
    cover:
      '/images/ai_office_1.jpg',
    date: 'May 06, 2026',
    author: 'Sofia Delgado',
    authorRole: 'Head of Design',
    authorAvatar:
      '/images/avatars/aria.svg',
    category: 'AI Tutorials',
    readTime: '5 min read',
    slug: 'build-custom-support-copilot',
    content: `
      <p>Providing instant customer support answers is a superpower for startups. By combining OpenAI's model nodes with simple webhook triggers in OrbitFlow, you can deploy a custom support assistant in minutes.</p>

      <h2>Prerequisites</h2>
      <p>You will need a Slack workspace, an OpenAI API account, and an active OrbitFlow account.</p>

      <h2>Step 1: The Trigger</h2>
      <p>Set up a webhook trigger block that listens for new message events in your support channel. Map the incoming text value and user ID parameters to downstream logic blocks.</p>

      <h2>Step 2: AI Logic</h2>
      <p>Feed the user's question into an OpenAI block. Supply your docs URL or copy customer guides into the system prompt to guide the AI's responses accurately.</p>

      <h2>Step 3: Reply Action</h2>
      <p>Connect the AI block output to a Slack action node. Map the response field to the message body and the original channel ID to the target. Your copilot is live.</p>
    `,
  },
  {
    id: 5,
    title: 'Scaling Workflow Pipelines to 150M Monthly Executions',
    excerpt:
      "Behind the scenes: how OrbitFlow's distributed runtime handles massive concurrency using Go, Kafka, and edge runners.",
    cover:
      '/images/ai_feature_1.jpg',
    date: 'April 29, 2026',
    author: 'James Okafor',
    authorRole: 'Lead Architect',
    authorAvatar:
      '/images/avatars/marcus.svg',
    category: 'Engineering',
    readTime: '7 min read',
    slug: 'scaling-workflow-pipelines',
    content: `<p>Scaling distributed systems is hard. Scaling them while maintaining sub-100ms execution latency for every user is harder. This is the story of how we did it.</p><h2>The Architecture</h2><p>OrbitFlow's execution engine is built on Go, with Kafka as the event backbone. Every workflow trigger publishes an event to a partition-keyed topic. Workers consume from partitions in parallel, executing node graphs concurrently where the DAG allows.</p>`,
  },
  {
    id: 6,
    title: "Design Principles Behind OrbitFlow's Visual Canvas",
    excerpt:
      'How we designed a node-based editor that feels intuitive for non-technical users while preserving full power for developers.',
    cover:
      '/images/ai_feature_3.jpg',
    date: 'April 21, 2026',
    author: 'Sofia Delgado',
    authorRole: 'Head of Design',
    authorAvatar:
      '/images/avatars/sofia.svg',
    category: 'Design',
    readTime: '5 min read',
    slug: 'visual-canvas-design-principles',
    content: `<p>When we started designing OrbitFlow's canvas, we had one principle: it should feel obvious. Every interaction had to be discoverable without documentation.</p><h2>Spatial Mental Models</h2><p>Users think of workflows as flows â€” left to right, top to bottom. We designed the canvas to match this mental model exactly. Triggers go on the left, actions on the right. Conditions branch downward.</p>`,
  },
  {
    id: 7,
    title: 'Mastering the AI Trigger: Best Practices for NLP Routing',
    excerpt:
      'Learn how to use natural language triggers to route incoming customer requests to the correct department with 99% accuracy.',
    cover:
      '/images/ai_bg_1.jpg',
    date: 'April 14, 2026',
    author: 'Elena Rostova',
    authorRole: 'Head of Automation Research',
    authorAvatar:
      '/images/avatars/aria.svg',
    category: 'AI Tutorials',
    readTime: '6 min read',
    slug: 'mastering-ai-trigger-nlp-routing',
    content: `
      <p>Natural Language Processing (NLP) has changed how we think about automation triggers. Instead of static inputs and rigid API endpoints, you can trigger complex workflows using unstructured conversational language.</p>

      <h2>1. The Power of Intent Classification</h2>
      <p>Traditionally, routing customer requests required complex forms with dozens of dropdown selections. With NLP-driven trigger nodes, OrbitFlow analyzes the user's intent automatically from their message body. The trigger classifies the message into departments like billing, sales, technical support, or enterprise relations before invoking specialized sub-workflows.</p>

      <h2>2. Semantic Routing Strategies</h2>
      <p>Once the intent is determined, OrbitFlow maps it to dynamic webhook pathways. High-priority accounts or billing queries route directly to emergency queues, while basic help queries are resolved automatically by retrieving answers from your documentation vault. This keeps response times low and ensures teams only focus on high-touch issues.</p>

      <h2>3. Extracting Entities in Real-Time</h2>
      <p>Beyond classifying intent, NLP routing nodes extract structured entities (such as account numbers, email addresses, order IDs, or names) from the message text, passing them directly to variables in subsequent actions. No manual data copy-pasting is required.</p>
    `,
  },
  {
    id: 8,
    title: 'From Monolith to Serverless Micro-Automations',
    excerpt:
      'A deep dive into our architectural journey. How breaking down workflow steps into independent serverless functions reduced latency by 400%.',
    cover:
      '/images/ai_office_1.jpg',
    date: 'April 02, 2026',
    author: 'Marcus Webb',
    authorRole: 'Co-Founder & CEO',
    authorAvatar:
      '/images/avatars/marcus.svg',
    category: 'Engineering',
    readTime: '9 min read',
    slug: 'monolith-to-serverless-micro-automations',
    content: `
      <p>When we launched our first beta of OrbitFlow, the engine ran as a unified monolithic service. It was straightforward to debug, but as our user base grew to 500M+ daily task executions, we hit a scalability wall. Here is how we migrated to serverless micro-automations.</p>

      <h2>1. The Monolith Bottleneck</h2>
      <p>In our monolithic setup, a long-running HTTP request or heavy data-enrichment task would block resource execution threads for other concurrent workflows. Scaling the monolith meant replicating the entire stack, leading to high infrastructure costs and inefficient CPU utilization.</p>

      <h2>2. Decoupling the Runtime</h2>
      <p>We decomposed our execution runtime into isolated, stateless serverless worker nodes. Each worker is responsible for executing a single step type (e.g., executing a database query, requesting an LLM completion, or sending a slack message). Worker nodes spin up on-demand, execute their specific tasks, and spin down instantly.</p>

      <h2>3. The Performance Gains</h2>
      <p>By shifting to serverless micro-automations, we reduced average node execution start latency from 450ms to 90ms. Furthermore, our infrastructure bill dropped by 60% as we are now only paying for the precise milliseconds that a task is actively processing.</p>
    `,
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
    authorRole: 'VP of Engineering',
    authorAvatar:
      '/images/avatars/sofia.svg',
    category: 'Product Updates',
    readTime: '4 min read',
    slug: 'introducing-teams-collaboration',
    content: `
      <p>Automation is no longer a solo sport. Today we are launching OrbitFlow Teams, a brand new suite of collaboration tools that let teams design, debug, and govern visual workflows together.</p>

      <h2>1. Real-Time Collaborative Canvas</h2>
      <p>See exactly what your team members are working on. With cursor tracking and multiplayer canvas states, multiple developers can configure node paths, adjust webhook rules, and wire up AI blocks on the same screen concurrently. No merge conflicts, no sync lag.</p>

      <h2>2. Granular Role-Based Access Control</h2>
      <p>Protect production flows while enabling sandbox experimentation. Assign custom roles (Viewer, Editor, Deployer, Admin) to ensure that only approved team members can update active production webhooks or publish live changes.</p>

      <h2>3. Version Control and History Trails</h2>
      <p>Every canvas save automatically commits a snapshot to the workflow version history ledger. Roll back to any previous state with a single click, complete with comments and a detailed visual diff showing exactly which nodes changed.</p>
    `,
  },
  {
    id: 10,
    title: 'Automating Your FinOps: Real-time Cloud Cost Alerts',
    excerpt:
      'How to build a workflow that monitors your AWS bill and alerts your Slack channel before you blow through your monthly budget.',
    cover:
      '/images/ai_feature_3.jpg',
    date: 'March 15, 2026',
    author: 'James Okafor',
    authorRole: 'Lead Architect',
    authorAvatar:
      '/images/avatars/aria.svg',
    category: 'Automation',
    readTime: '5 min read',
    slug: 'automating-finops-cloud-alerts',
    content: `
      <p>Cloud costs can spiral out of control in hours. A runaway loop or an over-provisioned database can run up thousands of dollars in bills before your next billing cycle. Here is how to automate cloud alerts in real-time.</p>

      <h2>1. The FinOps Challenge</h2>
      <p>Many startups only check cloud bills at the end of the month. By then, the damage is already done. Real-time billing monitors are essential to ensure teams are notified the moment costs spike beyond historic thresholds.</p>

      <h2>2. Configuring the Billing Webhook Trigger</h2>
      <p>We start by setting up an OrbitFlow webhook trigger that listens to AWS Cost Explorer anomalies or daily budget updates. The incoming data payload contains the current daily spend, forecast spend, and service name breakdown.</p>

      <h2>3. Auto-Routing Alerts to Slack</h2>
      <p>An AI routing node parses the budget alerts, extracts key services causing the cost spike, compiles a summary layout, and posts it to your #ops Slack channel using Slack. By automating this workflow, you can intercept cost overruns before they impact your business.</p>
    `,
  },
];

const relatedPosts = (current: string) => blogPosts.filter((p) => p.slug !== current).slice(0, 3);

export const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white font-sans text-gray-900 dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)]">
        <div className="space-y-5 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-[var(--orbit-surface)]">
            <ArrowLeft size={24} className="text-gray-400 dark:text-[var(--orbit-text-muted)]" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-[var(--orbit-text-primary)]">
            Article not found
          </h1>
          <p className="leading-relaxed text-sm text-gray-500 dark:text-[var(--orbit-text-muted)]">
            This article may have been moved or removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase"
          >
            <ArrowLeft size={13} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)]">
      <Navbar />
      <div className="h-20" />

      {/* â”€â”€ ARTICLE HERO â”€â”€ */}
      <header className="border-b border-gray-100 bg-white px-6 py-16 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-gray-400 uppercase transition-colors hover:text-[var(--orbit-accent-primary)] dark:text-[var(--orbit-text-muted)]"
          >
            <ArrowLeft size={13} /> Blog
          </Link>

          <span className="mb-5 inline-block rounded-lg border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
            {post.category}
          </span>

          <h1 className="mb-5 text-3xl leading-tight font-black tracking-tight text-gray-950 md:text-5xl dark:text-[var(--orbit-text-primary)]">
            {post.title}
          </h1>
          <p className="mb-8 text-lg leading-relaxed font-normal text-gray-600 dark:text-[var(--orbit-text-secondary)]">
            {post.excerpt}
          </p>

          {/* Author + meta row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar}
                alt={`Profile photo of ${post.author}, ${post.authorRole}`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-gray-100 object-cover dark:border-[var(--orbit-border-subtle)]"
                loading="lazy"
              />
              <div>
                <p className="leading-relaxed text-xs font-extrabold text-gray-900 dark:text-[var(--orbit-text-primary)]">
                  {post.author}
                </p>
                <p className="leading-relaxed font-mono text-sm tracking-wider text-gray-500 uppercase dark:text-[var(--orbit-text-muted)]">
                  {post.authorRole}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 font-mono text-xs text-gray-400 uppercase dark:text-[var(--orbit-text-muted)]">
              <span className="flex items-center gap-1.5">
                <Calendar size={11} /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={11} /> {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* â”€â”€ COVER IMAGE â”€â”€ */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="aspect-[2/1] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:bg-[var(--orbit-surface)]">
          <img
            src={post.cover}
            alt={`Cover banner for article: ${post.title}`}
            width={800}
            height={400}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* â”€â”€ ARTICLE BODY â”€â”€ */}
      <div className="mx-auto max-w-3xl px-6 pb-16">
        <div
          className="prose prose-lg prose-h2:text-xl prose-h2:font-extrabold prose-h2:text-gray-900 prose-h2:mt-10 prose-h2:mb-4 prose-p:text-base prose-p:leading-relaxed prose-p:font-normal prose-p:text-gray-700 prose-ul:space-y-2 prose-li:text-base prose-li:text-gray-700 prose-strong:text-gray-900 prose-strong:font-bold max-w-none text-left leading-relaxed text-gray-700 dark:text-[var(--orbit-text-primary)] dark:text-[var(--orbit-text-secondary)]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* â”€â”€ SHARE ROW â”€â”€ */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-10 dark:border-[var(--orbit-border-subtle)]">
          <span className="text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-[var(--orbit-text-muted)]">
            Share this article
          </span>
          <div className="flex gap-2">
            {[
              {
                Icon: Twitter,
                label: 'Twitter',
                color: 'hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/5',
                action: () =>
                  window.open(
                    `https://twitter.com/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
                    '_blank'
                  ),
              },
              {
                Icon: Linkedin,
                label: 'LinkedIn',
                color: 'hover:text-[#0077B5] hover:border-[#0077B5]/30 hover:bg-[#0077B5]/5',
                action: () =>
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                    '_blank'
                  ),
              },
              {
                Icon: copied ? Check : Copy,
                label: 'Copy Link',
                color:
                  'hover:text-[var(--orbit-accent-primary)] hover:border-[var(--orbit-accent-primary)]/30 hover:bg-[var(--orbit-accent-primary)]/5',
                action: handleCopy,
              },
            ].map(({ Icon, label, color, action }) => (
              <button
                type="button"
                aria-label={label}
                key={label}
                onClick={action}
                title={label}
                className={`cursor-pointer rounded-xl border border-gray-200 p-2.5 transition-all dark:border-[var(--orbit-border-subtle)] ${copied && label === 'Copy Link' ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-500' : 'text-gray-500 dark:text-[var(--orbit-text-muted)]'} ${color}`}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* â”€â”€ AUTHOR BIO CARD â”€â”€ */}
        <div className="mt-10 flex items-start gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-[var(--orbit-border-subtle)] dark:bg-[var(--orbit-surface)]">
          <img
            src={post.authorAvatar}
            alt={`Bio portrait of ${post.author}`}
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-2xl border-2 border-white object-cover shadow-sm"
            loading="lazy"
          />
          <div>
            <p className="leading-relaxed mb-1 font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Written by
            </p>
            <h4 className="mb-0.5 text-sm font-extrabold text-gray-900 dark:text-[var(--orbit-text-primary)]">
              {post.author}
            </h4>
            <p className="leading-relaxed mb-3 font-mono text-xs tracking-wider text-gray-500 uppercase dark:text-[var(--orbit-text-muted)]">
              {post.authorRole}
            </p>
            <p className="text-xs leading-relaxed font-normal text-gray-600 dark:text-[var(--orbit-text-secondary)]">
              Member of the OrbitFlow team. Building tools that help teams automate smarter, work
              calmer, and scale faster.
            </p>
          </div>
        </div>
      </div>

      {/* â”€â”€ RELATED ARTICLES â”€â”€ */}
      <section className="border-t border-gray-100 bg-gray-50 px-6 py-16 dark:border-[var(--orbit-border-subtle)] dark:bg-[var(--orbit-surface)]/50">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <p className="leading-relaxed font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              More Articles
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 transition-colors hover:text-gray-900 dark:text-[var(--orbit-text-muted)] dark:text-[var(--orbit-text-primary)]"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {relatedPosts(post.slug).map((related) => (
              <Link
                key={related.id}
                to={`/blog/${related.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
              >
                <div className="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-[var(--orbit-surface)]">
                  <img
                    src={related.cover}
                    alt={`Related article cover: ${related.title}`}
                    width={320}
                    height={180}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <span className="mb-2 block font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
                    {related.category}
                  </span>
                  <h3 className="line-clamp-2 text-sm leading-snug font-extrabold text-gray-900 transition-colors group-hover:text-[var(--orbit-accent-primary)] dark:text-[var(--orbit-text-primary)]">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
