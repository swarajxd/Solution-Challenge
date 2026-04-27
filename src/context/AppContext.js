"use client";
import { createContext, useContext, useState } from "react";
import { warehouseNodes, routeOptimizationKPIs, dashboardKPIs, predictiveInsights } from "@/data/dashboardData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [warehouses, setWarehouses] = useState(warehouseNodes);
  const [routes, setRoutes] = useState([]);
  const [kpis, setKpis] = useState(dashboardKPIs);
  const [routeKpis, setRouteKpis] = useState(routeOptimizationKPIs);
  const [insights, setInsights] = useState(predictiveInsights);

  return (
    <AppContext.Provider value={{
      warehouses,
      routes,
      kpis,
      routeKpis,
      insights,
      setWarehouses,
      setRoutes,
      setKpis,
      setRouteKpis,
      setInsights
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);