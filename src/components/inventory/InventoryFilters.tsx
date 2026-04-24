import React from 'react';
import { Search, Filter } from 'lucide-react';
import styles from '@/app/page.module.css';

interface InventoryFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  categories: string[];
}

export const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  categories
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      marginBottom: '24px', 
      flexWrap: 'wrap',
      alignItems: 'center',
      background: 'var(--color-surface)',
      padding: '16px',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border)'
    }}>
      <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
        <Search size={18} style={{ 
          position: 'absolute', 
          left: '12px', 
          top: '50%', 
          transform: 'translateY(-50%)',
          color: 'var(--color-text-tertiary)'
        }} />
        <input 
          type="text" 
          placeholder="Search by SKU or name..." 
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '10px 10px 10px 40px', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-background)',
            color: 'var(--color-text-primary)',
            fontSize: '0.9rem'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Filter size={18} style={{ color: 'var(--color-text-tertiary)' }} />
        
        <select 
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={{ 
            padding: '10px', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-background)',
            color: 'var(--color-text-primary)',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select 
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          style={{ 
            padding: '10px', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-background)',
            color: 'var(--color-text-primary)',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          <option value="All">All Statuses</option>
          <option value="OPTIMAL">Optimal</option>
          <option value="RESTOCK REQUIRED">Restock Required</option>
        </select>
      </div>
    </div>
  );
};
