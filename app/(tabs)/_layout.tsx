import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Platform } from 'react-native';
import { Chrome as Home, Search, MessageCircle, User } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: Platform.select({
          web: {
            ...styles.tabBar,
            borderTop: '1px solid #eaeaea',
          },
          default: styles.tabBar,
        }),
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: true,
        headerStyle: Platform.select({
          web: {
            ...styles.header,
            borderBottom: '1px solid #eaeaea',
          },
          default: styles.header,
        }),
        headerTitleStyle: styles.headerTitle,
        headerTintColor: colors.text,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: t('tabs.browse'),
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: t('tabs.messages'),
          tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />,
          tabBarBadge: 2,
          tabBarBadgeStyle: { backgroundColor: colors.accent },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    paddingTop: 10,
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#fff',
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  header: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
});