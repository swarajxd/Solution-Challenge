"use client";

import { useMemo } from 'react';
import { useNotificationContext } from '@/context/NotificationContext';
import { NotificationType } from '@/services/notificationService';

export const useNotifications = (filterType: NotificationType | 'all' | 'unread' = 'all') => {
  const { notifications, unreadCount, markAsRead, clearAll, addNotification } = useNotificationContext();

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (filterType === 'all') return true;
      if (filterType === 'unread') return !n.read;
      return n.type === filterType;
    });
  }, [notifications, filterType]);

  return {
    notifications: filteredNotifications,
    unreadCount,
    markAsRead,
    clearAll,
    addNotification
  };
};
