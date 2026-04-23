export type MessageRole = 'user' | 'bot';

export interface AIRecommendation {
  title: string;
  description: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  actionId: string;
  isApplied?: boolean;
}

export interface ChatMessage {
  id: string;
  type: MessageRole;
  text: string;
  recommendation?: AIRecommendation;
}

export type InsightColor = 'primary' | 'secondary' | 'error' | 'warning';
export type InsightIcon = 'Zap' | 'AlertTriangle' | 'Target'; 

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  icon: InsightIcon;
  colorType: InsightColor;
}

export type AIAlarm = {
  id: string;
  type: string;
  timestamp: number;
};
