"use client";

import React, { useRef } from 'react';
import styles from '../page.module.css';
import { Route, Navigation, Timer, Leaf, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import { useAnimateCards } from '@/hooks/useAnimations';

export default function RouteOptimizationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useAnimateCards(containerRef);

  return (
    <div className={styles.dashboard} ref={containerRef}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Route Optimization</h1>
          <p className={styles.subtitle}>Chicago Regional Distribution Hub • Fleet ID: NEX-882</p>
        </div>
        <button className="gsap-card" style={{ 
          backgroundColor: 'var(--color-primary)', 
          color: 'white', 
          padding: '12px 24px', 
          borderRadius: 'var(--radius-full)', 
          fontWeight: 'bold', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          border: 'none',
          boxShadow: '0 4px 15px rgba(0,91,191,0.2)',
          cursor: 'pointer'
        }}>
          <Zap size={18} /> Optimize Route
        </button>
      </div>

      <div className={styles.kpiGrid}>
        <KpiCard 
          title="Fuel Consumption" 
          value={184.2} 
          suffix=" Gal"
          icon={Route} 
          colorType="primary"
          trend={-12.4} 
          trendLabel="vs Current"
        />
        <KpiCard 
          title="Estimated Time" 
          value={4.8} 
          suffix=" Hours"
          icon={Timer} 
          colorType="secondary"
          trend={-42} 
          trendLabel="mins reduced"
        />
        <KpiCard 
          title="Carbon Footprint" 
          value={0.82} 
          suffix=" Tons"
          icon={Leaf} 
          colorType="warning"
          trend={-15} 
          trendLabel="CO2e reduction"
        />
      </div>

      <div className={styles.chartsGrid}>
        <div className={`gsap-card ${styles.chartCard} ${styles.fullWidth}`} style={{ gridColumn: '1 / -1' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '24px' }}>Optimized Journey Breakdown</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Leg 1 */}
            <div style={{ backgroundColor: 'var(--color-surface-low)', padding: '24px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Central Hub → O'Hare Logipark</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <Navigation size={14} /> 12.4 Miles • Heavy Traffic Alert
                  </p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <span style={{ padding: '4px 12px', backgroundColor: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Express Toll</span>
                    <span style={{ padding: '4px 12px', backgroundColor: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Priority Loading</span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>09:45 AM</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>Scheduled ETA</div>
                <ChevronRight size={20} color="var(--color-text-secondary)" style={{ marginTop: '16px' }} />
              </div>
            </div>

            {/* Leg 2 */}
            <div style={{ backgroundColor: 'var(--color-surface-low)', padding: '24px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>O'Hare Logipark → Michigan Ave Hub</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <Navigation size={14} /> 8.1 Miles • Rerouted for Efficiency
                  </p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <span style={{ padding: '4px 12px', backgroundColor: 'rgba(0, 110, 44, 0.1)', color: 'var(--color-secondary)', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Low Emission Zone</span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>11:20 AM</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>Scheduled ETA</div>
                <ChevronRight size={20} color="var(--color-text-secondary)" style={{ marginTop: '16px' }} />
              </div>
            </div>
            
            {/* AI Insight Board */}
            <div style={{ backgroundColor: 'var(--color-surface-lowest)', padding: '24px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)', marginTop: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><Zap size={18} color="var(--color-primary)" /> Predictive Insight</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>Traffic patterns suggest a 22% increase in congestion on I-94 between 3:00 PM and 5:00 PM. Our model recommends shifting Leg 3 departure to 1:45 PM to save an additional 15 minutes and 1.2 gallons of fuel.</p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                 <p style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>Apply Recommendation</p>
                 <p style={{ color: 'var(--color-text-tertiary)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>Dismiss</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
