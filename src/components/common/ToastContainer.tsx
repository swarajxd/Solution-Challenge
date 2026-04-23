"use client";

import React from 'react';
import { useNexusContext } from '@/context/NexusContext';
import { Bell } from 'lucide-react';

export const ToastContainer = () => {
  const { notifications } = useNexusContext();

  if (notifications.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      pointerEvents: 'none'
    }}>
      {notifications.map(toast => (
        <div key={toast.id} className="gsap-toast" style={{
          backgroundColor: 'var(--color-surface-card)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-hover)',
          padding: '12px 16px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: 'var(--color-text-primary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          animation: toast.exiting ? 'slideOut 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards' : 'slideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
        }}>
           <Bell size={16} color="var(--color-primary)" />
           {toast.message}
        </div>
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(120%); opacity: 0; }
        }
      `}} />
    </div>
  );
};
