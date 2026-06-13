import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Code,
  Globe,
  Settings as SettingsIcon,
  Trash2,
  Check,
  Copy,
  Database,
  Github,
  MessageSquare,
  Zap,
  Camera,
  Mail,
  X,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type SectionType =
  | 'PROFILE'
  | 'WORKSPACE'
  | 'INTEGRATIONS'
  | 'NOTIFICATIONS'
  | 'API'
  | 'SECURITY'
  | 'BILLING'
  | 'DANGER';

const sections: { id: SectionType; label: string; icon: React.ElementType }[] = [
  { id: 'PROFILE', label: 'Profile', icon: User },
  { id: 'WORKSPACE', label: 'Workspace', icon: Globe },
  { id: 'INTEGRATIONS', label: 'Integrations', icon: Zap },
  { id: 'NOTIFICATIONS', label: 'Notifications', icon: Bell },
  { id: 'API', label: 'API & Webhooks', icon: Code },
  { id: 'SECURITY', label: 'Security', icon: Shield },
  { id: 'BILLING', label: 'Billing', icon: CreditCard },
  { id: 'DANGER', label: 'Danger Zone', icon: Trash2 },
];

const Integrations = ({ showToast }: { showToast: (msg: string) => void }) => {
  const [connections, setConnections] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('orbitflow_integrations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { /* ignore */ }
    }
    return {
      Stripe: true,
      Salesforce: true,
      MessageSquare: true,
      Segment: false,
      HubSpot: false,
      Mixpanel: false,
      GitHub: false,
      Intercom: false,
      Webhooks: true,
    };
  });

  const integrations = [
    {
      name: 'Stripe',
      desc: 'Payment processing',
      icon: CreditCard,
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      name: 'Salesforce',
      desc: 'CRM sync',
      icon: Database,
      color: 'text-sky-600 dark:text-sky-400',
    },
    {
      name: 'MessageSquare',
      desc: 'Alert notifications',
      icon: MessageSquare,
      color: 'text-[#E01E5A]',
    },
    {
      name: 'Segment',
      desc: 'Data orchestration',
      icon: Zap,
      color: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      name: 'HubSpot',
      desc: 'Marketing automation',
      icon: Zap,
      color: 'text-orange-600 dark:text-orange-400',
    },
    {
      name: 'Mixpanel',
      desc: 'Event analytics',
      icon: Zap,
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      name: 'GitHub',
      desc: 'CI/CD events',
      icon: Github,
      color: 'text-gray-900 dark:text-gray-200',
    },
    {
      name: 'Intercom',
      desc: 'Customer support',
      icon: MessageSquare,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      name: 'Webhooks',
      desc: 'Custom endpoints',
      icon: Code,
      color: 'text-gray-400 dark:text-gray-500',
    },
  ];

  const handleToggle = (name: string) => {
    setConnections((prev) => {
      const updated = {
        ...prev,
        [name]: !prev[name],
      };
      localStorage.setItem('orbitflow_integrations', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Active Integrations
          </h3>
          <p className="leading-relaxed mt-1 text-xs text-gray-500 dark:text-gray-500">
            Manage your connected services and tools.
          </p>
        </div>
        <button
          type="button"
          onClick={() => showToast('Integration marketplace coming soon')}
          className="cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-4 py-2.5 text-xs font-bold tracking-widest text-white transition-colors hover:bg-[color-mix(in_srgb,var(--orbit-accent-primary)_80%,black)] sm:px-4 sm:py-2.5 sm:text-xs"
        >
          + Add Integration
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((item) => {
          const isConnected = connections[item.name];
          return (
            <div
              key={item.name}
              className={cn(
                'group rounded-2xl border bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-all hover:bg-gray-50/50 md:rounded-3xl md:p-6 dark:bg-[var(--orbit-surface)] dark:hover:bg-gray-800/20',
                isConnected
                  ? 'border-emerald-500/30 shadow-sm dark:border-emerald-500/25'
                  : 'border-gray-100 dark:border-[#1e2d3d]'
              )}
            >
              <div className="mb-6 flex items-start justify-between">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 transition-transform group-hover:scale-105 dark:border-[#1e2d3d] dark:bg-gray-800',
                    item.color
                  )}
                >
                  <item.icon size={20} />
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isConnected}
                  onClick={() => handleToggle(item.name)}
                  className={cn(
                    'relative h-5 w-9 cursor-pointer rounded-full transition-colors duration-300 focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/30 focus:outline-none',
                    isConnected ? 'bg-emerald-500' : 'bg-gray-250 dark:bg-gray-700'
                  )}
                >
                  <div
                    className={cn(
                      'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300',
                      isConnected ? 'left-[18px]' : 'left-0.5'
                    )}
                  />
                </button>
              </div>
              <h4 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                {item.name}
              </h4>
              <p className="leading-relaxed mb-4 text-xs font-normal text-gray-500 dark:text-gray-500">
                {item.desc}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'text-xs font-bold tracking-wider uppercase',
                    isConnected ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'
                  )}
                >
                  {isConnected ? 'Connected OK' : 'Disconnected'}
                </span>
                {isConnected && (
                  <button
                    type="button"
                    onClick={() => showToast(`Configuring ${item.name}...`)}
                    className="cursor-pointer rounded-lg px-2 py-1 text-xs font-bold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    Configure
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SectionWrapper = ({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4 duration-500">
    <div className="text-left">
      <h2 className="text-base font-bold tracking-tight text-gray-900 md:text-xl dark:text-white">
        {title}
      </h2>
      <p className="leading-relaxed mt-0.5 text-xs text-gray-500 dark:text-gray-500">{sub}</p>
    </div>
    {children}
  </div>
);

import { useSubTab } from '../hooks/useSubTab';

export const Settings = () => {
  const { activeSettingsSubTab: activeTab, setActiveSettingsSubTab: setActiveTab } = useSubTab();
  
  const [profile, setProfile] = useState(() => {
    const sessionRaw = localStorage.getItem('orbitflow_session');
    let initial = {
      name: 'John Doe',
      email: 'john@acme.com',
      role: 'Administrator',
      timezone: 'UTC-07:00 (Pacific Time)',
    };
    if (sessionRaw) {
      try {
        const parsed = JSON.parse(sessionRaw) as { user?: { name?: string; email?: string; role?: string; timezone?: string } };
        if (parsed.user) {
          initial = {
            name: parsed.user.name ?? initial.name,
            email: parsed.user.email ?? initial.email,
            role: parsed.user.role ?? initial.role,
            timezone: parsed.user.timezone ?? initial.timezone,
          };
        }
      } catch { /* ignore */ }
    }
    return initial;
  });

  const [workspaceName, setWorkspaceName] = useState(() => localStorage.getItem('orbitflow_workspace_name') || 'OrbitFlow Dev Team');
  const [workspaceUrl, setWorkspaceUrl] = useState(() => localStorage.getItem('orbitflow_workspace_url') || 'dev-team');

  const [notificationSettings, setNotificationSettings] = useState<Record<number, boolean>>(() => {
    const saved = localStorage.getItem('orbitflow_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { /* ignore */ }
    }
    return {
      0: true,
      1: true,
      2: false,
      3: true,
    };
  });
  
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  
  // Danger zone modal state
  const [dangerAction, setDangerAction] = useState<{ label: string; desc: string } | null>(null);
  const [dangerConfirmText, setDangerConfirmText] = useState('');

  // Password fields state
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const handleSave = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="flex min-h-[700px] flex-col gap-4 bg-[var(--orbit-base)] px-4 py-6 text-gray-900 sm:px-6 lg:px-8 md:gap-8 lg:flex-row lg:gap-12 dark:text-gray-100">
      {/* Mobile Select Nav */}
      <div className="mb-3 block w-full shrink-0 lg:hidden">
        <label className="mb-1.5 block text-left font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase">
          Settings Section
        </label>
        <div className="relative">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as SectionType)}
            className="h-11 w-full appearance-none rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-4 pr-10 text-sm font-bold text-[var(--orbit-text-primary)] outline-none focus:border-[var(--orbit-accent-primary)] focus:ring-1 focus:ring-[var(--orbit-accent-primary)]/20 dark:bg-gray-900 dark:text-white"
          >
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown size={16} className="text-[var(--orbit-text-muted)]" />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar Nav */}
      <div className="hidden w-full shrink-0 text-left lg:flex lg:w-64 lg:flex-col lg:gap-1">
        {sections.map((section) => (
          <button
            type="button"
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={cn(
              'flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold tracking-wider whitespace-nowrap uppercase transition-all lg:w-full lg:px-4 lg:py-2.5 lg:text-sm lg:font-medium lg:tracking-normal lg:normal-case',
              activeTab === section.id
                ? 'border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 text-[var(--orbit-accent-primary)]'
                : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800/40 dark:hover:text-white'
            )}
          >
            <section.icon size={16} className="h-4 w-4 shrink-0" />
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="max-w-4xl flex-1">
        {activeTab === 'PROFILE' && (
          <SectionWrapper
            title="Profile Settings"
            sub="Manage your personal information and preferences"
          >
            <div className="space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)]">
              <div className="flex flex-col gap-6 text-left sm:flex-row sm:items-center">
                <label className="group relative block shrink-0 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setAvatarUrl(url);
                      }
                    }}
                  />
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="h-20 w-20 rounded-2xl object-cover shadow-lg transition-all duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--orbit-accent-primary)] to-[#0A8887] text-2xl font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-105">
                      JD
                    </div>
                  )}
                  {/* Hover overlay indicator */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Camera size={20} className="text-white" />
                  </div>
                  {/* Permanent badge indicator for touch & mobile devices */}
                  <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[var(--orbit-accent-primary)] text-white shadow-md transition-transform group-hover:scale-110 dark:border-[var(--orbit-surface)]">
                    <Camera size={11} className="text-white" />
                  </div>
                </label>
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      {profile.name}
                    </h3>
                    <p className="leading-relaxed mt-1 text-sm text-gray-500 dark:text-gray-500">
                      Workspace Owner - Joined Jan 2024
                    </p>
                  </div>
                  {avatarUrl && (
                    <button
                      type="button"
                      onClick={() => { setAvatarUrl(null); handleSave('Profile photo removed'); }}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 transition-colors hover:bg-gray-50 hover:text-red-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-red-400"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="ml-1 flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <span>Full Name</span>
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pr-4 pl-11 text-base font-normal text-gray-900 transition-all focus:border-[var(--orbit-accent-primary)] focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/30 focus:outline-none sm:text-sm dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="ml-1 flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <span>Email Address</span>
                    <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 uppercase dark:text-emerald-400">
                      <Check size={10} /> Verified
                    </span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                    <input
                      type="text"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pr-4 pl-11 text-base font-normal text-gray-900 transition-all focus:border-[var(--orbit-accent-primary)] focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/30 focus:outline-none sm:text-sm dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <label className="ml-1 flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <span>Role</span>
                  </label>
                  <div className="relative">
                    <Shield className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                    <input
                      type="text"
                      value={profile.role}
                      onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pr-4 pl-11 text-base font-normal text-gray-900 transition-all focus:border-[var(--orbit-accent-primary)] focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/30 focus:outline-none sm:text-sm dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Timezone */}
                <div className="space-y-2">
                  <label className="ml-1 flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <span>Timezone</span>
                  </label>
                  <div className="relative">
                    <Globe className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                    <input
                      type="text"
                      value={profile.timezone}
                      onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pr-4 pl-11 text-base font-normal text-gray-900 transition-all focus:border-[var(--orbit-accent-primary)] focus:ring-2 focus:ring-[var(--orbit-accent-primary)]/30 focus:outline-none sm:text-sm dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-50 pt-6 dark:border-[#1e2d3d]/50">
                <button
                  type="button"
                  onClick={() => {
                    const sessionRaw = localStorage.getItem('orbitflow_session');
                    let sessionObj = { user: {} };
                    if (sessionRaw) {
                      try {
                        sessionObj = JSON.parse(sessionRaw);
                      } catch { /* ignore */ }
                    }
                    sessionObj.user = {
                      ...sessionObj.user,
                      name: profile.name,
                      email: profile.email,
                      role: profile.role,
                      timezone: profile.timezone,
                    };
                    localStorage.setItem('orbitflow_session', JSON.stringify(sessionObj));
                    handleSave('Profile settings saved successfully');
                  }}
                  className="cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3 text-sm font-bold tracking-widest text-white uppercase shadow-[0_4px_12px_rgba(14,165,164,0.15)] transition-colors hover:bg-[#0C8F8E] sm:text-xs"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </SectionWrapper>
        )}

        {activeTab === 'INTEGRATIONS' && (
          <SectionWrapper
            title="Integrations"
            sub="Connect OrbitFlow to your product infrastructure"
          >
            <Integrations showToast={handleSave} />
          </SectionWrapper>
        )}

        {activeTab === 'API' && (
          <SectionWrapper
            title="API & Webhooks"
            sub="Build custom flows with our programmatic interface"
          >
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)]">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Active API Keys
                  </h3>
                  <button
                    type="button"
                    className="cursor-pointer text-xs font-bold text-[var(--orbit-accent-primary)] transition-colors hover:text-[#0C8F8E]"
                  >
                    + Generate New
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Production', key: 'sk_live_********4821', used: '2h ago' },
                    { name: 'Staging', key: 'sk_test_********9234', used: '8d ago' },
                  ].map((key) => (
                    <div
                      key={key.name}
                      className="flex flex-col justify-between gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)]"
                    >
                      <div className="space-y-1">
                        <p className="leading-relaxed text-xs font-semibold text-gray-900 dark:text-white">
                          {key.name}
                        </p>
                        <p className="leading-relaxed font-mono text-xs font-semibold text-gray-500 dark:text-gray-500">
                          {key.key}
                        </p>
                      </div>
                      <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
                        <span className="mr-2 text-xs font-normal text-gray-400 dark:text-gray-500">
                          Last used: {key.used}
                        </span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleSave(`Paused ${key.name} API key`)}
                            className="cursor-pointer rounded-xl border border-gray-100 bg-white px-3 py-1.5 text-xs font-bold text-gray-500 transition-colors hover:bg-amber-50 hover:text-amber-600 dark:border-[#1e2d3d] dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
                          >
                            Pause
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSave(`Copied ${key.name} API key`)}
                            className="cursor-pointer rounded-xl border border-gray-100 bg-white p-2 text-gray-400 transition-colors hover:text-gray-700 dark:border-[#1e2d3d] dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-200"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSave(`Revoked ${key.name} API key`)}
                            className="cursor-pointer rounded-xl border border-gray-100 bg-white p-2 text-gray-400 transition-colors hover:text-rose-600 dark:border-[#1e2d3d] dark:bg-gray-800 dark:text-gray-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)]">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Webhook Endpoints
                  </h3>
                  <button
                    type="button"
                    className="cursor-pointer text-xs font-bold text-[var(--orbit-accent-primary)] transition-colors hover:text-[#0C8F8E]"
                  >
                    + Add Endpoint
                  </button>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 py-10 dark:border-[var(--orbit-border-mid)] dark:bg-gray-800/10">
                  <p className="leading-relaxed text-xs font-medium text-gray-500 dark:text-gray-500">
                    No active webhooks configured
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>
        )}

        {activeTab === 'DANGER' && (
          <SectionWrapper title="Danger Zone" sub="Irreversible actions for your workspace">
            <div className="space-y-6 rounded-3xl border border-rose-100 bg-rose-500/[0.02] p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] md:p-8 dark:border-rose-950/20">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-rose-100 bg-rose-50 p-2 text-rose-600 dark:border-rose-900/30 dark:bg-rose-950/10 dark:text-rose-400">
                  <SettingsIcon size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-rose-600 dark:text-rose-400">
                    Destructive Actions
                  </h3>
                  <p className="leading-relaxed mt-1 text-xs font-normal text-rose-500/70 dark:text-rose-400/50">
                    Once performed, these actions cannot be undone. Please proceed with caution.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    label: 'Delete Workspace Data',
                    desc: 'Wipes all customer, revenue, and transaction history.',
                  },
                  {
                    label: 'Archive Workspace',
                    desc: 'Makes workspace read-only and halts all integrations.',
                  },
                ].map((action) => (
                  <div
                    key={action.label}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:flex-row sm:items-center dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)]"
                  >
                    <div>
                      <p className="leading-relaxed text-sm font-semibold text-gray-900 dark:text-white">
                        {action.label}
                      </p>
                      <p className="leading-relaxed mt-1 text-xs font-normal text-gray-500 dark:text-gray-500">
                        {action.desc}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDangerAction(action)}
                      className="w-full cursor-pointer rounded-xl border border-rose-200 px-5 py-3 text-sm font-bold text-rose-600 transition-colors hover:bg-rose-600 hover:text-white sm:w-auto sm:px-4 sm:py-2 sm:text-xs dark:border-rose-900/40 dark:text-rose-400 dark:hover:bg-rose-500 dark:hover:text-white"
                    >
                      Execute
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Action Modal */}
            <AnimatePresence>
              {dangerAction && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => {
                      setDangerAction(null);
                      setDangerConfirmText('');
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] shadow-2xl"
                  >
                    <div className="border-b border-rose-100 bg-rose-50/50 p-6 dark:border-rose-900/20 dark:bg-rose-950/20">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400">
                          <AlertTriangle size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {dangerAction.label}
                          </h3>
                          <p className="leading-relaxed mt-1 text-sm text-[var(--orbit-text-muted)]">
                            {dangerAction.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="leading-relaxed text-sm font-semibold text-rose-600 dark:text-rose-400">
                        Warning: This action cannot be undone.
                      </p>
                      <p className="leading-relaxed mt-2 text-sm text-[var(--orbit-text-muted)]">
                        Please type <strong className="select-all font-mono text-gray-900 dark:text-white">orbitflow-confirm</strong> to proceed.
                      </p>
                      <input
                        type="text"
                        value={dangerConfirmText}
                        onChange={(e) => setDangerConfirmText(e.target.value)}
                        placeholder="orbitflow-confirm"
                        className="mt-4 w-full rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-base)] px-4 py-3 text-sm transition-all focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:text-white"
                      />
                    </div>
                    
                    <div className="flex items-center justify-end gap-3 border-t border-[var(--orbit-border-subtle)] bg-[var(--orbit-base)] p-4">
                      <button
                        type="button"
                        onClick={() => {
                          setDangerAction(null);
                          setDangerConfirmText('');
                        }}
                        className="cursor-pointer rounded-xl px-5 py-2.5 text-sm font-bold text-[var(--orbit-text-secondary)] transition-colors hover:text-gray-900 dark:hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={dangerConfirmText !== 'orbitflow-confirm'}
                        onClick={() => {
                          setDangerAction(null);
                          setDangerConfirmText('');
                          handleSave(`${dangerAction.label} completed`);
                        }}
                        className="cursor-pointer rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold tracking-wide text-white transition-all hover:bg-rose-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-rose-600"
                      >
                        Confirm Action
                      </button>
                    </div>
                    
                    <button
                      onClick={() => {
                        setDangerAction(null);
                        setDangerConfirmText('');
                      }}
                      className="absolute top-4 right-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-black/5 hover:text-gray-900 dark:hover:bg-white/5 dark:hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </SectionWrapper>
        )}

        {activeTab === 'WORKSPACE' && (
          <SectionWrapper
            title="Workspace Settings"
            sub="Configure your collaborative environment and team roles"
          >
            <div className="space-y-6">
              <div className="space-y-6 rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)]">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  General Information
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Workspace Name
                    </label>
                    <input
                      type="text"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base font-normal text-gray-900 transition-all focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-gray-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Custom URL Prefix
                    </label>
                    <div className="relative">
                      <span className="absolute top-1/2 left-4 -translate-y-1/2 text-xs font-normal text-gray-400 dark:text-gray-500">
                        orbitflow.com/teams/
                      </span>
                      <input
                        type="text"
                        value={workspaceUrl}
                        onChange={(e) => setWorkspaceUrl(e.target.value)}
                        className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-[140px] text-base font-normal text-gray-900 transition-all focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end border-t border-gray-50 pt-4 dark:border-[#1e2d3d]/50">
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem('orbitflow_workspace_name', workspaceName);
                      localStorage.setItem('orbitflow_workspace_url', workspaceUrl);
                      handleSave('Workspace settings saved');
                    }}
                    className="cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#0C8F8E] sm:px-5 sm:py-2.5 sm:text-xs"
                  >
                    Save General Settings
                  </button>
                </div>
              </div>

              <div className="space-y-6 rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Team Collaborators
                  </h3>
                  <button
                    type="button"
                    className="cursor-pointer text-xs font-bold text-[var(--orbit-accent-primary)] transition-colors hover:text-[#0C8F8E]"
                  >
                    + Invite Member
                  </button>
                </div>
                <div className="divide-y divide-gray-50 dark:divide-gray-800">
                  {[
                    { name: 'John Doe', email: 'john@acme.com', role: 'Owner', status: 'Active' },
                    {
                      name: 'Sarah Mitchell',
                      email: 'sarah@acme.com',
                      role: 'VP of Product',
                      status: 'Active',
                    },
                    {
                      name: 'Anya Rossi',
                      email: 'anya@acme.com',
                      role: 'SRE Lead',
                      status: 'Pending Invite',
                    },
                  ].map((member) => (
                    <div
                      key={member.email}
                      className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center sm:gap-4"
                    >
                      <div className="text-left">
                        <p className="leading-relaxed text-xs font-bold text-gray-900 dark:text-white">
                          {member.name}
                        </p>
                        <p className="leading-relaxed text-xs text-gray-500 sm:text-xs dark:text-gray-500">
                          {member.email}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-wrap items-center justify-start gap-2 sm:justify-end sm:gap-3">
                        <span className="font-mono text-xs font-semibold text-gray-500 uppercase sm:text-xs dark:text-gray-400">
                          {member.role}
                        </span>
                        <span
                          className={cn(
                            'rounded px-2 py-0.5 text-xs font-bold tracking-wider uppercase sm:text-xs',
                            member.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          )}
                        >
                          {member.status}
                        </span>
                        {member.status === 'Pending Invite' ? (
                          <div className="ml-auto flex items-center gap-2 sm:ml-0">
                            <button
                              type="button"
                              onClick={() => handleSave(`Resent invite to ${member.email}`)}
                              className="cursor-pointer rounded-lg px-2 py-1 text-xs font-bold text-[var(--orbit-accent-primary)] hover:bg-[var(--orbit-accent-primary)]/10"
                            >
                              Resend
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSave(`Revoked invite for ${member.email}`)}
                              className="cursor-pointer rounded-lg px-2 py-1 text-xs font-bold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                            >
                              Revoke
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="ml-auto rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 sm:ml-0 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                          >
                            <SettingsIcon size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>
        )}

        {activeTab === 'NOTIFICATIONS' && (
          <SectionWrapper
            title="Notification Preferences"
            sub="Manage how and when you receive automated logs and digest summary alerts"
          >
            <div className="space-y-6 rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)]">
              {[
                {
                  title: 'Email Run Reports',
                  desc: 'Deliver weekly summary digests regarding trigger success rates and latency peaks.',
                },
                {
                  title: 'MessageSquare Instant Alerts',
                  desc: 'Push immediate failure execution warnings into configured MessageSquare communication feeds.',
                },
                {
                  title: 'System Security Updates',
                  desc: 'Notify workspace owner on new API key generation or password modification events.',
                },
                {
                  title: 'API Usage Warnings',
                  desc: 'Trigger early threshold alerts when monthly automation task limits exceed 80% capacity.',
                },
              ].map((notif, idx) => {
                const isChecked = notificationSettings[idx] ?? false;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-gray-50 py-4 last:border-b-0 dark:border-gray-800"
                  >
                    <div className="max-w-[75%]">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        {notif.title}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed font-normal text-gray-500 dark:text-gray-500">
                        {notif.desc}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isChecked}
                      onClick={() => {
                        setNotificationSettings((prev) => ({
                          ...prev,
                          [idx]: !prev[idx],
                        }));
                      }}
                      className={cn(
                        'relative h-5.5 w-10 cursor-pointer rounded-full transition-colors duration-300 focus:ring-4 focus:ring-[var(--orbit-accent-primary)]/10 focus:outline-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] border border-gray-200/50 dark:border-gray-800',
                        isChecked ? 'bg-[var(--orbit-accent-primary)] border-[var(--orbit-accent-primary)]' : 'bg-gray-200 dark:bg-gray-800'
                      )}
                    >
                      <div
                        className={cn(
                          'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300',
                          isChecked ? 'left-[20px]' : 'left-0.5'
                        )}
                      />
                    </button>
                  </div>
                );
              })}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem('orbitflow_notifications', JSON.stringify(notificationSettings));
                    handleSave('Notification preferences saved');
                  }}
                  className="cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#0C8F8E] sm:px-5 sm:py-2.5 sm:text-xs"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </SectionWrapper>
        )}

        {activeTab === 'SECURITY' && (
          <SectionWrapper
            title="Security & Credentials"
            sub="Configure password complexity, MFA layers, and view active sessions log"
          >
            <div className="space-y-6 text-left">
              <div className="space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)]">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Change Password</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Current Password */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      value={passwords.current}
                      onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 transition-all focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-gray-100"
                    />
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      value={passwords.newPass}
                      onChange={(e) => setPasswords(prev => ({ ...prev, newPass: e.target.value }))}
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 transition-all focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-gray-100"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 transition-all focus:border-[var(--orbit-accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 sm:text-sm dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:text-gray-100"
                    />
                  </div>
                </div>

                {passwordError && (
                  <p className="leading-relaxed mt-2 text-xs font-semibold text-[var(--orbit-error)]">{passwordError}</p>
                )}

                <div className="flex justify-end border-t border-gray-50 pt-4 dark:border-[#1e2d3d]/50">
                  <button
                    type="button"
                    onClick={() => {
                      setPasswordError('');
                      if (!passwords.current || !passwords.newPass || !passwords.confirm) {
                        setPasswordError('All password fields are required.');
                        return;
                      }
                      if (passwords.newPass.length < 8) {
                        setPasswordError('New password must be at least 8 characters long.');
                        return;
                      }
                      if (passwords.newPass !== passwords.confirm) {
                        setPasswordError('New password and confirm password do not match.');
                        return;
                      }
                      // Simulate save success
                      setPasswords({ current: '', newPass: '', confirm: '' });
                      handleSave('Password updated successfully');
                    }}
                    className="cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#0C8F8E] sm:px-5 sm:py-2.5 sm:text-xs"
                  >
                    Update Password
                  </button>
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)]">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Active Login Sessions
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      device: 'Chrome / macOS',
                      loc: 'San Francisco, US',
                      active: true,
                      time: 'Current Session',
                    },
                    {
                      device: 'Safari / iPhone 15',
                      loc: 'Chicago, US',
                      active: false,
                      time: '2 hours ago',
                    },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4 text-xs dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)]"
                    >
                      <div>
                        <p className="leading-relaxed font-bold text-gray-900 dark:text-white">{s.device}</p>
                        <p className="leading-relaxed mt-1 text-xs font-normal text-gray-500 dark:text-gray-500">
                          {s.loc} &middot; {s.time}
                        </p>
                      </div>
                      {s.active ? (
                        <span className="rounded border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-600 uppercase dark:border-emerald-900/30 dark:bg-emerald-950/20 dark:text-emerald-400">
                          Active
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="text-xs font-bold text-rose-500 hover:underline dark:text-rose-400"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>
        )}

        {activeTab === 'BILLING' && (
          <SectionWrapper
            title="Billing & Plans"
            sub="Manage your subscription, invoices, and payment methods"
          >
            <div className="space-y-6 text-left">
              <div className="rounded-3xl border border-[var(--orbit-accent-primary)]/20 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] md:p-8 dark:border-[var(--orbit-accent-primary)]/30 dark:bg-[var(--orbit-surface)]">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
                      <Zap size={16} className="text-[var(--orbit-accent-primary)]" />
                      Current Plan: OrbitFlow Pro
                    </h3>
                    <p className="leading-relaxed mt-1 text-xs font-normal text-gray-500 dark:text-gray-500">
                      $299/mo - Next billing date: Jun 01, 2026
                    </p>
                  </div>
                  <button
                    type="button"
                    className="w-full cursor-pointer rounded-xl bg-[var(--orbit-accent-primary)] px-6 py-3 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#0C8F8E] sm:w-auto sm:px-5 sm:py-2.5 sm:text-xs"
                  >
                    Upgrade Plan
                  </button>
                </div>
                <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-full w-[85%] bg-[var(--orbit-accent-primary)]"></div>
                </div>
                <p className="leading-relaxed text-xs font-semibold text-gray-500 dark:text-gray-500">
                  850,000 / 1,000,000 automated tasks (85%)
                </p>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)]">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Payment Method
                  </h3>
                  <button
                    type="button"
                    className="cursor-pointer text-xs font-bold text-[var(--orbit-accent-primary)] transition-colors hover:text-[#0C8F8E]"
                  >
                    Update
                  </button>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)]">
                  <div className="flex h-8 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <CreditCard size={16} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <div>
                    <p className="leading-relaxed text-xs font-bold text-gray-900 dark:text-white">
                      Visa ending in 4242
                    </p>
                    <p className="leading-relaxed mt-0.5 font-mono text-xs font-semibold text-gray-500 dark:text-gray-500">
                      Expires 12/28
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        )}
      </div>

      {saveStatus && (
        <div className="animate-in slide-in-from-bottom-4 fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600 shadow-lg dark:border-emerald-900/30 dark:bg-emerald-950/90 dark:text-emerald-400">
          <Check size={16} />
          {saveStatus}
        </div>
      )}
    </div>
  );
};

export default Settings;
