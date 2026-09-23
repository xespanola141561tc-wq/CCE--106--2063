import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { EventCard } from "../components/EventCard";
import { type EventCategory, events } from "../../data/events";

const filters: ("All" | EventCategory)[] = ["All", "Academic", "Community", "Sports"];

export default function EventsScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<"All" | EventCategory>("All");
  const visible = selected === "All" ? events : events.filter((event) => event.category === selected);

  return (
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <Text style={styles.intro}>Find your next campus moment.</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {filters.map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setSelected(filter)}
            style={[styles.filter, selected === filter && styles.filterActive]}
          >
            <Text style={[styles.filterText, selected === filter && styles.filterTextActive]}>{filter}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.count}>{visible.length} events</Text>
      {visible.map((event) => (
        <EventCard key={event.id} event={event} onPress={() => router.push(`/events/${event.id}` as Href)} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: "#F7F8FA", padding: 18, paddingBottom: 32 },
  intro: { color: "#68727B", fontSize: 16, marginBottom: 17 },
  filters: { gap: 9, paddingBottom: 12 },
  filter: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E6EA",
    borderRadius: 99,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterActive: { backgroundColor: "#4F46E5", borderColor: "#4F46E5" },
  filterText: { color: "#5C6670", fontSize: 13, fontWeight: "700" },
  filterTextActive: { color: "#FFFFFF" },
  count: { color: "#737C85", fontSize: 13, fontWeight: "700", marginBottom: 15, marginTop: 10 },
});
