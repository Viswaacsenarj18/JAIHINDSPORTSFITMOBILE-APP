import React from "react";
import { View, Text } from "react-native";

interface StatusBadgeProps {
  status: string;
  variant?: "order" | "payment";
}

const StatusBadge = ({ status, variant = "order" }: StatusBadgeProps) => {
  
  const getStyles = () => {
    if (variant === "payment") {
      switch (status) {
        case "paid":
          return { bg: "bg-green-100", text: "text-green-600" };
        case "pending":
          return { bg: "bg-yellow-100", text: "text-yellow-600" };
        case "failed":
          return { bg: "bg-red-100", text: "text-red-600" };
        default:
          return { bg: "bg-gray-100", text: "text-gray-500" };
      }
    }

    switch (status) {
      case "delivered":
        return { bg: "bg-green-100", text: "text-green-600" };
      case "processing":
        return { bg: "bg-blue-100", text: "text-blue-600" };
      case "pending":
        return { bg: "bg-yellow-100", text: "text-yellow-600" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-500" };
    }
  };

  const styles = getStyles();

  return (
    <View
      className={`px-2.5 py-1 rounded-full ${styles.bg} self-start`}
    >
      <Text
        className={`text-xs font-medium capitalize ${styles.text}`}
      >
        {status}
      </Text>
    </View>
  );
};

export default StatusBadge;