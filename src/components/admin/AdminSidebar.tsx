// src/components/admin/AdminSidebar.tsx

import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  LayoutDashboard,
  Package,
  Grid3x3,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  X,
  Trophy,
} from "lucide-react-native";
import { useAdminAuth } from "../../context/AdminAuthContext";

const navItems = [
  { name: "AdminDashboard", icon: LayoutDashboard, label: "Dashboard" },
  { name: "AdminProducts", icon: Package, label: "Products" },
  { name: "AdminCategories", icon: Grid3x3, label: "Categories" },
  { name: "AdminOrders", icon: ShoppingCart, label: "Orders" },
  { name: "AdminUsers", icon: Users, label: "Users" },
  { name: "AdminSettings", icon: Settings, label: "Settings" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ open, onClose }: Props) => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { adminLogout } = useAdminAuth();

  const isActive = (name: string) => route.name === name;

  if (!open) return null;

  return (
    <View className="absolute inset-0 z-50 flex-row">
      
      {/* Overlay */}
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/40"
      />

      {/* Sidebar */}
      <View className="w-64 bg-white border-r border-gray-200 flex flex-col">
        
        {/* Header */}
        <View className="flex-row items-center justify-between p-5 border-b border-gray-200">
          <View className="flex-row items-center gap-2">
            <View className="w-9 h-9 rounded-lg bg-blue-500 items-center justify-center">
              <Trophy size={20} color="white" />
            </View>

            <View>
              <Text className="text-lg font-bold">JAIHIND</Text>
              <Text className="text-[10px] text-gray-400 -mt-1">
                Admin Panel
              </Text>
            </View>
          </View>

          <Pressable onPress={onClose}>
            <X size={20} color="#6b7280" />
          </Pressable>
        </View>

        {/* Navigation */}
        <View className="flex-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.name);

            return (
              <Pressable
                key={item.name}
                onPress={() => {
                  navigation.navigate(item.name);
                  onClose();
                }}
                className={`flex-row items-center gap-3 px-3 py-2.5 rounded-lg ${
                  active
                    ? "bg-blue-500"
                    : "bg-transparent"
                }`}
              >
                <Icon
                  size={20}
                  color={active ? "white" : "#6b7280"}
                />

                <Text
                  className={`text-sm ${
                    active
                      ? "text-white font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Logout */}
        <View className="p-3 border-t border-gray-200">
          <Pressable
            onPress={() => {
              adminLogout();
              onClose();
            }}
            className="flex-row items-center gap-3 px-3 py-2.5 rounded-lg"
          >
            <LogOut size={20} color="#ef4444" />
            <Text className="text-red-500 font-medium">Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AdminSidebar;