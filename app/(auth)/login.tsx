import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = t('auth.emailRequired');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('auth.emailInvalid');
      isValid = false;
    }

    if (!password) {
      newErrors.password = t('auth.passwordRequired');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [email, password, t]);

  const handleLogin = useCallback(() => {
    if (validateForm()) {
      login(email, password);
    }
  }, [validateForm, login, email, password]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.languageToggleContainer}>
          <LanguageToggle />
        </View>

        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('auth.welcome')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textDim }]}>
            {t('auth.loginSubtitle')}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t('auth.email')}
            </Text>
            <View
              style={[
                styles.inputContainer,
                { backgroundColor: colors.card, borderColor: errors.email ? colors.error : 'transparent' }
              ]}
            >
              <Mail size={20} color={colors.textDim} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder={t('auth.emailPlaceholder')}
                placeholderTextColor={colors.textDim}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email ? (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.email}
              </Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t('auth.password')}
            </Text>
            <View
              style={[
                styles.inputContainer,
                { backgroundColor: colors.card, borderColor: errors.password ? colors.error : 'transparent' }
              ]}
            >
              <Lock size={20} color={colors.textDim} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder={t('auth.passwordPlaceholder')}
                placeholderTextColor={colors.textDim}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color={colors.textDim} />
                ) : (
                  <Eye size={20} color={colors.textDim} />
                )}
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.password}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
              {t('auth.forgotPassword')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.primary }]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              {t('auth.login')}
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={[styles.registerText, { color: colors.textDim }]}>
              {t('auth.noAccount')}
            </Text>
            <Link href="/register" style={[styles.registerLink, { color: colors.primary }]}>
              <Text>{t('auth.register')}</Text>
            </Link>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textDim }]}>
            {t('auth.termsNotice')}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  languageToggleContainer: {
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  formContainer: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  loginButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  registerLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
    textDecooration: Platform.OS === 'web' ? 'none' : undefined,
  },
  footer: {
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});