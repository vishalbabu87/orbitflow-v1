import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { ChevronRight, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ActivityItem {
  message: string;
  time: string;
  state: string;
}

export interface DashboardLiveFeedProps {
  listTitle: string;
  liveActivity: ActivityItem[];
  searchQuery: string;
  onRunAudit: () => void;
  isMobile?: boolean;
}

export const DashboardLiveFeed: React.FC<DashboardLiveFeedProps> = ({
  listTitle,
  liveActivity,
  searchQuery,
  onRunAudit,
  isMobile,
}) => {
  const scrollRef = useHorizontalScroll();
  const navigate = useNavigate();

  const filteredActivity = liveActivity.filter((item) =>
    item.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`flex flex-col justify-between bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 dark:bg-[var(--orbit-surface)] dark:shadow-none ${isMobile ? 'p-0' : 'rounded-3xl border border-gray-100 p-6 lg:col-span-4 dark:border-[var(--orbit-border-mid)]'}`}
    >
      <div>
        <div
          className={`${isMobile ? 'mb-2' : 'mb-6'} flex items-center justify-between border-b border-gray-100 pb-1.5 dark:border-[var(--orbit-border-mid)]`}
        >
          <h3 className="font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
            {listTitle}
          </h3>
          <div className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5">
            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-mono text-xs font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
              Live
            </span>
          </div>
        </div>

        <div
          ref={scrollRef}
          className={`w-full text-left ${isMobile ? 'flex max-h-[240px] flex-col gap-2 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[var(--orbit-border-hover)]' : 'flex snap-x scrollbar-none gap-4 overflow-x-auto pb-4 sm:block sm:space-y-4 sm:overflow-visible sm:pb-0'}`}
        >
          <AnimatePresence initial={false}>
            {filteredActivity.map((item, idx) => (
              <motion.div
                key={item.message + idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  isMobile
                    ? 'group flex cursor-pointer items-start gap-2 rounded-lg border border-gray-100 px-2 py-1.5 transition-colors hover:bg-gray-50/50 dark:border-[var(--orbit-border-mid)]/40 dark:hover:bg-gray-900/20'
                    : 'group flex min-w-[280px] shrink-0 cursor-pointer snap-center items-start gap-3 rounded-xl border border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50/50 sm:-mx-2 sm:min-w-0 sm:border-0 sm:border-b sm:border-gray-50 sm:px-2 sm:py-2 sm:pb-3 sm:last:border-0 sm:last:pb-0 dark:border-[var(--orbit-border-mid)]/40 dark:hover:bg-gray-900/20'
                }
                onClick={() => navigate('/executions')}
              >
                <div
                  className={`${isMobile ? 'mt-1 h-1.5 w-1.5' : 'mt-1.5 h-2 w-2'} shrink-0 rounded-full ${
                    item.state === 'error'
                      ? 'bg-red-500'
                      : item.state === 'warning'
                        ? 'bg-amber-500'
                        : item.state === 'info'
                          ? 'bg-blue-500'
                          : 'bg-emerald-500'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={`${isMobile ? 'text-xs' : 'text-sm'} leading-snug text-gray-700 dark:text-gray-300`}
                  >
                    {item.message}
                  </p>
                  <span
                    className={`mt-0.5 block font-mono ${isMobile ? 'text-xs' : 'text-xs'} text-gray-400 dark:text-gray-500`}
                  >
                    {item.time}
                  </span>
                </div>
                <ChevronRight
                  size={10}
                  className="mt-1 shrink-0 text-gray-300 transition-colors group-hover:text-gray-400 dark:text-gray-700 dark:group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <button
        type="button"
        onClick={onRunAudit}
        aria-label="Run real-time audit"
        className={`flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50 font-bold text-gray-700 shadow-inner transition-all hover:border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 ${isMobile ? 'mt-2 min-h-[30px] py-1.5 text-xs' : 'mt-6 min-h-[44px] py-3 text-sm'}`}
      >
        <RefreshCw
          size={isMobile ? 9 : 12}
          className="text-[var(--orbit-accent-primary)]"
          aria-hidden="true"
        />{' '}
        Run Real-time Audit
      </button>
    </div>
  );
};
