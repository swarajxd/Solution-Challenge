"use client";

import React, { useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import styles from './MainLayout.module.css';
import { usePageTransition } from '@/hooks/useAnimations';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Re-trigger animation on route change by forcing a remount or using GSAP context via dependency
  usePageTransition(containerRef);

  if (pathname === '/landing') {
    return (
      <div className={styles.layoutWrapper}>
        <main className={styles.pageContainer} style={{ padding: 0 }} ref={containerRef} key={pathname}>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className={styles.layoutWrapper}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Navbar />
        {/* We use a key based on route to force re-render and re-animate */}
        <main className={styles.pageContainer} ref={containerRef} key={pathname}>
          {children}
        </main>
      </div>
    </div>
  );
};
