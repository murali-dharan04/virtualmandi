import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

export interface Product {
  id: string;
  seller_id: string;
  seller_name?: string;
  crop_name: string;
  quantity: number;
  unit: 'kg' | 'quintal' | 'ton';
  price_per_unit: number;
  location_lat: number;
  location_lng: number;
  location_address: string;
  created_at: string;
  distance?: number;
}

export interface PurchaseRequest {
  id: string;
  product_id: string;
  buyer_id: string;
  buyer_name?: string;
  seller_id: string;
  quantity: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  product?: Product;
}

interface DataContextType {
  products: Product[];
  requests: PurchaseRequest[];
  isLoading: boolean;
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'seller_name'>) => Promise<{ error: string | null }>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<{ error: string | null }>;
  deleteProduct: (id: string) => Promise<{ error: string | null }>;
  sendRequest: (request: { product_id: string; seller_id: string; quantity: number }) => Promise<{ error: string | null }>;
  updateRequestStatus: (id: string, status: 'accepted' | 'rejected') => Promise<{ error: string | null }>;
  getSellerProducts: (sellerId: string) => Product[];
  getSellerRequests: (sellerId: string) => PurchaseRequest[];
  getBuyerRequests: (buyerId: string) => PurchaseRequest[];
  getNearbyProducts: (lat: number, lng: number, maxDistance?: number) => Product[];
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

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

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [requests, setRequests] = useState<PurchaseRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (!isAuthenticated) {
      setProducts([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles:seller_id (name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      const formattedProducts: Product[] = (data || []).map((p: any) => ({
        id: p.id,
        seller_id: p.seller_id,
        seller_name: p.profiles?.name || 'Unknown Seller',
        crop_name: p.crop_name,
        quantity: Number(p.quantity),
        unit: p.unit as 'kg' | 'quintal' | 'ton',
        price_per_unit: Number(p.price_per_unit),
        location_lat: p.location_lat,
        location_lng: p.location_lng,
        location_address: p.location_address,
        created_at: p.created_at,
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [isAuthenticated]);

  const fetchRequests = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setRequests([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('purchase_requests')
        .select(`
          *,
          buyer_profile:buyer_id (name),
          products (*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching requests:', error);
        return;
      }

      const formattedRequests: PurchaseRequest[] = (data || []).map((r: any) => ({
        id: r.id,
        product_id: r.product_id,
        buyer_id: r.buyer_id,
        buyer_name: r.buyer_profile?.name || 'Unknown Buyer',
        seller_id: r.seller_id,
        quantity: Number(r.quantity),
        status: r.status as 'pending' | 'accepted' | 'rejected',
        created_at: r.created_at,
        product: r.products ? {
          id: r.products.id,
          seller_id: r.products.seller_id,
          crop_name: r.products.crop_name,
          quantity: Number(r.products.quantity),
          unit: r.products.unit,
          price_per_unit: Number(r.products.price_per_unit),
          location_lat: r.products.location_lat,
          location_lng: r.products.location_lng,
          location_address: r.products.location_address,
          created_at: r.products.created_at,
        } : undefined,
      }));

      setRequests(formattedRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }, [isAuthenticated, user]);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([fetchProducts(), fetchRequests()]);
    setIsLoading(false);
  }, [fetchProducts, fetchRequests]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    } else {
      setProducts([]);
      setRequests([]);
      setIsLoading(false);
    }
  }, [isAuthenticated, refreshData]);

  const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'seller_name'>): Promise<{ error: string | null }> => {
    if (!user) return { error: 'Not authenticated' };

    try {
      const { error } = await supabase.from('products').insert({
        seller_id: product.seller_id,
        crop_name: product.crop_name,
        quantity: product.quantity,
        unit: product.unit,
        price_per_unit: product.price_per_unit,
        location_lat: product.location_lat,
        location_lng: product.location_lng,
        location_address: product.location_address,
      });

      if (error) {
        console.error('Error adding product:', error);
        return { error: error.message };
      }

      await fetchProducts();
      return { error: null };
    } catch (error) {
      console.error('Error adding product:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>): Promise<{ error: string | null }> => {
    try {
      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id);

      if (error) {
        return { error: error.message };
      }

      await fetchProducts();
      return { error: null };
    } catch (error) {
      console.error('Error updating product:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const deleteProduct = async (id: string): Promise<{ error: string | null }> => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        return { error: error.message };
      }

      await fetchProducts();
      return { error: null };
    } catch (error) {
      console.error('Error deleting product:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const sendRequest = async (request: { product_id: string; seller_id: string; quantity: number }): Promise<{ error: string | null }> => {
    if (!user) return { error: 'Not authenticated' };

    try {
      const { error } = await supabase.from('purchase_requests').insert({
        product_id: request.product_id,
        buyer_id: user.id,
        seller_id: request.seller_id,
        quantity: request.quantity,
      });

      if (error) {
        console.error('Error sending request:', error);
        return { error: error.message };
      }

      await fetchRequests();
      return { error: null };
    } catch (error) {
      console.error('Error sending request:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const updateRequestStatus = async (id: string, status: 'accepted' | 'rejected'): Promise<{ error: string | null }> => {
    try {
      const { error } = await supabase
        .from('purchase_requests')
        .update({ status })
        .eq('id', id);

      if (error) {
        return { error: error.message };
      }

      await fetchRequests();
      return { error: null };
    } catch (error) {
      console.error('Error updating request status:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const getSellerProducts = (sellerId: string) => products.filter((p) => p.seller_id === sellerId);

  const getSellerRequests = (sellerId: string) => requests.filter((r) => r.seller_id === sellerId);

  const getBuyerRequests = (buyerId: string) => requests.filter((r) => r.buyer_id === buyerId);

  const getNearbyProducts = (lat: number, lng: number, maxDistance = 100) => {
    return products
      .map((p) => ({
        ...p,
        distance: calculateDistance(lat, lng, p.location_lat, p.location_lng),
      }))
      .filter((p) => p.distance <= maxDistance)
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  };

  return (
    <DataContext.Provider
      value={{
        products,
        requests,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        sendRequest,
        updateRequestStatus,
        getSellerProducts,
        getSellerRequests,
        getBuyerRequests,
        getNearbyProducts,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
