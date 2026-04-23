import { SimulationKpi, SimulationScenario } from '../types/simulation';
import { Target, PlayCircle, SlidersHorizontal } from 'lucide-react';

export const mockSimulationKpis: SimulationKpi[] = [
  {
    id: 'sim-kpi-1',
    title: 'Active Simulations',
    value: 3,
    icon: PlayCircle,
    colorType: 'primary'
  },
  {
    id: 'sim-kpi-2',
    title: 'Variables Adjusted',
    value: 14,
    icon: SlidersHorizontal,
    colorType: 'secondary'
  },
  {
    id: 'sim-kpi-3',
    title: 'Max Risk Exposed',
    value: 28.4,
    suffix: '%',
    icon: Target,
    colorType: 'error'
  }
];

export const mockRecentSimulations: SimulationScenario[] = [
  { 
    id: 'SIM-902', 
    name: 'Suez Canal Blockage (14 Days)', 
    impact: '$2.4M Loss | 18d Delay', 
    status: 'COMPLETE' 
  },
  { 
    id: 'SIM-903', 
    name: 'Q4 30% Demand Spike', 
    impact: 'Inventory Depletion Risk', 
    status: 'COMPLETE' 
  },
  { 
    id: 'SIM-904', 
    name: 'Vendor Default (Asia Tech)', 
    impact: 'Pending...', 
    status: 'RUNNING' 
  },
  { 
    id: 'SIM-905', 
    name: 'Labor Strike Europe', 
    impact: 'Evaluating logistics fallback...', 
    status: 'RUNNING' 
  }
];

export interface InteractiveScenario {
  id: string;
  title: string;
  description: string;
  impact: string;
}

export const scenarios: InteractiveScenario[] = [
  {
    id: "demand-spike",
    title: "Demand Spike",
    description: "Sudden increase in customer demand",
    impact: "HIGH"
  },
  {
    id: "port-delay",
    title: "Port Delay",
    description: "Shipping delay due to port congestion",
    impact: "CRITICAL"
  },
  {
    id: "fuel-cost",
    title: "Fuel Cost Increase",
    description: "Increase in transportation cost",
    impact: "MEDIUM"
  }
];
