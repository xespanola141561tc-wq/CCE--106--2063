import { Link } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { EventItem, initialEvents } from '../../data/eventsData';

export default function EventsScreen() {
  const [search, setSearch] = useState('');

  const filteredEvents = initialEvents.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: EventItem }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>{item.category} | {item.date}</Text>
      </View>

      <Link href={`/events/${item.id}`} asChild>
        <Pressable style={styles.linkBtn}>
          <Text style={styles.linkBtnText}>Open</Text>
        </Pressable>
      </Link>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Filter events by title or category..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  meta: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 2,
  },
  linkBtn: {
    backgroundColor: '#E7F1FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  linkBtnText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});