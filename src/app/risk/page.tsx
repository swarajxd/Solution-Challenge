"use client";

import React, { useRef } from 'react';
import styles from '../page.module.css';
import { AlertTriangle, ShieldAlert, CloudLightning, Activity } from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import { useAnimateCards, useAnimateTables } from '@/hooks/useAnimations';

export default function RiskPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useAnimateCards(containerRef);
  useAnimateTables(tableRef, '.gsap-tr');

  return (
    <div className={styles.dashboard} ref={containerRef}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Risk Analysis</h1>
          <p className={styles.subtitle}>Geopolitical and supply chain disruption alerts.</p>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <KpiCard 
          title="Critical Vulnerabilities" 
          value={3} 
          icon={AlertTriangle} 
          colorType="error"
          trend={1} 
          trendLabel="since yesterday"
        />
        <KpiCard 
          title="Network Resilience" 
          value={82.5} 
          icon={ShieldAlert} 
          colorType="secondary"
          suffix="%"
        />
        <KpiCard 
          title="Weather Disruptions" 
          value={2} 
          icon={CloudLightning} 
          colorType="warning"
        />
        <KpiCard 
          title="Supplier Risk Score" 
          value={68} 
          icon={Activity} 
          colorType="warning"
          trend={-4.2} 
          trendLabel="below optimal"
        />
      </div>

      <div className={styles.chartsGrid}>
        {/* Risk Incident Ledger */}
        <div className={`gsap-card ${styles.chartCard} ${styles.fullWidth}`} style={{ gridColumn: '1 / -1' }} ref={tableRef}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}><ShieldAlert size={16} style={{display:'inline', marginRight:'8px'}}/>Active Incident Log</h3>
            <p className={styles.chartSubtitle}>Issues actively impacting current distribution nodes.</p>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-tertiary)' }}>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Incident ID</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Severity</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Location</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Impact Estimate</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>AI Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'INC-8891', severity: 'CRITICAL', loc: 'Singapore Port', impact: '48h Delay', action: 'Rerouting 14 vessels to secondary ports.' },
                  { id: 'INC-8890', severity: 'WARNING', loc: 'Alpine Route A9', impact: '12h Weather Delay', action: 'Alerting logistics. Speeding up pre-route transit.' },
                  { id: 'INC-8884', severity: 'CRITICAL', loc: 'Manufacturing Hub Shenzhen', impact: '14% Capacity Drop', action: 'Splitting Q3 POs across Vietnam and India.' },
                ].map((item, i) => (
                  <tr key={i} className="gsap-tr" style={{ 
                    borderBottom: '1px solid var(--color-surface-low)', 
                    transition: 'background-color 0.2s' 
                  }}>
                    <td style={{ padding: '16px 8px', fontWeight: 600 }}>{item.id}</td>
                    <td style={{ padding: '16px 8px' }}>
                      <span style={{ 
                        background: item.severity === 'CRITICAL' ? 'rgba(186, 26, 26, 0.1)' : 'rgba(121, 89, 0, 0.1)', 
                        color: item.severity === 'CRITICAL' ? 'var(--color-error)' : 'var(--color-warning)', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontWeight: 700, 
                        fontSize: '0.7rem' 
                      }}>
                        {item.severity}
                      </span>
                    </td>
                    <td style={{ padding: '16px 8px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{item.loc}</td>
                    <td style={{ padding: '16px 8px', fontWeight: 600 }}>{item.impact}</td>
                    <td style={{ padding: '16px 8px', color: 'var(--color-text-secondary)' }}>{item.action}</td>
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
