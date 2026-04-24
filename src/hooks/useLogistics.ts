import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { initialShipments, Shipment, ShipmentStatus } from '@/data/logisticsData';
import { notificationService } from '@/services/notificationService';

export const useLogistics = () => {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const notifiedShipments = useRef<Set<string>>(new Set());

  // Auto progress update every 4-5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShipments(prevShipments => {
        return prevShipments.map(shipment => {
          if (shipment.status === 'Delivered' || shipment.status === 'Delayed') {
            return shipment;
          }

          const progressIncrease = Math.floor(Math.random() * 6) + 5; // 5-10%
          const newProgress = Math.min(100, shipment.progress + progressIncrease);
          const newStatus: ShipmentStatus = newProgress === 100 ? 'Delivered' : 'In Transit';

          // Trigger delivery notification
          if (newStatus === 'Delivered' && !notifiedShipments.current.has(`${shipment.id}-delivered`)) {
            notificationService.createNotification(
              `Shipment ${shipment.id} delivered to ${shipment.destination}.`,
              'success',
              'logistics',
              { shipmentId: shipment.id }
            );
            notifiedShipments.current.add(`${shipment.id}-delivered`);
          }

          return {
            ...shipment,
            progress: newProgress,
            status: newStatus,
            eta: newProgress === 100 ? 0 : Math.max(0, shipment.eta - 0.2)
          };
        });
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const simulateDelay = useCallback((id: string) => {
    setShipments(prevShipments => {
      return prevShipments.map(shipment => {
        if (shipment.id === id) {
          if (!notifiedShipments.current.has(`${shipment.id}-delayed`)) {
            notificationService.createNotification(
              `Shipment ${shipment.id} delayed on route to ${shipment.destination}.`,
              'warning',
              'logistics',
              { shipmentId: shipment.id }
            );
            notifiedShipments.current.add(`${shipment.id}-delayed`);
          }

          return {
            ...shipment,
            delay: true,
            status: 'Delayed' as ShipmentStatus
          };
        }
        return shipment;
      });
    });
  }, []);

  const resolveDelay = useCallback((id: string) => {
    setShipments(prevShipments => {
      return prevShipments.map(shipment => {
        if (shipment.id === id) {
          // Allow re-triggering delay notification if it happens again
          notifiedShipments.current.delete(`${shipment.id}-delayed`);
          
          return {
            ...shipment,
            delay: false,
            status: 'In Transit' as ShipmentStatus
          };
        }
        return shipment;
      });
    });
  }, []);

  const kpis = useMemo(() => {
    const activeShipments = shipments.filter(s => s.status !== 'Delivered');
    const delayedShipments = shipments.filter(s => s.status === 'Delayed');
    const deliveredShipments = shipments.filter(s => s.status === 'Delivered');

    const activeVehicles = activeShipments.length;
    const avgDeliveryTime = shipments.length > 0 
      ? shipments.reduce((acc, curr) => acc + curr.eta, 0) / shipments.length 
      : 0;
    
    const routeEfficiency = shipments.length > 0 
      ? ((shipments.length - delayedShipments.length) / shipments.length) * 100 
      : 0;
    
    const fleetHealth = shipments.length > 0 
      ? ((deliveredShipments.length + (shipments.length - delayedShipments.length - deliveredShipments.length)) / shipments.length) * 100 
      : 0;

    return {
      activeVehicles,
      avgDeliveryTime: parseFloat(avgDeliveryTime.toFixed(1)),
      routeEfficiency: parseFloat(routeEfficiency.toFixed(1)),
      fleetHealth: parseFloat(fleetHealth.toFixed(1))
    };
  }, [shipments]);

  return {
    shipments,
    kpis,
    simulateDelay,
    resolveDelay
  };
};
