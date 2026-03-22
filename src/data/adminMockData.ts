export interface AdminUser {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  orders: number;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  email: string;
  amount: number;
  paymentStatus: "paid" | "pending" | "failed";
  orderStatus: "pending" | "processing" | "delivered";
  date: string;
  items: number;
}

export const adminUsers: AdminUser[] = [
  { id: "u1", name: "Rahul Sharma", email: "rahul@example.com", joinedDate: "2025-01-15", orders: 5 },
  { id: "u2", name: "Priya Patel", email: "priya@example.com", joinedDate: "2025-02-20", orders: 3 },
  { id: "u3", name: "Amit Kumar", email: "amit@example.com", joinedDate: "2025-03-10", orders: 8 },
  { id: "u4", name: "Sneha Gupta", email: "sneha@example.com", joinedDate: "2025-04-05", orders: 2 },
  { id: "u5", name: "Vikram Singh", email: "vikram@example.com", joinedDate: "2025-05-12", orders: 6 },
  { id: "u6", name: "Anjali Mehta", email: "anjali@example.com", joinedDate: "2025-06-18", orders: 1 },
];

export const adminOrders: AdminOrder[] = [
  { id: "ORD-001", customerName: "Rahul Sharma", email: "rahul@example.com", amount: 8498, paymentStatus: "paid", orderStatus: "delivered", date: "2026-03-10", items: 3 },
  { id: "ORD-002", customerName: "Priya Patel", email: "priya@example.com", amount: 2499, paymentStatus: "paid", orderStatus: "processing", date: "2026-03-12", items: 1 },
  { id: "ORD-003", customerName: "Amit Kumar", email: "amit@example.com", amount: 5999, paymentStatus: "pending", orderStatus: "pending", date: "2026-03-13", items: 2 },
  { id: "ORD-004", customerName: "Sneha Gupta", email: "sneha@example.com", amount: 1299, paymentStatus: "paid", orderStatus: "delivered", date: "2026-03-08", items: 1 },
  { id: "ORD-005", customerName: "Vikram Singh", email: "vikram@example.com", amount: 4999, paymentStatus: "paid", orderStatus: "processing", date: "2026-03-11", items: 2 },
  { id: "ORD-006", customerName: "Anjali Mehta", email: "anjali@example.com", amount: 799, paymentStatus: "failed", orderStatus: "pending", date: "2026-03-14", items: 1 },
];

export const monthlySalesData = [
  { month: "Oct", sales: 45000 },
  { month: "Nov", sales: 62000 },
  { month: "Dec", sales: 78000 },
  { month: "Jan", sales: 55000 },
  { month: "Feb", sales: 68000 },
  { month: "Mar", sales: 82000 },
];

export const ordersOverviewData = [
  { month: "Oct", pending: 12, processing: 8, delivered: 25 },
  { month: "Nov", pending: 15, processing: 12, delivered: 35 },
  { month: "Dec", pending: 10, processing: 18, delivered: 50 },
  { month: "Jan", pending: 8, processing: 10, delivered: 30 },
  { month: "Feb", pending: 14, processing: 15, delivered: 40 },
  { month: "Mar", pending: 11, processing: 13, delivered: 45 },
];
export const categoryPerformanceData = [
  { category: "Cricket", sales: 45000, products: 45 },
  { category: "Football", sales: 32000, products: 38 },
  { category: "Gym", sales: 55000, products: 55 },
  { category: "Running", sales: 38000, products: 40 },
  { category: "Badminton", sales: 18000, products: 22 },
  { category: "Fitness", sales: 42000, products: 60 },
];
