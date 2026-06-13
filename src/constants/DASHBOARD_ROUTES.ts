import {
  LayoutDashboard,
  BarChart2,
  Activity,
  Zap,
  DollarSign,
  Code,
  CreditCard,
  Settings2,
  HelpCircle,
} from 'lucide-react';
import React from 'react';

export interface DashboardMenuItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string; size?: string | number }>;
  external?: boolean;
}

/**
 * MAIN nav items — appear in the primary nav section of the sidebar
 * Order per design plan Section 4:
 *   Dashboard → Analytics → Executions → Integrations → Transactions → Invoices → Developers
 */
export const DASHBOARD_MENU_ITEMS: DashboardMenuItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Analytics', icon: BarChart2, path: '/analytics' },
  { name: 'Executions', icon: Activity, path: '/executions' },
  { name: 'Integrations', icon: Zap, path: '/integrations' },
  { name: 'Transactions', icon: DollarSign, path: '/transactions' },
  { name: 'Invoices', icon: CreditCard, path: '/invoices' },
  { name: 'Developers', icon: Code, path: '/developers' },
];

/**
 * BOTTOM nav items — always pinned above the user zone in the sidebar
 * Per design plan Section 4: Settings + Help & Docs separated by a divider
 */
export const DASHBOARD_BOTTOM_ITEMS: DashboardMenuItem[] = [
  { name: 'Settings', icon: Settings2, path: '/settings' },
  { name: 'Help & Docs', icon: HelpCircle, path: '/help' },
];

export const DASHBOARD_PATHNAMES: string[] = [
  '/dashboard',
  '/analytics',
  '/executions',
  '/integrations',
  '/transactions',
  '/invoices',
  '/developers',
  '/settings',
  '/help',
];
