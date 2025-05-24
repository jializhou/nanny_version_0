import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Switch
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export default function FindWorkScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    experience: '',
    education: '',
    certifications: '',
    skills: '',
    languages: '',
    preferredLocation: '',
    expectedSalary: '',
    availability: '',
    workType: '',
    liveIn: false,
    cookingAbility: '',
    specialties: '',
    introduction: ''
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: colors.text }]}>发布求职信息</Text>
      
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>姓名</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="请输入您的姓名"
          placeholderTextColor={colors.textDim}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>年龄</Text>
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
        <Text style={[styles.label, { color: colors.text }]}>工作经验</Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="请详细描述您的工作经验"
          placeholderTextColor={colors.textDim}
          multiline
          numberOfLines={4}
          value={formData.experience}
          onChangeText={(text) => setFormData({ ...formData, experience: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>教育背景</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="最高学历"
          placeholderTextColor={colors.textDim}
          value={formData.education}
          onChangeText={(text) => setFormData({ ...formData, education: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>持有证书</Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="请列出您持有的相关证书"
          placeholderTextColor={colors.textDim}
          multiline
          numberOfLines={4}
          value={formData.certifications}
          onChangeText={(text) => setFormData({ ...formData, certifications: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>技能特长</Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="请描述您的技能特长"
          placeholderTextColor={colors.textDim}
          multiline
          numberOfLines={4}
          value={formData.skills}
          onChangeText={(text) => setFormData({ ...formData, skills: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>语言能力</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="请输入您掌握的语言"
          placeholderTextColor={colors.textDim}
          value={formData.languages}
          onChangeText={(text) => setFormData({ ...formData, languages: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>期望工作地点</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="请输入期望工作的城市或地区"
          placeholderTextColor={colors.textDim}
          value={formData.preferredLocation}
          onChangeText={(text) => setFormData({ ...formData, preferredLocation: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>期望薪资</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="请输入期望月薪，如：8000-10000元/月"
          placeholderTextColor={colors.textDim}
          value={formData.expectedSalary}
          onChangeText={(text) => setFormData({ ...formData, expectedSalary: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>可工作时间</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="最早可以开始工作的时间"
          placeholderTextColor={colors.textDim}
          value={formData.availability}
          onChangeText={(text) => setFormData({ ...formData, availability: text })}
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

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>专业特长</Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="如：育婴、护理等专业特长"
          placeholderTextColor={colors.textDim}
          multiline
          numberOfLines={4}
          value={formData.specialties}
          onChangeText={(text) => setFormData({ ...formData, specialties: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>自我介绍</Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="请简单介绍一下自己"
          placeholderTextColor={colors.textDim}
          multiline
          numberOfLines={6}
          value={formData.introduction}
          onChangeText={(text) => setFormData({ ...formData, introduction: text })}
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: colors.primary }]}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>发布求职</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 24,
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
});