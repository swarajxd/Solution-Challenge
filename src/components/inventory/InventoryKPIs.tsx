import React from 'react';
import { Package, Database, AlertTriangle, Hash } from 'lucide-react';
import { KpiCard } from '@/components/common/KpiCard';
import styles from '@/app/page.module.css';

interface InventoryKPIsProps {
  totalValue: number;
  totalSKUs: number;
  lowStockCount: number;
  totalStock: number;
}

export const InventoryKPIs: React.FC<InventoryKPIsProps> = ({
  totalValue,
  totalSKUs,
  lowStockCount,
  totalStock
}) => {
  return (
    <div className={styles.kpiGrid}>
      <KpiCard 
        title="Total Stock Value" 
        value={totalValue} 
        prefix="$"
        icon={Database} 
        colorType="primary"
      />
      <KpiCard 
        title="Total SKUs" 
        value={totalSKUs} 
        icon={Package} 
        colorType="secondary"
      />
      <KpiCard 
        title="Low Stock Items" 
        value={lowStockCount} 
        icon={AlertTriangle} 
        colorType="error"
        trend={lowStockCount > 0 ? lowStockCount : undefined}
        trendLabel={lowStockCount > 0 ? "needs attention" : "all optimal"}
      />
      <KpiCard 
        title="Total Stock Units" 
        value={totalStock} 
        icon={Hash} 
        colorType="primary"
      />
    </div>
  );
};
