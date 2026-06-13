import React, { useState } from 'react';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { Download, Filter, Plus, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
const transactions = Array.from({ length: 12 }).map((_, i) => ({
  id: `TRX-${1000 + i}`,
  customer: `Customer ${i + 1}`,
  email: `contact${i}@orbitflow.io`,
  amount: (Math.random() * 5000).toFixed(2),
  status: i % 4 === 0 ? 'Pending' : i % 5 === 0 ? 'Failed' : 'Completed',
  date: `Oct ${24 - i}, 2026`,
}));

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    case 'Pending':
      return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    case 'Failed':
      return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
    default:
      return 'bg-gray-100 text-[var(--orbit-text-secondary)] border-gray-200';
  }
};

export default function Transactions() {
  const scrollRef = useHorizontalScroll();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<(typeof transactions)[0] | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('');

  let filteredTransactions = transactions.filter((trx) => {
    const matchesSearch =
      trx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterOption.startsWith('status_')) {
      const status = filterOption.replace('status_', '');
      return matchesSearch && trx.status.toLowerCase() === status;
    }
    
    return matchesSearch;
  });

  if (filterOption === 'date_oldest') {
    // Reverse creates a new array so we don't mutate the mock data
    filteredTransactions = [...filteredTransactions].reverse();
  }

  return (
    <div className="animate-in fade-in relative mx-auto w-full max-w-7xl flex-1 p-4 text-[var(--orbit-text-primary)] duration-500 md:p-8">
      {/* Page Header */}
      <div className="mb-4 flex flex-col justify-between gap-3 md:mb-6 md:flex-row md:items-center">
        <div>
          <h1 className="font-sans text-lg leading-tight font-extrabold tracking-tight text-[var(--orbit-text-primary)] sm:text-xl md:text-3xl dark:text-white">
            Transactions
          </h1>
          <p className="mt-1 text-xs leading-relaxed font-normal text-[var(--orbit-text-secondary)] sm:text-sm">
            Manage and track your recent financial operations.
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
            <Plus className="h-3 w-3" /> New Transaction
          </button>
        </div>
      </div>

      {/* Toolbar: Search, Filter, Actions */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between md:mb-5 md:gap-3">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[var(--orbit-text-muted)]" />
            <input
              id="search-transactions"
              name="search-transactions"
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-gray-250 h-8 w-full rounded-lg border bg-[var(--orbit-surface)] pr-3 pl-8 text-xs text-[var(--orbit-text-primary)] transition-all placeholder:text-[var(--orbit-text-muted)] focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:h-11 sm:rounded-xl sm:pl-10 sm:text-sm"
             aria-label="Search transactions..." />
          </div>
          <div className="relative shrink-0">
            <Filter className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[var(--orbit-text-muted)]" />
            <select 
              id="filter-transactions"
              name="filter-transactions"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="h-8 w-auto min-w-[100px] cursor-pointer appearance-none rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] pr-7 pl-8 text-xs font-bold text-[var(--orbit-text-secondary)] shadow-sm transition hover:bg-[var(--orbit-elevated)] focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:h-11 sm:min-w-[130px] sm:rounded-xl sm:pr-8 sm:pl-9 sm:text-sm"
            >
              <option value="">Filters</option>
              <option value="status_completed">Completed</option>
              <option value="status_pending">Pending</option>
              <option value="status_failed">Failed</option>
              <option value="date_newest">Newest</option>
              <option value="date_oldest">Oldest</option>
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
        <div 
          ref={scrollRef}
          className="cursor-grab overflow-x-auto pb-2 sm:pb-0 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-[var(--orbit-border-hover)] hover:[&::-webkit-scrollbar-thumb]:bg-[var(--orbit-text-muted)] [&::-webkit-scrollbar-track]:bg-[var(--orbit-elevated)]"
        >
        <table className="w-full min-w-[800px] text-left text-xs whitespace-nowrap">
            <thead className="border-b border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)] font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase sm:text-xs dark:border-gray-800 dark:bg-gray-800/50 dark:text-[var(--orbit-text-secondary)]">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Transaction ID</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Customer</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Amount</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Date</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Status</th>
                <th className="px-4 py-3 text-right sm:px-6 sm:py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--orbit-border-subtle)]">
              {filteredTransactions.map((trx) => (
                <tr
                  key={trx.id}
                  className="group cursor-pointer transition-colors hover:bg-[var(--orbit-elevated)] hover:bg-[var(--orbit-elevated)]/30"
                  onClick={() => setSelectedTransaction(trx)}
                >
                  <td className="px-4 py-2.5 font-mono font-bold text-[var(--orbit-text-primary)] sm:px-6 sm:py-4">
                    {trx.id}
                  </td>
                  <td className="text-gray-650 px-4 py-2.5 sm:px-6 sm:py-4">
                    <div className="text-xs font-bold text-[var(--orbit-text-primary)] sm:text-xs">
                      {trx.customer}
                    </div>
                    <div className="mt-0.5 font-mono text-xs font-semibold text-[var(--orbit-text-muted)] sm:text-xs">
                      {trx.email}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-mono font-bold text-[var(--orbit-text-primary)] sm:px-6 sm:py-4">
                    ${trx.amount}
                  </td>
                  <td className="px-4 py-2.5 font-medium text-[var(--orbit-text-secondary)] sm:px-6 sm:py-4">
                    {trx.date}
                  </td>
                  <td className="px-4 py-2.5 sm:px-6 sm:py-4">
                    <span
                      className={cn(
                        'rounded-full border px-1.5 py-0.5 text-xs font-bold tracking-wider uppercase sm:px-2.5 sm:py-1 sm:text-xs',
                        getStatusColor(trx.status)
                      )}
                    >
                      {trx.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right sm:px-6 sm:py-4">
                    <div className="flex items-center justify-end gap-1.5 opacity-100 transition-opacity sm:gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTransaction(trx);
                        }}
                        className="cursor-pointer rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-3 py-2 text-xs font-bold text-[var(--orbit-text-secondary)] hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)] sm:px-4 sm:py-2 sm:text-sm"
                      >
                        Receipt
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
            Showing {filteredTransactions.length > 0 ? 1 : 0} to {filteredTransactions.length} of {filteredTransactions.length} results
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
                12
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

      {/* Slide-over Drawer for New Transaction */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="animate-in slide-in-from-right relative flex h-full w-full max-w-md flex-col border-l border-gray-100 bg-[var(--orbit-surface)] shadow-2xl duration-350 ease-out dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-gray-800">
              <h2 className="font-sans text-xl font-bold text-[var(--orbit-text-primary)] dark:text-white">
                New Transaction
              </h2>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="cursor-pointer rounded-lg p-2 text-[var(--orbit-text-muted)] transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6 dark:border-gray-800">
              <div className="space-y-2">
                <label className="block font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase dark:text-[var(--orbit-text-secondary)]">
                  Customer Email
                </label>
                <input
                  type="email"
                  placeholder="client@orbitflow.io"
                  className="h-11 w-full rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-4 text-base text-[var(--orbit-text-primary)] transition-all placeholder:text-[var(--orbit-text-muted)] focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                 aria-label="client@orbitflow.io" />
              </div>
              <div className="space-y-2">
                <label className="block font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase dark:text-[var(--orbit-text-secondary)]">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--orbit-text-muted)]">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="h-11 w-full rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] pr-4 pl-8 text-base text-[var(--orbit-text-primary)] transition-all placeholder:text-[var(--orbit-text-muted)] focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                   aria-label="0.00" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase dark:text-[var(--orbit-text-secondary)]">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Service fee..."
                  className="w-full resize-none rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-4 py-3 text-base font-normal text-[var(--orbit-text-primary)] transition-all placeholder:text-[var(--orbit-text-muted)] focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                 aria-label="Service fee..." />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 bg-[var(--orbit-elevated)]/50 p-4 md:p-6 dark:border-gray-800 dark:bg-gray-800/30">
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
                Charge Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Drawer for Transaction Receipt */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div
            className="animate-in fade-in absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setSelectedTransaction(null)}
          />
          <div className="animate-in slide-in-from-right relative flex h-full w-full max-w-md flex-col border-l border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] shadow-2xl duration-350 ease-out dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-[var(--orbit-border-subtle)] p-4 md:p-6 dark:border-gray-800">
              <div>
                <h2 className="font-sans text-xl font-bold text-[var(--orbit-text-primary)] dark:text-white">
                  Transaction Receipt
                </h2>
                <p className="leading-relaxed mt-1 font-mono text-xs text-[var(--orbit-text-secondary)]">
                  {selectedTransaction.id}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                className="cursor-pointer rounded-lg p-2 text-[var(--orbit-text-muted)] transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4 text-left md:p-6 dark:border-gray-800">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[var(--orbit-elevated)] p-6 dark:bg-gray-800/50">
                  <div className="text-3xl font-black text-[var(--orbit-text-primary)] dark:text-gray-100">
                    ${selectedTransaction.amount}
                  </div>
                  <div className="mt-1 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                    Amount{' '}
                    {selectedTransaction.status === 'Completed'
                      ? 'Paid'
                      : selectedTransaction.status}
                  </div>
                </div>

                <div>
                  <div className="mb-1 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase dark:text-gray-400">
                    Customer
                  </div>
                  <div className="text-sm font-semibold text-[var(--orbit-text-primary)] dark:text-gray-200">
                    {selectedTransaction.customer}
                  </div>
                  <div className="text-sm text-[var(--orbit-text-secondary)] dark:text-gray-400">
                    {selectedTransaction.email}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-1 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase dark:text-gray-400">
                      Status
                    </div>
                    <span
                      className={cn(
                        'inline-flex rounded-full border px-2.5 py-1 text-xs font-bold tracking-wider uppercase',
                        getStatusColor(selectedTransaction.status)
                      )}
                    >
                      {selectedTransaction.status}
                    </span>
                  </div>
                  <div>
                    <div className="mb-1 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase dark:text-gray-400">
                      Date
                    </div>
                    <div className="text-sm text-[var(--orbit-text-secondary)] dark:text-gray-200">
                      {selectedTransaction.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)]/50 p-4 md:p-6 dark:border-gray-800 dark:bg-gray-800/30">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-5 py-3 text-sm font-bold text-[var(--orbit-text-secondary)] shadow-sm transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)] sm:px-4 sm:py-2.5 sm:text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Download className="h-4 w-4" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
