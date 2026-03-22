import React, { useState } from "react";
import {
  View, Text, Image, TextInput, TouchableOpacity,
  FlatList, StyleSheet, Alert,
} from "react-native";
import { Plus, Pencil, Trash2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { categories as mockCategories, Category } from "../../data/mockData";
import ModalForm from "../../components/admin/ModalForm";

const AdminCategoriesPage = () => {
  const [catList,   setCatList]   = useState<Category[]>(mockCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form,      setForm]      = useState({ name: "", icon: "", image: "" });

  const openAdd = () => { setEditingId(null); setForm({ name: "", icon: "", image: "" }); setModalOpen(true); };
  const openEdit = (c: Category) => { setEditingId(c.id); setForm({ name: c.name, icon: c.icon, image: c.image }); setModalOpen(true); };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Category", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => setCatList((prev) => prev.filter((c) => c.id !== id)) },
    ]);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) { Alert.alert("Error", "Category name is required"); return; }
    if (editingId) {
      setCatList((prev) => prev.map((c) => c.id === editingId ? { ...c, name: form.name, icon: form.icon, image: form.image } : c));
    } else {
      setCatList((prev) => [...prev, {
        id: `cat-${Date.now()}`, name: form.name,
        icon:  form.icon  || "🏅",
        image: form.image || "https://images.unsplash.com/photo-1461896836934-bd45ba8c9e9c?w=400&h=300&fit=crop",
        count: 0,
      }]);
    }
    setModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.countText}>{catList.length} categories</Text>
        <TouchableOpacity onPress={openAdd} activeOpacity={0.85}>
          <LinearGradient colors={["#E11D48", "#F97316"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.addBtn}>
            <Plus size={16} color="#FFFFFF" />
            <Text style={styles.addBtnText}>Add Category</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <FlatList
        data={catList}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
              <View style={styles.overlay}>
                <TouchableOpacity onPress={() => openEdit(item)} style={styles.overlayBtn}>
                  <Pencil size={14} color="#111111" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.overlayBtn}>
                  <Trash2 size={14} color="#E11D48" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardIcon}>{item.icon}</Text>
              <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.cardCount}>{item.count} products</Text>
            </View>
          </View>
        )}
      />

      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit Category" : "Add Category"}>
        <Text style={styles.label}>Category Name *</Text>
        <TextInput value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} style={styles.input} placeholder="e.g. Cricket" placeholderTextColor="#9CA3AF" />
        <Text style={styles.label}>Icon (emoji)</Text>
        <TextInput value={form.icon} onChangeText={(v) => setForm({ ...form, icon: v })} style={styles.input} placeholder="🏅" placeholderTextColor="#9CA3AF" />
        <Text style={styles.label}>Image URL</Text>
        <TextInput value={form.image} onChangeText={(v) => setForm({ ...form, image: v })} style={styles.input} placeholder="https://..." placeholderTextColor="#9CA3AF" autoCapitalize="none" keyboardType="url" />
        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.88} style={{ marginTop: 12 }}>
          <LinearGradient colors={["#E11D48", "#F97316"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.submitBtn}>
            <Text style={styles.submitText}>{editingId ? "Update Category" : "Add Category"}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ModalForm>
    </View>
  );
};

export default AdminCategoriesPage;

const styles = StyleSheet.create({
  container:    { flex: 1 },
  headerRow:    { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 14, paddingVertical: 12 },
  countText:    { fontSize: 13, color: "#6B7280" },
  addBtn:       { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  addBtnText:   { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
  list:         { paddingHorizontal: 10, paddingBottom: 32 },
  row:          { justifyContent: "space-between", marginBottom: 12 },
  card:         { width: "48%", backgroundColor: "#FFFFFF", borderRadius: 14, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  imageWrapper: { aspectRatio: 4 / 3, position: "relative" },
  image:        { width: "100%", height: "100%" },
  overlay:      { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.40)", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12 },
  overlayBtn:   { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.90)", alignItems: "center", justifyContent: "center" },
  cardInfo:     { padding: 10, alignItems: "center", gap: 2 },
  cardIcon:     { fontSize: 20 },
  cardName:     { fontSize: 13, fontWeight: "700", color: "#111111" },
  cardCount:    { fontSize: 11, color: "#9CA3AF" },
  label:        { fontSize: 12, fontWeight: "600", color: "#6B7280", marginBottom: 4, marginTop: 10, textTransform: "uppercase", letterSpacing: 0.4 },
  input:        { height: 44, backgroundColor: "#F3F4F6", borderRadius: 10, borderWidth: 1, borderColor: "#E5E5E5", paddingHorizontal: 12, fontSize: 14, color: "#111111" },
  submitBtn:    { height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  submitText:   { fontSize: 14, fontWeight: "700", color: "#FFFFFF" },
});