"use client";

import React, { useRef, useState, useMemo, useEffect } from 'react';
import styles from '../page.module.css';
import { useAnimateCards, useAnimateTables, useAnimateCharts } from '@/hooks/useAnimations';
import { useInventory, InventoryFilters as FilterType } from '@/hooks/useInventory';
import { InventoryKPIs } from '@/components/inventory/InventoryKPIs';
import { InventoryFilters } from '@/components/inventory/InventoryFilters';
import { InventoryTable } from '@/components/inventory/InventoryTable';
import { InventoryChart } from '@/components/inventory/InventoryChart';

export default function InventoryPage() {
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<FilterType>({
    search: '',
    category: 'All',
    warehouse: 'All',
    status: 'All'
  });

  const { items, allItems, kpis, restock, lastUpdated } = useInventory(filters);

  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useAnimateCards(containerRef);
  useAnimateTables(tableRef, '.gsap-tr');
  useAnimateCharts(chartRef);

  const categories = useMemo(() => {
    return Array.from(new Set(allItems.map(item => item.category)));
  }, [allItems]);

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleStatusChange = (status: string) => {
    setFilters(prev => ({ ...prev, status }));
  };

  return (
    <div className={styles.dashboard} ref={containerRef}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Inventory Management</h1>
          <p className={styles.subtitle}>
            Real-time stock valuation and tracking data. {mounted && `Last updated: ${new Date(lastUpdated).toLocaleTimeString()}`}
          </p>
        </div>
      </div>

      <InventoryKPIs 
        totalValue={kpis.totalValue}
        totalSKUs={kpis.totalSKUs}
        lowStockCount={kpis.lowStockCount}
        totalStock={kpis.totalStock}
      />

      <InventoryFilters 
        search={filters.search}
        onSearchChange={handleSearchChange}
        category={filters.category}
        onCategoryChange={handleCategoryChange}
        status={filters.status}
        onStatusChange={handleStatusChange}
        categories={categories}
      />

      <div className={styles.chartsGrid}>
        <InventoryTable 
          items={items} 
          onRestock={(id) => restock(id)} 
          tableRef={tableRef}
        />
        
        <InventoryChart 
          items={allItems} 
          chartRef={chartRef}
        />
      </div>
    </div>
  );
}
