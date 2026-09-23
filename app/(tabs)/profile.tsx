import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

type ProfileRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

function ProfileRow({ icon, label, value }: ProfileRowProps) {
  return (
    <View style={styles.profileRow}>
      <Ionicons name={icon} size={19} color="#35688B" />
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const { signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    router.replace("/login" as Href);
  }

  return (
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <Text style={styles.course}>CCE 106 · STUDENT SERVICES</Text>
      <Text style={styles.heading}>Student Portal</Text>
      <Text style={styles.subtitle}>Your account and academic profile</Text>

      <View style={styles.card}>
        <View style={styles.identityRow}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={33} color="#FFFFFF" />
          </View>
          <View style={styles.identityText}>
            <Text style={styles.name}>Demo Student</Text>
            <Text style={styles.role}>STUDENT</Text>
            <Text style={styles.email}>student@cce106.demo</Text>
          </View>
        </View>

        <View style={styles.sessionBanner}>
          <Ionicons name="shield-checkmark" size={17} color="#159261" />
          <Text style={styles.sessionText}>Demo protected session active · Student</Text>
        </View>

        <Text style={styles.sectionLabel}>ACADEMIC PROFILE</Text>
        <View style={styles.divider} />
        <ProfileRow icon="phone-portrait-outline" label="Student ID" value="CCE-106-001" />
        <View style={styles.divider} />
        <ProfileRow icon="school-outline" label="Program" value="Information\nTechnology" />
        <View style={styles.divider} />
        <ProfileRow icon="layers-outline" label="Year level" value="3rd Year" />

        <Pressable onPress={() => router.push("/grades" as Href)} style={({ pressed }) => [styles.gradesButton, pressed && styles.pressed]}>
          <Ionicons name="document-text-outline" size={20} color="#315E7D" />
          <Text style={styles.gradesText}>View grades</Text>
          <Ionicons name="chevron-forward" size={21} color="#6E808A" />
        </Pressable>

        <Pressable onPress={handleLogout} style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}>
          <Ionicons name="log-out-outline" size={20} color="#315E7D" />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: "#F5FAFB", flexGrow: 1, padding: 22, paddingBottom: 32, paddingTop: 28 },
  course: { color: "#438E96", fontSize: 10, fontWeight: "900", letterSpacing: 1.35 },
  heading: { color: "#14213D", fontSize: 28, fontWeight: "900", marginTop: 8 },
  subtitle: { color: "#75828A", fontSize: 14, marginTop: 6, marginBottom: 24 },
  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D9E5E8",
    borderRadius: 24,
    borderWidth: 1,
    elevation: 4,
    padding: 21,
    shadowColor: "#163B4B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  identityRow: { alignItems: "center", flexDirection: "row", gap: 14 },
  avatar: { alignItems: "center", backgroundColor: "#145490", borderRadius: 17, height: 55, justifyContent: "center", width: 55 },
  identityText: { flex: 1 },
  name: { color: "#14213D", fontSize: 19, fontWeight: "900" },
  role: { color: "#159261", fontSize: 10, fontWeight: "900", marginTop: 4 },
  email: { color: "#75828A", fontSize: 12, marginTop: 5 },
  sessionBanner: { alignItems: "center", backgroundColor: "#E3F8EC", borderRadius: 8, flexDirection: "row", gap: 8, marginTop: 19, paddingHorizontal: 12, paddingVertical: 10 },
  sessionText: { color: "#14845A", flex: 1, fontSize: 11, fontWeight: "800" },
  sectionLabel: { color: "#60717A", fontSize: 10, fontWeight: "900", letterSpacing: 1.15, marginTop: 27, marginBottom: 9 },
  divider: { backgroundColor: "#E5ECEE", height: 1 },
  profileRow: { alignItems: "center", flexDirection: "row", gap: 11, minHeight: 54 },
  rowLabel: { color: "#7A878E", flex: 1, fontSize: 13 },
  rowValue: { color: "#1D2A35", fontSize: 13, fontWeight: "800", textAlign: "right" },
  gradesButton: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#DDE7E9", borderRadius: 13, borderWidth: 1, flexDirection: "row", gap: 11, marginTop: 24, paddingHorizontal: 14, paddingVertical: 14 },
  gradesText: { color: "#14213D", flex: 1, fontSize: 14, fontWeight: "800" },
  logoutButton: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E1E9EB", borderRadius: 13, borderWidth: 1, flexDirection: "row", gap: 10, justifyContent: "center", marginTop: 21, paddingVertical: 14 },
  logoutText: { color: "#14213D", fontSize: 14, fontWeight: "800" },
  pressed: { opacity: 0.7 },
});
