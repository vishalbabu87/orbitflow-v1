import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Download, Share2 } from 'lucide-react';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

interface ChartDataItem {
  label: string;
  value: number;
}

interface DashboardChartsProps {
  chartLabel: string;
  chartData: ChartDataItem[];
  timeFilter: string;
  onTimeFilterChange: (filter: string) => void;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({
  chartLabel,
  chartData,
  timeFilter,
  onTimeFilterChange,
}) => {
  const scrollRef = useHorizontalScroll();
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <div className="relative rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 lg:col-span-8 dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:shadow-none">
      {/* Custom Toast */}
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 flex animate-[slideIn_0.2s_ease-out] items-center gap-2 rounded-xl border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-4 py-2 text-sm font-semibold text-[var(--orbit-accent-primary)] shadow-lg backdrop-blur-md dark:border-[var(--orbit-accent-primary)]/30 dark:bg-[var(--orbit-accent-primary)]/20">
          <div className="h-2 w-2 rounded-full bg-[var(--orbit-accent-primary)] shadow-[0_0_8px_var(--orbit-accent-primary)]" />
          {toastMessage}
        </div>
      )}

      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="text-left">
          <h3 className="font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
            Performance History
          </h3>
          <h2 className="mt-0.5 font-sans text-lg font-extrabold text-gray-900 dark:text-white">
            {chartLabel} Trend
          </h2>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          {/* Time Filter Tabs inside Graph */}
          <div ref={scrollRef} className="w-full overflow-x-auto pb-1 sm:w-auto sm:overflow-x-visible sm:pb-0">
            <div className="border-gray-150 flex w-max shrink-0 items-center rounded-xl border bg-gray-50/50 p-0.5 sm:w-auto dark:border-gray-700/80 dark:bg-gray-800/40">
              {['Today', '7 Days', '30 Days', '90 Days'].map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => onTimeFilterChange(f)}
                  className={`min-h-[44px] cursor-pointer rounded-lg px-3 py-2 font-mono text-sm font-bold tracking-wider uppercase transition-all sm:min-h-0 sm:px-2.5 sm:py-1 sm:text-xs ${
                    timeFilter === f
                      ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white'
                      : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showToast('Exporting to CSV...')}
              aria-label="Export chart as CSV"
              className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-2 transition-all hover:bg-gray-100 sm:min-h-[32px] sm:min-w-[32px] sm:p-1.5 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Export chart"
            >
              <Download size={16} className="text-gray-400 sm:h-3 sm:w-3" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => showToast('Link copied to clipboard!')}
              aria-label="Share chart"
              className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-2 transition-all hover:bg-gray-100 sm:min-h-[32px] sm:min-w-[32px] sm:p-1.5 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Share"
            >
              <Share2 size={16} className="text-gray-400 sm:h-3 sm:w-3" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height={288}>
          <AreaChart
            data={chartData}
            margin={
              typeof window !== 'undefined' && window.innerWidth < 768
                ? { top: 30, right: 4, left: -28, bottom: 0 }
                : { top: 30, right: 10, left: -20, bottom: 0 }
            }
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--orbit-accent-primary)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--orbit-accent-primary)" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="currentColor"
              className="text-gray-100 dark:text-gray-800"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: 'monospace', fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: 'monospace', fontWeight: 600 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--orbit-surface)',
                borderColor: 'var(--orbit-border-mid)',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                color: 'var(--orbit-text-primary)',
              }}
              labelStyle={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: '#6B7280',
                fontWeight: 'bold',
              }}
              itemStyle={{
                color: 'var(--orbit-accent-primary)',
                fontWeight: 'bold',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--orbit-accent-primary)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

