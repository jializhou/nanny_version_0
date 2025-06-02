import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export default function UserLayout() {
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
        name="my-jobs"
        options={{
          title: '我的招聘',
        }}
      />
      <Stack.Screen
        name="my-applications"
        options={{
          title: '我的求职',
        }}
      />
      <Stack.Screen
        name="personal-info"
        options={{
          title: '个人信息',
        }}
      />
      <Stack.Screen
        name="payment-methods"
        options={{
          title: '支付方式',
        }}
      />
      <Stack.Screen
        name="notification-settings"
        options={{
          title: '通知设置',
        }}
      />
      <Stack.Screen
        name="favorites"
        options={{
          title: '我的收藏',
        }}
      />
      <Stack.Screen
        name="reviews"
        options={{
          title: '我的评价',
        }}
      />
    </Stack>
  );
} 