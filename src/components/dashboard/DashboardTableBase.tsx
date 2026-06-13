import React from 'react';
import { RefreshCw } from 'lucide-react';

export interface TableEmptyStateProps {
  icon: React.ReactNode;
  heading: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
}

export const TableEmptyState: React.FC<TableEmptyStateProps> = ({
  icon,
  heading,
  description,
  actionLabel,
  onAction,
}) => (
  <div
    role="status"
    aria-label={heading}
    className="my-2 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/30 px-6 py-16 text-center dark:border-gray-800/80 dark:bg-gray-900/10"
  >
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-teal-500/10 bg-teal-500/5 text-teal-600 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-700 dark:text-teal-400">
      {icon}
    </div>
    <h4 className="mb-1.5 text-xs font-bold text-gray-900 dark:text-white">{heading}</h4>
    <p className="mb-5 max-w-xs text-xs leading-relaxed font-normal text-gray-500 dark:text-gray-500">
      {description}
    </p>
    <button
      type="button"
      onClick={onAction}
      aria-label={actionLabel}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--orbit-accent-primary)] px-4 py-2 text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase transition-all duration-200 hover:bg-[var(--orbit-accent-primary)] hover:text-white"
    >
      <RefreshCw size={11} aria-hidden="true" />
      {actionLabel}
    </button>
  </div>
);
