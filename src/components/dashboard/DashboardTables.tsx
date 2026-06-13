import React from 'react';
import { cn } from '@/lib/utils';
import {
  Inbox,
  RefreshCw,
  FolderOpen,
  BarChart2,
  MessageSquare,
  Mail,
  Smartphone,
  Check,
} from 'lucide-react';

interface DashboardTablesProps {
  selectedKey: string;
}

// -- Reusable Empty State ------------------------------------------------------
interface TableEmptyStateProps {
  icon: React.ReactNode;
  heading: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
}

const TableEmptyState: React.FC<TableEmptyStateProps> = ({
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
    <h4 className="mb-1.5 text-sm font-bold text-gray-900 dark:text-white">{heading}</h4>
    <p className="mb-5 max-w-xs text-sm leading-relaxed font-normal text-gray-500 dark:text-gray-500">
      {description}
    </p>
    <button
      type="button"
      onClick={onAction}
      aria-label={actionLabel}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--orbit-accent-primary)] px-5 py-3 text-base font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase transition-all duration-200 hover:bg-[var(--orbit-accent-primary)] hover:text-white sm:px-4 sm:py-2 sm:text-sm"
    >
      <RefreshCw size={11} aria-hidden="true" />
      {actionLabel}
    </button>
  </div>
);

// Static database templates
const crmDeals = [
  {
    id: 'c1',
    contact: 'Alice Smith',
    company: 'Acme Corp',
    stage: 'Qualified',
    value: '$12,500',
    confidence: 85,
  },
  {
    id: 'c2',
    contact: 'Bob Jones',
    company: 'Initech Systems',
    stage: 'Proposal Sent',
    value: '$8,200',
    confidence: 65,
  },
  {
    id: 'c3',
    contact: 'Charlie Brown',
    company: 'Northwind Traders',
    stage: 'Negotiation',
    value: '$24,000',
    confidence: 45,
  },
  {
    id: 'c4',
    contact: 'Diana Prince',
    company: 'Stark Industries',
    stage: 'Won',
    value: '$45,000',
    confidence: 95,
  },
  {
    id: 'c5',
    contact: 'Eve Adams',
    company: 'Wayne Enterprises',
    stage: 'Lost',
    value: '$62,000',
    confidence: 10,
  },
];

const workflowMonitor = [
  {
    id: 'w1',
    name: 'HubSpot to Notion Lead Sync',
    status: 'Running',
    type: 'Data Ingestion',
    lastRun: 'Just now',
  },
  {
    id: 'w2',
    name: 'Stripe Invoice Generation',
    status: 'Completed',
    type: 'Finance',
    lastRun: '5m ago',
  },
  {
    id: 'w3',
    name: 'Slack Ops Critical Alert Dispatch',
    status: 'Failed',
    type: 'Operations',
    lastRun: '12m ago',
  },
  {
    id: 'w4',
    name: 'GitHub PR Approval Automation',
    status: 'Pending Approval',
    type: 'Engineering',
    lastRun: '22m ago',
  },
];

const connectedSources = [
  {
    source: 'PostgreSQL Production',
    type: 'Database',
    status: 'Connected',
    lastSync: '2m ago',
    latency: '45ms',
    records: '1.4B',
  },
  {
    source: 'Stripe Events',
    type: 'Webhook',
    status: 'Syncing',
    lastSync: 'Just now',
    latency: '120ms',
    records: '45.2M',
  },
  {
    source: 'HubSpot Contacts',
    type: 'API',
    status: 'Paused',
    lastSync: '2h ago',
    latency: '--',
    records: '1.2M',
  },
  {
    source: 'MongoDB User Cloud',
    type: 'Database',
    status: 'Error',
    lastSync: '14h ago',
    latency: 'Timeout',
    records: '840M',
  },
];

const emailCampaigns = [
  {
    campaign: 'Q2 Product Launch',
    type: 'Broadcast',
    status: 'Completed',
    sent: '14,200',
    openRate: '34.2%',
    ctr: '4.8%',
  },
  {
    campaign: 'Welcome Sequence v2',
    type: 'Welcome',
    status: 'Active',
    sent: '8,450',
    openRate: '68.4%',
    ctr: '12.8%',
  },
  {
    campaign: 'Re-engagement Segment',
    type: 'Re-engagement',
    status: 'Paused',
    sent: '1,200',
    openRate: '22.1%',
    ctr: '2.1%',
  },
  {
    campaign: 'Holiday Special Promo',
    type: 'Broadcast',
    status: 'Draft',
    sent: '--',
    openRate: '--',
    ctr: '--',
  },
];

const mobileGates = [
  {
    gateway: 'iOS APNS Production Node',
    status: 'Healthy',
    latency: '24ms',
    load: '14,200/min',
    usage: 75,
  },
  {
    gateway: 'Google FCM Push Service',
    status: 'Healthy',
    latency: '18ms',
    load: '18,500/min',
    usage: 85,
  },
  {
    gateway: 'OTA App Sync Server',
    status: 'Degraded',
    latency: '242ms',
    load: '820/min',
    usage: 95,
  },
  { gateway: 'Crashlytics Sync Relay', status: 'Down', latency: '--', load: '0/min', usage: 0 },
];

const projectBoard = {
  TODO: [
    {
      id: 't1',
      title: 'Configure Salesforce webhooks',
      priority: 'P1',
      assignee: 'Sarah J.',
      dueDate: 'Oct 12',
    },
  ],
  'IN PROGRESS': [
    {
      id: 't2',
      title: 'Fix rate limit headers for GitHub API',
      priority: 'P0',
      assignee: 'Marcus W.',
      dueDate: 'Oct 10',
    },
  ],
  REVIEW: [
    {
      id: 't3',
      title: 'Audit authentication tokens scope',
      priority: 'P0',
      assignee: 'Alex R.',
      dueDate: 'Oct 11',
    },
  ],
  DONE: [
    {
      id: 't4',
      title: 'Update documentation for v2',
      priority: 'P2',
      assignee: 'Sarah J.',
      dueDate: 'Oct 08',
    },
  ],
};

import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

export const DashboardTables: React.FC<DashboardTablesProps> = ({ selectedKey }) => {
  const scrollRef = useHorizontalScroll();
  const [toastMsg, setToastMsg] = React.useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const renderContent = () => {
    if (selectedKey === 'automation') {
    return (
      <div className="space-y-8">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
            <div>
              <span className="block font-mono text-sm font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                Workflow Engines
              </span>
              <h3 className="mt-0.5 text-xl font-extrabold text-gray-900 dark:text-white">
                Active Automation Monitor
              </h3>
            </div>
            <span className="animate-pulse rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-sm font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
              Running
            </span>
          </div>
          {workflowMonitor.length === 0 ? (
            <TableEmptyState
              icon={<Inbox size={28} aria-hidden="true" />}
              heading="No active workflows"
              description="There are no running or queued automation workflows. Create one to get started."
              actionLabel="Create Workflow"
              onAction={() => showToast('Create Workflow')}
            />
          ) : (
            <div ref={scrollRef as any} className="overflow-x-auto pb-2 sm:pb-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-gray-100/50 dark:[&::-webkit-scrollbar-track]:bg-gray-800/50">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <caption className="sr-only">Active automation workflows monitor</caption>
                <thead>
                  <tr className="border-gray-150 border-b font-mono text-sm font-bold tracking-wider text-gray-400 uppercase dark:border-[#1e2d3d] dark:text-gray-500">
                    <th scope="col" className="px-2 pb-3">
                      Workflow Name
                    </th>
                    <th scope="col" className="px-2 pb-3">
                      Type
                    </th>
                    <th scope="col" className="px-2 pb-3">
                      Last Run
                    </th>
                    <th scope="col" className="px-2 pb-3 text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm text-gray-700 dark:divide-gray-800/40 dark:text-gray-300">
                  {workflowMonitor.map((flow) => (
                    <tr
                      key={flow.id}
                      className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-900/10"
                    >
                      <th
                        scope="row"
                        className="px-2 py-3.5 text-left font-bold text-gray-900 dark:text-white"
                      >
                        {flow.name}
                      </th>
                      <td className="px-2 py-3.5 font-mono text-sm">{flow.type}</td>
                      <td className="px-2 py-3.5 text-gray-400 dark:text-gray-500">
                        {flow.lastRun}
                      </td>
                      <td className="px-2 py-3.5 text-right">
                        <span
                          className={cn(
                            'rounded-full border px-2 py-0.5 font-mono text-sm font-bold',
                            flow.status === 'Running' &&
                              'border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400',
                            flow.status === 'Completed' &&
                              'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                            flow.status === 'Failed' &&
                              'text-red-550 border-red-500/20 bg-red-500/10 dark:text-red-400',
                            flow.status === 'Pending Approval' &&
                              'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          )}
                        >
                          {flow.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Popular Templates Gallery */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
            <div>
              <span className="block font-mono text-sm font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                SaaS Integration Library
              </span>
              <h3 className="mt-0.5 text-xl font-extrabold text-gray-900 dark:text-white">
                Trending AI Automation Templates
              </h3>
            </div>
            <span className="rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-1 font-mono text-sm font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
              Ready to Deploy
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: 'HubSpot Leads to Slack Alert',
                desc: 'Notify your sales channel instantly when an AI agent qualifies a high-value HubSpot lead.',
                apps: ['HubSpot', 'Slack'],
                difficulty: 'Instant',
              },
              {
                title: 'Stripe Invoice Email Drip',
                desc: 'Trigger customized AI email sequences when transactions remain in draft or unpaid states.',
                apps: ['Stripe', 'Mailchimp'],
                difficulty: '1-Click',
              },
              {
                title: 'Zendesk Ticket to AI Draft Reply',
                desc: 'Scan incoming customer support tickets and generate drafts using context-grounded models.',
                apps: ['Zendesk', 'OpenAI'],
                difficulty: 'AI Assisted',
              },
              {
                title: 'GitHub PR Review Automation',
                desc: 'Scan Pull Requests, run unit tests, and post code review summaries to GitHub.',
                apps: ['GitHub', 'OpenAI'],
                difficulty: 'GitOps',
              },
              {
                title: 'Intercom Lead Qualification',
                desc: 'Qualify website chat leads and automatically sync contact details to HubSpot.',
                apps: ['Intercom', 'HubSpot'],
                difficulty: 'AI Agent',
              },
              {
                title: 'Google Drive to Pinecone Ingestion',
                desc: 'Listen to document uploads, chunk and embed documents to Pinecone vector DB.',
                apps: ['Drive', 'Pinecone'],
                difficulty: 'RAG',
              },
            ].map((tpl, i) => (
              <div
                key={i}
                className="border-gray-150 flex flex-col justify-between rounded-2xl border bg-gray-50/50 p-5 transition-colors hover:border-[var(--orbit-accent-primary)]/40 dark:border-[#1e2d3d] dark:bg-gray-900/30"
              >
                <div>
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex gap-1.5">
                      {tpl.apps.map((app, idx) => (
                        <span
                          key={idx}
                          className="rounded border border-[var(--orbit-accent-primary)]/10 bg-[var(--orbit-accent-primary)]/10 px-1.5 py-0.5 font-mono text-sm font-extrabold text-[var(--orbit-accent-primary)]"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-sm font-bold tracking-wider text-gray-400 uppercase">
                      {tpl.difficulty}
                    </span>
                  </div>
                  <h4 className="mb-2 text-base font-extrabold text-gray-900 dark:text-white">
                    {tpl.title}
                  </h4>
                  <p className="mb-4 text-sm leading-relaxed text-gray-500 dark:text-gray-500">
                    {tpl.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast(`Deploying template: ${tpl.title}`)}
                  className="min-h-[44px] w-full cursor-pointer rounded-xl border border-gray-200 bg-white py-3 text-base font-bold text-gray-700 transition-all hover:border-[var(--orbit-accent-primary)] hover:bg-gray-50 hover:text-[var(--orbit-accent-primary)] sm:min-h-0 sm:py-2.5 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-[var(--orbit-accent-primary)] dark:hover:bg-gray-800"
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedKey === 'crm') {
    const totalDeals = crmDeals.length;
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
          <div>
            <span className="block font-mono text-sm font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              CRM Operations
            </span>
            <h3 className="mt-0.5 text-xl font-extrabold text-gray-900 dark:text-white">
              Pipeline Deals
            </h3>
          </div>
          <span className="rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-sm font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
            Active Pipeline
          </span>
        </div>
        {totalDeals === 0 ? (
          <TableEmptyState
            icon={<FolderOpen size={28} aria-hidden="true" />}
            heading="Pipeline is empty"
            description="No deals are currently in the pipeline. Add your first deal to start tracking progress."
            actionLabel="Add Deal"
            onAction={() => showToast('Add Deal')}
          />
        ) : (
          <div ref={scrollRef as any} className="overflow-x-auto pb-2 sm:pb-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-gray-100/50 dark:[&::-webkit-scrollbar-track]:bg-gray-800/50">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <caption className="sr-only">Active pipeline deals table</caption>
              <thead>
                <tr className="border-gray-150 border-b font-mono text-sm font-bold tracking-wider text-gray-400 uppercase dark:border-[#1e2d3d] dark:text-gray-500">
                  <th scope="col" className="px-2 pb-3">
                    Contact
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Company
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Stage
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Value
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Confidence
                  </th>
                  <th scope="col" className="px-2 pb-3 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm text-gray-700 dark:divide-gray-800/40 dark:text-gray-300">
                {crmDeals.map((deal) => (
                  <tr
                    key={deal.id}
                    className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-900/10"
                  >
                    <th
                      scope="row"
                      className="px-2 py-3.5 text-left font-bold text-gray-900 dark:text-white"
                    >
                      {deal.contact}
                    </th>
                    <td className="px-2 py-3.5 text-gray-600 dark:text-gray-400">{deal.company}</td>
                    <td className="px-2 py-3.5">
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 font-mono text-sm font-bold',
                          deal.stage === 'Qualified' &&
                            'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
                          deal.stage === 'Proposal Sent' &&
                            'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                          deal.stage === 'Negotiation' &&
                            'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
                          deal.stage === 'Won' &&
                            'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
                          deal.stage === 'Lost' &&
                            'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        )}
                      >
                        {deal.stage}
                      </span>
                    </td>
                    <td className="px-2 py-3.5 font-mono font-semibold text-gray-900 dark:text-gray-300">
                      {deal.value}
                    </td>
                    <td className="px-2 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                          <div
                            className={cn(
                              'h-full',
                              deal.confidence >= 80
                                ? 'bg-emerald-500'
                                : deal.confidence >= 60
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                            )}
                            style={{ width: `${deal.confidence}%` }}
                          />
                        </div>
                        <span className="font-mono text-sm text-gray-500">{deal.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-2 py-3.5 text-right">
                      <button
                        type="button"
                        className="min-h-[44px] min-w-[44px] p-2 font-mono font-bold text-gray-400 transition-colors hover:text-[var(--orbit-accent-primary)] sm:min-h-0 sm:min-w-0 sm:p-0"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  if (selectedKey === 'project') {
    const totalTasks = Object.values(projectBoard).flat().length;
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
          <div>
            <span className="block font-mono text-sm font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Project Velocity
            </span>
            <h3 className="mt-0.5 text-xl font-extrabold text-gray-900 dark:text-white">
              Sprint Board
            </h3>
          </div>
          <span className="rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-sm font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
            Active Sprint
          </span>
        </div>
        {totalTasks === 0 ? (
          <TableEmptyState
            icon={<FolderOpen size={28} aria-hidden="true" />}
            heading="Board is empty"
            description="No tasks are currently on the board. Add your first task to start tracking progress."
            actionLabel="Add Task"
            onAction={() => showToast('Add Task')}
          />
        ) : (
          <div ref={scrollRef as any} className="flex flex-row gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-gray-100/50 dark:[&::-webkit-scrollbar-track]:bg-gray-800/50">
            {(Object.keys(projectBoard) as Array<keyof typeof projectBoard>).map((column) => (
              <div
                key={column}
                className="flex min-w-[220px] flex-1 flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-3 dark:border-[#1e2d3d] dark:bg-gray-900/30"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 dark:border-[#1e2d3d]">
                  <span className="text-gray-955 text-sm font-black tracking-wider uppercase dark:text-white">
                    {column}
                  </span>
                  <span className="rounded-full bg-gray-200/50 px-2 py-0.5 font-mono text-sm font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    {projectBoard[column].length}
                  </span>
                </div>
                <div className="flex-1 space-y-3">
                  {projectBoard[column].map((task) => (
                    <div
                      key={task.id}
                      className="border-gray-150 cursor-grab rounded-xl border bg-white p-3 text-left shadow-sm transition-all hover:border-[var(--orbit-accent-primary)] dark:border-gray-700 dark:bg-[#1f2937]"
                    >
                      <div className="mb-2">
                        <span
                          className={cn(
                            'mb-2 inline-block rounded border px-1.5 py-0.5 font-mono text-sm font-bold',
                            task.priority === 'P0' &&
                              'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400',
                            task.priority === 'P1' &&
                              'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
                            task.priority === 'P2' &&
                              'border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          )}
                        >
                          {task.priority}
                        </span>
                        <h4 className="text-base leading-tight font-semibold text-gray-900 dark:text-white">
                          {task.title}
                        </h4>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm text-gray-400 dark:text-gray-500">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {task.assignee.charAt(0)}
                        </span>
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (selectedKey === 'analytics') {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
          <div>
            <span className="block font-mono text-sm font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Data Streams
            </span>
            <h3 className="mt-0.5 text-xl font-extrabold text-gray-900 dark:text-white">
              Connected Sources
            </h3>
          </div>
          <span className="rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-sm font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
            All Pipelines
          </span>
        </div>
        {connectedSources.length === 0 ? (
          <TableEmptyState
            icon={<BarChart2 size={28} aria-hidden="true" />}
            heading="No data sources connected"
            description="Connect your first data source to start streaming and replicating data into your analytics pipeline."
            actionLabel="Connect Source"
            onAction={() => showToast('Connect Source')}
          />
        ) : (
          <div ref={scrollRef as any} className="overflow-x-auto pb-2 sm:pb-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-gray-100/50 dark:[&::-webkit-scrollbar-track]:bg-gray-800/50">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <caption className="sr-only">Connected data sources replication pipelines</caption>
              <thead>
                <tr className="border-gray-150 border-b font-mono text-sm font-bold tracking-wider text-gray-400 uppercase dark:border-[#1e2d3d] dark:text-gray-500">
                  <th scope="col" className="px-2 pb-3">
                    Source
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Type
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Status
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Last Sync
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Latency
                  </th>
                  <th scope="col" className="px-2 pb-3 text-right">
                    Records
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm text-gray-700 dark:divide-gray-800/40 dark:text-gray-300">
                {connectedSources.map((source, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-900/10"
                  >
                    <th
                      scope="row"
                      className="px-2 py-3.5 text-left font-bold text-gray-900 dark:text-white"
                    >
                      {source.source}
                    </th>
                    <td className="px-2 py-3.5 text-gray-500">{source.type}</td>
                    <td className="px-2 py-3.5">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-sm font-bold',
                          source.status === 'Connected' &&
                            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                          source.status === 'Syncing' &&
                            'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                          source.status === 'Paused' &&
                            'bg-amber-500/10 text-amber-600 dark:text-amber-400',
                          source.status === 'Error' &&
                            'bg-red-500/10 text-red-600 dark:text-red-400'
                        )}
                      >
                        {source.status === 'Syncing' && (
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                          </span>
                        )}
                        {source.status}
                      </span>
                    </td>
                    <td className="px-2 py-3.5 font-mono text-sm text-gray-500">
                      {source.lastSync}
                    </td>
                    <td className="px-2 py-3.5 font-mono text-sm text-gray-500">
                      {source.latency}
                    </td>
                    <td className="px-2 py-3.5 text-right font-mono font-semibold text-gray-900 dark:text-gray-300">
                      {source.records}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  if (selectedKey === 'chatbot') {
    const chatbotNodes = [
      {
        name: 'Support Bot Pro (English)',
        model: 'GPT-4o-mini',
        sessions: 28,
        status: 'Healthy',
        avgTime: '1.2s',
      },
      {
        name: 'Sales Closer Bot (Spanish)',
        model: 'Claude 3.5 Haiku',
        sessions: 14,
        status: 'Healthy',
        avgTime: '1.4s',
      },
      {
        name: 'Technical Docs Helper',
        model: 'Gemini 1.5 Flash',
        sessions: 8,
        status: 'Idle',
        avgTime: '0.8s',
      },
    ];
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
          <div>
            <span className="block font-mono text-sm font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              LLM Processing Nodes
            </span>
            <h3 className="mt-0.5 text-xl font-extrabold text-gray-900 dark:text-white">
              Active Chatbot Sessions
            </h3>
          </div>
          <span className="rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-sm font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
            Agents Ready
          </span>
        </div>
        {chatbotNodes.length === 0 ? (
          <TableEmptyState
            icon={<MessageSquare size={28} aria-hidden="true" />}
            heading="No chatbot agents running"
            description="Deploy your first AI chatbot agent to start handling customer conversations automatically."
            actionLabel="Deploy Agent"
            onAction={() => showToast('Deploy Agent')}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {chatbotNodes.map((node, idx) => (
              <div
                key={idx}
                className="border-gray-150 rounded-2xl border bg-gray-50/50 p-5 text-left dark:border-[#1e2d3d] dark:bg-gray-900/30"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">
                      {node.name}
                    </h4>
                    <span className="mt-1 inline-block rounded bg-[var(--orbit-accent-primary)]/10 px-1.5 py-0.5 font-mono text-sm font-bold text-[var(--orbit-accent-primary)] dark:bg-[var(--orbit-accent-primary)]/20">
                      {node.model}
                    </span>
                  </div>
                  <span
                    className={cn(
                      'rounded border px-2 py-0.5 font-mono text-sm font-bold',
                      node.status === 'Healthy'
                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'border-gray-200 bg-gray-100 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    )}
                  >
                    {node.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2 dark:border-[#1e2d3d]">
                    <span className="text-gray-500 dark:text-gray-400">Sessions</span>
                    <span className="font-mono font-semibold text-gray-900 dark:text-gray-300">
                      {node.sessions}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-gray-500 dark:text-gray-400">Avg Time</span>
                    <span className="font-mono font-semibold text-gray-900 dark:text-gray-300">
                      {node.avgTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (selectedKey === 'marketing') {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
          <div>
            <span className="block font-mono text-sm font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Outbound Funnels
            </span>
            <h3 className="mt-0.5 text-xl font-extrabold text-gray-900 dark:text-white">
              Campaign List
            </h3>
          </div>
          <span className="rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-sm font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
            Marketing
          </span>
        </div>
        {emailCampaigns.length === 0 ? (
          <TableEmptyState
            icon={<Mail size={28} aria-hidden="true" />}
            heading="No campaigns yet"
            description="Create your first email campaign to start reaching your audience and tracking performance metrics."
            actionLabel="Create Campaign"
            onAction={() => showToast('Create Campaign')}
          />
        ) : (
          <div ref={scrollRef as any} className="overflow-x-auto pb-2 sm:pb-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-gray-100/50 dark:[&::-webkit-scrollbar-track]:bg-gray-800/50">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <caption className="sr-only">
                Email marketing campaigns performance statistics
              </caption>
              <thead>
                <tr className="border-gray-150 border-b font-mono text-sm font-bold tracking-wider text-gray-400 uppercase dark:border-[#1e2d3d] dark:text-gray-500">
                  <th scope="col" className="px-2 pb-3">
                    Campaign
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Type
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Status
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Sent
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Open Rate
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    CTR
                  </th>
                  <th scope="col" className="px-2 pb-3 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm text-gray-700 dark:divide-gray-800/40 dark:text-gray-300">
                {emailCampaigns.map((camp, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-900/10"
                  >
                    <th
                      scope="row"
                      className="px-2 py-3.5 text-left font-bold text-gray-900 dark:text-white"
                    >
                      {camp.campaign}
                    </th>
                    <td className="px-2 py-3.5 text-gray-600 dark:text-gray-400">{camp.type}</td>
                    <td className="px-2 py-3.5">
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 font-mono text-sm font-bold',
                          camp.status === 'Completed' &&
                            'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                          camp.status === 'Active' &&
                            'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
                          camp.status === 'Paused' &&
                            'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
                          camp.status === 'Draft' &&
                            'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                        )}
                      >
                        {camp.status}
                      </span>
                    </td>
                    <td className="px-2 py-3.5 font-mono text-gray-500 dark:text-gray-400">
                      {camp.sent}
                    </td>
                    <td className="px-2 py-3.5 font-mono text-gray-900 dark:text-gray-300">
                      {camp.openRate}
                    </td>
                    <td className="px-2 py-3.5 font-mono text-gray-900 dark:text-gray-300">
                      {camp.ctr}
                    </td>
                    <td className="px-2 py-3.5 text-right">
                      <button
                        type="button"
                        className="min-h-[44px] min-w-[44px] p-2 font-mono font-bold text-gray-400 transition-colors hover:text-[var(--orbit-accent-primary)] sm:min-h-0 sm:min-w-0 sm:p-0"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  if (selectedKey === 'mobile') {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
          <div>
            <span className="block font-mono text-sm font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Notification Lanes
            </span>
            <h3 className="mt-0.5 text-xl font-extrabold text-gray-900 dark:text-white">
              Mobile Push Gateways
            </h3>
          </div>
          <span className="rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-sm font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
            Connected
          </span>
        </div>
        {mobileGates.length === 0 ? (
          <TableEmptyState
            icon={<Smartphone size={28} aria-hidden="true" />}
            heading="No gateways connected"
            description="Connect your first mobile push gateway to start delivering notifications to iOS and Android devices."
            actionLabel="Add Gateway"
            onAction={() => showToast('Add Gateway')}
          />
        ) : (
          <div ref={scrollRef as any} className="overflow-x-auto pb-2 sm:pb-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-gray-100/50 dark:[&::-webkit-scrollbar-track]:bg-gray-800/50">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <caption className="sr-only">Mobile push notification gateways statistics</caption>
              <thead>
                <tr className="border-gray-150 border-b font-mono text-sm font-bold tracking-wider text-gray-400 uppercase dark:border-[#1e2d3d] dark:text-gray-500">
                  <th scope="col" className="px-2 pb-3">
                    Gateway / Relay Service
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Avg Latency
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Throughput Load
                  </th>
                  <th scope="col" className="px-2 pb-3 text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm text-gray-700 dark:divide-gray-800/40 dark:text-gray-300">
                {mobileGates.map((gate, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-900/10"
                  >
                    <th
                      scope="row"
                      className="px-2 py-3.5 text-left font-bold text-gray-950 dark:text-white"
                    >
                      {gate.gateway}
                    </th>
                    <td className="px-2 py-3.5 font-mono text-sm text-gray-500 dark:text-gray-400">
                      {gate.latency}
                    </td>
                    <td className="px-2 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="min-w-[60px] font-mono text-sm font-semibold text-gray-900 dark:text-gray-300">
                          {gate.load}
                        </span>
                        <div className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-gray-100 sm:block dark:bg-gray-800">
                          <div
                            className={cn(
                              'h-full',
                              gate.usage >= 90
                                ? 'bg-red-500'
                                : gate.usage >= 75
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                            )}
                            style={{ width: `${gate.usage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3.5 text-right">
                      <span
                        className={cn(
                          'rounded-full border px-2 py-0.5 font-mono text-sm font-bold',
                          gate.status === 'Healthy' &&
                            'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                          gate.status === 'Degraded' &&
                            'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
                          gate.status === 'Down' &&
                            'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400'
                        )}
                      >
                        {gate.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

    return null;
  };

  return (
    <>
      {renderContent()}
      {toastMsg && (
        <div className="animate-in slide-in-from-bottom-4 fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600 shadow-lg dark:border-emerald-900/30 dark:bg-emerald-950/90 dark:text-emerald-400">
          <Check size={16} />
          {toastMsg}
        </div>
      )}
    </>
  );
};

