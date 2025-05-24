import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export default function LanguageToggle() {
  const colorScheme = useColorScheme();
  const { i18n } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  
  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <TouchableOpacity 
      onPress={toggleLanguage}
      style={[styles.container, { backgroundColor: colors.primaryLight }]}
    >
      <Text style={[styles.text, { color: colors.primary }]}>
        {i18n.language === 'en' ? '中文' : 'English'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});