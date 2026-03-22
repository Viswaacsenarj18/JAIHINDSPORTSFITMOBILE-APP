import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import PageHeader from "../components/PageHeader";
import { useCart } from "../context/CartContext";

const CartScreen = () => {
  const navigation                              = useNavigation<any>();
  const { items, totalPrice, totalItems, updateQuantity, removeFromCart } = useCart();

  // ── Empty state ──────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
        <PageHeader title="Cart" showBack={false} />
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <ShoppingBag size={32} color="#9CA3AF" />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add some products to get started</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Home")} activeOpacity={0.88}>
            <LinearGradient colors={["#E11D48", "#F97316"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.emptyBtn}>
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

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <View key={item.product.id} style={styles.card}>
            {/* Image */}
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductDetail", { productId: item.product.id })}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: item.product.image }}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>

            {/* Info */}
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={2}>{item.product.name}</Text>
              <Text style={styles.category}>{item.product.category}</Text>

              <View style={styles.bottomRow}>
                {/* Price */}
                <Text style={styles.price}>
                  ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                </Text>

                {/* Qty controls */}
                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                    hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
                  >
                    <Minus size={14} color="#555555" />
                  </TouchableOpacity>

                  <Text style={styles.qty}>{item.quantity}</Text>

                  <TouchableOpacity
                    style={[styles.qtyBtn, styles.qtyBtnPrimary]}
                    onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                    hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
                  >
                    <Plus size={14} color="#FFFFFF" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.qtyBtn, styles.qtyBtnDelete]}
                    onPress={() => removeFromCart(item.product.id)}
                    hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
                  >
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
          <Text style={styles.footerLabel}>Total ({totalItems} item{totalItems > 1 ? "s" : ""})</Text>
          <Text style={styles.footerTotal}>₹{totalPrice.toLocaleString("en-IN")}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Checkout")}
          activeOpacity={0.88}
        >
          <LinearGradient
            colors={["#E11D48", "#F97316"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.checkoutBtn}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: "#F8F8F8" },
  list:           { padding: 16, gap: 12 },

  // Empty
  empty:          { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 14 },
  emptyIcon:      { width: 80, height: 80, borderRadius: 40, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center" },
  emptyTitle:     { fontSize: 18, fontWeight: "800", color: "#111111" },
  emptySub:       { fontSize: 13, color: "#6B7280", textAlign: "center" },
  emptyBtn:       { paddingHorizontal: 28, paddingVertical: 13, borderRadius: 999 },
  emptyBtnText:   { fontSize: 14, fontWeight: "700", color: "#FFFFFF" },

  // Card
  card:           { flexDirection: "row", backgroundColor: "#FFFFFF", borderRadius: 14, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3 },
  image:          { width: 90, height: 90, backgroundColor: "#F3F4F6" },
  info:           { flex: 1, padding: 12, justifyContent: "space-between" },
  name:           { fontSize: 13, fontWeight: "700", color: "#111111", lineHeight: 18 },
  category:       { fontSize: 11, color: "#9CA3AF", textTransform: "capitalize", marginTop: 2 },
  bottomRow:      { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  price:          { fontSize: 14, fontWeight: "800", color: "#111111" },
  qtyRow:         { flexDirection: "row", alignItems: "center", gap: 6 },
  qtyBtn:         { width: 28, height: 28, borderRadius: 14, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center" },
  qtyBtnPrimary:  { backgroundColor: "#E11D48" },
  qtyBtnDelete:   { backgroundColor: "rgba(225,29,72,0.10)", marginLeft: 2 },
  qty:            { fontSize: 13, fontWeight: "700", color: "#111111", minWidth: 18, textAlign: "center" },

  // Footer
  footer:         { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#FFFFFF", borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#E5E5E5", padding: 16, paddingBottom: Platform.OS === "ios" ? 30 : 16 },
  footerTop:      { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  footerLabel:    { fontSize: 13, color: "#6B7280" },
  footerTotal:    { fontSize: 22, fontWeight: "800", color: "#111111" },
  checkoutBtn:    { height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  checkoutText:   { fontSize: 15, fontWeight: "800", color: "#FFFFFF" },
});