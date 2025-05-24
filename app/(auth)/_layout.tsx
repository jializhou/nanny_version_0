import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Stack
      screenOptions={{
        headerShown: true,
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
        name="login"
        options={{
          title: '',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: '',
        }}
      />
    </Stack>
  );
}