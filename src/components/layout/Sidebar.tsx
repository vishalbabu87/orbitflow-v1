import { LogOut, ChevronRight, ChevronLeft, Sun, Moon, Bot } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { OrbitLogo } from '../ui/OrbitLogo';
import { useTheme } from '../../hooks/useTheme';
import { DASHBOARD_MENU_ITEMS, DASHBOARD_BOTTOM_ITEMS } from '../../constants/DASHBOARD_ROUTES';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

// Shared nav item renderer â€” used for both main and bottom nav sections
const NavItem = ({
  item,
  isActive,
  isCollapsed,
  onClick,
}: {
  item: (typeof DASHBOARD_MENU_ITEMS)[number];
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}) => {
  const Icon = item.icon;
  const linkProps = item.external
    ? { as: 'a' as const, href: item.path, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  const className = cn(
    'flex h-10 w-full cursor-pointer items-center rounded-xl text-sm font-medium transition-all duration-150 ease-out',
    isActive
      ? 'bg-[color-mix(in_srgb,var(--orbit-accent-primary)_12%,transparent)] text-[var(--orbit-accent-primary)]'
      : 'bg-transparent text-[var(--orbit-text-secondary)] hover:bg-[var(--orbit-surface)] hover:text-[var(--orbit-text-primary)]',
    isCollapsed ? 'lg:justify-center lg:px-0' : 'justify-between px-3',
    'justify-between px-3' // Mobile default: full width
  );

  const inner = (
    <>
      <div className="flex items-center gap-3">
        <Icon
          size={20}
          className={cn(
            'shrink-0 transition-colors',
            isActive
              ? 'text-[var(--orbit-accent-primary)]'
              : 'text-[var(--orbit-text-muted)] group-hover:text-[var(--orbit-text-secondary)]'
          )}
        />
        <span className={cn(
          "text-base transition-all duration-300 ease-in-out origin-left overflow-hidden",
          (isCollapsed && !onClick) ? "opacity-0 max-w-0 pointer-events-none ml-0" : "opacity-100 max-w-[150px]"
        )}>
          {item.name}
        </span>
      </div>
      <ChevronRight size={14} className={cn(
        "opacity-50 transition-all duration-300 ease-in-out origin-left overflow-hidden",
        (isCollapsed && !onClick) ? "opacity-0 max-w-0 pointer-events-none" : "opacity-50 max-w-[14px]"
      )} />
    </>
  );

  return (
    <div className="group relative">
      {/* Active left-border pill */}
      {isActive && (!isCollapsed || onClick) && (
        <span className="absolute top-1/2 -left-3 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[var(--orbit-accent-primary)] shadow-[0_0_8px_rgba(14,165,164,0.5)]" />
      )}

      {item.external ? (
        <a
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          aria-label={item.name}
          onClick={onClick}
          {...linkProps}
        >
          {inner}
        </a>
      ) : (
        <Link
          to={item.path}
          className={className}
          aria-label={item.name}
          aria-current={isActive ? 'page' : undefined}
          onClick={onClick}
        >
          {inner}
        </Link>
      )}

      {/* Tooltip when collapsed */}
      {isCollapsed && !onClick && (
        <span className="pointer-events-none absolute top-1/2 left-[calc(100%+10px)] z-[200] -translate-y-1/2 rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-elevated)] px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-[var(--orbit-text-primary)] opacity-0 shadow-lg transition-all group-hover:opacity-100">
          {item.name}
        </span>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed = false,
  onToggle,
  isMobileOpen = false,
  onMobileClose,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) =>
    currentPath === path || (path !== '/' && currentPath.startsWith(path));

  const handleItemClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 flex h-screen flex-col border-r border-[var(--orbit-border-subtle)] bg-[var(--orbit-base)] transition-all duration-300',
        // Desktop Layout
        isCollapsed ? 'lg:w-[60px]' : 'lg:w-[240px]',
        // Mobile Drawer Layout
        isMobileOpen
          ? 'z-[160] w-[240px] translate-x-0'
          : 'z-[100] w-[240px] -translate-x-full lg:translate-x-0',
        'lg:flex'
      )}
    >
      {/* â”€â”€ Logo Zone â”€â”€ */}
      <div className="relative flex h-[72px] shrink-0 items-center justify-between border-b border-[var(--orbit-border-subtle)] px-4">
        <Link to="/" className="cursor-pointer" onClick={handleItemClick}>
          <OrbitLogo
            showText={!isCollapsed || isMobileOpen}
            size={32}
            textClass="text-[var(--orbit-text-primary)]"
          />
        </Link>
        {(!isCollapsed || isMobileOpen) && (
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--orbit-accent-primary)] shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        )}
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className="absolute top-1/2 -right-3 z-50 hidden h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[var(--orbit-border-subtle)] bg-[var(--orbit-base)] text-[var(--orbit-text-muted)] shadow-md transition hover:text-[var(--orbit-text-primary)] lg:flex"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>

      {/* â”€â”€ Main Navigation (scrollable) â”€â”€ */}
      <nav className="mt-4 flex flex-1 scrollbar-none flex-col gap-1 overflow-y-auto px-3">
        {DASHBOARD_MENU_ITEMS.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            isActive={isActive(item.path)}
            isCollapsed={isCollapsed}
            onClick={handleItemClick}
          />
        ))}

        <button
          type="button"
          onClick={() => {
            navigate('/dashboard?assistant=true');
            if (onMobileClose) onMobileClose();
          }}
          className={cn(
            'mt-2 flex h-10 w-full cursor-pointer items-center rounded-xl text-sm font-medium transition-all duration-150 ease-out bg-transparent text-[var(--orbit-text-secondary)] hover:bg-[var(--orbit-surface)] hover:text-[var(--orbit-text-primary)]',
            isCollapsed ? 'lg:justify-center lg:px-0' : 'justify-between px-3',
            'justify-between px-3', // Mobile default: full width
            'lg:hidden' // Hide on Desktop because desktop has it naturally
          )}
        >
          <div className="flex items-center gap-3">
            <Bot
              size={20}
              className="shrink-0 transition-colors text-[var(--orbit-text-muted)] group-hover:text-[var(--orbit-text-secondary)]"
            />
            <span className={cn(
              "text-base font-normal transition-all duration-300 ease-in-out origin-left overflow-hidden",
              isCollapsed ? "opacity-0 max-w-0 pointer-events-none ml-0" : "opacity-100 max-w-[150px]"
            )}>
              AI Chat
            </span>
          </div>
        </button>
      </nav>

      {/* â”€â”€ Divider + Bottom Nav Items (Settings, Help & Docs) â”€â”€ */}
      <div className="px-3 pt-2 pb-2">
        <div className="mb-2 border-t border-[var(--orbit-border-subtle)]" />
        {DASHBOARD_BOTTOM_ITEMS.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            isActive={isActive(item.path)}
            isCollapsed={isCollapsed}
            onClick={handleItemClick}
          />
        ))}
      </div>

      {/* â”€â”€ User Zone â”€â”€ */}
      <div
        className={cn(
          'shrink-0 border-t border-[var(--orbit-border-subtle)] bg-transparent',
          isCollapsed ? 'lg:p-2' : 'p-4',
          'p-4' // Mobile default padding
        )}
      >
        <div
          className={cn(
            'flex items-center gap-3 pl-1 text-left',
            isCollapsed ? 'lg:flex-col lg:justify-center lg:gap-2' : 'gap-3 pl-1'
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--orbit-accent-primary)_20%,transparent)] text-sm font-bold text-[var(--orbit-accent-primary)] shadow-sm">
            OF
          </div>
          <div className={cn(
            "min-w-0 flex-1 transition-all duration-300 ease-in-out origin-left overflow-hidden",
            (isCollapsed && !isMobileOpen) ? "opacity-0 max-w-0 pointer-events-none" : "opacity-100 max-w-[200px]"
          )}>
            <p className="leading-relaxed truncate text-base font-bold text-[var(--orbit-text-primary)]">
              OrbitFlow Admin
            </p>
            <p className="leading-relaxed mt-0.5 truncate font-mono text-xs font-bold tracking-widest text-[var(--orbit-text-secondary)] uppercase">
              Workspace Owner
            </p>
          </div>

          <div className={cn('flex items-center gap-1.5', isCollapsed ? 'lg:flex-col' : '')}>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="cursor-pointer rounded-lg border border-[var(--orbit-border-subtle)] bg-transparent p-1.5 text-[var(--orbit-text-muted)] shadow-sm transition hover:bg-[var(--orbit-surface)] hover:text-[var(--orbit-text-primary)]"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
            </button>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('orbitflow_session');
                navigate('/auth/login');
              }}
              aria-label="Logout"
              className="cursor-pointer rounded-lg border border-[var(--orbit-border-subtle)] bg-transparent p-1.5 text-[var(--orbit-text-muted)] shadow-sm transition hover:border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-500"
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
