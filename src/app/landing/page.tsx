"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { ArrowRight, Box, Zap, Lock, Globe, Share2 } from 'lucide-react';
import { useAnimateCards } from '@/hooks/useAnimations';

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimateCards(containerRef);

  return (
    <div className={styles.landingWrapper} ref={containerRef}>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 48px', alignItems: 'center' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Box size={24} /> Nexus Supply
        </div>
        <nav style={{ display: 'flex', gap: '32px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          <span style={{ cursor: 'pointer' }}>Solutions</span>
          <span style={{ cursor: 'pointer' }}>Platform</span>
          <span style={{ cursor: 'pointer' }}>Enterprise</span>
          <span style={{ cursor: 'pointer' }}>Pricing</span>
        </nav>
        <Link href="/" style={{ backgroundColor: 'var(--color-surface-low)', padding: '10px 24px', borderRadius: 'var(--radius-full)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Sign In
        </Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroBg}></div>
        <div className={`gsap-card ${styles.badge}`}>
          <Zap size={14} /> Nexus Engine v2 is now live
        </div>
        <h1 className={`gsap-card ${styles.title}`}>
          The operating system for <span>global supply chains.</span>
        </h1>
        <p className={`gsap-card ${styles.subtitle}`}>
          Predictive analytics, automated route optimization, and real-time risk assessment built into a single, lightning-fast platform.
        </p>
        <div className={`gsap-card ${styles.ctaGroup}`}>
          <Link href="/" className={styles.primaryBtn}>
            Launch Dashboard <ArrowRight size={20} />
          </Link>
          <button className={styles.secondaryBtn}>Read the Docs</button>
        </div>
      </section>

      <section style={{ backgroundColor: 'white' }}>
         <div className={styles.features}>
            <div className={`gsap-card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><Globe size={24} /></div>
              <h3>Global Visibility</h3>
              <p>Track every SKU, warehouse, and fleet in real-time across the planet with millisecond latency.</p>
            </div>
            <div className={`gsap-card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><Lock size={24} /></div>
              <h3>Risk Mitigation</h3>
              <p>Predictive AI algorithms alert you to geopolitical, weather, and supplier risks before they occur.</p>
            </div>
            <div className={`gsap-card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><Share2 size={24} /></div>
              <h3>Route Optimization</h3>
              <p>Save millions on fuel and transit time by utilizing dynamically altering logistic paths.</p>
            </div>
         </div>
      </section>
    </div>
  );
}
