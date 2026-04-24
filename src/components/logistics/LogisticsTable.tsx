import React from 'react';
import { Shipment } from '@/data/logisticsData';
import { Truck, AlertCircle, CheckCircle, Clock, MapPin } from 'lucide-react';
import styles from '@/app/page.module.css';

interface LogisticsTableProps {
  shipments: Shipment[];
  onSimulateDelay: (id: string) => void;
  onResolveDelay: (id: string) => void;
  tableRef?: React.RefObject<HTMLDivElement | null>;
}

export const LogisticsTable: React.FC<LogisticsTableProps> = ({
  shipments,
  onSimulateDelay,
  onResolveDelay,
  tableRef
}) => {
  return (
    <div className={`gsap-card ${styles.chartCard}`} ref={tableRef}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Active Shipment Tracking</h3>
        <p className={styles.chartSubtitle}>Real-time monitoring of global fleet movement.</p>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-tertiary)' }}>
              <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>ID</th>
              <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Route</th>
              <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Progress</th>
              <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>ETA</th>
              <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.id} className="gsap-tr" style={{ 
                borderBottom: '1px solid var(--color-surface-low)', 
                transition: 'background-color 0.2s' 
              }}>
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>{shipment.id}</td>
                <td style={{ padding: '16px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={14} style={{ color: 'var(--color-primary)' }} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>{shipment.origin}</span>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>→</span>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{shipment.destination}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 8px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    width: 'fit-content',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: shipment.status === 'Delivered' 
                      ? 'rgba(0, 110, 44, 0.1)' 
                      : shipment.status === 'Delayed'
                        ? 'rgba(186, 26, 26, 0.1)'
                        : 'rgba(0, 82, 204, 0.1)',
                    color: shipment.status === 'Delivered' 
                      ? 'var(--color-secondary)' 
                      : shipment.status === 'Delayed'
                        ? 'var(--color-error)'
                        : 'var(--color-primary)'
                  }}>
                    {shipment.status === 'Delivered' && <CheckCircle size={14} />}
                    {shipment.status === 'Delayed' && <AlertCircle size={14} />}
                    {shipment.status === 'In Transit' && <Truck size={14} />}
                    {shipment.status.toUpperCase()}
                  </div>
                </td>
                <td style={{ padding: '16px 8px', width: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      flex: 1, 
                      height: '6px', 
                      background: 'var(--color-surface-low)', 
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        height: '100%', 
                        width: `${shipment.progress}%`, 
                        background: shipment.status === 'Delayed' ? 'var(--color-error)' : 'var(--color-primary)',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, minWidth: '35px' }}>{shipment.progress}%</span>
                  </div>
                </td>
                <td style={{ padding: '16px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-secondary)' }}>
                    <Clock size={14} />
                    <span>{shipment.eta}d</span>
                  </div>
                </td>
                <td style={{ padding: '16px 8px' }}>
                  {shipment.status === 'In Transit' && (
                    <button 
                      onClick={() => onSimulateDelay(shipment.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: '1px solid var(--color-error)',
                        background: 'transparent',
                        color: 'var(--color-error)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Delay
                    </button>
                  )}
                  {shipment.status === 'Delayed' && (
                    <button 
                      onClick={() => onResolveDelay(shipment.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: '1px solid var(--color-secondary)',
                        background: 'transparent',
                        color: 'var(--color-secondary)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
