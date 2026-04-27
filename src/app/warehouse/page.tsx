"use client";

import React, { useRef, useState } from 'react';
import styles from './page.module.css';
import { Package, Truck, AlertTriangle, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { useAnimateMapPins, useAnimateRouteLines, useAnimateCards } from '@/hooks/useAnimations';
import {
  activeFleets,
  optimizedRoutes,
  predictiveInsights,
  type WarehouseNode,
  type FleetVehicle,
} from '@/data/dashboardData';
import { useApp } from '@/context/AppContext';
import useSimulation from '@/hooks/useSimulation';

// Resolve icon name → Lucide component
const nodeIconMap: Record<WarehouseNode['iconName'], React.ComponentType<{ size?: number; color?: string }>> = {
  Package,
  Truck,
  AlertTriangle,
  Warehouse: Package, // fallback
};

const statusColors: Record<WarehouseNode['status'], string> = {
  active:   'var(--color-secondary)',
  warning:  'var(--color-warning)',
  critical: 'var(--color-error)',
  idle:     'var(--color-text-tertiary)',
};

const statusBorderMap: Record<WarehouseNode['status'], string> = {
  active:   '1px solid var(--color-border)',
  warning:  '4px solid var(--color-warning)',
  critical: '4px solid var(--color-error)',
  idle:     '1px solid var(--color-border)',
};

const fleetStatusColor: Record<FleetVehicle['status'], string> = {
  'En Route': 'var(--color-primary)',
  'Loading':  'var(--color-secondary)',
  'Idle':     'var(--color-text-tertiary)',
  'Delayed':  'var(--color-error)',
};

const getStatusClass = (status: WarehouseNode['status']) => {
  if (status === 'critical') return styles['pulse-red'];
  if (status === 'warning') return styles['pulse-yellow'];
  return styles['pulse-green'];
};

export default function WarehouseMapPage() {
  const mapRef   = useRef<HTMLDivElement>(null);
  const svgRef   = useRef<SVGSVGElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const { warehouses } = useApp() as { warehouses: WarehouseNode[] };
  useSimulation();

  useAnimateMapPins(mapRef);
  useAnimateRouteLines(svgRef);
  useAnimateCards(panelRef, '.gsap-card');

  const selectedNode = warehouses.find(n => n.id === selectedNodeId);
  const warehouseInsights = predictiveInsights.filter(i => i.affectedNode);

  return (
    <div className={styles.warehousePage}>
      {/* ── Map ── */}
      <div className={styles.mapContainer} ref={mapRef}>
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Map Background"
          className={styles.mapImage}
        />

        {/* SVG route overlays from mock data */}
        <svg className={styles.mapSvgOverlay} ref={svgRef} xmlns="http://www.w3.org/2000/svg">
          {optimizedRoutes.map((route) => (
            <g key={route.id}>
              <path className={`gsap-route ${styles.routeLine}`} d={route.svgPath} />
              {route.svgPathWarning && (
                <path className={`gsap-route ${styles.routeLine} ${styles.routeLineWarning}`} d={route.svgPathWarning} />
              )}
            </g>
          ))}
        </svg>

        {/* Pins from dynamic simulated warehouses */}
        {warehouses.map((node) => {
          const Icon = nodeIconMap[node.iconName];
          const pulseClass = getStatusClass(node.status);
          const pinClass = `gsap-pin ${styles.pin} ${pulseClass}`;

          return (
            <div
              key={node.id}
              className={pinClass}
              style={{ top: node.pin.top, left: node.pin.left }}
              onClick={() => setSelectedNodeId(node.id === selectedNodeId ? null : node.id)}
              title={node.name}
            >
              <div className={styles.pinIcon}>
                <Icon size={15} />
              </div>
              {/* Tooltip label */}
              <div style={{
                position: 'absolute',
                bottom: '110%',
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                background: 'var(--color-text-primary)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                pointerEvents: 'none',
                opacity: selectedNodeId === node.id ? 1 : 0,
                transition: 'opacity 0.2s',
              }}>
                {node.id}
              </div>
            </div>
          );
        })}

        {/* Fleet NEX-721 badge overlay */}
        <div style={{
          position: 'absolute', bottom: '24px', left: '24px',
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          borderRadius: 'var(--radius-md)', padding: '12px 16px',
          border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-hover)',
          fontSize: '0.8rem', zIndex: 30,
        }}>
          <div style={{ fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Truck size={14} color="var(--color-primary)" /> Live Fleet Tracking
          </div>
          <div style={{ color: 'var(--color-text-tertiary)' }}>{activeFleets.length} vehicles active right now</div>
        </div>
      </div>

      {/* ── Side Panel ── */}
      <div className={styles.panel} ref={panelRef}>
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle}>
            {selectedNode ? selectedNode.name : 'Network Nodes'}
          </div>
          {selectedNode && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              marginTop: '4px', fontSize: '0.7rem', fontWeight: 700,
              color: statusColors[selectedNode.status],
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColors[selectedNode.status] }} />
              {selectedNode.status.toUpperCase()}
            </div>
          )}
        </div>

        <div className={styles.panelContent}>
          {/* ─ AI Insight ─ */}
          {warehouseInsights.slice(0, 1).map((insight) => (
            <div key={insight.id} className={`gsap-card ${styles.listCard}`}
              style={{ borderLeft: '4px solid var(--color-primary)' }}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  <Sparkles size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  Predictive Insight
                </span>
                <span style={{
                  fontSize: '10px', background: 'rgba(0,91,191,0.1)', color: 'var(--color-primary)',
                  padding: '2px 8px', borderRadius: '10px', fontWeight: 700,
                }}>LIVE</span>
              </div>
              <p className={styles.cardSubtitle} style={{ marginTop: '4px', lineHeight: 1.5 }}>
                {insight.description}
              </p>
              {insight.potentialSaving && (
                <p style={{ marginTop: '6px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
                  💡 {insight.potentialSaving}
                </p>
              )}
            </div>
          ))}

          {/* ─ Selected Node Detail ─ */}
          {selectedNode && (
            <div className={`gsap-card ${styles.listCard} ${styles.selectedCard}`} style={{ borderLeft: statusBorderMap[selectedNode.status] }}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>{selectedNode.id}</span>
                <span className={styles.badge} style={{ background: `${statusColors[selectedNode.status]}15`, color: statusColors[selectedNode.status] }}>
                  {selectedNode.type}
                </span>
              </div>
              <p className={styles.cardSubtitle}>{selectedNode.city}, {selectedNode.region}</p>
              
              {/* Utilization bar */}
              <div className={styles.utilizationBar}>
                <div className={styles.utilizationFill} style={{
                  width: `${selectedNode.utilizationPct}%`,
                  background: statusColors[selectedNode.status],
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-tertiary)' }}>Capacity Utilization</span>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: statusColors[selectedNode.status] }}>{selectedNode.utilizationPct}%</span>
              </div>

              <div className={styles.riskContainer}>
                <div className={styles.riskItem}>
                  <div className={styles.riskLabel}>Risk Score</div>
                  <div className={styles.riskValue} style={{ color: selectedNode.riskScore > 70 ? 'var(--color-error)' : 'var(--color-text-primary)' }}>
                    {selectedNode.riskScore}/100
                  </div>
                </div>
                <div className={styles.riskItem}>
                  <div className={styles.riskLabel}>Active Fleets</div>
                  <div className={styles.riskValue}>{selectedNode.activeFleets}</div>
                </div>
              </div>

              {selectedNode.alert && (
                <div className={styles.alertBox}>
                  <AlertTriangle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  {selectedNode.alert}
                </div>
              )}
            </div>
          )}

          {/* ─ All Warehouse Nodes ─ */}
          {warehouses.map((node) => {
            const Icon = nodeIconMap[node.iconName];
            return (
              <div
                key={node.id}
                className={`gsap-card ${styles.listCard}`}
                style={{
                  borderLeft: statusBorderMap[node.status],
                  outline: selectedNodeId === node.id ? '2px solid var(--color-primary)' : 'none',
                  outlineOffset: '2px',
                }}
                onClick={() => setSelectedNodeId(node.id === selectedNodeId ? null : node.id)}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>{node.name}</span>
                  <Icon size={15} color={statusColors[node.status]} />
                </div>
                <span className={styles.cardSubtitle}>{node.city}, {node.region} · {node.type}</span>
                <div style={{ marginTop: '6px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ flex: 1, height: '4px', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${node.utilizationPct}%`,
                      background: statusColors[node.status],
                      borderRadius: 'var(--radius-full)',
                    }} />
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: statusColors[node.status] }}>{node.utilizationPct}%</span>
                </div>
              </div>
            );
          })}

          {/* ─ Active Fleets ─ */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', marginTop: '4px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={14} /> Active Fleets
            </div>
            {activeFleets.map((fleet) => (
              <div key={fleet.id} className={`gsap-card ${styles.listCard}`} style={{ marginBottom: '8px' }}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>{fleet.name}</span>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: `${fleetStatusColor[fleet.status]}18`,
                    color: fleetStatusColor[fleet.status],
                  }}>
                    {fleet.status}
                  </span>
                </div>
                <span className={styles.cardSubtitle}>{fleet.origin} → {fleet.destination} · {fleet.vehicleType}</span>
                <div style={{ marginTop: '6px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ flex: 1, height: '4px', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${fleet.progress}%`,
                      background: fleetStatusColor[fleet.status],
                      borderRadius: 'var(--radius-full)',
                    }} />
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={10} /> {fleet.eta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
