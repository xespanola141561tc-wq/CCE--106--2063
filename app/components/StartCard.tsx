import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

interface StatCardProps {
  label: string;
  value: string | number;
  accent?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, accent = '#4A90E2' }) => {
  const { width } = useWindowDimensions();
  // Responsive width calculation
  const isWide = width > 500;

  return (
    <View style={[styles.card, { borderLeftColor: accent, width: isWide ? '30%' : '100%' }]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2B3A55',
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
});
