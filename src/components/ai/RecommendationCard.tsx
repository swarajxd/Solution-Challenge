import React from 'react';
import { AlertTriangle, Zap } from 'lucide-react';
import { AIRecommendation } from '@/types/ai';

interface RecommendationCardProps {
  recommendation: AIRecommendation;
  onApply: (rec: AIRecommendation) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, onApply }) => {
  const isCritical = recommendation.severity === 'CRITICAL';
  const colorToken = isCritical ? 'error' : recommendation.severity === 'WARNING' ? 'warning' : 'primary';

  return (
    <div style={{
      marginTop: '12px',
      padding: '16px',
      backgroundColor: 'var(--color-surface-bg)',
      borderRadius: '8px',
      border: `1px solid var(--color-${colorToken})`,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <h5 style={{ 
        fontSize: '0.85rem', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px',
        color: `var(--color-${colorToken})`
      }}>
        {isCritical ? <AlertTriangle size={16} /> : <Zap size={16} />}
        {recommendation.title}
      </h5>
      <p style={{ 
        fontSize: '0.8rem', 
        color: 'var(--color-text-secondary)', 
        lineHeight: 1.4 
      }}>
        {recommendation.description}
      </p>
      
      {recommendation.actionId && (
        <button 
          onClick={() => onApply(recommendation)}
          disabled={recommendation.isApplied}
          style={{
            marginTop: '8px',
            alignSelf: 'flex-start',
            padding: '8px 16px',
            backgroundColor: recommendation.isApplied ? 'var(--color-secondary)' : 'var(--color-primary)',
            color: 'white',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '600',
            cursor: recommendation.isApplied ? 'not-allowed' : 'pointer',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s ease',
            opacity: recommendation.isApplied ? 0.8 : 1
          }}
          onMouseDown={(e) => {
             if (!recommendation.isApplied) e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onMouseUp={(e) => {
             if (!recommendation.isApplied) e.currentTarget.style.transform = 'scale(1)';
          }}
          onMouseLeave={(e) => {
             if (!recommendation.isApplied) e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {recommendation.isApplied ? "Applied ✓" : "Apply Action"}
        </button>
      )}
    </div>
  );
};
