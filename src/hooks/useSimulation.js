import { useEffect } from "react";
import { useApp } from "@/context/AppContext";

export default function useSimulation() {
  const { 
    setWarehouses, 
    setKpis, 
    setInsights 
  } = useApp();

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Update Warehouses
      let hasCritical = false;
      setWarehouses((prev) => {
        const updated = prev.map(w => {
          const drift = Math.floor(Math.random() * 7) - 3;
          const newUtil = Math.min(100, Math.max(10, w.utilizationPct + drift));
          if (newUtil > 90) hasCritical = true;
          return {
            ...w,
            utilizationPct: newUtil,
            status: newUtil > 90 ? "critical" : newUtil > 75 ? "warning" : "active"
          };
        });
        return updated;
      });

      // 2. Update Dashboard KPIs based on congestion
      setKpis((prev) => prev.map((kpi) => {
        if (kpi.id === 'risk-level') {
          const newValue = hasCritical ? 4 : 2;
          return { ...kpi, value: newValue, trend: hasCritical ? 25 : 0 };
        }
        if (kpi.id === 'total-shipments') {
          return { ...kpi, value: kpi.value + Math.floor(Math.random() * 3) };
        }
        return kpi;
      }));

      // 3. Randomly simulate a Route Delay
      if (Math.random() > 0.9) {
        setInsights((prev) => {
          const newInsight = {
            id: `INS-${Date.now()}`,
            severity: 'warning',
            title: 'Unexpected Delay Detected',
            description: 'Heavy traffic surge affecting active fleet ETA.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          return [newInsight, ...prev].slice(0, 5);
        });
      }

    }, 5000);

    return () => clearInterval(interval);
  }, [setWarehouses, setKpis, setInsights]);
}
