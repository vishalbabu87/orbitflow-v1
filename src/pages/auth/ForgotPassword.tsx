import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Fingerprint, CheckCircle2 } from 'lucide-react';
import { OrbitLogo } from '../../components/ui/OrbitLogo';

export const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden overflow-x-hidden bg-[#FAFAFA] px-4 text-gray-900 selection:bg-teal-500/30">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)]/15 blur-[120px] dark:bg-[var(--orbit-accent-primary)]/20" />
        <div className="absolute bottom-0 left-1/2 h-[200px] w-[500px] -translate-x-1/2 rounded-full bg-[#4F46E5]/10 blur-[80px] dark:bg-[#4F46E5]/15" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-4 w-full max-w-[420px] sm:mx-auto"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5">
            <OrbitLogo showText={true} size={32} textClass="text-gray-900" />
          </div>
          <h1 className="mb-1.5 font-sans text-2xl font-extrabold tracking-tight text-gray-900">
            Reset Password
          </h1>
          <p className="leading-relaxed text-sm font-normal text-gray-500">
            We'll send you an email to reset your credentials.
          </p>
        </div>

        <div className="elite-card rounded-2xl p-7 text-left">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="mb-1 text-base font-extrabold text-gray-900">Check your inbox</h3>
              <p className="mb-6 text-xs leading-relaxed text-gray-500">
                We've sent a password reset link to your email address.
              </p>
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase hover:underline"
              >
                <ArrowLeft size={12} /> Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-2">
                <label className="ml-1 block font-mono text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs text-gray-900 transition-all placeholder:text-gray-400 focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                  placeholder="name@company.com"
                 aria-label="name@company.com" />
              </div>

              <button
                type="submit"
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--orbit-accent-primary)] py-3.5 text-xs font-bold tracking-wider text-white transition-all hover:bg-[#0c9594] hover:shadow-[0_0_20px_rgba(14,165,164,0.35)]"
              >
                Send Reset Link
                <ChevronRight size={14} />
              </button>
            </form>
          )}
        </div>

        {!submitted && (
          <div className="mt-5 text-center">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 transition-colors hover:text-[var(--orbit-accent-primary)]"
            >
              <ArrowLeft size={12} /> Back to Login
            </Link>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-1.5 opacity-30">
          <Fingerprint size={12} />
          <p className="leading-relaxed font-mono text-xs font-semibold tracking-widest uppercase">
            Secure AES-256 Auth Shield
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
