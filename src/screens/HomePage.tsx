import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight } from "lucide-react-native";

import AppHeader from "../components/AppHeader";
import BannerSlider from "../components/BannerSlider";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/mockData";

type RootStackParamList = {
  Tabs: undefined;
  Categories: undefined;
  CategoryDetail: { categoryId: string };
  ProductDetail: { productId: string };
  Search: undefined;
  [key: string]: object | undefined;
};
type NavProp = NativeStackNavigationProp<RootStackParamList>;

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({
  title,
  onSeeAll,
}: {
  title: string;
  onSeeAll?: () => void;
}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {onSeeAll && (
      <TouchableOpacity onPress={onSeeAll} style={styles.seeAllBtn}>
        <Text style={styles.seeAllText}>See All</Text>
        <ChevronRight size={14} color="#E11D48" />
      </TouchableOpacity>
    )}
  </View>
);

// ─── HomePage ─────────────────────────────────────────────────────────────────
const HomePage = () => {
  const navigation = useNavigation<NavProp>();

  const featured   = products.filter((p) => p.badge);
  const trending   = products.filter((p) => p.rating >= 4.5);
  const discounted = products.filter((p) => p.originalPrice && p.originalPrice > p.price);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Banner Slider ── */}
        <View style={styles.section}>
          <BannerSlider />
        </View>

        {/* ── Categories ── */}
        <View style={styles.section}>
          <SectionHeader
            title="Categories"
            onSeeAll={() => navigation.navigate("Categories")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {categories.slice(0, 6).map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryItem}
                onPress={() =>
                  navigation.navigate("CategoryDetail", { categoryId: cat.id })
                }
                activeOpacity={0.8}
              >
                <View style={styles.categoryIconBox}>
                  <Text style={styles.categoryIcon}>{cat.icon}</Text>
                </View>
                <Text style={styles.categoryName} numberOfLines={2}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Featured Products ── */}
        <View style={styles.section}>
          <SectionHeader
            title="Featured Products"
            onSeeAll={() => navigation.navigate("Search")}
          />
          <View style={styles.productGrid}>
            {featured.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </View>
        </View>

        {/* ── Trending Now ── */}
        <View style={styles.section}>
          <SectionHeader title="Trending Now" />
          <View style={styles.productGrid}>
            {trending.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </View>
        </View>

        {/* ── Discount Offers ── */}
        {discounted.length > 0 && (
          <View style={styles.section}>
            <SectionHeader
              title="🔥 Discount Offers"
              onSeeAll={() => navigation.navigate("Search")}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.discountRow}
            >
              {discounted.map((p) => {
                const off = Math.round(
                  ((p.originalPrice! - p.price) / p.originalPrice!) * 100
                );
                return (
                  <TouchableOpacity
                    key={p.id}
                    style={styles.discountCard}
                    activeOpacity={0.88}
                    onPress={() =>
                      navigation.navigate("ProductDetail", { productId: p.id })
                    }
                  >
                    <Image
                      source={{ uri: p.image }}
                      style={styles.discountImage}
                      resizeMode="cover"
                    />
                    <View style={styles.discountInfo}>
                      <Text style={styles.discountName} numberOfLines={2}>
                        {p.name}
                      </Text>
                      <View style={styles.discountPriceRow}>
                        <Text style={styles.discountPrice}>
                          ₹{p.price.toLocaleString("en-IN")}
                        </Text>
                        <Text style={styles.discountOriginal}>
                          ₹{p.originalPrice!.toLocaleString("en-IN")}
                        </Text>
                      </View>
                      <Text style={styles.discountOff}>{off}% off</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
  },

  // Section wrapper
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },

  // Section header
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111111",
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#E11D48",
  },

  // Categories
  categoryRow: {
    gap: 12,
    paddingRight: 4,
  },
  categoryItem: {
    alignItems: "center",
    gap: 6,
    width: 64,
  },
  categoryIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FFF3F5",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 26,
  },
  categoryName: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    lineHeight: 13,
  },

  // Product grid — 2 columns with gap
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },

  // Discount cards (horizontal scroll)
  discountRow: {
    gap: 12,
    paddingRight: 4,
  },
  discountCard: {
    width: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    flexDirection: "row",
    padding: 12,
    gap: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  discountImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },
  discountInfo: {
    flex: 1,
    gap: 3,
  },
  discountName: {
    fontSize: 11,
    fontWeight: "600",
    color: "#111111",
    lineHeight: 15,
  },
  discountPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  discountPrice: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111111",
  },
  discountOriginal: {
    fontSize: 10,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  discountOff: {
    fontSize: 10,
    fontWeight: "800",
    color: "#16A34A",
  },
});