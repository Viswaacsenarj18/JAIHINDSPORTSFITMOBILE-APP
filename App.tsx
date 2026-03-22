import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Home,
  Grid2x2,
  ShoppingCart,
  Heart,
  User,
  DollarSign,
  Users,
  Package,
} from "lucide-react-native";

/* ─── CONTEXT ─────────────────────────────────────────────────────────────── */
import { AdminAuthProvider } from "./src/context/AdminAuthContext";

/* ─── ADMIN COMPONENTS ────────────────────────────────────────────────────── */
import AdminHeader   from "./src/components/admin/AdminHeader";
import AdminSidebar  from "./src/components/admin/AdminSidebar";
import DashboardCard from "./src/components/admin/DashboardCard";

/* ─── SHARED COMPONENTS ───────────────────────────────────────────────────── */
import SplashScreen   from "./src/components/SplashScreen";
import WhatsAppButton from "./src/components/WhatsAppButton";

/* ─── AUTH SCREENS ────────────────────────────────────────────────────────── */
import LoginScreen          from "./src/screens/LoginScreen";
import RegisterScreen       from "./src/screens/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import ResetPasswordScreen  from "./src/screens/ResetPasswordScreen";

/* ─── BOTTOM TAB SCREENS ──────────────────────────────────────────────────── */
import HomePage         from "./src/screens/HomePage";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import CartScreen       from "./src/screens/CartScreen";
import WishlistScreen   from "./src/screens/WishlistScreen";
import ProfileScreen    from "./src/screens/ProfileScreen";

/* ─── STACK SCREENS ───────────────────────────────────────────────────────── */
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import ProductListScreen   from "./src/screens/ProductListScreen";
import SearchScreen        from "./src/screens/SearchScreen";
import CheckoutScreen      from "./src/screens/CheckoutScreen";
import OrderSuccessScreen  from "./src/screens/OrderSuccessScreen";
import OrdersScreen        from "./src/screens/OrdersScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import SettingsScreen      from "./src/screens/SettingsScreen";
import NotFoundScreen      from "./src/screens/NotFoundScreen";

/* ─── NAVIGATION TYPES ────────────────────────────────────────────────────── */

export type RootStackParamList = {
  // Auth
  Login:          undefined;
  Register:       undefined;
  ForgotPassword: undefined;
  ResetPassword:  undefined;
  // Main app
  Tabs:           undefined;
  // Products
  ProductDetail:  { productId: string };
  CategoryDetail: { categoryId: string };
  // Shopping
  Search:         undefined;
  Checkout:       undefined;
  OrderSuccess:   { orderId: string };
  // Account
  Orders:         undefined;
  Notifications:  undefined;
  Settings:       undefined;
  // Admin
  Admin:          undefined;
  // Fallback
  NotFound:       undefined;
};

export type TabParamList = {
  Home:       undefined;
  Categories: undefined;
  Cart:       undefined;
  Wishlist:   undefined;
  Profile:    undefined;
};

/* ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────── */

const AdminDashboard = () => {
  const [open, setOpen]  = useState(false);
  const { width }        = useWindowDimensions();
  const isTablet         = width > 600;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AdminHeader title="Dashboard" onMenuToggle={() => setOpen(true)} />
      <ScrollView style={{ padding: 10 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {[
            { title: "Revenue",  value: "₹25,000", icon: DollarSign,   trend: "+12%", trendUp: true  },
            { title: "Users",    value: "1,200",   icon: Users,         trend: "+8%",  trendUp: true  },
            { title: "Orders",   value: "320",     icon: ShoppingCart,  trend: "-2%",  trendUp: false },
            { title: "Products", value: "85",      icon: Package },
          ].map((card) => (
            <View key={card.title} style={{ width: isTablet ? "48%" : "100%", marginBottom: 10 }}>
              <DashboardCard {...card} />
            </View>
          ))}
        </View>
      </ScrollView>
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
    </View>
  );
};

/* ─── NAVIGATORS ──────────────────────────────────────────────────────────── */

const Tab   = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

/* ─── BOTTOM TAB NAVIGATOR ────────────────────────────────────────────────── */

function Tabs() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor:   "#E11D48",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarStyle: {
            height:        Platform.OS === "ios" ? 80 : 62,
            paddingBottom: Platform.OS === "ios" ? 22 : 8,
            paddingTop:    8,
            backgroundColor: "#FFFFFF",
            borderTopWidth:  1,
            borderTopColor:  "#F0F0F0",
            elevation: 12,
            shadowColor:  "#000",
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.08,
            shadowRadius:  8,
          },
          tabBarLabelStyle: {
            fontSize:   11,
            fontWeight: "600",
          },
          tabBarIcon: ({ color }) => {
            const size = 22;
            switch (route.name) {
              case "Home":       return <Home         size={size} color={color} />;
              case "Categories": return <Grid2x2      size={size} color={color} />;
              case "Cart":       return <ShoppingCart size={size} color={color} />;
              case "Wishlist":   return <Heart        size={size} color={color} />;
              case "Profile":    return <User         size={size} color={color} />;
              default:           return null;
            }
          },
        })}
      >
        <Tab.Screen name="Home"       component={HomePage} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Cart"       component={CartScreen} />
        <Tab.Screen name="Wishlist"   component={WishlistScreen} />
        <Tab.Screen name="Profile"    component={ProfileScreen} />
      </Tab.Navigator>

      {/* WhatsApp FAB — floats above the tab bar on all tab screens */}
      <WhatsAppButton />
    </>
  );
}

/* ─── ROOT APP ────────────────────────────────────────────────────────────── */

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AdminAuthProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Login"
          >
            {/* ── Auth ─────────────────────────────────────────────────────── */}
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
              options={{ animation: "slide_from_right" }}
            />

            {/* ── Main app (tabs + WhatsApp FAB) ──────────────────────────── */}
            <Stack.Screen
              name="Tabs"
              component={Tabs}
            />

            {/* ── Products ─────────────────────────────────────────────────── */}
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="CategoryDetail"
              component={ProductListScreen}
              options={{ animation: "slide_from_right" }}
            />

            {/* ── Shopping flow ─────────────────────────────────────────────── */}
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="OrderSuccess"
              component={OrderSuccessScreen}
              options={{ animation: "fade", gestureEnabled: false }}
            />

            {/* ── Account ──────────────────────────────────────────────────── */}
            <Stack.Screen
              name="Orders"
              component={OrdersScreen}
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ animation: "slide_from_right" }}
            />

            {/* ── Admin panel ───────────────────────────────────────────────── */}
            <Stack.Screen
              name="Admin"
              component={AdminDashboard}
            />

            {/* ── 404 Fallback ──────────────────────────────────────────────── */}
            <Stack.Screen
              name="NotFound"
              component={NotFoundScreen}
            />
          </Stack.Navigator>

          {/* Splash screen overlays everything until animation finishes */}
          {showSplash && (
            <SplashScreen onFinish={() => setShowSplash(false)} />
          )}

          <StatusBar style="dark" />
        </NavigationContainer>
      </SafeAreaProvider>
    </AdminAuthProvider>
  );
}