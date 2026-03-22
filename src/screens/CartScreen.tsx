import React, { useState } from "react";
import {
  View, Text, Image, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar, Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import PageHeader from "../components/PageHeader";
// import { useCart } from "../context/CartContext";

// Placeholder until CartContext is wired
const mockItems = [
  { product: { id: "1", name: "Pro Cricket Bat - English Willow", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=400&fit=crop", price: 4999, category: "cricket" }, quantity: 1 },
  { product: { id: "2", name: "Match Football - FIFA Approved",   image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop", price: 1299, category: "football" }, quantity: 2 },
];

const CartScreen = () => {
  const navigation = useNavigation<any>();
  const [items, setItems] = useState(mockItems);

  const totalPrice = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) { setItems((prev) => prev.filter((i) => i.product.id !== id)); return; }
    setItems((prev) => prev.map((i) => i.product.id === id ? { ...i, quantity: qty } : i));
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <PageHeader title="Cart" showBack={false} />
        <View style={styles.empty}>
          <View style={styles.emptyIcon}><ShoppingBag size={32} color="#9CA3AF" /></View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add some products to get started</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Tabs")} activeOpacity={0.88}>
            <LinearGradient colors={["#E11D48", "#9F1239"]} style={styles.emptyBtn}>
              <Text style={styles.emptyBtnText}>Browse Products</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
      <PageHeader title={`Cart (${totalItems})`} showBack={false} />
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <View key={item.product.id} style={styles.card}>
            <Image source={{ uri: item.product.image }} style={styles.image} resizeMode="cover" />
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>{item.product.name}</Text>
              <Text style={styles.category}>{item.product.category}</Text>
              <View style={styles.bottomRow}>
                <Text style={styles.price}>₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</Text>
                <View style={styles.qtyRow}>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.product.id, item.quantity - 1)}>
                    <Minus size={14} color="#555555" />
                  </TouchableOpacity>
                  <Text style={styles.qty}>{item.quantity}</Text>
                  <TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnPrimary]} onPress={() => updateQty(item.product.id, item.quantity + 1)}>
                    <Plus size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnDelete]} onPress={() => updateQty(item.product.id, 0)}>
                    <Trash2 size={14} color="#E11D48" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
        <View style={{ height: 130 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerTop}>
          <Text style={styles.footerLabel}>Total ({totalItems} items)</Text>
          <Text style={styles.footerTotal}>₹{totalPrice.toLocaleString("en-IN")}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Checkout")} activeOpacity={0.88}>
          <LinearGradient colors={["#E11D48", "#9F1239"]} style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: "#F8F8F8" },
  list:          { padding: 16, gap: 12 },
  card:          { flexDirection: "row", gap: 12, backgroundColor: "#FFFFFF", borderRadius: 14, padding: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3 },
  image:         { width: 80, height: 80, borderRadius: 10, backgroundColor: "#F3F4F6" },
  info:          { flex: 1, justifyContent: "space-between" },
  name:          { fontSize: 13, fontWeight: "700", color: "#111111" },
  category:      { fontSize: 11, color: "#9CA3AF", textTransform: "capitalize", marginTop: 2 },
  bottomRow:     { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  price:         { fontSize: 14, fontWeight: "800", color: "#111111" },
  qtyRow:        { flexDirection: "row", alignItems: "center", gap: 6 },
  qtyBtn:        { width: 28, height: 28, borderRadius: 14, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center" },
  qtyBtnPrimary: { backgroundColor: "#E11D48" },
  qtyBtnDelete:  { backgroundColor: "rgba(225,29,72,0.10)", marginLeft: 2 },
  qty:           { fontSize: 13, fontWeight: "700", color: "#111111", minWidth: 18, textAlign: "center" },
  empty:         { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 14 },
  emptyIcon:     { width: 80, height: 80, borderRadius: 40, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center" },
  emptyTitle:    { fontSize: 18, fontWeight: "800", color: "#111111" },
  emptySub:      { fontSize: 13, color: "#6B7280", textAlign: "center" },
  emptyBtn:      { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 999 },
  emptyBtnText:  { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
  footer:        { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#FFFFFF", borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#E5E5E5", padding: 16, paddingBottom: Platform.OS === "ios" ? 30 : 16 },
  footerTop:     { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  footerLabel:   { fontSize: 13, color: "#6B7280" },
  footerTotal:   { fontSize: 22, fontWeight: "800", color: "#111111" },
  checkoutBtn:   { height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  checkoutText:  { fontSize: 15, fontWeight: "800", color: "#FFFFFF" },
});