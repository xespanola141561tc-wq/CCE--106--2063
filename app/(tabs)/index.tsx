import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Simple Top Welcome */}
        <View style={styles.heroCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar} />
            <View style={styles.onlineBadge} />
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.greetingText}>GOOD DAY,</Text>
            <Text style={styles.studentName}>Xerted Joy Espanola</Text>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>IT STUDENT</Text>
            </View>
          </View>
        </View>

        {/* Academic Performance Overview */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          <View style={[styles.metricCard, styles.pendingCard]}>
            <Text style={styles.metricNumber}>2.85</Text>
            <Text style={styles.metricLabel}>GPA</Text>
          </View>
          <View style={[styles.metricCard, styles.completedCard]}>
            <Text style={styles.metricNumber}>2</Text>
            <Text style={styles.metricLabel}>Enrolled</Text>
          </View>
          <View style={[styles.metricCard, styles.completedCard]}>
            <Text style={styles.metricNumber}>95%</Text>
            <Text style={styles.metricLabel}>Attendance</Text>
          </View>
        </View>

        {/* Enrolled Courses */}
        <Text style={styles.sectionTitle}>Enrolled Courses</Text>
        
        <TouchableOpacity 
          style={styles.taskCard} 
          onPress={() => router.push({ pathname: '/course/[id]', params: { id: 'CCE106' } })}
        >
          <View style={styles.taskContent}>
            <View style={styles.courseHeaderRow}>
              <Text style={styles.greetingText}>CCE 106</Text>
              <Text style={styles.statusText}>Active</Text>
            </View>
            <Text style={styles.taskTitle}>Mobile Application Development</Text>
            <View style={styles.dateTag}>
              <Text style={styles.dateText}>Tap to view course details</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.taskCard} 
          onPress={() => router.push({ pathname: '/course/[id]', params: { id: 'IT17' } })}
        >
          <View style={styles.taskContent}>
            <View style={styles.courseHeaderRow}>
              <Text style={styles.greetingText}>IT 17</Text>
              <Text style={styles.statusText}>Active</Text>
            </View>
            <Text style={styles.taskTitle}>Social and Professional Issues</Text>
            <View style={styles.dateTag}>
              <Text style={styles.dateText}>Tap to view course details</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#061322e6',
    borderRadius: 24,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#0a858b',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#0d1017',
  },
  profileTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  greetingText: {
    color: '#91b9c1',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  studentName: {
    color: '#c9def6',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  tagBadge: {
    backgroundColor: '#80858a',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4,
  },
  tagText: {
    color: '#020204',
    fontSize: 10,
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#525a62',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8,
  },
  metricCard: {
    flex: 1,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    alignItems: 'center',
  },
  pendingCard: {
    backgroundColor: '#1E1B4B',
    borderColor: '#110e3a',
  },
  completedCard: {
    backgroundColor: '#1E293B',
    borderColor: '#85697f',
  },
  metricNumber: {
    color: '#64a6e8',
    fontSize: 20,
    fontWeight: '900',
  },
  metricLabel: {
    color: '#939495',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  taskContent: {
    flex: 1,
  },
  courseHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
  },
  taskTitle: {
    color: '#b4bcc5',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  dateTag: {
    marginTop: 4,
  },
  dateText: {
    color: '#83aeea',
    fontSize: 11,
    fontWeight: '500',
  },
});

