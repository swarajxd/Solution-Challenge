"use client";

import React, { useRef, useState } from 'react';
import styles from '../page.module.css';
import { ShieldAlert, AlertTriangle, Activity, ShieldCheck, Filter } from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import { useAnimateCards, useAnimateTables } from '@/hooks/useAnimations';
import { useNexusContext } from '@/context/NexusContext';

export default function RiskPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'WARNING'>('ALL');

  const { 
    globalRiskLevel, simulationRiskExposure, incidents, 
    isGlobalLoading, globalError, retryGlobalFetch, resolveIncident 
  } = useNexusContext();

  useAnimateCards(containerRef);
  useAnimateTables(tableRef, '.gsap-tr');

  if (isGlobalLoading) {
    return (
      <div className={styles.dashboard} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity className="animate-pulse" size={20} /> Scanning global node stability...
        </p>
      </div>
    );
  }

  if (globalError) {
    return (
      <div className={styles.dashboard} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
        <p style={{ color: 'var(--color-error)' }}>{globalError}</p>
        <button onClick={retryGlobalFetch} style={{ padding: '8px 16px', background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>Retry System Scan</button>
      </div>
    );
  }

  const filteredIncidents = incidents.filter(i => filter === 'ALL' || i.severity === filter);

  return (
    <div className={styles.dashboard} ref={containerRef}>
      {globalRiskLevel === 'CRITICAL' && (
        <div style={{ backgroundColor: 'rgba(186, 26, 26, 0.1)', color: 'var(--color-error)', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', marginBottom: '16px' }}>
          <AlertTriangle size={18} /> ⚠️ System under critical risk. Immediate intervention required.
        </div>
      )}
      {globalRiskLevel === 'WARNING' && (
        <div style={{ backgroundColor: 'rgba(255, 179, 71, 0.1)', color: 'var(--color-warning)', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', marginBottom: '16px' }}>
          <AlertTriangle size={18} /> Potential instability detected. Review recommended strategies.
        </div>
      )}
      {globalRiskLevel === 'NORMAL' && (
        <div style={{ backgroundColor: 'rgba(10, 207, 131, 0.1)', color: 'var(--color-secondary)', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', marginBottom: '16px' }}>
          <ShieldCheck size={18} /> System operating nominally. Architecture stabilized.
        </div>
      )}

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Risk Analysis</h1>
          <p className={styles.subtitle}>Real-time monitoring of supply chain vulnerabilities.</p>
        </div>
        <button className="gsap-card" style={{ 
          backgroundColor: 'var(--color-surface-card)', 
          color: 'var(--color-text-primary)', 
          padding: '10px 20px', 
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--color-border)',
          fontWeight: '600'
        }}>
          Export Report
        </button>
      </div>

      <div className={styles.kpiGrid}>
        <KpiCard 
          title="Global Risk Level" 
          value={globalRiskLevel} 
          icon={globalRiskLevel === 'CRITICAL' ? AlertTriangle : globalRiskLevel === 'WARNING' ? Activity : ShieldCheck} 
          colorType={globalRiskLevel === 'CRITICAL' ? 'error' : globalRiskLevel === 'WARNING' ? 'warning' : 'secondary'}
        />
        <KpiCard 
          title="Risk Exposure Matrix" 
          value={simulationRiskExposure} 
          icon={Activity} 
          colorType={simulationRiskExposure > 25 ? 'error' : simulationRiskExposure > 14.5 ? 'warning' : 'primary'}
          suffix="%"
        />
        <KpiCard 
          title="Active System Incidents" 
          value={incidents.length} 
          icon={ShieldAlert} 
          colorType={incidents.length > 0 ? 'warning' : 'secondary'}
        />
      </div>

      <div className={styles.chartsGrid}>
        <div className={`gsap-card ${styles.chartCard} ${styles.fullWidth}`} style={{ gridColumn: '1 / -1' }} ref={tableRef}>
          <div className={styles.chartHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 className={styles.chartTitle}>Active Incident Log</h3>
              <p className={styles.chartSubtitle}>Tracked anomalies across the network.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Filter size={16} color="var(--color-text-secondary)" />
              {['ALL', 'CRITICAL', 'WARNING'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f as any)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: filter === f ? 'var(--color-primary)' : 'var(--color-border)',
                    backgroundColor: filter === f ? 'rgba(0, 91, 191, 0.1)' : 'transparent',
                    color: filter === f ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          
          {incidents.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--color-secondary)' }}>
              <ShieldCheck size={48} style={{ margin: '0 auto 16px', opacity: 0.8 }} />
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>System operating normally. No active risks.</p>
            </div>
          ) : filteredIncidents.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
               <p>No incidents found for the selected filter.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', marginTop: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-tertiary)' }}>
                    <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Title</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Severity</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Location</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIncidents.map((item) => (
                    <tr key={item.id} className={`${styles.tableRow} gsap-tr`} style={{
                      backgroundColor: item.severity === 'CRITICAL' ? 'rgba(186, 26, 26, 0.02)' : 'transparent'
                    }}>
                      <td style={{ padding: '16px 8px', fontWeight: 600 }}>{item.id}</td>
                      <td style={{ padding: '16px 8px' }}>
                        <span style={{ 
                          background: `rgba(var(--color-${item.severity === 'CRITICAL' ? 'error' : item.severity === 'WARNING' ? 'warning' : 'primary'}-rgb, 0,0,0), 0.1)`, 
                          color: `var(--color-${item.severity === 'CRITICAL' ? 'error' : item.severity === 'WARNING' ? 'warning' : 'primary'})`, 
                          padding: '4px 8px', 
                          borderRadius: '4px', 
                          fontWeight: 700, 
                          fontSize: '0.7rem' 
                        }}>
                          {item.severity}
                        </span>
                      </td>
                      <td style={{ padding: '16px 8px', color: 'var(--color-text-secondary)' }}>{item.loc}</td>
                      <td style={{ padding: '16px 8px' }}>{item.impact}</td>
                      <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                         <button 
                           onClick={() => resolveIncident(item.id)}
                           style={{
                             padding: '6px 16px',
                             backgroundColor: 'var(--color-surface-bg)',
                             border: '1px solid var(--color-border)',
                             borderRadius: '4px',
                             color: 'var(--color-primary)',
                             fontSize: '0.75rem',
                             fontWeight: 600,
                             cursor: 'pointer',
                             transition: 'all 0.2s ease'
                           }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                             e.currentTarget.style.color = 'white';
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.backgroundColor = 'var(--color-surface-bg)';
                             e.currentTarget.style.color = 'var(--color-primary)';
                           }}
                         >
                           Resolve
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
