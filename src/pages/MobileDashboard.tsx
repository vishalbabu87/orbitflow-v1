import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  CreditCard,
  BarChart2,
  Sparkles,
  ChevronDown,
  Bot,
  Bell,
  ShieldAlert,
  ChevronRight,
  Download,
  Share2,
  Maximize2,
  Minimize2,
  Search,
  X,
  Zap,
  Play,
  CheckCircle2,
  Clock,
  TrendingUp,
  Cpu,
  GitBranch,
  Layers,
  Send,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { DashboardKPIs } from '../components/dashboard/DashboardKPIs';
import { DashboardLiveFeed } from '../components/dashboard/DashboardLiveFeed';
import { IntegrationsPanel } from '../components/dashboard/IntegrationsPanel';
import { TodoWidget } from '../components/dashboard/TodoWidget';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import type {
  PresetData,
  PresetKey,
  TimeFilter,
  AssistantMessage,
  SessionUser,
  KpiItem,
  ChartDataItem,
  ActivityItem,
} from '../types/dashboard';

interface MobileDashboardProps {
  activePreset: PresetData;
  PresetIcon: React.ComponentType<{ className?: string; size?: string | number }>;
  selectedKey: PresetKey;
  setSelectedKey: (key: PresetKey) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  diagnosticOpen: boolean;
  setDiagnosticOpen: (open: boolean) => void;
  timeFilter: TimeFilter;
  setTimeFilter: (filter: TimeFilter) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  assistantMessages: AssistantMessage[];
  assistantInput: string;
  setAssistantInput: (val: string) => void;
  handleSendAssistantMessage: (e: React.FormEvent) => void;
  isAssistantTyping: boolean;
  sessionUser: SessionUser;
  liveRuns: number;
  liveActivity: ActivityItem[];
  handleTriggerDiagnostic: () => void;
  getFilteredKpis: () => KpiItem[];
  getFilteredChartData: () => ChartDataItem[];
  PRESETS: Record<string, PresetData>;
  TOP_INTEGRATIONS?: unknown;
  ALERTS?: unknown;
  isShowcase?: boolean;
  isAnomaly?: boolean;
  setIsAnomaly?: (val: boolean) => void;
}

const WORKFLOW_ENGINES = [
  {
    id: 'w1',
    name: 'Slack Lead Sync',
    status: 'running',
    runs: 142,
    lastRun: '2m ago',
    type: 'Webhook',
  },
  {
    id: 'w2',
    name: 'Mailchimp Auto-Reply',
    status: 'running',
    runs: 89,
    lastRun: '5m ago',
    type: 'Email',
  },
  {
    id: 'w3',
    name: 'HubSpot Ingestion',
    status: 'paused',
    runs: 34,
    lastRun: '1h ago',
    type: 'CRM',
  },
  {
    id: 'w4',
    name: 'Notion DB Sync',
    status: 'running',
    runs: 201,
    lastRun: 'Just now',
    type: 'Database',
  },
  {
    id: 'w5',
    name: 'Stripe Invoice',
    status: 'error',
    runs: 12,
    lastRun: '30m ago',
    type: 'Payment',
  },
];

const AI_TEMPLATES = [
  {
    id: 't1',
    name: 'AI Lead Qualifier',
    category: 'Sales',
    description: 'Automatically qualify leads using GPT-4 scoring',
    uses: '2.4k',
    icon: Sparkles,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
  {
    id: 't2',
    name: 'Smart Email Drip',
    category: 'Marketing',
    description: 'AI-personalized email sequences based on behaviour',
    uses: '1.8k',
    icon: TrendingUp,
    color: 'text-[var(--orbit-accent-primary)]',
    bg: 'bg-[var(--orbit-accent-primary)]/10',
  },
  {
    id: 't3',
    name: 'Data Pipeline Builder',
    category: 'Analytics',
    description: 'Auto-generate ETL pipelines from data schemas',
    uses: '980',
    icon: Layers,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    id: 't4',
    name: 'Support Router',
    category: 'Support',
    description: 'AI customer support ticketing routing & assignment',
    uses: '1.2k',
    icon: Bot,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    id: 't5',
    name: 'Invoice Reminder Bot',
    category: 'Billing',
    description: 'Auto-detect overdue invoices and send email triggers',
    uses: '850',
    icon: CreditCard,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    id: 't6',
    name: 'Github PR Auto-reviewer',
    category: 'Engineering',
    description: 'Automate code style reviews using LLM rulesets',
    uses: '3.1k',
    icon: Zap,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
];

const ACTIVE_AUTOMATIONS = [
  { id: 'a1', name: 'User Sync', progress: 78, status: 'running', eta: '2m' },
  { id: 'a2', name: 'Invoice Batch', progress: 45, status: 'running', eta: '8m' },
  { id: 'a3', name: 'Lead Score Update', progress: 100, status: 'complete', eta: '-' },
];

export const MobileDashboard: React.FC<MobileDashboardProps> = ({
  activePreset,
  PresetIcon,
  selectedKey,
  setSelectedKey,
  isDropdownOpen,
  setIsDropdownOpen,
  diagnosticOpen,
  setDiagnosticOpen,
  timeFilter,
  setTimeFilter,
  isNotificationsOpen,
  setIsNotificationsOpen,
  isAssistantOpen,
  setIsAssistantOpen,
  assistantMessages,
  assistantInput,
  setAssistantInput,
  handleSendAssistantMessage,
  isAssistantTyping,
  liveRuns,
  liveActivity,
  handleTriggerDiagnostic,
  getFilteredKpis,
  getFilteredChartData,
  PRESETS,
  isAnomaly = false,
  setIsAnomaly,
  isShowcase = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChartFullscreen, setIsChartFullscreen] = useState(false);
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    const handleOpenAssistant = () => setIsAssistantOpen(true);
    window.addEventListener('open-assistant', handleOpenAssistant);

    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('assistant') === 'true') {
      setIsAssistantOpen(true);
      navigate('/dashboard', { replace: true });
    }

    return () => window.removeEventListener('open-assistant', handleOpenAssistant);
  }, [location.search, navigate, setIsAssistantOpen]);

  // Lock body scroll when chart fullscreen modal is active
  useEffect(() => {
    if (isChartFullscreen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isChartFullscreen]);

  const NOTIFICATIONS = [
    {
      id: 'n1',
      type: 'system',
      message: 'Data warehouse loaded 450k event batches successfully. All pipelines active.',
      time: '4h ago',
      icon: Activity,
      color: 'text-emerald-500',
    },
    {
      id: 'n2',
      type: 'system',
      message: 'Index optimization resolved query latency warning in production database.',
      time: '55m ago',
      icon: ShieldAlert,
      color: 'text-emerald-500',
    },
    {
      id: 'n3',
      type: 'billing',
      message: 'Your monthly invoice for May has been generated and is ready for download.',
      time: '3h ago',
      icon: CreditCard,
      color: 'text-[var(--orbit-accent-primary)]',
    },
    {
      id: 'n4',
      type: 'all',
      message: 'Daily revenue analytics report exported successfully.',
      time: 'Just now',
      icon: BarChart2,
      color: 'text-[var(--orbit-accent-primary)]',
    },
    {
      id: 'n5',
      type: 'system',
      message: 'Workflow deployment successful for user sync job.',
      time: '1h ago',
      icon: Activity,
      color: 'text-emerald-500',
    },
  ];

  const [notifTab, setNotifTab] = useState<'all' | 'alerts' | 'updates'>('all');
  const [dismissedNotifs, setDismissedNotifs] = useState<string[]>([]);
  const activeNotifs = NOTIFICATIONS.filter((n) => !dismissedNotifs.includes(n.id));
  const unreadCount = activeNotifs.length;
  const chartsScrollRef = useHorizontalScroll();
  const tablesScrollRef = useHorizontalScroll();

  const visibleNotifs = activeNotifs.filter(
    (n) =>
      notifTab === 'all' ||
      (notifTab === 'alerts' && n.type === 'system') ||
      (notifTab === 'updates' && n.type !== 'system')
  );

  const handleDownloadChart = () => {
    showToast('Chart export started. Your download will begin shortly.');
  };

  const handleShareChart = () => {
    if (navigator.share) {
      navigator.share({ title: 'OrbitFlow Chart', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('Dashboard URL copied to clipboard!');
      });
    }
  };

  const chartData = useMemo(() => {
    return getFilteredChartData();
  }, [getFilteredChartData]);

  const renderChartContent = (height: number | string, width?: number | string) => {
    const chart = (
      <AreaChart
        width={typeof width === 'number' ? width : undefined}
        height={typeof height === 'number' ? height : undefined}
        data={chartData}
        margin={{ top: 5, right: 2, left: -32, bottom: 0 }}
      >
        <defs>
          <linearGradient id="mobileChartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--orbit-accent-primary)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--orbit-accent-primary)" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 8, fill: '#9CA3AF', fontFamily: 'monospace' }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 8, fill: '#9CA3AF', fontFamily: 'monospace' }}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (
              active &&
              payload &&
              payload.length &&
              payload[0] &&
              payload[0].value !== undefined
            ) {
              return (
                <div className="rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-2 text-left shadow-xl backdrop-blur-md">
                  <p className="leading-relaxed mb-0.5 font-mono text-xs font-bold text-[var(--orbit-text-muted)] uppercase">
                    {label}
                  </p>
                  <div className="flex items-center gap-1 font-sans text-xs font-bold text-[var(--orbit-text-primary)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--orbit-accent-primary)]" />
                    <span>{Number(payload[0].value).toLocaleString()}</span>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--orbit-accent-primary)"
          strokeWidth={2.5}
          fillOpacity={1}
          fill="url(#mobileChartGradient)"
          isAnimationActive={false}
        />
      </AreaChart>
    );

    if (typeof width === 'string' || typeof height === 'string') {
      return (
        <ResponsiveContainer width={width as number | '100%'} height={height as number | '100%'}>
          {chart}
        </ResponsiveContainer>
      );
    }
    return chart;
  };

  return (
    <div className="flex w-full flex-col gap-2 px-3 pt-2 pb-6 text-[var(--orbit-text-primary)]">
      {/* ─── HEADER ROW ─── */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          {/* Workspace Selector */}
          <div className="relative z-40 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex min-h-[30px] w-full items-center gap-1.5 truncate rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-2 py-1 text-xs font-bold text-[var(--orbit-text-secondary)] shadow-sm hover:bg-[var(--orbit-elevated)]"
            >
              <PresetIcon size={12} className="shrink-0 text-[var(--orbit-accent-primary)]" />
              <span className="truncate">{activePreset.name}</span>
              <ChevronDown
                size={10}
                className={cn(
                  'ml-auto shrink-0 transition-transform',
                  isDropdownOpen && 'rotate-180'
                )}
              />
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 z-50 mt-1 w-56 rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-1 shadow-lg"
                  >
                    {(Object.keys(PRESETS) as PresetKey[]).map((key) => {
                      const item = PRESETS[key];
                      const ItemIcon = item.icon;
                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => {
                            setSelectedKey(key);
                            setIsDropdownOpen(false);
                          }}
                          className={cn(
                            'flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold',
                            key === selectedKey
                              ? 'bg-[var(--orbit-accent-primary)]/10 text-[var(--orbit-accent-primary)]'
                              : 'text-[var(--orbit-text-secondary)] hover:bg-[var(--orbit-elevated)]'
                          )}
                        >
                          <ItemIcon size={14} />
                          <span>{item.name}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Search Icon Button */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={cn(
              'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition hover:bg-[var(--orbit-elevated)]',
              isSearchOpen
                ? 'border-[var(--orbit-accent-primary)]/40 bg-[var(--orbit-accent-primary)]/10 text-[var(--orbit-accent-primary)]'
                : 'border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] text-[var(--orbit-text-secondary)]'
            )}
          >
            {isSearchOpen ? <X size={13} /> : <Search size={13} />}
          </button>

          {/* Notification Bell */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
              }}
              className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] text-[var(--orbit-text-secondary)] transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)]"
            >
              <Bell size={14} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-1.5 w-1.5 items-center justify-center rounded-full bg-red-500 ring-1 ring-[var(--orbit-base)]" />
              )}
            </button>
            <AnimatePresence>
              {isNotificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNotificationsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 z-50 mt-2 w-72 overflow-hidden rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] shadow-lg"
                  >
                    <div className="flex items-center justify-between border-b border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)] px-3 py-2">
                      <div className="flex gap-2">
                        {(['all', 'alerts', 'updates'] as const).map((tab) => (
                          <button
                            type="button"
                            key={tab}
                            onClick={() => setNotifTab(tab)}
                            className={cn(
                              'rounded-md px-2 py-0.5 font-mono text-xs font-bold tracking-wider uppercase transition',
                              notifTab === tab
                                ? 'bg-[var(--orbit-accent-primary)] text-white'
                                : 'text-[var(--orbit-text-muted)]'
                            )}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setDismissedNotifs(NOTIFICATIONS.map((n) => n.id))}
                        className="text-xs font-bold text-[var(--orbit-accent-primary)] hover:underline"
                      >
                        Mark all read
                      </button>
                    </div>
                    <div data-lenis-prevent="true" className="max-h-[260px] overflow-y-auto">
                      {visibleNotifs.length > 0 ? (
                        visibleNotifs.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => setIsNotificationsOpen(false)}
                            className="flex cursor-pointer gap-2.5 border-b border-[var(--orbit-border-subtle)] px-3 py-2.5 transition hover:bg-[var(--orbit-elevated)]"
                          >
                            <n.icon size={12} className={cn('mt-0.5 shrink-0', n.color)} />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs leading-relaxed text-[var(--orbit-text-primary)]">
                                {n.message}
                              </p>
                              <p className="leading-relaxed mt-0.5 font-mono text-xs font-bold text-[var(--orbit-text-muted)]">
                                {n.time}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-6 text-center text-xs text-[var(--orbit-text-muted)]">
                          No notifications
                        </div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search Bar – Expandable */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="relative">
                <Search
                  size={11}
                  className="absolute top-1/2 left-2.5 -translate-y-1/2 text-[var(--orbit-text-muted)]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search workflows, logs, contacts..."
                  autoFocus
                  className="min-h-[32px] w-full rounded-lg border border-[var(--orbit-accent-primary)]/40 bg-[var(--orbit-surface)] pr-3 pl-7 text-xs text-[var(--orbit-text-primary)] placeholder-[var(--orbit-text-muted)] outline-none focus:ring-1 focus:ring-[var(--orbit-accent-primary)]/30"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row 2: Time Filters & Sandbox Toggle */}
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex shrink-0 items-center gap-0.5 rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-elevated)] p-0.5">
            {(['Today', '7 Days', '30 Days', '90 Days'] as const).map(f => (
              <button key={f} onClick={() => setTimeFilter(f)}
                className={cn(
                  'h-8 rounded-lg font-bold font-mono tracking-wide transition-all',
                  isShowcase ? 'px-1.5 text-[10px]' : 'px-2.5 text-xs',
                  timeFilter === f
                    ? 'bg-[var(--orbit-accent-primary)] text-white shadow-sm'
                    : 'text-[var(--orbit-text-muted)] hover:text-[var(--orbit-text-primary)]'
                )}>
                {f === 'Today' ? '1D' : f.replace(' Days', 'D')}
              </button>
            ))}
          </div>

          {setIsAnomaly && (
            <div className={cn("flex items-center gap-1", isShowcase ? "shrink-0" : "flex-1 justify-end")}>
              <button
                type="button"
                onClick={() => setIsAnomaly(!isAnomaly)}
                className={cn(
                  'flex h-8 items-center justify-center gap-1.5 rounded-lg border font-mono font-bold uppercase transition-all',
                  isShowcase 
                    ? 'px-2 text-[10px] shrink-0' 
                    : 'px-4 text-xs flex-1 max-w-[120px]',
                  isAnomaly
                    ? 'border-red-500/30 bg-red-500/10 text-red-500'
                    : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
                )}
              >
                <span
                  className={cn(
                    'h-1.5 w-1.5 shrink-0 rounded-full',
                    isAnomaly
                      ? 'animate-pulse bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                      : 'bg-emerald-500'
                  )}
                />
                <span className="truncate">
                  {isAnomaly ? 'Anomaly' : 'Nominal'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex flex-col gap-2 py-0.5">
        {/* KPIs */}
        <div className="animate-fadeIn">
          <DashboardKPIs kpis={getFilteredKpis()} liveRuns={liveRuns} isMobile={true} isShowcase={isShowcase} />
        </div>

        {/* PERFORMANCE CHART */}
        <div className="animate-fadeIn space-y-2">
          <div className="rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-2.5 shadow-sm">
            <div className="mb-2 flex items-center justify-between border-b border-[var(--orbit-border-subtle)] pb-1.5">
              <div>
                <h3 className="font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-muted)] uppercase">
                  Performance Graph
                </h3>
                <p className="leading-relaxed mt-0.5 text-xs font-bold text-[var(--orbit-text-primary)]">
                  Event Processing Volume
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={handleDownloadChart}
                  title="Download chart"
                  className="flex min-h-[28px] min-w-[28px] items-center justify-center rounded-md bg-[var(--orbit-elevated)] p-1.5 text-[var(--orbit-text-muted)] transition hover:bg-[var(--orbit-overlay)] hover:text-[var(--orbit-text-primary)]"
                >
                  <Download size={11} />
                </button>
                <button
                  type="button"
                  onClick={handleShareChart}
                  title="Share chart"
                  className="flex min-h-[28px] min-w-[28px] items-center justify-center rounded-md bg-[var(--orbit-elevated)] p-1.5 text-[var(--orbit-text-muted)] transition hover:bg-[var(--orbit-overlay)] hover:text-[var(--orbit-text-primary)]"
                >
                  <Share2 size={11} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsChartFullscreen(true)}
                  title="Fullscreen chart"
                  className="flex min-h-[28px] min-w-[28px] items-center justify-center rounded-md bg-[var(--orbit-accent-primary)]/10 p-1.5 text-[var(--orbit-accent-primary)] transition hover:bg-[var(--orbit-accent-primary)]/20"
                >
                  <Maximize2 size={11} />
                </button>
              </div>
            </div>

            <div ref={chartsScrollRef} className="w-full">
              <div className="h-48 w-full min-w-0">{renderChartContent(192, '100%')}</div>
            </div>
          </div>

          {/* TODO WIDGET */}
          <TodoWidget isMobile={true} />

          {/* INTEGRATIONS */}
          <IntegrationsPanel isMobile={true} />
        </div>

        {/* WORKFLOW ENGINE */}
        <div className="animate-fadeIn rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-2.5 shadow-sm">
          <div className="mb-2 flex items-center justify-between border-b border-[var(--orbit-border-subtle)] pb-1.5">
            <div>
              <h3 className="font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-muted)] uppercase">
                Automation
              </h3>
              <p className="leading-relaxed mt-0.5 text-xs font-bold text-[var(--orbit-text-primary)]">
                Workflow Engine
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/executions')}
              className="flex items-center gap-1 rounded-lg border border-[var(--orbit-accent-primary)]/30 bg-[var(--orbit-accent-primary)]/8 px-2 py-1 font-mono text-xs font-bold text-[var(--orbit-accent-primary)] transition hover:bg-[var(--orbit-accent-primary)]/15"
            >
              <Zap size={9} /> View All
            </button>
          </div>
          <div className="flex flex-col gap-1.5">
            {WORKFLOW_ENGINES.map((wf) => (
              <div
                key={wf.id}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-[var(--orbit-border-subtle)] px-2.5 py-1.5 transition hover:bg-[var(--orbit-elevated)]"
                onClick={() => navigate('/executions')}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <div
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-md',
                      wf.status === 'running'
                        ? 'bg-emerald-500/10'
                        : wf.status === 'paused'
                          ? 'bg-amber-500/10'
                          : 'bg-red-500/10'
                    )}
                  >
                    <GitBranch
                      size={9}
                      className={cn(
                        wf.status === 'running'
                          ? 'text-emerald-500'
                          : wf.status === 'paused'
                            ? 'text-amber-500'
                            : 'text-red-500'
                      )}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="leading-relaxed truncate text-xs font-bold text-[var(--orbit-text-primary)]">
                      {wf.name}
                    </p>
                    <p className="leading-relaxed font-mono text-xs text-[var(--orbit-text-muted)]">
                      {wf.type} · {wf.lastRun}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="font-mono text-xs text-[var(--orbit-text-muted)]">
                    {wf.runs} runs
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 font-mono text-xs font-bold uppercase',
                      wf.status === 'running'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : wf.status === 'paused'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-red-500/10 text-red-500'
                    )}
                  >
                    {wf.status === 'running' ? (
                      <span className="flex items-center gap-0.5">
                        <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-emerald-500" />{' '}
                        Live
                      </span>
                    ) : (
                      wf.status
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVE AUTOMATION MONITOR */}
        <div className="animate-fadeIn rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-2.5 shadow-sm">
          <div className="mb-2 flex items-center justify-between border-b border-[var(--orbit-border-subtle)] pb-1.5">
            <div>
              <h3 className="font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-muted)] uppercase">
                Real-time
              </h3>
              <p className="leading-relaxed mt-0.5 text-xs font-bold text-[var(--orbit-text-primary)]">
                Active Automation Monitor
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5">
              <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
              <span className="font-mono text-xs font-bold text-emerald-500 uppercase">
                Live
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {ACTIVE_AUTOMATIONS.map((auto) => (
              <div
                key={auto.id}
                className="rounded-lg border border-[var(--orbit-border-subtle)] px-2.5 py-2"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Cpu size={9} className="text-[var(--orbit-accent-primary)]" />
                    <span className="text-xs font-bold text-[var(--orbit-text-primary)]">
                      {auto.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {auto.status === 'complete' ? (
                      <span className="flex items-center gap-0.5 font-mono text-xs font-bold text-emerald-500">
                        <CheckCircle2 size={9} /> Done
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5 font-mono text-xs font-bold text-[var(--orbit-accent-primary)]">
                        <Clock size={9} /> ETA {auto.eta}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--orbit-elevated)]">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-700',
                      auto.status === 'complete'
                        ? 'bg-emerald-500'
                        : 'bg-[var(--orbit-accent-primary)]'
                    )}
                    style={{ width: `${auto.progress}%` }}
                  />
                </div>
                <p className="leading-relaxed mt-1 text-right font-mono text-xs text-[var(--orbit-text-muted)]">
                  {auto.progress}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TRENDING AI AUTOMATION TEMPLATES */}
        <div className="animate-fadeIn rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-2.5 shadow-sm">
          <div className="mb-2 flex items-center justify-between border-b border-[var(--orbit-border-subtle)] pb-1.5">
            <div>
              <h3 className="font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-muted)] uppercase">
                Discover
              </h3>
              <p className="leading-relaxed mt-0.5 text-xs font-bold text-[var(--orbit-text-primary)]">
                Trending AI Automation Templates
              </p>
            </div>
            <span className="rounded-full bg-violet-500/10 px-1.5 py-0.5 font-mono text-xs font-bold text-violet-500">
              New
            </span>
          </div>
          <div className="flex max-h-[260px] flex-col gap-2 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[var(--orbit-border-hover)]">
            {AI_TEMPLATES.map((tpl) => {
              const TplIcon = tpl.icon;
              return (
                <div
                  key={tpl.id}
                  className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-[var(--orbit-border-subtle)] px-2.5 py-2 transition hover:bg-[var(--orbit-elevated)]"
                >
                  <div
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
                      tpl.bg
                    )}
                  >
                    <TplIcon size={13} className={tpl.color} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="leading-relaxed text-xs font-bold text-[var(--orbit-text-primary)]">
                        {tpl.name}
                      </p>
                      <span className="shrink-0 font-mono text-xs text-[var(--orbit-text-muted)]">
                        {tpl.uses} uses
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--orbit-text-muted)]">
                      {tpl.description}
                    </p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="rounded-full bg-[var(--orbit-elevated)] px-1.5 py-0.5 font-mono text-xs text-[var(--orbit-text-muted)]">
                        {tpl.category}
                      </span>
                      <button
                        type="button"
                        className="flex items-center gap-0.5 rounded-md bg-[var(--orbit-accent-primary)]/10 px-2 py-0.5 font-mono text-xs font-bold text-[var(--orbit-accent-primary)] transition hover:bg-[var(--orbit-accent-primary)]/20"
                      >
                        <Play size={7} /> Use Template
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LIVE FEED */}
        <div className="animate-fadeIn rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-2.5 shadow-sm">
          <DashboardLiveFeed
            listTitle={activePreset.listTitle}
            liveActivity={liveActivity}
            searchQuery={searchQuery}
            onRunAudit={handleTriggerDiagnostic}
            isMobile={true}
          />
        </div>

        {/* ACTIVE REGISTRIES TABLE */}
        <div className="animate-fadeIn rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-2.5 shadow-sm">
          <h3 className="mb-1.5 border-b border-[var(--orbit-border-subtle)] pb-1 font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-muted)] uppercase">
            Active Registries
          </h3>
          <div
            ref={tablesScrollRef}
            className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-[var(--orbit-border-hover)] hover:[&::-webkit-scrollbar-thumb]:bg-[var(--orbit-text-muted)] [&::-webkit-scrollbar-track]:bg-[var(--orbit-elevated)]"
          >
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--orbit-border-subtle)]">
                  <th className="py-1 text-xs font-bold text-[var(--orbit-text-muted)] uppercase">
                    Registry
                  </th>
                  <th className="py-1 text-right text-xs font-bold text-[var(--orbit-text-muted)] uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'UserSync Trigger', status: 'Active', color: 'emerald' },
                  { name: 'Alert Dispatcher', status: 'Active', color: 'emerald' },
                  { name: 'Metrics Aggregator', status: 'Idle', color: 'amber' },
                ].map((row) => (
                  <tr
                    key={row.name}
                    className="border-b border-[var(--orbit-border-subtle)] last:border-0"
                  >
                    <td className="py-2 font-semibold text-[var(--orbit-text-primary)]">
                      {row.name}
                    </td>
                    <td className="py-2 text-right">
                      <span
                        className={`rounded-md bg-${row.color}-500/10 px-1.5 py-0.5 font-bold text-${row.color}-500`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={() => navigate('/executions')}
            className="mt-2.5 flex min-h-[32px] w-full items-center justify-center gap-1 text-xs font-bold text-[var(--orbit-accent-primary)] hover:underline"
          >
            <span>Manage Registries & Executions</span>
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* AI DIAGNOSTIC PULSE */}
      <div className="mt-1 pb-2">
        <AnimatePresence>
          {diagnosticOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-2 flex items-start gap-3 rounded-xl border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 p-3 text-left shadow-sm"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--orbit-accent-primary)]/20">
                <Sparkles size={14} className="text-[var(--orbit-accent-primary)]" />
              </div>
              <div className="flex-1">
                <h4 className="font-mono text-xs font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
                  AI DIAGNOSTIC PULSE
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-[var(--orbit-text-secondary)]">
                  {activePreset.diagnosticMsg}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDiagnosticOpen(false)}
                className="cursor-pointer p-1 text-[var(--orbit-text-muted)] hover:text-[var(--orbit-text-primary)]"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CHART FULLSCREEN MODAL */}
      <AnimatePresence>
        {isChartFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col bg-[#0B0F19] text-white w-screen h-screen overflow-hidden"
          >
            {/* Floating Top-Left Title */}
            <div className="absolute top-3 left-4 z-50 pointer-events-none rounded-xl bg-black/60 p-2 text-left backdrop-blur-md">
              <p className="font-mono text-[9px] font-bold tracking-widest text-gray-400 uppercase">
                Performance Graph
              </p>
              <p className="text-xs font-bold text-white">
                Event Processing Volume
              </p>
            </div>

            {/* Floating Top-Right Controls */}
            <div className="absolute top-3 right-4 z-50 flex items-center gap-1.5 rounded-xl bg-black/60 p-1.5 backdrop-blur-md">
              <button
                type="button"
                onClick={handleDownloadChart}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:text-white transition"
              >
                <Download size={13} />
              </button>
              <button
                type="button"
                onClick={() => setIsChartFullscreen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:text-white transition"
              >
                <Minimize2 size={13} />
              </button>
            </div>

            {/* Absolute Full Viewport Chart Container */}
            <div className="relative flex-grow w-full h-full flex items-center justify-center p-2 pt-16">
              {renderChartContent(viewportSize.height - 72, viewportSize.width - 24)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ASSISTANT DRAWER */}
      <AnimatePresence>
        {isAssistantOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-[52px] right-0 bottom-0 left-0 z-[200] flex flex-col bg-[var(--orbit-base)] text-[var(--orbit-text-primary)]"
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] px-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--orbit-accent-primary)]/30 bg-[color-mix(in_srgb,var(--orbit-accent-primary)_15%,transparent)]">
                  <Bot size={16} className="text-[var(--orbit-accent-primary)]" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-extrabold text-[var(--orbit-text-primary)]">
                    Orbit Assistant
                  </h4>
                  <span className="block font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
                    Agent Active
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAssistantOpen(false)}
                className="rounded-full bg-[var(--orbit-elevated)] p-1.5 text-[var(--orbit-text-muted)] transition hover:bg-[var(--orbit-border-subtle)] hover:text-[var(--orbit-text-primary)]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 text-left text-xs font-semibold">
              {assistantMessages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className={cn(
                    'max-w-[85%] rounded-2xl p-3 leading-relaxed shadow-sm',
                    msg.sender === 'user'
                      ? 'ml-auto rounded-tr-none bg-[var(--orbit-accent-primary)] text-white'
                      : 'rounded-tl-none border border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)] text-[var(--orbit-text-primary)]'
                  )}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isAssistantTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex w-16 items-center gap-1 rounded-2xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)] p-3 text-center shadow-sm"
                >
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--orbit-accent-primary)]"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--orbit-accent-primary)]"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--orbit-accent-primary)]"
                    style={{ animationDelay: '300ms' }}
                  />
                </motion.div>
              )}
            </div>

            <form
              onSubmit={handleSendAssistantMessage}
              className="flex shrink-0 gap-2 border-t border-[var(--orbit-border-subtle)] bg-[var(--orbit-elevated)]/40 p-3"
            >
              <input
                type="text"
                value={assistantInput}
                onChange={(e) => setAssistantInput(e.target.value)}
                placeholder="Ask Orbit Assistant..."
                className="h-10 min-w-0 flex-1 rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-4 text-xs text-[var(--orbit-text-primary)] placeholder-[var(--orbit-text-muted)] outline-none focus:border-[var(--orbit-accent-primary)]/40 focus:ring-1 focus:ring-[var(--orbit-accent-primary)]/20"
              />
              <button
                type="submit"
                disabled={!assistantInput.trim()}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[var(--orbit-accent-primary)] text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-4 w-full shrink-0" />
      {toastMsg && (
        <div className="animate-in slide-in-from-bottom-4 fixed right-4 bottom-4 z-[999] flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600 shadow-lg dark:border-emerald-900/30 dark:bg-emerald-950/90 dark:text-emerald-400">
          <Check size={16} />
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default MobileDashboard;
