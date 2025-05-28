import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Switch,
  Alert
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { ArrowLeft } from 'lucide-react-native';

export default function PostJobScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const [formData, setFormData] = useState({
    // Family Information
    familyName: '',
    familySize: '',
    childrenAges: '',
    location: '',
    housingType: '',
    
    // Job Details
    startDate: '',
    schedule: '',
    workHours: '',
    duties: '',
    requirements: '',
    salary: '',
    accommodation: false,
    mealProvided: false,
    
    // Caregiver Requirements
    ageRange: '',
    experience: '',
    education: '',
    languages: '',
    skills: '',
    certifications: '',
    
    // Additional Information
    additionalInfo: '',
    
    // Contact Information
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    preferredContactMethod: ''
  });

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['familyName', 'location', 'duties', 'salary', 'contactPhone'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      Alert.alert('提示', '请填写所有必填项');
      return;
    }

    // Submit form
    Alert.alert(
      '确认提交',
      '确定要提交招聘信息吗？',
      [
        {
          text: '取消',
          style: 'cancel'
        },
        {
          text: '确定',
          onPress: () => {
            // Here you would typically make an API call
            Alert.alert('成功', '招聘信息已发布');
            router.back();
          }
        }
      ]
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with back button */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          onPress={handleBack}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          招聘阿姨
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Family Information Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>家庭信息</Text>
          
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>家庭称呼 *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="如：张女士"
              placeholderTextColor={colors.textDim}
              value={formData.familyName}
              onChangeText={(text) => setFormData({ ...formData, familyName: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>家庭成员</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="请描述家庭成员构成"
              placeholderTextColor={colors.textDim}
              value={formData.familySize}
              onChangeText={(text) => setFormData({ ...formData, familySize: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>孩子年龄</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="如：2岁、5岁"
              placeholderTextColor={colors.textDim}
              value={formData.childrenAges}
              onChangeText={(text) => setFormData({ ...formData, childrenAges: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>居住地址 *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="请输入详细地址"
              placeholderTextColor={colors.textDim}
              value={formData.location}
              onChangeText={(text) => setFormData({ ...formData, location: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>住房类型</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="如：三室两厅"
              placeholderTextColor={colors.textDim}
              value={formData.housingType}
              onChangeText={(text) => setFormData({ ...formData, housingType: text })}
            />
          </View>
        </View>

        {/* Job Details Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>工作详情</Text>
          
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>期望开始时间</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="如：2024年3月1日"
              placeholderTextColor={colors.textDim}
              value={formData.startDate}
              onChangeText={(text) => setFormData({ ...formData, startDate: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>工作时间 *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="如：周一至周五 9:00-18:00"
              placeholderTextColor={colors.textDim}
              value={formData.schedule}
              onChangeText={(text) => setFormData({ ...formData, schedule: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>工作内容 *</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="请详细描述工作职责"
              placeholderTextColor={colors.textDim}
              multiline
              numberOfLines={4}
              value={formData.duties}
              onChangeText={(text) => setFormData({ ...formData, duties: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>薪资待遇 *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="如：8000-10000元/月"
              placeholderTextColor={colors.textDim}
              value={formData.salary}
              onChangeText={(text) => setFormData({ ...formData, salary: text })}
            />
          </View>

          <View style={styles.switchGroup}>
            <Text style={[styles.label, { color: colors.text }]}>提供住宿</Text>
            <Switch
              value={formData.accommodation}
              onValueChange={(value) => setFormData({ ...formData, accommodation: value })}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <View style={styles.switchGroup}>
            <Text style={[styles.label, { color: colors.text }]}>提供工作餐</Text>
            <Switch
              value={formData.mealProvided}
              onValueChange={(value) => setFormData({ ...formData, mealProvided: value })}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>

        {/* Caregiver Requirements Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>阿姨要求</Text>
          
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>年龄要求</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="如：35-50岁"
              placeholderTextColor={colors.textDim}
              value={formData.ageRange}
              onChangeText={(text) => setFormData({ ...formData, ageRange: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>工作经验</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="如：至少3年相关经验"
              placeholderTextColor={colors.textDim}
              value={formData.experience}
              onChangeText={(text) => setFormData({ ...formData, experience: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>语言要求</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="如：普通话流利"
              placeholderTextColor={colors.textDim}
              value={formData.languages}
              onChangeText={(text) => setFormData({ ...formData, languages: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>技能要求</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="如：会做饭、会照顾婴儿等"
              placeholderTextColor={colors.textDim}
              multiline
              numberOfLines={4}
              value={formData.skills}
              onChangeText={(text) => setFormData({ ...formData, skills: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>证书要求</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="如：育婴师证书"
              placeholderTextColor={colors.textDim}
              value={formData.certifications}
              onChangeText={(text) => setFormData({ ...formData, certifications: text })}
            />
          </View>
        </View>

        {/* Contact Information Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>联系方式</Text>
          
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>联系人</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="请输入联系人姓名"
              placeholderTextColor={colors.textDim}
              value={formData.contactName}
              onChangeText={(text) => setFormData({ ...formData, contactName: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>联系电话 *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="请输入联系电话"
              placeholderTextColor={colors.textDim}
              keyboardType="phone-pad"
              value={formData.contactPhone}
              onChangeText={(text) => setFormData({ ...formData, contactPhone: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>电子邮箱</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="请输入电子邮箱"
              placeholderTextColor={colors.textDim}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.contactEmail}
              onChangeText={(text) => setFormData({ ...formData, contactEmail: text })}
            />
          </View>
        </View>

        {/* Additional Information Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>补充说明</Text>
          
          <View style={styles.formGroup}>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
              placeholder="其他补充信息"
              placeholderTextColor={colors.textDim}
              multiline
              numberOfLines={4}
              value={formData.additionalInfo}
              onChangeText={(text) => setFormData({ ...formData, additionalInfo: text })}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>发布招聘</Text>
        </TouchableOpacity>

        <Text style={[styles.requiredNote, { color: colors.textDim }]}>
          * 为必填项
        </Text>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  textArea: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  requiredNote: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});