export const logTemplates = {
  WORKFLOW_TRIGGERED: {
    success: [
      'Slack event received in #leads-channel',
      'New email detected in inbox via IMAP',
      'Webhook request received on /hooks/incoming',
      'Scheduled cron trigger fired (every 5m)',
      'HubSpot contact created webhook received',
    ],
  },
  AI_PROCESSING: {
    success: [
      'AI analyzed sentiment via GPT-4',
      'AI extracted customer fields from text',
      'AI generated draft auto-response email',
      'AI translated language: ES -> EN',
      'AI summarized support ticket details',
    ],
  },
  INTEGRATION_SYNC: {
    success: [
      'Created contact card in HubSpot CRM',
      'Appended row to Google Sheets data model',
      'Dispatched email confirmation via Resend',
      'Posted success alert in Slack #ops-feed',
      'Synced task state to Notion database',
    ],
  },
  API_REQUEST: {
    info: ['GET /v2/workflows/active', 'POST /v2/executions/batch', 'GET /v2/integrations/status'],
  },
  SYNC_ERROR: {
    warning: [
      'HubSpot API rate limit warning (429)',
      'OpenAI API response latency > 2s',
      'Slack webhook timeout - retrying in 5s',
      'Mailchimp auth token refresh initiated',
    ],
  },
  SYSTEM_ALERT: {
    critical: [
      'Worker pool connection pool exhausted',
      'Execution node failed to respond',
      'Webhook delivery signature mismatch',
    ],
  },
  WORKFLOW_COMPLETED: {
    success: [
      'Workflow FlowSync-{rand5} run success (42ms)',
      'Workflow LeadIngress-{rand5} executed (112ms)',
      'Automated task complete - 1 credits consumed',
    ],
  },
};

export const regions = ['US-EAST', 'EU-WEST', 'AP-SOUTH', 'US-WEST'] as const;
