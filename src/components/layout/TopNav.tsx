import { useState, useEffect, useRef } from 'react';
import { Search, Bell, Menu, Sun, Moon, X, Command, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './MobileSidebar';
import { OrbitLogo } from '../ui/OrbitLogo';
import { useTheme } from '@/hooks/useTheme';
import { DASHBOARD_MENU_ITEMS } from '../../constants/DASHBOARD_ROUTES';
import { motion, AnimatePresence } from 'framer-motion';
import { NOTIFICATIONS as RAW_NOTIFICATIONS } from '../../constants/DASHBOARD_DATA';

interface NotificationItem {
  id: string;
  type: 'system' | 'billing' | 'security' | 'activity' | string;
  icon: React.ComponentType<{ className?: string; size?: string | number }>;
  color: string;
  message: string;
  time: string;
}

const NOTIFICATIONS = RAW_NOTIFICATIONS as NotificationItem[];

export const TopNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const [notifTab, setNotifTab] = useState<'all' | 'system' | 'billing'>('all');
  const [dismissedNotifs, setDismissedNotifs] = useState<string[]>([]);

  const visibleNotifs = NOTIFICATIONS.filter(
    (n) => !dismissedNotifs.includes(n.id) && (notifTab === 'all' || n.type === notifTab)
  );

  const unreadCount = NOTIFICATIONS.filter((n) => !dismissedNotifs.includes(n.id)).length;

  // Close notifications on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifs(false);
      }
    };
    if (showNotifs) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showNotifs]);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Persist dismissed notifications to localStorage
  useEffect(() => {
    const stored = localStorage.getItem('orbitflow_dismissed_notifs');
    if (stored) setDismissedNotifs(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('orbitflow_dismissed_notifs', JSON.stringify(dismissedNotifs));
  }, [dismissedNotifs]);

  // Cmd+K to open search, ESC to close search or profile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch((prev) => !prev);
        setFocusedIndex(-1);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowProfileMenu(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showProfileMenu]);

  const getPageTitle = () => {
    const link = DASHBOARD_MENU_ITEMS.find((l) => l.path === currentPath);
    return link ? link.name : 'Dashboard';
  };

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-[100] flex h-[72px] items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-2xl transition-colors duration-300 lg:px-8 dark:border-gray-800 dark:bg-[#0a0a0a]/80">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <Link to="/" aria-label="OrbitFlow Home" className="cursor-pointer">
            <OrbitLogo showText={true} size={32} />
          </Link>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
            {getPageTitle()}
          </span>
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        </div>

        {/* Center Section (Desktop) */}
        <div className="hidden items-center gap-1 rounded-xl border border-gray-100 bg-gray-50 p-1 lg:flex dark:border-gray-800 dark:bg-gray-900/50">
          {DASHBOARD_MENU_ITEMS.map((link) => {
            const isActive =
              currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold transition-all duration-200',
                  isActive
                    ? 'border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 text-[var(--orbit-accent-primary)] shadow-sm'
                    : 'text-gray-550 hover:bg-gray-100/50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white'
                )}
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setShowSearch(true)}
            className="border-gray-250 hidden w-48 cursor-pointer items-center gap-2 rounded-lg border bg-white px-3 py-1.5 transition-all hover:border-[var(--orbit-accent-primary)] md:flex dark:border-gray-800 dark:bg-[#0a0a0a] dark:hover:border-[var(--orbit-accent-primary)]"
          >
            <Search className="h-3.5 w-3.5 text-gray-400" />
            <span className="flex-1 text-left text-xs text-gray-400">Search...</span>
            <div className="flex items-center gap-0.5 rounded border border-gray-200 bg-gray-50 px-1 py-0.5 text-xs font-bold text-gray-400 dark:border-gray-800 dark:bg-gray-900">
              <Command className="h-3 w-3" />
              <span>K</span>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-gray-100 bg-white transition-colors hover:bg-gray-50 sm:h-8 sm:w-8 dark:border-gray-800 dark:bg-[#0a0a0a] dark:hover:bg-gray-900"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-gray-400" />
            ) : (
              <Moon className="h-4 w-4 text-gray-500" />
            )}
          </button>

          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setShowNotifs(!showNotifs)}
              aria-label="Notifications"
              className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-gray-100 bg-white transition-colors hover:bg-gray-50 sm:h-8 sm:w-8 dark:border-gray-800 dark:bg-[#0a0a0a] dark:hover:bg-gray-900"
            >
              <Bell className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifs && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute top-full right-0 z-50 mt-2 w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] shadow-2xl sm:w-[380px]"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[var(--orbit-border-subtle)] px-3 py-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-[var(--orbit-text-primary)]">
                          Notifications
                        </h4>
                        {unreadCount > 0 && (
                          <span className="rounded-full bg-red-500/10 px-1.5 py-0.5 font-mono text-xs font-bold text-red-500">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      {/* Tabs */}
                      <div className="flex gap-0.5 rounded-lg bg-[var(--orbit-elevated)] p-0.5">
                        {(['all', 'system', 'billing'] as const).map((tab) => (
                          <button
                            type="button"
                            key={tab}
                            onClick={() => setNotifTab(tab)}
                            className={cn(
                              'rounded-md px-2 py-1 font-mono text-xs font-bold tracking-wider uppercase transition',
                              notifTab === tab
                                ? 'bg-[var(--orbit-accent-primary)] text-white'
                                : 'text-[var(--orbit-text-muted)] hover:text-[var(--orbit-text-primary)]'
                            )}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="max-h-[250px] divide-y divide-[var(--orbit-border-subtle)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--orbit-border-hover)] hover:[&::-webkit-scrollbar-thumb]:bg-[var(--orbit-text-muted)] [&::-webkit-scrollbar-track]:bg-[var(--orbit-elevated)]">
                      {visibleNotifs.length === 0 ? (
                        <p className="leading-relaxed px-4 py-8 text-center text-sm text-[var(--orbit-text-muted)]">
                          No notifications
                        </p>
                      ) : (
                        visibleNotifs.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => setShowNotifs(false)}
                            className="group flex cursor-pointer items-start gap-3 px-4 py-3 transition hover:bg-[var(--orbit-elevated)]"
                          >
                            <n.icon size={14} className={cn('mt-0.5 shrink-0', n.color)} />
                            <div className="min-w-0 flex-1">
                              <p className="text-left text-sm leading-relaxed text-[var(--orbit-text-primary)]">
                                {n.message}
                              </p>
                              <p className="leading-relaxed mt-1 text-left font-mono text-sm text-[var(--orbit-text-muted)]">
                                {n.time}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDismissedNotifs((prev) => [...prev, n.id]);
                              }}
                              aria-label="Dismiss notification"
                              className="mt-0.5 shrink-0 cursor-pointer rounded-lg p-1 text-[var(--orbit-text-muted)] opacity-0 transition group-hover:opacity-100 hover:bg-[var(--orbit-overlay)] hover:text-[var(--orbit-text-primary)]"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-[var(--orbit-border-subtle)] px-4 py-2.5">
                      <button
                        type="button"
                        onClick={() => setDismissedNotifs(NOTIFICATIONS.map((n) => n.id))}
                        className="w-full cursor-pointer text-center font-mono text-sm font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase hover:opacity-80"
                      >
                        Mark all as read â†’
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="relative hidden lg:flex" ref={profileRef}>
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="group flex cursor-pointer items-center gap-3 pl-2"
              aria-label="Open profile menu"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--orbit-accent-primary)] text-xs font-bold text-white transition-transform group-hover:scale-105 sm:h-8 sm:w-8">
                OF
              </div>
              <div className="hidden text-left xl:block">
                <p className="mb-1 text-sm leading-none font-bold text-gray-900 dark:text-white">
                  OrbitFlow User
                </p>
                <p className="font-mono text-xs leading-none font-semibold tracking-widest text-gray-500 uppercase">
                  Admin
                </p>
              </div>
            </button>
            {showProfileMenu && (
              <div className="absolute top-full right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] shadow-2xl">
                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[var(--orbit-text-primary)] transition hover:bg-[var(--orbit-elevated)]"
                >
                  Settings
                </Link>
                <div className="my-1 h-px bg-[var(--orbit-border-subtle)]" />
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('orbitflow_session');
                    localStorage.removeItem('orbitflow_dismissed_notifs');
                    setShowProfileMenu(false);
                    navigate('/auth/login');
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Open Navigation Menu"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-100 bg-white transition-colors hover:bg-gray-50 lg:hidden dark:border-gray-800 dark:bg-[#0a0a0a] dark:hover:bg-gray-900"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </nav>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[10vh] sm:pt-[20vh]">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowSearch(false)}
          />
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-[#0a0a0a]">
            <div className="flex items-center border-b border-gray-100 px-4 py-3 dark:border-gray-800">
              <Search className="mr-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search..."
                className="flex-1 border-none bg-transparent text-sm text-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 placeholder:text-gray-400 dark:text-white"
                onKeyDown={(e) => {
                  const items = [
                    { title: 'Go to Settings', path: '/settings' },
                    { title: 'View Analytics', path: '/analytics' },
                    { title: 'View Integrations', path: '/integrations' },
                    { title: 'View Executions', path: '/executions' },
                  ];
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setFocusedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setFocusedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
                  } else if (e.key === 'Enter' && focusedIndex >= 0) {
                    e.preventDefault();
                    navigate(items[focusedIndex].path);
                    setShowSearch(false);
                    setFocusedIndex(-1);
                  }
                }}
              />
              <button
                onClick={() => setShowSearch(false)}
                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              <div className="mb-2 px-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Suggestions
              </div>
              {[
                { title: 'Go to Settings', path: '/settings' },
                { title: 'View Analytics', path: '/analytics' },
                { title: 'View Integrations', path: '/integrations' },
                { title: 'View Executions', path: '/executions' },
              ].map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setFocusedIndex(i)}
                  onClick={() => { navigate(item.path); setShowSearch(false); setFocusedIndex(-1); }}
                  className={cn(
                    "group flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors dark:text-gray-300",
                    focusedIndex === i 
                      ? "bg-gray-100 text-[var(--orbit-accent-primary)] dark:bg-gray-800" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-[var(--orbit-accent-primary)] dark:hover:bg-gray-900"
                  )}
                >
                  <span>{item.title}</span>
                  <ArrowRight className={cn("h-4 w-4 transition-opacity", focusedIndex === i ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
                </button>
              ))}
            </div>
            <div className="flex justify-between border-t border-gray-100 bg-gray-50 px-4 py-2 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900">
              <span>
                Press{' '}
                <kbd className="rounded border border-gray-200 bg-white px-1 py-0.5 font-mono text-xs dark:border-gray-700 dark:bg-gray-800">
                  ESC
                </kbd>{' '}
                to close
              </span>
              <span>Search powered by OrbitFlow</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
