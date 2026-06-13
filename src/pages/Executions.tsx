import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Filter, Play, Search, X } from 'lucide-react';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { cn } from '@/lib/utils';

// Mock Data for Executions
const executions = Array.from({ length: 12 }).map((_, i) => {
  const workflowNames = [
    'Slack Lead Sync',
    'HubSpot Ingestion',
    'Mailchimp Auto-Reply AI',
    'Notion DB Sync',
    'Stripe Invoice Alert',
    'Linear Ticket Router',
  ];
  const workflows = workflowNames[i % workflowNames.length];
  const triggerTypes = [
    'Webhook request',
    'Email received',
    'Slack action',
    'Cron schedule',
    'HubSpot hook',
    'Stripe event',
  ];
  const triggers = triggerTypes[i % triggerTypes.length];

  return {
    id: `RUN-${1000 + i}`,
    workflow: workflows,
    trigger: triggers,
    duration: `${Math.floor(Math.random() * 200 + 35)}ms`,
    status: i % 5 === 0 ? 'Failed' : i % 8 === 0 ? 'Pending' : 'Completed',
    date: `Oct ${24 - i}, 2026 14:02:${20 + i}`,
  };
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    case 'Pending':
      return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    case 'Failed':
      return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export default function Executions() {
  const scrollRef = useHorizontalScroll();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedExecution, setSelectedExecution] = useState<(typeof executions)[0] | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState('');
  const [payloadData, setPayloadData] = useState(
    '{\n  "event": "user_signup",\n  "user": {\n    "email": "test@orbitflow.io"\n  }\n}'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredExecutions = executions.filter((exec) => {
    const matchesSearch =
      exec.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exec.workflow.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exec.trigger.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter.startsWith('status_')) {
      const status = statusFilter.replace('status_', '');
      return matchesSearch && exec.status.toLowerCase() === status;
    }
    
    return matchesSearch;
  });

  return (
    <div className="animate-in fade-in relative mx-auto w-full max-w-7xl flex-1 p-4 text-[var(--orbit-text-primary)] duration-500 md:p-8">
      {/* Page Header */}
      <div className="mb-4 flex flex-col justify-between gap-3 md:mb-6 md:flex-row md:items-center">
        <div>
          <h1 className="font-sans text-lg leading-tight font-extrabold tracking-tight text-[var(--orbit-text-primary)] sm:text-xl md:text-3xl dark:text-white">
            Workflow Executions
          </h1>
          <p className="mt-1 text-xs leading-relaxed font-normal text-[var(--orbit-text-secondary)] sm:text-sm">
            Manage and track your recent automation execution states.
          </p>
        </div>
        <div className="grid w-full grid-cols-2 items-center gap-2 sm:flex sm:w-auto">
          <button
            type="button"
            className="flex min-h-[32px] cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-3 py-1.5 text-xs font-bold text-[var(--orbit-text-secondary)] shadow-sm transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)] sm:px-4 sm:py-2.5 sm:text-xs"
          >
            <Download className="h-3 w-3" /> Export CSV
          </button>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex min-h-[32px] cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[var(--orbit-accent-primary)] px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-all hover:bg-[#0c9594] sm:px-4 sm:py-2.5 sm:text-xs"
          >
            <Play className="h-3 w-3" /> Trigger
          </button>
        </div>
      </div>

      {/* Toolbar: Search, Filter, Actions */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between md:mb-5 md:gap-3">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[var(--orbit-text-muted)]" />
            <input
              id="search-executions"
              name="search-executions"
              type="text"
              placeholder="Search executions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-gray-250 h-8 w-full rounded-lg border bg-[var(--orbit-surface)] pr-3 pl-8 text-xs text-[var(--orbit-text-primary)] transition-all placeholder:text-[var(--orbit-text-muted)] focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:h-11 sm:rounded-xl sm:pl-10 sm:text-sm"
             aria-label="Search executions..." />
          </div>
          <div className="relative shrink-0">
            <Filter className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[var(--orbit-text-muted)]" />
            <select 
              id="filter-executions"
              name="filter-executions"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-8 w-auto min-w-[100px] cursor-pointer appearance-none rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] pr-7 pl-8 text-xs font-bold text-[var(--orbit-text-secondary)] shadow-sm transition hover:bg-[var(--orbit-elevated)] focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:h-11 sm:min-w-[130px] sm:rounded-xl sm:pr-8 sm:pl-9 sm:text-sm"
            >
              <option value="">Filters</option>
              <option value="status_completed">Completed</option>
              <option value="status_failed">Failed</option>
              <option value="status_pending">Pending</option>
            </select>
            <div className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[var(--orbit-text-muted)]">
              <svg
                width="8"
                height="5"
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
      </div>

      {/* Data Table */}
      <div className="w-full overflow-hidden rounded-xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] md:rounded-2xl dark:border-gray-800 dark:bg-gray-900">
        <div ref={scrollRef as React.LegacyRef<HTMLDivElement>} className="overflow-x-auto pb-2 sm:pb-0 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-[var(--orbit-border-hover)] hover:[&::-webkit-scrollbar-thumb]:bg-[var(--orbit-text-muted)] [&::-webkit-scrollbar-track]:bg-[var(--orbit-elevated)]">
          <table className="w-full min-w-[600px] text-left text-xs whitespace-nowrap">
            <thead className="border-b border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)] font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase sm:text-xs dark:border-gray-800 dark:bg-gray-800/50 dark:text-[var(--orbit-text-secondary)]">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Run ID</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Workflow Name</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Duration</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Timestamp</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Status</th>
                <th className="px-4 py-3 text-right sm:px-6 sm:py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--orbit-border-subtle)]">
              {filteredExecutions.map((run) => (
                <tr
                  key={run.id}
                  className="group cursor-pointer transition-colors hover:bg-[var(--orbit-elevated)] hover:bg-[var(--orbit-elevated)]/30"
                >
                  <td className="px-4 py-2.5 font-mono font-bold text-[var(--orbit-text-primary)] sm:px-6 sm:py-4">
                    {run.id}
                  </td>
                  <td className="text-[var(--orbit-text-secondary)] px-4 py-2.5 sm:px-6 sm:py-4">
                    <div className="text-xs font-bold text-[var(--orbit-text-primary)] sm:text-xs">
                      {run.workflow}
                    </div>
                    <div className="mt-0.5 font-mono text-xs font-semibold text-[var(--orbit-text-muted)] sm:text-xs">
                      Trigger: {run.trigger}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-mono font-semibold text-[var(--orbit-text-secondary)] sm:px-6 sm:py-4">
                    {run.duration}
                  </td>
                  <td className="px-4 py-2.5 font-medium text-[var(--orbit-text-secondary)] sm:px-6 sm:py-4">
                    {run.date}
                  </td>
                  <td className="px-4 py-2.5 sm:px-6 sm:py-4">
                    <span
                      className={cn(
                        'rounded-full border px-1.5 py-0.5 text-xs font-bold tracking-wider uppercase sm:px-2.5 sm:py-1 sm:text-xs',
                        getStatusColor(run.status)
                      )}
                    >
                      {run.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right sm:px-6 sm:py-4">
                    <div className="flex items-center justify-end gap-1.5 opacity-100 transition-opacity sm:gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExecution(run);
                        }}
                        className="cursor-pointer rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-3 py-2 text-xs font-bold text-[var(--orbit-text-secondary)] hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)] sm:px-4 sm:py-2 sm:text-sm"
                      >
                        Logs
                      </button>
                      <button
                        type="button"
                        className="cursor-pointer rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-3 py-2 text-xs font-bold text-[var(--orbit-accent-primary)] hover:bg-[var(--orbit-accent-primary)]/10 sm:px-4 sm:py-2 sm:text-sm"
                      >
                        Rerun
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
            Showing {filteredExecutions.length > 0 ? 1 : 0} to {filteredExecutions.length} of {filteredExecutions.length} results
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <button
              type="button"
              className="cursor-pointer rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-3 py-1.5 text-xs font-bold tracking-wider text-[var(--orbit-text-secondary)] uppercase transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)] disabled:opacity-50 disabled:hover:bg-[var(--orbit-surface)] dark:border-gray-800 dark:bg-gray-900"
              disabled
            >
              Prev
            </button>
            <div className="hidden items-center gap-1.5 sm:flex">
              <button
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[var(--orbit-accent-primary)]/30 bg-[var(--orbit-accent-primary)]/10 text-xs font-bold text-[var(--orbit-accent-primary)]"
              >
                1
              </button>
              <button
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] text-xs font-bold text-[var(--orbit-text-secondary)] hover:bg-[var(--orbit-elevated)] dark:border-gray-800 dark:bg-gray-900"
              >
                2
              </button>
              <button
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] text-xs font-bold text-[var(--orbit-text-secondary)] hover:bg-[var(--orbit-elevated)] dark:border-gray-800 dark:bg-gray-900"
              >
                3
              </button>
              <span className="px-1 text-[var(--orbit-text-muted)]">...</span>
              <button
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] text-xs font-bold text-[var(--orbit-text-secondary)] hover:bg-[var(--orbit-elevated)] dark:border-gray-800 dark:bg-gray-900"
              >
                154
              </button>
            </div>
            <button
              type="button"
              className="cursor-pointer rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-3 py-1.5 text-xs font-bold tracking-wider text-[var(--orbit-text-secondary)] uppercase transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)] dark:border-gray-800 dark:bg-gray-900"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over Drawer for Trigger Execution */}
      <AnimatePresence>
      {isDrawerOpen && (
        <motion.div className="fixed inset-0 z-[200] flex justify-end" exit={{ opacity: 1 }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-xs"
            onClick={() => setIsDrawerOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative flex h-full w-full max-w-md flex-col border-l border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] shadow-2xl dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center justify-between border-b border-[var(--orbit-border-subtle)] p-4 md:p-6">
              <h2 className="font-sans text-xl font-bold text-[var(--orbit-text-primary)] dark:text-white">
                Trigger Workflow
              </h2>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="cursor-pointer rounded-lg p-2 text-[var(--orbit-text-muted)] transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4 text-left md:p-6">
              <div className="space-y-2">
                <label className="block font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  Select Workflow
                </label>
                <select
                  value={selectedWorkflow}
                  onChange={(e) => setSelectedWorkflow(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-4 text-base text-[var(--orbit-text-primary)] transition-all focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm"
                >
                  <option value="" disabled className="text-[var(--orbit-text-muted)]">
                    Select a workflow...
                  </option>
                  <option value="chatpipe-sync" className="text-[var(--orbit-text-primary)]">
                    Slack Lead Sync
                  </option>
                  <option value="leadhub-ingest" className="text-[var(--orbit-text-primary)]">
                    HubSpot Ingestion
                  </option>
                  <option value="mailflow-reply" className="text-[var(--orbit-text-primary)]">
                    Mailchimp Auto-Reply AI
                  </option>
                  <option value="pagesync-sync" className="text-[var(--orbit-text-primary)]">
                    Notion DB Sync
                  </option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  JSON Payload
                </label>
                <textarea
                  rows={6}
                  value={payloadData}
                  onChange={(e) => setPayloadData(e.target.value)}
                  className="w-full resize-none rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-4 py-3 font-mono text-base text-[var(--orbit-text-primary)] transition-all focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)]/50 p-4 md:p-6">
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
                Execute Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Slide-over Drawer for Execution Logs */}
      <AnimatePresence>
      {selectedExecution && (
        <motion.div className="fixed inset-0 z-[200] flex justify-end" exit={{ opacity: 1 }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-xs"
            onClick={() => setSelectedExecution(null)}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative flex h-full w-full max-w-md flex-col border-l border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] shadow-2xl dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center justify-between border-b border-[var(--orbit-border-subtle)] p-4 md:p-6">
              <div>
                <h2 className="font-sans text-xl font-bold text-[var(--orbit-text-primary)] dark:text-white">
                  Execution Logs
                </h2>
                <p className="leading-relaxed mt-1 font-mono text-xs text-[var(--orbit-text-secondary)]">
                  {selectedExecution.id}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExecution(null)}
                className="cursor-pointer rounded-lg p-2 text-[var(--orbit-text-muted)] transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4 text-left md:p-6">
              <div className="space-y-4">
                <div>
                  <div className="mb-1 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                    Workflow
                  </div>
                  <div className="text-sm font-semibold text-[var(--orbit-text-primary)]">
                    {selectedExecution.workflow}
                  </div>
                </div>
                <div>
                  <div className="mb-1 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                    Trigger
                  </div>
                  <div className="text-sm text-[var(--orbit-text-secondary)]">
                    {selectedExecution.trigger}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-1 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                      Status
                    </div>
                    <span
                      className={cn(
                        'inline-flex rounded-full border px-2.5 py-1 text-xs font-bold tracking-wider uppercase',
                        getStatusColor(selectedExecution.status)
                      )}
                    >
                      {selectedExecution.status}
                    </span>
                  </div>
                  <div>
                    <div className="mb-1 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                      Duration
                    </div>
                    <div className="font-mono text-sm text-[var(--orbit-text-secondary)]">
                      {selectedExecution.duration}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                    Timestamp
                  </div>
                  <div className="text-sm text-[var(--orbit-text-secondary)]">
                    {selectedExecution.date}
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-xl bg-gray-900 p-4 font-mono text-xs text-green-400 dark:bg-black">
                <div className="mb-2 text-gray-500">// Execution trace log</div>
                <div>&gt; Starting workflow: {selectedExecution.workflow}</div>
                <div>&gt; Triggered by: {selectedExecution.trigger}</div>
                <div>&gt; Fetching context... OK</div>
                <div>&gt; Running nodes... OK</div>
                {selectedExecution.status === 'Failed' ? (
                  <div className="text-red-400">&gt; Error: Node execution failed.</div>
                ) : (
                  <div>&gt; Execution completed successfully.</div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
