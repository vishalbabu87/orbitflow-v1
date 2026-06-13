import React from 'react';
import { motion } from 'framer-motion';
import {
  FilePlus,
  PlugZap,
  UserPlus,
  Download,
  Sparkles,
  TrendingUp,
  Zap,
  TrendingDown,
  ChevronRight,
  Users2,
} from 'lucide-react';

interface IntegrationItem {
  name: string;
  usage: number;
  runs: string;
  dot: string;
}

interface TeamActivityItem {
  user: string;
  action: string;
  target: string;
  avatar: string;
  color: string;
  time: string;
}

interface AlertItem {
  id: string;
  type: string;
  icon: React.ComponentType<{
    className?: string;
    size?: string | number;
    'aria-hidden'?: boolean | 'true' | 'false';
  }>;
  message: string;
  time: string;
  color: string;
  bg: string;
  border: string;
}

interface DashboardWidgetsProps {
  topIntegrations: IntegrationItem[];
  teamActivity: TeamActivityItem[];
  alerts: AlertItem[];
  onActionClick: (label: string) => void;
}

export const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({
  topIntegrations,
  teamActivity,
  alerts,
  onActionClick,
}) => {
  return (
    <div className="space-y-8">
      {/* -- ALERT CENTER + SYSTEM HEALTH STRIP (Moved down & Sleeker height) -- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Alert Center */}
        <div className="rounded-2xl border border-gray-100 bg-white p-3.5 text-left lg:col-span-8 dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)]">
          <span className="mb-2.5 block font-mono text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">
            Alert Center
          </span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex min-h-[44px] items-center gap-2.5 rounded-lg border p-3 sm:min-h-0 sm:p-2 ${alert.bg} ${alert.border} cursor-pointer transition-opacity hover:opacity-90`}
              >
                <alert.icon size={13} className={`${alert.color} shrink-0`} aria-hidden="true" />
                <p className="leading-relaxed flex-1 truncate text-xs font-semibold text-gray-800 dark:text-gray-200">
                  {alert.message}
                </p>
                <span className="shrink-0 font-mono text-xs text-gray-400">{alert.time}</span>
                <ChevronRight
                  size={11}
                  className="shrink-0 text-gray-300 dark:text-gray-600"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>

        {/* System Health Strip */}
        <div className="rounded-2xl border border-gray-100 bg-white p-3.5 text-left lg:col-span-4 dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)]">
          <span className="mb-2.5 block font-mono text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">
            System Health
          </span>
          <div className="space-y-2">
            {[
              { label: 'API Gateway', status: 'Operational', color: 'bg-emerald-500' },
              { label: 'Webhook Engine', status: 'Operational', color: 'bg-emerald-500' },
              { label: 'Slack Integration', status: 'Degraded', color: 'bg-amber-500' },
              { label: 'Credit Balance', status: 'Warning', color: 'bg-amber-500' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${s.color} ${s.color === 'bg-emerald-500' ? 'animate-pulse' : ''}`}
                  />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {s.label}
                  </span>
                </div>
                <span
                  className={`font-mono text-xs font-bold ${s.status === 'Operational' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -- QUICK ACTIONS + AI INSIGHT + TOP INTEGRATIONS ROW -- */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Quick Actions */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 text-left lg:col-span-4 dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)]">
          <span className="mb-4 block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
            Quick Actions
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                label: 'New Workflow',
                icon: FilePlus,
                color: 'text-[var(--orbit-accent-primary)]',
                bg: 'bg-teal-50 dark:bg-teal-950/30',
              },
              {
                label: 'Connect Integration',
                icon: PlugZap,
                color: 'text-violet-500',
                bg: 'bg-violet-50 dark:bg-violet-950/30',
              },
              {
                label: 'Invite Member',
                icon: UserPlus,
                color: 'text-sky-500',
                bg: 'bg-sky-50 dark:bg-sky-950/30',
              },
              {
                label: 'Export Report',
                icon: Download,
                color: 'text-emerald-500',
                bg: 'bg-emerald-50 dark:bg-emerald-950/30',
              },
            ].map((action) => (
              <button
                type="button"
                key={action.label}
                onClick={() => onActionClick(action.label)}
                aria-label={action.label}
                className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-gray-100 p-3 transition-all hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700 ${action.bg} group`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg border border-white/50 bg-white shadow-sm sm:h-8 sm:w-8 dark:border-gray-700 dark:bg-gray-900`}
                >
                  <action.icon size={14} className={action.color} aria-hidden="true" />
                </div>
                <span className="text-center text-xs leading-tight font-bold text-gray-700 dark:text-gray-300">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="relative overflow-hidden rounded-2xl border border-teal-500/15 bg-gradient-to-br from-teal-500/8 via-transparent to-transparent p-5 text-left lg:col-span-4 dark:border-teal-900/40 dark:from-teal-950/30">
          <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-teal-400/10 to-transparent" />
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--orbit-accent-primary)] shadow-sm">
              <Sparkles size={13} className="text-white" aria-hidden="true" />
            </div>
            <span className="font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
              AI Insight
            </span>
            <span className="rounded-full border border-teal-200 bg-teal-50 px-1.5 py-0.5 font-mono text-xs font-bold text-[var(--orbit-accent-primary)] dark:border-teal-900 dark:bg-teal-950/40">
              2026
            </span>
          </div>
          <div className="space-y-2 text-left">
            <div className="flex items-start gap-2">
              <TrendingUp
                size={12}
                className="mt-0.5 shrink-0 text-emerald-500"
                aria-hidden="true"
              />
              <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300">
                <strong>Workflow success</strong> increased 12% this week - highest in 30 days.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Zap size={12} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300">
                <strong>Slack triggers</strong> drive 43% of all executions this period.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <TrendingDown size={12} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300">
                <strong>3 workflows</strong> have recurring timeout errors - review config.
              </p>
            </div>
          </div>
        </div>

        {/* Top Integrations */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 text-left lg:col-span-4 dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Top Integrations
            </span>
            <span className="font-mono text-xs text-gray-400 dark:text-gray-500">by usage</span>
          </div>
          <div className="space-y-3">
            {topIntegrations.map((intg) => (
              <div key={intg.name}>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${intg.dot}`} />
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      {intg.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-400">{intg.runs} runs</span>
                    <span className="w-7 text-right font-mono text-xs font-bold text-gray-600 dark:text-gray-300">
                      {intg.usage}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${intg.usage}%` }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="h-full rounded-full bg-[var(--orbit-accent-primary)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -- TEAM ACTIVITY -- */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 text-left dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users2 size={13} className="text-gray-400" aria-hidden="true" />
            <span className="font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Team Activity
            </span>
          </div>
          <button
            type="button"
            className="cursor-pointer text-xs font-bold text-[var(--orbit-accent-primary)] hover:underline"
          >
            View all
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {teamActivity.map((event, i) => (
            <div
              key={i}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3 transition-colors hover:border-gray-200 dark:border-gray-800 dark:bg-gray-900/30 dark:hover:border-gray-700"
            >
              <div
                className={`h-11 w-11 rounded-full sm:h-8 sm:w-8 ${event.color} flex shrink-0 items-center justify-center text-xs font-extrabold text-white`}
              >
                {event.avatar}
              </div>
              <div className="min-w-0">
                <p className="leading-relaxed text-xs font-bold text-gray-900 dark:text-white">{event.user}</p>
                <p className="text-gray-505 text-xs leading-tight dark:text-gray-500">
                  {event.action}{' '}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {event.target}
                  </span>
                </p>
                <span className="mt-0.5 block font-mono text-xs text-gray-400">{event.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
