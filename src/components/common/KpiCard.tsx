"use client";

import React, { useRef } from 'react';
import styles from './KpiCard.module.css';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useAnimateNumbers } from '@/hooks/useAnimations';

import { KpiColorType } from '@/types/common';
interface KpiCardProps {
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  colorType?: KpiColorType;
  trend?: number; // percentage, positive for up, negative for down
  trendLabel?: string;
  // simplified chart bars format: Array of percentages (0-100)
  chartData?: number[];
}

export const KpiCard = ({
  title,
  value,
  prefix = '',
  suffix = '',
  icon: Icon,
  colorType = 'primary',
  trend,
  trendLabel = '',
  chartData,
}: KpiCardProps) => {
  const numRef = useRef<HTMLSpanElement>(null);
  
  const animateTarget = typeof value === 'number' ? value : 0;
  useAnimateNumbers(numRef, animateTarget, suffix);

  const iconClass = styles[`${colorType}Icon`];
  
  let trendIcon = Minus;
  let trendClass = styles.trendNeutral;
  let trendFormatted = '0%';
  
  if (trend !== undefined) {
    if (trend > 0) {
      trendIcon = TrendingUp;
      trendClass = styles.trendUp;
      trendFormatted = `+${trend}%`;
    } else if (trend < 0) {
      trendIcon = TrendingDown;
      trendClass = styles.trendDown;
      trendFormatted = `${trend}%`;
    }
  }

  const TrendIcon = trendIcon;

  // Set the CSS variable for the accent color
  const accentColor = `var(--color-${colorType})`;

  return (
    <div 
      className={`gsap-card ${styles.card}`} 
      style={{ '--card-accent': accentColor } as React.CSSProperties}
    >
      <div className={styles.header}>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.valueContainer}>
            {prefix && <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{prefix}</span>}
            {typeof value === 'number' ? (
              <span className={styles.value} ref={numRef}>0{suffix}</span>
            ) : (
              <span className={styles.value} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}{suffix}</span>
            )}
          </div>
        </div>
        <div className={`${styles.iconWrapper} ${iconClass}`}>
          <Icon size={24} />
        </div>
      </div>

      {chartData && (
        <div className={styles.chartPlaceholder}>
          {chartData.map((val, idx) => {
             // For purely visual aesthetic we hardcode colors based on colorType, but we'll use inline styles safely.
             let bg = `var(--color-${colorType}-light, #d8e2ff)`;
             if (idx === chartData.length - 1) bg = `var(--color-${colorType})`;
             return (
               <div key={idx} className={styles.bar} style={{ height: `${val}%`, backgroundColor: bg }} />
             )
          })}
        </div>
      )}

      {trend !== undefined && (
        <div className={`${styles.footer} ${trendClass}`}>
          <TrendIcon size={14} />
          <span>{trendFormatted}</span>
          {trendLabel && <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 500, marginLeft: '4px' }}>{trendLabel}</span>}
        </div>
      )}
    </div>
  );
};
