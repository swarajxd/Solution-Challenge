export type ShipmentStatus = 'In Transit' | 'Delayed' | 'Delivered';

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  progress: number;
  delay: boolean;
  eta: number; // in days
  vehicleId?: string;
}

export const initialShipments: Shipment[] = [
  {
    id: 'SHP-1001',
    origin: 'Shanghai, CN',
    destination: 'Los Angeles, USA',
    status: 'In Transit',
    progress: 45,
    delay: false,
    eta: 12,
    vehicleId: 'VHC-772'
  },
  {
    id: 'SHP-1002',
    origin: 'Rotterdam, NL',
    destination: 'New York, USA',
    status: 'Delayed',
    progress: 30,
    delay: true,
    eta: 8,
    vehicleId: 'VHC-114'
  },
  {
    id: 'SHP-1003',
    origin: 'Singapore, SG',
    destination: 'Hamburg, DE',
    status: 'In Transit',
    progress: 85,
    delay: false,
    eta: 3,
    vehicleId: 'VHC-902'
  },
  {
    id: 'SHP-1004',
    origin: 'Mumbai, IN',
    destination: 'Dubai, UAE',
    status: 'In Transit',
    progress: 15,
    delay: false,
    eta: 5,
    vehicleId: 'VHC-442'
  },
  {
    id: 'SHP-1005',
    origin: 'Sao Paulo, BR',
    destination: 'Miami, USA',
    status: 'In Transit',
    progress: 95,
    delay: false,
    eta: 1,
    vehicleId: 'VHC-229'
  },
  {
    id: 'SHP-1006',
    origin: 'Tokyo, JP',
    destination: 'Sydney, AU',
    status: 'Delivered',
    progress: 100,
    delay: false,
    eta: 0,
    vehicleId: 'VHC-331'
  },
  {
    id: 'SHP-1007',
    origin: 'London, UK',
    destination: 'Paris, FR',
    status: 'In Transit',
    progress: 60,
    delay: false,
    eta: 0.5,
    vehicleId: 'VHC-009'
  }
];
