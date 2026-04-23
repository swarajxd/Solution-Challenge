import { RiskKpi, RiskIncident } from '../types/risk';
import { mockRiskKpis, mockIncidentLog } from '../data/riskData';

export interface RiskDashboardData {
  kpis: RiskKpi[];
  incidents: RiskIncident[];
}

export const getRiskDashboardData = async (): Promise<RiskDashboardData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        return reject(new Error('Global node sync disconnected.'));
      }
      resolve({
        kpis: [...mockRiskKpis],
        incidents: [...mockIncidentLog]
      });
    }, 800);
  });
};
