import React, { useState } from 'react';
import { MoreHorizontal, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Integration {
  id: string;
  name: string;
  accountId: string;
  status: 'connected' | 'disconnected';
  initial: string;
  color: string;
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'unsplash',
    name: 'Unsplash',
    accountId: 'workspace_dev',
    status: 'connected',
    initial: 'U',
    color: '#111',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    accountId: 'acme_cloud',
    status: 'connected',
    initial: 'F',
    color: '#1877F2',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    accountId: 'user_example',
    status: 'connected',
    initial: 'I',
    color: '#E1306C',
  },
  {
    id: 'behance',
    name: 'Behance',
    accountId: 'my_company',
    status: 'disconnected',
    initial: 'B',
    color: '#1769FF',
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    accountId: 'acme_corp',
    status: 'disconnected',
    initial: 'X',
    color: '#000',
  },
];

export interface IntegrationsPanelProps {
  isMobile?: boolean;
}

export const IntegrationsPanel: React.FC<IntegrationsPanelProps> = ({ isMobile }) => {
  const [integrations, setIntegrations] = useState<Integration[]>(INTEGRATIONS);
  const navigate = useNavigate();

  const handleConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'connected' } : item))
    );
  };

  return (
    <div
      className={`bg-white text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] dark:bg-[var(--orbit-surface)] dark:shadow-none ${isMobile ? 'rounded-xl border border-gray-100 p-2.5 dark:border-[var(--orbit-border-mid)]' : '-mx-4 border-y border-gray-100 p-5 sm:mx-0 sm:rounded-3xl sm:border-x dark:border-[var(--orbit-border-mid)]'}`}
    >
      {/* Header */}
      <div className={`${isMobile ? 'mb-3' : 'mb-4'} flex items-center justify-between`}>
        <div>
          <span
            className={`block font-mono font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}
          >
            Connected Accounts
          </span>
          <h3
            className={`mt-0.5 font-extrabold text-gray-900 dark:text-white ${isMobile ? 'text-xs' : 'text-base'}`}
          >
            Integrations
          </h3>
        </div>
        <button
          type="button"
          aria-label="Integrations options"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 sm:h-8 sm:w-8 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Integration Items */}
      <div
        className={`flex flex-col gap-2.5 text-left ${isMobile ? 'max-h-[180px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[var(--orbit-border-hover)]' : 'sm:space-y-2.5'}`}
      >
        {integrations.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between rounded-lg border border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/40 ${isMobile ? 'px-2 py-1.5' : 'px-3.5 py-3 sm:border-0 sm:px-1 sm:py-1.5'}`}
          >
            {/* Left: Icon + Info */}
            <div className="flex items-center gap-3">
              <div
                className={`flex shrink-0 items-center justify-center rounded-lg border border-gray-100 font-extrabold text-white dark:border-gray-700 ${isMobile ? 'h-6 w-6 text-xs' : 'h-9 w-9 text-sm'}`}
                style={{ backgroundColor: item.color }}
              >
                {item.initial}
              </div>
              <div>
                <h4
                  className={`font-extrabold text-gray-900 dark:text-white ${isMobile ? 'text-xs' : 'text-sm'}`}
                >
                  {item.name}
                </h4>
                <p
                  className={`font-mono text-gray-500 dark:text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}
                >
                  {item.status === 'connected' ? `ID: ${item.accountId}` : 'Not connected'}
                </p>
              </div>
            </div>

            {/* Right: Status Badge or Connect Button */}
            {item.status === 'connected' ? (
              <span
                className={`flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 font-mono font-bold text-emerald-600 dark:text-emerald-400 ${isMobile ? 'px-1.5 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'}`}
              >
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                Connected
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handleConnect(item.id)}
                className={`flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--orbit-accent-primary)]/30 font-mono font-bold text-[var(--orbit-accent-primary)] transition hover:bg-[var(--orbit-accent-primary)]/10 ${isMobile ? 'min-h-[28px] px-2 py-1 text-xs' : 'min-h-[44px] px-4 py-3 text-base sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-sm'}`}
              >
                <RefreshCw size={9} />
                Connect
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className={`border-t border-gray-100 dark:border-gray-800 ${isMobile ? 'mt-2 pt-1.5' : 'mt-4 pt-3'}`}
      >
        <button
          type="button"
          onClick={() => navigate('/integrations')}
          className={`w-full cursor-pointer rounded-xl text-center font-mono font-bold tracking-wider text-gray-400 uppercase transition hover:text-[var(--orbit-accent-primary)] dark:text-gray-500 dark:hover:text-[var(--orbit-accent-primary)] ${isMobile ? 'min-h-[30px] py-1.5 text-xs' : 'min-h-[44px] py-3 text-base sm:min-h-0 sm:text-sm'}`}
        >
          Manage all integrations â†’
        </button>
      </div>
    </div>
  );
};

export default IntegrationsPanel;
