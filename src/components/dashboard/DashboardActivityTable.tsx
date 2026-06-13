import React from 'react';
import { cn } from '@/lib/utils';
import { Inbox, BarChart2, MessageSquare, Mail, Smartphone, Check } from 'lucide-react';
import { TableEmptyState } from './DashboardTableBase';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import {
  workflowMonitor,
  connectedSources,
  emailCampaigns,
  mobileGates,
  teamTasks,
} from '../../constants/dashboardTableConstants';

interface DashboardActivityTableProps {
  selectedKey: string;
}

export const DashboardActivityTable: React.FC<DashboardActivityTableProps> = ({ selectedKey }) => {
  const scrollRef = useHorizontalScroll();
  const [toastMsg, setToastMsg] = React.useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const renderContent = () => {
    // 1. Automation
    if (selectedKey === 'automation') {
    return (
      <div className="space-y-8">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
            <div>
              <span className="block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                Workflow Engines
              </span>
              <h3 className="mt-0.5 text-lg font-extrabold text-gray-900 dark:text-white">
                Active Automation Monitor
              </h3>
            </div>
            <span className="animate-pulse rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
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
            <div ref={scrollRef} className="table-scroll-wrapper -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <caption className="sr-only">Active automation workflows monitor</caption>
                <thead>
                  <tr className="border-gray-150 border-b font-mono text-xs font-bold tracking-wider text-gray-400 uppercase dark:border-[#1e2d3d] dark:text-gray-500">
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
                <tbody className="divide-y divide-gray-50 text-xs text-gray-700 dark:divide-gray-800/40 dark:text-gray-300">
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
                      <td className="px-2 py-3.5 font-mono text-xs">{flow.type}</td>
                      <td className="px-2 py-3.5 text-gray-400 dark:text-gray-500">
                        {flow.lastRun}
                      </td>
                      <td className="px-2 py-3.5 text-right">
                        <span
                          className={cn(
                            'rounded-full border px-2 py-0.5 font-mono text-xs font-bold',
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
              <span className="block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                SaaS Integration Library
              </span>
              <h3 className="mt-0.5 text-lg font-extrabold text-gray-900 dark:text-white">
                Trending AI Automation Templates
              </h3>
            </div>
            <span className="rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
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
                          className="rounded border border-[var(--orbit-accent-primary)]/10 bg-[var(--orbit-accent-primary)]/10 px-1.5 py-0.5 font-mono text-xs font-extrabold text-[var(--orbit-accent-primary)]"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-xs font-bold tracking-wider text-gray-400 uppercase">
                      {tpl.difficulty}
                    </span>
                  </div>
                  <h4 className="mb-2 text-sm font-extrabold text-gray-900 dark:text-white">
                    {tpl.title}
                  </h4>
                  <p className="mb-4 text-xs leading-relaxed text-gray-500 dark:text-gray-500">
                    {tpl.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast(`Deploying template: ${tpl.title}`)}
                  className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-bold text-gray-700 transition-all hover:border-[var(--orbit-accent-primary)] hover:bg-gray-50 hover:text-[var(--orbit-accent-primary)] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-[var(--orbit-accent-primary)] dark:hover:bg-gray-800"
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

  // 2. Project / Tasks
  if (selectedKey === 'project') {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
          <div>
            <span className="block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Project Velocity
            </span>
            <h3 className="mt-0.5 text-lg font-extrabold text-gray-900 dark:text-white">
              Sprint Board Tasks
            </h3>
          </div>
          <span className="rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
            Active Sprint
          </span>
        </div>
        {teamTasks.length === 0 ? (
          <TableEmptyState
            icon={<Inbox size={28} aria-hidden="true" />}
            heading="No tasks in this sprint"
            description="This sprint has no assigned tasks yet. Add tasks to start tracking your team's progress."
            actionLabel="Add Task"
            onAction={() => showToast('Add Task')}
          />
        ) : (
          <div ref={scrollRef} className="table-scroll-wrapper -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <caption className="sr-only">Sprint board team tasks list</caption>
              <thead>
                <tr className="border-gray-150 border-b font-mono text-xs font-bold tracking-wider text-gray-400 uppercase dark:border-[#1e2d3d] dark:text-gray-500">
                  <th scope="col" className="px-2 pb-3">
                    Task
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Assignee
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Priority
                  </th>
                  <th scope="col" className="px-2 pb-3 text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs text-gray-700 dark:divide-gray-800/40 dark:text-gray-300">
                {teamTasks.map((t, i) => (
                  <tr
                    key={i}
                    className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-900/10"
                  >
                    <th
                      scope="row"
                      className="text-gray-955 px-2 py-3.5 text-left font-bold dark:text-white"
                    >
                      {t.task}
                    </th>
                    <td className="px-2 py-3.5 font-semibold">{t.assignee}</td>
                    <td className="px-2 py-3.5">
                      <span
                        className={cn(
                          'rounded border px-2 py-0.5 font-mono text-xs font-bold',
                          t.priority === 'Critical' &&
                            'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400',
                          t.priority === 'High' &&
                            'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
                          t.priority === 'Medium' &&
                            'border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 text-[var(--orbit-accent-primary)]'
                        )}
                      >
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-2 py-3.5 text-right">
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 font-mono text-xs font-bold',
                          t.status === 'Completed' &&
                            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                          t.status === 'In Progress' &&
                            'bg-sky-500/10 text-sky-600 dark:text-sky-400',
                          t.status === 'Pending' &&
                            'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                        )}
                      >
                        {t.status}
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

  // 3. Analytics
  if (selectedKey === 'analytics') {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
          <div>
            <span className="block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Data Streams
            </span>
            <h3 className="mt-0.5 text-lg font-extrabold text-gray-900 dark:text-white">
              Connected Sources & Replication
            </h3>
          </div>
          <span className="rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
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
          <div ref={scrollRef} className="table-scroll-wrapper -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <caption className="sr-only">Connected data sources replication pipelines</caption>
              <thead>
                <tr className="border-gray-150 border-b font-mono text-xs font-bold tracking-wider text-gray-400 uppercase dark:border-[#1e2d3d] dark:text-gray-500">
                  <th scope="col" className="px-2 pb-3">
                    Data Source
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Type
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Replication Lag
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Total Volume
                  </th>
                  <th scope="col" className="px-2 pb-3 text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs text-gray-700 dark:divide-gray-800/40 dark:text-gray-300">
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
                    <td className="px-2 py-3.5 font-mono text-xs">{source.type}</td>
                    <td className="px-2 py-3.5 font-mono text-xs text-gray-400 dark:text-gray-500">
                      {source.lag}
                    </td>
                    <td className="px-2 py-3.5 font-mono text-xs text-gray-400 dark:text-gray-500">
                      {source.volume}
                    </td>
                    <td className="px-2 py-3.5 text-right">
                      <span
                        className={cn(
                          'rounded-full border px-2 py-0.5 font-mono text-xs font-bold',
                          source.status === 'Synced' &&
                            'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                          source.status === 'Active' &&
                            'border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400',
                          source.status === 'Degraded' &&
                            'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        )}
                      >
                        {source.status}
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

  // 4. Chatbot
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
            <span className="block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              LLM Processing Nodes
            </span>
            <h3 className="mt-0.5 text-lg font-extrabold text-gray-900 dark:text-white">
              Active Chatbot Sessions
            </h3>
          </div>
          <span className="rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
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
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{node.name}</h4>
                  <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {node.status}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Core LLM Model</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {node.model}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Live Active Chats</span>
                    <span className="font-mono font-semibold text-gray-700 dark:text-gray-300">
                      {node.sessions}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Response Time</span>
                    <span className="font-mono font-semibold text-gray-700 dark:text-gray-300">
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

  // 5. Marketing
  if (selectedKey === 'marketing') {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
          <div>
            <span className="block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Outbound Funnels
            </span>
            <h3 className="mt-0.5 text-lg font-extrabold text-gray-900 dark:text-white">
              Email Campaigns Performance
            </h3>
          </div>
          <span className="rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
            Campaign Feed
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
          <div ref={scrollRef} className="table-scroll-wrapper -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <caption className="sr-only">
                Email marketing campaigns performance statistics
              </caption>
              <thead>
                <tr className="border-gray-150 border-b font-mono text-xs font-bold tracking-wider text-gray-400 uppercase dark:border-[#1e2d3d] dark:text-gray-500">
                  <th scope="col" className="px-2 pb-3">
                    Campaign Name
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Open Rate
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Click Rate (CTR)
                  </th>
                  <th scope="col" className="px-2 pb-3">
                    Leads Generated
                  </th>
                  <th scope="col" className="px-2 pb-3 text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs text-gray-700 dark:divide-gray-800/40 dark:text-gray-300">
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
                    <td className="px-2 py-3.5 font-mono text-gray-400 dark:text-gray-500">
                      {camp.openRate}
                    </td>
                    <td className="px-2 py-3.5 font-mono text-gray-400 dark:text-gray-500">
                      {camp.clickRate}
                    </td>
                    <td className="px-2 py-3.5 font-mono text-gray-700 dark:text-gray-300">
                      {camp.leads.toLocaleString()}
                    </td>
                    <td className="px-2 py-3.5 text-right">
                      <span
                        className={cn(
                          'rounded-full border px-2 py-0.5 font-mono text-xs font-bold',
                          camp.status === 'Dispatched' &&
                            'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                          camp.status.includes('Active') &&
                            'border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400',
                          camp.status === 'Draft' &&
                            'border-gray-200 bg-gray-100 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        )}
                      >
                        {camp.status}
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

  // 6. Mobile
  if (selectedKey === 'mobile') {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] transition-colors duration-300 md:p-8 dark:border-[#1e2d3d] dark:bg-[var(--orbit-surface)] dark:shadow-none">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-[#1e2d3d]">
          <div>
            <span className="block font-mono text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              Notification Lanes
            </span>
            <h3 className="mt-0.5 text-lg font-extrabold text-gray-900 dark:text-white">
              Mobile Push Gateways
            </h3>
          </div>
          <span className="rounded-full border border-[var(--orbit-accent-primary)]/20 bg-[var(--orbit-accent-primary)]/10 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-[var(--orbit-accent-primary)] uppercase">
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
          <div ref={scrollRef} className="table-scroll-wrapper -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <caption className="sr-only">Mobile push notification gateways statistics</caption>
              <thead>
                <tr className="border-gray-150 border-b font-mono text-xs font-bold tracking-wider text-gray-400 uppercase dark:border-[#1e2d3d] dark:text-gray-500">
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
              <tbody className="divide-y divide-gray-50 text-xs text-gray-700 dark:divide-gray-800/40 dark:text-gray-300">
                {mobileGates.map((gate, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-900/10"
                  >
                    <th
                      scope="row"
                      className="text-gray-955 px-2 py-3.5 text-left font-bold dark:text-white"
                    >
                      {gate.gateway}
                    </th>
                    <td className="px-2 py-3.5 font-mono text-xs text-gray-400 dark:text-gray-500">
                      {gate.latency}
                    </td>
                    <td className="px-2 py-3.5 font-mono text-xs text-gray-400 dark:text-gray-500">
                      {gate.load}
                    </td>
                    <td className="px-2 py-3.5 text-right">
                      <span
                        className={cn(
                          'rounded-full border px-2 py-0.5 font-mono text-xs font-bold',
                          gate.status === 'Operational' &&
                            'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                          gate.status === 'Active' &&
                            'border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400'
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

