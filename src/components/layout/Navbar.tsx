"use client";

import React, { useRef, useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { Search, Bell, Settings } from 'lucide-react';
import { useAnimateNavbar } from '@/hooks/useAnimations';

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  
  useAnimateNavbar(navRef);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} ref={navRef}>
      <div className={styles.left}>
        <div className={styles.brand}>The Predictive Architect</div>
      </div>
      
      <div className={styles.right}>
        <div className={styles.search}>
          <Search size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Search operations..." className={styles.searchInput} />
        </div>
        
        <Link href="/notifications" className={styles.iconBtn} aria-label="Notifications">
          <Bell size={20} />
        </Link>
        <button className={styles.iconBtn} aria-label="Settings">
          <Settings size={20} />
        </button>
        
        <div className={styles.avatar}>
          <img src="https://i.pravatar.cc/150?img=11" alt="Executive User" />
        </div>
      </div>
    </header>
  );
};
