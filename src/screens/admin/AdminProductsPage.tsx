import React, { useState, useMemo } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Image,
  FlatList, StyleSheet, Alert,
} from "react-native";
import { Plus, Pencil, Trash2, Search } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { products as mockProducts, Product, categories } from "../../data/mockData";
import ModalForm   from "../../components/admin/ModalForm";
import StatusBadge from "../../components/admin/StatusBadge";

const emptyForm = { name: "", category: "", price: "", stock: "", description: "", images: [] as string[] };

const AdminProductsPage = () => {
  const [productList,   setProductList]   = useState<Product[]>(mockProducts);
  const [search,        setSearch]        = useState("");
  const [modalOpen,     setModalOpen]     = useState(false);
  const [editingId,     setEditingId]     = useState<string | null>(null);
  const [form,          setForm]          = useState(emptyForm);
  const [showCatPicker, setShowCatPicker] = useState(false);

  const filtered = useMemo(
    () => productList.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [productList, search],
  );

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({ name: p.name, category: p.category, price: String(p.price), stock: p.inStock ? "10" : "0", description: p.description, images: p.images || [] });
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Product", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => setProductList((prev) => prev.filter((p) => p.id !== id)) },
    ]);
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.price) { Alert.alert("Error", "Name and price are required"); return; }
    if (editingId) {
      setProductList((prev) => prev.map((p) => p.id === editingId
        ? { ...p, name: form.name, category: form.category, price: Number(form.price), description: form.description, images: form.images, inStock: Number(form.stock) > 0 }
        : p));
    } else {
      setProductList((prev) => [{
        id: `new-${Date.now()}`,
        name: form.name,
        category: form.category,
        price: Number(form.price),
        images: form.images.length > 0 ? form.images : ["https://images.unsplash.com/photo-1461896836934-bd45ba8c9e9c?w=400&h=400&fit=crop"],
        rating: 0,
        reviews: 0,
        description: form.description,
        inStock: Number(form.stock) > 0,
      }, ...prev]);
    }
    setModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.searchBox}>
          <Search size={16} color="#9CA3AF" />
          <TextInput value={search} onChangeText={setSearch} placeholder="Search products..." placeholderTextColor="#9CA3AF" style={styles.searchInput} />
        </View>
        <TouchableOpacity onPress={openAdd} activeOpacity={0.85}>
          <LinearGradient colors={["#E11D48", "#F97316"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.addBtn}>
            <Plus size={16} color="#FFFFFF" />
            <Text style={styles.addBtnText}>Add</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.images?.[0] }} style={styles.thumb} resizeMode="cover" />
            <View style={styles.rowInfo}>
              <Text style={styles.rowName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.rowCat}>{item.category}</Text>
              <View style={styles.rowBottom}>
                <Text style={styles.rowPrice}>₹{item.price.toLocaleString("en-IN")}</Text>
                <StatusBadge status={item.inStock ? "delivered" : "pending"} />
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => openEdit(item)} style={styles.actionBtn}><Pencil size={15} color="#6B7280" /></TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.actionBtn, styles.deleteBtn]}><Trash2 size={15} color="#E11D48" /></TouchableOpacity>
            </View>
          </View>
        )}
      />

      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit Product" : "Add Product"}>
        <Text style={styles.label}>Product Name *</Text>
        <TextInput value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} style={styles.input} placeholder="e.g. Cricket Bat" placeholderTextColor="#9CA3AF" />

        <Text style={styles.label}>Category</Text>
        <TouchableOpacity style={styles.picker} onPress={() => setShowCatPicker((v) => !v)}>
          <Text style={form.category ? styles.pickerVal : styles.pickerPlaceholder}>
            {form.category ? categories.find((c) => c.id === form.category)?.name ?? form.category : "Select category"}
          </Text>
        </TouchableOpacity>
        {showCatPicker && (
          <View style={styles.pickerDropdown}>
            {categories.map((c) => (
              <TouchableOpacity key={c.id} style={styles.pickerItem} onPress={() => { setForm({ ...form, category: c.id }); setShowCatPicker(false); }}>
                <Text style={styles.pickerItemText}>{c.icon} {c.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.twoCol}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Price (₹) *</Text>
            <TextInput value={form.price} onChangeText={(v) => setForm({ ...form, price: v })} style={styles.input} keyboardType="numeric" placeholder="0" placeholderTextColor="#9CA3AF" />
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Stock</Text>
            <TextInput value={form.stock} onChangeText={(v) => setForm({ ...form, stock: v })} style={styles.input} keyboardType="numeric" placeholder="0" placeholderTextColor="#9CA3AF" />
          </View>
        </View>

        <Text style={styles.label}>Product Images (URLs, comma separated)</Text>
        <TextInput
          value={form.images.join(", ")}
          onChangeText={(v) => setForm({ ...form, images: v.split(",").map(s => s.trim()).filter(Boolean) })}
          style={styles.input}
          placeholder="https://..., https://..."
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          keyboardType="url"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput value={form.description} onChangeText={(v) => setForm({ ...form, description: v })} style={[styles.input, styles.textarea]} multiline numberOfLines={3} textAlignVertical="top" placeholder="Product description..." placeholderTextColor="#9CA3AF" />

        {/* Preview images */}
        {form.images.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 8 }}>
            {form.images.map((img, idx) => (
              <Image key={idx} source={{ uri: img }} style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: '#eee', marginRight: 8, marginBottom: 8 }} />
            ))}
          </View>
        )}
        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.88} style={{ marginTop: 12 }}>
          <LinearGradient colors={["#E11D48", "#F97316"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.submitBtn}>
            <Text style={styles.submitText}>{editingId ? "Update Product" : "Add Product"}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ModalForm>
    </View>
  );
};

export default AdminProductsPage;

const styles = StyleSheet.create({
  container:        { flex: 1 },
  topRow:           { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14, paddingVertical: 12 },
  searchBox:        { flex: 1, flexDirection: "row", alignItems: "center", gap: 8, height: 42, backgroundColor: "#F3F4F6", borderRadius: 10, borderWidth: 1, borderColor: "#E5E5E5", paddingHorizontal: 12 },
  searchInput:      { flex: 1, fontSize: 14, color: "#111111", paddingVertical: 0 },
  addBtn:           { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  addBtnText:       { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
  list:             { paddingHorizontal: 14, paddingBottom: 32 },
  sep:              { height: StyleSheet.hairlineWidth, backgroundColor: "#F0F0F0" },
  row:              { flexDirection: "row", alignItems: "center", paddingVertical: 10, gap: 12, backgroundColor: "#FFFFFF" },
  thumb:            { width: 52, height: 52, borderRadius: 10, backgroundColor: "#F3F4F6" },
  rowInfo:          { flex: 1 },
  rowName:          { fontSize: 13, fontWeight: "700", color: "#111111" },
  rowCat:           { fontSize: 11, color: "#9CA3AF", textTransform: "capitalize", marginTop: 2 },
  rowBottom:        { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  rowPrice:         { fontSize: 13, fontWeight: "800", color: "#111111" },
  actions:          { flexDirection: "row", gap: 6 },
  actionBtn:        { width: 32, height: 32, borderRadius: 8, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center" },
  deleteBtn:        { backgroundColor: "rgba(225,29,72,0.08)" },
  label:            { fontSize: 12, fontWeight: "600", color: "#6B7280", marginBottom: 4, marginTop: 10, textTransform: "uppercase", letterSpacing: 0.4 },
  input:            { height: 44, backgroundColor: "#F3F4F6", borderRadius: 10, borderWidth: 1, borderColor: "#E5E5E5", paddingHorizontal: 12, fontSize: 14, color: "#111111" },
  textarea:         { height: 80, paddingTop: 10, paddingBottom: 10 },
  twoCol:           { flexDirection: "row" },
  picker:           { height: 44, backgroundColor: "#F3F4F6", borderRadius: 10, borderWidth: 1, borderColor: "#E5E5E5", paddingHorizontal: 12, justifyContent: "center" },
  pickerVal:        { fontSize: 14, color: "#111111" },
  pickerPlaceholder:{ fontSize: 14, color: "#9CA3AF" },
  pickerDropdown:   { backgroundColor: "#FFFFFF", borderRadius: 10, borderWidth: 1, borderColor: "#E5E5E5", marginTop: 4, overflow: "hidden", maxHeight: 200 },
  pickerItem:       { paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#F0F0F0" },
  pickerItemText:   { fontSize: 14, color: "#111111" },
  submitBtn:        { height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  submitText:       { fontSize: 14, fontWeight: "700", color: "#FFFFFF" },
});