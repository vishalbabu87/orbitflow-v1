export type TimeFilter = 'Today' | '7 Days' | '30 Days' | '90 Days';

export type PresetKey =
  | 'automation'
  | 'chatbot'
  | 'crm'
  | 'marketing'
  | 'analytics'
  | 'project'
  | 'mobile';

export interface AssistantMessage {
  sender: 'assistant' | 'user';
  text: string;
}

export interface SessionUser {
  name: string;
  email: string;
  role: string;
}
