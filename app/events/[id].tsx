import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { initialEvents } from '../../data/eventsData';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const event = useMemo(
    () => initialEvents.find((entry) => entry.id === String(id)),
    [id]
  );

  const [isJoined, setIsJoined] = useState(false);

  if (!event) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.errorText}>Event not found!</Text>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.badge}>{event.category}</Text>
      <Text style={styles.date}>📅 {event.date}</Text>

      <Text style={styles.sectionTitle}>About this Event</Text>
      <Text style={styles.description}>{event.description}</Text>

      <Pressable
        style={[styles.actionBtn, isJoined ? styles.leaveBtn : styles.joinBtn]}
        onPress={() => setIsJoined((value) => !value)}
      >
        <Text style={styles.actionBtnText}>
          {isJoined ? 'Leave Event' : 'Join Event'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E7F1FF',
    color: '#007AFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontWeight: '600',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#343A40',
  },
  description: {
    fontSize: 15,
    color: '#495057',
    lineHeight: 22,
    marginBottom: 24,
  },
  actionBtn: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinBtn: {
    backgroundColor: '#007AFF',
  },
  leaveBtn: {
    backgroundColor: '#DC3545',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    marginBottom: 12,
  },
  backBtn: {
    backgroundColor: '#6C757D',
    padding: 10,
    borderRadius: 6,
  },
  backBtnText: {
    color: '#FFF',
  },
});