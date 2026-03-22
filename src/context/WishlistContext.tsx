import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartProduct } from "./CartContext";

// ─── Context ──────────────────────────────────────────────────────────────────
interface WishlistContextType {
  items:              CartProduct[];
  addToWishlist:      (product: CartProduct) => void;
  removeFromWishlist: (productId: string)    => void;
  isInWishlist:       (productId: string)    => boolean;
  toggleWishlist:     (product: CartProduct) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartProduct[]>([]);

  const isInWishlist = (productId: string) =>
    items.some((p) => p.id === productId);

  const addToWishlist = (product: CartProduct) => {
    setItems((prev) =>
      prev.find((p) => p.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromWishlist = (productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleWishlist = (product: CartProduct) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useWishlist = (): WishlistContextType => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
};