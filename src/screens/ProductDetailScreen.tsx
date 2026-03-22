import React, { useState } from "react";
import {
  View, Text, Image, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar, Platform,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Heart, ShoppingCart, Star, ArrowLeft, Share2, Truck, Shield, RotateCcw } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { products } from "../data/mockData";
import ProductCard from "../components/ProductCard";
import ReviewSection from "../components/ReviewSection";

type RootStackParamList = {
  ProductDetail: { productId: string };
  Cart: undefined;
  [key: string]: object | undefined;
};
type NavProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, "ProductDetail">;

const features = [
  { Icon: Truck,     label: "Free Delivery" },
  { Icon: Shield,    label: "Warranty" },
  { Icon: RotateCcw, label: "Easy Returns" },
];

const ProductDetailScreen = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteType>();
  const productId = route.params?.productId;

  const product  = products.find((p) => p.id === productId);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 16, color: "#333" }}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    // addToCart(product);
    navigation.navigate("Cart");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Hero image */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />

          {/* Overlay buttons */}
          <View style={styles.imageButtons}>
            <TouchableOpacity style={styles.overlayBtn} onPress={() => navigation.goBack()}>
              <ArrowLeft size={20} color="#111111" />
            </TouchableOpacity>
            <View style={styles.imageButtonsRight}>
              <TouchableOpacity style={styles.overlayBtn} onPress={() => setWishlisted((v) => !v)}>
                <Heart size={20} color={wishlisted ? "#E11D48" : "#111111"}
                  fill={wishlisted ? "#E11D48" : "transparent"} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.overlayBtn}>
                <Share2 size={20} color="#111111" />
              </TouchableOpacity>
            </View>
          </View>

          {product.badge && (
            <View style={styles.imageBadge}>
              <Text style={styles.imageBadgeText}>{product.badge}</Text>
            </View>
          )}
        </View>

        {/* Details */}
        <View style={styles.details}>
          {/* Name & category */}
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name}>{product.name}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Star size={12} color="#16A34A" fill="#16A34A" />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
            <Text style={styles.reviewCount}>{product.reviews} reviews</Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price.toLocaleString("en-IN")}</Text>
            {product.originalPrice && (
              <>
                <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString("en-IN")}</Text>
                <Text style={styles.discount}>{discount}% off</Text>
              </>
            )}
          </View>

          {/* Stock badge */}
          <View style={[styles.stockBadge, product.inStock ? styles.inStock : styles.outOfStock]}>
            <View style={[styles.stockDot, { backgroundColor: product.inStock ? "#16A34A" : "#E11D48" }]} />
            <Text style={[styles.stockText, { color: product.inStock ? "#16A34A" : "#E11D48" }]}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Feature tiles */}
          <View style={styles.featuresRow}>
            {features.map(({ Icon, label }) => (
              <View key={label} style={styles.featureTile}>
                <Icon size={18} color="#E11D48" />
                <Text style={styles.featureLabel}>{label}</Text>
              </View>
            ))}
          </View>

          {/* Reviews */}
          <ReviewSection productId={product.id} />

          {/* Related products */}
          {related.length > 0 && (
            <View style={styles.related}>
              <Text style={styles.relatedTitle}>Related Products</Text>
              <View style={styles.productGrid}>
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </View>
            </View>
          )}

          <View style={{ height: 90 }} />
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.wishlistBtn} onPress={() => setWishlisted((v) => !v)}>
          <Heart size={20} color={wishlisted ? "#E11D48" : "#333333"}
            fill={wishlisted ? "#E11D48" : "transparent"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={handleAddToCart}
          disabled={!product.inStock}
          activeOpacity={0.88}
        >
          <LinearGradient colors={["#E11D48", "#9F1239"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={[styles.addToCartBtn, !product.inStock && { opacity: 0.5 }]}>
            <ShoppingCart size={18} color="#FFFFFF" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { paddingBottom: 0 },
  imageWrapper: { width: "100%", aspectRatio: 1 },
  image: { width: "100%", height: "100%" },
  imageButtons: {
    position: "absolute", top: Platform.OS === "android" ? 40 : 16,
    left: 16, right: 16, flexDirection: "row", justifyContent: "space-between",
  },
  imageButtonsRight: { flexDirection: "row", gap: 8 },
  overlayBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, shadowRadius: 4, elevation: 3,
  },
  imageBadge: {
    position: "absolute", bottom: 16, left: 16,
    backgroundColor: "#E11D48", borderRadius: 999,
    paddingHorizontal: 12, paddingVertical: 5,
  },
  imageBadgeText: { fontSize: 11, fontWeight: "800", color: "#FFFFFF" },
  details: { padding: 16, gap: 12 },
  category: { fontSize: 11, color: "#9CA3AF", textTransform: "capitalize" },
  name: { fontSize: 20, fontWeight: "800", color: "#111111" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  ratingBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "rgba(22,163,74,0.10)", borderRadius: 999,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  ratingText: { fontSize: 12, fontWeight: "700", color: "#16A34A" },
  reviewCount: { fontSize: 12, color: "#9CA3AF" },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 10, flexWrap: "wrap" },
  price: { fontSize: 24, fontWeight: "800", color: "#111111" },
  originalPrice: { fontSize: 16, color: "#9CA3AF", textDecorationLine: "line-through" },
  discount: { fontSize: 14, fontWeight: "700", color: "#16A34A" },
  stockBadge: {
    flexDirection: "row", alignItems: "center", gap: 6,
    alignSelf: "flex-start", borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  inStock: { backgroundColor: "rgba(22,163,74,0.10)" },
  outOfStock: { backgroundColor: "rgba(239,68,68,0.10)" },
  stockDot: { width: 6, height: 6, borderRadius: 3 },
  stockText: { fontSize: 12, fontWeight: "700" },
  description: { fontSize: 14, color: "#6B7280", lineHeight: 22 },
  featuresRow: { flexDirection: "row", gap: 10 },
  featureTile: {
    flex: 1, alignItems: "center", gap: 6,
    backgroundColor: "#F3F4F6", borderRadius: 12, paddingVertical: 12,
  },
  featureLabel: { fontSize: 10, fontWeight: "600", color: "#333333", textAlign: "center" },
  related: { gap: 12 },
  relatedTitle: { fontSize: 16, fontWeight: "800", color: "#111111" },
  productGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  bottomBar: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    backgroundColor: "#FFFFFF", borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E5E5", padding: 12,
    flexDirection: "row", gap: 12,
    paddingBottom: Platform.OS === "ios" ? 28 : 12,
  },
  wishlistBtn: {
    width: 48, height: 48, borderRadius: 12,
    borderWidth: 2, borderColor: "#E5E5E5",
    alignItems: "center", justifyContent: "center",
  },
  addToCartBtn: {
    height: 48, borderRadius: 12,
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
  },
  addToCartText: { fontSize: 15, fontWeight: "800", color: "#FFFFFF" },
});