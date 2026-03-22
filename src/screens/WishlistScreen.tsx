import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Heart, ShoppingCart, Trash2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import PageHeader from "../components/PageHeader";
import { useWishlist } from "../context/WishlistContext";
import { useCart }     from "../context/CartContext";
import { Product }     from "../data/mockData";

const WishlistScreen = () => {
  const navigation              = useNavigation<any>();
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart }       = useCart();

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      Alert.alert("Out of Stock", "This product is currently unavailable.");
      return;
    }
    addToCart(product);
    Alert.alert(
      "Added to Cart ✅",
      `${product.name} has been added to your cart.`,
      [
        { text: "Continue Shopping", style: "cancel" },
        { text: "Go to Cart", onPress: () => navigation.navigate("Cart") },
      ]
    );
  };

  // ── Empty state ──────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
        <PageHeader title="Wishlist" showBack={false} />
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Heart size={36} color="#9CA3AF" />
          </View>
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptySub}>Save your favourite products here</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            activeOpacity={0.88}
          >
            <LinearGradient
              colors={["#E11D48", "#F97316"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.emptyBtn}
            >
              <Text style={styles.emptyBtnText}>Explore Products</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
      <PageHeader title={`Wishlist (${items.length})`} showBack={false} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => {
          const alreadyInCart = isInCart(item.id);
          const discount = item.originalPrice
            ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
            : null;

          return (
            <View style={styles.card}>
              {/* Product image */}
              <TouchableOpacity
                onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}
                activeOpacity={0.85}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                {discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>-{discount}%</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Info */}
              <View style={styles.info}>
                {/* Name + remove */}
                <View style={styles.nameRow}>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => removeFromWishlist(item.id)}
                    style={styles.removeBtn}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                  >
                    <Trash2 size={16} color="#E11D48" />
                  </TouchableOpacity>
                </View>

                {/* Category */}
                <Text style={styles.category}>{item.category}</Text>

                {/* Price row */}
                <View style={styles.priceRow}>
                  <Text style={styles.price}>₹{item.price.toLocaleString("en-IN")}</Text>
                  {item.originalPrice && (
                    <Text style={styles.originalPrice}>
                      ₹{item.originalPrice.toLocaleString("en-IN")}
                    </Text>
                  )}
                </View>

                {/* Stock status */}
                <Text style={[styles.stockText, !item.inStock && styles.outOfStock]}>
                  {item.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                </Text>

                {/* Add to Cart button */}
                <TouchableOpacity
                  onPress={() => handleAddToCart(item)}
                  disabled={!item.inStock}
                  activeOpacity={0.85}
                  style={{ marginTop: 10 }}
                >
                  {alreadyInCart ? (
                    // Already in cart — show "Go to Cart"
                    <TouchableOpacity
                      style={styles.goToCartBtn}
                      onPress={() => navigation.navigate("Cart")}
                    >
                      <ShoppingCart size={15} color="#E11D48" />
                      <Text style={styles.goToCartText}>Go to Cart</Text>
                    </TouchableOpacity>
                  ) : (
                    <LinearGradient
                      colors={item.inStock ? ["#E11D48", "#F97316"] : ["#D1D5DB", "#D1D5DB"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.addToCartBtn}
                    >
                      <ShoppingCart size={15} color="#FFFFFF" />
                      <Text style={styles.addToCartText}>
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </Text>
                    </LinearGradient>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: "#F8F8F8" },
  list:           { padding: 16, paddingBottom: 32 },

  // Empty
  empty:          { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 14 },
  emptyIcon:      { width: 80, height: 80, borderRadius: 40, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center" },
  emptyTitle:     { fontSize: 18, fontWeight: "800", color: "#111111" },
  emptySub:       { fontSize: 13, color: "#6B7280", textAlign: "center" },
  emptyBtn:       { paddingHorizontal: 28, paddingVertical: 13, borderRadius: 999 },
  emptyBtnText:   { fontSize: 14, fontWeight: "700", color: "#FFFFFF" },

  // Card
  card:           {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  image:          { width: 120, height: "100%" as any, minHeight: 140, backgroundColor: "#F3F4F6" },
  discountBadge:  { position: "absolute", top: 8, left: 8, backgroundColor: "#E11D48", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  discountText:   { fontSize: 10, fontWeight: "800", color: "#FFFFFF" },

  // Info
  info:           { flex: 1, padding: 12, justifyContent: "space-between" },
  nameRow:        { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  name:           { fontSize: 13, fontWeight: "700", color: "#111111", lineHeight: 18 },
  removeBtn:      { width: 28, height: 28, borderRadius: 8, backgroundColor: "rgba(225,29,72,0.08)", alignItems: "center", justifyContent: "center" },
  category:       { fontSize: 11, color: "#9CA3AF", textTransform: "capitalize", marginTop: 2 },
  priceRow:       { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 },
  price:          { fontSize: 16, fontWeight: "800", color: "#111111" },
  originalPrice:  { fontSize: 12, color: "#9CA3AF", textDecorationLine: "line-through" },
  stockText:      { fontSize: 11, fontWeight: "600", color: "#16A34A", marginTop: 2 },
  outOfStock:     { color: "#E11D48" },

  // Buttons
  addToCartBtn:   { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, height: 38, borderRadius: 10 },
  addToCartText:  { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
  goToCartBtn:    { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, height: 38, borderRadius: 10, borderWidth: 1.5, borderColor: "#E11D48", backgroundColor: "rgba(225,29,72,0.05)" },
  goToCartText:   { fontSize: 13, fontWeight: "700", color: "#E11D48" },
});