import React from 'react';
import { InventoryItem } from '@/data/inventoryData';
import { FileSpreadsheet, RotateCcw } from 'lucide-react';
import styles from '@/app/page.module.css';

interface InventoryTableProps {
  items: InventoryItem[];
  onRestock: (id: string) => void;
  tableRef?: React.RefObject<HTMLDivElement | null>;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  onRestock,
  tableRef
}) => {
  return (
    <div className={`gsap-card ${styles.chartCard}`} ref={tableRef}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>
          <FileSpreadsheet size={16} style={{ display: 'inline', marginRight: '8px' }} />
          Inventory Ledger
        </h3>
        <p className={styles.chartSubtitle}>Real-time stock levels and replenishment status.</p>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-tertiary)' }}>
              <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>SKU</th>
              <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Item Name</th>
              <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Category</th>
              <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Warehouse</th>
              <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Stock</th>
              <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '12px 8px', fontWeight: 600, textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const isLowStock = item.stock < item.threshold;
              return (
                <tr key={item.id} className="gsap-tr" style={{ 
                  borderBottom: '1px solid var(--color-surface-low)', 
                  transition: 'background-color 0.2s' 
                }}>
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>{item.id}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--color-text-secondary)' }}>{item.name}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--color-text-tertiary)' }}>{item.category}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--color-text-tertiary)' }}>{item.warehouse}</td>
                  <td style={{ padding: '16px 8px', fontWeight: 700 }}>
                    <span style={{ color: isLowStock ? 'var(--color-error)' : 'inherit' }}>
                      {item.stock}
                    </span>
                    <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 400, marginLeft: '4px' }}>
                      / {item.threshold}
                    </span>
                  </td>
                  <td style={{ padding: '16px 8px' }}>
                    {isLowStock ? (
                      <span style={{ 
                        background: 'rgba(186, 26, 26, 0.1)', 
                        color: 'var(--color-error)', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontWeight: 700, 
                        fontSize: '0.7rem',
                        whiteSpace: 'nowrap'
                      }}>
                        RESTOCK REQUIRED
                      </span>
                    ) : (
                      <span style={{ 
                        background: 'rgba(0, 110, 44, 0.1)', 
                        color: 'var(--color-secondary)', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontWeight: 700, 
                        fontSize: '0.7rem',
                        whiteSpace: 'nowrap'
                      }}>
                        OPTIMAL
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '16px 8px' }}>
                    <button 
                      onClick={() => onRestock(item.id)}
                      title="Restock Item"
                      style={{
                        background: 'var(--color-surface-low)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        padding: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      <RotateCcw size={14} />
                      Restock
                    </button>
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
                  No items found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
