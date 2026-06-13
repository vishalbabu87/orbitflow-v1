import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ChevronRight, ArrowLeft, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { OrbitLogo } from '../components/ui/OrbitLogo';

type FormFields = 'name' | 'company' | 'email' | 'password' | 'confirmPassword';

interface FormState {
  name: string;
  company: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// -- Validation helpers --------------------------------------------------------
function validateField(
  field: FormFields,
  value: string,
  form: FormState,
  mode: 'signin' | 'signup'
): string {
  switch (field) {
    case 'name':
      if (mode === 'signup' && value.trim().length < 2)
        return 'Full name must be at least 2 characters.';
      return '';
    case 'company':
      if (mode === 'signup' && value.trim().length < 2)
        return 'Company name must be at least 2 characters.';
      return '';
    case 'email':
      if (!value.trim()) return 'Email is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
      return '';
    case 'password':
      if (!value) return 'Password is required.';
      if (value.length < 8) return 'Password must be at least 8 characters.';
      return '';
    case 'confirmPassword':
      if (mode === 'signup' && value !== form.password) return 'Passwords do not match.';
      return '';
    default:
      return '';
  }
}

// -- Field error message -------------------------------------------------------
const FieldError = ({ message }: { message: string }) =>
  message ? (
    <p role="alert" className="leading-relaxed mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
      <AlertCircle size={11} aria-hidden="true" className="shrink-0" />
      {message}
    </p>
  ) : null;

export const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<FormFields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FormFields, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBlur = (field: FormFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const msg = validateField(field, form[field], form, mode);
    setErrors((prev) => ({ ...prev, [field]: msg }));
  };

  const handleChange = (field: FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Re-validate on change once field has been touched
    if (touched[field]) {
      const msg = validateField(field, value, { ...form, [field]: value }, mode);
      setErrors((prev) => ({ ...prev, [field]: msg }));
    }
  };

  const switchMode = () => {
    setMode((m) => (m === 'signin' ? 'signup' : 'signin'));
    setErrors({});
    setTouched({});
  };

  const inputClass = (field: FormFields) =>
    `w-full bg-white dark:bg-[#0B0F19] border rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-[var(--orbit-text-primary)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/20 focus:border-[var(--orbit-accent-primary)] transition-all ${
      touched[field] && errors[field]
        ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
        : 'border-gray-200 dark:border-[var(--orbit-border-subtle)]'
    }`;

  return (
    <div className="flex min-h-screen flex-col overflow-y-auto bg-[#FAFAFA] text-gray-900 selection:bg-teal-500/30 dark:text-[var(--orbit-text-primary)]">
      {/* -- Minimal Auth Header -- */}
      <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-6 backdrop-blur-xl md:px-10 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]/80">
        <Link to="/" className="cursor-pointer">
          <OrbitLogo
            showText={true}
            size={28}
            textClass="text-gray-900 dark:text-[var(--orbit-text-primary)]"
          />
        </Link>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-colors hover:text-gray-700 dark:text-[var(--orbit-text-muted)]"
        >
          <ArrowLeft size={12} />
          Back to Home
        </Link>
      </header>

      {/* -- Form Area -- */}
      <div className="relative flex flex-grow items-center justify-center px-4 pt-28 pb-16">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--orbit-accent-primary)]/6 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[500px]"
        >
          {/* Header */}
          <div className="mb-7 text-center">
            <h1 className="mb-2 font-sans text-3xl font-black tracking-tight text-gray-900 dark:text-[var(--orbit-text-primary)]">
              {mode === 'signin' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="leading-relaxed text-sm font-normal text-gray-500 dark:text-[var(--orbit-text-muted)]">
              {mode === 'signin'
                ? 'Log in to your OrbitFlow account.'
                : 'Join 15,000+ teams automating with OrbitFlow.'}
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_2px_24px_rgba(0,0,0,0.04)] md:p-10 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]">
            <form className="space-y-4" noValidate onSubmit={(e) => e.preventDefault()}>
              {/* Full Name & Company (Sign Up only) */}
              <AnimatePresence mode="wait">
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1.5">
                      <label
                        htmlFor="auth-name"
                        className="ml-0.5 block text-xs font-bold tracking-widest text-gray-600 uppercase dark:text-[var(--orbit-text-secondary)]"
                      >
                        Full Name
                      </label>
                      <input
                        id="auth-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        aria-invalid={!!(touched.name && errors.name)}
                        aria-describedby={
                          touched.name && errors.name ? 'auth-name-error' : undefined
                        }
                        className={inputClass('name')}
                        placeholder="Alex Johnson"
                      />
                      <span id="auth-name-error">
                        <FieldError message={touched.name ? (errors.name ?? '') : ''} />
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="auth-company"
                        className="ml-0.5 block text-xs font-bold tracking-widest text-gray-600 uppercase dark:text-[var(--orbit-text-secondary)]"
                      >
                        Company Name
                      </label>
                      <input
                        id="auth-company"
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        onBlur={() => handleBlur('company')}
                        aria-invalid={!!(touched.company && errors.company)}
                        aria-describedby={
                          touched.company && errors.company ? 'auth-company-error' : undefined
                        }
                        className={inputClass('company')}
                        placeholder="Acme Corp"
                      />
                      <span id="auth-company-error">
                        <FieldError message={touched.company ? (errors.company ?? '') : ''} />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="auth-email"
                  className="ml-0.5 block text-xs font-bold tracking-widest text-gray-600 uppercase dark:text-[var(--orbit-text-secondary)]"
                >
                  Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  aria-invalid={!!(touched.email && errors.email)}
                  aria-describedby={touched.email && errors.email ? 'auth-email-error' : undefined}
                  className={inputClass('email')}
                  placeholder="name@company.com"
                />
                <span id="auth-email-error">
                  <FieldError message={touched.email ? (errors.email ?? '') : ''} />
                </span>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="ml-0.5 flex items-center justify-between">
                  <label
                    htmlFor="auth-password"
                    className="block text-xs font-bold tracking-widest text-gray-600 uppercase dark:text-[var(--orbit-text-secondary)]"
                  >
                    Password
                  </label>
                  {mode === 'signin' && (
                    <Link
                      to="/auth/forgot-password"
                      className="text-xs font-semibold text-[var(--orbit-accent-primary)] hover:underline"
                    >
                      Forgot?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    aria-invalid={!!(touched.password && errors.password)}
                    aria-describedby={
                      touched.password && errors.password ? 'auth-password-error' : undefined
                    }
                    className={inputClass('password') + ' pr-11'}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff size={16} aria-hidden="true" />
                    ) : (
                      <Eye size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>
                <span id="auth-password-error">
                  <FieldError message={touched.password ? (errors.password ?? '') : ''} />
                </span>
              </div>

              {/* Confirm Password (Sign Up only) */}
              <AnimatePresence mode="wait">
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1.5"
                  >
                    <label
                      htmlFor="auth-confirm-password"
                      className="ml-0.5 block text-xs font-bold tracking-widest text-gray-600 uppercase dark:text-[var(--orbit-text-secondary)]"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="auth-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={form.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        onBlur={() => handleBlur('confirmPassword')}
                        aria-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
                        aria-describedby={
                          touched.confirmPassword && errors.confirmPassword
                            ? 'auth-confirm-error'
                            : undefined
                        }
                        className={inputClass('confirmPassword') + ' pr-11'}
                        placeholder="********"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        aria-label={
                          showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                        }
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} aria-hidden="true" />
                        ) : (
                          <Eye size={16} aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    <span id="auth-confirm-error">
                      <FieldError
                        message={touched.confirmPassword ? (errors.confirmPassword ?? '') : ''}
                      />
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  // Touch all fields to trigger validations before moving forward
                  const fields: FormFields[] =
                    mode === 'signup'
                      ? ['name', 'company', 'email', 'password', 'confirmPassword']
                      : ['email', 'password'];
                  const newTouched: Partial<Record<FormFields, boolean>> = {};
                  const newErrors: Partial<Record<FormFields, string>> = {};

                  fields.forEach((f) => {
                    newTouched[f] = true;
                    const msg = validateField(f, form[f], form, mode);
                    if (msg) newErrors[f] = msg;
                  });

                  setTouched((prev) => ({ ...prev, ...newTouched }));
                  setErrors((prev) => ({ ...prev, ...newErrors }));

                  if (Object.keys(newErrors).length > 0) return;

                  // Handle navigation upon successful client validation
                  window.location.href = '/dashboard';
                }}
                className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--orbit-accent-primary)] py-3.5 text-sm font-bold tracking-wider text-white transition-all duration-300 hover:bg-[#0d9493] hover:shadow-[0_0_24px_rgba(14,165,164,0.35)]"
              >
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
                <ChevronRight size={14} />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-1 flex items-center py-5">
              <div className="flex-grow border-t border-gray-100 dark:border-[var(--orbit-border-subtle)]" />
              <span className="mx-4 flex-shrink-0 font-mono text-xs tracking-widest text-gray-400 uppercase dark:text-[var(--orbit-text-muted)]">
                or continue with
              </span>
              <div className="flex-grow border-t border-gray-100 dark:border-[var(--orbit-border-subtle)]" />
            </div>

            {/* Social Logins */}
            <div className="space-y-3">
              {/* Google */}
              <button
                type="button"
                className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
              >
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
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
                <span className="text-sm font-semibold text-gray-700 transition-colors group-hover:text-gray-900 dark:text-[var(--orbit-text-secondary)]">
                  Continue with Google
                </span>
              </button>

              {/* GitHub */}
              <button
                type="button"
                className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
              >
                <Github
                  size={18}
                  className="shrink-0 text-gray-800 dark:text-[var(--orbit-text-primary)]"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-gray-700 transition-colors group-hover:text-gray-900 dark:text-[var(--orbit-text-secondary)]">
                  Continue with GitHub
                </span>
              </button>

              {/* Microsoft */}
              <button
                type="button"
                className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
              >
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 23 23" aria-hidden="true">
                  <rect x="0" y="0" width="11" height="11" fill="#F25022" />
                  <rect x="12" y="0" width="11" height="11" fill="#7FBA00" />
                  <rect x="0" y="12" width="11" height="11" fill="#00A4EF" />
                  <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
                </svg>
                <span className="text-sm font-semibold text-gray-700 transition-colors group-hover:text-gray-900 dark:text-[var(--orbit-text-secondary)]">
                  Continue with Microsoft
                </span>
              </button>
            </div>
          </div>

          {/* Toggle mode */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={switchMode}
              className="cursor-pointer text-sm text-gray-500 transition-colors hover:text-[var(--orbit-accent-primary)] dark:text-[var(--orbit-text-muted)]"
            >
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <span className="font-bold text-gray-900 hover:text-[var(--orbit-accent-primary)] dark:text-[var(--orbit-text-primary)]">
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* -- Minimal Auth Footer -- */}
      <footer className="border-t border-gray-100 bg-white px-6 py-5 dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]/60">
        <div className="mx-auto flex max-w-[500px] items-center justify-between font-mono text-xs text-gray-400 dark:text-[var(--orbit-text-muted)]">
          <span>(c) 2026 OrbitFlow, Inc.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="transition-colors hover:text-gray-700">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="transition-colors hover:text-gray-700">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
