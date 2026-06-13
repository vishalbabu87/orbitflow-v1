import React, { useState } from 'react';
import { Database, Plus, Check, ArrowUpRight, ArrowDownRight, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';

export const Analytics = () => {
  const [toastMsg, setToastMsg] = React.useState<string | null>(null);
  

  const [typeFilter, setTypeFilter] = useState('All Types');
  const scrollRef = useHorizontalScroll();

  const kpis = [
    { label: 'CONNECTED SOURCES', value: '14 sources', trend: '+1 new', positive: true },
    { label: 'DATA INGESTED', value: '4.2 TB volume', trend: '+18.4%', positive: true },
    { label: 'AVG QUERY LATENCY', value: '42 latency (ms)', trend: '-4ms', positive: true },
    { label: 'MODEL RUNS EXECUTED', value: '82 runs', trend: '+6 updated', neutral: true },
  ];

  const sources = [
    {
      name: 'PostgreSQL Prod',
      type: 'Database',
      status: 'Active',
      sync: 'Just now',
      latency: '12ms',
      records: '4.2M',
    },
    {
      name: 'Stripe API',
      type: 'Payments',
      status: 'Active',
      sync: '5m ago',
      latency: '45ms',
      records: '840K',
    },
    {
      name: 'HubSpot CRM',
      type: 'CRM',
      status: 'Warning',
      sync: '15m ago',
      latency: '120ms',
      records: '1.2M',
    },
    {
      name: 'Google Ads',
      type: 'Marketing',
      status: 'Active',
      sync: '1h ago',
      latency: '32ms',
      records: '45K',
    },
    {
      name: 'Mixpanel',
      type: 'Analytics',
      status: 'Paused',
      sync: '2d ago',
      latency: '-',
      records: '-',
    },
  ];

  const filteredSources =
    typeFilter === 'All Types' ? sources : sources.filter((s) => s.type === typeFilter);

  return (
    <div className="animate-in fade-in relative mx-auto w-full flex-1 px-4 py-6 text-[var(--orbit-text-primary)] duration-500 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-col justify-between gap-3 md:mb-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-base font-extrabold text-[var(--orbit-text-primary)] sm:text-lg md:text-2xl">
            Data Analytics
          </h1>
          <p className="leading-relaxed mt-0.5 text-xs font-normal text-[var(--orbit-text-secondary)] sm:text-sm">
            Monitor data ingestion, query latency, and pipeline health.
          </p>
        </div>
        <button
          type="button"
          className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--orbit-accent-primary)] px-3 py-2 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition hover:bg-[#0c9594] sm:gap-2 sm:px-5 sm:py-3 sm:text-sm" 
          onClick={() => { setToastMsg('Opening integration settings...'); setTimeout(() => setToastMsg(null), 3000); }}
        >
          <Plus size={14} className="sm:h-4 sm:w-4" /> Connect Source
        </button>
      </div>

      {/* KPIs */}
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-2 md:mb-8 md:gap-4 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] p-2.5 sm:p-3 md:rounded-2xl md:p-5"
          >
            <div className="mb-0.5 font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase md:mb-2 md:text-xs">
              {kpi.label}
            </div>
            <div className="flex items-end justify-between">
              <div className="text-sm font-bold text-[var(--orbit-text-primary)] sm:text-base md:text-2xl">
                {kpi.value}
              </div>
              <div
                className={cn(
                  'flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-bold sm:gap-1 sm:px-2 sm:text-xs',
                  kpi.positive
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : kpi.neutral
                      ? 'bg-[var(--orbit-accent-primary)]/10 text-[var(--orbit-accent-primary)]'
                      : 'bg-red-500/10 text-red-600'
                )}
              >
                {kpi.positive ? (
                  <ArrowUpRight size={10} />
                ) : kpi.neutral ? null : (
                  <ArrowDownRight size={10} />
                )}
                {kpi.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tables & Heatmap Grid */}
      <div className="grid gap-3 md:gap-6 xl:grid-cols-3">
        {/* Connected Sources Table */}
        <div className="overflow-hidden rounded-2xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] md:rounded-3xl xl:col-span-2">
          <div className="flex items-center justify-between border-b border-[var(--orbit-border-subtle)] p-3.5 sm:p-5">
            <h3 className="text-xs font-extrabold text-[var(--orbit-text-primary)] sm:text-sm">
              Connected Sources
            </h3>
            <div className="relative flex items-center gap-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="cursor-pointer appearance-none rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] pl-2 pr-8 py-1 text-xs font-bold text-[var(--orbit-text-secondary)] focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:pl-3 sm:pr-8 sm:py-1.5 sm:text-xs"
              >
                <option value="All Types">All Types</option>
                <option value="Database">Database</option>
                <option value="CRM">CRM</option>
                <option value="Analytics">Analytics</option>
                <option value="Payments">Payments</option>
                <option value="Marketing">Marketing</option>
              </select>
              <div className="pointer-events-none absolute right-2 text-[var(--orbit-text-secondary)]">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
          <div className="max-h-[220px] overflow-x-auto overflow-y-auto sm:max-h-[300px] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--orbit-border-hover)] hover:[&::-webkit-scrollbar-thumb]:bg-[var(--orbit-text-muted)] [&::-webkit-scrollbar-track]:bg-[var(--orbit-elevated)]">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[var(--orbit-elevated)] font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase sm:text-xs">
                <tr>
                  <th className="border-b border-[var(--orbit-border-subtle)] px-3 py-2 sm:px-5 sm:py-3">
                    Source
                  </th>
                  <th className="border-b border-[var(--orbit-border-subtle)] px-3 py-2 sm:px-5 sm:py-3">
                    Type
                  </th>
                  <th className="border-b border-[var(--orbit-border-subtle)] px-3 py-2 sm:px-5 sm:py-3">
                    Status
                  </th>
                  <th className="hidden border-b border-[var(--orbit-border-subtle)] px-3 py-2 sm:px-5 sm:py-3 md:table-cell">
                    Last Sync
                  </th>
                  <th className="border-b border-[var(--orbit-border-subtle)] px-3 py-2 sm:px-5 sm:py-3">
                    Latency
                  </th>
                  <th className="border-b border-[var(--orbit-border-subtle)] px-3 py-2 sm:px-5 sm:py-3">
                    Records
                  </th>
                  <th className="border-b border-[var(--orbit-border-subtle)] px-3 py-2 text-right sm:px-5 sm:py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--orbit-border-subtle)] font-medium text-[var(--orbit-text-secondary)]">
                {filteredSources.length > 0 ? (
                  filteredSources.map((source, i) => (
                  <tr
                    key={i}
                    className="transition-colors hover:bg-[var(--orbit-surface-hover)] dark:hover:bg-gray-800/30"
                  >
                    <td className="px-3 py-2.5 sm:px-5 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--orbit-elevated)] sm:h-8 sm:w-8">
                          <Database size={12} className="sm:h-4 sm:w-4 text-[var(--orbit-accent-primary)]" />
                        </div>
                        <span className="font-bold text-[var(--orbit-text-primary)]">
                          {source.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 sm:px-5 sm:py-4 font-mono text-xs text-[var(--orbit-text-secondary)]">{source.type}</td>
                    <td className="px-3 py-2.5 sm:px-5 sm:py-4">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-md px-2 py-1 text-xs font-bold tracking-widest uppercase sm:text-xs',
                          source.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : source.status === 'Warning'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-500'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                        )}
                      >
                        {source.status}
                      </span>
                    </td>
                    <td className="hidden px-3 py-2.5 sm:px-5 sm:py-4 font-mono text-xs text-[var(--orbit-text-muted)] md:table-cell">{source.sync}</td>
                    <td className="px-3 py-2.5 sm:px-5 sm:py-4 font-mono text-xs font-bold text-[var(--orbit-text-primary)]">{source.latency}</td>
                    <td className="border-b border-[var(--orbit-border-subtle)] px-3 py-2.5 sm:px-5 sm:py-4 font-mono text-xs text-[var(--orbit-text-secondary)]">{source.records}</td>
                    <td className="px-3 py-2.5 text-right sm:px-5 sm:py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => { setToastMsg(`Syncing ${source.name}...`); setTimeout(() => setToastMsg(null), 3000); }}
                          className="cursor-pointer rounded p-1.5 text-gray-400 transition-colors hover:bg-[var(--orbit-border-mid)] hover:text-[var(--orbit-accent-primary)] dark:hover:text-[var(--orbit-accent-primary)]"
                          title="Sync Now"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => { setToastMsg(`${source.name} options...`); setTimeout(() => setToastMsg(null), 3000); }}
                          className="cursor-pointer rounded p-1.5 text-gray-400 transition-colors hover:bg-[var(--orbit-border-mid)] hover:text-gray-700 dark:hover:text-gray-200"
                          title="More Options"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-8 text-center text-sm text-[var(--orbit-text-muted)]"
                    >
                      No sources found for {typeFilter}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cohort Retention Heatmap */}
        <div className="overflow-hidden rounded-2xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] md:rounded-3xl">
          <div className="border-b border-[var(--orbit-border-subtle)] p-3.5 sm:p-5">
            <h3 className="text-xs font-extrabold text-[var(--orbit-text-primary)] sm:text-sm">
              Cohort Retention Heatmap
            </h3>
            <p className="leading-relaxed mt-0.5 text-xs text-[var(--orbit-text-muted)] sm:text-xs">
              User engagement over 6 weeks
            </p>
          </div>
          <div
            ref={scrollRef}
            className="w-full cursor-grab overflow-x-auto active:cursor-grabbing [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--orbit-border-hover)] hover:[&::-webkit-scrollbar-thumb]:bg-[var(--orbit-text-muted)] [&::-webkit-scrollbar-track]:bg-[var(--orbit-elevated)]"
          >
            <div className="w-max p-3.5 sm:p-5">
              <div className="grid min-w-[480px] grid-cols-7 gap-1">
                <div className="col-span-1 font-mono text-xs font-bold text-[var(--orbit-text-muted)]">
                  Cohort
                </div>
                {[1, 2, 3, 4, 5, 6].map((w) => (
                  <div
                    key={w}
                    className="text-center font-mono text-xs font-bold text-[var(--orbit-text-muted)]"
                  >
                    W{w}
                  </div>
                ))}

                {['Oct 1', 'Oct 8', 'Oct 15', 'Oct 22', 'Oct 29'].map((date, r) => (
                  <React.Fragment key={r}>
                    <div className="flex items-center font-mono text-xs text-[var(--orbit-text-secondary)]">
                      {date}
                    </div>
                    {[95, 80, 65, 50, 35, 20].map((val, c) => {
                      const pct = Math.max(0, val - r * 10);
                      return (
                        <div
                          key={c}
                          className="dark:text-gray-150 flex h-8 items-center justify-center rounded-sm font-mono text-xs font-bold text-[var(--orbit-text-secondary)] transition-all hover:scale-105"
                          style={{
                            backgroundColor: `color-mix(in srgb, var(--orbit-accent-primary) ${pct}%, var(--orbit-elevated))`,
                          }}
                        >
                          {pct}%
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      
      {toastMsg && (
        <div className="animate-in slide-in-from-bottom-4 fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600 shadow-lg dark:border-emerald-900/30 dark:bg-emerald-950/90 dark:text-emerald-400">
          <Check size={16} />
          {toastMsg}
        </div>
      )}
    </div>
    </div>
  );
};

export default Analytics;
