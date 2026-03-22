import React from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar,
} from "react-native";
import { Menu, Bell } from "lucide-react-native";

interface AdminHeaderProps {
  title:        string;
  onMenuToggle: () => void;
  adminName?:   string;
}

const AdminHeader = ({ title, onMenuToggle, adminName = "A" }: AdminHeaderProps) => (
  <View style={styles.wrapper}>
    <View style={styles.left}>
      <TouchableOpacity
        onPress={onMenuToggle}
        style={styles.iconBtn}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Menu size={22} color="#111111" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>

    <View style={styles.right}>
      {/* Bell */}
      <TouchableOpacity style={styles.iconBtn}>
        <Bell size={20} color="#6B7280" />
        <View style={styles.dot} />
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {adminName.charAt(0).toUpperCase()}
        </Text>
      </View>
    </View>
  </View>
);

export default AdminHeader;

const ANDROID_TOP = Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) : 0;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5E5",
    paddingTop: ANDROID_TOP,
    height: 56 + ANDROID_TOP,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center", justifyContent: "center",
    position: "relative",
  },
  dot: {
    position: "absolute", top: 7, right: 7,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: "#E11D48",
    borderWidth: 1.5, borderColor: "#FFFFFF",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
  },
  avatar: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: "#E11D48",
    alignItems: "center", justifyContent: "center",
  },
  avatarText: {
    fontSize: 14, fontWeight: "800", color: "#FFFFFF",
  },
});