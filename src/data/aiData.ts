import { ChatMessage, AIInsight } from '../types/ai';

export const mockInitialMessages: ChatMessage[] = [
  { 
    id: '1', 
    type: 'bot', 
    text: 'Hello! I am the Nexus Intelligence engine. I noticed potential congestion at ORD-04. How would you like to handle ship N-422?' 
  }
];

export const mockInsights: AIInsight[] = [
  {
    id: 'INS-01',
    title: 'Route Optimized',
    description: 'We rerouted 14 shipments yesterday resulting in a 12% operational efficiency gain.',
    icon: 'Zap',
    colorType: 'secondary'
  },
  {
    id: 'INS-02',
    title: 'Weather Alert Active',
    description: 'Alpine pass disruption expected for the next 48 hours. Forecast model activated.',
    icon: 'Zap',
    colorType: 'error'
  },
  {
    id: 'INS-03',
    title: 'Cost Savings Identified',
    description: 'Consolidating LTL shipments to Atlanta can save $4,500 over the next week.',
    icon: 'Zap',
    colorType: 'warning'
  }
];

export const suggestedPrompts = [
  "How to reduce delivery delays?",
  "Show high risk areas",
  "Optimize delivery routes",
  "Predict inventory shortage"
];
