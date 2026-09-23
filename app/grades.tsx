import { Ionicons } from "@expo/vector-icons";
import { Redirect, type Href } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

const grades = [
  { subject: "Web Development", code: "CCE 106", grade: "1.50" },
  { subject: "Database Systems", code: "IT 204", grade: "1.75" },
  { subject: "Human-Computer Interaction", code: "IT 220", grade: "1.50" },
  { subject: "Network Fundamentals", code: "IT 215", grade: "1.75" },
];

export default function GradesScreen() {
  const { isRestoring, token } = useAuth();
  if (isRestoring) return null;
  if (!token) return <Redirect href={"/login" as Href} />;

  return (
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <Text style={styles.eyebrow}>CCE 106 · STUDENT SERVICES</Text>
      <Text style={styles.title}>My Grades</Text>
      <Text style={styles.subtitle}>First semester · Academic year 2025–2026</Text>

      <View style={styles.summary}>
        <View>
          <Text style={styles.summaryLabel}>GENERAL WEIGHTED AVERAGE</Text>
          <Text style={styles.average}>1.63</Text>
        </View>
        <View style={styles.summaryIcon}>
          <Ionicons name="ribbon-outline" size={27} color="#FFFFFF" />
        </View>
      </View>

      <Text style={styles.sectionTitle}>SUBJECT GRADES</Text>
      <View style={styles.list}>
        {grades.map((item, index) => (
          <View key={item.code} style={[styles.gradeRow, index !== grades.length - 1 && styles.rowDivider]}>
            <View style={styles.subjectIcon}>
              <Ionicons name="book-outline" size={18} color="#35688B" />
            </View>
            <View style={styles.subjectText}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.code}>{item.code}</Text>
            </View>
            <View style={styles.gradePill}>
              <Text style={styles.grade}>{item.grade}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.note}>
        <Ionicons name="information-circle-outline" size={18} color="#35688B" />
        <Text style={styles.noteText}>These are demo grades for the current student session.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: "#F5FAFB", flexGrow: 1, padding: 22, paddingBottom: 34, paddingTop: 28 },
  eyebrow: { color: "#438E96", fontSize: 10, fontWeight: "900", letterSpacing: 1.35 },
  title: { color: "#14213D", fontSize: 28, fontWeight: "900", marginTop: 8 },
  subtitle: { color: "#75828A", fontSize: 14, marginTop: 6 },
  summary: { alignItems: "center", backgroundColor: "#145490", borderRadius: 20, flexDirection: "row", justifyContent: "space-between", marginTop: 25, padding: 20 },
  summaryLabel: { color: "#BDE4F2", fontSize: 10, fontWeight: "900", letterSpacing: 0.9 },
  average: { color: "#FFFFFF", fontSize: 33, fontWeight: "900", marginTop: 5 },
  summaryIcon: { alignItems: "center", backgroundColor: "#2C6DA7", borderRadius: 16, height: 55, justifyContent: "center", width: 55 },
  sectionTitle: { color: "#60717A", fontSize: 10, fontWeight: "900", letterSpacing: 1.15, marginBottom: 10, marginTop: 28 },
  list: { backgroundColor: "#FFFFFF", borderColor: "#D9E5E8", borderRadius: 18, borderWidth: 1, overflow: "hidden" },
  gradeRow: { alignItems: "center", flexDirection: "row", gap: 12, padding: 15 },
  rowDivider: { borderBottomColor: "#E5ECEE", borderBottomWidth: 1 },
  subjectIcon: { alignItems: "center", backgroundColor: "#EEF7FA", borderRadius: 11, height: 39, justifyContent: "center", width: 39 },
  subjectText: { flex: 1 },
  subject: { color: "#1D2A35", fontSize: 14, fontWeight: "800" },
  code: { color: "#75828A", fontSize: 12, marginTop: 4 },
  gradePill: { backgroundColor: "#E3F8EC", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7 },
  grade: { color: "#14845A", fontSize: 13, fontWeight: "900" },
  note: { alignItems: "center", flexDirection: "row", gap: 9, marginTop: 20, paddingHorizontal: 3 },
  noteText: { color: "#60717A", flex: 1, fontSize: 12, lineHeight: 18 },
});
