import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { CampusEvent } from "../../data/events";

type EventCardProps = {
  event: CampusEvent;
  onPress: () => void;
};

export type EventData = CampusEvent;

export function EventCard({ event, onPress }: EventCardProps) {
  const categoryStyles = {
    Academic: styles.academic,
    Community: styles.community,
    Sports: styles.sports,
  };

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.headerRow}>
        <Text style={[styles.category, categoryStyles[event.category]]}>{event.category}</Text>
        {event.joined && <Text style={styles.joinedBadge}>Joined</Text>}
      </View>
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.detailRow}>
        <Ionicons name="calendar-outline" size={15} color="#7A828A" />
        <Text style={styles.details}>{event.dateTime}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="location-outline" size={16} color="#7A828A" />
        <Text style={styles.details}>{event.venue}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    elevation: 3,
    marginBottom: 14,
    padding: 17,
    shadowColor: "#102433",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardPressed: { opacity: 0.78 },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  category: {
    borderRadius: 99,
    fontSize: 11,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  academic: { backgroundColor: "#F0EEFF", color: "#6554C0" },
  community: { backgroundColor: "#E6F8F2", color: "#0F9D7A" },
  sports: { backgroundColor: "#FFF0EC", color: "#D76A4F" },
  joinedBadge: { color: "#0F9D7A", fontSize: 11, fontWeight: "800" },
  title: { color: "#14213D", fontSize: 17, fontWeight: "800", marginBottom: 14 },
  detailRow: { alignItems: "center", flexDirection: "row", gap: 7, marginTop: 5 },
  details: { color: "#68727B", fontSize: 13 },
});
