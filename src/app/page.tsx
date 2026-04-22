"use client";

import React, { useRef } from 'react';
import styles from './page.module.css';
import { Package, DollarSign, Clock, AlertOctagon } from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import { useAnimateCards, useAnimateCharts } from '@/hooks/useAnimations';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const demandData = [
  { name: 'May', actual: 4000, predicted: 2400 },
  { name: 'Jun', actual: 3000, predicted: 1398 },
  { name: 'Jul', actual: 2000, predicted: 9800 },
  { name: 'Aug', actual: 2780, predicted: 3908 },
  { name: 'Sep', actual: 1890, predicted: 4800 },
  { name: 'Oct', actual: 2390, predicted: 3800 },
  { name: 'Nov', actual: 3490, predicted: 4300 },
];

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef1 = useRef<HTMLDivElement>(null);
  const chartRef2 = useRef<HTMLDivElement>(null);

  useAnimateCards(containerRef);
  useAnimateCharts(chartRef1);
  useAnimateCharts(chartRef2);

  return (
    <div className={styles.dashboard} ref={containerRef}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Operational Overview</h1>
          <p className={styles.subtitle}>Intelligence-driven insights for Nexus Supply hub.</p>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <KpiCard 
          title="Total Shipments" 
          value={12842} 
          icon={Package} 
          colorType="primary"
          trend={14.2} 
          trendLabel="from last month"
          chartData={[40, 60, 55, 80, 65, 90, 100]}
        />
        <KpiCard 
          title="Inventory Value" 
          value={4.2} 
          prefix="$"
          suffix="M"
          icon={DollarSign} 
          colorType="secondary"
          trend={3.1} 
          trendLabel="healthy stock"
          chartData={[70, 65, 80, 75, 85, 60, 70]}
        />
        <KpiCard 
          title="Delivery Performance" 
          value={94.8} 
          suffix="%"
          icon={Clock} 
          colorType="warning"
          trend={-0.4} 
          trendLabel="delay risk"
          chartData={[95, 92, 90, 96, 93, 91, 95]}
        />
        <KpiCard 
          title="Risk Level" 
          value={3} 
          prefix="Level "
          icon={AlertOctagon} 
          colorType="error"
          chartData={[30, 20, 50, 80, 70, 90, 85]}
        />
      </div>

      <div className={styles.chartsGrid}>
        {/* Demand Forecasting Chart */}
        <div className={`gsap-card ${styles.chartCard}`} ref={chartRef1}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Demand Forecasting</h3>
            <p className={styles.chartSubtitle}>Projected market needs for Q3/Q4 across all categories.</p>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px solid var(--color-border)', 
                    boxShadow: 'var(--shadow-hover)' 
                  }} 
                />
                <Area type="monotone" dataKey="actual" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" animationDuration={1500} />
                <Area type="monotone" dataKey="predicted" stroke="var(--color-primary-light)" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0} animationDuration={1500} delay={300} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Warehouse Utilization */}
        <div className={`gsap-card ${styles.chartCard}`} ref={chartRef2}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Warehouse Utilization</h3>
            <p className={styles.chartSubtitle}>Top region loads.</p>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} width={50} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="actual" fill="var(--color-primary)" radius={[0, 4, 4, 0]} animationDuration={1000} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
