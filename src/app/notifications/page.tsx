"use client";

import React, { useRef, useState } from 'react';
import styles from '../page.module.css';
import { MailOpen, Bell } from 'lucide-react';
import { useAnimateCards, useAnimateTables } from '@/hooks/useAnimations';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationList } from '@/components/notifications/NotificationList';
import { NotificationFilters } from '@/components/notifications/NotificationFilters';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<any>('all');
  const { notifications, unreadCount, markAsRead, clearAll } = useNotifications(filter);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useAnimateCards(containerRef);
  useAnimateTables(listRef, '.gsap-tr');

  return (
    <div className={styles.dashboard} ref={containerRef}>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div>
            <h1 className={styles.title}>Notification Center</h1>
            <p className={styles.subtitle}>System alerts and team communications.</p>
          </div>
          {unreadCount > 0 && (
            <div style={{ 
              background: 'var(--color-primary)', 
              color: 'white', 
              padding: '2px 10px', 
              borderRadius: '20px', 
              fontSize: '0.8rem', 
              fontWeight: 700 
            }}>
              {unreadCount} New
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => clearAll()}
            className="gsap-card" 
            style={{ 
              backgroundColor: 'transparent', 
              color: 'var(--color-text-secondary)', 
              padding: '10px 20px', 
              borderRadius: 'var(--radius-full)', 
              fontWeight: 600, 
              fontSize: '0.85rem',
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              border: '1px solid var(--color-border)',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
          
          <button 
            onClick={() => notifications.forEach(n => !n.read && markAsRead(n.id))}
            className="gsap-card" 
            style={{ 
              backgroundColor: 'var(--color-surface-card)', 
              color: 'var(--color-text-primary)', 
              padding: '10px 20px', 
              borderRadius: 'var(--radius-full)', 
              fontWeight: 'bold', 
              fontSize: '0.85rem',
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              border: '1px solid var(--color-border)',
              cursor: 'pointer'
            }}
          >
            <MailOpen size={18} /> Mark All Read
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px' }}>
        <NotificationFilters 
          currentFilter={filter} 
          onFilterChange={setFilter} 
          unreadCount={unreadCount}
        />
        
        <NotificationList 
          notifications={notifications} 
          onRead={markAsRead} 
          listRef={listRef}
        />
      </div>
    </div>
  );
}
