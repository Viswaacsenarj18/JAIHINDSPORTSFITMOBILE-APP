import React, { useState } from "react";
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, Alert,
} from "react-native";
import { Trash2, Eye } from "lucide-react-native";
import { adminUsers, AdminUser } from "../../data/adminMockData";
import ModalForm from "../../components/admin/ModalForm";

const AdminUsersPage = () => {
  const [users,    setUsers]    = useState<AdminUser[]>(adminUsers);
  const [selected, setSelected] = useState<AdminUser | null>(null);

  const handleDelete = (id: string) => {
    Alert.alert("Delete User", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => setUsers((prev) => prev.filter((u) => u.id !== id)) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{users.length} users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email} numberOfLines={1}>{item.email}</Text>
              <Text style={styles.meta}>{item.orders} orders · Joined {item.joinedDate}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => setSelected(item)} style={styles.actionBtn}>
                <Eye size={15} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.actionBtn, styles.deleteBtn]}>
                <Trash2 size={15} color="#E11D48" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <ModalForm open={!!selected} onClose={() => setSelected(null)} title="User Details">
        {selected && (
          <View style={styles.detail}>
            {[
              { label: "Name",         value: selected.name           },
              { label: "Email",        value: selected.email          },
              { label: "Joined",       value: selected.joinedDate     },
              { label: "Total Orders", value: String(selected.orders) },
            ].map(({ label, value }) => (
              <View key={label} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{label}</Text>
                <Text style={styles.detailValue}>{value}</Text>
              </View>
            ))}
          </View>
        )}
      </ModalForm>
    </View>
  );
};

export default AdminUsersPage;

const styles = StyleSheet.create({
  container:   { flex: 1 },
  count:       { fontSize: 13, color: "#6B7280", paddingHorizontal: 14, paddingVertical: 10 },
  list:        { paddingHorizontal: 14, paddingBottom: 32 },
  sep:         { height: StyleSheet.hairlineWidth, backgroundColor: "#F0F0F0" },
  row:         { flexDirection: "row", alignItems: "center", paddingVertical: 12, gap: 12 },
  avatar:      { width: 42, height: 42, borderRadius: 21, backgroundColor: "#E11D48", alignItems: "center", justifyContent: "center" },
  avatarText:  { fontSize: 16, fontWeight: "800", color: "#FFFFFF" },
  info:        { flex: 1 },
  name:        { fontSize: 14, fontWeight: "700", color: "#111111" },
  email:       { fontSize: 12, color: "#9CA3AF", marginTop: 1 },
  meta:        { fontSize: 11, color: "#9CA3AF", marginTop: 2 },
  actions:     { flexDirection: "row", gap: 6 },
  actionBtn:   { width: 32, height: 32, borderRadius: 8, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center" },
  deleteBtn:   { backgroundColor: "rgba(225,29,72,0.08)" },
  detail:      { gap: 2 },
  detailRow:   { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#F0F0F0" },
  detailLabel: { fontSize: 12, color: "#9CA3AF", fontWeight: "600" },
  detailValue: { fontSize: 13, color: "#111111", fontWeight: "600", flexShrink: 1, textAlign: "right", marginLeft: 12 },
});