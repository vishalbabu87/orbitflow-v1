import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Twitter,
  Linkedin,
  Github,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  AlertCircle,
  Loader2,
  XCircle,
  RefreshCw,
} from 'lucide-react';
import { Navbar } from '../components/vertex/Navbar';
import Footer from '../components/vertex/Footer';

const channels = [
  {
    icon: MessageSquare,
    title: 'Live Chat',
    desc: 'Available 24/7 for Pro & Enterprise customers. Average response under 3 minutes.',
    cta: 'Start Live Chat',
    badge: '24/7',
    badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  {
    icon: Mail,
    title: 'Email Support',
    desc: 'Send a message to our support queue. We respond within 4 business hours.',
    cta: 'Email Us',
    link: 'mailto:hello@orbitflow.io',
    badge: 'Fast',
    badgeColor: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    icon: Phone,
    title: 'Call Us',
    desc: 'Speak directly to a Solutions Architect. Mon - Fri, 9am - 6pm PST.',
    cta: 'Call +1 (555) 123-4567',
    link: 'tel:+15551234567',
    badge: 'Direct',
    badgeColor: 'bg-violet-50 text-violet-600 border-violet-200',
  },
];

const officeLocations = [
  {
    city: 'San Francisco',
    address: '425 Market Street, Suite 1200, San Francisco, CA 94105',
    phone: '+1 (415) 555-0199',
    flag: 'ðŸ‡ºðŸ‡¸',
  },
  {
    city: 'London',
    address: '30 St Mary Axe, 18th Floor, London, EC3A 8BF, UK',
    phone: '+44 20 7946 0192',
    flag: 'ðŸ‡¬ðŸ‡§',
  },
  {
    city: 'Dubai',
    address: 'The Gate District, East Wing, Level 5, Dubai, UAE',
    phone: '+971 4 555 0148',
    flag: 'ðŸ‡¦ðŸ‡ª',
  },
];

const socials = [
  {
    Icon: Twitter,
    label: 'Twitter',
    href: 'https://twitter.com/orbitflow',
    color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5 hover:border-[#1DA1F2]/20',
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/orbitflow',
    color: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/5 hover:border-[#0A66C2]/20',
  },
  {
    Icon: Github,
    label: 'GitHub',
    href: 'https://github.com/orbitflow',
    color: 'hover:text-[#24292F] hover:bg-[#24292F]/5 hover:border-[#24292F]/20',
  },
];

type ContactFields = 'name' | 'email' | 'company' | 'subject' | 'message';

interface ContactForm {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

function validateContactField(field: ContactFields, value: string): string {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'Full name is required.';
      if (value.trim().length < 2) return 'Name must be at least 2 characters.';
      return '';
    case 'email':
      if (!value.trim()) return 'Email is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
      return '';
    case 'subject':
      if (!value.trim()) return 'Subject is required.';
      return '';
    case 'message':
      if (!value.trim()) return 'Message is required.';
      if (value.trim().length < 10) return 'Message must be at least 10 characters.';
      return '';
    default:
      return '';
  }
}

export const ContactPage = () => {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<ContactFields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<ContactFields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [mapInteractive, setMapInteractive] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleBlur = (field: ContactFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const msg = validateContactField(field, form[field]);
    setErrors((prev) => ({ ...prev, [field]: msg }));
  };

  const handleChange = (field: ContactFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const msg = validateContactField(field, value);
      setErrors((prev) => ({ ...prev, [field]: msg }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Touch all required fields
    const requiredFields: ContactFields[] = ['name', 'email', 'subject', 'message'];
    const newErrors: Partial<Record<ContactFields, string>> = {};
    const newTouched: Partial<Record<ContactFields, boolean>> = {};
    requiredFields.forEach((field) => {
      newTouched[field] = true;
      const msg = validateContactField(field, form[field]);
      if (msg) newErrors[field] = msg;
    });
    setTouched((prev) => ({ ...prev, ...newTouched }));
    setErrors((prev) => ({ ...prev, ...newErrors }));
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setSubmitError(false);
    // Simulate async submission (swap Math.random condition to always succeed/fail for testing)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const success = Math.random() > 0.2; // 80% success rate simulation
    setLoading(false);
    if (success) {
      setSubmitted(true);
    } else {
      setSubmitError(true);
    }
  };

  const handleRetry = () => {
    setSubmitError(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 transition-colors duration-300 dark:bg-[#0B0F19] dark:text-gray-100">
      <Navbar />
      <div className="h-20" />

      {/* â”€â”€ HERO HEADER â”€â”€ */}
      <section className="relative overflow-hidden border-b border-gray-50 bg-transparent py-20 dark:border-gray-800/50">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="pointer-events-none absolute top-[-20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)]/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[300px] w-[500px] rounded-full bg-[#06B6D4]/15 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200/50 bg-teal-50 px-3 py-1 font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
            <Sparkles size={11} className="text-[var(--orbit-accent-primary)]" /> Get in Touch
          </span>
          <h1 className="text-5xl leading-[1.05] font-black tracking-tight text-gray-900 md:text-7xl">
            Contact Our{' '}
            <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
              Team
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed font-normal text-gray-500">
            Whether you are looking for a demo, have a support question, or just want to say hello,
            we are here for you.
          </p>
        </div>
      </section>

      {/* â”€â”€ THREE CARDS SECTION â”€â”€ */}
      <section className="border-b border-gray-100 bg-gray-50/50 px-6 py-16 dark:border-gray-800/60 dark:bg-gray-900/20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {channels.map(({ icon: Icon, title, desc, cta, link, badge, badgeColor }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-teal-500/30 hover:shadow-[0_12px_40px_rgba(14,165,164,0.06)] dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)]"
              >
                <div>
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 transition-transform duration-300 group-hover:scale-105">
                      <Icon size={20} className="text-[var(--orbit-accent-primary)]" />
                    </div>
                    <span
                      className={`rounded-lg border px-2.5 py-0.5 text-xs font-extrabold tracking-wider uppercase ${badgeColor}`}
                    >
                      {badge}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-extrabold text-gray-900">{title}</h3>
                  <p className="mb-6 text-xs leading-relaxed font-normal text-gray-500">{desc}</p>
                </div>
                {link ? (
                  <a
                    href={link}
                    className="inline-flex w-fit items-center gap-1.5 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase transition-all group-hover:gap-2.5"
                  >
                    {cta} <ArrowRight size={13} />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => showToast("Live chat connecting...")}
                    className="inline-flex w-fit cursor-pointer items-center gap-1.5 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase transition-all group-hover:gap-2.5"
                  >
                    {cta} <ArrowRight size={13} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ SPLIT SECTION: INFO & MESSAGE BOX â”€â”€ */}
      <section className="bg-white px-6 py-20 dark:bg-[#0B0F19]">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Left side: Let's Start a Conversation */}
            <div className="space-y-8 text-left lg:col-span-5">
              <div>
                <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
                  Connect
                </span>
                <h2 className="text-3xl leading-snug font-extrabold tracking-tight text-gray-900">
                  Let's Start a Conversation
                </h2>
                <p className="mt-4 text-sm leading-relaxed font-normal text-gray-500">
                  Whether you are looking for a demo, have a support question, or just want to say
                  hello, our team is here to help.
                </p>
              </div>

              <div className="space-y-6">
                {/* Office Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
                    <MapPin size={16} className="text-[var(--orbit-accent-primary)]" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-xs font-extrabold tracking-wider text-gray-900 uppercase">
                      Office Address
                    </h4>
                    <p className="text-sm leading-relaxed font-normal text-gray-600">
                      100 Market Street, Suite 300
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
                    <Mail size={16} className="text-[var(--orbit-accent-primary)]" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-xs font-extrabold tracking-wider text-gray-900 uppercase">
                      Email Us
                    </h4>
                    <div className="space-y-0.5">
                      <a
                        href="mailto:hello@orbitflow.io"
                        className="block text-sm font-medium text-[var(--orbit-accent-primary)] hover:underline"
                      >
                        hello@orbitflow.io
                      </a>
                    </div>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
                    <Phone size={16} className="text-[var(--orbit-accent-primary)]" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-xs font-extrabold tracking-wider text-gray-900 uppercase">
                      Call Us
                    </h4>
                    <p className="leading-relaxed text-sm font-normal text-gray-600">+1 (555) 123-4567</p>
                    <p className="leading-relaxed mt-0.5 font-mono text-sm text-gray-500">
                      Mon - Fri, 9am - 6pm PST
                    </p>
                  </div>
                </div>

                {/* Live Chat details */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
                    <Clock size={16} className="text-[var(--orbit-accent-primary)]" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-xs font-extrabold tracking-wider text-gray-900 uppercase">
                      Live Chat
                    </h4>
                    <p className="text-sm leading-relaxed font-normal text-gray-600">
                      Available 24/7 for Pro & Enterprise customers
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Badges */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="mb-3.5 text-xs font-extrabold tracking-wider text-gray-900 uppercase">
                  Follow Our Journey
                </h4>
                <div className="flex gap-3">
                  {socials.map(({ Icon, label, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-all duration-300 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)] ${color}`}
                      title={label}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Message Box (Form) */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.01),0_8px_24px_rgba(0,0,0,0.02)] md:p-10 dark:border-gray-800 dark:bg-[#11161d]">
                <h3 className="mb-2 text-left text-lg font-extrabold text-gray-900 dark:text-white">
                  Send Us a Message
                </h3>
                <p className="leading-relaxed mb-8 text-left text-xs font-normal text-gray-500 dark:text-gray-500">
                  Fill out the form below, and our team will get back to you shortly.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--orbit-accent-primary)]/30 bg-[var(--orbit-accent-primary)]/15">
                      <CheckCircle2 size={28} className="text-[var(--orbit-accent-primary)]" />
                    </div>
                    <h3 className="mb-2 text-lg font-extrabold text-gray-900 dark:text-white">
                      Message sent!
                    </h3>
                    <p className="max-w-xs text-xs leading-relaxed font-normal text-gray-500 dark:text-gray-500">
                      We got your message and will respond within 4 business hours. A copy has been
                      sent to your inbox.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
                    {/* Error banner */}
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
                        role="alert"
                        aria-live="assertive"
                      >
                        <XCircle
                          size={18}
                          className="mt-0.5 shrink-0 text-red-500"
                          aria-hidden="true"
                        />
                        <div className="flex-1">
                          <p className="leading-relaxed mb-0.5 text-sm font-bold text-red-700">
                            Message failed to send
                          </p>
                          <p className="leading-relaxed text-xs font-normal text-red-600">
                            Something went wrong on our end. Please try again or email us directly
                            at hello@orbitflow.io.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRetry}
                          aria-label="Retry sending message"
                          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-bold text-red-700 transition-colors hover:bg-red-100"
                        >
                          <RefreshCw size={11} aria-hidden="true" />
                          Retry
                        </button>
                      </motion.div>
                    )}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="mb-1.5 block text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300"
                        >
                          Full Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          placeholder="Elena Rostova"
                          value={form.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                          aria-invalid={!!(touched.name && errors.name)}
                          aria-describedby={
                            touched.name && errors.name ? 'contact-name-error' : undefined
                          }
                          className={`w-full rounded-xl border bg-white px-4 py-3 text-xs text-gray-900 transition-all placeholder:text-gray-400 focus:ring-1 focus:outline-none dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)] ${touched.name && errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:border-[var(--orbit-accent-primary)] focus:ring-[var(--orbit-accent-primary)]/20'}`}
                        />
                        {touched.name && errors.name && (
                          <p
                            id="contact-name-error"
                            role="alert"
                            className="leading-relaxed mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500"
                          >
                            <AlertCircle size={11} aria-hidden="true" className="shrink-0" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="mb-1.5 block text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300"
                        >
                          Work Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          placeholder="elena@company.com"
                          value={form.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          aria-invalid={!!(touched.email && errors.email)}
                          aria-describedby={
                            touched.email && errors.email ? 'contact-email-error' : undefined
                          }
                          className={`w-full rounded-xl border bg-white px-4 py-3 text-xs text-gray-900 transition-all placeholder:text-gray-400 focus:ring-1 focus:outline-none dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)] ${touched.email && errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:border-[var(--orbit-accent-primary)] focus:ring-[var(--orbit-accent-primary)]/20'}`}
                        />
                        {touched.email && errors.email && (
                          <p
                            id="contact-email-error"
                            role="alert"
                            className="leading-relaxed mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500"
                          >
                            <AlertCircle size={11} aria-hidden="true" className="shrink-0" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-company"
                          className="mb-1.5 block text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300"
                        >
                          Company
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          autoComplete="organization"
                          placeholder="Acme Corp"
                          value={form.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-900 transition-all placeholder:text-gray-400 focus:border-[var(--orbit-accent-primary)] focus:ring-1 focus:ring-[var(--orbit-accent-primary)]/20 focus:outline-none dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="mb-1.5 block text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300"
                        >
                          Subject
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          placeholder="I'd like to talk about..."
                          value={form.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          onBlur={() => handleBlur('subject')}
                          aria-invalid={!!(touched.subject && errors.subject)}
                          aria-describedby={
                            touched.subject && errors.subject ? 'contact-subject-error' : undefined
                          }
                          className={`w-full rounded-xl border bg-white px-4 py-3 text-xs text-gray-900 transition-all placeholder:text-gray-400 focus:ring-1 focus:outline-none dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)] ${touched.subject && errors.subject ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:border-[var(--orbit-accent-primary)] focus:ring-[var(--orbit-accent-primary)]/20'}`}
                        />
                        {touched.subject && errors.subject && (
                          <p
                            id="contact-subject-error"
                            role="alert"
                            className="leading-relaxed mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500"
                          >
                            <AlertCircle size={11} aria-hidden="true" className="shrink-0" />
                            {errors.subject}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-1.5 block text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        placeholder="Tell us how we can help..."
                        rows={5}
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        aria-invalid={!!(touched.message && errors.message)}
                        aria-describedby={
                          touched.message && errors.message ? 'contact-message-error' : undefined
                        }
                        className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-xs text-gray-900 transition-all placeholder:text-gray-400 focus:ring-1 focus:outline-none dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)] ${touched.message && errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:border-[var(--orbit-accent-primary)] focus:ring-[var(--orbit-accent-primary)]/20'}`}
                      />
                      {touched.message && errors.message && (
                        <p
                          id="contact-message-error"
                          role="alert"
                          className="leading-relaxed mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500"
                        >
                          <AlertCircle size={11} aria-hidden="true" className="shrink-0" />
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      aria-label={loading ? 'Sending messageâ€¦' : 'Send message'}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--orbit-accent-primary)] py-4 text-xs font-bold tracking-widest text-white uppercase transition-all duration-300 hover:scale-[1.01] hover:bg-[#0c9594] active:scale-[0.99] disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                          Sendingâ€¦
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                    <p className="leading-relaxed text-center font-mono text-sm text-gray-500">
                      We respond within 4 business hours
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ GOOGLE MAPS EMBED â”€â”€ */}
      <section className="border-t border-gray-100 bg-white px-6 py-16 dark:border-gray-800/60 dark:bg-[#0B0F19]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <span className="mb-2 block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Location
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900">Find Our Headquarters</h2>
            <p className="leading-relaxed mt-2 text-sm font-normal text-gray-500">
              425 Market Street, Suite 1200, San Francisco, CA 94105
            </p>
          </div>
          <div
            onClick={() => setMapInteractive(true)}
            onMouseLeave={() => setMapInteractive(false)}
            className="relative h-[400px] w-full overflow-hidden rounded-3xl border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            {!mapInteractive && (
              <div className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/5 transition-colors hover:bg-black/10">
                <span className="rounded-xl border border-gray-200 bg-white/95 px-4 py-2.5 text-xs font-bold tracking-wider text-gray-800 uppercase shadow-md dark:border-gray-800 dark:bg-slate-900/95 dark:text-gray-200">
                  Click map to interact
                </span>
              </div>
            )}
            {/* DEMO: Replace this Google Maps embed src with your own location */}
            <iframe
              title="OrbitFlow Headquarters â€“ San Francisco"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2358644490367!2d-122.39778!3d37.79154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c2c35e7d3%3A0xd0baa6ef07a32c70!2s425%20Market%20St%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1716900000000!5m2!1sen!2sus"
              className={`h-full w-full border-0 transition-all ${mapInteractive ? 'pointer-events-auto' : 'pointer-events-none'}`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* â”€â”€ OUR GLOBAL PRESENCE â”€â”€ */}
      <section className="border-t border-gray-100 bg-gray-50/50 px-6 py-16 dark:border-gray-800/60 dark:bg-gray-900/20">
        <div className="mx-auto max-w-6xl space-y-12 text-center">
          <div className="space-y-3">
            <span className="block font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              Our Offices
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">Our Global Presence</h2>
            <p className="leading-relaxed mx-auto max-w-md text-sm font-normal text-gray-500">
              Visit us at one of our offices around the world to meet the team.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            {officeLocations.map(({ city, address, phone, flag }) => (
              <div
                key={city}
                className="group flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--orbit-accent-primary)]/30 hover:shadow-[0_12px_40px_rgba(14,165,164,0.06)] dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)]"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Building2
                        size={16}
                        className="shrink-0 text-[var(--orbit-accent-primary)]"
                      />
                      <h3 className="text-base font-extrabold text-gray-900">{city}</h3>
                    </div>
                    <span className="text-2xl" role="img" aria-label={`${city} flag`}>
                      {flag}
                    </span>
                  </div>
                  <div className="space-y-3.5">
                    <div className="flex items-start gap-2.5">
                      <MapPin
                        size={15}
                        className="mt-0.5 shrink-0 text-[var(--orbit-accent-primary)]"
                      />
                      <p className="text-xs leading-relaxed font-normal text-gray-600">{address}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone size={15} className="shrink-0 text-[var(--orbit-accent-primary)]" />
                      <a
                        href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                        className="text-xs font-medium text-gray-700 transition-colors hover:text-[var(--orbit-accent-primary)]"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      {toastMsg && (
        <div className="animate-in slide-in-from-bottom-4 fixed right-4 bottom-4 z-[999] flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600 shadow-lg dark:border-emerald-900/30 dark:bg-emerald-950/90 dark:text-emerald-400">
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default ContactPage;
