import { LucideIcon } from 'lucide-react';

export type KpiColorType = 'primary' | 'secondary' | 'warning' | 'error';

export interface KpiMetric {
  id: string;
  title: string;
  value: number;
  icon: LucideIcon;
  colorType: KpiColorType;
  trend?: number;
  trendLabel?: string;
  suffix?: string;
}
