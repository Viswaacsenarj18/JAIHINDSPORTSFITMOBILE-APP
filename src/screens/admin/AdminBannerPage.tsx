import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

import { useBanners } from '../../context/BannerContext';

const AdminBannerPage = () => {
  const { banners, addBanner, deleteBanner } = useBanners();
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!imageUrl.trim()) {
      Alert.alert('Error', 'Please enter image URL');
      return;
    }

    addBanner(imageUrl, title || "No Title"); // ✅ fallback title
    setImageUrl("");
    setTitle("");
  };

  const handleDelete = (id: string) => {
    Alert.alert('Confirm', 'Delete banner?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteBanner(id) }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Banner Management</Text>
      <Text style={styles.subtitle}>Add banners for home page slider</Text>

      {/* INPUT */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Banner Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={imageUrl}
          onChangeText={setImageUrl}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.btnText}>Add Banner</Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={banners}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />

            {/* ✅ TITLE ALWAYS VISIBLE */}
            <Text style={styles.bannerTitle} numberOfLines={1}>
              {item.title}
            </Text>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No banners added yet</Text>
            <Text style={styles.emptySubtext}>
              Add your first banner above
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default AdminBannerPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },

  inputRow: {
    gap: 10,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },

  addBtn: {
    backgroundColor: '#E11D48',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  btnText: {
    color: '#FFF',
    fontWeight: '600',
  },

  /* 🔥 CARD FIXED */
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },

  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },

  bannerTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },

  deleteBtn: {
    marginTop: 10,
    backgroundColor: '#EF4444',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  deleteText: {
    color: '#FFF',
    fontWeight: '600',
  },

  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },

  emptySubtext: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});