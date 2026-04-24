import React from 'react';
import styles from '@/app/page.module.css';

interface NotificationFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: any) => void;
  unreadCount: number;
}

export const NotificationFilters: React.FC<NotificationFiltersProps> = ({ 
  currentFilter, 
  onFilterChange,
  unreadCount
}) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: `Unread (${unreadCount})` },
    { id: 'critical', label: 'Critical' },
    { id: 'warning', label: 'Warning' },
    { id: 'info', label: 'Info' },
  ];

  return (
    <div style={{ 
      display: 'flex', 
      gap: '8px', 
      marginBottom: '20px',
      overflowX: 'auto',
      paddingBottom: '8px'
    }}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          style={{
            padding: '6px 16px',
            borderRadius: '20px',
            border: '1px solid var(--color-border)',
            background: currentFilter === filter.id ? 'var(--color-primary)' : 'var(--color-surface)',
            color: currentFilter === filter.id ? 'white' : 'var(--color-text-secondary)',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s'
          }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
