import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Send,
  Bot,
  Shield,
  Cpu,
  Zap,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';
import { Link } from 'react-router-dom';
import { DashboardShowcase } from '../components/vertex/DashboardShowcase';

const chatbotFeatures = [
  {
    icon: Cpu,
    title: 'Deep Cognitive Engine',
    desc: 'Powered by custom-tuned LLMs that understand user intent, context, and technical schemas instantly.',
    tag: 'Next-Gen AI',
  },
  {
    icon: MessageSquare,
    title: 'Omnichannel Live-Chat',
    desc: 'Deploy to your web app, WhatsApp, Slack, Discord, and email using a unified inbox dashboard.',
    tag: 'Multi-Channel',
  },
  {
    icon: Zap,
    title: 'Instant Action Triggers',
    desc: 'Allow your agents to trigger database updates, send invoices, or write code directly inside the chat.',
    tag: 'Agentic Loop',
  },
  {
    icon: Shield,
    title: 'PII Scrubbing & Security',
    desc: 'SOC2 compliant gateway filters personal information before sending to external model endpoints.',
    tag: 'Enterprise',
  },
];

const steps = [
  {
    num: '01',
    title: 'Upload Your Content',
    desc: 'Sync your documentation, FAQs, APIs, and PDFs with our encrypted vector store in one click.',
  },
  {
    num: '02',
    title: 'Customize & Train',
    desc: 'Set system rules, adjust temperature parameters, test prompts, and style the web chat interface.',
  },
  {
    num: '03',
    title: 'Deploy Everywhere',
    desc: 'Embed the Javascript widget on your website, or connect WhatsApp, Slack, and Discord APIs.',
  },
];

const plans = [
  {
    name: 'Sandbox',
    price: 0,
    desc: 'For hackers testing agent architectures.',
    features: [
      '1 Custom AI Agent',
      '1,000 Messages / mo',
      'Basic Knowledge Base',
      'Web Widget Embed',
    ],
  },
  {
    name: 'Pro Agent',
    price: 49,
    desc: 'For scaling customer support operations.',
    features: [
      '5 Custom AI Agents',
      '20,000 Messages / mo',
      'Auto-training from Docs',
      'WhatsApp & Slack Integrations',
      'Advanced Analytics',
    ],
  },
  {
    name: 'Enterprise',
    price: 199,
    desc: 'Dedicated resources and private nodes.',
    features: [
      'Unlimited AI Agents',
      'Custom Message Volumes',
      'On-Prem / Private LLMs',
      'Dedicated Support Manager',
      'SOC2 Compliance Gateway',
    ],
  },
];

const faqs = [
  {
    q: 'Do I need coding skills to build an AI agent?',
    a: 'No coding skills are required. You can define agent tasks, rules, and document resources using plain English prompts.',
  },
  {
    q: 'How accurate are the chatbot responses?',
    a: "By grounding the chatbot in your own uploaded documentation via Retrieval-Augmented Generation (RAG), the bot answers accurately and doesn't hallucinate.",
  },
  {
    q: 'Can the bot handle multiple languages?',
    a: 'Yes, our engine automatically detects and responds in over 50 languages, translating queries on the fly.',
  },
];

export const HomeChatbot = () => {
  const [selectedPlan, setSelectedPlan] = useState('Pro Agent');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! I am your OrbitFlow assistant. How can I help you automate operations today?',
    },
    { sender: 'user', text: 'Connect my HubSpot leads to a custom Slack alert pipeline.' },
    {
      sender: 'bot',
      text: 'Done! I have created a webhook trigger for HubSpot and mapped email/company details to the Slack markdown payload.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Automated rule created: When a new lead matches "${userMsg.substring(0, 15)}...", execute pipeline "LeadNotify-v2".`,
        },
      ]);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--orbit-base)] text-[var(--orbit-text-primary)] selection:bg-teal-500/30">
      <Navbar />

      {/* -- HERO -- */}
      <section id="main-content" className="relative overflow-hidden px-6 pt-40 pb-20 dark:bg-transparent">
        <div className="bg-vertical-grid" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-teal-500/5 blur-[120px]" />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-teal-200/50 bg-teal-50 px-3 py-1 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
              <Bot size={12} /> AI Agent Blueprint
            </span>

            <h1 className="mb-6 font-sans text-5xl leading-none font-extrabold tracking-tight text-gray-900 md:text-7xl dark:text-white">
              Conversational
              <br />
              <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
                AI Copilots
              </span>
              <br />
              for Your SaaS
            </h1>

            <p className="mb-8 max-w-lg text-base leading-relaxed font-medium text-gray-500 md:text-lg dark:text-gray-500">
              Deploy autonomous AI agents that chat with customers, run backend tasks, and sync data
              across your software stack.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/auth"
                className="rounded-xl bg-[var(--orbit-accent-primary)] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,165,164,0.25)]"
              >
                Build Agent Free
              </Link>
              <Link
                to="/schedule-demo"
                className="rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-xs font-bold tracking-wider text-gray-800 uppercase transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-800"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>

          {/* Interactive Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto flex h-[480px] w-[calc(100%-1rem)] flex-col overflow-hidden rounded-[2.5rem] border-2 border-gray-200 bg-white shadow-[0_12px_48px_rgba(0,0,0,0.06)] md:h-[520px] lg:w-full dark:border-gray-800 dark:bg-[#111827]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3 md:px-6 md:py-4 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-teal-200/50 bg-teal-50 text-[var(--orbit-accent-primary)] md:h-10 md:w-10 dark:border-teal-900/30 dark:bg-teal-950/20">
                  <Bot size={16} className="md:h-5 md:w-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-extrabold text-gray-900 md:text-xs dark:text-white">
                    OrbitFlow Copilot
                  </h4>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--orbit-accent-primary)]" />
                    <span className="font-mono text-xs tracking-wider text-gray-400 uppercase md:text-xs dark:text-gray-300">
                      Active on edge
                    </span>
                  </div>
                </div>
              </div>
              <span className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-xs font-bold tracking-widest text-gray-400 uppercase md:text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                Sandbox
              </span>
            </div>

            {/* Chat Messages */}
            <div className="[&::-webkit-scrollbar]:none flex-1 [scrollbar-width:none] space-y-3 overflow-y-auto p-4 [-ms-overflow-style:none] md:p-6">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl border px-3 py-2 md:max-w-[75%] md:px-4 md:py-3 ${
                      msg.sender === 'user'
                        ? 'chat-bubble-user shadow-sm'
                        : 'border-gray-100 bg-gray-50 shadow-sm dark:border-gray-800/80 dark:bg-gray-800'
                    }`}
                  >
                    <span
                      className={`block text-xs leading-relaxed font-semibold sm:text-sm md:text-xs ${
                        msg.sender === 'user' ? 'text-white' : 'text-gray-800 dark:text-slate-100'
                      }`}
                    >
                      {msg.text}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-2 dark:border-gray-800 dark:bg-gray-800">
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
              className="flex gap-2 border-t border-gray-100 bg-gray-50/50 p-3 md:p-4 dark:border-gray-800 dark:bg-gray-900/60"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask assistant to execute tasks..."
                className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 text-xs font-medium text-gray-900 focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 md:px-4 md:text-xs dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
              <button
                type="submit"
                className="chat-send-btn shrink-0 cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] p-2.5 text-white transition-colors hover:bg-[#0c9594] md:p-3"
              >
                <Send size={12} className="md:h-3.5 md:w-3.5" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Showcase */}
      <DashboardShowcase defaultPreset="chatbot" />

      {/* -- FEATURES GRID -- */}
      <section className="border-t border-gray-100 bg-transparent px-6 py-24 dark:border-gray-800 dark:bg-transparent">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Capabilities
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Smarter Bots, Happier Customers
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {chatbotFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="flex items-start gap-6 rounded-3xl border-2 border-gray-200 bg-white p-8 transition-all hover:border-[var(--orbit-accent-primary)]/30 hover:shadow-[0_8px_32px_rgba(14,165,164,0.05)] dark:border-gray-800 dark:bg-[#111827] dark:hover:border-[var(--orbit-accent-primary)]/50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-teal-200/50 bg-teal-50 text-[var(--orbit-accent-primary)] dark:border-teal-900/30 dark:bg-teal-950/20">
                    <Icon size={22} />
                  </div>
                  <div className="text-left">
                    <span className="mb-2 block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                      {f.tag}
                    </span>
                    <h3 className="mb-2 text-2xl font-black text-gray-900 lg:text-lg dark:text-white">
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed font-normal text-gray-500 dark:text-gray-500">
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -- HOW IT WORKS -- */}
      <section className="border-t border-gray-100 bg-transparent px-6 py-24 dark:border-gray-800 dark:bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-16 max-w-2xl">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Deployment
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Launch Your Bot in Minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex flex-col justify-between rounded-3xl border border-gray-200 bg-white px-8 py-5 text-left dark:border-gray-800 dark:bg-[#111827]"
              >
                <div>
                  <span className="mb-4 block font-mono text-3xl font-black text-[var(--orbit-accent-primary)]/20">
                    {step.num}
                  </span>
                  <h3 className="mb-2 text-2xl font-extrabold text-gray-900 lg:text-base dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-normal text-gray-500 dark:text-gray-500">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- PRICING -- */}
      <section className="border-t border-gray-100 bg-transparent px-6 py-24 dark:border-gray-800 dark:bg-transparent">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-16 max-w-2xl">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Pricing
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              Start Free, Scale Smart
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
                    <div className="bg-teal-55 absolute top-4 right-4 flex items-center gap-1 rounded-full border border-teal-200/50 px-2.5 py-0.5 text-xs font-bold tracking-wider text-teal-600 uppercase">
                      Popular
                    </div>
                  )}
                  <div>
                    <h3 className="mb-2 text-2xl font-black tracking-wider text-gray-900 uppercase lg:text-lg dark:text-white">
                      {p.name}
                    </h3>
                    <div className="mb-4 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-gray-900 dark:text-white">
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
      <section className="border-y border-gray-100 bg-transparent px-6 py-24 dark:border-gray-800 dark:bg-transparent">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              FAQ
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl dark:text-white">
              Common Questions
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="elite-card cursor-pointer overflow-hidden rounded-2xl transition-all hover:border-[var(--orbit-accent-primary)]/40 hover:shadow-[0_0_20px_rgba(14,165,164,0.08)]"
              >
                <div
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={14} className="shrink-0 text-gray-400" />
                  ) : (
                    <ChevronDown size={14} className="shrink-0 text-gray-400" />
                  )}
                </div>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-left">
                    <p className="text-xs leading-relaxed font-normal text-gray-600 dark:text-gray-300">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- BOT CTA -- */}
      <section className="relative overflow-hidden bg-transparent px-6 py-24 dark:bg-transparent">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
            Ready to Automate Customer Support?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-gray-500 dark:text-gray-500">
            Connect your systems, define trigger actions in plain English, and deploy your chatbot
            to any channel instantly.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/auth"
              className="rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,165,164,0.2)]"
            >
              Get Started Free
            </Link>
            <Link
              to="/pricing-detailed"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-xs font-bold tracking-wider text-gray-800 uppercase transition-all hover:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              View Pricing Details <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeChatbot;
