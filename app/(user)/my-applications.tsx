import React from 'react';
import { useState, useEffect } from 'react';
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
import { Search } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface JobApplication {
  id: string;
  name: string;
  age: string;
  phone: string;
  workHistory: string;
  expectedSalary: string;
  createdAt: string;
  status: 'active' | 'closed';
}

export default function MyApplicationsScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const posts = await AsyncStorage.getItem('jobSeekingPosts');
      setApplications(posts ? JSON.parse(posts) : []);
    } catch (error) {
      console.error('Error loading job applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostApplication = () => {
    router.push('/(forms)/find-work');
  };

  const handleViewApplication = (application: JobApplication) => {
    // TODO: Implement application detail view
    Alert.alert('查看详情', JSON.stringify(application, null, 2));
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
        {applications.length === 0 ? (
          <View style={styles.emptyState}>
            <Search size={48} color={colors.textDim} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              暂无求职记录
            </Text>
            <Text style={[styles.emptyText, { color: colors.textDim }]}>
              您还没有发布过求职信息
            </Text>
            <TouchableOpacity
              style={[styles.postButton, { backgroundColor: colors.primary }]}
              onPress={handlePostApplication}
            >
              <Text style={styles.postButtonText}>发布求职</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {applications.map((application) => (
              <TouchableOpacity
                key={application.id}
                style={[styles.applicationCard, { backgroundColor: colors.card }]}
                onPress={() => handleViewApplication(application)}
              >
                <View style={styles.applicationHeader}>
                  <Text style={[styles.applicationName, { color: colors.text }]}>
                    {application.name}
                  </Text>
                  <Text style={[styles.applicationStatus, { color: colors.primary }]}>
                    {application.status === 'active' ? '求职中' : '已结束'}
                  </Text>
                </View>
                <Text style={[styles.applicationAge, { color: colors.textDim }]}>
                  {application.age}岁
                </Text>
                <Text style={[styles.applicationSalary, { color: colors.primary }]}>
                  期望薪资：{application.expectedSalary}
                </Text>
                <Text style={[styles.applicationHistory, { color: colors.text }]}>
                  工作经历：{application.workHistory}
                </Text>
                <Text style={[styles.applicationTime, { color: colors.textDim }]}>
                  发布于：{new Date(application.createdAt).toLocaleDateString()}
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
  applicationCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  applicationName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  applicationStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  applicationAge: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  applicationSalary: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  applicationHistory: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  applicationTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
}); 