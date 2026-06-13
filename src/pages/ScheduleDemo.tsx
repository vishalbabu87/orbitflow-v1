import React, { useState } from 'react';
import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  Sparkles,
  Star,
  Users,
  Clock,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  User,
  Mail,
  Building,
} from 'lucide-react';

const INTERESTS = [
  'Select an area of interest',
  'Workflow Automation',
  'LLM Copilots',
  'Enterprise Integrations',
  'Custom Dashboards',
  'Other',
];

const COMPANY_SIZES = [
  'Select company size',
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-1000 employees',
  '1000+ employees',
];

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const getAvailableSlots = () => {
  // Always return 8 slots to look full and give plenty of options
  return [
    '09:00 AM',
    '09:30 AM',
    '10:30 AM',
    '11:00 AM',
    '01:00 PM',
    '02:30 PM',
    '03:00 PM',
    '04:00 PM',
  ];
};

const testimonials = [
  {
    quote: "The demo session convinced us in 20 minutes what would've taken weeks to evaluate.",
    author: 'David Kim',
    role: 'CTO, Pulse Analytics',
    avatar:
      '/images/ai_office_1.jpg',
  },
  {
    quote: 'Thorough, fast, and they listened to our usecase instead of giving a canned pitch.',
    author: 'Laura Vance',
    role: 'Head of Operations, Meridian Health',
    avatar:
      '/images/ai_office_2.jpg',
  },
];

type DemoFields = 'name' | 'email' | 'company' | 'companySize' | 'interest';

function validateDemoField(field: DemoFields, value: string): string {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'Your name is required.';
      return '';
    case 'email':
      if (!value.trim()) return 'Work email is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
      return '';
    case 'company':
      if (!value.trim()) return 'Company name is required.';
      return '';
    case 'companySize':
      if (!value.trim() || value === COMPANY_SIZES[0]) return 'Select company size.';
      return '';
    case 'interest':
      if (!value.trim() || value === INTERESTS[0]) return 'Select an interest.';
      return '';
    default:
      return '';
  }
}

export const ScheduleDemo = () => {
  // Calendar states
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    companySize: '',
    interest: '',
  });
  const [errors, setErrors] = useState<Partial<Record<DemoFields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<DemoFields, boolean>>>({});

  // Removed showCalendar effect

  const handleBlur = (field: DemoFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const msg = validateDemoField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: msg }));
  };

  const handleChange = (field: DemoFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const msg = validateDemoField(field, value);
      setErrors((prev) => ({ ...prev, [field]: msg }));
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const fields: DemoFields[] = ['name', 'email', 'company', 'companySize', 'interest'];
    const newErrors: Partial<Record<DemoFields, string>> = {};
    const newTouched: Partial<Record<DemoFields, boolean>> = {};
    let isValid = true;

    fields.forEach((field) => {
      newTouched[field] = true;
      const msg = validateDemoField(field, formData[field]);
      if (msg) {
        newErrors[field] = msg;
        isValid = false;
      }
    });

    setTouched((prev) => ({ ...prev, ...newTouched }));
    setErrors((prev) => ({ ...prev, ...newErrors }));

    if (!isValid || !selectedDate || !selectedTime) return;
    setSubmitted(true);
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const firstDayOffset = firstDay === 0 ? 6 : firstDay - 1; // Make Monday 0

  const handlePrevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-gray-900 selection:bg-teal-500/30 dark:text-[var(--orbit-text-primary)]">
      <Navbar />

      <div className="relative flex-grow px-6 pt-32 pb-24">
        {/* Signature vertical rhythm lines */}
        <div className="bg-vertical-grid" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            {/* LEFT: Info + Cover + Reviews */}
            <div className="space-y-8 text-left lg:col-span-5">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200/50 bg-teal-50 px-3 py-1">
                  <Sparkles size={12} className="text-[var(--orbit-accent-primary)]" />
                  <span className="font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
                    Live Session
                  </span>
                </div>
                <h1 className="mb-4 font-sans text-3xl leading-tight font-extrabold text-gray-900 md:text-5xl dark:text-[var(--orbit-text-primary)]">
                  See OrbitFlow{' '}
                  <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
                    in action
                  </span>
                </h1>
                <p className="text-sm leading-relaxed font-normal text-gray-500 dark:text-[var(--orbit-text-muted)]">
                  Connect with an integration architect for a 30-minute live review of OrbitFlow's
                  visual workflow pipelines, custom LLM copilots, and real-time execution.
                </p>
              </div>

              {/* What you'll get */}
              <div className="space-y-4">
                <h4 className="mb-2 text-xs font-extrabold tracking-wider text-gray-900 uppercase dark:text-[var(--orbit-text-primary)]">
                  What you'll cover:
                </h4>
                {[
                  { text: 'Visual pipeline drag-and-drop triggers', icon: Zap },
                  { text: 'Connecting Slack, HubSpot, and custom APIs', icon: Users },
                  { text: 'System throughput latency and scaling', icon: Clock },
                  { text: 'Enterprise-grade security policies', icon: Shield },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[var(--orbit-accent-primary)]/15 bg-[var(--orbit-accent-primary)]/10">
                      <item.icon size={12} className="text-[var(--orbit-accent-primary)]" />
                    </div>
                    <span className="text-xs leading-relaxed font-normal text-gray-600 dark:text-[var(--orbit-text-secondary)]">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Testimonials / Reviews */}
              <div className="space-y-4 border-t border-gray-100 pt-6 dark:border-[var(--orbit-border-subtle)]">
                <h4 className="mb-2 text-xs font-extrabold tracking-wider text-gray-900 uppercase dark:text-[var(--orbit-text-primary)]">
                  What other teams say:
                </h4>
                {testimonials.map((t) => (
                  <div
                    key={t.author}
                    className="elite-card rounded-2xl p-4 shadow-sm"
                  >
                    <div className="mb-2 flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="mb-3 text-xs leading-relaxed font-normal text-gray-600 italic dark:text-[var(--orbit-text-secondary)]">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-2">
                      <img
                        src={t.avatar}
                        alt={t.author}
                        width={28}
                        height={28}
                        className="h-7 w-7 rounded-full border border-gray-100 object-cover dark:border-[var(--orbit-border-subtle)]"
                        loading="lazy"
                      />
                      <div>
                        <p className="text-xs leading-none font-extrabold text-gray-900 dark:text-[var(--orbit-text-primary)]">
                          {t.author}
                        </p>
                        <p className="leading-relaxed mt-0.5 font-mono text-xs text-gray-500 dark:text-[var(--orbit-text-muted)]">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Booking Panel */}
            <div className="lg:col-span-7">
              <div className="elite-card relative overflow-hidden rounded-3xl p-8 md:p-12 dark:border-white/12">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-600 shadow-sm">
                      <Check size={24} />
                    </div>
                    <h3 className="mb-2 font-sans text-xl font-extrabold text-gray-900 dark:text-[var(--orbit-text-primary)]">
                      Demo Scheduled!
                    </h3>
                    <p className="leading-relaxed mb-6 text-sm font-normal text-gray-500 dark:text-[var(--orbit-text-muted)]">
                      Check your email for calendar invites and connection details. We're looking
                      forward to showing you OrbitFlow.
                    </p>
                    <div className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/50">
                      <p className="leading-relaxed font-mono text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-[var(--orbit-text-muted)]">
                        Date & Time
                      </p>
                      <p className="leading-relaxed mt-1 font-sans text-sm font-bold text-[var(--orbit-accent-primary)]">
                        {selectedDate?.toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}{' '}
                        at {selectedTime}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="text-left">
                    <div className="mb-8">
                      <h3 className="font-sans text-xl font-extrabold text-gray-900 dark:text-[var(--orbit-text-primary)]">
                        Book your demo
                      </h3>
                      <p className="leading-relaxed mt-1 text-xs text-gray-500 dark:text-[var(--orbit-text-muted)]">
                        Tell us a bit about you and select a time that works.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                      {/* LEFT: Calendar and Times */}
                      <div className="flex flex-col border-gray-100 lg:border-r lg:pr-8 dark:border-[var(--orbit-border-subtle)]">
                        <div className="mb-6">
                          <div className="mb-4 flex items-center justify-between">
                            <h4 className="font-sans text-sm font-bold text-gray-900 uppercase dark:text-[var(--orbit-text-primary)]">
                              {currentMonth.toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric',
                              })}
                            </h4>
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={handlePrevMonth}
                                className="cursor-pointer rounded-lg border border-gray-200 bg-white p-1.5 text-gray-500 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-[#0B0F19] dark:hover:bg-gray-800"
                              >
                                <ChevronLeft size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={handleNextMonth}
                                className="cursor-pointer rounded-lg border border-gray-200 bg-white p-1.5 text-gray-500 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-[#0B0F19] dark:hover:bg-gray-800"
                              >
                                <ChevronRight size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center">
                            {WEEKDAYS.map((day) => (
                              <div
                                key={day}
                                className="mb-2 font-mono text-xs font-bold text-gray-400 uppercase dark:text-[var(--orbit-text-muted)]"
                              >
                                {day}
                              </div>
                            ))}
                            {Array.from({ length: firstDayOffset }).map((_, i) => (
                              <div key={`empty-${i}`} />
                            ))}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                              const dateNum = i + 1;
                              const cellDate = new Date(
                                currentMonth.getFullYear(),
                                currentMonth.getMonth(),
                                dateNum
                              );
                              const isSelected = selectedDate?.getTime() === cellDate.getTime();
                              const isPast = cellDate < today;
                              return (
                                <button
                                  key={dateNum}
                                  type="button"
                                  disabled={isPast}
                                  onClick={() => {
                                    setSelectedDate(cellDate);
                                    setSelectedTime('');
                                  }}
                                  className={`flex aspect-square cursor-pointer items-center justify-center rounded-lg text-sm font-bold transition-all ${isPast ? 'cursor-not-allowed text-gray-300 dark:text-gray-600' : isSelected ? 'bg-[var(--orbit-accent-primary)] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
                                >
                                  {dateNum}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Times */}
                        <AnimatePresence>
                          {selectedDate && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-gray-100 pt-4 dark:border-[var(--orbit-border-subtle)]">
                                <p className="leading-relaxed mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-500">
                                  Available times for{' '}
                                  {selectedDate.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                  {getAvailableSlots().map((t) => (
                                    <button
                                      key={t}
                                      type="button"
                                      onClick={() => setSelectedTime(t)}
                                      className={`cursor-pointer rounded-lg border py-2.5 text-xs font-bold transition-all ${selectedTime === t ? 'border-[var(--orbit-accent-primary)] bg-[var(--orbit-accent-primary)] text-white shadow-[0_4px_12px_rgba(13,148,136,0.3)]' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-gray-300 dark:hover:border-gray-600 shadow-sm'}`}
                                    >
                                      {t}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* RIGHT: Form Details */}
                      <div className="flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="demo-name"
                              className="mb-1 block font-sans text-xs font-bold text-gray-700 dark:text-[var(--orbit-text-secondary)]"
                            >
                              Full Name
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <User size={14} className="text-gray-400" />
                              </div>
                              <input
                                id="demo-name"
                                type="text"
                                autoComplete="name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                onBlur={() => handleBlur('name')}
                                className={`w-full rounded-lg border bg-gray-50/50 py-2.5 pr-3 pl-11 text-sm text-gray-900 transition-all focus:bg-white focus:outline-none dark:bg-[var(--orbit-surface)] dark:text-[var(--orbit-text-primary)] dark:focus:bg-[var(--orbit-base)] ${touched.name && errors.name ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 focus:border-[var(--orbit-accent-primary)] focus:ring-4 focus:ring-[var(--orbit-accent-primary)]/10 dark:border-[var(--orbit-border-subtle)]'}`}
                                placeholder="Alex Morgan"
                              />
                            </div>
                            {touched.name && errors.name && (
                              <p className="leading-relaxed mt-1 text-xs font-medium text-red-500">
                                {errors.name}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="demo-email"
                              className="mb-1 block font-sans text-xs font-bold text-gray-700 dark:text-[var(--orbit-text-secondary)]"
                            >
                              Work Email
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Mail size={14} className="text-gray-400" />
                              </div>
                              <input
                                id="demo-email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                onBlur={() => handleBlur('email')}
                                className={`w-full rounded-lg border bg-gray-50/50 py-2.5 pr-3 pl-11 text-sm text-gray-900 transition-all focus:bg-white focus:outline-none dark:bg-[var(--orbit-surface)] dark:text-[var(--orbit-text-primary)] dark:focus:bg-[var(--orbit-base)] ${touched.email && errors.email ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 focus:border-[var(--orbit-accent-primary)] focus:ring-4 focus:ring-[var(--orbit-accent-primary)]/10 dark:border-[var(--orbit-border-subtle)]'}`}
                                placeholder="alex@company.com"
                              />
                            </div>
                            {touched.email && errors.email && (
                              <p className="leading-relaxed mt-1 text-xs font-medium text-red-500">
                                {errors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="demo-company"
                              className="mb-1 block font-sans text-xs font-bold text-gray-700 dark:text-[var(--orbit-text-secondary)]"
                            >
                              Company Name
                            </label>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Building size={14} className="text-gray-400" />
                              </div>
                              <input
                                id="demo-company"
                                type="text"
                                autoComplete="organization"
                                value={formData.company}
                                onChange={(e) => handleChange('company', e.target.value)}
                                onBlur={() => handleBlur('company')}
                                className={`w-full rounded-lg border bg-gray-50/50 py-2.5 pr-3 pl-11 text-sm text-gray-900 transition-all focus:bg-white focus:outline-none dark:bg-[var(--orbit-surface)] dark:text-[var(--orbit-text-primary)] dark:focus:bg-[var(--orbit-base)] ${touched.company && errors.company ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 focus:border-[var(--orbit-accent-primary)] focus:ring-4 focus:ring-[var(--orbit-accent-primary)]/10 dark:border-[var(--orbit-border-subtle)]'}`}
                                placeholder="Acme Inc."
                              />
                            </div>
                            {touched.company && errors.company && (
                              <p className="leading-relaxed mt-1 text-xs font-medium text-red-500">
                                {errors.company}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="demo-companySize"
                                className="mb-1 block font-sans text-xs font-bold text-gray-700 dark:text-[var(--orbit-text-secondary)]"
                              >
                                Current Size
                              </label>
                              <div className="relative">
                                <select
                                  id="demo-companySize"
                                  value={formData.companySize}
                                  onChange={(e) => handleChange('companySize', e.target.value)}
                                  onBlur={() => handleBlur('companySize')}
                                  className={`w-full appearance-none rounded-lg border bg-gray-50/50 py-2.5 pr-8 pl-3 text-sm text-gray-900 transition-all focus:bg-white focus:outline-none dark:bg-[var(--orbit-surface)] dark:text-[var(--orbit-text-primary)] dark:focus:bg-[var(--orbit-base)] ${touched.companySize && errors.companySize ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 focus:border-[var(--orbit-accent-primary)] focus:ring-4 focus:ring-[var(--orbit-accent-primary)]/10 dark:border-[var(--orbit-border-subtle)]'}`}
                                >
                                  {COMPANY_SIZES.map((size) => (
                                    <option
                                      key={size}
                                      value={size}
                                      disabled={size === COMPANY_SIZES[0]}
                                    >
                                      {size}
                                    </option>
                                  ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronDown size={14} className="text-gray-400" />
                                </div>
                              </div>
                              {touched.companySize && errors.companySize && (
                                <p className="leading-relaxed mt-1 text-xs font-medium text-red-500">
                                  {errors.companySize}
                                </p>
                              )}
                            </div>

                            <div>
                              <label
                                htmlFor="demo-interest"
                                className="mb-1 block font-sans text-xs font-bold text-gray-700 dark:text-[var(--orbit-text-secondary)]"
                              >
                                Interest
                              </label>
                              <div className="relative">
                                <select
                                  id="demo-interest"
                                  value={formData.interest}
                                  onChange={(e) => handleChange('interest', e.target.value)}
                                  onBlur={() => handleBlur('interest')}
                                  className={`w-full appearance-none rounded-lg border bg-gray-50/50 py-2.5 pr-8 pl-3 text-sm text-gray-900 transition-all focus:bg-white focus:outline-none dark:bg-[var(--orbit-surface)] dark:text-[var(--orbit-text-primary)] dark:focus:bg-[var(--orbit-base)] ${touched.interest && errors.interest ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 focus:border-[var(--orbit-accent-primary)] focus:ring-4 focus:ring-[var(--orbit-accent-primary)]/10 dark:border-[var(--orbit-border-subtle)]'}`}
                                >
                                  {INTERESTS.map((int) => (
                                    <option key={int} value={int} disabled={int === INTERESTS[0]}>
                                      {int === INTERESTS[0] ? 'Select' : int}
                                    </option>
                                  ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronDown size={14} className="text-gray-400" />
                                </div>
                              </div>
                              {touched.interest && errors.interest && (
                                <p className="leading-relaxed mt-1 text-xs font-medium text-red-500">
                                  {errors.interest}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={!selectedDate || !selectedTime}
                          className={`group relative mt-6 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl py-3.5 text-sm font-black tracking-widest text-white uppercase transition-all ${
                            !selectedDate || !selectedTime
                              ? 'cursor-not-allowed bg-gray-300 dark:bg-gray-800 dark:text-gray-500'
                              : 'bg-[var(--orbit-accent-primary)] hover:shadow-[0_0_20px_rgba(14,165,164,0.4)]'
                          }`}
                        >
                          {selectedDate && selectedTime && (
                            <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0"></div>
                          )}
                          <span className="relative z-10">Book Demo</span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScheduleDemo;
