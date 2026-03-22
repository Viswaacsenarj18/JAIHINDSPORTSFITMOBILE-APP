import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreditCard, Banknote, Smartphone, Truck } from "lucide-react-native";
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
const mockTotalPrice = mockItems.reduce((s, i) => s + i.product.price * i.quantity, 0);

const CheckoutScreen = () => {
  const navigation = useNavigation<NavProp>();
  const [address, setAddress]               = useState("");
  const [city, setCity]                     = useState("");
  const [pincode, setPincode]               = useState("");
  const [phone, setPhone]                   = useState("");
  const [paymentMethod, setPaymentMethod]   = useState("cod");
  const [error, setError]                   = useState("");

  // const { items, totalPrice, clearCart } = useCart();
  const items      = mockItems;
  const totalPrice = mockTotalPrice;

  const deliveryCharge = totalPrice > 999 ? 0 : 49;
  const grandTotal     = totalPrice + deliveryCharge;

  const handleOrder = () => {
    setError("");
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

        {/* Order Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Summary</Text>
          {items.map((item, idx) => (
            <View key={item.product.id} style={[styles.summaryRow, idx < items.length - 1 && styles.borderBottom]}>
              <Text style={styles.summaryLabel} numberOfLines={1}>
                {item.product.name} x{item.quantity}
              </Text>
              <Text style={styles.summaryValue}>
                ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
              </Text>
            </View>
          ))}
          <View style={[styles.summaryRow, styles.borderTop]}>
            <View style={styles.deliveryLabel}>
              <Truck size={14} color="#9CA3AF" />
              <Text style={styles.summaryLabel}>Delivery</Text>
            </View>
            <Text style={[styles.summaryValue, deliveryCharge === 0 && styles.free]}>
              {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.borderTop, { marginTop: 8 }]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{grandTotal.toLocaleString("en-IN")}</Text>
          </View>
        </View>

        {/* Error */}
        {!!error && <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View>}

        {/* Delivery Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Details</Text>
          <Text style={styles.fieldLabel}>Delivery Address</Text>
          <TextInput
            value={address} onChangeText={setAddress}
            placeholder="House no, Street, Area"
            placeholderTextColor="#9CA3AF"
            multiline numberOfLines={2}
            style={[styles.input, styles.textarea]}
            textAlignVertical="top"
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>City</Text>
              <TextInput value={city} onChangeText={setCity} placeholder="City"
                placeholderTextColor="#9CA3AF" style={styles.input} />
            </View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>Pincode</Text>
              <TextInput value={pincode} onChangeText={setPincode} placeholder="Pincode"
                placeholderTextColor="#9CA3AF" keyboardType="numeric" style={styles.input} />
            </View>
          </View>
          <Text style={styles.fieldLabel}>Phone Number</Text>
          <TextInput value={phone} onChangeText={setPhone} placeholder="+91 98765 43210"
            placeholderTextColor="#9CA3AF" keyboardType="phone-pad" style={styles.input} />
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          {paymentMethods.map((pm) => {
            const active = paymentMethod === pm.id;
            return (
              <TouchableOpacity key={pm.id} style={[styles.paymentBtn, active && styles.paymentBtnActive]}
                onPress={() => setPaymentMethod(pm.id)} activeOpacity={0.8}>
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

        {/* Place Order */}
        <TouchableOpacity onPress={handleOrder} activeOpacity={0.88} style={{ marginBottom: 32 }}>
          <LinearGradient colors={["#E11D48", "#9F1239"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.placeOrderBtn}>
            <Text style={styles.placeOrderText}>Place Order • ₹{grandTotal.toLocaleString("en-IN")}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8F8F8" },
  content: { padding: 16, gap: 14 },
  card: {
    backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 3, gap: 10,
  },
  cardTitle: { fontSize: 15, fontWeight: "800", color: "#111111" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  borderBottom: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#E5E5E5" },
  borderTop: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#E5E5E5", marginTop: 4 },
  summaryLabel: { fontSize: 13, color: "#6B7280", flex: 1, marginRight: 8 },
  summaryValue: { fontSize: 13, fontWeight: "600", color: "#111111" },
  deliveryLabel: { flexDirection: "row", alignItems: "center", gap: 6 },
  free: { color: "#16A34A", fontWeight: "700" },
  totalLabel: { fontSize: 15, fontWeight: "800", color: "#111111" },
  totalValue: { fontSize: 18, fontWeight: "800", color: "#111111" },
  errorBox: { backgroundColor: "rgba(239,68,68,0.10)", borderRadius: 12, padding: 14 },
  errorText: { fontSize: 13, color: "#EF4444" },
  fieldLabel: { fontSize: 11, fontWeight: "600", color: "#6B7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.4 },
  input: {
    height: 48, backgroundColor: "#F3F4F6", borderRadius: 12,
    borderWidth: 1, borderColor: "#E5E5E5",
    paddingHorizontal: 14, fontSize: 14, color: "#111111",
  },
  textarea: { height: 72, paddingTop: 12, paddingBottom: 12 },
  row: { flexDirection: "row" },
  paymentBtn: {
    flexDirection: "row", alignItems: "center", gap: 12,
    padding: 12, borderRadius: 12, borderWidth: 2, borderColor: "#E5E5E5",
  },
  paymentBtnActive: { borderColor: "#E11D48", backgroundColor: "rgba(225,29,72,0.04)" },
  paymentIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center",
  },
  paymentIconActive: { backgroundColor: "rgba(225,29,72,0.10)" },
  paymentLabel: { fontSize: 13, fontWeight: "700", color: "#111111" },
  paymentDesc: { fontSize: 10, color: "#9CA3AF", marginTop: 1 },
  placeOrderBtn: { height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center",
    shadowColor: "#E11D48", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.30, shadowRadius: 10, elevation: 6 },
  placeOrderText: { fontSize: 15, fontWeight: "800", color: "#FFFFFF" },
});