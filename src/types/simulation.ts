import { KpiColorType } from './common';

export type SimulationStatus = 'COMPLETE' | 'RUNNING' | 'FAILED' | 'PENDING';

export interface SimulationScenario {
  id: string;
  name: string;
  impact: string;
  status: SimulationStatus;
}

import { KpiMetric } from './common';
export type SimulationKpi = KpiMetric;
