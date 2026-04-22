"use client";

import React, { useRef, useState } from 'react';
import styles from './page.module.css';
import { Send, Zap } from 'lucide-react';
import { useAnimateChatMessages, useAnimateCards } from '@/hooks/useAnimations';

export default function AIAssistantPage() {
  const chatRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I am the Nexus Intelligence engine. I noticed potential congestion at ORD-04. How would you like to handle ship N-422?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useAnimateChatMessages(chatRef, '.gsap-message');
  useAnimateCards(sidebarRef, '.gsap-insight');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMsg = { id: Date.now(), type: 'user', text: inputValue };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // Fake bot response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: 'Simulation completed. Rerouting via MDW-01 will save approximately 1.2 hours and reduce fuel burn by 4%.'
      }]);
    }, 1500);
  };

  return (
    <div className={styles.aiPage}>
      <div className={styles.chatArea}>
        <div className={styles.chatHistory} ref={chatRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`gsap-message ${styles.message} ${msg.type === 'user' ? styles.messageUser : styles.messageBot}`}>
              <div className={styles.bubble}>{msg.text}</div>
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
        </div>

        <div className={styles.inputArea}>
          <div className={styles.inputBox}>
            <input 
              type="text" 
              className={styles.inputField} 
              placeholder="Ask about inventory, logistics, or risk..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className={styles.sendBtn} onClick={handleSend}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.insightSidebar} ref={sidebarRef}>
        <div className={`gsap-insight ${styles.insightCard}`}>
          <h4><Zap size={16} color="var(--color-secondary)" /> Route Optimized</h4>
          <p>We rerouted 14 shipments yesterday resulting in a 12% operational efficiency gain.</p>
        </div>
        
        <div className={`gsap-insight ${styles.insightCard}`} style={{borderLeftColor: 'var(--color-error)'}}>
          <h4><Zap size={16} color="var(--color-error)" /> Weather Alert Active</h4>
          <p>Alpine pass disruption expected for the next 48 hours. Forecast model activated.</p>
        </div>
      </div>
    </div>
  );
}
