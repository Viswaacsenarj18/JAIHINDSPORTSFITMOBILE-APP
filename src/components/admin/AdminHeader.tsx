import React from "react";
import { View, Text, Pressable } from "react-native";
import { Menu, Bell } from "lucide-react-native";
import { useAdminAuth } from "../../context/AdminAuthContext";

interface AdminHeaderProps {
  onMenuToggle: () => void;
  title: string;
}

const AdminHeader = ({ onMenuToggle, title }: AdminHeaderProps) => {
  const { admin } = useAdminAuth();

  return (
    <View className="bg-white border-b border-gray-200 px-4 py-3 flex-row items-center justify-between">
      
      {/* LEFT SECTION */}
      <View className="flex-row items-center gap-3">
        <Pressable
          onPress={onMenuToggle}
          className="p-2 rounded-lg active:bg-gray-100"
        >
          <Menu size={20} color="#111827" />
        </Pressable>

        <Text className="text-lg font-semibold text-gray-900">
          {title}
        </Text>
      </View>

      {/* RIGHT SECTION */}
      <View className="flex-row items-center gap-3">
        
        {/* Notification */}
        <Pressable className="p-2 rounded-lg relative">
          <Bell size={20} color="#6b7280" />

          {/* Badge */}
          <View className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
        </Pressable>

        {/* Avatar */}
        <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center">
          <Text className="text-white text-sm font-bold">
            {admin?.name?.charAt(0) || "A"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AdminHeader;