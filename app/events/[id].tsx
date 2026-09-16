import { type Href, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { events } from '../../data/events';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const event = events.find(item => item.id === id);
  const [isJoined, setIsJoined] = useState<boolean>(event?.joined || false);

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>⚠️ Event not found or invalid ID.</Text>
        <Pressable style={styles.backBtn} onPress={() => router.replace('/events' as Href)}>
          <Text style={styles.backBtnText}>Go to Events</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.category}>{event.category}</Text>
      <Text style={styles.title}>{event.title}</Text>
      
      <View style={styles.detailCard}>
        <Text style={styles.detailItem}>📅 Date: {event.dateTime}</Text>
        <Text style={styles.detailItem}>📍 Location: {event.venue}</Text>
        <Text style={styles.detailItem}>
          Status: {isJoined ? 'You are attending' : 'Not joined yet'}
        </Text>
      </View>

      <Pressable
        style={[styles.actionBtn, isJoined ? styles.leaveBtn : styles.joinBtn]}
        onPress={() => setIsJoined(!isJoined)}
      >
        <Text style={styles.actionBtnText}>
          {isJoined ? 'Leave Event' : 'Join Event'}
        </Text>
      </Pressable>

      <Pressable style={styles.secondaryBtn} onPress={() => router.back()}>
        <Text style={styles.secondaryBtnText}>← Go Back</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  content: { padding: 20 },
  category: { fontSize: 13, color: '#4A90E2', fontWeight: 'bold', textTransform: 'uppercase' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2B3A55', marginVertical: 8 },
  detailCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginVertical: 16 },
  detailItem: { fontSize: 15, color: '#444', marginBottom: 8 },
  actionBtn: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  joinBtn: { backgroundColor: '#4A90E2' },
  leaveBtn: { backgroundColor: '#E53935' },
  actionBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  secondaryBtn: { padding: 12, alignItems: 'center', marginTop: 12 },
  secondaryBtnText: { color: '#666', fontSize: 14 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 16, color: '#D32F2F', marginBottom: 16 },
  backBtn: { backgroundColor: '#4A90E2', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  backBtnText: { color: '#FFF', fontWeight: 'bold' },
});
