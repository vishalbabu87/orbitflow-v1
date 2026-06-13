import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
  Search,
  Settings,
    Bot,
  LogOut,
  Download,
  Maximize2,
  Minimize2,
  CheckCircle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid as RechartsCartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer as RechartsResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { DashboardKPIs } from '../components/dashboard/DashboardKPIs';
import { DashboardLiveFeed } from '../components/dashboard/DashboardLiveFeed';
import { DashboardTables } from '../components/dashboard/DashboardTables';
import { DashboardAssistant } from '../components/dashboard/DashboardAssistant';
import { IntegrationsPanel } from '../components/dashboard/IntegrationsPanel';
import { TodoWidget } from '../components/dashboard/TodoWidget';
import { OrbitLogo } from '../components/ui/OrbitLogo';


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

/* â”€â”€â”€ Props â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface DesktopDashboardProps {
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
  syncLabel: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
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
  handleLogout: () => void;
  handleTriggerDiagnostic: () => void;
  getFilteredKpis: () => KpiItem[];
  getFilteredChartData: () => ChartDataItem[];
  PRESETS: Record<string, PresetData>;
  TOP_INTEGRATIONS?: unknown;
  TEAM_ACTIVITY?: unknown;
  ALERTS?: unknown;
  isShowcase?: boolean;
  isAnomaly?: boolean;
  setIsAnomaly?: (val: boolean) => void;
}

/* â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export const DesktopDashboard: React.FC<DesktopDashboardProps> = ({
  activePreset,
  PresetIcon,
  selectedKey,
  setSelectedKey,
  isDropdownOpen,
  setIsDropdownOpen,
  timeFilter,
  setTimeFilter,
  syncLabel,
  searchQuery,
  setSearchQuery,
  
  
  isProfileOpen,
  setIsProfileOpen,
  isAssistantOpen,
  setIsAssistantOpen,
  assistantMessages,
  assistantInput,
  setAssistantInput,
  handleSendAssistantMessage,
  isAssistantTyping,
  sessionUser,
  liveRuns,
  liveActivity,
  handleLogout,
  handleTriggerDiagnostic,
  getFilteredKpis,
  getFilteredChartData,
  PRESETS,
  isShowcase,
  isAnomaly = false,
  setIsAnomaly,
}) => {
  const navigate = useNavigate();
  const [isChartFullscreen, setIsChartFullscreen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };
  const chartData = useMemo(() => {
    return getFilteredChartData();
  }, [getFilteredChartData]);

  const userInitials = (sessionUser?.name || 'Demo User')
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-0 text-[var(--orbit-text-primary)]">
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          TOPBAR â€” Search Â· Assistant Â· Bell Â· Profile
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div
        className={cn(
          'sticky top-0 z-30 flex items-center justify-between border-b border-[var(--orbit-border-subtle)] bg-[var(--orbit-base)]/90 backdrop-blur-md',
          isShowcase ? 'mb-4 h-12 px-4' : 'mb-6 h-16 px-6'
        )}
      >
        {/* Left: Page Title */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <OrbitLogo
              showText={true}
              size={isShowcase ? 20 : 28}
              textClass={
                isShowcase
                  ? 'text-sm text-[var(--orbit-text-primary)]'
                  : 'text-xl text-[var(--orbit-text-primary)]'
              }
            />
          </div>
          <div
            className={cn(
              'hidden bg-[var(--orbit-border-subtle)] sm:block',
              isShowcase ? 'h-6 w-[1px]' : 'h-8 w-[1px]'
            )}
          />
          <div>
            <h1
              className={cn(
                'font-bold text-[var(--orbit-text-primary)]',
                isShowcase ? 'text-base' : 'text-2xl'
              )}
            >
              {activePreset.name}
            </h1>
            <p
              className={cn(
                'text-[var(--orbit-text-muted)]',
                isShowcase ? 'text-xs leading-tight' : 'text-sm'
              )}
            >
              {activePreset.subtitle} Â· Updated {syncLabel}
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className={cn('flex items-center', isShowcase ? 'gap-1.5' : 'gap-2')}>
          {/* Search Bar */}
          <div className="relative">
            <Search
              size={isShowcase ? 12 : 14}
              className={cn(
                'absolute top-1/2 -translate-y-1/2 text-[var(--orbit-text-muted)]',
                isShowcase ? 'left-2.5' : 'left-3'
              )}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search dashboard"
              placeholder={isShowcase ? 'Search...' : 'Search workflows, logs, contacts...'}
              className={cn(
                'rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] text-[var(--orbit-text-primary)] placeholder-[var(--orbit-text-muted)] transition-all outline-none focus:border-[var(--orbit-accent-primary)] focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/20',
                isShowcase
                  ? 'h-9 w-32 pr-2.5 pl-8 text-xs focus:w-40'
                  : 'h-9 w-32 sm:w-80 pr-4 pl-9 text-sm sm:text-base focus:w-48 sm:focus:w-96'
              )}
            />
          </div>

          {/* AI Assistant */}
          <button
            type="button"
            onClick={() => setIsAssistantOpen(true)}
            aria-label="Open Orbit Assistant"
            className={cn(
              'flex cursor-pointer items-center border border-[var(--orbit-accent-primary)]/20 bg-[color-mix(in_srgb,var(--orbit-accent-primary)_8%,transparent)] font-bold text-[var(--orbit-accent-primary)] transition-all hover:bg-[color-mix(in_srgb,var(--orbit-accent-primary)_15%,transparent)]',
              isShowcase
                ? 'h-9 gap-1 rounded-lg px-2.5 py-1 text-xs'
                : 'gap-2 rounded-xl px-3.5 py-2 text-sm'
            )}
          >
            <Bot size={isShowcase ? 12 : 14} />
            <span>AI Assistant</span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
              }}
              aria-label="Open profile menu"
              className={cn(
                'flex cursor-pointer items-center border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] transition hover:bg-[var(--orbit-elevated)]',
                isShowcase ? 'h-9 gap-1 rounded-lg px-2 py-1' : 'gap-2.5 rounded-xl px-3 py-2'
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-center rounded-full bg-[var(--orbit-accent-primary)]/20 font-extrabold text-[var(--orbit-accent-primary)]',
                  isShowcase ? 'h-5 w-5 text-xs' : 'h-6 w-6 text-sm'
                )}
              >
                {userInitials}
              </div>
              {!isShowcase && (
                <span className="max-w-[90px] truncate text-sm font-semibold text-[var(--orbit-text-secondary)]">
                  {sessionUser?.name || 'Demo User'}
                </span>
              )}
              <ChevronDown
                size={isShowcase ? 10 : 12}
                className={cn(
                  'text-[var(--orbit-text-muted)] transition-transform',
                  isProfileOpen && 'rotate-180'
                )}
              />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute top-full right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] shadow-xl"
                  >
                    {/* User Info */}
                    <div className="flex items-center gap-3 px-4 py-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--orbit-accent-primary)_20%,transparent)] text-base font-extrabold text-[var(--orbit-accent-primary)]">
                        {userInitials}
                      </div>
                      <div className="min-w-0">
                        <p className="leading-relaxed truncate text-base font-bold text-[var(--orbit-text-primary)]">
                          {sessionUser?.name || 'Demo User'}
                        </p>
                        <p className="leading-relaxed truncate font-mono text-sm text-[var(--orbit-text-muted)]">
                          {sessionUser?.email || 'demo@orbitflow.io'}
                        </p>
                        <span className="mt-1 inline-block rounded-full bg-[color-mix(in_srgb,var(--orbit-accent-primary)_10%,transparent)] px-2 py-0.5 font-mono text-sm font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
                          {sessionUser?.role || 'Admin'}
                        </span>
                      </div>
                    </div>
                    <div className="mx-1 h-px bg-[var(--orbit-border-subtle)]" />
                    <div className="p-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate('/settings');
                        }}
                        className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--orbit-text-secondary)] transition hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)]"
                      >
                        <Settings size={13} className="text-[var(--orbit-text-muted)]" />
                        Account Settings
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                      >
                        <LogOut size={13} />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          CONTROLS ROW â€” Preset Selector + Time Filters + AI Diagnostic
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div
        className={cn(
          'flex flex-wrap items-center justify-between gap-3',
          isShowcase ? 'mb-4 px-4' : 'mb-6 px-6'
        )}
      >
        {/* Preset Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Select dashboard preset"
            aria-expanded={isDropdownOpen}
            className={cn(
              'flex cursor-pointer items-center justify-between gap-2 rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] shadow-sm transition-all hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)]',
              isShowcase
                ? 'min-w-[170px] px-3 py-1.5 text-xs font-bold'
                : 'min-w-[220px] px-4 py-2.5 text-sm font-bold text-[var(--orbit-text-secondary)]'
            )}
          >
            <span className="flex items-center gap-2">
              <PresetIcon size={14} className="text-[var(--orbit-accent-primary)]" />
              {activePreset.name}
            </span>
            <ChevronDown
              size={13}
              className={cn(
                'text-[var(--orbit-text-muted)] transition-transform',
                isDropdownOpen && 'rotate-180'
              )}
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.13 }}
                  className="absolute top-full left-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-1.5 shadow-xl"
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
                          'flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors',
                          key === selectedKey
                            ? 'bg-[color-mix(in_srgb,var(--orbit-accent-primary)_10%,transparent)] text-[var(--orbit-accent-primary)]'
                            : 'text-[var(--orbit-text-secondary)] hover:bg-[var(--orbit-elevated)] hover:text-[var(--orbit-text-primary)]'
                        )}
                      >
                        <ItemIcon
                          size={14}
                          className={
                            key === selectedKey
                              ? 'text-[var(--orbit-accent-primary)]'
                              : 'text-[var(--orbit-text-muted)]'
                          }
                        />
                        {item.name}
                      </button>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Right side: Time Filter Tabs & Sandbox Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Sandbox Simulation Control Toggle */}
          {setIsAnomaly && (
            <button
              type="button"
              onClick={() => setIsAnomaly(!isAnomaly)}
              className={cn(
                'flex items-center gap-1.5 rounded-xl border font-mono tracking-wider uppercase transition-all',
                isAnomaly
                  ? 'border-red-500/30 bg-red-500/10 text-red-500'
                  : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
                isShowcase ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2.5 text-xs font-bold'
              )}
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  isAnomaly
                    ? 'animate-pulse bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                    : 'bg-emerald-500'
                )}
              />
              <span>{isAnomaly ? 'Anomaly State' : 'Nominal State'}</span>
            </button>
          )}

          {/* Time Filter Dropdown */}
          <div className="group relative">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
              className={cn(
                'cursor-pointer appearance-none rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] font-mono tracking-wider text-[var(--orbit-text-secondary)] uppercase shadow-sm transition-all hover:bg-[var(--orbit-elevated)] focus:border-[var(--orbit-accent-primary)] focus:outline-none',
                isShowcase ? 'pl-3 pr-11 py-1.5 text-xs font-bold' : 'pl-4 pr-14 py-2.5 text-sm font-bold'
              )}
            >
              <option
                className="bg-[var(--orbit-surface)] text-[var(--orbit-text-primary)]"
                value="Today"
              >
                Today
              </option>
              <option
                className="bg-[var(--orbit-surface)] text-[var(--orbit-text-primary)]"
                value="7 Days"
              >
                7 Days
              </option>
              <option
                className="bg-[var(--orbit-surface)] text-[var(--orbit-text-primary)]"
                value="30 Days"
              >
                30 Days
              </option>
              <option
                className="bg-[var(--orbit-surface)] text-[var(--orbit-text-primary)]"
                value="90 Days"
              >
                90 Days
              </option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[var(--orbit-text-muted)]"
              size={14}
            />
          </div>
        </div>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          KPI CARDS â€” 4-column grid
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className={isShowcase ? 'px-4' : 'px-6'}>
        <DashboardKPIs kpis={getFilteredKpis()} liveRuns={liveRuns} isShowcase={isShowcase} />
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          MAIN CONTENT â€” Area Chart (66%) + Right Panel (34%)
          Right panel: Integrations + Todo Widget
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className={cn("mt-6 flex flex-col gap-6", isShowcase ? "px-4" : "px-4 sm:px-6 lg:px-6", "lg:flex-row")}>
        {/* Left: Area Chart â€” flex-1 (~66%) */}
        <div className="min-w-0 flex-1">
          <div className="rounded-3xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-6">
            {/* Chart header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  Performance History
                </span>
                <h2
                  className={cn(
                    'mt-0.5 font-bold text-[var(--orbit-text-primary)]',
                    isShowcase ? 'text-sm' : 'text-lg'
                  )}
                >
                  {activePreset.chartLabel} Trend
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {/* Live badge */}
                <span className="flex items-center gap-1.5 rounded-xl border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/8 px-3 py-1.5 font-mono text-sm font-bold text-[var(--orbit-accent-primary)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orbit-accent-primary)] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--orbit-accent-primary)]" />
                  </span>
                  Live
                </span>
                <button
                  type="button"
                  aria-label="Export chart"
                  onClick={() => showToast('Chart export started. Your download will begin shortly.')}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-elevated)] text-[var(--orbit-text-muted)] transition hover:bg-[var(--orbit-overlay)] hover:text-[var(--orbit-text-primary)] sm:h-8 sm:w-8"
                >
                  <Download size={13} />
                </button>
                <button
                  type="button"
                  aria-label="Fullscreen chart"
                  onClick={() => setIsChartFullscreen(true)}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/8 text-[var(--orbit-accent-primary)] transition hover:bg-[var(--orbit-accent-primary)]/15 sm:h-8 sm:w-8"
                >
                  <Maximize2 size={13} />
                </button>
              </div>
            </div>

            {/* Recharts Area Chart â€” horizontal scroll on mobile */}
            <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
              <div className={cn(isShowcase ? 'min-w-[500px]' : 'min-w-[600px]')}>
                {isShowcase ? (
                  <AreaChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="var(--orbit-accent-primary)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--orbit-accent-primary)"
                          stopOpacity={0.0}
                        />
                      </linearGradient>
                    </defs>
                    <RechartsCartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="var(--orbit-border-subtle)"
                    />
                    <RechartsXAxis
                      dataKey="label"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: 'var(--orbit-text-muted)',
                        fontSize: 10,
                        fontFamily: 'monospace',
                      }}
                      dy={10}
                    />
                    <RechartsYAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: 'var(--orbit-text-muted)',
                        fontSize: 10,
                        fontFamily: 'monospace',
                      }}
                      tickFormatter={(value) => `${value}`}
                    />
                    <RechartsTooltip
                      content={({ active, payload, label }) => {
                        if (
                          active &&
                          payload &&
                          payload.length &&
                          payload[0] &&
                          payload[0].value !== undefined
                        ) {
                          return (
                            <div className="rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-2 shadow-xl backdrop-blur-md">
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
                      fill="url(#areaGradient)"
                      dot={false}
                      activeDot={{ r: 4, fill: 'var(--orbit-accent-primary)', strokeWidth: 0 }}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                ) : (
                  <RechartsResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="var(--orbit-accent-primary)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--orbit-accent-primary)"
                            stopOpacity={0.0}
                          />
                        </linearGradient>
                      </defs>
                      <RechartsCartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="var(--orbit-border-subtle)"
                      />
                      <RechartsXAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: 'var(--orbit-text-muted)',
                          fontSize: 10,
                          fontFamily: 'monospace',
                        }}
                        dy={10}
                      />
                      <RechartsYAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: 'var(--orbit-text-muted)',
                          fontSize: 10,
                          fontFamily: 'monospace',
                        }}
                        tickFormatter={(value) => `${value}`}
                      />
                      <RechartsTooltip
                        content={({ active, payload, label }) => {
                          if (
                            active &&
                            payload &&
                            payload.length &&
                            payload[0] &&
                            payload[0].value !== undefined
                          ) {
                            return (
                              <div className="rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-2.5 shadow-xl backdrop-blur-md">
                                <p className="leading-relaxed mb-1 font-mono text-xs font-bold text-[var(--orbit-text-muted)] uppercase">
                                  {label}
                                </p>
                                <div className="flex items-center gap-1.5 font-sans text-sm font-bold text-[var(--orbit-text-primary)]">
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
                        fill="url(#areaGradient)"
                        dot={false}
                        activeDot={{ r: 4, fill: 'var(--orbit-accent-primary)', strokeWidth: 0 }}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </RechartsResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          {/* Live Activity Feed â€” below chart */}
          <div className="mt-6">
            <DashboardLiveFeed
              listTitle={activePreset.listTitle}
              liveActivity={liveActivity}
              searchQuery={searchQuery}
              onRunAudit={handleTriggerDiagnostic}
            />
          </div>
        </div>

        <div className="flex w-full lg:w-[340px] shrink-0 flex-col gap-6">
          <IntegrationsPanel />
          <TodoWidget />
        </div>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          PRESET-SPECIFIC DATA TABLES â€” full width
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className={cn("mt-6", isShowcase ? "px-4" : "px-4 sm:px-6 lg:px-6")}>
        <DashboardTables selectedKey={selectedKey} />
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          AI ASSISTANT SIDE PANEL
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <DashboardAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        messages={assistantMessages}
        input={assistantInput}
        onInputChange={setAssistantInput}
        onSubmit={handleSendAssistantMessage}
        isTyping={isAssistantTyping}
      />

      {/* Chart Fullscreen Modal */}
      <AnimatePresence>
        {isChartFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex flex-col bg-[var(--orbit-base)] text-[var(--orbit-text-primary)]"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--orbit-border-subtle)] px-6">
              <div>
                <p className="leading-relaxed font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  Performance History
                </p>
                <h2 className="text-xl font-bold text-[var(--orbit-text-primary)]">
                  {activePreset.chartLabel} Trend
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast('Chart export started.')}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-elevated)] text-[var(--orbit-text-muted)] transition hover:text-[var(--orbit-text-primary)]"
                >
                  <Download size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsChartFullscreen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-elevated)] text-[var(--orbit-text-muted)] transition hover:text-[var(--orbit-text-primary)]"
                >
                  <Minimize2 size={15} />
                </button>
              </div>
            </div>
            <div className="flex-1 p-6">
              <RechartsResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fsAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--orbit-accent-primary)" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="var(--orbit-accent-primary)"
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                  </defs>
                  <RechartsCartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--orbit-border-subtle)"
                  />
                  <RechartsXAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: 'var(--orbit-text-muted)',
                      fontSize: 12,
                      fontFamily: 'monospace',
                    }}
                    dy={10}
                  />
                  <RechartsYAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: 'var(--orbit-text-muted)',
                      fontSize: 12,
                      fontFamily: 'monospace',
                    }}
                  />
                  <RechartsTooltip
                    content={({ active, payload, label }) => {
                      if (
                        active &&
                        payload &&
                        payload.length &&
                        payload[0] &&
                        payload[0].value !== undefined
                      ) {
                        return (
                          <div className="rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] p-3 shadow-xl backdrop-blur-md">
                            <p className="leading-relaxed mb-1 font-mono text-xs font-bold text-[var(--orbit-text-muted)] uppercase">
                              {label}
                            </p>
                            <div className="flex items-center gap-2 font-sans text-sm font-bold text-[var(--orbit-text-primary)]">
                              <span className="h-2 w-2 rounded-full bg-[var(--orbit-accent-primary)]" />
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
                    strokeWidth={3}
                    fill="url(#fsAreaGradient)"
                    dot={false}
                    activeDot={{ r: 6, fill: 'var(--orbit-accent-primary)', strokeWidth: 0 }}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </RechartsResponsiveContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {toastMsg && (
        <div className="animate-in slide-in-from-bottom-4 fixed right-4 bottom-4 z-[999] flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600 shadow-lg dark:border-emerald-900/30 dark:bg-emerald-950/90 dark:text-emerald-400">
          <CheckCircle size={16} />
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default DesktopDashboard;
