import React from 'react';
import { NotificationItem } from './NotificationItem';
import { Notification } from '@/services/notificationService';
import { BellOff } from 'lucide-react';
import styles from '@/app/page.module.css';

interface NotificationListProps {
  notifications: Notification[];
  onRead: (id: string) => void;
  listRef?: React.RefObject<HTMLDivElement | null>;
}

export const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  onRead,
  listRef 
}) => {
  if (notifications.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '64px 20px',
        color: 'var(--color-text-tertiary)'
      }}>
        <BellOff size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
        <p style={{ fontSize: '0.95rem' }}>No notifications found</p>
      </div>
    );
  }

  return (
    <div 
      className="gsap-card" 
      ref={listRef}
      style={{ 
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden'
      }}
    >
      {notifications.map((notification) => (
        <NotificationItem 
          key={notification.id} 
          notification={notification} 
          onRead={onRead} 
        />
      ))}
    </div>
  );
};
