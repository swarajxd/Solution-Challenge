"use client";

import React, { useRef } from 'react';
import styles from '../page.module.css';
import { TrendingUp, Target, BarChart2, Briefcase } from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import { useAnimateCards, useAnimateCharts } from '@/hooks/useAnimations';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const forecastData = [
  { month: 'Jul', q3: 4000, q4_sim: 4400 },
  { month: 'Aug', q3: 4200, q4_sim: 4600 },
  { month: 'Sep', q3: 3800, q4_sim: 5500 },
  { month: 'Oct', q3: 5000, q4_sim: 6800 },
  { month: 'Nov', q3: 5200, q4_sim: 7200 },
  { month: 'Dec', q3: 6100, q4_sim: 8400 },
];

export default function ForecastingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useAnimateCards(containerRef);
  useAnimateCharts(chartRef);

  return (
    <div className={styles.dashboard} ref={containerRef}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Predictive Forecasting</h1>
          <p className={styles.subtitle}>AI probability models for upcoming quarters.</p>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <KpiCard 
          title="Predictive Accuracy" 
          value={96.4} 
          suffix="%"
          icon={Target} 
          colorType="primary"
          trend={1.2} 
        />
        <KpiCard 
          title="Q4 Demand Projection" 
          value={32} 
          prefix="+"
          suffix="%"
          icon={TrendingUp} 
          colorType="secondary"
          trend={8} 
        />
        <KpiCard 
          title="Market Volatility Index" 
          value={14.2} 
          icon={BarChart2} 
          colorType="warning"
          trend={-2.1} 
          trendLabel="stabilization"
        />
        <KpiCard 
          title="Optimal Cash Reserve" 
          value={18.5} 
          prefix="$"
          suffix="M"
          icon={Briefcase} 
          colorType="primary"
        />
      </div>

      <div className={styles.chartsGrid}>
        <div className={`gsap-card ${styles.chartCard} ${styles.fullWidth}`} style={{ gridColumn: '1 / -1' }} ref={chartRef}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Q3 Baseline vs Q4 AI Simulation</h3>
            <p className={styles.chartSubtitle}>Comparing historical trajectory against simulated demand shocks.</p>
          </div>
          <div className={styles.chartContainer} style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorQ3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-text-tertiary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-text-tertiary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorQ4" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} />
                <Tooltip contentStyle={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-hover)' }} />
                <Area type="monotone" dataKey="q3" stroke="var(--color-text-tertiary)" fillOpacity={1} fill="url(#colorQ3)" animationDuration={1500} />
                <Area type="monotone" dataKey="q4_sim" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorQ4)" animationDuration={1500} delay={400} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
