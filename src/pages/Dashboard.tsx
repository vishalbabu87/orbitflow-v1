import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MobileDashboard } from './MobileDashboard';
import { DesktopDashboard } from './DesktopDashboard';
import {
  PRESETS,
  TIME_FILTERS,
  ALERTS,
  TOP_INTEGRATIONS,
  TEAM_ACTIVITY,
} from '../constants/DASHBOARD_DATA';

type TimeFilter = (typeof TIME_FILTERS)[number];
type PresetKey = keyof typeof PRESETS;
type AssistantMessage = {
  sender: 'assistant' | 'user';
  text: string;
};

interface SessionUser {
  name: string;
  email: string;
  role: string;
}

const fallbackSessionUser: SessionUser = {
  name: 'Demo User',
  email: 'demo@orbitflow.io',
  role: 'Admin',
};

const getSessionUser = (): SessionUser => {
  const sessionRaw = localStorage.getItem('orbitflow_session');
  if (!sessionRaw) return fallbackSessionUser;

  try {
    const parsed = JSON.parse(sessionRaw) as { user?: Partial<SessionUser> };
    return {
      name: parsed.user?.name ?? fallbackSessionUser.name,
      email: parsed.user?.email ?? fallbackSessionUser.email,
      role: parsed.user?.role ?? fallbackSessionUser.role,
    };
  } catch {
    return fallbackSessionUser;
  }
};

export const Dashboard = ({
  defaultPreset,
  forceMobile,
  isShowcase,
}: {
  defaultPreset?: PresetKey;
  forceMobile?: boolean;
  isShowcase?: boolean;
}) => {
  const navigate = useNavigate();
  const isMobileMediaQuery = useMediaQuery('(max-width: 1023px)');
  const isMobile = forceMobile ?? isMobileMediaQuery;
  const [selectedKey, setSelectedKey] = useState<PresetKey>(defaultPreset || 'automation');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [diagnosticOpen, setDiagnosticOpen] = useState(true);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('7 Days');
  const [syncSecondsAgo, setSyncSecondsAgo] = useState(17);
  const [isAnomaly, setIsAnomaly] = useState(false);
  const activePreset = PRESETS[selectedKey] || PRESETS.automation;
  const PresetIcon = activePreset.icon;

  // Helper functions for dynamic time-filtered metrics
  const getFilteredKpis = () => {
    return activePreset.kpis.map((kpi) => {
      let multiplier = 1;
      if (timeFilter === 'Today') {
        multiplier = 0.15;
      } else if (timeFilter === '30 Days') {
        multiplier = 4.2;
      } else if (timeFilter === '90 Days') {
        multiplier = 12.5;
      }

      let val = kpi.value;
      let state = kpi.state;
      let trend = kpi.trend;
      let sparklineData = kpi.sparkline || [10, 20, 15, 30, 25, 35, 40];

      if (typeof kpi.value === 'number') {
        val = Math.round(kpi.value * multiplier);
        if (kpi.suffix === 'rate' || kpi.name.toLowerCase().includes('rate')) {
          if (isAnomaly) {
            val = Number((82.4 + Math.random() * 1.5).toFixed(2));
            state = 'error';
            trend = '-17.2% â–¼';
          } else {
            val = Number((99.5 + Math.random() * 0.4).toFixed(2));
          }
        } else if (kpi.suffix.includes('latency') || kpi.name.toLowerCase().includes('latency')) {
          if (isAnomaly) {
            val = Math.round(kpi.value * 4.5);
            state = 'error';
            trend = '+450% â–²';
          } else {
            val = Math.round(kpi.value * (1 + (Math.random() * 0.1 - 0.05)));
          }
        } else if (kpi.suffix.includes('speed') || kpi.name.toLowerCase().includes('speed')) {
          val = Number((kpi.value * (1 + (Math.random() * 0.08 - 0.04))).toFixed(1));
        }
      } else if (
        typeof kpi.value === 'string' &&
        isAnomaly &&
        kpi.name.toLowerCase().includes('data')
      ) {
        val = '2.4TB';
        state = 'warning';
        trend = '-40% â–¼';
      }

      if (isAnomaly) {
        if (kpi.name.toLowerCase().includes('success') || kpi.name.toLowerCase().includes('rate')) {
          sparklineData = [99, 98, 97, 95, 90, 85, 82];
        } else if (kpi.name.toLowerCase().includes('latency')) {
          sparklineData = [120, 130, 140, 250, 480, 560, 630];
        }
      }

      const scaledSparkline = sparklineData.map((v) => Math.round(v * multiplier));

      return {
        ...kpi,
        value: val,
        state,
        trend,
        sparkline: scaledSparkline,
      };
    });
  };

  const getFilteredChartData = useCallback(() => {
    let multiplier = 1;
    let labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    if (timeFilter === 'Today') {
      multiplier = 0.15;
      labels = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
    } else if (timeFilter === '30 Days') {
      multiplier = 4.2;
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    } else if (timeFilter === '90 Days') {
      multiplier = 12.5;
      labels = ['Month 1', 'Month 2', 'Month 3'];
    }

    return labels.map((label, idx) => {
      const baseVal = activePreset.chartData[idx % activePreset.chartData.length]?.value || 100;
      let finalVal = Math.round(baseVal * multiplier);
      if (isAnomaly && idx >= labels.length - 2) {
        finalVal = Math.round(finalVal * 0.35);
      }
      return {
        label,
        value: finalVal,
      };
    });
  }, [timeFilter, activePreset, isAnomaly]);

  // Real Features: Search, Notifications, and Assistant Chat Simulator
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Orbit Assistant Chat simulator states
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([
    {
      sender: 'assistant',
      text: 'Hello! I am your Orbit Operations Assistant. I can summarize workflow activities, audit recent transaction states, or draft custom webhook schemas. How can I help you today?',
    },
  ]);
  const [assistantInput, setAssistantInput] = useState('');
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);

  // Read session user info
  const sessionUser = getSessionUser();

  // Real-time animation counter states
  const [liveRuns, setLiveRuns] = useState(0);
  const [liveActivity, setLiveActivity] = useState<
    Array<{ message: string; time: string; state: string }>
  >([]);

  const handleLogout = () => {
    localStorage.removeItem('orbitflow_session');
    navigate('/');
  };

  const handleTriggerDiagnostic = () => {
    setDiagnosticOpen(true);
    const diagnosticTimer: ReturnType<typeof setTimeout> = setTimeout(
      () => setDiagnosticOpen(false),
      5000
    );
    return diagnosticTimer;
  };

  const handleSendAssistantMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantInput.trim()) return;

    const userMsg = assistantInput;
    setAssistantMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setAssistantInput('');
    setIsAssistantTyping(true);

    const assistantTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      let reply = `I've analyzed the active parameters on the ${activePreset.name} Engine. Performance metrics are nominal, and error rates remain at baseline thresholds. Let me know if you would like a metric breakdown or schema draft.`;
      if (
        userMsg.toLowerCase().includes('workflow') ||
        userMsg.toLowerCase().includes('run') ||
        userMsg.toLowerCase().includes('status')
      ) {
        reply = `Control Panel Inbound Log Summary: The triggers for "${activePreset.name}" are running stably. Recent logs show operations completed with latency averaging 140ms. One minor timeout exception resolved automatically.`;
      } else if (
        userMsg.toLowerCase().includes('report') ||
        userMsg.toLowerCase().includes('summarize')
      ) {
        const firstKpiVal =
          typeof activePreset.kpis[0].value === 'number'
            ? activePreset.kpis[0].value
            : parseInt(String(activePreset.kpis[0].value).replace(/[^0-9]/g, '')) || 0;
        reply = `Summary Report for ${activePreset.name}:\n* Current state: Nominal & Active\n* Leading KPI: ${activePreset.kpis[0].name} = ${(firstKpiVal + liveRuns).toLocaleString()}\n* Performance Level: ${activePreset.kpis[1].name} is at ${activePreset.kpis[1].value} (${activePreset.kpis[1].trend})\n* AI Diagnostics recommendation: System is fully optimized.`;
      }

      setAssistantMessages((prev) => [...prev, { sender: 'assistant', text: reply }]);
      setIsAssistantTyping(false);
    }, 1000);
    return assistantTimer;
  };

  // Sync selectedKey when defaultPreset prop updates dynamically
  useEffect(() => {
    if (defaultPreset && PRESETS[defaultPreset]) {
      setSelectedKey(defaultPreset);
    }
  }, [defaultPreset]);

  // Live sync counter - increments every second to simulate live data freshness
  useEffect(() => {
    const syncInterval = setInterval(() => {
      setSyncSecondsAgo((prev) => {
        if (prev >= 120) return 5; // reset to simulate a fresh sync
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(syncInterval);
  }, []);

  // Simulating real-time background processing
  useEffect(() => {
    if (isAnomaly) {
      setLiveActivity([
        {
          message: 'CRITICAL: API Gateway - 504 Gateway Timeout on /v1/ingest endpoint',
          state: 'error',
          time: 'Just now',
        },
        {
          message: 'Warning: Workflow worker node #12-D reporting memory leakage',
          state: 'warning',
          time: 'Just now',
        },
        ...activePreset.listItems.slice(0, 2),
      ]);
    } else {
      setLiveActivity(activePreset.listItems);
    }

    const interval = setInterval(() => {
      // 1. Slightly drift KPI values to simulate active sync run
      setLiveRuns((prev) => prev + Math.floor(Math.random() * 3) + 1);
      setSyncSecondsAgo(5); // reset sync timer on new data

      // 2. Randomly add a new real-time log event to the top of the stack
      const wfNums = [2849, 2850, 2851, 2852, 2853];
      const wfNum = wfNums[Math.floor(Math.random() * wfNums.length)];

      const anomalyLogs = [
        {
          message: `CRITICAL: Worker #${wfNum} failed connection handshake after 3 retries`,
          state: 'error',
          id: `#${wfNum}`,
        },
        {
          message: `Warning: Latency spike detected on #${wfNum} middleware proxy layer`,
          state: 'warning',
          id: `#${wfNum}`,
        },
      ];

      const triggerLogs = [
        {
          message: `Workflow #${wfNum} - AI Agent qualified incoming task payload`,
          state: 'success',
          id: `#${wfNum}`,
        },
        {
          message: `Workflow #${wfNum} - Webhook sync completed for ${activePreset.name} node`,
          state: 'success',
          id: `#${wfNum}`,
        },
        {
          message: `Workflow #${wfNum} - Prompt compiled with 100% confidence`,
          state: 'success',
          id: `#${wfNum}`,
        },
        {
          message: `Workflow #${wfNum} - Response latency optimized at 131ms`,
          state: 'info',
          id: `#${wfNum}`,
        },
        {
          message: `Workflow #${wfNum} - API rate check completed`,
          state: 'success',
          id: `#${wfNum}`,
        },
      ];

      const activeLogs = isAnomaly ? anomalyLogs : triggerLogs;
      const randomLog = activeLogs[Math.floor(Math.random() * activeLogs.length)];

      setLiveActivity((prev) => [
        { ...randomLog, time: 'Just now' },
        ...prev
          .map((item) => ({
            ...item,
            time: item.time === 'Just now' ? '1m ago' : item.time,
          }))
          .slice(0, 4),
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, [activePreset.listItems, activePreset.name, isAnomaly]);

  const syncLabel =
    syncSecondsAgo < 60 ? `${syncSecondsAgo}s ago` : `${Math.floor(syncSecondsAgo / 60)}m ago`;

  const dashboardProps = {
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
    syncLabel,
    searchQuery,
    setSearchQuery,
    isNotificationsOpen,
    setIsNotificationsOpen,
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
    TIME_FILTERS,
    TOP_INTEGRATIONS,
    TEAM_ACTIVITY,
    ALERTS,
    isShowcase,
    isAnomaly,
    setIsAnomaly,
  };

  return isMobile ? (
    <MobileDashboard {...dashboardProps} />
  ) : (
    <DesktopDashboard {...dashboardProps} />
  );
};

export default Dashboard;
