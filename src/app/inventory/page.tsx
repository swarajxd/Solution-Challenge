"use client";

import React, { useRef } from 'react';
import styles from '../page.module.css';
import { Package, ArrowDown, ArrowUp, Database, FileSpreadsheet } from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import { useAnimateCards, useAnimateTables, useAnimateCharts } from '@/hooks/useAnimations';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const inventoryData = [
  { category: 'Raw Materials', value: 4000, optimal: 3500 },
  { category: 'Electronics', value: 3000, optimal: 3200 },
  { category: 'Packaging', value: 2000, optimal: 2500 },
  { category: 'Finished Goods', value: 6780, optimal: 6000 },
];

export default function InventoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useAnimateCards(containerRef);
  useAnimateTables(tableRef, '.gsap-tr');
  useAnimateCharts(chartRef);

  return (
    <div className={styles.dashboard} ref={containerRef}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Inventory Management</h1>
          <p className={styles.subtitle}>Real-time stock valuation and tracking data.</p>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <KpiCard 
          title="Stock Valuation" 
          value={8.4} 
          prefix="$"
          suffix="M"
          icon={Database} 
          colorType="primary"
          trend={2.1} 
          trendLabel="YoY"
        />
        <KpiCard 
          title="SKUs Tracked" 
          value={1240} 
          icon={Package} 
          colorType="secondary"
          trend={15} 
          trendLabel="new this month"
        />
      </div>

      <div className={styles.chartsGrid}>
        {/* Inventory Table */}
        <div className={`gsap-card ${styles.chartCard}`} ref={tableRef}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}><FileSpreadsheet size={16} style={{display:'inline', marginRight:'8px'}}/>Critical Stock Ledger</h3>
            <p className={styles.chartSubtitle}>Items requiring immediate replenishment.</p>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-tertiary)' }}>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>SKU Code</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Location</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Stock</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sku: 'RMT-902', loc: 'ORD-04', stock: 12, max: 500, alert: true },
                  { sku: 'ELC-114', loc: 'JFK-02', stock: 45, max: 200, alert: false },
                  { sku: 'PKG-009', loc: 'LAX-01', stock: 8, max: 1000, alert: true },
                  { sku: 'FGD-442', loc: 'ORD-04', stock: 154, max: 150, alert: false },
                ].map((item, i) => (
                  <tr key={i} className="gsap-tr" style={{ 
                    borderBottom: '1px solid var(--color-surface-low)', 
                    transition: 'background-color 0.2s' 
                  }}>
                    <td style={{ padding: '16px 8px', fontWeight: 600 }}>{item.sku}</td>
                    <td style={{ padding: '16px 8px', color: 'var(--color-text-secondary)'}}>{item.loc}</td>
                    <td style={{ padding: '16px 8px', fontWeight: 700 }}>
                      {item.stock} <span style={{color: 'var(--color-text-tertiary)', fontWeight: 400}}>/ {item.max}</span>
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      {item.alert ? (
                        <span style={{ background: 'rgba(186, 26, 26, 0.1)', color: 'var(--color-error)', padding: '4px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '0.7rem' }}>RESTOCK REQUIRED</span>
                      ) : (
                        <span style={{ background: 'rgba(0, 110, 44, 0.1)', color: 'var(--color-secondary)', padding: '4px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '0.7rem' }}>OPTIMAL</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Categories Chart */}
        <div className={`gsap-card ${styles.chartCard}`} ref={chartRef}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Categorical Value</h3>
            <p className={styles.chartSubtitle}>Distribution versus optimal thresholds.</p>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} />
                <Tooltip cursor={{fill: 'var(--color-surface-low)'}} contentStyle={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-hover)' }} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={24} animationDuration={1000} />
                <Bar dataKey="optimal" fill="var(--color-surface-low)" radius={[4, 4, 0, 0]} barSize={24} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
