"use client";

import React, { useRef } from 'react';
import styles from '../page.module.css';
import { Truck, Navigation, Activity, Clock } from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import { useAnimateCards, useAnimateCharts } from '@/hooks/useAnimations';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const logisticsData = [
  { time: '08:00', load: 85, ideal: 80 },
  { time: '10:00', load: 92, ideal: 82 },
  { time: '12:00', load: 88, ideal: 80 },
  { time: '14:00', load: 74, ideal: 78 },
  { time: '16:00', load: 96, ideal: 85 },
  { time: '18:00', load: 82, ideal: 80 },
];

export default function LogisticsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useAnimateCards(containerRef);
  useAnimateCharts(chartRef);

  return (
    <div className={styles.dashboard} ref={containerRef}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Global Logistics Fleet</h1>
          <p className={styles.subtitle}>Transit times, vehicle utilization, and capacity.</p>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <KpiCard 
          title="Active Vehicles" 
          value={842} 
          icon={Truck} 
          colorType="primary"
          trend={2} 
          trendLabel="vehicles deployed today"
        />
        <KpiCard 
          title="Avg Delivery Time" 
          value={2.4} 
          suffix=" days"
          icon={Clock} 
          colorType="secondary"
          trend={-5} 
          trendLabel="faster than Q1"
        />
        <KpiCard 
          title="Route Efficiency" 
          value={91.2} 
          suffix="%"
          icon={Navigation} 
          colorType="warning"
        />
        <KpiCard 
          title="Fleet Health" 
          value={98} 
          suffix="%"
          icon={Activity} 
          colorType="secondary"
          trend={0.5} 
        />
      </div>

      <div className={styles.chartsGrid}>
        {/* Logistics Chart */}
        <div className={`gsap-card ${styles.chartCard} ${styles.fullWidth}`} style={{ gridColumn: '1 / -1' }} ref={chartRef}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Daily Load Capacity vs Ideal Target</h3>
            <p className={styles.chartSubtitle}>Monitoring network stress across all operating timezones.</p>
          </div>
          <div className={styles.chartContainer} style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={logisticsData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} />
                <Tooltip cursor={{stroke: 'var(--color-border)', strokeWidth: 2}} contentStyle={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-hover)' }} />
                <Line type="monotone" dataKey="load" stroke="var(--color-primary)" strokeWidth={4} dot={{ r: 4, fill: 'var(--color-primary)', strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 6 }} animationDuration={1500} />
                <Line type="monotone" dataKey="ideal" stroke="var(--color-text-tertiary)" strokeWidth={2} strokeDasharray="5 5" dot={false} animationDuration={1500} delay={300} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
