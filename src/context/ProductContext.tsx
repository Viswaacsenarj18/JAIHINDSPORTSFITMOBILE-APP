import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, products as mockProducts, categories as mockCategories, Category } from "@/data/mockData";

interface ProductContextType {
  products: Product[];
  categories: Category[];
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  searchProducts: (query: string) => Product[];
  filterProducts: (filters: ProductFilters) => Product[];
}

export interface ProductFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: "price-asc" | "price-desc" | "rating" | "newest";
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products] = useState<Product[]>(mockProducts);
  const [categories] = useState<Category[]>(mockCategories);

  const getProductById = (id: string) => products.find((p) => p.id === id);
  const getProductsByCategory = (categoryId: string) => products.filter((p) => p.category === categoryId);
  const searchProducts = (query: string) => {
    const q = query.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  };

  const filterProducts = (filters: ProductFilters) => {
    let result = [...products];
    if (filters.query) { const q = filters.query.toLowerCase(); result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)); }
    if (filters.category) result = result.filter((p) => p.category === filters.category);
    if (filters.minPrice !== undefined) result = result.filter((p) => p.price >= filters.minPrice!);
    if (filters.maxPrice !== undefined) result = result.filter((p) => p.price <= filters.maxPrice!);
    if (filters.inStock) result = result.filter((p) => p.inStock);
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-asc": result.sort((a, b) => a.price - b.price); break;
        case "price-desc": result.sort((a, b) => b.price - a.price); break;
        case "rating": result.sort((a, b) => b.rating - a.rating); break;
      }
    }
    return result;
  };

  return (
    <ProductContext.Provider value={{ products, categories, getProductById, getProductsByCategory, searchProducts, filterProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
};
