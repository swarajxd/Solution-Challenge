/**
 * dashboardData.ts
 * Centralized mock data for the Dashboard, Warehouse, and Route Optimization modules.
 * All data is structured and typed for easy future integration with a live backend.
 */

// ─────────────────────────────────────────────
// SHARED TYPES
// ─────────────────────────────────────────────

export type NodeStatus = 'active' | 'warning' | 'critical' | 'idle';
export type VehicleType = 'Semi-Trailer' | 'Cargo Van' | 'Refrigerator Truck' | 'Flatbed';
export type LegStatus = 'completed' | 'in-progress' | 'pending';

// ─────────────────────────────────────────────
// DASHBOARD KPIs
// ─────────────────────────────────────────────

export interface DashboardKPI {
  id: string;
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  colorType: 'primary' | 'secondary' | 'warning' | 'error';
  trend: number;
  trendLabel: string;
  chartData: number[]; // mini-bar percentages (0–100)
  iconName: string;    // lucide icon name string — resolved in the component
}

export const dashboardKPIs: DashboardKPI[] = [
  {
    id: 'total-shipments',
    title: 'Total Shipments',
    value: 12842,
    colorType: 'primary',
    trend: 14.2,
    trendLabel: 'vs last month',
    chartData: [40, 55, 60, 75, 65, 88, 100],
    iconName: 'Package',
  },
  {
    id: 'inventory-value',
    title: 'Inventory Value',
    value: 4.2,
    prefix: '$',
    suffix: 'M',
    colorType: 'secondary',
    trend: 3.1,
    trendLabel: 'healthy stock',
    chartData: [70, 65, 80, 75, 85, 60, 70],
    iconName: 'DollarSign',
  },
  {
    id: 'delivery-performance',
    title: 'Delivery Performance',
    value: 94.8,
    suffix: '%',
    colorType: 'warning',
    trend: -0.4,
    trendLabel: 'delay risk',
    chartData: [95, 92, 90, 96, 93, 91, 95],
    iconName: 'Clock',
  },
  {
    id: 'risk-level',
    title: 'Risk Level',
    value: 3,
    prefix: 'Level ',
    colorType: 'error',
    trend: 0,
    trendLabel: 'unchanged',
    chartData: [30, 20, 50, 80, 70, 90, 85],
    iconName: 'AlertOctagon',
  },
];

// ─────────────────────────────────────────────
// DEMAND FORECASTING (Dashboard chart data)
// ─────────────────────────────────────────────

export interface DemandDataPoint {
  name: string;
  actual: number;
  predicted: number;
}

export const demandForecastingData: DemandDataPoint[] = [
  { name: 'May',  actual: 4200, predicted: 3900 },
  { name: 'Jun',  actual: 3800, predicted: 4100 },
  { name: 'Jul',  actual: 5100, predicted: 4800 },
  { name: 'Aug',  actual: 4700, predicted: 5000 },
  { name: 'Sep',  actual: 5600, predicted: 5300 },
  { name: 'Oct',  actual: 6100, predicted: 5900 },
  { name: 'Nov',  actual: 6800, predicted: 7200 },
];

// ─────────────────────────────────────────────
// DELIVERY METRICS
// ─────────────────────────────────────────────

export interface DeliveryMetric {
  month: string;
  onTime: number;      // percentage
  delayed: number;     // percentage
  returned: number;    // percentage
}

export const deliveryMetrics: DeliveryMetric[] = [
  { month: 'May', onTime: 93, delayed: 5,  returned: 2 },
  { month: 'Jun', onTime: 90, delayed: 7,  returned: 3 },
  { month: 'Jul', onTime: 95, delayed: 3,  returned: 2 },
  { month: 'Aug', onTime: 88, delayed: 9,  returned: 3 },
  { month: 'Sep', onTime: 96, delayed: 2,  returned: 2 },
  { month: 'Oct', onTime: 92, delayed: 6,  returned: 2 },
  { month: 'Nov', onTime: 94, delayed: 4,  returned: 2 },
];

// ─────────────────────────────────────────────
// WAREHOUSE NODES
// ─────────────────────────────────────────────

export interface WarehouseNode {
  id: string;
  name: string;
  city: string;
  region: string;
  type: 'Distribution Center' | 'Cold Storage' | 'Cross-Dock' | 'Last-Mile Hub';
  status: NodeStatus;
  capacity: number;       // total units
  utilized: number;       // units currently in use
  utilizationPct: number; // 0–100
  riskScore: number;      // 0–100
  activeFleets: number;
  pin: {
    top: string;
    left: string;
  };
  alert?: string;
  iconName: 'Package' | 'Truck' | 'AlertTriangle' | 'Warehouse';
}

export const warehouseNodes: WarehouseNode[] = [
  {
    id: 'ORD-04',
    name: 'ORD-04 Central Hub',
    city: 'Chicago',
    region: 'IL',
    type: 'Distribution Center',
    status: 'warning',
    capacity: 50000,
    utilized: 44500,
    utilizationPct: 89,
    riskScore: 74,
    activeFleets: 14,
    pin: { top: '38%', left: '22%' },
    alert: 'Congestion detected — 89% capacity. Reroute Shipment N-422 to save 1.2 hrs.',
    iconName: 'Package',
  },
  {
    id: 'LAX-09',
    name: 'LAX-09 West Hub',
    city: 'Los Angeles',
    region: 'CA',
    type: 'Cross-Dock',
    status: 'active',
    capacity: 38000,
    utilized: 22000,
    utilizationPct: 58,
    riskScore: 21,
    activeFleets: 9,
    pin: { top: '52%', left: '8%' },
    iconName: 'Package',
  },
  {
    id: 'JFK-02',
    name: 'JFK-02 East Hub',
    city: 'Jamaica',
    region: 'NY',
    type: 'Cold Storage',
    status: 'critical',
    capacity: 20000,
    utilized: 19400,
    utilizationPct: 97,
    riskScore: 92,
    activeFleets: 5,
    pin: { top: '32%', left: '72%' },
    alert: 'Critical: Cold storage near capacity (97%). Refrigeration unit B2 offline.',
    iconName: 'AlertTriangle',
  },
  {
    id: 'DFW-03',
    name: 'DFW-03 South Hub',
    city: 'Dallas',
    region: 'TX',
    type: 'Distribution Center',
    status: 'active',
    capacity: 45000,
    utilized: 28000,
    utilizationPct: 62,
    riskScore: 18,
    activeFleets: 11,
    pin: { top: '60%', left: '38%' },
    iconName: 'Package',
  },
  {
    id: 'SEA-01',
    name: 'SEA-01 Northwest',
    city: 'Seattle',
    region: 'WA',
    type: 'Last-Mile Hub',
    status: 'idle',
    capacity: 15000,
    utilized: 4200,
    utilizationPct: 28,
    riskScore: 9,
    activeFleets: 3,
    pin: { top: '25%', left: '6%' },
    iconName: 'Package',
  },
];

// Active fleet data for the warehouse map panel
export interface FleetVehicle {
  id: string;
  name: string;
  vehicleType: VehicleType;
  origin: string;
  destination: string;
  status: 'En Route' | 'Loading' | 'Idle' | 'Delayed';
  eta: string;
  progress: number; // 0–100
}

export const activeFleets: FleetVehicle[] = [
  {
    id: 'NEX-721',
    name: 'Fleet NEX-721',
    vehicleType: 'Semi-Trailer',
    origin: 'ORD-04',
    destination: 'LAX-09',
    status: 'En Route',
    eta: '14h 30m',
    progress: 42,
  },
  {
    id: 'NEX-882',
    name: 'Fleet NEX-882',
    vehicleType: 'Refrigerator Truck',
    origin: 'JFK-02',
    destination: 'ORD-04',
    status: 'Delayed',
    eta: '3h 15m',
    progress: 67,
  },
  {
    id: 'NEX-554',
    name: 'Fleet NEX-554',
    vehicleType: 'Cargo Van',
    origin: 'DFW-03',
    destination: 'SEA-01',
    status: 'En Route',
    eta: '22h 00m',
    progress: 15,
  },
];

// ─────────────────────────────────────────────
// ROUTE DATA
// ─────────────────────────────────────────────

export interface RouteLeg {
  legNumber: number;
  from: string;
  to: string;
  distanceMiles: number;
  trafficCondition: 'Clear' | 'Moderate' | 'Heavy' | 'Closed';
  scheduledETA: string;
  tags: string[];
  status: LegStatus;
}

export interface OptimizedRoute {
  id: string;
  fleetId: string;
  originHub: string;
  destinationHub: string;
  totalMiles: number;
  totalLegs: number;
  legs: RouteLeg[];
  svgPath: string;             // SVG path data for map overlay
  svgPathWarning?: string;     // secondary warning path
}

export const optimizedRoutes: OptimizedRoute[] = [
  {
    id: 'ROUTE-001',
    fleetId: 'NEX-882',
    originHub: 'ORD-04 Central Hub',
    destinationHub: 'LAX-09 West Hub',
    totalMiles: 2015,
    totalLegs: 3,
    svgPath: 'M 200 300 Q 400 150 600 350 T 900 400',
    svgPathWarning: 'M 600 350 L 750 200',
    legs: [
      {
        legNumber: 1,
        from: "Central Hub (ORD-04)",
        to: "O'Hare Logipark",
        distanceMiles: 12.4,
        trafficCondition: 'Heavy',
        scheduledETA: '09:45 AM',
        tags: ['Express Toll', 'Priority Loading'],
        status: 'completed',
      },
      {
        legNumber: 2,
        from: "O'Hare Logipark",
        to: 'Michigan Ave Hub',
        distanceMiles: 8.1,
        trafficCondition: 'Moderate',
        scheduledETA: '11:20 AM',
        tags: ['Low Emission Zone'],
        status: 'in-progress',
      },
      {
        legNumber: 3,
        from: 'Michigan Ave Hub',
        to: 'I-94 Interchange',
        distanceMiles: 24.7,
        trafficCondition: 'Clear',
        scheduledETA: '01:45 PM',
        tags: ['Highway', 'Fuel Stop'],
        status: 'pending',
      },
    ],
  },
];

// ─────────────────────────────────────────────
// FUEL METRICS
// ─────────────────────────────────────────────

export interface FuelMetric {
  month: string;
  consumed: number;  // gallons
  optimized: number; // gallons (what it would be with optimization)
  cost: number;      // USD
}

export const fuelMetrics: FuelMetric[] = [
  { month: 'May', consumed: 220, optimized: 194, cost: 880 },
  { month: 'Jun', consumed: 245, optimized: 208, cost: 980 },
  { month: 'Jul', consumed: 198, optimized: 175, cost: 792 },
  { month: 'Aug', consumed: 267, optimized: 231, cost: 1068 },
  { month: 'Sep', consumed: 230, optimized: 198, cost: 920 },
  { month: 'Oct', consumed: 215, optimized: 187, cost: 860 },
  { month: 'Nov', consumed: 184, optimized: 162, cost: 736 },
];

export interface RouteKPI {
  id: string;
  title: string;
  value: number;
  suffix: string;
  colorType: 'primary' | 'secondary' | 'warning' | 'error';
  trend: number;
  trendLabel: string;
  chartData: number[];
  iconName: string;
}

export const routeOptimizationKPIs: RouteKPI[] = [
  {
    id: 'fuel-consumption',
    title: 'Fuel Consumption',
    value: 184.2,
    suffix: ' Gal',
    colorType: 'primary',
    trend: -12.4,
    trendLabel: 'vs current route',
    chartData: [90, 85, 80, 75, 72, 68, 65],
    iconName: 'Fuel',
  },
  {
    id: 'estimated-time',
    title: 'Estimated Time',
    value: 4.8,
    suffix: ' Hrs',
    colorType: 'secondary',
    trend: -14.3,
    trendLabel: '42 mins reduced',
    chartData: [70, 68, 65, 60, 58, 55, 52],
    iconName: 'Timer',
  },
  {
    id: 'carbon-footprint',
    title: 'Carbon Footprint',
    value: 0.82,
    suffix: ' Tons CO₂e',
    colorType: 'warning',
    trend: -15,
    trendLabel: 'CO₂e reduction',
    chartData: [95, 90, 85, 80, 76, 72, 68],
    iconName: 'Leaf',
  },
  {
    id: 'delivery-stops',
    title: 'Delivery Stops',
    value: 7,
    suffix: ' Stops',
    colorType: 'error',
    trend: -2,
    trendLabel: 'stops eliminated',
    chartData: [55, 60, 58, 50, 48, 45, 43],
    iconName: 'MapPin',
  },
];

// ─────────────────────────────────────────────
// CARBON METRICS
// ─────────────────────────────────────────────

export interface CarbonMetric {
  month: string;
  emissions: number;       // tons CO₂e
  target: number;          // target tons CO₂e
  offset: number;          // tons CO₂e offset
}

export const carbonMetrics: CarbonMetric[] = [
  { month: 'May', emissions: 1.20, target: 1.10, offset: 0.15 },
  { month: 'Jun', emissions: 1.35, target: 1.10, offset: 0.18 },
  { month: 'Jul', emissions: 1.10, target: 1.05, offset: 0.20 },
  { month: 'Aug', emissions: 1.42, target: 1.05, offset: 0.22 },
  { month: 'Sep', emissions: 1.15, target: 1.00, offset: 0.25 },
  { month: 'Oct', emissions: 0.98, target: 1.00, offset: 0.28 },
  { month: 'Nov', emissions: 0.82, target: 0.95, offset: 0.30 },
];

// Summary carbon stats for KPI display
export const carbonSummary = {
  totalEmissionsThisMonth: 0.82,
  totalReductionPct: 15,
  offsetAchieved: 0.30,
  netEmissions: 0.52,
  monthlyGoal: 0.95,
  annualReductionTarget: 20, // percent
};

// ─────────────────────────────────────────────
// AI PREDICTIVE INSIGHTS
// ─────────────────────────────────────────────

export interface PredictiveInsight {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  affectedNode?: string;
  affectedRoute?: string;
  potentialSaving?: string;
  timestamp: string;
}

export const predictiveInsights: PredictiveInsight[] = [
  {
    id: 'INS-001',
    severity: 'warning',
    title: 'Congestion Risk at ORD-04',
    description: 'Congestion alert at ORD-04. Recommend rerouting Shipment N-422 to secondary hub to save 1.2 hours and 3.4 gallons of fuel.',
    affectedNode: 'ORD-04',
    potentialSaving: '1.2 hrs, $48 fuel cost',
    timestamp: '09:12 AM',
  },
  {
    id: 'INS-002',
    severity: 'critical',
    title: 'I-94 Traffic Surge Predicted',
    description: 'Traffic patterns suggest a 22% increase in congestion on I-94 between 3:00 PM and 5:00 PM. Shift Leg 3 departure to 1:45 PM to save 15 minutes and 1.2 gallons of fuel.',
    affectedRoute: 'ROUTE-001',
    potentialSaving: '15 mins, 1.2 gal',
    timestamp: '09:45 AM',
  },
  {
    id: 'INS-003',
    severity: 'info',
    title: 'JFK-02 Capacity Approaching Limit',
    description: 'JFK-02 Cold Storage is at 97% capacity. Proactively redistribute 2,400 units to ORD-04 before peak inbound window at 2:00 PM.',
    affectedNode: 'JFK-02',
    potentialSaving: 'Prevent stockout risk',
    timestamp: '10:00 AM',
  },
];
