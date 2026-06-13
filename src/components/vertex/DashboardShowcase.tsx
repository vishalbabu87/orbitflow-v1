import Dashboard from '../../pages/Dashboard';
import { OrbitLogo } from '../ui/OrbitLogo';

import {
  LayoutDashboard,
  Activity,
  Settings2,
  Zap,
  DollarSign,
  Code,
  CreditCard,
} from 'lucide-react';

const mockMenuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, active: true },
  { name: 'Executions', icon: Activity, active: false },
  { name: 'Integrations', icon: Zap, active: false },
  { name: 'Transactions', icon: DollarSign, active: false },
  { name: 'Invoices', icon: CreditCard, active: false },
  { name: 'Developers', icon: Code, active: false },
  { name: 'Settings', icon: Settings2, active: false },
];

export const DashboardShowcase = ({
  defaultPreset,
}: {
  defaultPreset?:
    | 'automation'
    | 'chatbot'
    | 'crm'
    | 'marketing'
    | 'analytics'
    | 'project'
    | 'mobile';
}) => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#0B0F19] transition-colors duration-300 py-16 md:py-20 lg:py-24">
      {/* Background Ambience / Precise Cryptix Spotlight Backlighting (tuned for light theme background) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Soft neon teal halo behind the dark mockup */}
        <div
          className="pointer-events-none absolute top-[260px] left-1/2 h-[480px] w-[950px] -translate-x-1/2 opacity-80"
          style={{
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(14,165,164,0.18) 0%, rgba(14,165,164,0.03) 60%, transparent 80%)',
            filter: 'blur(32px)',
          }}
        />
        {/* Secondary soft cyan halo */}
        <div
          className="pointer-events-none absolute top-[300px] left-1/2 h-[260px] w-[650px] -translate-x-1/2 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(34,211,238,0.12) 0%, transparent 70%)',
            filter: 'blur(24px)',
          }}
        />
      </div>

      {/* Subtle geometric dot grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.015]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--orbit-accent-primary)]/22 bg-[var(--orbit-accent-primary)]/8 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--orbit-accent-primary)]" />
            <span className="font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
              Dashboard Showcase
            </span>
          </div>
          <h2 className="mb-4 font-sans text-5xl leading-tight font-extrabold text-gray-900 md:text-6xl">
            Monitor your processes <br />
            in{' '}
            <span className="bg-gradient-to-r from-[var(--orbit-accent-primary)] to-[#06B6D4] bg-clip-text text-transparent">
              Real-Time
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-500 md:text-base">
            See how OrbitFlow handles massive event ingestion, automates chatbot runs, and logs
            triggers instantly.
          </p>
        </div>

        {/* DESKTOP MOCKUP */}
        <div className="hidden md:block">
          {/* Dashboard Container Wrapper - Dark theme mockup floating in a white section */}
          {/* Dashboard Container Wrapper - Theme adaptive mockup */}
          <div
            className="relative mx-auto overflow-hidden rounded-none border border-[var(--orbit-border-mid)] bg-[var(--orbit-base)] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_70px_-15px_rgba(11,15,25,0.4)]"
            style={{ maxWidth: '1200px' }}
          >
            {/* Precise Glowing top highlight border line matching the theme */}
            <div
              className="pointer-events-none absolute right-0 left-0 z-25"
              style={{
                top: '-1px',
                height: '2px',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(14,165,164,0) 10%, rgba(14,165,164,0.7) 30%, rgba(34,211,238,1) 50%, rgba(14,165,164,0.7) 70%, rgba(14,165,164,0) 90%, transparent 100%)',
                boxShadow: '0 -2px 10px rgba(34,211,238,0.3)',
              }}
            />

            {/* Intense center light bloom reflection */}
            <div
              className="pointer-events-none absolute left-1/2 z-0 h-[60px] w-[380px] -translate-x-1/2 opacity-95"
              style={{
                top: '-30px',
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.75) 0%, rgba(14,165,164,0.25) 45%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />

            {/* Volumetric beam projection reflecting down into the mockup */}
            <div
              className="pointer-events-none absolute left-1/2 z-0 h-[100px] w-[650px] -translate-x-1/2 opacity-30"
              style={{
                top: '0px',
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.45) 0%, rgba(14,165,164,0.1) 55%, transparent 80%)',
                filter: 'blur(12px)',
              }}
            />

            {/* Theme adaptive layout container */}
            <div className="relative z-10 flex h-[620px] w-full bg-[var(--orbit-base)] font-sans border-t border-[var(--orbit-border-subtle)] text-[var(--orbit-text-primary)] selection:bg-[var(--orbit-accent-primary)]/30">
              {/* Desktop Mock Sidebar */}
              <aside className="flex h-full w-16 shrink-0 flex-col justify-between border-r border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] dark:bg-[#0B1017] dark:border-gray-800">
                {/* Top Section */}
                <div>
                  {/* Logo Container */}
                  <div className="relative flex h-14 items-center justify-center border-b border-gray-800 px-2">
                    <OrbitLogo showText={false} size={24} textClass="text-white" />
                    <div className="absolute top-2.5 right-2.5 h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--orbit-accent-primary)] shadow-[0_0_8px_rgba(14,165,164,0.5)]" />
                  </div>

                  {/* Navigation Items */}
                  <nav className="flex flex-col items-center space-y-2 p-3">
                    {mockMenuItems.map((item) => {
                      const isActive = item.active;
                      return (
                        <div
                          key={item.name}
                          title={item.name}
                          className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition-all ${
                            isActive
                              ? 'border-[var(--orbit-accent-primary)]/25 bg-[var(--orbit-accent-primary)]/10 text-[var(--orbit-accent-primary)] shadow-sm'
                              : 'border-transparent text-gray-400 hover:bg-gray-900 hover:text-white'
                          }`}
                        >
                          <item.icon
                            className={`h-4 w-4 ${isActive ? 'text-[var(--orbit-accent-primary)]' : 'text-gray-400'}`}
                          />
                        </div>
                      );
                    })}
                  </nav>
                </div>

                {/* Bottom Profile Section */}
                <div className="flex justify-center border-t border-gray-800 bg-gray-950/20 p-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--orbit-accent-primary)] text-xs font-bold text-white shadow-sm"
                    title="OrbitFlow Admin (Owner)"
                  >
                    OF
                  </div>
                </div>
              </aside>

              {/* Dashboard Content Container */}
              <div className="relative flex-1 overflow-y-auto bg-[var(--orbit-base)] p-6 md:p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--orbit-border-mid)] hover:[&::-webkit-scrollbar-thumb]:bg-[var(--orbit-border-subtle)] [&::-webkit-scrollbar-track]:bg-[var(--orbit-base)]">
                {/* Mesh Gradient Background inside Mockup container */}
                <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
                  <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-[var(--orbit-accent-primary)]/4 blur-[100px]" />
                  <div className="absolute right-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full bg-[var(--orbit-accent-primary)]/2 blur-[100px]" />
                </div>

                <div className="relative z-10">
                  <Dashboard defaultPreset={defaultPreset} isShowcase={true} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MOCKUP */}
        <div className="relative mt-8 flex w-full items-center justify-center pb-10 md:hidden">
          {/* Standardized Responsive Phone Container */}
          <div className="relative mx-auto flex h-[650px] w-full max-w-[360px] flex-col overflow-hidden rounded-[2.2rem] border-[8px] border-[var(--orbit-border-strong)] bg-[var(--orbit-base)] text-[var(--orbit-text-primary)] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(11,15,25,0.3)]">
            {/* Fake iOS Status Bar */}
            <div className="relative z-50 flex h-7 w-full shrink-0 items-center justify-between bg-[var(--orbit-base)] px-6 pt-1 text-[var(--orbit-text-primary)]">
              <span className="text-[11px] font-semibold tracking-tight">9:41</span>
              <div className="flex items-center gap-1 opacity-80">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" />
                </svg>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <svg
                  width="16"
                  height="8"
                  viewBox="0 0 24 12"
                  fill="currentColor"
                  className="ml-0.5"
                >
                  <rect
                    x="1"
                    y="1"
                    width="20"
                    height="10"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <rect x="3" y="3" width="14" height="6" rx="1.5" />
                  <path d="M22 4v4a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                </svg>
              </div>
            </div>

            {/* Mockup Mobile Header row inside mockup frame */}
            <div className="relative z-45 flex h-[48px] shrink-0 items-center justify-between border-b border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)]/90 px-3 transition-colors duration-300">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] text-[var(--orbit-text-secondary)]">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <OrbitLogo showText={true} size={22} textClass="text-xs font-extrabold text-[var(--orbit-text-primary)]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
                  </svg>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--orbit-accent-primary)] text-xs font-bold text-white">
                  OF
                </div>
              </div>
            </div>

            {/* Dashboard Content Container - 100% width of the phone frame */}
            <div className="relative flex-1 overflow-hidden bg-[var(--orbit-base)] [&::-webkit-scrollbar]:hidden">
              <Dashboard defaultPreset={defaultPreset} forceMobile={true} isShowcase={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;
