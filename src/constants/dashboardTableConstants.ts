export const crmPipeline = {
  Lead: [
    { id: 'c1', company: 'Acme Corp', value: '$12,500', owner: 'Alex R.', progress: 20 },
    { id: 'c2', company: 'Initech Systems', value: '$8,200', owner: 'Sarah J.', progress: 10 },
  ],
  Qualified: [
    { id: 'c3', company: 'Northwind Traders', value: '$24,000', owner: 'Marcus W.', progress: 40 },
    { id: 'c4', company: 'Stark Industries', value: '$45,000', owner: 'Alex R.', progress: 55 },
  ],
  Proposal: [{ id: 'c5', company: 'Hooli Inc', value: '$18,500', owner: 'Sarah J.', progress: 75 }],
  Active: [
    { id: 'c6', company: 'Wayne Enterprises', value: '$62,000', owner: 'Marcus W.', progress: 90 },
  ],
  Closed: [
    { id: 'c7', company: 'Umbrella Corp', value: '$35,000', owner: 'Alex R.', progress: 100 },
  ],
};

export const workflowMonitor = [
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

export const connectedSources = [
  {
    source: 'PostgreSQL Production',
    status: 'Synced',
    type: 'Database',
    lag: '0.8s',
    volume: '1.4 TB',
  },
  {
    source: 'MongoDB User Cloud',
    status: 'Synced',
    type: 'Database',
    lag: '1.2s',
    volume: '840 GB',
  },
  {
    source: 'Salesforce CRM Feed',
    status: 'Active',
    type: 'API Feed',
    lag: '0.1s',
    volume: '120 GB',
  },
  {
    source: 'Google Analytics Stream',
    status: 'Degraded',
    type: 'Web Stream',
    lag: '8.4s',
    volume: '1.8 TB',
  },
];

export const emailCampaigns = [
  {
    campaign: 'Q2 Product Launch',
    status: 'Dispatched',
    openRate: '34.2%',
    clickRate: '4.8%',
    leads: 284,
  },
  {
    campaign: 'Welcome Sequence v2',
    status: 'Active (Drip)',
    openRate: '68.4%',
    clickRate: '12.8%',
    leads: 1240,
  },
  {
    campaign: 'Re-engagement Segment',
    status: 'Active (Drip)',
    openRate: '22.1%',
    clickRate: '2.1%',
    leads: 58,
  },
  { campaign: 'Holiday Special Promo', status: 'Draft', openRate: '--', clickRate: '--', leads: 0 },
];

export const mobileGates = [
  {
    gateway: 'iOS APNS Production Node',
    status: 'Operational',
    latency: '24ms',
    load: '14,200/min',
  },
  {
    gateway: 'Google FCM Push Service',
    status: 'Operational',
    latency: '18ms',
    load: '18,500/min',
  },
  { gateway: 'OTA App Sync Server', status: 'Active', latency: '42ms', load: '820/min' },
  { gateway: 'Crashlytics Sync Relay', status: 'Active', latency: '12ms', load: '120/min' },
];

export const teamTasks = [
  {
    task: 'Configure Salesforce webhooks',
    assignee: 'Sarah J.',
    priority: 'High',
    status: 'In Progress',
  },
  {
    task: 'Fix rate limit headers for GitHub API',
    assignee: 'Marcus W.',
    priority: 'Medium',
    status: 'Completed',
  },
  {
    task: 'Audit authentication tokens scope',
    assignee: 'Alex R.',
    priority: 'Critical',
    status: 'Pending',
  },
];
