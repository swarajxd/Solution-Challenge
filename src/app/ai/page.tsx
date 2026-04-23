"use client";

import React, { useRef, useState, useEffect } from 'react';
import styles from './page.module.css';
import { Send, Zap, AlertTriangle, Target, Loader2 } from 'lucide-react';
import { useAnimateChatMessages, useAnimateCards } from '@/hooks/useAnimations';
import { ChatMessage, AIInsight, AIRecommendation } from '@/types/ai';
import { sendAiMessage } from '@/services/aiService';
import { useNexusContext } from '@/context/NexusContext';
import { suggestedPrompts } from '@/data/aiData';
import { RecommendationCard } from '@/components/ai/RecommendationCard';
import { generateId } from '@/utils/generateId';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  AlertTriangle,
  Target
};

export default function AIAssistantPage() {
  const chatRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { 
    globalRiskLevel, 
    applyRecommendation: contextApplyRecommendation,
    hasTriggeredAiInsight, setHasTriggeredAiInsight,
    isGlobalLoading,
    aiMessages: messages, setAiMessages: setMessages,
    aiInsights: insights, setAiInsights: setInsights,
    simulationRiskExposure,
    incidents,
    aiTriggeredAlarms, setAiTriggeredAlarms
  } = useNexusContext();
  
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const localTriggerRef = useRef(new Set<string>());

  useAnimateChatMessages(chatRef, '.gsap-message');
  useAnimateCards(sidebarRef, '.gsap-insight');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // AUTO AI INTELLIGENCE ENGINE
  useEffect(() => {
    if (isGlobalLoading) return;

    if (globalRiskLevel === 'NORMAL' && aiTriggeredAlarms.length > 0) {
      setAiTriggeredAlarms([]);
      localTriggerRef.current.clear();
    }

    // 1. Demand Spike Warning
    if (simulationRiskExposure > 30 && !aiTriggeredAlarms.some(a => a.type === 'demand-spike') && !localTriggerRef.current.has('demand-spike')) {
      localTriggerRef.current.add('demand-spike');
      setAiTriggeredAlarms(prev => [...prev, { id: generateId(), type: 'demand-spike', timestamp: Date.now() }]);
      setMessages(prev => [...prev, {
        id: generateId(),
        type: 'bot',
        text: '⚠️ [HIGH PRIORITY] Demand spike detected. Consider scaling supply chain capacity.'
      }]);
    }

    // 2. Weather Alert from Port Delay Simulation (which pushes exposure exactly to 45)
    if (simulationRiskExposure === 45 && !aiTriggeredAlarms.some(a => a.type === 'weather-alert') && !localTriggerRef.current.has('weather-alert')) {
      localTriggerRef.current.add('weather-alert');
      setAiTriggeredAlarms(prev => [...prev, { id: generateId(), type: 'weather-alert', timestamp: Date.now() }]);
      setMessages(prev => [...prev, {
        id: generateId(),
        type: 'bot',
        text: '🌧️ [MEDIUM PRIORITY] Weather disruption expected. Logistics delay risk increased.'
      }]);
    }

    // 3. Route Optimization Alert (Checking delay incidents)
    const hasDelay = incidents.some(i => i.impact?.toLowerCase().includes('delay') || i.loc?.toLowerCase().includes('delay'));
    if (hasDelay && !aiTriggeredAlarms.some(a => a.type === 'route-inefficiency') && !localTriggerRef.current.has('route-inefficiency')) {
      localTriggerRef.current.add('route-inefficiency');
      setAiTriggeredAlarms(prev => [...prev, { id: generateId(), type: 'route-inefficiency', timestamp: Date.now() }]);
      setMessages(prev => [...prev, {
        id: generateId(),
        type: 'bot',
        text: '🚚 [HIGH PRIORITY] Route inefficiencies detected. AI recommends rerouting shipments.',
        recommendation: {
          title: "Reroute Active Fleet",
          description: "Divert logistics around delayed node to maintain SLA.",
          severity: 'WARNING',
          actionId: 'AUTO_REROUTE'
        }
      }]);
    }

    // 4. Stock Shortage Warning
    const hasInventory = incidents.some(i => 
      i.loc?.toLowerCase().includes('warehouse') || 
      i.impact?.toLowerCase().includes('inventory') || 
      i.impact?.toLowerCase().includes('stock')
    );
    if (hasInventory && !aiTriggeredAlarms.some(a => a.type === 'stock-shortage') && !localTriggerRef.current.has('stock-shortage')) {
      localTriggerRef.current.add('stock-shortage');
      setAiTriggeredAlarms(prev => [...prev, { id: generateId(), type: 'stock-shortage', timestamp: Date.now() }]);
      setMessages(prev => [...prev, {
        id: generateId(),
        type: 'bot',
        text: '📦 [MEDIUM PRIORITY] Potential stock shortage detected. Consider increasing inventory.'
      }]);
    }

  }, [simulationRiskExposure, incidents, globalRiskLevel, isGlobalLoading, aiTriggeredAlarms, setAiTriggeredAlarms, setMessages]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || inputValue;
    if (!textToSend.trim() || isTyping) return;
    
    // Add user message
    const newMsg: ChatMessage = { id: generateId(), type: 'user', text: textToSend };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    const attemptSend = async (retryCount = 0) => {
      try {
        const response = await sendAiMessage(newMsg.text, globalRiskLevel);
        setMessages(prev => {
          const filtered = prev.filter(m => m.id !== 'temp-retry');
          return [...filtered, response];
        });
        setIsTyping(false);
      } catch (err) {
        if (retryCount === 0) {
          setMessages(prev => [
            ...prev, 
            { 
              id: 'temp-retry', 
              type: 'bot', 
              text: 'Simulation processing delayed. Retrying...' 
            }
          ]);
        }
        // Silently retry to fix dropped sockets
        setTimeout(() => attemptSend(retryCount + 1), 1000);
      }
    };
    
    attemptSend();
  };

  const applyRecommendation = (rec: AIRecommendation) => {
    // If it's already applied or we are typing, ignore
    if (rec.isApplied || isTyping) return;

    // WOW Interaction: Applying an AI scenario drops a success message
    const successMsg: ChatMessage = {
      id: generateId(),
      type: 'bot',
      text: `✅ System Action Applied: ${rec.title}. Network topology updating.`
    };
    setMessages(prev => [...prev, successMsg]);
    
    // Impact global architecture strictly through Context
    contextApplyRecommendation(rec.actionId);

    // Also inject a new Insight dynamically to link the UI response
    setInsights(prev => [
      {
        id: generateId(),
        title: rec.title,
        description: `Active applied scenario: ${rec.description}`,
        icon: 'Zap',
        colorType: 'primary'
      },
      ...prev
    ]);
  };

  if (isGlobalLoading) {
    return (
      <div className={styles.aiPage} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)' }}>
          <Loader2 size={24} className="animate-spin" /> Fetching latest Nexus parameters...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.aiPage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <p style={{ color: 'var(--color-error)' }}>{error}</p>
        <button onClick={() => window.location.reload()} style={{ padding: '8px 16px', background: 'var(--color-surface-low)', borderRadius: '8px' }}>Retry Connection</button>
      </div>
    );
  }

  return (
    <div className={styles.aiPage}>
      <div className={styles.chatArea}>
        <div className={styles.chatHistory} ref={chatRef}>
          {messages.length === 0 && (
            <div className={styles.message} style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', width: '100%', marginTop: 'auto', marginBottom: 'auto' }}>
              <Zap size={32} style={{ opacity: 0.2, marginBottom: '16px' }} />
              <p>Ask about risks, delays, or optimization strategies</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
                {suggestedPrompts.map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    disabled={isTyping}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'var(--color-surface-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '16px',
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.8rem',
                      cursor: isTyping ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      opacity: isTyping ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                       if (!isTyping) {
                         e.currentTarget.style.borderColor = 'var(--color-primary)';
                         e.currentTarget.style.color = 'var(--color-text-primary)';
                       }
                    }}
                    onMouseLeave={(e) => {
                       if (!isTyping) {
                         e.currentTarget.style.borderColor = 'var(--color-border)';
                         e.currentTarget.style.color = 'var(--color-text-secondary)';
                       }
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`gsap-message ${styles.message} ${msg.type === 'user' ? styles.messageUser : styles.messageBot}`}>
              <div className={styles.bubble}>
                {msg.text}
                {msg.recommendation && (
                  <RecommendationCard 
                    recommendation={msg.recommendation} 
                    onApply={applyRecommendation} 
                  />
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={`gsap-message ${styles.message} ${styles.messageBot}`}>
              <div className={styles.bubble}>
                <div className={styles.typing}>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputArea}>
          <div className={styles.inputBox} style={{ opacity: isTyping ? 0.6 : 1 }}>
            <input 
              type="text" 
              className={styles.inputField} 
              placeholder="Ask about inventory, logistics, or risk..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
              disabled={isTyping}
            />
            <button className={styles.sendBtn} onClick={() => handleSend()} disabled={isTyping || !inputValue.trim()} style={{ opacity: isTyping || !inputValue.trim() ? 0.5 : 1 }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.insightSidebar} ref={sidebarRef}>
        {insights.length === 0 && (
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.9rem' }}>No active insights</p>
        )}
        {insights.map((insight) => {
          const IconComponent = iconMap[insight.icon] || Zap;
          return (
            <div 
              key={insight.id} 
              className={`gsap-insight ${styles.insightCard}`} 
              style={{ borderLeftColor: `var(--color-${insight.colorType})` }}
            >
              <h4>
                <IconComponent size={16} color={`var(--color-${insight.colorType})`} /> 
                {insight.title}
              </h4>
              <p>{insight.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
