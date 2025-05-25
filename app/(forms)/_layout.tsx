import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export default function FormsLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
        },
        headerShadowVisible: false,
        contentStyle: { 
          backgroundColor: colors.background 
        },
      }}
    >
      <Stack.Screen
        name="post-job"
        options={{
          title: '发布招聘',
        }}
      />
      <Stack.Screen
        name="find-work"
        options={{
          title: '发布求职',
        }}
      />
    </Stack>
  );
}