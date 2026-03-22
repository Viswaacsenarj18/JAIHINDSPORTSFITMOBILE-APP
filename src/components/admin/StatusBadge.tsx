import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatusBadgeProps {
  status:   string;
  variant?: "order" | "payment";
}

type ColorMap = { bg: string; text: string };

const orderColors: Record<string, ColorMap> = {
  delivered:  { bg: "rgba(22,163,74,0.12)",  text: "#16A34A" },
  processing: { bg: "rgba(225,29,72,0.10)",  text: "#E11D48" },
  pending:    { bg: "rgba(245,158,11,0.12)", text: "#D97706" },
};

const paymentColors: Record<string, ColorMap> = {
  paid:    { bg: "rgba(22,163,74,0.12)",  text: "#16A34A" },
  pending: { bg: "rgba(245,158,11,0.12)", text: "#D97706" },
  failed:  { bg: "rgba(225,29,72,0.10)",  text: "#E11D48" },
};

const fallback: ColorMap = { bg: "#F3F4F6", text: "#6B7280" };

const StatusBadge = ({ status, variant = "order" }: StatusBadgeProps) => {
  const map = variant === "payment" ? paymentColors : orderColors;
  const { bg, text } = map[status.toLowerCase()] ?? fallback;

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: text }]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
};

export default StatusBadge;

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  text: {
    fontSize: 11,
    fontWeight: "700",
  },
});