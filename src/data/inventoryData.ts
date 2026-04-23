export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  warehouse: string;
  stock: number;
  threshold: number;
  price: number;
  lastUpdated: string;
}

export const inventoryData: InventoryItem[] = [
  {
    id: 'SKU-001',
    name: 'Lithium-Ion Battery Pack',
    category: 'Electronics',
    warehouse: 'Warehouse-A (Chicago)',
    stock: 450,
    threshold: 100,
    price: 120,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'SKU-002',
    name: 'Aluminum Casing',
    category: 'Raw Materials',
    warehouse: 'Warehouse-B (Detroit)',
    stock: 85,
    threshold: 200,
    price: 45,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'SKU-003',
    name: 'Copper Wiring (50m)',
    category: 'Raw Materials',
    warehouse: 'Warehouse-A (Chicago)',
    stock: 1200,
    threshold: 300,
    price: 15,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'SKU-004',
    name: 'Circuit Board v2.1',
    category: 'Electronics',
    warehouse: 'Warehouse-C (Austin)',
    stock: 42,
    threshold: 50,
    price: 85,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'SKU-005',
    name: 'Biodegradable Packaging',
    category: 'Packaging',
    warehouse: 'Warehouse-B (Detroit)',
    stock: 2500,
    threshold: 500,
    price: 2.5,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'SKU-006',
    name: 'Solar Panel Module',
    category: 'Finished Goods',
    warehouse: 'Warehouse-C (Austin)',
    stock: 15,
    threshold: 20,
    price: 350,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'SKU-007',
    name: 'Steel Support Beam',
    category: 'Raw Materials',
    warehouse: 'Warehouse-A (Chicago)',
    stock: 8,
    threshold: 15,
    price: 150,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'SKU-008',
    name: 'Protective Foam Inserts',
    category: 'Packaging',
    warehouse: 'Warehouse-B (Detroit)',
    stock: 120,
    threshold: 200,
    price: 5,
    lastUpdated: new Date().toISOString(),
  },
];
