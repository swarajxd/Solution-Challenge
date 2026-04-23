import { ChatMessage, AIInsight } from '../types/ai';
import { mockInitialMessages, mockInsights } from '../data/aiData';
import { generateId } from '../utils/generateId';

export const getAiMessages = async (): Promise<ChatMessage[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockInitialMessages]);
    }, 800);
  });
};

export const getAiInsights = async (): Promise<AIInsight[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockInsights]);
    }, 1000);
  });
};

export const sendAiMessage = async (text: string, riskLevel: string = 'NORMAL'): Promise<ChatMessage> => {
  return new Promise((resolve, reject) => {
    // 800 - 1200ms delay
    const delay = Math.floor(Math.random() * 400) + 800;
    setTimeout(() => {
      // 10% error simulation
      if (Math.random() < 0.1) {
        return reject(new Error('Nexus Intelligence engine timeout.'));
      }

      const lowerText = text.toLowerCase();
      let responseText = "I've analyzed the supply chain network. All primary nodes are functioning within expected parameters. How else can I assist?";
      let recommendation;

      if (lowerText.includes('delay')) {
        responseText = "I've detected a significant delay forming at MDW-01. Current transit estimates suggest a 14-hour holdup.";
        recommendation = { 
          title: "Optimize MDW-01 Queue", 
          description: "Reallocate incoming freight to secondary processing lanes to reduce delay.", 
          severity: 'WARNING', 
          actionId: 'OPT_MDW_01' 
        } as const;
      } else if (lowerText.includes('risk')) {
        responseText = `Current system risk is ${riskLevel}. ${
          riskLevel === "CRITICAL"
            ? "Immediate mitigation recommended."
            : "System is stable."
        }`;
        recommendation = { 
          title: "Lock Path A9", 
          description: "Initiate system block on Alpine pass A9 to prevent unmitigated risk.", 
          severity: 'CRITICAL', 
          actionId: 'LOCK_A9' 
        } as const;
      } else if (lowerText.includes('route')) {
        responseText = "Rerouting via alternative Node 4 will save approximately 1.2 hours and reduce fuel burn by 4%. Do you want to apply this path?";
        recommendation = { 
          title: "Reroute N-422", 
          description: "Divert logistics to Node 4 to avoid predicted congestion.", 
          severity: 'WARNING', 
          actionId: 'REROUTE_N422' 
        } as const;
      } else if (lowerText.includes('inventory')) {
         responseText = "Stock levels for 'Alpha Components' at the Seattle warehouse will drop below safe thresholds by next Wednesday.";
         recommendation = { 
          title: "Expedite Inventory", 
          description: "Shift Alpha Component surplus from Denver to Seattle.", 
          severity: 'INFO', 
          actionId: 'EXP_DEN_SEA' 
        } as const;
      }

      resolve({
        id: generateId(),
        type: 'bot',
        text: responseText,
        recommendation
      });
    }, delay);
  });
};
