import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrbitLogo } from '../ui/OrbitLogo';

import { DASHBOARD_MENU_ITEMS } from '../../constants/DASHBOARD_ROUTES';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[120] flex h-full w-[280px] flex-col border-l border-[var(--orbit-border-subtle)] bg-[var(--orbit-surface)] shadow-2xl lg:hidden"
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-[var(--orbit-border-subtle)] px-6">
              <Link to="/" onClick={onClose} aria-label="OrbitFlow Home">
                <OrbitLogo showText={true} size={28} />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Sidebar Menu"
                className="rounded-lg p-2 text-[var(--orbit-text-secondary)] transition-colors hover:bg-[var(--orbit-base)] hover:text-[var(--orbit-text-primary)]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
              <div className="mb-4 px-2">
                <p className="leading-relaxed text-xs font-semibold tracking-widest text-[var(--orbit-text-muted)] uppercase">
                  Navigation
                </p>
              </div>
              {DASHBOARD_MENU_ITEMS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                      isActive
                        ? 'border border-[var(--orbit-accent-primary)]/10 bg-[var(--orbit-accent-primary)]/10 text-[var(--orbit-accent-primary)]'
                        : 'text-[var(--orbit-text-secondary)] hover:bg-[var(--orbit-base)] hover:text-[var(--orbit-text-primary)]'
                    )}
                  >
                    <link.icon
                      className={cn(
                        'h-4 w-4',
                        isActive ? 'text-[var(--orbit-accent-primary)]' : ''
                      )}
                    />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Footer Profile */}
            <div className="border-t border-[var(--orbit-border-subtle)] bg-[var(--orbit-base)]/50 p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--orbit-accent-primary)] text-sm font-bold text-white">
                  OF
                </div>
                <div>
                  <p className="mb-1.5 text-sm leading-none font-bold text-[var(--orbit-text-primary)]">
                    OrbitFlow User
                  </p>
                  <p className="text-xs leading-none font-bold tracking-widest text-[var(--orbit-accent-primary)] uppercase">
                    Admin
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--orbit-border-subtle)] bg-[var(--orbit-base)] py-3 text-xs font-semibold tracking-widest text-[var(--orbit-text-secondary)] uppercase transition-all hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-500"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
