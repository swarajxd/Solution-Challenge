import React, { useState, useEffect } from 'react';
import { Notification } from '@/services/notificationService';
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import styles from '@/app/page.module.css';

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRead }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getIcon = () => {
    switch (notification.type) {
      case 'critical': return <AlertCircle size={18} color="var(--color-error)" />;
      case 'warning': return <AlertTriangle size={18} color="var(--color-warning)" />;
      case 'success': return <CheckCircle size={18} color="var(--color-secondary)" />;
      default: return <Info size={18} color="var(--color-primary)" />;
    }
  };

  const getTimeString = (timestamp: string) => {
    if (!mounted) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      onClick={() => !notification.read && onRead(notification.id)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px',
        background: notification.read ? 'transparent' : 'var(--color-surface-low)',
        borderBottom: '1px solid var(--color-border)',
        cursor: notification.read ? 'default' : 'pointer',
        transition: 'background 0.2s',
        opacity: notification.read ? 0.7 : 1
      }}
    >
      <div style={{ marginTop: '2px' }}>
        {getIcon()}
      </div>
      
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ 
            fontSize: '0.7rem', 
            fontWeight: 700, 
            textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
            letterSpacing: '0.05em'
          }}>
            {notification.source}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)' }}>
            {getTimeString(notification.timestamp)}
          </span>
        </div>
        
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'var(--color-text-primary)',
          fontWeight: notification.read ? 400 : 500,
          lineHeight: 1.4
        }}>
          {notification.message}
        </p>
      </div>

      {!notification.read && (
        <div style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          background: 'var(--color-primary)',
          marginTop: '6px'
        }} />
      )}
    </div>
  );
};
