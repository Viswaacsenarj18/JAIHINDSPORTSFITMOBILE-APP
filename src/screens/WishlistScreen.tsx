import React from "react";
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Heart } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { products } from "../data/mockData";
// import { useWishlist } from "../context/WishlistContext";

const WishlistScreen = () => {
  const navigation = useNavigation<any>();
  // const { items } = useWishlist();
  const items = products.filter((p) => p.badge); // placeholder

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <PageHeader title="Wishlist" showBack={false} />
        <View style={styles.empty}>
          <View style={styles.emptyIcon}><Heart size={32} color="#9CA3AF" /></View>
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptySub}>Save your favourite products here</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Tabs")} activeOpacity={0.88}>
            <LinearGradient colors={["#E11D48", "#9F1239"]} style={styles.emptyBtn}>
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
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: "#F8F8F8" },
  content:      { padding: 16, paddingBottom: 32 },
  grid:         { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  empty:        { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 14 },
  emptyIcon:    { width: 80, height: 80, borderRadius: 40, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center" },
  emptyTitle:   { fontSize: 18, fontWeight: "800", color: "#111111" },
  emptySub:     { fontSize: 13, color: "#6B7280", textAlign: "center" },
  emptyBtn:     { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 999 },
  emptyBtnText: { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
});