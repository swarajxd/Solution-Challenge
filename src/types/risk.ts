import { KpiColorType } from './common';

export type SeverityType = 'CRITICAL' | 'WARNING' | 'INFO';

export interface RiskIncident {
  id: string;
  severity: SeverityType;
  loc: string;
  impact: string;
  action: string;
}

// We can optionally still keep RiskKpi for specialized properties if needed or export it from common KpiMetric
import { KpiMetric } from './common';
export type RiskKpi = KpiMetric;
