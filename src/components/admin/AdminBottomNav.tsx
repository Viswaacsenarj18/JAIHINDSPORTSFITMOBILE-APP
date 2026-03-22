import React from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Platform,
} from "react-native";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings,
} from "lucide-react-native";

export type AdminTab = "Dashboard" | "Products" | "Orders" | "Users" | "Settings";

interface AdminBottomNavProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

const tabs: { label: AdminTab; Icon: React.ElementType }[] = [
  { label: "Dashboard", Icon: LayoutDashboard },
  { label: "Products",  Icon: Package        },
  { label: "Orders",    Icon: ShoppingCart   },
  { label: "Users",     Icon: Users          },
  { label: "Settings",  Icon: Settings       },
];

const AdminBottomNav = ({ activeTab, onTabChange }: AdminBottomNavProps) => (
  <View style={styles.wrapper}>
    {tabs.map(({ label, Icon }) => {
      const active = activeTab === label;
      return (
        <TouchableOpacity
          key={label}
          style={styles.tab}
          onPress={() => onTabChange(label)}
          activeOpacity={0.7}
        >
          {active && <View style={styles.activeBar} />}
          <Icon size={20} color={active ? "#E11D48" : "#9CA3AF"} />
          <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
            {label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default AdminBottomNav;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E5E5",
    height: Platform.OS === "ios" ? 80 : 62,
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingTop: 8,
    position: "relative",
  },
  activeBar: {
    position: "absolute",
    top: 0,
    width: 32,
    height: 3,
    borderRadius: 999,
    backgroundColor: "#E11D48",
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: "#9CA3AF",
  },
  tabLabelActive: {
    color: "#E11D48",
    fontWeight: "700",
  },
});