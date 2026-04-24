import React, { useMemo, useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { Shipment } from '@/data/logisticsData';
import styles from '@/app/page.module.css';

interface LogisticsChartProps {
  shipments: Shipment[];
  chartRef?: React.RefObject<HTMLDivElement | null>;
}

export const LogisticsChart: React.FC<LogisticsChartProps> = ({
  shipments,
  chartRef
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const statusData = useMemo(() => {
    const counts = {
      'In Transit': 0,
      'Delayed': 0,
      'Delivered': 0
    };
    
    shipments.forEach(s => {
      counts[s.status]++;
    });

    return [
      { name: 'In Transit', value: counts['In Transit'], color: 'var(--color-primary)' },
      { name: 'Delayed', value: counts['Delayed'], color: 'var(--color-error)' },
      { name: 'Delivered', value: counts['Delivered'], color: 'var(--color-secondary)' }
    ];
  }, [shipments]);

  const progressData = useMemo(() => {
    return shipments.map(s => ({
      id: s.id.split('-')[1],
      progress: s.progress,
      status: s.status
    }));
  }, [shipments]);

  if (!mounted) {
    return (
      <div className={`gsap-card ${styles.chartCard} ${styles.fullWidth}`} style={{ gridColumn: '1 / -1' }} ref={chartRef}>
        <div className={styles.chartHeader}>
          <h3 className={styles.chartTitle}>Fleet Operational Overview</h3>
          <p className={styles.chartSubtitle}>Shipment status distribution and individual progress tracking.</p>
        </div>
        <div style={{ height: '350px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-tertiary)' }}>
          Loading charts...
        </div>
      </div>
    );
  }

  return (
    <div className={`gsap-card ${styles.chartCard} ${styles.fullWidth}`} style={{ gridColumn: '1 / -1' }} ref={chartRef}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Fleet Operational Overview</h3>
        <p className={styles.chartSubtitle}>Shipment status distribution and individual progress tracking.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', height: '350px', minWidth: 0 }}>
        <div className={styles.chartContainer} style={{ minWidth: 0 }}>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginBottom: '10px' }}>
            Status Distribution
          </p>
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <PieChart>
              <Pie
                data={statusData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--color-border)', 
                  boxShadow: 'var(--shadow-hover)',
                  fontSize: '0.8rem'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '10px' }}>
            {statusData.map((entry, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: entry.color }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chartContainer} style={{ minWidth: 0 }}>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginBottom: '10px' }}>
            Shipment Progress (%)
          </p>
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="id" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-text-tertiary)' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-text-tertiary)' }} domain={[0, 100]} />
              <Tooltip 
                cursor={{ fill: 'var(--color-surface-low)' }} 
                contentStyle={{ 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--color-border)', 
                  boxShadow: 'var(--shadow-hover)',
                  fontSize: '0.8rem'
                }} 
              />
              <Bar dataKey="progress" radius={[4, 4, 0, 0]} barSize={30}>
                {progressData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.status === 'Delayed' ? 'var(--color-error)' : entry.status === 'Delivered' ? 'var(--color-secondary)' : 'var(--color-primary)'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
