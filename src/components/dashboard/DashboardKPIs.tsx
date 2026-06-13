import React from 'react';

export interface KPIItem {
  name: string;
  value: number | string;
  trend: string;
  state: string;
  suffix: string;
  sparkline?: number[];
}

interface DashboardKPIsProps {
  kpis: KPIItem[];
  liveRuns: number;
  isMobile?: boolean;
  isShowcase?: boolean;
}

export const DashboardKPIs: React.FC<DashboardKPIsProps> = ({
  kpis,
  liveRuns,
  isMobile,
  isShowcase,
}) => {
  const containerClass = isMobile
    ? 'grid gap-1.5 w-full'
    : kpis.length === 3
      ? 'grid grid-cols-2 gap-3 lg:grid-cols-3'
      : 'grid grid-cols-2 gap-3 lg:grid-cols-4';

  return (
    <>
      <style>{`
        div#dashboard-kpi-grid.kpi-grid-mobile-override {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
      `}</style>
      <div 
        id="dashboard-kpi-grid"
        className={`${containerClass} ${isMobile || isShowcase ? 'kpi-grid-mobile-override' : ''}`}
      >
        {kpis.map((kpi, idx) => {
          // Add dynamic live drifting to first KPI
          const valueDisplay =
            idx === 0 && typeof kpi.value === 'number'
              ? (kpi.value + liveRuns).toLocaleString()
              : typeof kpi.value === 'number'
                ? kpi.value.toLocaleString()
                : kpi.value;

          const isNegative = kpi.state === 'warning' || kpi.state === 'error';

          // Styling variants for regular, mobile, and showcase mockup
          let cardStyle =
            'min-h-[70px] rounded-xl border p-3.5 shadow-[0_2px_6px_rgba(0,0,0,0.01),0_6px_16px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(14,165,164,0.12)] hover:border-[var(--orbit-accent-primary)]/40 hover:-translate-y-0.5';
          let nameTextSize =
            'font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-secondary)] uppercase';
          let trendStyle = 'rounded-md font-mono font-bold px-2 py-0.5 text-xs';
          let valueTextSize = 'text-2xl font-extrabold';
          let suffixTextSize =
            'mt-0.5 font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-muted)] uppercase';
          let sparklineClass = 'h-10 w-20 shrink-0';

          if (isMobile && isShowcase) {
            cardStyle =
              'min-h-[46px] rounded-lg border p-1.5 shadow-sm transition-all duration-300 active:bg-[var(--orbit-elevated)]';
            nameTextSize =
              'font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-muted)] uppercase leading-none';
            trendStyle = 'rounded font-mono font-bold px-1 py-[1px] text-xs leading-none';
            valueTextSize = 'text-xs font-extrabold leading-tight';
            suffixTextSize =
              'mt-0.5 font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-muted)] uppercase leading-none';
            sparklineClass = 'h-4 w-8 shrink-0';
          } else if (isShowcase) {
            cardStyle =
              'min-h-[54px] rounded-xl border p-2 shadow-sm transition-all duration-300 hover:shadow-[0_0_12px_rgba(14,165,154,0.15)] hover:border-[var(--orbit-accent-primary)]/40';
            nameTextSize =
              'font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-secondary)] uppercase';
            trendStyle = 'rounded font-mono font-bold px-1 py-0.5 text-xs';
            valueTextSize = 'text-base font-extrabold';
            suffixTextSize =
              'mt-0 font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-muted)] uppercase';
            sparklineClass = 'h-5 w-10 shrink-0';
          } else if (isMobile) {
            cardStyle =
              'min-h-[46px] rounded-lg border p-1.5 shadow-sm transition-all duration-300 active:bg-[var(--orbit-elevated)]';
            nameTextSize =
              'font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-muted)] uppercase leading-none';
            trendStyle = 'rounded font-mono font-bold px-1 py-[1px] text-xs leading-none';
            valueTextSize = 'text-sm font-extrabold leading-tight';
            suffixTextSize =
              'mt-0 font-mono text-xs font-bold tracking-wider text-[var(--orbit-text-muted)] uppercase leading-none';
            sparklineClass = 'h-4 w-8 shrink-0';
          }

          return (
            <div
              key={idx}
              className={`group flex cursor-pointer flex-col justify-between bg-white text-left transition-colors duration-300 hover:border-[var(--orbit-accent-primary)]/40 dark:bg-[var(--orbit-surface)] dark:shadow-none ${
                isNegative
                  ? 'border-red-200/60 dark:border-red-900/30'
                  : 'border-gray-100 dark:border-[var(--orbit-border-mid)]'
              } ${cardStyle}`}
            >
              <div className="flex items-start justify-between">
                <span className={nameTextSize}>{kpi.name}</span>
                <span
                  className={`${trendStyle} ${
                    isNegative
                      ? 'bg-red-500/15 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                      : 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  }`}
                >
                  {kpi.trend}
                </span>
              </div>

              <div className="mt-1 flex w-full items-end justify-between">
                <div>
                  <div
                    className={`flex items-baseline gap-1 font-sans ${valueTextSize} tracking-tight text-[var(--orbit-text-primary)]`}
                  >
                    <span>{valueDisplay}</span>
                    {idx === 0 && (
                      <span className="ml-1 inline-block h-1.5 w-1.5 animate-ping rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <p className={suffixTextSize}>{kpi.suffix}</p>
                </div>

                {/* Sparkline Graph */}
                {kpi.sparkline &&
                  (() => {
                    const minVal = Math.min(...kpi.sparkline);
                    const maxVal = Math.max(...kpi.sparkline);
                    const range = maxVal - minVal || 1;
                    return (
                      <div className={sparklineClass}>
                        <svg
                          viewBox="0 0 100 40"
                          className="h-full w-full overflow-visible"
                          aria-hidden="true"
                        >
                          <path
                            d={`M 0 ${40 - ((kpi.sparkline![0] - minVal) / range) * 30}
                             L 16.6 ${40 - ((kpi.sparkline![1] - minVal) / range) * 30}
                             L 33.3 ${40 - ((kpi.sparkline![2] - minVal) / range) * 30}
                             L 50 ${40 - ((kpi.sparkline![3] - minVal) / range) * 30}
                             L 66.6 ${40 - ((kpi.sparkline![4] - minVal) / range) * 30}
                             L 83.3 ${40 - ((kpi.sparkline![5] - minVal) / range) * 30}
                             L 100 ${40 - ((kpi.sparkline![6] - minVal) / range) * 30}`}
                            fill="none"
                            stroke={isNegative ? 'var(--orbit-error)' : 'var(--orbit-accent-primary)'}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="leading-relaxed animate-[drawSparkline_1.2s_ease-out_forwards]"
                            style={{
                              strokeDasharray: '160',
                              strokeDashoffset: '160',
                            }}
                          />
                        </svg>
                      </div>
                    );
                  })()}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
