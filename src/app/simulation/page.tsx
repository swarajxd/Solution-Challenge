"use client";

import React, { useRef } from 'react';
import styles from '../page.module.css';
import { PlayCircle, SlidersHorizontal, ArrowRightCircle, Target } from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import { useAnimateCards, useAnimateTables } from '@/hooks/useAnimations';

export default function SimulationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useAnimateCards(containerRef);
  useAnimateTables(tableRef, '.gsap-tr');

  return (
    <div className={styles.dashboard} ref={containerRef}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Scenario Simulation</h1>
          <p className={styles.subtitle}>Test supply chain resilience against custom hypotheticals.</p>
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
          <PlayCircle size={18} /> New Scenario
        </button>
      </div>

      <div className={styles.kpiGrid}>
        <KpiCard 
          title="Active Simulations" 
          value={3} 
          icon={PlayCircle} 
          colorType="primary"
        />
        <KpiCard 
          title="Variables Adjusted" 
          value={14} 
          icon={SlidersHorizontal} 
          colorType="secondary"
        />
        <KpiCard 
          title="Max Risk Exposed" 
          value={28.4} 
          suffix="%"
          icon={Target} 
          colorType="error"
        />
      </div>

      <div className={styles.chartsGrid}>
        <div className={`gsap-card ${styles.chartCard} ${styles.fullWidth}`} style={{ gridColumn: '1 / -1' }} ref={tableRef}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Recent Simulations</h3>
            <p className={styles.chartSubtitle}>Results from hypothetical stress tests.</p>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-tertiary)' }}>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Simulation ID</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Scenario</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Impact Result</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Report</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'SIM-902', name: 'Suez Canal Blockage (14 Days)', impact: '$2.4M Loss | 18d Delay', status: 'COMPLETE' },
                  { id: 'SIM-903', name: 'Q4 30% Demand Spike', impact: 'Inventory Depletion Risk', status: 'COMPLETE' },
                  { id: 'SIM-904', name: 'Vendor Default (Asia Tech)', impact: 'Pending...', status: 'RUNNING' },
                ].map((item, i) => (
                  <tr key={i} className="gsap-tr" style={{ borderBottom: '1px solid var(--color-surface-low)' }}>
                    <td style={{ padding: '16px 8px', fontWeight: 600 }}>{item.id}</td>
                    <td style={{ padding: '16px 8px', color: 'var(--color-text-secondary)' }}>{item.name}</td>
                    <td style={{ padding: '16px 8px', fontWeight: 600 }}>{item.impact}</td>
                    <td style={{ padding: '16px 8px' }}>
                      <span style={{ 
                        background: item.status === 'RUNNING' ? 'rgba(0, 91, 191, 0.1)' : 'rgba(0, 110, 44, 0.1)', 
                        color: item.status === 'RUNNING' ? 'var(--color-primary)' : 'var(--color-secondary)', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontWeight: 700, 
                        fontSize: '0.7rem' 
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 8px', color: 'var(--color-primary)' }}><ArrowRightCircle size={18} cursor="pointer" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
