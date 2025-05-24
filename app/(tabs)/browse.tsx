import { Text, StyleSheet, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export default function Browse() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const styles = StyleSheet.create({
    caregiverRate: {
      fontSize: 16,
      fontWeight: '600',
    }
  });

  return (
    <Text style={[styles.caregiverRate, { color: colors.primary }]}>
      ¥{item.monthlySalary}/月
    </Text>
  );
}