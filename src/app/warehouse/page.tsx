"use client";

import React, { useRef } from 'react';
import styles from './page.module.css';
import { Package, Truck, AlertTriangle, Sparkles } from 'lucide-react';
import { useAnimateMapPins, useAnimateRouteLines, useAnimateCards } from '@/hooks/useAnimations';

export default function WarehouseMapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useAnimateMapPins(mapRef);
  useAnimateRouteLines(svgRef);
  useAnimateCards(panelRef, '.gsap-card');

  return (
    <div className={styles.warehousePage}>
      <div className={styles.mapContainer} ref={mapRef}>
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Map Background" 
          className={styles.mapImage}
        />
        
        {/* SVG Overlay for drawing premium routes */}
        <svg className={styles.mapSvgOverlay} ref={svgRef} xmlns="http://www.w3.org/2000/svg">
          <path className={`gsap-route ${styles.routeLine}`} d="M 200 300 Q 400 150 600 350 T 900 400" />
          <path className={`gsap-route ${styles.routeLineWarning}`} d="M 600 350 L 750 200" />
        </svg>

        {/* Pins */}
        <div className={`gsap-pin ${styles.pin}`} style={{ top: '300px', left: '200px' }}>
          <div className={styles.pinIcon}><Package size={16} /></div>
        </div>
        <div className={`gsap-pin ${styles.pin} ${styles.pinSecondary}`} style={{ top: '350px', left: '600px' }}>
          <div className={styles.pinIcon}><Truck size={16} /></div>
        </div>
        <div className={`gsap-pin ${styles.pin} ${styles.pinWarning}`} style={{ top: '200px', left: '750px' }}>
          <div className={styles.pinIcon}><AlertTriangle size={16} /></div>
        </div>
        <div className={`gsap-pin ${styles.pin}`} style={{ top: '400px', left: '900px' }}>
          <div className={styles.pinIcon}><Package size={16} /></div>
        </div>
      </div>

      <div className={styles.panel} ref={panelRef}>
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle}>Active Nodes</div>
        </div>
        
        <div className={styles.panelContent}>
          <div className={`gsap-card ${styles.listCard}`} style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}><Sparkles size={14} style={{display:'inline', marginRight:'4px'}} />Predictive Insight</span>
              <span style={{ fontSize: '10px', background: 'rgba(0,91,191,0.1)', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>LIVE</span>
            </div>
            <p className={styles.cardSubtitle} style={{ marginTop: '4px', color: 'var(--text-secondary)'}}>
              Congestion alert at <strong>ORD-04</strong>. Recommend rerouting Shipment N-422 to secondary hub to save 1.2 hours.
            </p>
          </div>

          <div className={`gsap-card ${styles.listCard}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>ORD-04 Central Hub</span>
              <Package size={16} color="var(--color-primary)" />
            </div>
            <span className={styles.cardSubtitle}>Chicago, IL • Distribution Center</span>
          </div>

          <div className={`gsap-card ${styles.listCard}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Fleet N-721</span>
              <Truck size={16} color="var(--color-secondary)" />
            </div>
            <span className={styles.cardSubtitle}>Route: ORD → LAX • Semi-Trailer</span>
          </div>

          <div className={`gsap-card ${styles.listCard}`} style={{ borderLeft: '4px solid var(--color-error)'}}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>JFK-02 East</span>
              <AlertTriangle size={16} color="var(--color-error)" />
            </div>
            <span className={styles.cardSubtitle}>Jamaica, NY • Cold Storage (Risk: 92/100)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
