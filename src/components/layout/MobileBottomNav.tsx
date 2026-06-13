import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart2, Activity, Zap, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  const NAV_ITEMS = [
    { name: 'Home', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'Activity', icon: Activity, path: '/executions' },
    { name: 'Apps', icon: Zap, path: '/integrations' },
    { name: 'Settings', icon: Settings2, path: '/settings' },
  ];

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-[100] border-t border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)]/90 backdrop-blur-xl lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex h-16 items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] rounded-xl transition-all',
                isActive 
                  ? 'text-[var(--orbit-accent-primary)]' 
                  : 'text-[var(--orbit-text-muted)] hover:text-[var(--orbit-text-primary)]'
              )}
            >
              <div className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300',
                isActive ? 'bg-[var(--orbit-accent-primary)]/10' : 'bg-transparent'
              )}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={cn(
                'text-xs font-bold tracking-wide transition-all',
                isActive ? 'opacity-100' : 'opacity-70'
              )}>
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
