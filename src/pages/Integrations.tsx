import { useState } from 'react';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { Plus, Search, Filter, X, Zap } from 'lucide-react';

interface IntegrationApp {
  id: string;
  name: string;
  type: string;
  volume: string;
  status: string;
  latency: string;
  date: string;
}

export default function Integrations() {
  const scrollRef = useHorizontalScroll();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<IntegrationApp | null>(null);

  const integrations = [
    {
      id: 'INT-001',
      name: 'Slack',
      type: 'MESSAGING',
      volume: '12,400 events',
      status: 'Active',
      latency: '24ms',
      date: 'Oct 24, 2026',
    },
    {
      id: 'INT-002',
      name: 'HubSpot',
      type: 'CRM',
      volume: '8,300 leads synced',
      status: 'Warning',
      latency: '124ms',
      date: 'Oct 15, 2026',
    },
    {
      id: 'INT-003',
      name: 'Notion',
      type: 'KNOWLEDGE',
      volume: '4,200 page triggers',
      status: 'Active',
      latency: '48ms',
      date: 'Oct 26, 2026',
    },
    {
      id: 'INT-004',
      name: 'Mailchimp',
      type: 'EMAIL',
      volume: '1,500 replies sent',
      status: 'Paused',
      latency: '-',
      date: 'Oct 25, 2026',
    },
    {
      id: 'INT-005',
      name: 'Linear',
      type: 'DEV',
      volume: '800 tickets updated',
      status: 'Active',
      latency: '18ms',
      date: 'Oct 23, 2026',
    },
    {
      id: 'INT-006',
      name: 'Zapier',
      type: 'ROUTING',
      volume: '300 fallback alerts',
      status: 'Active',
      latency: '82ms',
      date: 'Oct 20, 2026',
    },
  ];

  const handleOpenConfig = (app: IntegrationApp) => {
    setSelectedApp(app);
    setIsDrawerOpen(true);
  };

  return (
    <div className="animate-in fade-in relative mx-auto w-full flex-1 px-4 py-6 text-left text-[var(--orbit-text-primary)] duration-500 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-4 flex flex-col justify-between gap-3 md:mb-6 md:flex-row md:items-center">
        <div>
          <h1 className="font-sans text-lg leading-tight font-extrabold tracking-tight text-[var(--orbit-text-primary)] sm:text-xl md:text-3xl">
            Integrations Hub
          </h1>
          <p className="mt-1 text-xs leading-relaxed font-normal text-[var(--orbit-text-secondary)] sm:text-sm">
            Configure and manage workspace app integrations and webhooks.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSelectedApp(null);
            setIsDrawerOpen(true);
          }}
          className="flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[var(--orbit-accent-primary)] px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-all hover:bg-[#0c9594] sm:px-4 sm:py-2.5 sm:text-xs"
        >
          <Plus className="h-3 w-3" /> Connect App
        </button>
      </div>

      {/* Summary Cards — 2-column grid on mobile */}
      <div className="mb-4 grid grid-cols-2 gap-2 md:mb-6 md:grid-cols-4 md:gap-3">
        <div className="rounded-xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] p-2.5 sm:p-4 md:rounded-3xl md:p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-0.5 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase md:mb-1 md:text-xs md:font-semibold">
            Total Connections
          </div>
          <div className="text-sm font-bold text-[var(--orbit-text-primary)] sm:text-base md:text-2xl">
            6 Apps
          </div>
        </div>
        <div className="rounded-xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] p-2.5 sm:p-4 md:rounded-3xl md:p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-0.5 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase md:mb-1 md:text-xs md:font-semibold">
            Avg Latency
          </div>
          <div className="text-sm font-bold text-emerald-600 sm:text-base md:text-2xl">42ms</div>
        </div>
        <div className="rounded-xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] p-2.5 sm:p-4 md:rounded-3xl md:p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-0.5 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase md:mb-1 md:text-xs md:font-semibold">
            Active Triggers
          </div>
          <div className="text-sm font-bold text-[var(--orbit-text-primary)] sm:text-base md:text-2xl">
            18
          </div>
        </div>
        <div className="rounded-xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] p-2.5 sm:p-4 md:rounded-3xl md:p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-0.5 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase md:mb-1 md:text-xs md:font-semibold">
            Daily API Volume
          </div>
          <div className="text-sm font-bold text-[var(--orbit-accent-primary)] sm:text-base md:text-2xl">
            14,832
          </div>
        </div>
      </div>

      {/* Integrations Table Card */}
      <div className="overflow-hidden rounded-xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] md:rounded-2xl">
        {/* Search + Filter — flex wrap structure, stacks on mobile */}
        <div className="flex flex-col gap-2.5 border-b border-[var(--orbit-border-subtle)] p-3 sm:flex-row sm:items-center sm:justify-between md:p-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[var(--orbit-text-muted)]" />
            <input
              id="search-integrations"
              name="search-integrations"
              type="text"
              placeholder="Search integrations..."
              className="h-8 w-full rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] pr-3 pl-8 text-xs text-[var(--orbit-text-primary)] transition-all placeholder:text-[var(--orbit-text-muted)] focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:h-9 sm:rounded-xl sm:pl-9 sm:text-xs dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
             aria-label="Search integrations..." />
          </div>
          <div className="relative w-full shrink-0 sm:w-auto">
            <Filter className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[var(--orbit-text-muted)]" />
            <select
              id="filter-integrations"
              name="filter-integrations"
              className="h-8 w-full min-w-[140px] cursor-pointer appearance-none rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] pr-8 pl-8 text-xs font-bold text-[var(--orbit-text-secondary)] shadow-sm transition hover:bg-[var(--orbit-elevated)] focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:h-9 sm:w-auto sm:rounded-xl sm:text-xs">
              <option value="">All Types</option>
              <option value="type_messaging">Messaging</option>
              <option value="type_crm">CRM</option>
              <option value="type_knowledge">Knowledge</option>
              <option value="type_dev">Dev Tools</option>
            </select>
            <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[var(--orbit-text-muted)]">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div 
          ref={scrollRef}
          className="w-full cursor-grab overflow-x-auto pb-2 sm:pb-0 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-[var(--orbit-border-hover)] hover:[&::-webkit-scrollbar-thumb]:bg-[var(--orbit-text-muted)] [&::-webkit-scrollbar-track]:bg-[var(--orbit-elevated)]"
        >
          <table className="w-full min-w-[800px] text-left text-xs whitespace-nowrap">
            <thead className="border-b border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)] font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase sm:text-xs dark:border-gray-800 dark:bg-gray-800/50 dark:text-[var(--orbit-text-secondary)]">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4">App ID</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Application</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">API Load Volume</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Sync Latency</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Status</th>
                <th className="px-4 py-3 text-right sm:px-6 sm:py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--orbit-border-subtle)]">
              {integrations.map((app) => (
                <tr
                  key={app.id}
                  className="group transition-colors hover:bg-[var(--orbit-elevated)] hover:bg-[var(--orbit-elevated)]/30"
                >
                  <td className="px-4 py-2.5 font-mono font-bold text-[var(--orbit-text-primary)] sm:px-6 sm:py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded bg-teal-500/10">
                        <Zap className="h-3 w-3 text-[var(--orbit-accent-primary)]" />
                      </div>
                      <span>{app.id}</span>
                    </div>
                  </td>
                  <td className="text-gray-650 px-4 py-2.5 sm:px-6 sm:py-4">
                    <div className="text-xs font-bold text-[var(--orbit-text-primary)] sm:text-xs">
                      {app.name}
                    </div>
                    <div className="mt-0.5 font-mono text-xs font-semibold text-[var(--orbit-text-muted)] sm:text-xs">
                      {app.type}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-mono font-bold text-[var(--orbit-text-primary)] sm:px-6 sm:py-4">
                    {app.volume}
                  </td>
                  <td className="px-4 py-2.5 font-mono font-semibold text-[var(--orbit-text-secondary)] sm:px-6 sm:py-4">
                    {app.latency}
                  </td>
                  <td className="px-4 py-2.5 sm:px-6 sm:py-4">
                    <span
                      className={`rounded-full border px-1.5 py-0.5 text-xs font-bold tracking-wider uppercase sm:px-2.5 sm:py-1 sm:text-xs ${
                        app.status === 'Active'
                          ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600'
                          : app.status === 'Warning'
                            ? 'border-amber-500/20 bg-amber-500/10 text-amber-600'
                            : 'border-[var(--orbit-border-mid)] bg-[var(--orbit-elevated)] text-[var(--orbit-text-secondary)]'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right sm:px-6 sm:py-4">
                    <div className="flex items-center justify-end gap-1.5 opacity-100 transition-opacity sm:gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenConfig(app)}
                        className="cursor-pointer rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-2.5 py-1 text-xs font-bold text-[var(--orbit-text-secondary)] hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)] sm:px-4 sm:py-2 sm:text-sm"
                      >
                        Configure
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Footer */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)]/50 px-4 py-3 text-xs sm:flex-row sm:px-6 sm:py-4">
          <div className="font-medium text-[var(--orbit-text-muted)]">
            Showing 1 to 6 of 6 results
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="cursor-pointer rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-2.5 py-1 text-xs font-bold tracking-wider text-[var(--orbit-text-secondary)] uppercase transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)] disabled:opacity-50 disabled:hover:bg-[var(--orbit-surface)] dark:border-gray-800 dark:bg-gray-900"
              disabled
            >
              Prev
            </button>
            <button
              type="button"
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-[var(--orbit-accent-primary)]/30 bg-[var(--orbit-accent-primary)]/10 text-xs font-bold text-[var(--orbit-accent-primary)]"
            >
              1
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-2.5 py-1 text-xs font-bold tracking-wider text-[var(--orbit-text-secondary)] uppercase transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)] dark:border-gray-800 dark:bg-gray-900"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div
            className="animate-in fade-in absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="animate-in slide-in-from-right relative flex h-full w-full max-w-xl flex-col border-l border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] shadow-2xl duration-350 ease-out">
            <div className="flex items-center justify-between border-b border-[var(--orbit-border-subtle)] p-6">
              <div>
                <h2 className="font-sans text-xl font-bold text-[var(--orbit-text-primary)]">
                  {selectedApp ? `Configure ${selectedApp.name}` : 'Connect New App'}
                </h2>
                <p className="leading-relaxed mt-1 text-sm font-normal text-[var(--orbit-text-secondary)]">
                  Configure credentials and sync parameters.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="cursor-pointer rounded-lg p-2 text-[var(--orbit-text-muted)] transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 space-y-6 overflow-y-auto p-6 text-left">
              <div className="space-y-2">
                <label htmlFor="api-endpoint" className="block font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  API Endpoint / Connection URL
                </label>
                <input
                  id="api-endpoint"
                  name="api-endpoint"
                  type="text"
                  defaultValue={
                    selectedApp ? `https://api.${selectedApp.name.toLowerCase()}.com/v2` : ''
                  }
                  className="h-11 w-full rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-4 text-base text-[var(--orbit-text-primary)] transition-all placeholder:text-[var(--orbit-text-muted)] focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm"
                 aria-label="Text input" />
              </div>
              <div className="space-y-2">
                <label htmlFor="api-token" className="block font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  API Access Token / Bearer Key
                </label>
                <input
                  id="api-token"
                  name="api-token"
                  type="password"
                  defaultValue={selectedApp ? '****************************************' : ''}
                  className="h-11 w-full rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-4 text-base text-[var(--orbit-text-primary)] transition-all focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm"
                 aria-label="Password input" />
              </div>
              <div className="space-y-2">
                <label htmlFor="api-scope" className="block font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  Scope / Permissions
                </label>
                <input
                  id="api-scope"
                  name="api-scope"
                  type="text"
                  defaultValue={
                    selectedApp ? 'read:leads, write:alerts, offline_access' : 'read, write'
                  }
                  className="h-11 w-full rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-4 text-base text-[var(--orbit-text-primary)] transition-all focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm"
                 aria-label="Text input" />
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)] p-6">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="cursor-pointer rounded-xl px-5 py-3 text-sm font-bold text-[var(--orbit-text-secondary)] transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)] sm:px-4 sm:py-2.5 sm:text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3 text-sm font-bold tracking-wider text-white uppercase shadow-sm transition-all hover:bg-[#0c9594] sm:px-5 sm:py-2.5 sm:text-xs"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
