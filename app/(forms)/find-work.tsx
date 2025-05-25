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

export default function FindWorkScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    age: '',
    hometown: '',
    currentLocation: '',
    education: '',
    maritalStatus: '',
    
    // Work Experience
    yearsOfExperience: '',
    previousEmployers: '',
    workHistory: '',
    specialties: '',
    
    // Skills & Qualifications
    skills: '',
    certifications: '',
    languages: '',
    cookingAbility: '',
    
    // Job Preferences
    preferredLocation: '',
    expectedSalary: '',
    availableDate: '',
    workType: '',
    preferredSchedule: '',
    liveIn: false,
    
    // Additional Information
    selfIntroduction: '',
    healthCondition: '',
    additionalInfo: '',
    
    // Contact Information
    phone: '',
    email: '',
    wechat: ''
  });

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['name', 'age', 'phone', 'workHistory'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      Alert.alert('提示', '请填写所有必填项');
      return;
    }

    // Submit form
    Alert.alert(
      '确认提交',
      '确定要提交求职信息吗？',
      [
        {
          text: '取消',
          style: 'cancel'
        },
        {
          text: '确定',
          onPress: () => {
            // Here you would typically make an API call
            Alert.alert('成功', '求职信息已发布');
            router.back();
          }
        }
      ]
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Personal Information Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>个人信息</Text>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>姓名 *</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请输入您的姓名"
            placeholderTextColor={colors.textDim}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>年龄 *</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请输入您的年龄"
            placeholderTextColor={colors.textDim}
            keyboardType="numeric"
            value={formData.age}
            onChangeText={(text) => setFormData({ ...formData, age: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>籍贯</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请输入您的籍贯"
            placeholderTextColor={colors.textDim}
            value={formData.hometown}
            onChangeText={(text) => setFormData({ ...formData, hometown: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>现居地</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请输入您目前居住的城市"
            placeholderTextColor={colors.textDim}
            value={formData.currentLocation}
            onChangeText={(text) => setFormData({ ...formData, currentLocation: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>学历</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请输入您的最高学历"
            placeholderTextColor={colors.textDim}
            value={formData.education}
            onChangeText={(text) => setFormData({ ...formData, education: text })}
          />
        </View>
      </View>

      {/* Work Experience Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>工作经验</Text>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>工作年限</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请输入您的工作年限"
            placeholderTextColor={colors.textDim}
            value={formData.yearsOfExperience}
            onChangeText={(text) => setFormData({ ...formData, yearsOfExperience: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>工作经历 *</Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请详细描述您的工作经历"
            placeholderTextColor={colors.textDim}
            multiline
            numberOfLines={4}
            value={formData.workHistory}
            onChangeText={(text) => setFormData({ ...formData, workHistory: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>专业特长</Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请描述您的专业特长"
            placeholderTextColor={colors.textDim}
            multiline
            numberOfLines={4}
            value={formData.specialties}
            onChangeText={(text) => setFormData({ ...formData, specialties: text })}
          />
        </View>
      </View>

      {/* Skills & Qualifications Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>技能资质</Text>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>技能特长</Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="如：育儿、烹饪、保洁等"
            placeholderTextColor={colors.textDim}
            multiline
            numberOfLines={4}
            value={formData.skills}
            onChangeText={(text) => setFormData({ ...formData, skills: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>持有证书</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="如：育婴师证书、健康证等"
            placeholderTextColor={colors.textDim}
            value={formData.certifications}
            onChangeText={(text) => setFormData({ ...formData, certifications: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>语言能力</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="如：普通话、方言等"
            placeholderTextColor={colors.textDim}
            value={formData.languages}
            onChangeText={(text) => setFormData({ ...formData, languages: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>烹饪能力</Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请描述您的烹饪特长"
            placeholderTextColor={colors.textDim}
            multiline
            numberOfLines={4}
            value={formData.cookingAbility}
            onChangeText={(text) => setFormData({ ...formData, cookingAbility: text })}
          />
        </View>
      </View>

      {/* Job Preferences Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>求职意向</Text>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>期望工作地点</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请输入期望工作的城市"
            placeholderTextColor={colors.textDim}
            value={formData.preferredLocation}
            onChangeText={(text) => setFormData({ ...formData, preferredLocation: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>期望薪资</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="如：8000-10000元/月"
            placeholderTextColor={colors.textDim}
            value={formData.expectedSalary}
            onChangeText={(text) => setFormData({ ...formData, expectedSalary: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>可入职时间</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="如：随时、一个月后等"
            placeholderTextColor={colors.textDim}
            value={formData.availableDate}
            onChangeText={(text) => setFormData({ ...formData, availableDate: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>工作类型</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="如：全职、钟点工等"
            placeholderTextColor={colors.textDim}
            value={formData.workType}
            onChangeText={(text) => setFormData({ ...formData, workType: text })}
          />
        </View>

        <View style={styles.switchGroup}>
          <Text style={[styles.label, { color: colors.text }]}>接受住家</Text>
          <Switch
            value={formData.liveIn}
            onValueChange={(value) => setFormData({ ...formData, liveIn: value })}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
        </View>
      </View>

      {/* Additional Information Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>补充信息</Text>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>自我介绍</Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请简单介绍一下自己"
            placeholderTextColor={colors.textDim}
            multiline
            numberOfLines={4}
            value={formData.selfIntroduction}
            onChangeText={(text) => setFormData({ ...formData, selfIntroduction: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>健康状况</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请描述您的健康状况"
            placeholderTextColor={colors.textDim}
            value={formData.healthCondition}
            onChangeText={(text) => setFormData({ ...formData, healthCondition: text })}
          />
        </View>
      </View>

      {/* Contact Information Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>联系方式</Text>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>联系电话 *</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请输入您的联系电话"
            placeholderTextColor={colors.textDim}
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>电子邮箱</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请输入您的电子邮箱"
            placeholderTextColor={colors.textDim}
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>微信号</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="请输入您的微信号"
            placeholderTextColor={colors.textDim}
            value={formData.wechat}
            onChangeText={(text) => setFormData({ ...formData, wechat: text })}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: colors.primary }]}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>发布求职</Text>
      </TouchableOpacity>

      <Text style={[styles.requiredNote, { color: colors.textDim }]}>
        * 为必填项
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
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