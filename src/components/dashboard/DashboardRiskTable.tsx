import React from 'react';
import { FolderOpen } from 'lucide-react';
import { TableEmptyState } from './DashboardTableBase';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { crmPipeline } from '../../constants/dashboardTableConstants';

interface DashboardRiskTableProps {
  onAction?: () => void;
}

export const DashboardRiskTable: React.FC<DashboardRiskTableProps> = ({ onAction }) => {
  const scrollRef = useHorizontalScroll();
  const totalDeals = Object.values(crmPipeline).flat().length;

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
      <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
        <div>
          <span className="block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
            CRM Operations
          </span>
          <h3 className="mt-0.5 text-lg font-extrabold text-gray-900 dark:text-white">
            Live Deals Kanban Pipeline
          </h3>
        </div>
        <span className="rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
          Active Pipeline
        </span>
      </div>
      {totalDeals === 0 ? (
        <TableEmptyState
          icon={<FolderOpen size={28} aria-hidden="true" />}
          heading="Pipeline is empty"
          description="No deals are currently in the pipeline. Add your first deal to start tracking progress."
          actionLabel="Add Deal"
          onAction={onAction || (() => {})}
        />
      ) : (
        <div ref={scrollRef as any} className="table-scroll-wrapper -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <div className="flex flex-row gap-4 pb-4">
            {(Object.keys(crmPipeline) as Array<keyof typeof crmPipeline>).map((column) => (
              <div
                key={column}
                className="flex min-w-[200px] flex-1 flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-3 dark:border-[#1e2d3d] dark:bg-gray-900/30"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 dark:border-[#1e2d3d]">
                  <span className="text-gray-955 text-xs font-black tracking-wider uppercase dark:text-white">
                    {column}
                  </span>
                  <span className="rounded-full bg-gray-200/50 px-2 py-0.5 font-mono text-xs font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    {crmPipeline[column].length}
                  </span>
                </div>
                <div className="flex-1 space-y-3">
                  {crmPipeline[column].map((deal) => (
                    <div
                      key={deal.id}
                      className="border-gray-150 rounded-xl border bg-white p-3 text-left shadow-sm transition-all hover:border-[var(--orbit-accent-primary)] dark:border-gray-700 dark:bg-[#1f2937]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="truncate text-xs font-bold text-gray-900 dark:text-white">
                          {deal.company}
                        </h4>
                        <span className="font-mono text-xs font-extrabold whitespace-nowrap text-[var(--orbit-accent-primary)]">
                          {deal.value}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                        <span>{deal.owner}</span>
                        <div className="h-1 w-12 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                          <div
                            className="h-full bg-[var(--orbit-accent-primary)]"
                            style={{ width: `${deal.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
