import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const AdminSettingsPage = () => {
  const [name,        setName]        = useState("Admin");
  const [email,       setEmail]       = useState("admin@jaihind.com");
  const [oldPass,     setOldPass]     = useState("");
  const [newPass,     setNewPass]     = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleProfileSave = () => {
    if (!name.trim() || !email.trim()) { Alert.alert("Error", "Name and email are required"); return; }
    Alert.alert("Success", "Profile updated successfully");
  };

  const handlePasswordChange = () => {
    if (!oldPass) { Alert.alert("Error", "Enter current password"); return; }
    if (newPass.length < 6) { Alert.alert("Error", "Minimum 6 characters"); return; }
    if (newPass !== confirmPass) { Alert.alert("Error", "Passwords don't match"); return; }
    Alert.alert("Success", "Password changed successfully");
    setOldPass(""); setNewPass(""); setConfirmPass("");
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Update Profile</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Admin name" placeholderTextColor="#9CA3AF" />
        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" placeholder="admin@example.com" placeholderTextColor="#9CA3AF" />
        <TouchableOpacity onPress={handleProfileSave} activeOpacity={0.88} style={{ marginTop: 14 }}>
          <LinearGradient colors={["#E11D48", "#F97316"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Change Password</Text>
        {[
          { label: "Current Password", value: oldPass,     setter: setOldPass     },
          { label: "New Password",     value: newPass,     setter: setNewPass     },
          { label: "Confirm Password", value: confirmPass, setter: setConfirmPass },
        ].map(({ label, value, setter }) => (
          <View key={label}>
            <Text style={styles.label}>{label}</Text>
            <TextInput value={value} onChangeText={setter} secureTextEntry style={styles.input} placeholder="••••••" placeholderTextColor="#9CA3AF" />
          </View>
        ))}
        <TouchableOpacity onPress={handlePasswordChange} activeOpacity={0.88} style={{ marginTop: 14 }}>
          <LinearGradient colors={["#E11D48", "#F97316"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Change Password</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={{ height: 16 }} />
    </ScrollView>
  );
};

export default AdminSettingsPage;

const styles = StyleSheet.create({
  content:     { padding: 16, gap: 14 },
  card:        { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3 },
  cardTitle:   { fontSize: 14, fontWeight: "800", color: "#111111", marginBottom: 4 },
  label:       { fontSize: 12, fontWeight: "600", color: "#6B7280", marginBottom: 4, marginTop: 10, textTransform: "uppercase", letterSpacing: 0.4 },
  input:       { height: 46, backgroundColor: "#F3F4F6", borderRadius: 12, borderWidth: 1, borderColor: "#E5E5E5", paddingHorizontal: 14, fontSize: 14, color: "#111111" },
  saveBtn:     { height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  saveBtnText: { fontSize: 14, fontWeight: "700", color: "#FFFFFF" },
});