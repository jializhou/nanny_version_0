'use client';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface UserInfo {
  username: string;
  nickname: string;
  avatar: string;
  bio: string;
  gender: '男' | '女' | '保密';
  birthday: string;
  location: string;
  phone: string;
  wechat: string;
  email: string;
}

const maskString = (str: string, start: number = 3, end: number = 4): string => {
  if (!str) return '';
  const length = str.length;
  const maskedLength = length - start - end;
  if (maskedLength <= 0) return str;
  return str.substring(0, start) + '*'.repeat(maskedLength) + str.substring(length - end);
};

export default function PersonalInfoPage() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [showSensitive, setShowSensitive] = React.useState<Record<string, boolean>>({
    phone: false,
    wechat: false,
    email: false,
  });

  const [previewVisible, setPreviewVisible] = React.useState(false);

  // 模拟用户数据，实际应用中应该从API获取
  const userInfo: UserInfo = {
    username: '张三',
    nickname: '三月',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    bio: '热爱生活，享受每一天',
    gender: '男',
    birthday: '1990-03-15',
    location: '上海市浦东新区',
    phone: '13812345678',
    wechat: 'wxid_abc123',
    email: 'zhangsan@example.com',
  };

  const toggleVisibility = (field: string) => {
    setShowSensitive(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const renderBasicInfo = () => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={() => Alert.alert('提示', '头像修改功能即将上线')}>
          <Image 
            source={{ uri: userInfo.avatar }} 
            style={styles.avatar}
          />
          <View style={[styles.editAvatarButton, { backgroundColor: colors.primary }]}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      {renderInfoItem('用户名', userInfo.username)}
      {renderInfoItem('昵称', userInfo.nickname)}
      {renderInfoItem('性别', userInfo.gender)}
      {renderInfoItem('生日', userInfo.birthday)}
      {renderInfoItem('常住地', userInfo.location)}
      <View style={styles.bioContainer}>
        <Text style={[styles.label, { color: colors.text }]}>个人简介</Text>
        <Text style={[styles.bioText, { color: colors.textDim }]}>
          {userInfo.bio}
        </Text>
      </View>
    </View>
  );

  const renderContactInfo = () => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>联系方式</Text>
      {renderInfoItem('手机号码', userInfo.phone, 'phone')}
      {renderInfoItem('微信号', userInfo.wechat, 'wechat')}
      {renderInfoItem('邮箱', userInfo.email, 'email')}
      <View style={[styles.infoItem, { backgroundColor: colors.card }]}>
        <View style={styles.infoContent}>
          <Text style={[styles.label, { color: colors.text }]}>支付方式</Text>
          <Text style={[styles.value, { color: colors.textDim }]}>
            已绑定2个支付方式
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.arrowButton}
          onPress={() => router.push('/(user)/payment-methods' as any)}
        >
          <Ionicons name="chevron-forward" size={24} color={colors.textDim} />
        </TouchableOpacity>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={[styles.infoItem, { backgroundColor: colors.card }]}>
        <View style={styles.infoContent}>
          <Text style={[styles.label, { color: colors.text }]}>密码</Text>
          <Text style={[styles.value, { color: colors.textDim }]}>
            ••••••••
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.changeButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            Alert.alert('提示', '修改密码功能即将上线');
          }}
        >
          <Text style={styles.changeButtonText}>修改</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderInfoItem = (label: string, value: string, field?: keyof typeof showSensitive) => (
    <>
      <View style={[styles.infoItem, { backgroundColor: colors.card }]}>
        <View style={styles.infoContent}>
          <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
          <Text style={[styles.value, { color: colors.textDim }]}>
            {field ? (showSensitive[field] ? value : maskString(value)) : value}
          </Text>
        </View>
        {field && (
          <TouchableOpacity 
            style={styles.visibilityButton}
            onPress={() => toggleVisibility(field)}
          >
            <Ionicons
              name={showSensitive[field] ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
    </>
  );

  const renderPreviewItem = (label: string, value: string) => (
    <>
      <View style={[styles.previewItem, { backgroundColor: colors.card }]}>
        <Text style={[styles.previewLabel, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.previewValue, { color: colors.textDim }]}>{value}</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          个人信息
        </Text>
        <TouchableOpacity 
          style={styles.previewButton}
          onPress={() => setPreviewVisible(true)}
        >
          <Ionicons name="eye" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {renderBasicInfo()}
        {renderContactInfo()}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={previewVisible}
        onRequestClose={() => setPreviewVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={[styles.modalHeader, { backgroundColor: colors.card }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>预览信息</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setPreviewVisible(false)}
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScroll}>
              <View style={[styles.previewCard, { backgroundColor: colors.card }]}>
                <View style={styles.previewAvatarSection}>
                  <Image 
                    source={{ uri: userInfo.avatar }} 
                    style={styles.previewAvatar}
                  />
                </View>
                {renderPreviewItem('用户名', userInfo.username)}
                {renderPreviewItem('昵称', userInfo.nickname)}
                {renderPreviewItem('性别', userInfo.gender)}
                {renderPreviewItem('生日', userInfo.birthday)}
                {renderPreviewItem('常住地', userInfo.location)}
                {renderPreviewItem('手机号码', userInfo.phone)}
                {renderPreviewItem('微信号', userInfo.wechat)}
                {renderPreviewItem('邮箱', userInfo.email)}
                {renderPreviewItem('密码', '•••••••')}
                <View style={styles.previewBioContainer}>
                  <Text style={[styles.previewLabel, { color: colors.text }]}>个人简介</Text>
                  <Text style={[styles.previewBioText, { color: colors.textDim }]}>
                    {userInfo.bio}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  previewButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  avatarSection: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  infoContent: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  bioContainer: {
    padding: 16,
  },
  bioText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginTop: 8,
  },
  visibilityButton: {
    padding: 8,
  },
  arrowButton: {
    padding: 8,
  },
  changeButton: {
    padding: 8,
    borderRadius: 8,
  },
  changeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#eaeaea',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  closeButton: {
    padding: 8,
  },
  modalScroll: {
    padding: 16,
  },
  previewCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  previewAvatarSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  previewAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  previewItem: {
    padding: 16,
  },
  previewLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  previewValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  previewBioContainer: {
    padding: 16,
  },
  previewBioText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginTop: 8,
  },
}); 