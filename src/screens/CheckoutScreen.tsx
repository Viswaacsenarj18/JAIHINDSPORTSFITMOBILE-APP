import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar, Modal, FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreditCard, Banknote, Smartphone, Truck, Edit2, Trash2, Plus, Minus, X } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import PageHeader from "../components/PageHeader";

// ─── Replace with real context imports when ready ─────────────────────────────
// import { useCart } from "../context/CartContext";
// import { useOrders } from "../context/OrderContext";
// import { useNotifications } from "../context/NotificationContext";

type RootStackParamList = {
  OrderSuccess: { orderId: string };
  [key: string]: object | undefined;
};
type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface CartItem {
  product: { id: string; name: string; price: number };
  quantity: number;
}

const paymentMethods = [
  { id: "cod",  label: "Cash on Delivery",  Icon: Banknote,    desc: "Pay when delivered" },
  { id: "card", label: "Credit/Debit Card", Icon: CreditCard,  desc: "Visa, Mastercard, RuPay" },
  { id: "upi",  label: "UPI Payment",       Icon: Smartphone,  desc: "GPay, PhonePe, Paytm" },
];

// Placeholder cart data — remove when CartContext is wired
const mockItems = [
  { product: { id: "1", name: "Pro Cricket Bat", price: 4999 }, quantity: 1 },
  { product: { id: "2", name: "Match Football",  price: 1299 }, quantity: 2 },
];

const CheckoutScreen = () => {
  const navigation = useNavigation<NavProp>();
  const [items, setItems] = useState<CartItem[]>(mockItems);
  const [address, setAddress]               = useState("");
  const [city, setCity]                     = useState("");
  const [pincode, setPincode]               = useState("");
  const [phone, setPhone]                   = useState("");
  const [paymentMethod, setPaymentMethod]   = useState("cod");
  const [error, setError]                   = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [editQuantity, setEditQuantity] = useState("");

  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryCharge = totalPrice > 999 ? 0 : 49;
  const grandTotal = totalPrice + deliveryCharge;

  // ─── Edit Item Handler ─────────────────────────────────────────────────────────
  const handleEditItem = (item: CartItem) => {
    setEditingItem(item);
    setEditQuantity(item.quantity.toString());
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    const newQty = parseInt(editQuantity, 10);
    if (isNaN(newQty) || newQty < 1) {
      setError("Quantity must be at least 1");
      return;
    }
    setItems(
      items.map((item) =>
        item.product.id === editingItem.product.id
          ? { ...item, quantity: newQty }
          : item
      )
    );
    setEditModalVisible(false);
    setEditingItem(null);
    setEditQuantity("");
    setError("");
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setEditingItem(null);
    setEditQuantity("");
  };

  // ─── Delete Item Handler ──────────────────────────────────────────────────────
  const handleDeleteItem = (productId: string) => {
    setItems(items.filter((item) => item.product.id !== productId));
    setError("");
  };

  // ─── Quantity Adjustment in Modal ─────────────────────────────────────────────
  const decreaseQuantity = () => {
    const newQty = Math.max(1, parseInt(editQuantity, 10) - 1);
    setEditQuantity(newQty.toString());
  };

  const increaseQuantity = () => {
    const newQty = parseInt(editQuantity, 10) + 1;
    setEditQuantity(newQty.toString());
  };

  // ─── Place Order Handler ──────────────────────────────────────────────────────
  const handleOrder = () => {
    setError("");
    if (items.length === 0) {
      setError("Cart is empty. Please add items.");
      return;
    }
    if (!address || !phone || !city || !pincode) {
      setError("Please fill all delivery details");
      return;
    }
    const orderId = `ORD-${Date.now()}`;
    // placeOrder(items, totalPrice, `${address}, ${city} - ${pincode}`);
    // addNotification("Order Placed! 🎉", `Your order ${orderId} has been placed.`, "order");
    // clearCart();
    navigation.navigate("OrderSuccess", { orderId });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <PageHeader title="Checkout" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ─── Order Summary with Edit/Delete ─── */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Order Summary</Text>
            <Text style={styles.itemCount}>{items.length} item{items.length !== 1 ? "s" : ""}</Text>
          </View>

          {items.length === 0 ? (
            <Text style={styles.emptyCart}>Your cart is empty</Text>
          ) : (
            items.map((item, idx) => (
              <View key={item.product.id}>
                <View style={[styles.summaryRow, idx < items.length - 1 && styles.borderBottom]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.summaryLabel} numberOfLines={1}>
                      {item.product.name} x{item.quantity}
                    </Text>
                    <Text style={styles.itemPrice}>
                      ₹{item.product.price.toLocaleString("en-IN")} each
                    </Text>
                  </View>
                  <Text style={styles.summaryValue}>
                    ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </Text>
                </View>

                {/* Edit & Delete Buttons */}
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => handleEditItem(item)}
                    activeOpacity={0.6}
                  >
                    <Edit2 size={14} color="#E11D48" />
                    <Text style={styles.editBtnText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteItem(item.product.id)}
                    activeOpacity={0.6}
                  >
                    <Trash2 size={14} color="#EF4444" />
                    <Text style={styles.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}

          {items.length > 0 && (
            <>
              <View style={[styles.summaryRow, styles.borderTop]}>
                <View style={styles.deliveryLabelContainer}>
                  <Truck size={14} color="#111111" />
                  <Text style={styles.deliveryText}>Delivery</Text>
                </View>
                <Text style={[styles.summaryValue, deliveryCharge === 0 && styles.free]}>
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </Text>
              </View>
              <View style={[styles.summaryRow, styles.borderTop, { marginTop: 8 }]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹{grandTotal.toLocaleString("en-IN")}</Text>
              </View>
            </>
          )}
        </View>

        {/* ─── Error Message ─── */}
        {!!error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* ─── Delivery Details ─── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Details</Text>
          <Text style={styles.fieldLabel}>Delivery Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="House no, Street, Area"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={2}
            style={[styles.input, styles.textarea]}
            textAlignVertical="top"
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>City</Text>
              <TextInput
                value={city}
                onChangeText={setCity}
                placeholder="City"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
              />
            </View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>Pincode</Text>
              <TextInput
                value={pincode}
                onChangeText={setPincode}
                placeholder="Pincode"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          </View>
          <Text style={styles.fieldLabel}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="+91 98765 43210"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>

        {/* ─── Payment Method ─── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          {paymentMethods.map((pm) => {
            const active = paymentMethod === pm.id;
            return (
              <TouchableOpacity
                key={pm.id}
                style={[styles.paymentBtn, active && styles.paymentBtnActive]}
                onPress={() => setPaymentMethod(pm.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.paymentIcon, active && styles.paymentIconActive]}>
                  <pm.Icon size={18} color={active ? "#E11D48" : "#9CA3AF"} />
                </View>
                <View>
                  <Text style={styles.paymentLabel}>{pm.label}</Text>
                  <Text style={styles.paymentDesc}>{pm.desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ─── Place Order Button ─── */}
        {items.length > 0 && (
          <TouchableOpacity onPress={handleOrder} activeOpacity={0.88} style={{ marginBottom: 32 }}>
            <LinearGradient
              colors={["#E11D48", "#9F1239"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.placeOrderBtn}
            >
              <Text style={styles.placeOrderText}>
                Place Order • ₹{grandTotal.toLocaleString("en-IN")}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* ─── Edit Item Modal ─── */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCancelEdit}
      >
        <SafeAreaView style={styles.modalSafe}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleCancelEdit} style={styles.closeBtn}>
              <X size={24} color="#111111" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Item</Text>
            <View style={{ width: 32 }} />
          </View>

          <ScrollView style={styles.modalContent} contentContainerStyle={{ gap: 20 }}>
            {editingItem && (
              <>
                {/* Product Info */}
                <View style={styles.modalCard}>
                  <Text style={styles.modalCardTitle}>Product</Text>
                  <Text style={styles.productName}>{editingItem.product.name}</Text>
                  <Text style={styles.productPrice}>
                    ₹{editingItem.product.price.toLocaleString("en-IN")} per unit
                  </Text>
                </View>

                {/* Quantity Selector */}
                <View style={styles.modalCard}>
                  <Text style={styles.modalCardTitle}>Quantity</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={decreaseQuantity}
                      activeOpacity={0.6}
                    >
                      <Minus size={20} color="#E11D48" />
                    </TouchableOpacity>
                    <TextInput
                      value={editQuantity}
                      onChangeText={setEditQuantity}
                      keyboardType="numeric"
                      style={styles.quantityInput}
                      textAlign="center"
                    />
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={increaseQuantity}
                      activeOpacity={0.6}
                    >
                      <Plus size={20} color="#E11D48" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.priceBreakdown}>
                    <Text style={styles.breakdownLabel}>Unit Price</Text>
                    <Text style={styles.breakdownValue}>
                      ₹{editingItem.product.price.toLocaleString("en-IN")}
                    </Text>
                  </View>
                  <View style={styles.priceBreakdown}>
                    <Text style={styles.breakdownLabel}>Subtotal</Text>
                    <Text style={styles.breakdownValue}>
                      ₹{(editingItem.product.price * parseInt(editQuantity || "1", 10)).toLocaleString("en-IN")}
                    </Text>
                  </View>
                </View>

                {/* Error in Modal */}
                {!!error && (
                  <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                {/* Save Button */}
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.88}>
                  <LinearGradient
                    colors={["#E11D48", "#9F1239"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.saveBtn}
                  >
                    <Text style={styles.saveBtnText}>Save Changes</Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Delete Option in Modal */}
                <TouchableOpacity
                  onPress={() => {
                    handleDeleteItem(editingItem.product.id);
                    handleCancelEdit();
                  }}
                  activeOpacity={0.8}
                  style={styles.deleteModal}
                >
                  <Text style={styles.deleteModalText}>Delete from Cart</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  // ─── Main Screen ──────────────────────────────────────────────────────────────
  safe: { flex: 1, backgroundColor: "#F8F8F8" },
  content: { padding: 16, gap: 14 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    gap: 10,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { fontSize: 15, fontWeight: "800", color: "#111111" },
  itemCount: { fontSize: 12, fontWeight: "600", color: "#9CA3AF" },
  emptyCart: { fontSize: 14, color: "#9CA3AF", textAlign: "center", paddingVertical: 20 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 },
  borderBottom: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#E5E5E5" },
  borderTop: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#E5E5E5", marginTop: 4 },
  summaryLabel: { fontSize: 13, color: "#6B7280", flex: 1, marginRight: 8 },
  itemPrice: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },
  summaryValue: { fontSize: 13, fontWeight: "600", color: "#111111" },
  deliveryLabelContainer: { flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 6 },
  deliveryText: { fontSize: 13, color: "#6B7280", fontWeight: "500" },
  free: { color: "#16A34A", fontWeight: "700" },
  totalLabel: { fontSize: 15, fontWeight: "800", color: "#111111" },
  totalValue: { fontSize: 18, fontWeight: "800", color: "#111111" },

  // ─── Action Buttons (Edit/Delete) ─────────────────────────────────────────────
  actionRow: { flexDirection: "row", gap: 8, marginTop: 8, marginBottom: 12 },
  editBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(225,29,72,0.08)",
    borderWidth: 1,
    borderColor: "rgba(225,29,72,0.2)",
  },
  editBtnText: { fontSize: 12, fontWeight: "600", color: "#E11D48" },
  deleteBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(239,68,68,0.08)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.2)",
  },
  deleteBtnText: { fontSize: 12, fontWeight: "600", color: "#EF4444" },

  // ─── Error Box ────────────────────────────────────────────────────────────────
  errorBox: { backgroundColor: "rgba(239,68,68,0.10)", borderRadius: 12, padding: 14 },
  errorText: { fontSize: 13, color: "#EF4444" },

  // ─── Form Fields ──────────────────────────────────────────────────────────────
  fieldLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  input: {
    height: 48,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#111111",
  },
  textarea: { height: 72, paddingTop: 12, paddingBottom: 12 },
  row: { flexDirection: "row" },

  // ─── Payment Method ───────────────────────────────────────────────────────────
  paymentBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E5E5",
  },
  paymentBtnActive: { borderColor: "#E11D48", backgroundColor: "rgba(225,29,72,0.04)" },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  paymentIconActive: { backgroundColor: "rgba(225,29,72,0.10)" },
  paymentLabel: { fontSize: 13, fontWeight: "700", color: "#111111" },
  paymentDesc: { fontSize: 10, color: "#9CA3AF", marginTop: 1 },

  // ─── Place Order Button ───────────────────────────────────────────────────────
  placeOrderBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  placeOrderText: { fontSize: 15, fontWeight: "800", color: "#FFFFFF" },

  // ─── Modal Styles ─────────────────────────────────────────────────────────────
  modalSafe: { flex: 1, backgroundColor: "#F8F8F8" },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  closeBtn: { width: 32, height: 32, justifyContent: "center" },
  modalTitle: { fontSize: 16, fontWeight: "800", color: "#111111" },
  modalContent: { flex: 1, padding: 16, paddingBottom: 32 },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  modalCardTitle: { fontSize: 13, fontWeight: "700", color: "#6B7280", textTransform: "uppercase" },
  productName: { fontSize: 16, fontWeight: "800", color: "#111111" },
  productPrice: { fontSize: 14, fontWeight: "600", color: "#E11D48" },

  // ─── Quantity Selector ────────────────────────────────────────────────────────
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  quantityBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(225,29,72,0.08)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(225,29,72,0.2)",
  },
  quantityInput: {
    flex: 1,
    height: 44,
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  // ─── Price Breakdown ──────────────────────────────────────────────────────────
  priceBreakdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  breakdownLabel: { fontSize: 13, color: "#6B7280", fontWeight: "600" },
  breakdownValue: { fontSize: 14, color: "#111111", fontWeight: "700" },

  // ─── Modal Buttons ────────────────────────────────────────────────────────────
  saveBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtnText: { fontSize: 15, fontWeight: "800", color: "#FFFFFF" },
  deleteModal: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "rgba(239,68,68,0.08)",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.2)",
  },
  deleteModalText: { fontSize: 14, fontWeight: "600", color: "#EF4444" },
});