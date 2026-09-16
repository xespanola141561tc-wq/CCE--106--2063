import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { initialEvents } from '../../data/eventsData';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const cardWidth = width > 600 ? '48%' : '100%';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to EventMate!</Text>
      <Text style={styles.subHeader}>Featured Dashboard Events</Text>

      <View style={styles.cardWrapper}>
        {initialEvents.slice(0, 2).map((item) => (
          <View key={item.id} style={[styles.card, { width: cardWidth }]}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardCategory}>{item.category} • {item.date}</Text>
            <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>

            <Pressable
              style={styles.button}
              onPress={() => router.push(`/events/${item.id}`)}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </Pressable>
          </View>
        ))}
      </View>

      <View style={styles.linkContainer}>
        <Link href="/(tabs)/events" style={styles.linkText}>
          Browse All Events →
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 16,
  },
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  cardCategory: {
    fontSize: 12,
    color: '#007AFF',
    marginVertical: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  linkContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});