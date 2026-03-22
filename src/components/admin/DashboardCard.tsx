import React from "react";
import { View, Text } from "react-native";
import { LucideIcon } from "lucide-react-native";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
}: DashboardCardProps) => {
  return (
    <View className="bg-white rounded-xl border border-gray-200 p-5 shadow-md">
      
      <View className="flex-row items-start justify-between">
        
        {/* LEFT CONTENT */}
        <View>
          <Text className="text-sm text-gray-500">
            {title}
          </Text>

          <Text className="text-2xl font-bold text-gray-900 mt-1">
            {value}
          </Text>

          {trend && (
            <Text
              className={`text-xs mt-1 ${
                trendUp ? "text-green-500" : "text-red-500"
              }`}
            >
              {trendUp ? "↑" : "↓"} {trend}
            </Text>
          )}
        </View>

        {/* ICON BOX */}
        <View className="w-10 h-10 rounded-lg bg-gray-100 items-center justify-center">
          <Icon size={20} color="#374151" />
        </View>

      </View>
    </View>
  );
};

export default DashboardCard;