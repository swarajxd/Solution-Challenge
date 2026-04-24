import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { inventoryData, InventoryItem } from '@/data/inventoryData';
import { notificationService } from '@/services/notificationService';

export interface InventoryFilters {
  search: string;
  category: string;
  warehouse: string;
  status: string;
}

export const useInventory = (initialFilters: InventoryFilters) => {
  const [items, setItems] = useState<InventoryItem[]>(inventoryData);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString());
  const alertedItems = useRef<Set<string>>(new Set());

  // Auto-reduce stock simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prevItems => {
        let hasChanges = false;
        const newItems = prevItems.map(item => {
          // Only reduce stock for items that have stock
          if (item.stock > 0 && Math.random() > 0.7) {
            const reduction = Math.floor(Math.random() * 3) + 1;
            const newStock = Math.max(0, item.stock - reduction);
            
            // Check for low stock notification
            if (newStock < item.threshold && !alertedItems.current.has(item.id)) {
              notificationService.createNotification(
                `Low stock alert: ${item.name} is down to ${newStock} units.`,
                'warning',
                'inventory',
                { sku: item.id, stock: newStock }
              );
              alertedItems.current.add(item.id);
            }

            hasChanges = true;
            return { 
              ...item, 
              stock: newStock,
              lastUpdated: new Date().toISOString()
            };
          }
          return item;
        });

        if (hasChanges) {
          setLastUpdated(new Date().toISOString());
          return newItems;
        }
        return prevItems;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const restock = useCallback((id: string, amount: number = 100) => {
    setItems(prevItems => {
      const itemToRestock = prevItems.find(i => i.id === id);
      if (!itemToRestock) return prevItems;

      const newStock = itemToRestock.stock + amount;
      
      // Reset alert state if restocked above threshold
      if (newStock >= itemToRestock.threshold) {
        alertedItems.current.delete(id);
      }

      notificationService.createNotification(
        `Restocked ${itemToRestock.name}: +${amount} units.`,
        'success',
        'inventory',
        { sku: id, newStock }
      );

      return prevItems.map(item => 
        item.id === id 
          ? { ...item, stock: newStock, lastUpdated: new Date().toISOString() } 
          : item
      );
    });
    setLastUpdated(new Date().toISOString());
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(initialFilters.search.toLowerCase()) || 
                           item.id.toLowerCase().includes(initialFilters.search.toLowerCase());
      const matchesCategory = initialFilters.category === 'All' || item.category === initialFilters.category;
      const matchesWarehouse = initialFilters.warehouse === 'All' || item.warehouse === initialFilters.warehouse;
      
      const status = item.stock < item.threshold ? 'RESTOCK REQUIRED' : 'OPTIMAL';
      const matchesStatus = initialFilters.status === 'All' || status === initialFilters.status;

      return matchesSearch && matchesCategory && matchesWarehouse && matchesStatus;
    });
  }, [items, initialFilters]);

  const kpis = useMemo(() => {
    const totalStock = items.reduce((sum, item) => sum + item.stock, 0);
    const totalValue = items.reduce((sum, item) => sum + (item.stock * item.price), 0);
    const lowStockCount = items.filter(item => item.stock < item.threshold).length;
    const totalSKUs = items.length;

    return {
      totalStock,
      totalValue,
      lowStockCount,
      totalSKUs
    };
  }, [items]);

  return {
    items: filteredItems,
    allItems: items, // Useful for charts
    kpis,
    restock,
    lastUpdated
  };
};
