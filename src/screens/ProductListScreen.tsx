import React from "react";
import {
  View, Text, ScrollView, StyleSheet, SafeAreaView,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/mockData";

type RootStackParamList = {
  CategoryDetail: { categoryId: string };
};

const ProductListScreen = () => {
  const route      = useRoute<RouteProp<RootStackParamList, "CategoryDetail">>();
  const categoryId = route.params?.categoryId;
  const category   = categories.find((c) => c.id === categoryId);
  const filtered   = products.filter((p) => p.category === categoryId);

  return (
    <SafeAreaView style={styles.safe}>
      <PageHeader title={category?.name || "Products"} />
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>{category?.icon || "🔍"}</Text>
          <Text style={styles.emptyText}>No products in this category yet.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: "#F8F8F8" },
  content:    { padding: 16, paddingBottom: 32 },
  grid:       { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  empty:      { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 32 },
  emptyEmoji: { fontSize: 48 },
  emptyText:  { fontSize: 14, color: "#6B7280", textAlign: "center" },
});