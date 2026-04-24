"use client";

import React, { useRef } from 'react';
import styles from '../page.module.css';
import { useAnimateCards, useAnimateCharts, useAnimateTables } from '@/hooks/useAnimations';
import { useLogistics } from '@/hooks/useLogistics';
import { LogisticsKPIs } from '@/components/logistics/LogisticsKPIs';
import { LogisticsTable } from '@/components/logistics/LogisticsTable';
import { LogisticsChart } from '@/components/logistics/LogisticsChart';

export default function LogisticsPage() {
  const { shipments, kpis, simulateDelay, resolveDelay } = useLogistics();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useAnimateCards(containerRef);
  useAnimateCharts(chartRef);
  useAnimateTables(tableRef, '.gsap-tr');

  return (
    <div className={styles.dashboard} ref={containerRef}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Global Logistics Fleet</h1>
          <p className={styles.subtitle}>Real-time transit tracking, vehicle utilization, and capacity monitoring.</p>
        </div>
      </div>

      <LogisticsKPIs 
        activeVehicles={kpis.activeVehicles}
        avgDeliveryTime={kpis.avgDeliveryTime}
        routeEfficiency={kpis.routeEfficiency}
        fleetHealth={kpis.fleetHealth}
      />

      <div className={styles.chartsGrid}>
        <LogisticsChart 
          shipments={shipments} 
          chartRef={chartRef}
        />
        
        <div style={{ gridColumn: '1 / -1' }}>
          <LogisticsTable 
            shipments={shipments}
            onSimulateDelay={simulateDelay}
            onResolveDelay={resolveDelay}
            tableRef={tableRef}
          />
        </div>
      </div>
    </div>
  );
}
