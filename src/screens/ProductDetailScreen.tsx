import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Heart,
  ShoppingCart,
  Star,
  ArrowLeft,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { products } from "../data/mockData";
import ProductCard from "../components/ProductCard";
import ReviewSection from "../components/ReviewSection";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // ✅ ADD THIS

type RootStackParamList = {
  ProductDetail: { productId: string };
  Tabs: { screen: string };
};

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, "ProductDetail">;

const features = [
  { Icon: Truck, label: "Free Delivery" },
  { Icon: Shield, label: "Warranty" },
  { Icon: RotateCcw, label: "Easy Returns" },
];

const ProductDetailScreen = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteType>();

  const { addToCart } = useCart();

  // ✅ USE YOUR CONTEXT
  const { toggleWishlist, isInWishlist } = useWishlist();

  const productId = route.params?.productId;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Product not found</Text>
      </SafeAreaView>
    );
  }

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleAddToCart = () => {
    addToCart(product);
    navigation.navigate("Tabs", { screen: "Cart" });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <ScrollView>
        {/* IMAGE */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: product.image }} style={styles.image} />

          {/* HEADER */}
          <View style={styles.imageButtons}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.overlayBtn}>
              <ArrowLeft size={20} />
            </TouchableOpacity>

            <View style={styles.imageButtonsRight}>
              {/* ✅ WISHLIST BUTTON */}
              <TouchableOpacity
                onPress={() => toggleWishlist(product)}
                style={styles.overlayBtn}
              >
                <Heart
                  size={20}
                  color={isInWishlist(product.id) ? "#E11D48" : "#000"}
                  fill={isInWishlist(product.id) ? "#E11D48" : "transparent"}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.overlayBtn}>
                <Share2 size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* DETAILS */}
        <View style={styles.details}>
          <Text style={styles.name}>{product.name}</Text>
          <Text>₹{product.price}</Text>

          <Text>{product.description}</Text>

          {/* FEATURES */}
          <View style={styles.featuresRow}>
            {features.map(({ Icon, label }) => (
              <View key={label} style={styles.featureTile}>
                <Icon size={18} color="#E11D48" />
                <Text>{label}</Text>
              </View>
            ))}
          </View>

          <ReviewSection productId={product.id} />

          {/* RELATED */}
          <View>
            <Text style={{ fontWeight: "bold" }}>Related</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* ADD TO CART */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={handleAddToCart} style={{ flex: 1 }}>
          <LinearGradient colors={["#E11D48", "#9F1239"]} style={styles.addToCartBtn}>
            <ShoppingCart color="#fff" />
            <Text style={{ color: "#fff" }}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },

  imageWrapper: { height: 300 },
  image: { width: "100%", height: "100%" },

  imageButtons: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  imageButtonsRight: { flexDirection: "row", gap: 10 },

  overlayBtn: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
  },

  details: { padding: 16 },
  name: { fontSize: 20, fontWeight: "bold" },

  featuresRow: { flexDirection: "row", gap: 10, marginTop: 10 },

  featureTile: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
  },

  addToCartBtn: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    padding: 15,
    borderRadius: 10,
  },
});