import { Navbar } from '../components/vertex/Navbar';
import { Footer } from '../components/vertex/Footer';

const tokens = [
  { name: 'BASE', hex: '#FAFAFA', var: 'bg-[#FAFAFA]' },
  { name: 'SURFACE', hex: '#FFFFFF', var: 'bg-white dark:bg-[var(--orbit-surface)]' },
  { name: 'ACCENT', hex: 'var(--orbit-accent-primary)', var: 'text-[var(--orbit-accent-primary)]' },
  { name: 'SUCCESS', hex: '#10B981', var: 'text-emerald-600' },
  { name: 'ERROR', hex: '#EF4444', var: 'text-red-650' },
];

export const UIKit = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-gray-900 selection:bg-teal-500/30 dark:text-[var(--orbit-text-primary)]">
      <Navbar />

      <main className="flex-1 px-6 pt-32 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16">
            <span className="mb-4 block font-mono text-xs font-bold tracking-[0.5em] text-[var(--orbit-accent-primary)] uppercase">
              DESIGN SYSTEM
            </span>
            <h1 className="mb-4 font-sans text-5xl font-extrabold tracking-tight text-gray-900 md:text-7xl dark:text-[var(--orbit-text-primary)]">
              OrbitFlow{' '}
              <span className="font-display font-normal text-gray-400 italic dark:text-[var(--orbit-text-muted)]">
                Tokens
              </span>
            </h1>
            <p className="max-w-3xl font-sans text-xl leading-relaxed font-normal text-gray-500 dark:text-[var(--orbit-text-muted)]">
              Our core visual architecture. Premium typography pairings, flat clean white panels,
              and calibrated Restrained Teal accents for modern AI SaaS applications.
            </p>
          </div>

          {/* Section 1: Surface & Card Elevation */}
          <div className="mb-20 space-y-8">
            <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight text-gray-900 dark:text-[var(--orbit-text-primary)]">
              <span className="h-px w-8 bg-[var(--orbit-accent-primary)]"></span> Layered Elevation
              & Shadows
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: 'Flat Card',
                  shadow: 'border border-gray-100 dark:border-[var(--orbit-border-subtle)]',
                  desc: 'Flat border style for standard layout dividers.',
                },
                {
                  name: 'Soft Elevate',
                  shadow:
                    'border border-gray-100 dark:border-[var(--orbit-border-subtle)] shadow-[0_2px_8px_rgba(0,0,0,0.02)]',
                  desc: 'Subtle shadow card for list items and grids.',
                },
                {
                  name: 'Medium Elevate',
                  shadow:
                    'border border-gray-100 dark:border-[var(--orbit-border-subtle)] shadow-[0_8px_24px_rgba(0,0,0,0.03)]',
                  desc: 'Default container shadow for settings cards and main panels.',
                },
                {
                  name: 'High Elevate',
                  shadow:
                    'border border-gray-100 dark:border-[var(--orbit-border-subtle)] shadow-[0_12px_32px_rgba(0,0,0,0.04)]',
                  desc: 'Tactile hover state shadow for interactive elements.',
                },
              ].map((g) => (
                <div
                  key={g.name}
                  className={`flex h-40 flex-col justify-between rounded-2xl bg-white p-6 dark:bg-[#0B0F19] ${g.shadow}`}
                >
                  <span className="font-mono text-xs font-bold text-[var(--orbit-accent-primary)] uppercase">
                    {g.name}
                  </span>
                  <p className="font-mono text-xs leading-relaxed font-semibold text-gray-500 dark:text-[var(--orbit-text-muted)]">
                    {g.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Colors */}
          <div className="mb-20 space-y-8">
            <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight text-gray-900 dark:text-[var(--orbit-text-primary)]">
              <span className="h-px w-8 bg-[var(--orbit-accent-primary)]"></span> Color Architecture
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {tokens.map((token) => (
                <div
                  key={token.name}
                  className="space-y-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]"
                >
                  <div
                    className="h-16 rounded-xl border border-gray-100 shadow-inner dark:border-[var(--orbit-border-subtle)]"
                    style={{ backgroundColor: token.hex }}
                  />
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-gray-900 dark:text-[var(--orbit-text-primary)]">
                      {token.name}
                    </span>
                    <span className="block font-mono text-xs text-gray-500 dark:text-[var(--orbit-text-muted)]">
                      {token.hex}
                    </span>
                    <span className="block font-mono text-xs font-bold text-gray-400 uppercase dark:text-[var(--orbit-text-muted)]">
                      {token.var}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Typography */}
          <div className="mb-20 space-y-8">
            <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight text-gray-900 dark:text-[var(--orbit-text-primary)]">
              <span className="h-px w-8 bg-[var(--orbit-accent-primary)]"></span> Typography Stacks
            </h2>
            <div className="space-y-6 rounded-3xl border border-gray-100 bg-white p-8 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02)] dark:border-[var(--orbit-border-subtle)] dark:bg-[#0B0F19]">
              <div>
                <p className="leading-relaxed mb-4 font-mono text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-[var(--orbit-text-muted)]">
                  Display / Heading
                </p>
                <h3 className="font-sans text-5xl font-extrabold tracking-tight text-gray-900 md:text-8xl dark:text-[var(--orbit-text-primary)]">
                  OrbitFlow Intelligence
                </h3>
                <p className="leading-relaxed mt-2 font-mono text-xs font-semibold text-[var(--orbit-accent-primary)]">
                  Font: Plus Jakarta Sans / JetBrains Mono
                </p>
              </div>
              <div className="my-6 h-px bg-gray-100 dark:bg-[var(--orbit-surface)]" />
              <div>
                <p className="leading-relaxed mb-4 font-mono text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-[var(--orbit-text-muted)]">
                  Body / Interface
                </p>
                <p className="font-sans text-xl leading-relaxed font-normal text-gray-500 dark:text-[var(--orbit-text-muted)]">
                  OrbitFlow AI automates repetitive tasks across your workspace apps. Connect
                  Slack, HubSpot, Mailchimp, and Notion in minutes to run secure, multi-step
                  reasoning pipelines.
                </p>
                <p className="leading-relaxed mt-2 font-mono text-xs font-semibold text-[var(--orbit-accent-primary)]">
                  Font: Plus Jakarta Sans
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
