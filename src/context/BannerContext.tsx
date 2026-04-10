import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Alert } from 'react-native';
import { banners as initialBanners } from '../data/mockData';

interface Banner {
  id: string;
  imageUrl: string;
  title: string;
}

interface BannerContextType {
  banners: Banner[];
  addBanner: (imageUrl: string, title: string) => void;
  deleteBanner: (id: string) => void;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const useBanners = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error('useBanners must be used within BannerProvider');
  }
  return context;
};

interface BannerProviderProps {
  children: ReactNode;
}

export const BannerProvider: React.FC<BannerProviderProps> = ({ children }) => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    // Initial empty or load from mock if needed
    setBanners([]);
  }, []);

  const addBanner = (imageUrl: string, title: string) => {
    if (!imageUrl.trim()) {
      Alert.alert('Error', 'Please enter image URL');
      return;
    }
    const newBanner: Banner = {
      id: Date.now().toString(),
      imageUrl,
      title: title || 'New Banner',
    };
    setBanners(prev => [newBanner, ...prev]);
  };

  const deleteBanner = (id: string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  return (
    <BannerContext.Provider value={{ banners, addBanner, deleteBanner }}>
      {children}
    </BannerContext.Provider>
  );
};

