import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [name, setName] = useState("Maya Chen");
  const [email, setEmail] = useState("maya.chen@campus.edu");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [saved, setSaved] = useState(false);
  const save = () => {
    const next = {
      name: name.trim() ? undefined : "Full name is required.",
      email: /^\S+@\S+\.\S+$/.test(email)
        ? undefined
        : "Enter a valid email address.",
    };
    setErrors(next);
    setSaved(!next.name && !next.email);
  };
  return (
    <ScrollView
      contentContainerStyle={styles.page}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.profile}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{name || "Your name"}</Text>
          <Text style={styles.email}>{email || "Add your email"}</Text>
        </View>
      </View>
      <Text style={styles.label}>FULL NAME</Text>
      <TextInput
        value={name}
        onChangeText={(value) => {
          setName(value);
          setSaved(false);
        }}
        placeholder="Your full name"
        style={[styles.input, errors.name && styles.invalid]}
        autoCapitalize="words"
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}
      <Text style={styles.label}>EMAIL ADDRESS</Text>
      <TextInput
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          setSaved(false);
        }}
        placeholder="name@example.com"
        style={[styles.input, errors.email && styles.invalid]}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <Pressable
        onPress={save}
        style={({ pressed }) => [styles.save, pressed && styles.savePressed]}
      >
        <Text style={styles.saveText}>Save profile</Text>
        <Ionicons name="checkmark" size={19} color="#fff" />
      </Pressable>
      {saved && (
        <View style={styles.success}>
          <Ionicons name="checkmark-circle" size={20} color="#0F9D7A" />
          <Text style={styles.successText}>Profile saved successfully.</Text>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingBottom: 36,
  },
  profile: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 26,
    shadowColor: "#172B4D",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#E8E5FF",
  },
  name: {
    color: "#14213D",
    fontSize: 19,
    fontWeight: "800",
  },
  email: {
    color: "#667085",
    marginTop: 3,
  },
  label: {
    color: "#526071",
    fontSize: 12,
    letterSpacing: 0.8,
    fontWeight: "800",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DCE2EC",
    borderRadius: 12,
    padding: 14,
    color: "#14213D",
    fontSize: 16,
  },
  invalid: {
    borderColor: "#D14343",
  },
  error: {
    color: "#D14343",
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
  },
  save: {
    backgroundColor: "#4F46E5",
    borderRadius: 13,
    padding: 15,
    marginTop: 28,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },
  savePressed: {
    opacity: 0.72,
  },
  saveText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  success: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 13,
    borderRadius: 12,
    backgroundColor: "#E8F5F1",
  },
  successText: {
    color: "#08785B",
    fontWeight: "700",
  },
});
