"use client";
import { createContext, useContext, useState } from "react";
import { warehouseNodes, routeOptimizationKPIs, dashboardKPIs } from "@/data/dashboardData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [warehouses, setWarehouses] = useState(warehouseNodes);
  const [routes, setRoutes] = useState([]);
  const [kpis, setKpis] = useState(dashboardKPIs);
  const [routeKpis, setRouteKpis] = useState(routeOptimizationKPIs);

  return (
    <AppContext.Provider value={{
      warehouses,
      routes,
      kpis,
      routeKpis,
      setWarehouses,
      setRoutes,
      setKpis,
      setRouteKpis
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);