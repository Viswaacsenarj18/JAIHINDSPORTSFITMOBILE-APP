import React, { useState, useRef, useEffect } from "react";
import { Bell, Package, ShoppingCart, Tag, Info } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const typeIcons: Record<string, React.ElementType> = {
  order: Package, cart: ShoppingCart, promo: Tag, info: Info,
};
const typeColors: Record<string, string> = {
  order: "bg-primary/10 text-primary",
  cart: "bg-success/10 text-success",
  promo: "bg-warning/10 text-warning",
  info: "bg-accent text-accent-foreground",
};

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="w-9 h-9 flex items-center justify-center rounded-full bg-muted relative">
        <Bell size={18} className="text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center px-1">
            {unreadCount}
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute right-0 top-12 w-80 bg-card rounded-xl shadow-xl border border-border overflow-hidden z-50"
          >
            <div className="p-3 border-b border-border flex items-center justify-between">
              <span className="text-sm font-bold">Notifications</span>
              <button onClick={() => { setOpen(false); navigate("/notifications"); }} className="text-xs text-primary font-semibold">View All</button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.slice(0, 5).map((n) => {
                const Icon = typeIcons[n.type] || Info;
                return (
                  <button
                    key={n.id}
                    onClick={() => { markAsRead(n.id); }}
                    className={`w-full text-left px-3 py-2.5 flex gap-2.5 hover:bg-muted/50 transition-colors ${!n.read ? "bg-primary/5" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${typeColors[n.type]}`}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs ${!n.read ? "font-bold" : "font-medium"} line-clamp-1`}>{n.title}</p>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">{n.message}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
