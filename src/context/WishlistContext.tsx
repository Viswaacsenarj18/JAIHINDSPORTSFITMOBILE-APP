import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/mockData";

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setItems((prev) => prev.some((i) => i.id === product.id) ? prev : [...prev, product]);
  };

  const removeFromWishlist = (productId: string) => setItems((prev) => prev.filter((i) => i.id !== productId));

  const isInWishlist = (productId: string) => items.some((i) => i.id === productId);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
