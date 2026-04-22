"use client";

import React, { useRef } from 'react';
import styles from '../page.module.css';
import { Bell, AlertTriangle, Truck, Zap, MailOpen } from 'lucide-react';
import { useAnimateCards, useAnimateTables } from '@/hooks/useAnimations';

export default function NotificationsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useAnimateCards(containerRef);
  useAnimateTables(tableRef, '.gsap-tr');

  return (
    <div className={styles.dashboard} ref={containerRef}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Notification Center</h1>
          <p className={styles.subtitle}>System alerts and team communications.</p>
        </div>
        <button className="gsap-card" style={{ 
          backgroundColor: 'var(--color-surface-card)', 
          color: 'var(--color-text-primary)', 
          padding: '12px 24px', 
          borderRadius: 'var(--radius-full)', 
          fontWeight: 'bold', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          border: '1px solid var(--color-border)',
          cursor: 'pointer'
        }}>
          <MailOpen size={18} /> Mark All Read
        </button>
      </div>

      <div className={styles.chartsGrid}>
        <div className={`gsap-card ${styles.chartCard} ${styles.fullWidth}`} style={{ gridColumn: '1 / -1' }} ref={tableRef}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <tbody>
                {[
                  { icon: AlertTriangle, color: 'var(--color-error)', bg: 'rgba(186, 26, 26, 0.1)', title: 'Critical Congestion Warning', desc: 'ORD-04 terminal experiencing 45% capacity overload.', time: '2 mins ago', unread: true },
                  { icon: Zap, color: 'var(--color-primary)', bg: 'rgba(0, 91, 191, 0.1)', title: 'AI Route Optimized', desc: 'Rerouted fleet N-721 to save 1.2 hrs of transit time.', time: '1 hr ago', unread: true },
                  { icon: Truck, color: 'var(--color-secondary)', bg: 'rgba(0, 110, 44, 0.1)', title: 'Shipment Delivered', desc: 'PO-9921 arrived at South Chicago branch successfully.', time: '4 hrs ago', unread: false },
                  { icon: Bell, color: 'var(--color-text-secondary)', bg: 'var(--color-surface-low)', title: 'System Update', desc: 'Nexus Core algorithm updated to v8.1.', time: 'Yesterday', unread: false },
                ].map((item, i) => (
                  <tr key={i} className="gsap-tr" style={{ 
                    borderBottom: '1px solid var(--color-surface-low)',
                    backgroundColor: item.unread ? 'var(--color-surface-low)' : 'transparent'
                  }}>
                    <td style={{ padding: '24px 16px', width: '60px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <item.icon size={20} />
                      </div>
                    </td>
                    <td style={{ padding: '24px 16px' }}>
                      <div style={{ fontWeight: item.unread ? 700 : 500, fontSize: '1rem', color: 'var(--color-text-primary)' }}>{item.title}</div>
                      <div style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>{item.desc}</div>
                    </td>
                    <td style={{ padding: '24px 16px', textAlign: 'right', color: 'var(--color-text-tertiary)', fontSize: '0.8rem' }}>
                      {item.time}
                      {item.unread && <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', display: 'inline-block', marginLeft: '12px' }}></div>}
                    </td>
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
