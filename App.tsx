import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  View,
  Platform,
  Alert,
} from "react-native";

// ✅ FIXED SafeAreaView
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {
  Home,
  Grid2x2,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react-native";
/* ─── CONTEXTS ────────────────────────────────────────────────────────────── */
import { AdminAuthProvider } from "./src/context/AdminAuthContext";
import { CartProvider }      from "./src/context/CartContext";
import { WishlistProvider }  from "./src/context/WishlistContext";
import { BannerProvider } from "./src/context/BannerContext";

/* ─── SHARED COMPONENTS ───────────────────────────────────────────────────── */
import SplashScreen   from "./src/components/SplashScreen";
import WhatsAppButton from "./src/components/WhatsAppButton";

/* ─── ADMIN COMPONENTS ────────────────────────────────────────────────────── */
import AdminHeader    from "./src/components/admin/AdminHeader";
import AdminSidebar   from "./src/components/admin/AdminSidebar";
import AdminBottomNav from "./src/components/admin/AdminBottomNav";
import { AdminTab }   from "./src/components/admin/AdminSidebar";

/* ─── ADMIN PAGE SCREENS ──────────────────────────────────────────────────── */
import AdminDashboardPage  from "./src/screens/admin/AdminDashboardPage";
import AdminProductsPage   from "./src/screens/admin/AdminProductsPage";
import AdminCategoriesPage from "./src/screens/admin/AdminCategoriesPage";
import AdminOrdersPage     from "./src/screens/admin/AdminOrdersPage";
import AdminUsersPage      from "./src/screens/admin/AdminUsersPage";
import AdminSettingsPage   from "./src/screens/admin/AdminSettingsPage";
import AdminBannerPage     from "./src/screens/admin/AdminBannerPage";

/* ─── AUTH SCREENS ────────────────────────────────────────────────────────── */
import LoginScreen          from "./src/screens/LoginScreen";
import RegisterScreen       from "./src/screens/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import ResetPasswordScreen  from "./src/screens/ResetPasswordScreen";

/* ─── USER TAB SCREENS ────────────────────────────────────────────────────── */
import HomePage         from "./src/screens/HomePage";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import CartScreen       from "./src/screens/CartScreen";
import WishlistScreen   from "./src/screens/WishlistScreen";
import ProfileScreen    from "./src/screens/ProfileScreen";

/* ─── USER STACK SCREENS ──────────────────────────────────────────────────── */
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
  Login:          undefined;
  Register:       undefined;
  ForgotPassword: undefined;
  ResetPassword:  undefined;
  Tabs:           undefined;
  Admin:          undefined;
  ProductDetail:  { productId: string };
  CategoryDetail: { categoryId: string };
  Search:         undefined;
  Checkout:       undefined;
  OrderSuccess:   { orderId: string };
  Orders:         undefined;
  Notifications:  undefined;
  Settings:       undefined;
  NotFound:       undefined;
};

export type TabParamList = {
  Home:       undefined;
  Categories: undefined;
  Cart:       undefined;
  Wishlist:   undefined;
  Profile:    undefined;
};

/* ─── ADMIN PANEL ─────────────────────────────────────────────────────────── */

const AdminPanel = ({ navigation }: { navigation: any }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab,   setActiveTab]   = useState<AdminTab>("Dashboard");

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout from Admin Panel?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            setSidebarOpen(false);
            navigation.replace("Login");
          },
        },
      ]
    );
  };

  const renderPage = () => {
    switch (activeTab) {
      case "Dashboard":  return <AdminDashboardPage />;
      case "Products":   return <AdminProductsPage />;
      case "Categories": return <AdminCategoriesPage />;
      case "Orders":     return <AdminOrdersPage />;
      case "Users":      return <AdminUsersPage />;
case "Settings": return <AdminSettingsPage />;
      case "Banners": return <AdminBannerPage />;
      default:           return <AdminDashboardPage />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <AdminHeader
        title={activeTab}
        onMenuToggle={() => setSidebarOpen(true)}
        adminName="Admin"
      />
      <View style={{ flex: 1 }}>
        {renderPage()}
      </View>
      <AdminBottomNav
        activeTab={activeTab === "Categories" ? "Products" : (activeTab as any)}
        onTabChange={setActiveTab}
      />
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false);
        }}
        onLogout={handleLogout}
      />
    </SafeAreaView>
  );
};

/* ─── USER BOTTOM TABS ────────────────────────────────────────────────────── */

const Tab   = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function UserTabs() {
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
          tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
          tabBarIcon: ({ color }) => {
            const sz = 22;
            switch (route.name) {
              case "Home":       return <Home         size={sz} color={color} />;
              case "Categories": return <Grid2x2      size={sz} color={color} />;
              case "Cart":       return <ShoppingCart size={sz} color={color} />;
              case "Wishlist":   return <Heart        size={sz} color={color} />;
              case "Profile":    return <User         size={sz} color={color} />;
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

      {/* WhatsApp FAB — floats above tab bar on all tab screens */}
      <WhatsAppButton />
    </>
  );
}

/* ─── ROOT APP ────────────────────────────────────────────────────────────── */

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AdminAuthProvider>
      <CartProvider>
<BannerProvider>
  <WishlistProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Login"
              >
                {/* ── Auth ── */}
                <Stack.Screen name="Login"          component={LoginScreen} />
                <Stack.Screen name="Register"       component={RegisterScreen}       options={{ animation: "slide_from_right" }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ animation: "slide_from_right" }} />
                <Stack.Screen name="ResetPassword"  component={ResetPasswordScreen}  options={{ animation: "slide_from_right" }} />

                {/* ── User app ── */}
                <Stack.Screen name="Tabs" component={UserTabs} />

                {/* ── Products ── */}
                <Stack.Screen name="ProductDetail"  component={ProductDetailScreen} options={{ animation: "slide_from_right" }} />
                <Stack.Screen name="CategoryDetail" component={ProductListScreen}   options={{ animation: "slide_from_right" }} />

                {/* ── Shopping flow ── */}
                <Stack.Screen name="Search"       component={SearchScreen}       options={{ animation: "slide_from_right" }} />
                <Stack.Screen name="Checkout"     component={CheckoutScreen}     options={{ animation: "slide_from_right" }} />
                <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} options={{ animation: "fade", gestureEnabled: false }} />

                {/* ── Account ── */}
                <Stack.Screen name="Orders"        component={OrdersScreen}        options={{ animation: "slide_from_right" }} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ animation: "slide_from_right" }} />
                <Stack.Screen name="Settings"      component={SettingsScreen}      options={{ animation: "slide_from_right" }} />

                {/* ── Admin panel ── */}
                <Stack.Screen name="Admin" component={AdminPanel} />

                {/* ── Fallback ── */}
                <Stack.Screen name="NotFound" component={NotFoundScreen} />
              </Stack.Navigator>

              {/* Splash overlays everything on first launch */}
              {showSplash && (
                <SplashScreen onFinish={() => setShowSplash(false)} />
              )}

              <StatusBar style="dark" />
            </NavigationContainer>
          </SafeAreaProvider>
      </WishlistProvider>
  </BannerProvider>
        </CartProvider>
    </AdminAuthProvider>
  );
}