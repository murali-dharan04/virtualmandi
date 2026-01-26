import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  cropName: string;
  quantity: number;
  unit: 'kg' | 'quintal' | 'ton';
  pricePerUnit: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  createdAt: string;
}

export interface PurchaseRequest {
  id: string;
  productId: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  quantity: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface DataContextType {
  products: Product[];
  requests: PurchaseRequest[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  sendRequest: (request: Omit<PurchaseRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateRequestStatus: (id: string, status: 'accepted' | 'rejected') => void;
  getSellerProducts: (sellerId: string) => Product[];
  getSellerRequests: (sellerId: string) => PurchaseRequest[];
  getBuyerRequests: (buyerId: string) => PurchaseRequest[];
  getNearbyProducts: (lat: number, lng: number, maxDistance?: number) => Product[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Sample data for demo
const sampleProducts: Product[] = [
  {
    id: '1',
    sellerId: 'farmer1',
    sellerName: 'Ramesh Kumar',
    cropName: 'Rice',
    quantity: 500,
    unit: 'kg',
    pricePerUnit: 35,
    location: { lat: 13.0827, lng: 80.2707, address: 'Kanchipuram, Tamil Nadu' },
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    sellerId: 'farmer2',
    sellerName: 'Lakshmi Devi',
    cropName: 'Wheat',
    quantity: 10,
    unit: 'quintal',
    pricePerUnit: 2200,
    location: { lat: 12.9716, lng: 77.5946, address: 'Mandya, Karnataka' },
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    sellerId: 'farmer3',
    sellerName: 'Venkatesh Naidu',
    cropName: 'Cotton',
    quantity: 5,
    unit: 'ton',
    pricePerUnit: 55000,
    location: { lat: 15.3173, lng: 75.7139, address: 'Guntur, Andhra Pradesh' },
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    sellerId: 'farmer4',
    sellerName: 'Suresh Patil',
    cropName: 'Sugarcane',
    quantity: 20,
    unit: 'ton',
    pricePerUnit: 3500,
    location: { lat: 18.5204, lng: 73.8567, address: 'Kolhapur, Maharashtra' },
    createdAt: new Date().toISOString(),
  },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [requests, setRequests] = useState<PurchaseRequest[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('virtualmandi_products');
    const storedRequests = localStorage.getItem('virtualmandi_requests');

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(sampleProducts);
      localStorage.setItem('virtualmandi_products', JSON.stringify(sampleProducts));
    }

    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('virtualmandi_products', JSON.stringify(newProducts));
  };

  const saveRequests = (newRequests: PurchaseRequest[]) => {
    setRequests(newRequests);
    localStorage.setItem('virtualmandi_requests', JSON.stringify(newRequests));
  };

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    saveProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    saveProducts(products.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: string) => {
    saveProducts(products.filter((p) => p.id !== id));
  };

  const sendRequest = (request: Omit<PurchaseRequest, 'id' | 'createdAt' | 'status'>) => {
    const newRequest: PurchaseRequest = {
      ...request,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    saveRequests([...requests, newRequest]);
  };

  const updateRequestStatus = (id: string, status: 'accepted' | 'rejected') => {
    saveRequests(requests.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const getSellerProducts = (sellerId: string) => products.filter((p) => p.sellerId === sellerId);

  const getSellerRequests = (sellerId: string) => requests.filter((r) => r.sellerId === sellerId);

  const getBuyerRequests = (buyerId: string) => requests.filter((r) => r.buyerId === buyerId);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getNearbyProducts = (lat: number, lng: number, maxDistance = 100) => {
    return products
      .map((p) => ({
        ...p,
        distance: calculateDistance(lat, lng, p.location.lat, p.location.lng),
      }))
      .filter((p) => p.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);
  };

  return (
    <DataContext.Provider
      value={{
        products,
        requests,
        addProduct,
        updateProduct,
        deleteProduct,
        sendRequest,
        updateRequestStatus,
        getSellerProducts,
        getSellerRequests,
        getBuyerRequests,
        getNearbyProducts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
