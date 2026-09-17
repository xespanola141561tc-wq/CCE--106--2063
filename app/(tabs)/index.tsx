import { Ionicons } from "@expo/vector-icons";
import { Link, router, type Href } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { StatCard } from "../../components/StatCard";
import { events } from "../../data/events";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const joined = events.filter((event) => event.joined).length;
  return (
    <ScrollView
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View>
          <Text style={styles.eyebrow}>CAMPUS LIFE, MADE SIMPLE</Text>
          <Text style={styles.heading}>Hi, Maya 👋</Text>
          <Text style={styles.subheading}>
            Find something good to do today.
          </Text>
        </View>
        <View style={styles.heroIcon}>
          <Ionicons name="sparkles" size={26} color="#fff" />
        </View>
      </View>
      <Text style={styles.sectionTitle}>Your event snapshot</Text>
      <View style={[styles.stats, width > 560 && styles.statsWide]}>
        <StatCard
          label="Total events"
          value={`${events.length}`}
          accent="#4F46E5"
        />
        <StatCard label="Joined events" value={`${joined}`} accent="#0F9D7A" />
        <StatCard label="Coming up" value="4" accent="#E76F51" />
      </View>
      <View style={styles.explore}>
        <View>
          <Text style={styles.exploreTitle}>Ready to explore?</Text>
          <Text style={styles.exploreText}>
            New ideas, familiar faces, and a full campus calendar.
          </Text>
        </View>
        <Pressable
          onPress={() => router.push("/(tabs)/events" as Href)}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Browse events</Text>
          <Ionicons name="arrow-forward" size={17} color="#fff" />
        </Pressable>
      </View>
      <View style={styles.attendanceCard}>
        <View>
          <Text style={styles.exploreTitle}>Lab 08: Attendance</Text>
          <Text style={styles.exploreText}>
            Mark your class as present or absent.
          </Text>
        </View>
        <Pressable
          onPress={() => router.push("/lab08" as Href)}
          style={({ pressed }) => [
            styles.attendanceButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Open attendance</Text>
          <Ionicons name="clipboard-outline" size={17} color="#fff" />
        </Pressable>
      </View>
      <Link href={"/events" as Href} style={styles.link}>
        View all campus events →
      </Link>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingBottom: 36,
  },
  hero: {
    backgroundColor: "#4F46E5",
    padding: 22,
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  eyebrow: {
    color: "#DCD9FF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  heading: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 8,
  },
  subheading: {
    color: "#E9E8FF",
    fontSize: 15,
    marginTop: 4,
  },
  heroIcon: {
    backgroundColor: "#6D64ED",
    borderRadius: 18,
    padding: 12,
  },
  sectionTitle: {
    color: "#14213D",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 28,
    marginBottom: 13,
  },
  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statsWide: {
    flexWrap: "nowrap",
  },
  explore: {
    backgroundColor: "#E8F5F1",
    borderRadius: 22,
    padding: 20,
    marginTop: 28,
  },
  attendanceCard: {
    backgroundColor: "#EEF0FF",
    borderRadius: 22,
    padding: 20,
    marginTop: 16,
  },
  exploreTitle: {
    color: "#14213D",
    fontSize: 19,
    fontWeight: "800",
  },
  exploreText: {
    color: "#526071",
    lineHeight: 20,
    marginTop: 5,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0F9D7A",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 8,
    alignItems: "center",
  },
  attendanceButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 8,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },
  link: {
    color: "#4F46E5",
    fontWeight: "800",
    marginTop: 22,
    textAlign: "center",
  },
});
