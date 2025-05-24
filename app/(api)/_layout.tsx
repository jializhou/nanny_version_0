import { Stack } from 'expo-router';

export default function APILayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="caregivers/page"
        options={{ title: 'Caregivers API' }}
      />
      <Stack.Screen
        name="messages/page"
        options={{ title: 'Messages API' }}
      />
      <Stack.Screen
        name="reviews/page"
        options={{ title: 'Reviews API' }}
      />
    </Stack>
  );
}