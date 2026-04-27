"use client";

import React, { useRef } from 'react';
import styles from './page.module.css';
import { Package, DollarSign, Clock, AlertOctagon, Zap } from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import { useAnimateCards, useAnimateCharts } from '@/hooks/useAnimations';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import {
  dashboardKPIs,
  demandForecastingData,
  deliveryMetrics,
  predictiveInsights,
  type PredictiveInsight,
} from '@/data/dashboardData';
import { useApp } from '@/context/AppContext';

// Map icon name strings → actual Lucide components
const iconMap: any = {
  Package,
  DollarSign,
  Clock,
  AlertOctagon,
};

const severityStyle: Record<PredictiveInsight['severity'], React.CSSProperties> = {
  info: { borderLeft: '4px solid var(--color-primary)' },
  warning: { borderLeft: '4px solid var(--color-warning)' },
  critical: { borderLeft: '4px solid var(--color-error)' },
};

const severityBadge: Record<PredictiveInsight['severity'], React.CSSProperties> = {
  info: { background: 'rgba(0,91,191,0.1)', color: 'var(--color-primary)' },
  warning: { background: 'rgba(121,89,0,0.1)', color: 'var(--color-warning)' },
  critical: { background: 'rgba(186,26,26,0.1)', color: 'var(--color-error)' },
};

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef1 = useRef<HTMLDivElement>(null);
  const chartRef2 = useRef<HTMLDivElement>(null);
  const { kpis, insights } = useApp() as any;

  useAnimateCards(containerRef);
  useAnimateCharts(chartRef1);
  useAnimateCharts(chartRef2);

  return (
    <div className={styles.dashboard} ref={containerRef}>
      {/* ── Dashboard Hero Header ── */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badgeRow}>
            <div className={styles.liveBadge}>
              <div className={styles.pulseDot} />
              <span>LIVE SYSTEM TRAFFIC</span>
            </div>
            <div className={styles.aiBadge}>
              <Zap size={10} fill="currentColor" />
              <span>AI PREDICTIVE ENGINE ACTIVE</span>
            </div>
          </div>
          <h1 className={styles.title}>Network Operations Command</h1>
          <p className={styles.subtitle}>
            Intelligence-driven insights for the Nexus global logistics hub.
          </p>
        </div>
        <div className={styles.statusGroup}>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Connectivity</span>
            <span className={styles.statusValue} style={{ color: 'var(--color-secondary)' }}>Stable</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Last Optimized</span>
            <span className={styles.statusValue} style={{ color: 'var(--color-primary)' }}>Just Now</span>
          </div>
        </div>
      </div>

      {/* ── KPI Grid (from global state) ── */}
      <div className={styles.kpiGrid}>
        {kpis.map((kpi: any) => {
          const Icon = iconMap[kpi.iconName] ?? Package;
          return (
            <KpiCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              prefix={kpi.prefix}
              suffix={kpi.suffix}
              icon={Icon}
              colorType={kpi.colorType}
              trend={kpi.trend}
              trendLabel={kpi.trendLabel}
              chartData={kpi.chartData}
            />
          );
        })}
      </div>

      {/* ── Charts Grid ── */}
      <div className={styles.chartsGrid}>
        {/* Demand Forecasting */}
        <div className={`gsap-card ${styles.chartCard}`} ref={chartRef1}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Demand Forecasting</h3>
            <p className={styles.chartSubtitle}>Actual vs. AI-predicted market demand across Q3/Q4.</p>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demandForecastingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-hover)',
                    fontSize: '0.85rem',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '12px' }} />
                <Area type="monotone" dataKey="actual" name="Actual" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#gradActual)" animationDuration={1500} />
                <Area type="monotone" dataKey="predicted" name="Predicted" stroke="var(--color-secondary)" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#gradPredicted)" animationDuration={1800} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Delivery Metrics Stacked Bar */}
        <div className={`gsap-card ${styles.chartCard}`} ref={chartRef2}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Delivery Performance</h3>
            <p className={styles.chartSubtitle}>On-time vs delayed vs returned, monthly.</p>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryMetrics} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} unit="%" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-hover)',
                    fontSize: '0.85rem',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '12px' }} />
                <Bar dataKey="onTime" name="On-Time" stackId="a" fill="var(--color-secondary)" radius={[0, 0, 0, 0]} barSize={20} animationDuration={1000} />
                <Bar dataKey="delayed" name="Delayed" stackId="a" fill="var(--color-warning)" barSize={20} animationDuration={1200} />
                <Bar dataKey="returned" name="Returned" stackId="a" fill="var(--color-error)" radius={[4, 4, 0, 0]} barSize={20} animationDuration={1400} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── AI Predictive Insights ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Zap size={18} color="var(--color-primary)" />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Predictive Insights</h2>
          <span style={{
            fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px',
            background: 'rgba(0,91,191,0.1)', color: 'var(--color-primary)',
            borderRadius: 'var(--radius-full)',
          }}>
            {insights.length} Active
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {insights.map((insight: any) => (
            <div
              key={insight.id}
              className="gsap-card"
              style={{
                background: 'var(--color-surface-card)',
                borderRadius: 'var(--radius-md)',
                padding: '20px 24px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
                ...severityStyle[insight.severity as keyof typeof severityStyle],
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{insight.title}</span>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px',
                      borderRadius: 'var(--radius-full)', textTransform: 'uppercase',
                      ...severityBadge[insight.severity as keyof typeof severityBadge],
                    }}>
                      {insight.severity}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    {insight.description}
                  </p>
                  {insight.potentialSaving && (
                    <p style={{ marginTop: '8px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
                      💡 Potential saving: {insight.potentialSaving}
                    </p>
                  )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginBottom: '8px' }}>{insight.timestamp}</div>
                  <button style={{
                    fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)',
                    background: 'rgba(0,91,191,0.08)', border: 'none', borderRadius: 'var(--radius-full)',
                    padding: '6px 14px', cursor: 'pointer',
                  }}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
