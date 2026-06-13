import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, Check, ArrowLeft } from 'lucide-react';
import { OrbitLogo } from '../../components/ui/OrbitLogo';

export const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setJoined(true);
    setTimeout(() => {
      setJoined(false);
      setEmail('');
    }, 4000);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] p-6 text-gray-900 selection:bg-teal-500/30">
      {/* Background Glow */}
      <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-[var(--orbit-accent-primary)]/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex w-full max-w-md flex-col items-center text-center"
      >
        <div className="mb-8">
          <OrbitLogo showText={true} size={36} />
        </div>

        <div className="w-full rounded-3xl border border-gray-100 bg-white p-5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] sm:p-8">
          <span className="mb-4 inline-block rounded-full border border-teal-200/50 bg-teal-50 px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
            Under Construction
          </span>

          <h1 className="mb-3 font-sans text-2xl font-extrabold text-gray-900 md:text-3xl">
            Something major is landing
          </h1>
          <p className="mb-6 text-xs leading-relaxed font-normal text-gray-500">
            We are polishing our next-generation visual workflow modules and context-aware copilots.
            Join the early-access waitlist.
          </p>

          {joined ? (
            <div className="flex flex-col items-center py-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                <Check size={20} />
              </div>
              <h4 className="mb-1 text-xs font-bold text-gray-900">Added to Waitlist!</h4>
              <p className="leading-relaxed text-xs font-normal text-gray-500">
                We'll alert you the moment we deploy the beta registry.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <div>
                <label className="mb-2 ml-1 block font-mono text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Email Address
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                  />
                  <button
                    type="submit"
                    className="shrink-0 cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] p-3 text-white shadow-sm transition-all hover:bg-[#0c9594]"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="my-6 h-px bg-gray-50" />

          <div className="flex items-center justify-between font-mono text-xs font-semibold text-gray-400">
            <span>Next Release: v2.1</span>
            <span className="font-bold text-[var(--orbit-accent-primary)]">87% Built</span>
          </div>
        </div>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors hover:text-[var(--orbit-accent-primary)]"
        >
          <ArrowLeft size={12} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
