import { useState } from 'react';
import { Key, Plus, Copy, Trash2, Eye, EyeOff, ShieldAlert, Check } from 'lucide-react';

export default function Developers() {
  const keys = [
    {
      name: 'Production API Key',
      prefix: 'sk_live_',
      id: 'key_19ax928b',
      created: 'Oct 12, 2026',
      lastUsed: '2 mins ago',
    },
    {
      name: 'Staging Environment',
      prefix: 'sk_test_',
      id: 'key_82bx991c',
      created: 'Sep 28, 2026',
      lastUsed: '1 hr ago',
    },
  ];

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const handleCopy = (key: (typeof keys)[0]) => {
    const fullKey = `${key.prefix}a1b2c3d4e5f6g7h8i9j0`;
    navigator.clipboard.writeText(fullKey);
    setCopiedId(key.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((keyId) => keyId !== id) : [...prev, id]
    );
  };

  return (
    <div className="animate-in fade-in relative mx-auto w-full max-w-5xl p-4 text-[var(--orbit-text-primary)] duration-500 md:p-8">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--orbit-text-primary)] md:text-3xl">
            API Keys
          </h1>
          <p className="leading-relaxed mt-1 text-sm text-[var(--orbit-text-muted)]">
            Preview a demo API-key management interface for your integration.
          </p>
        </div>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--orbit-accent-primary)] px-5 py-2.5 text-xs font-bold tracking-widest text-white uppercase shadow-[0_4px_12px_rgba(14,165,164,0.15)] transition hover:bg-[#0C8F8E]"
        >
          <Plus className="h-4 w-4" /> Generate Secret Key
        </button>
      </div>

      {/* Warning Alert */}
      <div className="mb-8 flex items-start gap-4 rounded-2xl border border-amber-100 bg-amber-50 p-5">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div>
          <h4 className="text-sm font-bold text-amber-800">Keep your keys secure</h4>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed font-normal text-amber-700/80">
            This screen contains masked placeholder values only. In a real application, create,
            reveal, rotate, and revoke secret keys through your backend. Never expose secret keys in
            client-side code.
          </p>
        </div>
      </div>

      {/* Keys List */}
      <div className="overflow-hidden rounded-3xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)]">
        <div className="border-b border-[var(--orbit-border-subtle)] p-6">
          <h3 className="text-base font-bold text-[var(--orbit-text-primary)]">Standard Keys</h3>
          <p className="leading-relaxed mt-1 text-xs font-normal text-[var(--orbit-text-muted)]">
            These keys have full access to your environment.
          </p>
        </div>
        <div className="divide-y divide-[var(--orbit-border-subtle)]">
          {keys.map((key) => (
            <div
              key={key.id}
              className="flex flex-col justify-between gap-6 p-6 transition-colors hover:bg-[var(--orbit-elevated)]/50 md:flex-row md:items-center dark:bg-gray-800/30"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[var(--orbit-text-primary)]">
                    {key.name}
                  </span>
                  <span className="rounded-md border border-[var(--orbit-border-mid)] bg-[var(--orbit-elevated)] px-2 py-0.5 font-mono text-xs font-semibold tracking-wider text-[var(--orbit-text-muted)] uppercase">
                    {key.id}
                  </span>
                </div>
                <div className="mt-3 flex max-w-full flex-wrap items-center gap-2">
                  <code className="flex max-w-full scrollbar-none items-center gap-2 overflow-x-auto rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-elevated)] px-3 py-2 font-mono text-xs tracking-wider text-[var(--orbit-text-secondary)] select-all sm:text-xs">
                    {revealedIds.includes(key.id)
                      ? `${key.prefix}a1b2c3d4e5f6g7h8i9j0`
                      : `${key.prefix}****************`}
                    <button
                      type="button"
                      onClick={() => toggleReveal(key.id)}
                      aria-label={`Reveal ${key.name} placeholder`}
                      className="ml-2 shrink-0 cursor-pointer text-[var(--orbit-text-muted)] transition hover:text-[var(--orbit-text-secondary)]"
                    >
                      {revealedIds.includes(key.id) ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopy(key)}
                    aria-label={`Copy ${key.name} placeholder`}
                    className="shrink-0 cursor-pointer rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-2 text-[var(--orbit-text-muted)] transition hover:text-[var(--orbit-text-secondary)] dark:text-gray-200"
                    title="Copy to clipboard"
                  >
                    {copiedId === key.id ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6 text-xs font-normal text-[var(--orbit-text-muted)] md:justify-end">
                <div className="block text-left md:hidden">
                  <span className="block">Created: {key.created}</span>
                  <span className="mt-0.5 block">Last used: {key.lastUsed}</span>
                </div>
                <div className="hidden text-right md:block">
                  <div className="mb-0.5 font-semibold text-[var(--orbit-text-primary)]">
                    Created
                  </div>
                  <div>{key.created}</div>
                </div>
                <div className="hidden text-right md:block">
                  <div className="mb-0.5 font-semibold text-[var(--orbit-text-primary)]">
                    Last used
                  </div>
                  <div>{key.lastUsed}</div>
                </div>
                <button
                  type="button"
                  aria-label={`Revoke ${key.name} placeholder`}
                  className="cursor-pointer self-end rounded-xl border border-transparent p-2.5 text-rose-500/60 transition hover:border-rose-100 hover:bg-rose-50 hover:text-rose-600 md:self-auto"
                  title="Revoke key"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Standard Procedure & Delivery Info */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] p-6 text-left">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--orbit-accent-primary)]/10 text-[var(--orbit-accent-primary)] dark:bg-teal-500/10 dark:text-teal-700 dark:text-teal-400">
            <Key className="h-5 w-5" />
          </div>
          <h3 className="mb-2 text-base font-extrabold text-[var(--orbit-text-primary)]">
            Standard Delivery Procedure
          </h3>
          <p className="text-xs leading-relaxed font-normal text-[var(--orbit-text-muted)]">
            Wire this demo interface to a server-side key-management endpoint. Store only a masked
            prefix and identifier in browser state. Return a newly generated secret once, over an
            authenticated HTTPS response.
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] p-6 text-left">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--orbit-accent-primary)]/10 text-[var(--orbit-accent-primary)] dark:bg-teal-500/10 dark:text-teal-700 dark:text-teal-400">
            <Key className="h-5 w-5" />
          </div>
          <h3 className="mb-2 text-base font-extrabold text-[var(--orbit-text-primary)]">
            Dashboard Embedding (iframe/SDK)
          </h3>
          <p className="text-xs leading-relaxed font-normal text-[var(--orbit-text-muted)]">
            For embedded dashboards, issue short-lived, audience-scoped tokens from your backend and
            pass them through an authenticated handshake. Do not place long-lived credentials in a
            public URL or frontend bundle.
          </p>
        </div>
      </div>
    </div>
  );
}
