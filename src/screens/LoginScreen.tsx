import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Eye, EyeOff } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

// ─── Admin credentials ────────────────────────────────────────────────────────
const ADMIN_EMAIL    = "admin@jaihind.com";
const ADMIN_PASSWORD = "admin123";

type RootStackParamList = {
  Login:          undefined;
  Register:       undefined;
  ForgotPassword: undefined;
  Tabs:           undefined;
  Admin:          undefined;
  [key: string]: object | undefined;
};
type NavProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation              = useNavigation<NavProp>();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const isAdmin =
        email.trim().toLowerCase() === ADMIN_EMAIL &&
        password.trim() === ADMIN_PASSWORD;

      if (isAdmin) {
        navigation.replace("Admin");
      } else {
        // await login(email, password); // uncomment when AuthContext is ready
        navigation.replace("Tabs");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Hero ── */}
          <LinearGradient
            colors={["#E11D48", "#F97316"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>JS</Text>
            </View>
            <Text style={styles.brandName}>JAIHIND SPORTS</Text>
            <Text style={styles.brandSub}>Your Sports Destination</Text>
          </LinearGradient>

          {/* ── Card ── */}
          <View style={styles.card}>
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.subheading}>Sign in to continue</Text>

            {/* Error */}
            {!!error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.pwWrapper}>
              <TextInput
                style={[styles.input, styles.pwInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPw}
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPw((v) => !v)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                {showPw
                  ? <EyeOff size={18} color="#94A3B8" />
                  : <Eye   size={18} color="#94A3B8" />}
              </TouchableOpacity>
            </View>

            {/* Forgot password */}
            <TouchableOpacity
              style={styles.forgotWrap}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Submit */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.85}
              style={styles.submitShadow}
            >
              <LinearGradient
                colors={["#E11D48", "#F97316"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.submitBtn, loading && { opacity: 0.75 }]}
              >
                {loading
                  ? <ActivityIndicator color="#FFFFFF" />
                  : <Text style={styles.submitText}>Sign In</Text>}
              </LinearGradient>
            </TouchableOpacity>

            {/* Register */}
            <View style={styles.signupRow}>
              <Text style={styles.signupPrompt}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: "#E11D48" },
  flex:         { flex: 1 },
  scroll:       { flexGrow: 1, backgroundColor: "#FFFFFF" },

  // Hero
  hero:         { paddingTop: 56, paddingBottom: 48, alignItems: "center" },
  logoBox:      { width: 64, height: 64, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.20)", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  logoText:     { fontSize: 28, fontWeight: "800", color: "#FFFFFF", letterSpacing: 1 },
  brandName:    { fontSize: 22, fontWeight: "800", color: "#FFFFFF", letterSpacing: 3 },
  brandSub:     { fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 4 },

  // Card
  card:         { flex: 1, backgroundColor: "#FFFFFF", borderTopLeftRadius: 28, borderTopRightRadius: 28, marginTop: -24, paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 },
  heading:      { fontSize: 22, fontWeight: "700", color: "#0F172A", marginBottom: 4 },
  subheading:   { fontSize: 14, color: "#94A3B8", marginBottom: 24 },

  // Error
  errorBox:     { backgroundColor: "#FEE2E2", borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 16 },
  errorText:    { color: "#DC2626", fontSize: 13 },

  // Fields
  label:        { fontSize: 12, fontWeight: "600", color: "#94A3B8", marginBottom: 6, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.5 },
  input:        { height: 48, backgroundColor: "#F1F5F9", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 14, paddingHorizontal: 16, fontSize: 14, color: "#0F172A" },
  pwWrapper:    { position: "relative" },
  pwInput:      { paddingRight: 48 },
  eyeBtn:       { position: "absolute", right: 14, height: 48, justifyContent: "center" },

  // Forgot
  forgotWrap:   { alignSelf: "flex-end", marginTop: 8, marginBottom: 24 },
  forgotText:   { fontSize: 13, color: "#E11D48", fontWeight: "600" },

  // Submit
  submitShadow: { borderRadius: 14, shadowColor: "#E11D48", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6 },
  submitBtn:    { height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  submitText:   { color: "#FFFFFF", fontSize: 16, fontWeight: "700", letterSpacing: 0.5 },

  // Sign up
  signupRow:    { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  signupPrompt: { fontSize: 14, color: "#94A3B8" },
  signupLink:   { fontSize: 14, color: "#E11D48", fontWeight: "700" },
});