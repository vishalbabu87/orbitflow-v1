import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useLocation, Link } from 'react-router-dom';
import { OrbitLogo } from '../ui/OrbitLogo';
import { Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '@/lib/utils';
import { DASHBOARD_PATHNAMES } from '../../constants/DASHBOARD_ROUTES';


interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isDashboardRoute = DASHBOARD_PATHNAMES.some(path => location.pathname.startsWith(path));

  if (!isDashboardRoute) return <>{children}</>;

  return (
    <div className="dashboard-layout flex min-h-screen overflow-x-hidden bg-[var(--orbit-base)] font-sans text-gray-900 transition-colors duration-300 selection:bg-[var(--orbit-accent-primary)]/30 dark:text-gray-100">
      {/* Sidebar (Responsive: drawer on mobile, fixed on desktop) */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Backdrop backdrop-blur for Mobile Drawer */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div
        className={cn(
          'relative flex min-h-screen w-full flex-grow flex-col min-w-0 transition-all duration-300',
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        )}
      >
        {/* Mesh Gradient Background */}
        <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[var(--orbit-accent-primary)]/5 blur-[120px]" />
          <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-[var(--orbit-accent-primary)]/3 blur-[120px]" />
        </div>

        {/* Mobile Header */}
        <header className="sticky top-0 z-45 flex h-[52px] items-center justify-between border-b border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)]/90 px-3 backdrop-blur-2xl transition-colors duration-300 lg:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open Navigation Menu"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] text-[var(--orbit-text-secondary)] hover:bg-[var(--orbit-elevated)]"
            >
              <Menu className="h-4 w-4" />
            </button>
            <Link
              to="/"
              aria-label="OrbitFlow Home"
              className="flex shrink-0 cursor-pointer items-center"
            >
              <OrbitLogo showText={true} size={26} />
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-2 text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--orbit-accent-primary)] text-xs font-bold text-white">
              OF
            </div>
          </div>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="relative min-w-0 flex-grow pt-4 pb-24 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 md:py-10 md:pb-12"
        >
          <div className="mx-auto w-full max-w-[1600px] min-w-0">{children}</div>
        </main>
        
        {/* Removed MobileBottomNav as requested */}
      </div>
    </div>
  );
};

export default AppShell;
