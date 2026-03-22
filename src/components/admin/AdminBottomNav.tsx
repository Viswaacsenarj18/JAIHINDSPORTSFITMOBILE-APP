import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react-native";

const tabs = [
  { name: "AdminDashboard", icon: LayoutDashboard, label: "Dashboard" },
  { name: "AdminProducts", icon: Package, label: "Products" },
  { name: "AdminOrders", icon: ShoppingCart, label: "Orders" },
  { name: "AdminUsers", icon: Users, label: "Users" },
  { name: "AdminSettings", icon: Settings, label: "Settings" },
];

const AdminBottomNav = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const isActive = (name: string) => {
    return route.name === name;
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
      <View className="flex-row items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.name);

          return (
            <Pressable
              key={tab.name}
              onPress={() => navigation.navigate(tab.name)}
              className="items-center justify-center px-2 py-1"
            >
              <Icon
                size={20}
                color={active ? "#3b82f6" : "#9ca3af"}
              />

              <Text
                className={`text-[10px] ${
                  active ? "text-blue-500 font-semibold" : "text-gray-400"
                }`}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default AdminBottomNav;