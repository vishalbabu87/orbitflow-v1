import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Github, ChevronRight, Fingerprint, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { OrbitLogo } from '../../components/ui/OrbitLogo';

export const Register = () => {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    // Simulate account creation - store session and redirect to dashboard
    setTimeout(() => {
      localStorage.setItem(
        'orbitflow_session',
        JSON.stringify({
          user: {
            name: form.name || 'New User',
            email: form.email || 'marcus@orbitflow.io',
            role: 'Admin',
            company: form.company,
          },
          token: 'demo-token-' + Date.now(),
        })
      );
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 600);
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    showToast(`Authenticating with ${provider}...`);
    setTimeout(() => {
      localStorage.setItem(
        'orbitflow_session',
        JSON.stringify({
          user: {
            name: `${provider} User`,
            email: `user@${provider.toLowerCase()}.com`,
            role: 'Admin',
            company: '',
          },
          token: 'demo-token-' + Date.now(),
        })
      );
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 600);
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--orbit-base)] text-[var(--orbit-text-primary)] selection:bg-teal-500/30">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)]/15 blur-[120px] dark:bg-[var(--orbit-accent-primary)]/20" />
        <div className="absolute bottom-0 left-1/2 h-[200px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-violet)]/10 blur-[80px] dark:bg-[var(--orbit-accent-violet)]/15" />
      </div>

      <div className="relative z-10 flex flex-grow items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[360px]"
        >
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-5">
              <OrbitLogo showText={true} size={32} textClass="text-[var(--orbit-text-primary)]" />
            </div>
            <h1 className="mb-1.5 font-sans text-2xl font-extrabold tracking-tight text-[var(--orbit-text-primary)]">
              Create your account
            </h1>
            <p className="leading-relaxed text-sm font-normal text-[var(--orbit-text-secondary)]">
              Join 15,000+ teams automating with OrbitFlow
            </p>
          </div>

          <div className="elite-card rounded-2xl p-6 sm:p-7 text-left">
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-2">
                <label className="ml-1 block font-mono text-xs font-semibold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-base)] px-4 py-2.5 text-sm text-[var(--orbit-text-primary)] transition-all placeholder:text-[var(--orbit-text-muted)] focus:border-[var(--orbit-accent-primary)] focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/20 focus:outline-none"
                  placeholder="Alex Johnson"
                />
              </div>

              <div className="space-y-2">
                <label className="ml-1 block font-mono text-xs font-semibold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  Company Name
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-base)] px-4 py-2.5 text-sm text-[var(--orbit-text-primary)] transition-all placeholder:text-[var(--orbit-text-muted)] focus:border-[var(--orbit-accent-primary)] focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/20 focus:outline-none"
                  placeholder="Acme Corp"
                />
              </div>

              <div className="space-y-2">
                <label className="ml-1 block font-mono text-xs font-semibold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-base)] px-4 py-2.5 text-sm text-[var(--orbit-text-primary)] transition-all placeholder:text-[var(--orbit-text-muted)] focus:border-[var(--orbit-accent-primary)] focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/20 focus:outline-none"
                  placeholder="name@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="ml-1 block font-mono text-xs font-semibold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-base)] px-4 py-2.5 pr-11 text-sm text-[var(--orbit-text-primary)] transition-all placeholder:text-[var(--orbit-text-muted)] focus:border-[var(--orbit-accent-primary)] focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/20 focus:outline-none"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--orbit-text-muted)] transition-colors hover:text-[var(--orbit-text-secondary)]"
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
                <label className="ml-1 block font-mono text-xs font-semibold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="w-full rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-base)] px-4 py-2.5 pr-11 text-sm text-[var(--orbit-text-primary)] transition-all placeholder:text-[var(--orbit-text-muted)] focus:border-[var(--orbit-accent-primary)] focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/20 focus:outline-none"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={
                      showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                    }
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--orbit-text-muted)] transition-colors hover:text-[var(--orbit-text-secondary)]"
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
                <p className="leading-relaxed px-1 text-xs font-semibold text-[var(--orbit-error)]">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || success}
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--orbit-accent-primary)] py-3.5 text-xs font-bold tracking-wider text-white transition-all duration-300 hover:bg-[#0c9594] hover:shadow-[0_0_20px_rgba(14,165,164,0.35)] disabled:opacity-70"
              >
                {success ? (
                  <>
                    <CheckCircle size={14} /> Account Created!
                  </>
                ) : loading ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />{' '}
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account <ChevronRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Social Logins Section */}
            <div className="relative my-2 flex items-center py-4">
              <div className="flex-grow border-t border-[var(--orbit-border-subtle)]" />
              <span className="mx-3 flex-shrink-0 font-mono text-xs tracking-widest text-[var(--orbit-text-muted)] uppercase">
                or continue with
              </span>
              <div className="flex-grow border-t border-[var(--orbit-border-subtle)]" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="flex cursor-pointer items-center justify-center rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-base)] px-4 py-2.5 text-[var(--orbit-text-primary)] transition-all hover:border-[var(--orbit-accent-primary)]/30 hover:bg-[var(--orbit-elevated)] hover:shadow-sm"
                title="Google"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
              </button>
              {/* GitHub */}
              <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                className="flex cursor-pointer items-center justify-center rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-base)] px-4 py-2.5 text-[var(--orbit-text-primary)] transition-all hover:border-[var(--orbit-accent-primary)]/30 hover:bg-[var(--orbit-elevated)] hover:shadow-sm"
                title="GitHub"
              >
                <Github size={16} className="text-[var(--orbit-text-primary)]" />
              </button>
              {/* Microsoft */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Microsoft')}
                className="flex cursor-pointer items-center justify-center rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-base)] px-4 py-2.5 text-[var(--orbit-text-primary)] transition-all hover:border-[var(--orbit-accent-primary)]/30 hover:bg-[var(--orbit-elevated)] hover:shadow-sm"
                title="Microsoft"
              >
                <svg className="h-4 w-4" viewBox="0 0 23 23" fill="currentColor">
                  <rect x="0" y="0" width="11" height="11" fill="#F25022" />
                  <rect x="12" y="0" width="11" height="11" fill="#7FBA00" />
                  <rect x="0" y="12" width="11" height="11" fill="#00A4EF" />
                  <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-5 text-center">
            <Link
              to="/auth/login"
              className="text-xs font-semibold text-[var(--orbit-text-secondary)] transition-colors hover:text-[var(--orbit-accent-primary)]"
            >
              Already have an account? <span className="font-bold">Sign In</span>
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1.5 opacity-40">
            <Fingerprint size={12} />
            <p className="leading-relaxed font-mono text-xs font-semibold tracking-widest uppercase">
              Secure AES-256 Auth Shield
            </p>
          </div>
        </motion.div>
      </div>
      {toastMsg && (
        <div className="animate-in slide-in-from-bottom-4 fixed right-4 bottom-4 z-[999] flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600 shadow-lg dark:border-emerald-900/30 dark:bg-emerald-950/90 dark:text-emerald-400">
          <CheckCircle size={16} className="text-emerald-500 shrink-0" />
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default Register;
