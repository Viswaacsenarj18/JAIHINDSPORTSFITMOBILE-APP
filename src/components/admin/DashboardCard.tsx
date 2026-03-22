import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface DashboardCardProps {
  title:    string;
  value:    string | number;
  icon:     React.ElementType;
  trend?:   string;
  trendUp?: boolean;
}

const DashboardCard = ({ title, value, icon: Icon, trend, trendUp }: DashboardCardProps) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <View style={styles.textCol}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
        {trend && (
          <Text style={[styles.trend, trendUp ? styles.trendUp : styles.trendDown]}>
            {trendUp ? "↑" : "↓"} {trend}
          </Text>
        )}
      </View>
      <View style={styles.iconBox}>
        <Icon size={20} color="#E11D48" />
      </View>
    </View>
  </View>
);

export default DashboardCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textCol: {
    gap: 4,
  },
  title: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  value: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111111",
  },
  trend: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  trendUp: {
    color: "#16A34A",
  },
  trendDown: {
    color: "#E11D48",
  },
  iconBox: {
    width: 42, height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(225,29,72,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
});