import React from 'react';

export interface KpiItem {
  name: string;
  value: string | number;
  trend: string;
  state: string;
  suffix: string;
  sparkline?: number[];
}

export interface ChartDataItem {
  label: string;
  value: number;
}

export interface ListItem {
  message: string;
  time: string;
  state: string;
}

export interface ActivityItem {
  message: string;
  time: string;
  state: string;
}

export interface PresetData {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: string | number }>;
  subtitle: string;
  kpis: KpiItem[];
  chartData: ChartDataItem[];
  chartLabel: string;
  listTitle: string;
  listItems: ActivityItem[];
  diagnosticMsg: string;
}

export type TimeFilter = 'Today' | '7 Days' | '30 Days' | '90 Days';

export type PresetKey =
  | 'automation'
  | 'chatbot'
  | 'crm'
  | 'analytics'
  | 'mobile'
  | 'project'
  | 'marketing';

export interface AssistantMessage {
  sender: 'assistant' | 'user';
  text: string;
}

export interface SessionUser {
  name: string;
  email: string;
  role: string;
}

export interface TeamActivityItem {
  user: string;
  action: string;
  time: string;
  avatar: string;
}

export interface IntegrationItem {
  name: string;
  desc: string;
  connected: boolean;
  color: string;
}

export interface AlertItem {
  title: string;
  desc: string;
  time: string;
  type: 'info' | 'warning' | 'error';
}
