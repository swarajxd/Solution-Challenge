export type NotificationType = 'info' | 'warning' | 'critical' | 'success';
export type NotificationSource = 'inventory' | 'logistics' | 'system' | 'ai';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  source: NotificationSource;
  timestamp: string;
  read: boolean;
  metadata?: Record<string, any>;
}

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexus_notifications');
      if (saved) {
        try {
          this.notifications = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse notifications', e);
        }
      }
    }
  }

  private notify() {
    this.listeners.forEach(listener => listener([...this.notifications]));
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexus_notifications', JSON.stringify(this.notifications));
    }
  }

  createNotification(
    message: string, 
    type: NotificationType = 'info', 
    source: NotificationSource = 'system',
    metadata?: Record<string, any>
  ): Notification | null {
    // Duplicate prevention: check if an unread notification with same message, type and source exists
    const isDuplicate = this.notifications.some(n => 
      !n.read && 
      n.message === message && 
      n.type === type && 
      n.source === source
    );

    if (isDuplicate) return null;

    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      source,
      timestamp: new Date().toISOString(),
      read: false,
      metadata
    };

    this.notifications = [newNotification, ...this.notifications].slice(0, 50);
    this.notify();
    return newNotification;
  }

  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  markAsRead(id: string) {
    this.notifications = this.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    this.notify();
  }

  clearAll() {
    this.notifications = [];
    this.notify();
  }

  subscribe(listener: (notifications: Notification[]) => void) {
    this.listeners.push(listener);
    listener([...this.notifications]);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export const notificationService = new NotificationService();
