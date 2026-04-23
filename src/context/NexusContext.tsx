"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { getRiskDashboardData } from '@/services/riskService';
import { getSimulationDashboardData } from '@/services/simulationService';
import { RiskIncident, RiskKpi } from '@/types/risk';
import { SimulationScenario, SimulationKpi } from '@/types/simulation';
import { ChatMessage, AIInsight, AIAlarm } from '@/types/ai';
import { generateId } from '@/utils/generateId';

export type GlobalRiskLevel = 'NORMAL' | 'WARNING' | 'CRITICAL';

export interface ToastNotification {
  id: string;
  message: string;
  exiting?: boolean;
}

interface NexusContextType {
  globalRiskLevel: GlobalRiskLevel;
  simulationRiskExposure: number;
  
  // Single Source of Truth Data
  incidents: RiskIncident[];
  riskKpis: RiskKpi[];
  simulationScenarios: SimulationScenario[];
  simulationKpis: SimulationKpi[];
  aiMessages: ChatMessage[];
  setAiMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  aiInsights: AIInsight[];
  setAiInsights: React.Dispatch<React.SetStateAction<AIInsight[]>>;
  
  // Status hooks
  isGlobalLoading: boolean;
  globalError: string | null;
  
  // Feedbacks
  notifications: ToastNotification[];
  hasTriggeredAiInsight: boolean;
  setHasTriggeredAiInsight: (val: boolean) => void;
  aiTriggeredAlarms: AIAlarm[];
  setAiTriggeredAlarms: React.Dispatch<React.SetStateAction<AIAlarm[]>>;
  
  // Actions
  applyRecommendation: (actionId: string) => void;
  runScenario: (scenarioId: string, impact: string, callback?: () => void) => void;
  triggerSimulation: (scenario: any) => Promise<void>;
  resolveIncident: (incidentId: string) => void;
  addNotification: (message: string) => void;
  removeNotification: (id: string) => void;
  retryGlobalFetch: () => void;
}

const NexusContext = createContext<NexusContextType | undefined>(undefined);

export const NexusProvider = ({ children }: { children: ReactNode }) => {
  const [incidents, setIncidents] = useState<RiskIncident[]>([]);
  const [riskKpis, setRiskKpis] = useState<RiskKpi[]>([]);
  const [simulationScenarios, setSimulationScenarios] = useState<SimulationScenario[]>([]);
  const [simulationKpis, setSimulationKpis] = useState<SimulationKpi[]>([]);
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);

  const [simulationRiskExposure, setSimulationRiskExposure] = useState<number>(28.4);
  const [isGlobalLoading, setIsGlobalLoading] = useState<boolean>(true);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<ToastNotification[]>([]);
  const [hasTriggeredAiInsight, setHasTriggeredAiInsight] = useState<boolean>(false);
  const [aiTriggeredAlarms, setAiTriggeredAlarms] = useState<AIAlarm[]>([]);

  const fetchUnifiedData = async () => {
    setIsGlobalLoading(true);
    setGlobalError(null);
    try {
      const saved = localStorage.getItem('nexus-state');
      
      const [riskData, simData] = await Promise.all([
        getRiskDashboardData(),
        getSimulationDashboardData()
      ]);
      
      setRiskKpis(riskData.kpis);
      setSimulationScenarios(simData.scenarios);
      setSimulationKpis(simData.kpis);

      if (saved) {
        // Hydrate from persistence
        const parsed = JSON.parse(saved);
        setIncidents(parsed.incidents);
        setSimulationRiskExposure(parsed.simulationRiskExposure);
        if (parsed.aiTriggeredAlarms) {
          setAiTriggeredAlarms(parsed.aiTriggeredAlarms);
        }
      } else {
        // Initial setup
        setIncidents(riskData.incidents);
        const targetSimKpi = simData.kpis.find(k => k.id === 'sim-kpi-3');
        if (targetSimKpi) {
           setSimulationRiskExposure(targetSimKpi.value);
        }
      }
    } catch (err) {
      setGlobalError('Failed to establish unified system connection.');
    } finally {
      setIsGlobalLoading(false);
    }
  };

  // 2. Load data ONLY ONCE globally
  useEffect(() => {
    fetchUnifiedData();
    
    // Auto cleanup logic - remove alarms older than 5 minutes
    const now = Date.now();
    setAiTriggeredAlarms(prev => prev.filter(a => now - a.timestamp < 300000));
  }, []);

  const retryGlobalFetch = () => {
    fetchUnifiedData();
  };

  // 3. LocalStorage persistence watcher
  useEffect(() => {
    if (!isGlobalLoading) {
      localStorage.setItem('nexus-state', JSON.stringify({
        simulationRiskExposure,
        incidents,
        aiTriggeredAlarms
      }));
    }
  }, [simulationRiskExposure, incidents, isGlobalLoading]);

  // 5. Derived state for globalRiskLevel
  const globalRiskLevel = useMemo<GlobalRiskLevel>(() => {
    if (simulationRiskExposure > 25) return 'CRITICAL';
    if (simulationRiskExposure > 14.5) return 'WARNING';
    return 'NORMAL';
  }, [simulationRiskExposure]);

  // Toast controls via refs or timeouts
  const addNotification = (message: string) => {
    const id = generateId();
    setNotifications(prev => [...prev, { id, message }]);
    
    // Auto cleanup logic with exit animation buffer
    const exitTimer = setTimeout(() => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, exiting: true } : n));
      
      const unmountTimer = setTimeout(() => {
        removeNotification(id);
      }, 400);
    }, 4500);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Centralized Application Logic
  const applyRecommendation = (actionId: string) => {
    // Prevent duplicate execution
    const isAlreadyApplied = aiMessages.some(m => m.recommendation?.actionId === actionId && m.recommendation.isApplied);
    if (isAlreadyApplied) return;

    // Mutate the specific recommendation to applied
    setAiMessages(prev => prev.map(msg => {
      if (msg.recommendation?.actionId === actionId) {
        return { ...msg, recommendation: { ...msg.recommendation, isApplied: true } };
      }
      return msg;
    }));

    // Modify the exposure immediately
    setSimulationRiskExposure(14.2);
    
    // Purge CRITICAL risks universally from the single source array!
    setIncidents(prev => prev.filter(i => i.severity !== 'CRITICAL'));
    
    addNotification("AI recommendation applied successfully. Network updated.");
  };

  const runScenario = (scenarioId: string, impact: string, callback?: () => void) => {
    setTimeout(() => {
      setSimulationScenarios(prev => 
        prev.map(s => s.id === scenarioId ? { ...s, status: 'COMPLETE', impact } : s)
      );
      
      setSimulationRiskExposure(16.5); // A mid risk change showing warning bounds
      addNotification("Simulation detected increased delay risk adjustments.");
      
      if (callback) callback();
    }, 1500);
  };

  const triggerSimulation = async (scenario: any) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (scenario.id === "demand-spike") setSimulationRiskExposure(32);
        if (scenario.id === "port-delay") {
          setSimulationRiskExposure(45);
          setIncidents(prev => [{
            id: generateId(),
            severity: 'CRITICAL',
            loc: 'Global Port Hub',
            impact: 'Severe transit delays',
            action: 'Pending Optimization'
          } as RiskIncident, ...prev]);
        }
        if (scenario.id === "fuel-cost") setSimulationRiskExposure(22);

        addNotification(`Simulation completed: ${scenario.title}`);
        resolve();
      }, 1800);
    });
  };

  const resolveIncident = (id: string) => {
    setIncidents(prev => prev.filter(i => i.id !== id));
    addNotification("Incident resolved");
  };

  return (
    <NexusContext.Provider 
      value={{
        globalRiskLevel,
        simulationRiskExposure,
        incidents, riskKpis, simulationScenarios, simulationKpis,
        aiMessages, setAiMessages, aiInsights, setAiInsights,
        isGlobalLoading, globalError,
        notifications, hasTriggeredAiInsight, setHasTriggeredAiInsight,
        aiTriggeredAlarms, setAiTriggeredAlarms,
        applyRecommendation, runScenario, triggerSimulation, resolveIncident, addNotification, removeNotification, retryGlobalFetch
      }}
    >
      {children}
    </NexusContext.Provider>
  );
};

export const useNexusContext = () => {
  const context = useContext(NexusContext);
  if (!context) throw new Error('useNexusContext must be used within NexusProvider');
  return context;
};
