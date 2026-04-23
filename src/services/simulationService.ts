import { SimulationKpi, SimulationScenario } from '../types/simulation';
import { mockSimulationKpis, mockRecentSimulations } from '../data/simulationData';

export interface SimulationDashboardData {
  kpis: SimulationKpi[];
  scenarios: SimulationScenario[];
}

export const getSimulationDashboardData = async (): Promise<SimulationDashboardData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        kpis: [...mockSimulationKpis],
        scenarios: [...mockRecentSimulations]
      });
    }, 800);
  });
};
