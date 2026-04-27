"use client";

import React, { useRef } from 'react';
import {
  Route, Navigation, Timer, Leaf, Zap, ChevronRight,
  CheckCircle2, Loader2, Circle, MapPin, Fuel,
} from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import { useAnimateCards } from '@/hooks/useAnimations';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, BarChart, Bar,
} from 'recharts';
import {
  routeOptimizationKPIs,
  optimizedRoutes,
  fuelMetrics,
  carbonMetrics,
  carbonSummary,
  predictiveInsights,
  type RouteLeg,
} from '@/data/dashboardData';
import { useApp } from '@/context/AppContext';
import { useNexusContext } from '@/context/NexusContext';
import { useNotificationContext } from '@/context/NotificationContext';
import styles from './page.module.css';

// Icon lookup for KPI cards
const kpiIconMap: any = {
  Fuel, Timer, Leaf, MapPin,
};

// Per-leg status styling
const legStatusIcon: Record<RouteLeg['status'], React.ReactNode> = {
  'completed':   <CheckCircle2 size={20} color="var(--color-secondary)" />,
  'in-progress': <Loader2 size={20} color="var(--color-primary)" style={{ animation: 'spin 1.5s linear infinite' }} />,
  'pending':     <Circle size={20} color="var(--color-text-tertiary)" />,
};

const trafficColor: Record<RouteLeg['trafficCondition'], string> = {
  Clear:    'var(--color-secondary)',
  Moderate: 'var(--color-warning)',
  Heavy:    'var(--color-error)',
  Closed:   '#000',
};

const routeInsight = predictiveInsights.find(i => i.affectedRoute === 'ROUTE-001');
const route = optimizedRoutes[0];

export default function RouteOptimizationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { routeKpis, setRouteKpis, kpis, setKpis } = useApp() as any;
  const { addNotification } = useNotificationContext();
  const [isApplying, setIsApplying] = React.useState(false);
  const [isOptimized, setIsOptimized] = React.useState(false);
  const [recommendationDismissed, setRecommendationDismissed] = React.useState(false);

  useAnimateCards(containerRef);

  const handleApplyRecommendation = () => {
    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      // 1. Update Route KPIs to show improvement
      const updatedRouteKpis = routeKpis.map((kpi: any) => {
        if (kpi.id === 'fuel-consumption') return { ...kpi, value: 162.1, trend: -24.4 };
        if (kpi.id === 'estimated-time') return { ...kpi, value: 4.1, trend: -28.6 };
        if (kpi.id === 'carbon-footprint') return { ...kpi, value: 0.68, trend: -32.1 };
        return kpi;
      });
      setRouteKpis(updatedRouteKpis);

      // 2. Update Global Dashboard KPIs (impact on enterprise level)
      const updatedGlobalKpis = kpis.map((kpi: any) => {
        if (kpi.id === 'delivery-performance') return { ...kpi, value: 98.2, trend: 3.4 };
        if (kpi.id === 'total-shipments') return { ...kpi, value: kpi.value + 42 };
        return kpi;
      });
      setKpis(updatedGlobalKpis);
      
      // 3. Trigger Notification with correct parameters
      addNotification(
        'Route optimization applied! Estimated efficiency increased by 14.3% across the fleet.', 
        'success',
        'ai'
      );

      setIsOptimized(true);
      setRecommendationDismissed(true);
      setIsApplying(false);
    }, 1500);
  };

  return (
    <div className={styles.dashboard} ref={containerRef}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Route Optimization</h1>
          <p className={styles.subtitle}>
            {route.originHub} → {route.destinationHub} · Fleet {route.fleetId} · {route.totalMiles.toLocaleString()} mi
          </p>
        </div>
        <button 
          className={styles.reoptimizeButton}
          onClick={handleApplyRecommendation}
          disabled={isApplying}
        >
          {isApplying ? <Loader2 className="spin" size={18} /> : <Zap size={18} />}
          {isApplying ? 'Optimizing...' : 'Re-Optimize'}
        </button>
      </div>

      {/* ── KPIs from global state ── */}
      <div className={styles.kpiGrid}>
        {routeKpis.map((kpi: any) => {
          const Icon = kpiIconMap[kpi.iconName] ?? Route;
          return (
            <KpiCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
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

      {/* ── Charts Row ── */}
      <div className={styles.chartsGrid}>
        {/* Fuel: Consumed vs Optimized */}
        <div className={`gsap-card ${styles.chartCard}`}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Fuel Consumption Trend</h3>
            <p className={styles.chartSubtitle}>Monthly actual vs. optimized route fuel usage (gallons).</p>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fuelMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} />
                <Tooltip
                  contentStyle={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-hover)', fontSize: '0.85rem' }}
                />
                <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '12px' }} />
                <Line type="monotone" dataKey="consumed"  name="Actual (gal)"    stroke="var(--color-error)"     strokeWidth={2.5} dot={false} animationDuration={1500} />
                <Line type="monotone" dataKey="optimized" name="Optimized (gal)" stroke="var(--color-secondary)" strokeWidth={2.5} dot={false} strokeDasharray="5 5" animationDuration={1800} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Carbon Emissions vs Target */}
        <div className={`gsap-card ${styles.chartCard}`}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Carbon Footprint</h3>
            <p className={styles.chartSubtitle}>Emissions vs. monthly target (tons CO₂e).</p>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={carbonMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} unit="t" />
                <Tooltip
                  contentStyle={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-hover)', fontSize: '0.85rem' }}
                />
                <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '12px' }} />
                <Bar dataKey="emissions" name="Emissions (t)" fill="var(--color-warning)" radius={[4,4,0,0]} barSize={16} animationDuration={1000} />
                <Bar dataKey="target"    name="Target (t)"    fill="var(--color-primary-light)" radius={[4,4,0,0]} barSize={16} animationDuration={1200} />
                <Bar dataKey="offset"    name="Offset (t)"    fill="var(--color-secondary)" radius={[4,4,0,0]} barSize={16} animationDuration={1400} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Journey & Recommendation Row ── */}
      <div className={styles.journeyContainer}>
        <div className={styles.journeyList}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Journey Breakdown</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className={styles.tag}>{route.totalLegs} Legs</span>
              <span className={styles.tag}>{route.totalMiles} Total Miles</span>
            </div>
          </div>

          {route.legs.map((leg) => (
            <div key={leg.legNumber} className={styles.legCard}>
              <div className={styles.legInfo}>
                <div className={styles.legStepNumber} style={{
                  backgroundColor: leg.status === 'completed' ? 'var(--color-secondary)' : leg.status === 'in-progress' ? 'var(--color-primary)' : 'var(--color-surface-low)',
                  color: leg.status === 'pending' ? 'var(--color-text-tertiary)' : 'white',
                  border: leg.status === 'pending' ? '2px dashed var(--color-border)' : 'none',
                }}>
                  {leg.status === 'completed' ? <CheckCircle2 size={18} /> : leg.legNumber}
                </div>

                <div className={styles.legDetails}>
                  <h3>{leg.from} → {leg.to}</h3>
                  <div className={styles.legMeta}>
                    <Navigation size={14} />
                    <span>{leg.distanceMiles} mi</span>
                    <span style={{ color: 'var(--color-border-hover)' }}>|</span>
                    <span style={{ color: trafficColor[leg.trafficCondition], fontWeight: 700 }}>
                      {leg.trafficCondition} Traffic
                    </span>
                  </div>
                  <div className={styles.tagContainer}>
                    {leg.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                    {isOptimized && <span className={styles.tag} style={{ color: 'var(--color-secondary)', borderColor: 'var(--color-secondary)' }}>Optimized</span>}
                  </div>
                </div>
              </div>

              <div className={styles.etaContainer}>
                <div className={styles.etaLabel}>Scheduled ETA</div>
                <div className={styles.etaTime}>{leg.scheduledETA}</div>
                <div style={{ marginTop: '12px' }}>{legStatusIcon[leg.status]}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── AI Recommendation Panel ── */}
        {!recommendationDismissed && routeInsight && (
          <div className={styles.recommendationPanel}>
            <div className={styles.recommendationTitle}>
              <Zap size={24} fill="var(--color-primary)" />
              AI Route Insight
            </div>
            
            <div className={styles.recommendationDesc}>
              <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                {routeInsight.title}
              </strong>
              {routeInsight.description}
            </div>

            {routeInsight.potentialSaving && (
              <div className={styles.savingsBadge}>
                <Leaf size={14} />
                Potential Saving: {routeInsight.potentialSaving}
              </div>
            )}

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                className={styles.applyButton}
                onClick={handleApplyRecommendation}
                disabled={isApplying}
              >
                {isApplying ? <Loader2 className="spin" size={20} /> : <CheckCircle2 size={20} />}
                {isApplying ? 'Applying...' : 'Apply Optimized Route'}
              </button>
              <button 
                className={styles.dismissButton}
                onClick={() => setRecommendationDismissed(true)}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
