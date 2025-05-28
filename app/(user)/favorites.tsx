import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Heart } from 'lucide-react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

interface Favorite {
  id: string;
  name: string;
  avatar: string;
  type: string;
}

// 模拟数据，实际应用中应该从API获取
const mockFavorites: Favorite[] = [
  // 这里暂时为空数组，表示没有收藏
];

export default function FavoritesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen
        options={{
          title: '我的收藏',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      />
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
      >
        {mockFavorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Heart size={64} color={colors.primary} style={styles.emptyIcon} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              暂无收藏
            </Text>
            <Text style={[styles.emptyText, { color: colors.textDim }]}>
              您还没有收藏任何阿姨
            </Text>
          </View>
        ) : (
          <View style={styles.favoritesList}>
            {mockFavorites.map((favorite, index) => (
              <View key={index} style={styles.favoriteItem}>
                {/* 收藏项的具体内容将在这里实现 */}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    minHeight: 400,
  },
  emptyIcon: {
    marginBottom: 24,
    opacity: 0.9,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
  },
  favoritesList: {
    paddingTop: 8,
  },
  favoriteItem: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
}); 