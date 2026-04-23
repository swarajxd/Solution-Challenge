"use client";

import React, { useRef, useState } from 'react';
import styles from '../page.module.css';
import { PlayCircle, Loader2, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import { useAnimateCards } from '@/hooks/useAnimations';
import { useNexusContext } from '@/context/NexusContext';
import { scenarios, InteractiveScenario } from '@/data/simulationData';

export default function SimulationPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedScenario, setSelectedScenario] = useState<InteractiveScenario | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [previousExposure, setPreviousExposure] = useState<number | null>(null);

  const { 
    simulationRiskExposure, 
    triggerSimulation, 
    isGlobalLoading, 
    globalError, 
    retryGlobalFetch
  } = useNexusContext();

  useAnimateCards(containerRef);

  const handleRun = async () => {
    if (!selectedScenario || isRunning) return;
    
    setPreviousExposure(simulationRiskExposure);
    setIsRunning(true);
    
    try {
      await triggerSimulation(selectedScenario);
    } catch (error) {
      // Handled silently globally or captured
    } finally {
      setIsRunning(false);
    }
  };

  if (isGlobalLoading) {
    return (
      <div className={styles.dashboard} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
           <Loader2 className="animate-spin" size={20} /> Loading Simulation Environment...
        </p>
      </div>
    );
  }

  if (globalError) {
    return (
      <div className={styles.dashboard} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
        <p style={{ color: 'var(--color-error)' }}>{globalError}</p>
        <button onClick={retryGlobalFetch} style={{ padding: '8px 16px', background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>Retry Connection</button>
      </div>
    );
  }

  return (
    <div className={styles.dashboard} ref={containerRef}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>WOW Engine Simulation</h1>
          <p className={styles.subtitle}>Test supply chain resilience against custom hypotheticals.</p>
        </div>
        <button 
          className="gsap-card" 
          onClick={handleRun}
          disabled={!selectedScenario || isRunning}
          style={{ 
            backgroundColor: !selectedScenario ? 'var(--color-surface-low)' : 'var(--color-primary)', 
            color: !selectedScenario ? 'var(--color-text-tertiary)' : 'white', 
            padding: '12px 24px', 
            borderRadius: 'var(--radius-full)', 
            fontWeight: 'bold', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            border: 'none',
            boxShadow: !selectedScenario ? 'none' : '0 4px 15px rgba(0,91,191,0.2)',
            cursor: !selectedScenario || isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.7 : 1,
            transition: 'all 0.3s ease'
          }}>
          {isRunning ? <Loader2 size={18} className="animate-spin" /> : <PlayCircle size={18} />} 
          {isRunning ? 'RUNNING...' : 'Run Simulation'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', marginTop: '24px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', marginBottom: '8px' }}>Select Scenario Map</h3>
          {scenarios.map((scenario) => {
            const isSelected = selectedScenario?.id === scenario.id;
            return (
              <div 
                key={scenario.id}
                className="gsap-card"
                onClick={() => !isRunning && setSelectedScenario(scenario)}
                style={{
                  padding: '24px',
                  backgroundColor: isSelected ? 'rgba(0, 91, 191, 0.05)' : 'var(--color-surface-card)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                  borderRadius: '12px',
                  cursor: isRunning ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: isRunning && !isSelected ? 0.5 : 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '4px', color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)' }}>
                    {scenario.title}
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{scenario.description}</p>
                </div>
                <div style={{
                  padding: '6px 12px',
                  backgroundColor: scenario.impact === 'CRITICAL' ? 'rgba(186, 26, 26, 0.1)' : scenario.impact === 'HIGH' ? 'rgba(255, 179, 71, 0.1)' : 'rgba(10, 207, 131, 0.1)',
                  color: scenario.impact === 'CRITICAL' ? 'var(--color-error)' : scenario.impact === 'HIGH' ? 'var(--color-warning)' : 'var(--color-secondary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {scenario.impact} IMPACT
                </div>
              </div>
            );
          })}
        </div>

        <div className="gsap-card" style={{ 
          backgroundColor: 'var(--color-surface-card)', 
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: '24px',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <Zap size={32} style={{ color: 'var(--color-primary)', marginBottom: '16px', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>System Result</h3>
          
          <div style={{ marginTop: '24px', width: '100%' }}>
            <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.85rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Risk Exposure</p>
            
            {previousExposure !== null ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '2rem', fontWeight: 'bold' }}>
                <span style={{ color: 'var(--color-text-secondary)', textDecoration: 'line-through', opacity: 0.5 }}>{previousExposure}%</span>
                <span style={{ color: 'var(--color-text-tertiary)' }}>→</span>
                <span style={{ 
                  color: simulationRiskExposure > previousExposure ? 'var(--color-error)' : 'var(--color-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {simulationRiskExposure}% 
                  {simulationRiskExposure > previousExposure ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
                </span>
              </div>
            ) : (
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                {simulationRiskExposure}%
              </div>
            )}
            
            {isRunning && (
              <p style={{ color: 'var(--color-primary)', fontSize: '0.85rem', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Loader2 size={14} className="animate-spin" /> Recalculating nodes...
              </p>
            )}
            {!isRunning && previousExposure !== null && (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginTop: '16px' }}>
                Simulation completed. System topology updated.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
