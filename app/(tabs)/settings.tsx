import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.sectionTitle}>App Preferences</Text>

      <TouchableOpacity style={styles.taskCard}>
        <View style={styles.taskContent}>
          <Text style={styles.taskTitle}>Notifications</Text>
          <Text style={styles.dateText}>Receive course and campus updates</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.taskCard}>
        <View style={styles.taskContent}>
          <Text style={styles.taskTitle}>Dark Mode</Text>
          <Text style={styles.dateText}>Currently Enabled</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.taskCard, styles.dangerCard]}>
        <View style={styles.taskContent}>
          <Text style={styles.dangerText}>Log Out</Text>
        </View>
      </TouchableOpacity>
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
  sectionTitle: {
    color: '#2e83d2',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
    letterSpacing: 0.5,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#09111e',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
  },
  dateText: {
    color: '#43a9d2',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  dangerCard: {
    borderColor: '#6d2b2b',
    backgroundColor: '#141c1e',
    marginTop: 12,
  },
  dangerText: {
    color: '#FCA5A5',
    fontSize: 15,
    fontWeight: '800',
  },
});