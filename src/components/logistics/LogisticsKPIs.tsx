import React from 'react';
import { Truck, Clock, Navigation, Activity } from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import styles from '@/app/page.module.css';

interface LogisticsKPIsProps {
  activeVehicles: number;
  avgDeliveryTime: number;
  routeEfficiency: number;
  fleetHealth: number;
}

export const LogisticsKPIs: React.FC<LogisticsKPIsProps> = ({
  activeVehicles,
  avgDeliveryTime,
  routeEfficiency,
  fleetHealth
}) => {
  return (
    <div className={styles.kpiGrid}>
      <KpiCard 
        title="Active Vehicles" 
        value={activeVehicles} 
        icon={Truck} 
        colorType="primary"
        trendLabel="currently deployed"
      />
      <KpiCard 
        title="Avg Delivery Time" 
        value={avgDeliveryTime} 
        suffix=" days"
        icon={Clock} 
        colorType="secondary"
        trendLabel="current fleet average"
      />
      <KpiCard 
        title="Route Efficiency" 
        value={routeEfficiency} 
        suffix="%"
        icon={Navigation} 
        colorType="warning"
        trendLabel="on-time performance"
      />
      <KpiCard 
        title="Fleet Health" 
        value={fleetHealth} 
        suffix="%"
        icon={Activity} 
        colorType="secondary"
        trendLabel="operational availability"
      />
    </div>
  );
};
