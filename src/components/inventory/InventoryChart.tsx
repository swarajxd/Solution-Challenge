import React, { useMemo, useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { InventoryItem } from '@/data/inventoryData';
import styles from '@/app/page.module.css';

interface InventoryChartProps {
  items: InventoryItem[];
  chartRef?: React.RefObject<HTMLDivElement | null>;
}

export const InventoryChart: React.FC<InventoryChartProps> = ({
  items,
  chartRef
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categoryData = useMemo(() => {
    const categories: Record<string, { name: string; value: number; stock: number; threshold: number }> = {};
    
    items.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = { 
          name: item.category, 
          value: 0, 
          stock: 0, 
          threshold: 0 
        };
      }
      categories[item.category].value += item.stock * item.price;
      categories[item.category].stock += item.stock;
      categories[item.category].threshold += item.threshold;
    });

    return Object.values(categories);
  }, [items]);

  const COLORS = ['var(--color-primary)', 'var(--color-secondary)', '#FFBB28', '#FF8042', '#8884d8'];

  if (!mounted) {
    return (
      <div className={`gsap-card ${styles.chartCard}`} ref={chartRef}>
        <div className={styles.chartHeader}>
          <h3 className={styles.chartTitle}>Inventory Distribution</h3>
          <p className={styles.chartSubtitle}>Value and stock levels by category.</p>
        </div>
        <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-tertiary)' }}>
          Loading charts...
        </div>
      </div>
    );
  }

  return (
    <div className={`gsap-card ${styles.chartCard}`} ref={chartRef}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Inventory Distribution</h3>
        <p className={styles.chartSubtitle}>Value and stock levels by category.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: '300px', minWidth: 0 }}>
        <div className={styles.chartContainer} style={{ minWidth: 0 }}>
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginBottom: '10px' }}>
            Value by Category ($)
          </p>
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-text-tertiary)' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-text-tertiary)' }} />
              <Tooltip 
                cursor={{ fill: 'var(--color-surface-low)' }} 
                contentStyle={{ 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--color-border)', 
                  boxShadow: 'var(--shadow-hover)',
                  fontSize: '0.8rem'
                }} 
              />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={30}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartContainer} style={{ minWidth: 0 }}>
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginBottom: '10px' }}>
            Stock vs Threshold
          </p>
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-text-tertiary)' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--color-text-tertiary)' }} />
              <Tooltip 
                cursor={{ fill: 'var(--color-surface-low)' }} 
                contentStyle={{ 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--color-border)', 
                  boxShadow: 'var(--shadow-hover)',
                  fontSize: '0.8rem'
                }} 
              />
              <Bar dataKey="stock" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="threshold" fill="var(--color-surface-low)" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
