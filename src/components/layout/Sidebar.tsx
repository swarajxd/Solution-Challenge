"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import { LayoutDashboard, Package, Truck, TrendingUp, AlertTriangle, Plus, HelpCircle, User } from 'lucide-react';
import { useAnimateSidebar } from '@/hooks/useAnimations';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/inventory', label: 'Inventory', icon: Package },
  { href: '/logistics', label: 'Logistics', icon: Truck },
  { href: '/forecasting', label: 'Forecasting', icon: TrendingUp },
  { href: '/risk', label: 'Risk Analysis', icon: AlertTriangle },
  { href: '/route-optimization', label: 'Optimization', icon: Truck },
  { href: '/simulation', label: 'Simulation', icon: Plus },
  { href: '/sustainability', label: 'Sustainability', icon: HelpCircle },
  { href: '/warehouse', label: 'Warehouse Map', icon: Package },
  { href: '/ai', label: 'AI Assistant', icon: LayoutDashboard },
];

export const Sidebar = () => {
  const sidebarRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useAnimateSidebar(sidebarRef);

  return (
    <aside className={styles.sidebar} ref={sidebarRef}>
      <div className={styles.brand}>
        <div className={styles.brandLogo}>
          <Package size={24} />
        </div>
        <div className={styles.title}>SupplyChain AI</div>
        <div className={styles.subtitle}>Optimization Engine</div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button className={styles.newSimulationBtn}>
        <Plus size={16} />
        New Simulation
      </button>

      <div className={styles.bottomNav}>
        <Link href="/help" className={styles.navItem}>
          <HelpCircle size={20} />
          <span>Help Center</span>
        </Link>
        <Link href="/account" className={styles.navItem}>
          <User size={20} />
          <span>Account</span>
        </Link>
      </div>
    </aside>
  );
};
