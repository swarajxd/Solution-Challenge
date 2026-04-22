"use client";

import React, { useRef } from 'react';
import styles from './KpiCard.module.css';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useAnimateNumbers } from '@/hooks/useAnimations';

export type KpiColorType = 'primary' | 'secondary' | 'warning' | 'error';

interface KpiCardProps {
  title: string;
  value: number;
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
  
  useAnimateNumbers(numRef, value, suffix);

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

  return (
    <div className={`gsap-card ${styles.card}`}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.valueContainer}>
            {prefix && <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{prefix}</span>}
            <span className={styles.value} ref={numRef}>0{suffix}</span>
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
