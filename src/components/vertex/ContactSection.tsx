import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Send, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section
      className="relative flex flex-col justify-center bg-white transition-colors duration-300 dark:bg-[#0B0F19] py-16 md:py-20 lg:py-24"
      id="contact"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* LEFT: Info Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left lg:col-span-5"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/5 px-3 py-1">
              <Mail size={12} className="text-[var(--orbit-accent-primary)]" />
              <span className="font-mono text-sm font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
                Get In Touch
              </span>
            </div>
            <h2 className="mb-3 text-2xl leading-tight font-extrabold text-[var(--orbit-text-primary)] md:text-5xl">
              Talk to our automation experts
            </h2>
            <p className="leading-relaxed mb-6 text-sm text-[var(--orbit-text-secondary)] md:text-base">
              Have questions about integrating apps, scaling custom AI copilots, or security
              compliance? Drop us a line.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email support', val: 'hello@orbitflow.io' },
                {
                  icon: MessageSquare,
                  label: 'Live telemetry chat',
                  val: 'Active 24/7 in dashboard',
                },
                { icon: MapPin, label: 'Headquarters', val: 'San Francisco, CA' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] text-[var(--orbit-accent-primary)] shadow-sm">
                    <item.icon size={15} />
                  </div>
                  <div>
                    <p className="leading-relaxed font-mono text-sm tracking-wider text-[var(--orbit-text-muted)] uppercase">
                      {item.label}
                    </p>
                    <p className="leading-relaxed mt-0.5 text-sm font-bold text-[var(--orbit-text-primary)] md:text-base">
                      {item.val}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Form container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.01),0_8px_24px_rgba(0,0,0,0.02)] md:p-10 dark:border-gray-800 dark:bg-[#111827] dark:shadow-none">
              <div className="neural-grid pointer-events-none absolute inset-0 opacity-[0.01]" />

              <h3 className="mb-2 text-left text-lg font-extrabold text-gray-900 dark:text-white">
                Send Us a Message
              </h3>
              <p className="leading-relaxed mb-8 text-left text-xs font-normal text-gray-500 dark:text-gray-500">
                Fill out the form below, and our team will get back to you shortly.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--orbit-success)]/10 text-[var(--orbit-success)]">
                    <Check size={20} />
                  </div>
                  <h4 className="mb-1 text-sm font-extrabold text-[var(--orbit-text-primary)]">
                    Message received!
                  </h4>
                  <p className="leading-relaxed text-sm text-[var(--orbit-text-secondary)]">
                    One of our technical experts will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-mono text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-900 transition-all placeholder:text-gray-400 focus:border-[var(--orbit-accent-primary)] focus:ring-1 focus:ring-[var(--orbit-accent-primary)]/20 focus:outline-none dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-mono text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-900 transition-all placeholder:text-gray-400 focus:border-[var(--orbit-accent-primary)] focus:ring-1 focus:ring-[var(--orbit-accent-primary)]/20 focus:outline-none dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-mono text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300">
                      Your Message
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the apps you want to connect and what automation goals you have..."
                      rows={5}
                      className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-900 transition-all placeholder:text-gray-400 focus:border-[var(--orbit-accent-primary)] focus:ring-1 focus:ring-[var(--orbit-accent-primary)]/20 focus:outline-none dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19] dark:text-[var(--orbit-text-primary)]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--orbit-accent-primary)] py-4 text-xs font-bold tracking-widest text-white uppercase transition-all duration-300 hover:scale-[1.01] hover:bg-[#0c9594] active:scale-[0.99]"
                  >
                    <Send size={11} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
