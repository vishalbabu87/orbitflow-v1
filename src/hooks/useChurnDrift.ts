import { useState, useEffect } from 'react';
import { customerData } from '../data/mockData';

export interface CustomerAccount {
  id: number;
  name: string;
  plan: string;
  mrr: number;
  score: number; // Success rate percentage (0 - 100)
  risk: 'ACTIVE' | 'WARNING' | 'PAUSED';
  lastLogin: string;
  reason: string;
  action: string;
}

const reasonTemplates = {
  ACTIVE: [
    'Slack event -> AI Summary -> Email',
    'HubSpot webhook -> Filter -> Slack alert',
    'Notion page created -> AI translation -> Slack',
    'Daily cron -> DB fetch -> Append Sheet',
    'Stripe charge -> Email invoice via Resend',
  ],
  WARNING: [
    'Shopify webhook -> Slack (Rate limit hit 429)',
    'API connection timeout on database sink',
    'Google Sheets sync delayed (re-trying)',
    'Notion workspace API throttled by endpoint',
  ],
  PAUSED: [
    'Mailchimp auth token expired',
    'Manually deactivated by owner',
    'Linear webhook endpoint unregistered',
    'Monthly run quota limit reached',
  ],
};

export const useChurnDrift = (intervalMs = 3000) => {
  const [customers, setCustomers] = useState<CustomerAccount[]>(() =>
    customerData.map((c) => ({
      ...c,
      risk: c.risk as CustomerAccount['risk'],
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCustomers((prevCustomers) => {
        return prevCustomers.map((cust) => {
          // Paused workflows don't drift status automatically
          if (cust.risk === 'PAUSED') {
            return cust;
          }

          // Only drift active/warning status occasionally
          if (Math.random() > 0.4) {
            return cust;
          }

          // Drift success rate score (90 to 100 range)
          const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
          const newScore = Math.max(70, Math.min(100, cust.score + delta));

          // Determine status based on success rate
          let newRisk: CustomerAccount['risk'] = 'ACTIVE';
          if (newScore < 85) newRisk = 'WARNING';

          // If risk level changes or 10% chance, update the reason dynamically
          let newReason = cust.reason;
          if (newRisk !== cust.risk || Math.random() > 0.9) {
            const templates = reasonTemplates[newRisk];
            newReason = templates[Math.floor(Math.random() * templates.length)];
          }

          // Determine recommended action
          let newAction = cust.action;
          if (newRisk === 'WARNING') newAction = 'Retry';
          else newAction = 'Run Now';

          return {
            ...cust,
            score: newScore,
            risk: newRisk,
            reason: newReason,
            action: newAction,
          };
        });
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return customers;
};
