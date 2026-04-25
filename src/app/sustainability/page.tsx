"use client";

import React, { useRef } from 'react';
import styles from '../page.module.css';
import { Leaf, Wind, Sun, TreePine, Droplets } from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import { useAnimateCards, useAnimateCharts } from '@/hooks/useAnimations';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const carbonData = [
  { month: 'Jan', emitted: 400, offset: 240 },
  { month: 'Feb', emitted: 300, offset: 139 },
  { month: 'Mar', emitted: 200, offset: 980 },
  { month: 'Apr', emitted: 278, offset: 390 },
  { month: 'May', emitted: 189, offset: 480 },
  { month: 'Jun', emitted: 239, offset: 380 },
  { month: 'Jul', emitted: 349, offset: 430 },
];

export default function SustainabilityPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useAnimateCards(containerRef);
  useAnimateCharts(chartRef);

  return (
    <div className={styles.dashboard} ref={containerRef}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Sustainability Metrics</h1>
          <p className={styles.subtitle}>Tracking ESG goals and network-wide carbon offsets.</p>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <KpiCard 
          title="Carbon Footprint" 
          value={1.24} 
          suffix=" Tons"
          icon={Wind} 
          colorType="secondary"
          trend={-8.4} 
          trendLabel="YoY reduction"
        />
        <KpiCard 
          title="Renewable Energy" 
          value={34.2} 
          suffix="%"
          icon={Sun} 
          colorType="warning"
          trend={12} 
        />
        <KpiCard 
          title="Offset Impact" 
          value={842} 
          icon={TreePine} 
          colorType="secondary"
        />
        <KpiCard 
          title="Water Conservation" 
          value={14.2} 
          suffix="M Gal"
          icon={Droplets} 
          colorType="primary"
          trend={2} 
        />
      </div>

      <div className={styles.chartsGrid}>
        <div className={`gsap-card ${styles.chartCard} ${styles.fullWidth}`} style={{ gridColumn: '1 / -1' }} ref={chartRef}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Carbon Emissions vs Offsets</h3>
            <p className={styles.chartSubtitle}>Progress toward Net Zero operations across shipping and warehousing.</p>
          </div>
          <div className={styles.chartContainer} style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={carbonData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorEmit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-error)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-error)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOffset" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} />
                <Tooltip contentStyle={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-hover)' }} />
                <Area type="monotone" dataKey="emitted" stroke="var(--color-error)" strokeWidth={2} fillOpacity={1} fill="url(#colorEmit)" animationDuration={1500} />
                <Area type="monotone" dataKey="offset" stroke="var(--color-secondary)" strokeWidth={3} fillOpacity={1} fill="url(#colorOffset)" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
