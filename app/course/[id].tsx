import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Course Header Hero */}
      <View style={styles.heroCard}>
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{id || 'COURSE CODE'}</Text>
        </View>
        <Text style={styles.studentName}>Course Detail View</Text>
        <Text style={styles.dateText}>
          Ito ay dynamic screen na binuksan sa itaas ng Tabs layout gamit ang Stack navigation.
        </Text>
      </View>

      {/* Sample Course Information Section */}
      <Text style={styles.sectionTitle}>Course Information</Text>

      <View style={styles.glassForm}>
        <Text style={styles.label}>Course Status</Text>
        <Text style={styles.value}>Enrolled · Active</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Schedule</Text>
        <Text style={styles.value}>Mon / Wed · 10:00 AM - 12:00 PM</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Room / Location</Text>
        <Text style={styles.value}>Lab 304, Computer Studies Building</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tagBadge: {
    backgroundColor: '#312E81',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },
  tagText: {
    color: '#818CF8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  studentName: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  dateText: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 20,
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
    letterSpacing: 0.5,
  },
  glassForm: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#334155',
  },
  label: {
    color: '#818CF8',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  value: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 12,
  },
});