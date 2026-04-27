import { useEffect } from "react";
import { useApp } from "@/context/AppContext";

export default function useSimulation() {
  const { warehouses, setWarehouses } = useApp();

  useEffect(() => {
    if (warehouses.length === 0) return;

    const interval = setInterval(() => {
      const updated = warehouses.map(w => {
        const capacityLoad = Math.floor(Math.random() * 100);

        return {
          ...w,
          capacityLoad,
          status:
            capacityLoad > 85 ? "critical" :
            capacityLoad > 60 ? "warning" : "active"
        };
      });

      setWarehouses(updated);
    }, 3000);

    return () => clearInterval(interval);
  }, [warehouses, setWarehouses]);
}
