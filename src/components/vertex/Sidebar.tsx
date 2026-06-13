import { useState } from 'react';
import {
  LayoutDashboard,
  ArrowRightLeft,
  FileText,
  Terminal,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { OrbitLogo } from '../ui/OrbitLogo';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: ArrowRightLeft, label: 'Transactions', href: '/transactions' },
  { icon: FileText, label: 'Invoices', href: '/invoices' },
  { icon: Terminal, label: 'Developers', href: '/developers' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-50 hidden h-screen flex-col border-r border-white/5 bg-[#0a0f1c] p-6 transition-all duration-300 lg:flex',
        isCollapsed ? 'w-[80px] px-3' : 'w-[240px]'
      )}
    >
      {/* Brand Logo */}
      <div
        className={cn(
          'relative mb-12 flex items-center gap-3 px-2',
          isCollapsed ? 'justify-center' : ''
        )}
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--orbit-accent-primary)] shadow-[0_0_15px_rgba(14,165,164,0.4)] sm:h-8 sm:w-8">
          <OrbitLogo className="h-5 w-5 text-white" />
        </div>
        {!isCollapsed && (
          <span className="text-xl font-bold tracking-tight text-white">OrbitFlow</span>
        )}

        {/* Collapse/Expand Toggle Button */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-1/2 -right-3 z-50 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#0a0f1c] text-white/60 shadow-md transition hover:bg-white/5 hover:text-white"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item, i) => {
          const isActive =
            location.pathname === item.href ||
            (item.href !== '/' && location.pathname.startsWith(item.href));
          return (
            <Link
              key={i}
              to={item.href}
              className={cn(
                'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200',
                isActive
                  ? 'border border-indigo-500/20 bg-indigo-500/10 text-indigo-400'
                  : 'text-white/40 hover:bg-white/5 hover:text-white/90',
                isCollapsed ? 'justify-center' : ''
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon
                className={cn(
                  'h-4 w-4 shrink-0',
                  isActive ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/90'
                )}
              />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Organization Selector Mockup */}
      <div
        className={cn(
          'mt-auto flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:bg-white/5',
          isCollapsed ? 'justify-center p-2' : ''
        )}
        title={isCollapsed ? 'VertexLabs Inc (Production)' : undefined}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/10 text-xs font-bold text-white sm:h-8 sm:w-8">
            OF
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm leading-tight font-medium text-white/90">OrbitFlow Inc</span>
              <span className="text-xs text-white/40">Production</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export const MobileNav = () => {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t border-white/5 bg-[#0a0f1c]/90 px-4 backdrop-blur-2xl lg:hidden">
      {[
        { icon: LayoutDashboard, href: '/dashboard' },
        { icon: ArrowRightLeft, href: '/transactions' },
        { icon: FileText, href: '/invoices' },
        { icon: Settings, href: '/settings' },
      ].map((item, i) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={i}
            to={item.href}
            className={cn('p-2', isActive ? 'text-indigo-400' : 'text-white/40')}
          >
            <item.icon className="h-5 w-5" />
          </Link>
        );
      })}
    </nav>
  );
};
