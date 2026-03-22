import React, { useState } from "react";
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from "react-native";
import { adminOrders, AdminOrder } from "../../data/adminMockData";
import StatusBadge from "../../components/admin/StatusBadge";
import ModalForm   from "../../components/admin/ModalForm";

const AdminOrdersPage = () => {
  const [orders,   setOrders]   = useState<AdminOrder[]>(adminOrders);
  const [selected, setSelected] = useState<AdminOrder | null>(null);

  const updateStatus = (id: string, status: AdminOrder["orderStatus"]) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, orderStatus: status } : o));
    setSelected(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{orders.length} orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => setSelected(item)} activeOpacity={0.75}>
            <View style={styles.rowLeft}>
              <Text style={styles.orderId}>{item.id}</Text>
              <Text style={styles.customerName}>{item.customerName}</Text>
              <Text style={styles.date}>{item.date} · {item.items} item{item.items > 1 ? "s" : ""}</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.amount}>₹{item.amount.toLocaleString("en-IN")}</Text>
              <StatusBadge status={item.orderStatus} />
              <StatusBadge status={item.paymentStatus} variant="payment" />
            </View>
          </TouchableOpacity>
        )}
      />
      <ModalForm open={!!selected} onClose={() => setSelected(null)} title="Order Details">
        {selected && (
          <View style={styles.detail}>
            {[
              { label: "Order ID",  value: selected.id },
              { label: "Customer", value: selected.customerName },
              { label: "Email",    value: selected.email },
              { label: "Amount",   value: `₹${selected.amount.toLocaleString("en-IN")}` },
              { label: "Items",    value: String(selected.items) },
              { label: "Date",     value: selected.date },
            ].map(({ label, value }) => (
              <View key={label} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{label}</Text>
                <Text style={styles.detailValue} numberOfLines={1}>{value}</Text>
              </View>
            ))}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment</Text>
              <StatusBadge status={selected.paymentStatus} variant="payment" />
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Order Status</Text>
              <StatusBadge status={selected.orderStatus} />
            </View>
            <Text style={styles.updateLabel}>Update Order Status</Text>
            <View style={styles.statusBtns}>
              {(["pending","processing","delivered"] as AdminOrder["orderStatus"][]).map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.statusBtn, selected.orderStatus === s && styles.statusBtnActive]}
                  onPress={() => updateStatus(selected.id, s)}
                >
                  <Text style={[styles.statusBtnTxt, selected.orderStatus === s && styles.statusBtnTxtActive]}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ModalForm>
    </View>
  );
};

export default AdminOrdersPage;

const styles = StyleSheet.create({
  container:          { flex: 1 },
  count:              { fontSize: 13, color: "#6B7280", paddingHorizontal: 14, paddingVertical: 10 },
  list:               { paddingHorizontal: 14, paddingBottom: 32 },
  sep:                { height: StyleSheet.hairlineWidth, backgroundColor: "#F0F0F0" },
  row:                { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 14 },
  rowLeft:            { flex: 1, gap: 3 },
  orderId:            { fontSize: 13, fontWeight: "700", color: "#111111" },
  customerName:       { fontSize: 12, color: "#6B7280" },
  date:               { fontSize: 11, color: "#9CA3AF" },
  rowRight:           { alignItems: "flex-end", gap: 5 },
  amount:             { fontSize: 14, fontWeight: "800", color: "#111111" },
  detail:             { gap: 10 },
  detailRow:          { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 7, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#F0F0F0" },
  detailLabel:        { fontSize: 12, color: "#9CA3AF", fontWeight: "600" },
  detailValue:        { fontSize: 13, color: "#111111", fontWeight: "600", flexShrink: 1, textAlign: "right", marginLeft: 12 },
  updateLabel:        { fontSize: 12, fontWeight: "700", color: "#6B7280", marginTop: 14, textTransform: "uppercase", letterSpacing: 0.4 },
  statusBtns:         { flexDirection: "row", gap: 8, marginTop: 8 },
  statusBtn:          { flex: 1, height: 36, borderRadius: 8, borderWidth: 1, borderColor: "#E5E5E5", alignItems: "center", justifyContent: "center" },
  statusBtnActive:    { backgroundColor: "#E11D48", borderColor: "#E11D48" },
  statusBtnTxt:       { fontSize: 11, fontWeight: "600", color: "#6B7280" },
  statusBtnTxtActive: { color: "#FFFFFF" },
});