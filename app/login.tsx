import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("student@campus.edu");
  const [password, setPassword] = useState("campus123");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin() {
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) return setError("Enter a valid school email address.");
    if (!password) return setError("Password is required.");
    setError("");
    setIsSubmitting(true);
    try {
      await signIn(normalizedEmail, password);
      router.replace("/(tabs)/profile");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.page}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.course}>CCE 106 · STUDENT SERVICES</Text>
        <Text style={styles.appTitle}>Student Portal</Text>
        <Text style={styles.pageSubtitle}>Sign in to view your protected profile.</Text>
        <View style={styles.card}>
          <View style={styles.lockWrap}><Ionicons name="lock-closed" size={25} color="#12A9C1" /></View>
          <Text style={styles.welcome}>Welcome back</Text>
          <Text style={styles.welcomeSub}>Use your student account to continue.</Text>
          <View style={styles.divider} />
          <Text style={styles.label}>SCHOOL EMAIL</Text>
          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={19} color="#7D8B91" />
            <TextInput value={email} onChangeText={(value) => { setEmail(value); setError(""); }} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" placeholder="you@school.edu" placeholderTextColor="#AAB5B9" style={styles.input} />
          </View>
          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.inputRow}>
            <Ionicons name="key-outline" size={19} color="#7D8B91" />
            <TextInput value={password} onChangeText={(value) => { setPassword(value); setError(""); }} secureTextEntry placeholder="Enter your password" placeholderTextColor="#AAB5B9" style={styles.input} onSubmitEditing={handleLogin} />
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <Pressable disabled={isSubmitting} onPress={handleLogin} style={({ pressed }) => [styles.button, (pressed || isSubmitting) && styles.buttonPressed]}>
            {isSubmitting ? <ActivityIndicator color="#fff" /> : <><Text style={styles.buttonText}>SIGN IN</Text><Ionicons name="arrow-forward" size={20} color="#fff" /></>}
          </Pressable>
          <View style={styles.secureRow}>
            <Ionicons name="shield-checkmark-outline" size={17} color="#6A7A80" />
            <Text style={styles.secureText}>Your session is stored securely on this device.</Text>
          </View>
          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>Demo mode · use these credentials</Text>
            <Text style={styles.demoText}>Email: student@campus.edu</Text>
            <Text style={styles.demoText}>Password: campus123</Text>
            <Text style={styles.demoNote}>Demo session lasts 8 hours. Add your API URL to use a real backend.</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F5FAFB" },
  content: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 30, paddingBottom: 28, justifyContent: "center" },
  course: { color: "#438E96", fontSize: 10, letterSpacing: 1.35, fontWeight: "900" },
  appTitle: { color: "#102433", fontSize: 28, fontWeight: "900", marginTop: 5 },
  pageSubtitle: { color: "#718087", fontSize: 14, marginTop: 6, marginBottom: 24 },
  card: { backgroundColor: "#fff", borderRadius: 24, borderWidth: 1, borderColor: "#D8E5E8", padding: 24, shadowColor: "#1D4D58", shadowOpacity: 0.14, shadowRadius: 13, elevation: 4 },
  lockWrap: { width: 49, height: 49, backgroundColor: "#E1F7FA", borderRadius: 14, alignItems: "center", justifyContent: "center" },
  welcome: { color: "#102433", fontSize: 23, fontWeight: "900", marginTop: 20 },
  welcomeSub: { color: "#718087", fontSize: 14, marginTop: 6 },
  divider: { height: 1, backgroundColor: "#E3EAEC", marginVertical: 20 },
  label: { color: "#52646B", fontSize: 10, letterSpacing: 1.2, fontWeight: "900", marginBottom: 8, marginTop: 12 },
  inputRow: { height: 50, borderWidth: 1, borderColor: "#D8E5E8", borderRadius: 13, backgroundColor: "#FBFEFE", alignItems: "center", flexDirection: "row", paddingHorizontal: 14, gap: 11 },
  input: { flex: 1, color: "#102433", fontSize: 15, height: "100%" },
  error: { color: "#BE3B32", marginTop: 14, fontSize: 13, lineHeight: 18, fontWeight: "600" },
  button: { minHeight: 53, marginTop: 22, backgroundColor: "#10A8C0", borderRadius: 14, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 10 },
  buttonPressed: { opacity: 0.72 },
  buttonText: { color: "#fff", fontSize: 14, fontWeight: "900", letterSpacing: 1.1 },
  secureRow: { flexDirection: "row", gap: 8, marginTop: 18, alignItems: "center" },
  secureText: { color: "#6A7A80", fontSize: 11, flex: 1, lineHeight: 16 },
  demoBox: { backgroundColor: "#FFF9DD", borderRadius: 12, padding: 13, marginTop: 17 },
  demoTitle: { color: "#6D5A10", fontSize: 12, fontWeight: "900", marginBottom: 5 },
  demoText: { color: "#7B6A20", fontSize: 12, lineHeight: 18 },
  demoNote: { color: "#8A792A", fontSize: 11, lineHeight: 16, marginTop: 5 },
});
