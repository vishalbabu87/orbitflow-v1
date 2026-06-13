import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Fingerprint, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { OrbitLogo } from '../../components/ui/OrbitLogo';
import { cn } from '../../lib/utils';

export const ResetPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError(null);
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
            Create New Password
          </h1>
          <p className="leading-relaxed text-sm font-normal text-gray-500">
            Choose a strong password containing at least 8 characters.
          </p>
        </div>

        <div className="elite-card rounded-2xl p-7 text-left">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="mb-1 text-base font-extrabold text-gray-900">Password updated</h3>
              <p className="mb-6 text-xs leading-relaxed text-gray-500">
                Your password has been successfully updated.
              </p>
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase hover:underline"
              >
                Go to Login <ChevronRight size={12} />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-2">
                <label className="ml-1 block font-mono text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={passwords.password}
                    onChange={(e) => {
                      setPasswords({ ...passwords, password: e.target.value });
                      if (error) setError(null);
                    }}
                    className={cn(
                      'w-full rounded-xl border bg-white px-4 py-2.5 pr-11 text-xs text-gray-900 transition-all placeholder:text-gray-400 focus:outline-none',
                      error
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:border-[var(--orbit-accent-primary)]'
                    )}
                    aria-invalid={error ? 'true' : 'false'}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff size={15} aria-hidden="true" />
                    ) : (
                      <Eye size={15} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-1 block font-mono text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={passwords.confirmPassword}
                    onChange={(e) => {
                      setPasswords({ ...passwords, confirmPassword: e.target.value });
                      if (error) setError(null);
                    }}
                    className={cn(
                      'w-full rounded-xl border bg-white px-4 py-2.5 pr-11 text-xs text-gray-900 transition-all placeholder:text-gray-400 focus:outline-none',
                      error
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:border-[var(--orbit-accent-primary)]'
                    )}
                    aria-invalid={error ? 'true' : 'false'}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={
                      showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                    }
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={15} aria-hidden="true" />
                    ) : (
                      <Eye size={15} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div role="alert" className="text-xs font-bold text-red-500">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--orbit-accent-primary)] py-3.5 text-xs font-bold tracking-wider text-white transition-all hover:bg-[#0c9594] hover:shadow-[0_0_20px_rgba(14,165,164,0.35)]"
              >
                Update Password
                <ChevronRight size={14} />
              </button>
            </form>
          )}
        </div>

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

export default ResetPassword;
