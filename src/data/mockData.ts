// ─────────────────────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  count: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  /**
   * Tailwind gradient strings don't exist in React Native.
   * Use these hex color pairs with LinearGradient instead:
   *   expo-linear-gradient  →  import { LinearGradient } from "expo-linear-gradient"
   *   react-native-linear-gradient  →  import LinearGradient from "react-native-linear-gradient"
   *
   *   Usage: <LinearGradient colors={banner.colors} ... />
   */
  colors: readonly [string, string];
  cta: string;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Categories
// ─────────────────────────────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    id: "cricket",
    name: "Cricket",
    icon: "🏏",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop",
    count: 45,
  },
  {
    id: "football",
    name: "Football",
    icon: "⚽",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
    count: 38,
  },
  {
    id: "badminton",
    name: "Badminton",
    icon: "🏸",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop",
    count: 22,
  },
  {
    id: "basketball",
    name: "Basketball",
    icon: "🏀",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    count: 30,
  },
  {
    id: "gym",
    name: "Gym Equipment",
    icon: "🏋️",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    count: 55,
  },
  {
    id: "running",
    name: "Running",
    icon: "🏃",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop",
    count: 40,
  },
  {
    id: "outdoor",
    name: "Outdoor Games",
    icon: "🎯",
    image:
      "https://images.unsplash.com/photo-1472745433479-4556f22e32c2?w=400&h=300&fit=crop",
    count: 18,
  },
  {
    id: "fitness",
    name: "Fitness Accessories",
    icon: "💪",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    count: 60,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Products
// ─────────────────────────────────────────────────────────────────────────────

export const products: Product[] = [
  {
    id: "1",
    name: "Pro Cricket Bat - English Willow",
    price: 4999,
    originalPrice: 6999,
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=400&fit=crop",
    category: "cricket",
    rating: 4.5,
    reviews: 128,
    description:
      "Premium English Willow cricket bat with superior stroke play. Ideal for professional and semi-professional cricketers.",
    inStock: true,
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Match Football - FIFA Approved",
    price: 1299,
    originalPrice: 1799,
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop",
    category: "football",
    rating: 4.3,
    reviews: 95,
    description:
      "Official match football with FIFA approval. Thermally bonded panels for consistent flight.",
    inStock: true,
    badge: "New",
  },
  {
    id: "3",
    name: "Carbon Fiber Badminton Racket",
    price: 2499,
    originalPrice: 3499,
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=400&fit=crop",
    category: "badminton",
    rating: 4.7,
    reviews: 210,
    description:
      "Lightweight carbon fiber racket with isometric head shape for maximum sweet spot.",
    inStock: true,
  },
  {
    id: "4",
    name: "Indoor Basketball - Size 7",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop",
    category: "basketball",
    rating: 4.2,
    reviews: 67,
    description:
      "Official size 7 basketball with deep channel design for superior grip and control.",
    inStock: true,
  },
  {
    id: "5",
    name: "Adjustable Dumbbell Set 20kg",
    price: 3999,
    originalPrice: 5499,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
    category: "gym",
    rating: 4.8,
    reviews: 342,
    description:
      "Quick-change adjustable dumbbell set from 2.5kg to 20kg. Perfect for home workouts.",
    inStock: true,
    badge: "Hot Deal",
  },
  {
    id: "6",
    name: "Running Shoes - Ultra Boost",
    price: 5999,
    originalPrice: 7999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "running",
    rating: 4.6,
    reviews: 189,
    description:
      "Premium running shoes with responsive Boost cushioning and Continental rubber outsole.",
    inStock: true,
    badge: "Trending",
  },
  {
    id: "7",
    name: "Yoga Mat - Premium 6mm",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
    category: "fitness",
    rating: 4.4,
    reviews: 156,
    description:
      "Extra thick 6mm yoga mat with alignment lines. Non-slip surface for all yoga styles.",
    inStock: true,
  },
  {
    id: "8",
    name: "Cricket Helmet - Pro Guard",
    price: 2299,
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=400&fit=crop",
    category: "cricket",
    rating: 4.1,
    reviews: 44,
    description:
      "Professional cricket helmet with titanium grille and premium padding for maximum protection.",
    inStock: false,
  },
  {
    id: "9",
    name: "Resistance Bands Set",
    price: 599,
    originalPrice: 999,
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop",
    category: "fitness",
    rating: 4.3,
    reviews: 278,
    description:
      "Set of 5 resistance bands with different tension levels. Includes door anchor and carry bag.",
    inStock: true,
    badge: "Sale",
  },
  {
    id: "10",
    name: "Football Boots - Speed Pro",
    price: 3499,
    originalPrice: 4999,
    image:
      "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=400&h=400&fit=crop",
    category: "football",
    rating: 4.5,
    reviews: 112,
    description:
      "Lightweight speed boots with textured upper for enhanced ball control. FG studs.",
    inStock: true,
  },
  {
    id: "11",
    name: "Kettlebell Cast Iron 16kg",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=400&h=400&fit=crop",
    category: "gym",
    rating: 4.6,
    reviews: 89,
    description:
      "Solid cast iron kettlebell with wide handle for comfortable two-hand grip.",
    inStock: true,
  },
  {
    id: "12",
    name: "Badminton Shuttlecock (Pack of 12)",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=400&fit=crop",
    category: "badminton",
    rating: 4.0,
    reviews: 201,
    description:
      "Feather shuttlecocks for tournament play. Consistent flight and durability.",
    inStock: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Banners
//  The web version used Tailwind gradient class strings which don't exist in
//  React Native. Each banner now carries a `colors` tuple of two hex values
//  that map to the original gradient intent.
// ─────────────────────────────────────────────────────────────────────────────

export const banners: Banner[] = [
  {
    id: "1",
    title: "MEGA SPORTS SALE",
    subtitle: "Up to 60% off on all equipment",
    colors: ["#E11D48", "#DC2626"] as const, // primary → destructive (red family)
    cta: "Shop Now",
  },
  {
    id: "2",
    title: "NEW ARRIVALS",
    subtitle: "Premium cricket gear collection",
    colors: ["#1E293B", "#0F172A"] as const, // secondary → foreground (dark slate)
    cta: "Explore",
  },
  {
    id: "3",
    title: "FITNESS FEST",
    subtitle: "Flat 40% off gym equipment",
    colors: ["#7C3AED", "#E11D48"] as const, // accent-foreground → primary (violet → red)
    cta: "Get Fit",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Utility helpers
// ─────────────────────────────────────────────────────────────────────────────

/** All products belonging to a given category id */
export const getProductsByCategory = (categoryId: string): Product[] =>
  products.filter((p) => p.category === categoryId);

/** Single product by id */
export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

/** Only in-stock products */
export const getInStockProducts = (): Product[] =>
  products.filter((p) => p.inStock);

/** Products that carry a promotional badge */
export const getBadgedProducts = (): Product[] =>
  products.filter((p) => Boolean(p.badge));

/** Discount percentage helper */
export const getDiscountPercent = (product: Product): number | null => {
  if (!product.originalPrice) return null;
  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
};