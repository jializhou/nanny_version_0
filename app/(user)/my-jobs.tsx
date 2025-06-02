import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Briefcase } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface JobPost {
  id: string;
  familyName: string;
  location: string;
  duties: string;
  salary: string;
  createdAt: string;
  status: 'active' | 'closed';
}

export default function MyJobsScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobPosts();
  }, []);

  const loadJobPosts = async () => {
    try {
      const posts = await AsyncStorage.getItem('jobPosts');
      setJobPosts(posts ? JSON.parse(posts) : []);
    } catch (error) {
      console.error('Error loading job posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostJob = () => {
    router.push('/(forms)/post-job');
  };

  const handleViewJobPost = (post: JobPost) => {
    // TODO: Implement job post detail view
    Alert.alert('查看详情', JSON.stringify(post, null, 2));
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>加载中...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.content}>
        {jobPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Briefcase size={48} color={colors.textDim} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              暂无招聘记录
            </Text>
            <Text style={[styles.emptyText, { color: colors.textDim }]}>
              您还没有发布过招聘信息
            </Text>
            <TouchableOpacity
              style={[styles.postButton, { backgroundColor: colors.primary }]}
              onPress={handlePostJob}
            >
              <Text style={styles.postButtonText}>发布招聘</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {jobPosts.map((post) => (
              <TouchableOpacity
                key={post.id}
                style={[styles.jobCard, { backgroundColor: colors.card }]}
                onPress={() => handleViewJobPost(post)}
              >
                <View style={styles.jobHeader}>
                  <Text style={[styles.jobTitle, { color: colors.text }]}>
                    {post.familyName}
                  </Text>
                  <Text style={[styles.jobStatus, { color: colors.primary }]}>
                    {post.status === 'active' ? '招聘中' : '已结束'}
                  </Text>
                </View>
                <Text style={[styles.jobLocation, { color: colors.textDim }]}>
                  {post.location}
                </Text>
                <Text style={[styles.jobSalary, { color: colors.primary }]}>
                  {post.salary}
                </Text>
                <Text style={[styles.jobDuties, { color: colors.text }]}>
                  {post.duties}
                </Text>
                <Text style={[styles.jobTime, { color: colors.textDim }]}>
                  发布于：{new Date(post.createdAt).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 24,
    textAlign: 'center',
  },
  postButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  jobCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  jobStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  jobLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  jobSalary: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  jobDuties: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  jobTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
}); 