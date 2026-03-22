import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "./CartContext";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "delivered";
  date: string;
  address: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: CartItem[], total: number, address: string) => string;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = (items: CartItem[], total: number, address: string) => {
    const id = `ORD-${Date.now()}`;
    const order: Order = { id, items, total, status: "pending", date: new Date().toLocaleDateString(), address };
    setOrders((prev) => [order, ...prev]);
    return id;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
