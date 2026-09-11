import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function StudentDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Student Identification Card */}
      <View style={styles.heroCard}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>ID</Text>
          </View>
          <View style={styles.onlineBadge} />
        </View>

        <View style={styles.profileTextContainer}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.greetingText}>STUDENT IDENTIFICATION</Text>
            <View style={styles.activeBadge}>
              <Text style={styles.activeText}>OFFICIALLY ENROLLED</Text>
            </View>
          </View>

          <Text style={styles.idNumber}>{id || 'NO ID'}</Text>

          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>VERIFIED RECORD</Text>
          </View>
        </View>
      </View>

      {/* Additional Details Section */}
      <Text style={styles.sectionTitle}>Verification Summary</Text>

      <View style={styles.glassForm}>
        <Text style={styles.label}>Student Reference No.</Text>
        <Text style={styles.value}>{id || 'N/A'}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>System Status</Text>
        <Text style={styles.value}>Active Student Account</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Access Level</Text>
        <Text style={styles.value}>Full Campus Access Granted</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
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
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#312E81',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#A5B4FC',
    fontSize: 16,
    fontWeight: '800',
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
    borderColor: '#1E293B',
  },
  profileTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  greetingText: {
    color: '#818CF8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  activeBadge: {
    backgroundColor: '#064E3B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#065F46',
    marginTop: 2,
  },
  activeText: {
    color: '#34D399',
    fontSize: 9,
    fontWeight: '800',
  },
  idNumber: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 4,
  },
  tagBadge: {
    backgroundColor: '#312E81',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 6,
  },
  tagText: {
    color: '#A5B4FC',
    fontSize: 10,
    fontWeight: '700',
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
})