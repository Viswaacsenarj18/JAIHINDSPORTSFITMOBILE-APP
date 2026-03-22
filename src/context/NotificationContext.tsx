import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "order" | "cart" | "promo" | "info";
  read: boolean;
  time: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (title: string, message: string, type: Notification["type"]) => void;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const defaultNotifications: Notification[] = [
  { id: "n1", title: "Welcome to Jaihind Sports! 🏏", message: "Explore our latest sports equipment collection.", type: "promo", read: false, time: "Just now" },
  { id: "n2", title: "Mega Sports Sale", message: "Up to 60% off on all cricket equipment. Limited time!", type: "promo", read: false, time: "2h ago" },
  { id: "n3", title: "New Arrivals", message: "Check out the latest running shoes collection.", type: "info", read: true, time: "1d ago" },
];

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (title: string, message: string, type: Notification["type"]) => {
    const n: Notification = { id: `n${Date.now()}`, title, message, type, read: false, time: "Just now" };
    setNotifications((prev) => [n, ...prev]);
  };

  const markAsRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const clearAll = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, markAllRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
};
