import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Star, User } from "lucide-react-native";

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Review[] = [
  { id: "r1", userName: "Rahul S.", rating: 5, comment: "Excellent quality! Worth every penny.", date: "2026-03-10" },
  { id: "r2", userName: "Priya P.", rating: 4, comment: "Good product, fast delivery. Minor packaging issue.", date: "2026-03-08" },
  { id: "r3", userName: "Amit K.", rating: 5, comment: "Best in this price range. Highly recommended!", date: "2026-03-05" },
];

// ─── Star Rating ──────────────────────────────────────────────────────────────
const StarRating = ({
  rating,
  interactive,
  onRate,
}: {
  rating: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}) => (
  <View style={starStyles.row}>
    {[1, 2, 3, 4, 5].map((i) => (
      <TouchableOpacity
        key={i}
        disabled={!interactive}
        onPress={() => onRate?.(i)}
        hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
      >
        <Star
          size={16}
          color={i <= rating ? "#F59E0B" : "#D1D5DB"}
          fill={i <= rating ? "#F59E0B" : "transparent"}
        />
      </TouchableOpacity>
    ))}
  </View>
);

const starStyles = StyleSheet.create({
  row: { flexDirection: "row", gap: 2 },
});

// ─── ReviewSection ────────────────────────────────────────────────────────────
const ReviewSection = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  const handleSubmit = () => {
    if (!newRating || !newComment.trim()) return;
    const review: Review = {
      id: `r${Date.now()}`,
      userName: "You",
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews((prev) => [review, ...prev]);
    setNewRating(0);
    setNewComment("");
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Reviews & Ratings</Text>
        <TouchableOpacity onPress={() => setShowForm(!showForm)}>
          <Text style={styles.actionLink}>{showForm ? "Cancel" : "Write Review"}</Text>
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryCenter}>
          <Text style={styles.avgRating}>{avgRating}</Text>
          <StarRating rating={Math.round(Number(avgRating))} />
          <Text style={styles.reviewCount}>{reviews.length} reviews</Text>
        </View>
      </View>

      {/* Add Review Form */}
      {showForm && (
        <View style={styles.form}>
          <Text style={styles.formLabel}>Your Rating</Text>
          <StarRating rating={newRating} interactive onRate={setNewRating} />
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Write your review..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
            style={styles.textarea}
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
            <Text style={styles.submitText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Reviews List */}
      <View style={styles.reviewsList}>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.avatar}>
                <User size={14} color="#9CA3AF" />
              </View>
              <View style={styles.reviewMeta}>
                <Text style={styles.reviewUser}>{review.userName}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <StarRating rating={review.rating} />
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ReviewSection;

const styles = StyleSheet.create({
  container: { gap: 16 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#111111" },
  actionLink: { fontSize: 12, fontWeight: "700", color: "#E11D48" },
  summary: { backgroundColor: "#F3F4F6", borderRadius: 14, padding: 14, alignItems: "flex-start" },
  summaryCenter: { alignItems: "center", gap: 4 },
  avgRating: { fontSize: 28, fontWeight: "800", color: "#111111" },
  reviewCount: { fontSize: 10, color: "#9CA3AF", marginTop: 2 },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    gap: 12,
  },
  formLabel: { fontSize: 12, fontWeight: "600", color: "#6B7280" },
  textarea: {
    minHeight: 80,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: "#111111",
  },
  submitBtn: {
    backgroundColor: "#E11D48",
    borderRadius: 12,
    paddingVertical: 12,
    alignSelf: "flex-start",
    paddingHorizontal: 24,
  },
  submitText: { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
  reviewsList: { gap: 12 },
  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    gap: 8,
  },
  reviewHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center", justifyContent: "center",
  },
  reviewMeta: { flex: 1 },
  reviewUser: { fontSize: 13, fontWeight: "700", color: "#111111" },
  reviewDate: { fontSize: 10, color: "#9CA3AF" },
  reviewComment: { fontSize: 13, color: "#6B7280", lineHeight: 18 },
});