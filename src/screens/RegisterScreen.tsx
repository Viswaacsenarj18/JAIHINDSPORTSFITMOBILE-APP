import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

type RootStackParamList = {
  Login: undefined;
  Tabs:  undefined;
  [key: string]: object | undefined;
};
type NavProp = NativeStackNavigationProp<RootStackParamList>;

const RegisterScreen = () => {
  const navigation                      = useNavigation<NavProp>();
  const [name,     setName]             = useState("");
  const [email,    setEmail]            = useState("");
  const [password, setPassword]         = useState("");
  const [error,    setError]            = useState("");
  const [loading,  setLoading]          = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      // await register(name, email, password); // ← uncomment when AuthContext is wired
      await new Promise((r) => setTimeout(r, 800)); // placeholder delay
      navigation.navigate("Tabs");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── Gradient header ── */}
      <LinearGradient
        colors={["#E11D48", "#9F1239"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>JS</Text>
        </View>
        <Text style={styles.brandName}>JAIHIND SPORTS</Text>
      </LinearGradient>

      {/* ── Form card ── */}
      <ScrollView
        contentContainerStyle={styles.formCard}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.welcomeTitle}>Create Account</Text>
        <Text style={styles.welcomeSub}>Join us to start shopping</Text>

        {/* Error */}
        {!!error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Full Name */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your full name"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="words"
          returnKeyType="next"
          style={styles.input}
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          style={styles.input}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Min 6 characters"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          autoCapitalize="none"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          style={styles.input}
        />

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.88}
          disabled={loading}
        >
          <LinearGradient
            colors={["#E11D48", "#9F1239"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitBtn}
          >
            {loading
              ? <ActivityIndicator color="#FFFFFF" />
              : <Text style={styles.submitText}>Create Account</Text>}
          </LinearGradient>
        </TouchableOpacity>

        {/* Sign in link */}
        <View style={styles.signupRow}>
          <Text style={styles.signupLabel}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signupLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  // Header
  header: {
    paddingTop: 56,
    paddingBottom: 48,
    alignItems: "center",
    gap: 12,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.20)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  brandName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 3,
  },
  // Form card (overlaps gradient with rounded top)
  formCard: {
    marginTop: -24,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    gap: 12,
    paddingBottom: 40,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111111",
  },
  welcomeSub: {
    fontSize: 13,
    color: "#6B7280",
  },
  // Error
  errorBox: {
    backgroundColor: "rgba(239,68,68,0.10)",
    borderRadius: 12,
    padding: 12,
  },
  errorText: {
    fontSize: 13,
    color: "#EF4444",
  },
  // Fields
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  input: {
    height: 48,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#111111",
  },
  // Button
  submitBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 6,
  },
  submitText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  // Sign in row
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
  },
  signupLabel: {
    fontSize: 13,
    color: "#6B7280",
  },
  signupLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#E11D48",
  },
});