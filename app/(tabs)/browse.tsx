import { Text, StyleSheet } from 'react-native';

// Previous content omitted for brevity
// Update the salary display in the caregiver list:
<Text style={[styles.caregiverRate, { color: colors.primary }]}>
  ¥{item.monthlySalary}/月
</Text>

const styles = StyleSheet.create({
  caregiverRate: {
    fontSize: 16,
    fontWeight: '600',
  }
});