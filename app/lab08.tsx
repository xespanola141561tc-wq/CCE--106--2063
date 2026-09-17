import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type AttendanceStatus = "Present" | "Absent" | null;

type Student = {
  id: number;
  name: string;
  status: AttendanceStatus;
};

const initialStudents: Student[] = [
  { id: 1, name: "Andrea Cruz", status: null },
  { id: 2, name: "Bryan Santos", status: null },
  { id: 3, name: "Carla Reyes", status: null },
  { id: 4, name: "Daniel Flores", status: null },
  { id: 5, name: "Ella Garcia", status: null },
];

export default function Lab08() {
  const [students, setStudents] = useState(initialStudents);

  const totals = useMemo(
    () => ({
      present: students.filter((student) => student.status === "Present").length,
      absent: students.filter((student) => student.status === "Absent").length,
    }),
    [students],
  );

  useEffect(() => {
    const markedCount = totals.present + totals.absent;
    if (typeof document !== "undefined") {
      document.title = markedCount > 0
        ? `Attendance: ${markedCount} marked`
        : "Class Attendance";
    }
  }, [totals.absent, totals.present]);

  const markAttendance = (id: number, status: Exclude<AttendanceStatus, null>) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id ? { ...student, status } : student,
      ),
    );
  };

  const resetAttendance = () => {
    setStudents(initialStudents);
  };

  const markedCount = totals.present + totals.absent;
  const attendanceMessage = markedCount > 0
    ? `Last updated: ${markedCount} student${markedCount === 1 ? "" : "s"} marked`
    : "No attendance recorded yet";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>LAB 08 • LOCAL STATE & APP LOGIC</Text>
        <Text style={styles.title}>Class Attendance</Text>
        <Text style={styles.subtitle}>Mark each student as present or absent.</Text>

        <View style={styles.summaryRow}>
          <SummaryCard label="Present" value={totals.present} color="#16794A" />
          <SummaryCard label="Absent" value={totals.absent} color="#C54040" />
          <SummaryCard label="Unmarked" value={students.length - totals.present - totals.absent} color="#5B6472" />
        </View>

        <View style={styles.listCard}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Student list</Text>
            <Text style={styles.count}>{students.length} students</Text>
          </View>

          {students.map((student) => (
            <View key={student.id} style={styles.studentRow}>
              <View style={styles.nameBlock}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.studentName}>{student.name}</Text>
                  <Text style={styles.statusText}>{student.status ?? "Not marked"}</Text>
                </View>
              </View>
              <View style={styles.actions}>
                <AttendanceButton
                  label="Present"
                  selected={student.status === "Present"}
                  variant="present"
                  onPress={() => markAttendance(student.id, "Present")}
                />
                <AttendanceButton
                  label="Absent"
                  selected={student.status === "Absent"}
                  variant="absent"
                  onPress={() => markAttendance(student.id, "Absent")}
                />
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.updatedText}>{attendanceMessage}</Text>
        <Pressable style={styles.resetButton} onPress={resetAttendance}>
          <Text style={styles.resetText}>Reset attendance</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={[styles.summaryValue, { color }]}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function AttendanceButton({
  label,
  selected,
  variant,
  onPress,
}: {
  label: "Present" | "Absent";
  selected: boolean;
  variant: "present" | "absent";
  onPress: () => void;
}) {
  const isPresent = variant === "present";
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.attendanceButton,
        isPresent ? styles.presentButton : styles.absentButton,
        selected && (isPresent ? styles.presentSelected : styles.absentSelected),
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.buttonText, selected && styles.selectedButtonText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F7FB" },
  container: { padding: 20, paddingBottom: 40 },
  eyebrow: { color: "#626C82", fontSize: 12, fontWeight: "700", letterSpacing: 0.8, marginTop: 12 },
  title: { color: "#172033", fontSize: 30, fontWeight: "800", marginTop: 8 },
  subtitle: { color: "#697386", fontSize: 15, marginTop: 5, marginBottom: 22 },
  summaryRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
  summaryCard: { alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 14, flex: 1, paddingVertical: 15 },
  summaryValue: { fontSize: 24, fontWeight: "800" },
  summaryLabel: { color: "#6B7280", fontSize: 12, fontWeight: "600", marginTop: 3 },
  listCard: { backgroundColor: "#FFFFFF", borderRadius: 18, paddingHorizontal: 15 },
  listHeader: { alignItems: "center", borderBottomColor: "#E8EBF1", borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: "row", justifyContent: "space-between", paddingVertical: 17 },
  listTitle: { color: "#172033", fontSize: 17, fontWeight: "800" },
  count: { color: "#7B8495", fontSize: 13 },
  studentRow: { borderBottomColor: "#E8EBF1", borderBottomWidth: StyleSheet.hairlineWidth, paddingVertical: 15 },
  nameBlock: { alignItems: "center", flexDirection: "row" },
  avatar: { alignItems: "center", backgroundColor: "#E8EAFE", borderRadius: 18, height: 36, justifyContent: "center", marginRight: 10, width: 36 },
  avatarText: { color: "#4F46E5", fontWeight: "800" },
  studentName: { color: "#253047", fontSize: 15, fontWeight: "700" },
  statusText: { color: "#7B8495", fontSize: 12, marginTop: 2 },
  actions: { flexDirection: "row", gap: 8, marginLeft: 46, marginTop: 11 },
  attendanceButton: { alignItems: "center", borderRadius: 8, borderWidth: 1, flex: 1, paddingVertical: 8 },
  presentButton: { borderColor: "#9BD6B7" },
  absentButton: { borderColor: "#F0B2B2" },
  presentSelected: { backgroundColor: "#1F9254", borderColor: "#1F9254" },
  absentSelected: { backgroundColor: "#D14A4A", borderColor: "#D14A4A" },
  buttonText: { color: "#4E596B", fontSize: 13, fontWeight: "700" },
  selectedButtonText: { color: "#FFFFFF" },
  pressed: { opacity: 0.75 },
  updatedText: { color: "#7B8495", fontSize: 12, marginTop: 16, textAlign: "center" },
  resetButton: { alignSelf: "center", marginTop: 12, padding: 8 },
  resetText: { color: "#4F46E5", fontSize: 14, fontWeight: "700" },
});
