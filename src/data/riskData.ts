import { RiskKpi, RiskIncident } from '../types/risk';
import { AlertTriangle, ShieldAlert, CloudLightning, Activity } from 'lucide-react';

export const mockRiskKpis: RiskKpi[] = [
  {
    id: 'kpi-1',
    title: 'Critical Vulnerabilities',
    value: 3,
    icon: AlertTriangle,
    colorType: 'error',
    trend: 1,
    trendLabel: 'since yesterday'
  },
  {
    id: 'kpi-2',
    title: 'Network Resilience',
    value: 82.5,
    icon: ShieldAlert,
    colorType: 'secondary',
    suffix: '%'
  },
  {
    id: 'kpi-3',
    title: 'Weather Disruptions',
    value: 2,
    icon: CloudLightning,
    colorType: 'warning'
  },
  {
    id: 'kpi-4',
    title: 'Supplier Risk Score',
    value: 68,
    icon: Activity,
    colorType: 'warning',
    trend: -4.2,
    trendLabel: 'below optimal'
  }
];

export const mockIncidentLog: RiskIncident[] = [
  {
    id: 'INC-8891',
    severity: 'CRITICAL',
    loc: 'Singapore Port',
    impact: '48h Delay',
    action: 'Rerouting 14 vessels to secondary ports.'
  },
  {
    id: 'INC-8890',
    severity: 'WARNING',
    loc: 'Alpine Route A9',
    impact: '12h Weather Delay',
    action: 'Alerting logistics. Speeding up pre-route transit.'
  },
  {
    id: 'INC-8884',
    severity: 'CRITICAL',
    loc: 'Manufacturing Hub Shenzhen',
    impact: '14% Capacity Drop',
    action: 'Splitting Q3 POs across Vietnam and India.'
  },
  {
    id: 'INC-8882',
    severity: 'INFO',
    loc: 'Port of Los Angeles',
    impact: 'Low Labor Availability',
    action: 'Monitoring shifting timelines to alternate docks.'
  }
];
