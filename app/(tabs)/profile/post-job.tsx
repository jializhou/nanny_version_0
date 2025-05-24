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

export default function PostJobScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];

  const [formData, setFormData] = useState({
    familySize: '',
    childrenAges: '',
    location: '',
    startDate: '',
    schedule: '',
    duties: '',
    requirements: '',
    salary: '',
    accommodation: false,
    mealProvided: false,
    languages: '',
    additionalInfo: ''
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
      <Text style={[styles.title, { color: colors.text }]}>发布招聘信息</Text>
      
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>家庭成员</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="请输入家庭成员数量和构成"
          placeholderTextColor={colors.textDim}
          value={formData.familySize}
          onChangeText={(text) => setFormData({ ...formData, familySize: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>孩子年龄</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="请输入需要照顾的孩子年龄"
          placeholderTextColor={colors.textDim}
          value={formData.childrenAges}
          onChangeText={(text) => setFormData({ ...formData, childrenAges: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>工作地点</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="请输入详细地址"
          placeholderTextColor={colors.textDim}
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>开始时间</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="期望开始工作的时间"
          placeholderTextColor={colors.textDim}
          value={formData.startDate}
          onChangeText={(text) => setFormData({ ...formData, startDate: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>工作时间</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="工作时间安排，如：周一至周五 9:00-18:00"
          placeholderTextColor={colors.textDim}
          value={formData.schedule}
          onChangeText={(text) => setFormData({ ...formData, schedule: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>工作内容</Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="详细描述工作职责"
          placeholderTextColor={colors.textDim}
          multiline
          numberOfLines={4}
          value={formData.duties}
          onChangeText={(text) => setFormData({ ...formData, duties: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>要求</Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="对阿姨的具体要求"
          placeholderTextColor={colors.textDim}
          multiline
          numberOfLines={4}
          value={formData.requirements}
          onChangeText={(text) => setFormData({ ...formData, requirements: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>薪资待遇</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="月薪范围，如：8000-10000元/月"
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

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>语言要求</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="语言要求，如：普通话流利"
          placeholderTextColor={colors.textDim}
          value={formData.languages}
          onChangeText={(text) => setFormData({ ...formData, languages: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>补充说明</Text>
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

      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: colors.primary }]}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>发布招聘</Text>
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