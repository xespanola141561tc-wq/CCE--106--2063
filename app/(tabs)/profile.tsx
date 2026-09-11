import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Digital ID Hero Card */}
      <View style={styles.heroCard}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}></Text>
          </View>
          <View style={styles.onlineBadge} />
        </View>
        
        <View style={styles.profileTextContainer}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.greetingText}>STUDENT DIGITAL ID</Text>
            <View style={styles.activeBadge}>
              <Text style={styles.activeText}>ENROLLED</Text>
            </View>
          </View>

          <Text style={styles.studentName}>Xerted Joy Espanola</Text>
          
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>ID: 141561</Text>
          </View>
          
          <Text style={styles.studentEmail}>BS in Information Technology</Text>
        </View>
      </View>

      {/* Account Details Section */}
      <Text style={styles.sectionTitle}>Account & Contact Details</Text>

      <View style={styles.glassForm}>
        <Text style={styles.label}>Academic Status</Text>
        <Text style={styles.value}>4th Syear 1st Semester</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Institutional Email</Text>
        <Text style={styles.value}>x.espanola.141561.tc@umindanao.edu.ph</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Mobile Number</Text>
        <Text style={styles.value}>+639309412120</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Emergency Contact</Text>
        <Text style={styles.value}>Mary Joy Tumales (Parent) · 09536682251</Text>
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
    backgroundColor: '#243654',
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
    backgroundColor: '#509198',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#a6b9c2',
    fontSize: 18,
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
    borderColor: '#0d1421',
  },
  profileTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    color: '#7b86eb',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  activeBadge: {
    backgroundColor: '#12634d',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#065F46',
  },
  activeText: {
    color: '#34D399',
    fontSize: 9,
    fontWeight: '800',
  },
  studentName: {
    color: '#ddebf9',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  tagBadge: {
    backgroundColor: '#312E81',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4,
    marginBottom: 4,
  },
  tagText: {
    color: '#A5B4FC',
    fontSize: 10,
    fontWeight: '700',
  },
  studentEmail: {
    color: '#94A3B8',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#a8afb6',
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
    borderColor: '#020a14',
  },
  label: {
    color: '#51a7b7',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  value: {
    color: '#f7fafd',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#6489bc',
    marginVertical: 12,
  },
});