import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface EventData {
  id: string;
  title: string;
  category: string;
  dateTime: string;
  venue: string;
  joined?: boolean;
}

interface EventCardProps {
  event: EventData;
  onPress: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.category}>{event.category}</Text>
        {event.joined && <Text style={styles.joinedBadge}>Joined</Text>}
      </View>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.details}>📅 {event.dateTime}</Text>
      <Text style={styles.details}>📍 {event.venue}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A90E2',
    textTransform: 'uppercase',
  },
  joinedBadge: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  details: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
});
