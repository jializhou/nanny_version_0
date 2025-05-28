import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Star } from 'lucide-react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

interface Review {
  id: string;
  rating: number;
  comment: string;
  date: string;
}

// 模拟数据，实际应用中应该从API获取
const mockReviews: Review[] = [
  // 这里暂时为空数组，表示没有评价
];

export default function ReviewsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen
        options={{
          title: '我的评价',
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
        {mockReviews.length === 0 ? (
          <View style={styles.emptyState}>
            <Star size={64} color="#FFD700" style={styles.emptyIcon} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              暂无评价
            </Text>
            <Text style={[styles.emptyText, { color: colors.textDim }]}>
              您还没有对任何阿姨进行评价
            </Text>
          </View>
        ) : (
          <View style={styles.reviewsList}>
            {mockReviews.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                {/* 评价项的具体内容将在这里实现 */}
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
  reviewsList: {
    paddingTop: 8,
  },
  reviewItem: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
}); 