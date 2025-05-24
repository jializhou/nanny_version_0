import { useState } from 'react';
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
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'carereceiver' | 'caregiver'>('carereceiver');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!name) {
      newErrors.name = t('auth.nameRequired');
      isValid = false;
    }

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
    } else if (password.length < 6) {
      newErrors.password = t('auth.passwordLength');
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t('auth.passwordMatch');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      register(name, email, password, userType);
    }
  };

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
        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('auth.createAccount')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textDim }]}>
            {t('auth.registerSubtitle')}
          </Text>
        </View>

        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'carereceiver' && { 
                backgroundColor: colors.primaryLight,
                borderColor: colors.primary,
              },
              userType !== 'carereceiver' && { 
                backgroundColor: colors.card,
                borderColor: 'transparent',
              }
            ]}
            onPress={() => setUserType('carereceiver')}
          >
            <Text
              style={[
                styles.userTypeText,
                { color: userType === 'carereceiver' ? colors.primary : colors.textDim }
              ]}
            >
              {t('auth.carereceiver')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'caregiver' && { 
                backgroundColor: colors.primaryLight,
                borderColor: colors.primary,
              },
              userType !== 'caregiver' && { 
                backgroundColor: colors.card,
                borderColor: 'transparent', 
              }
            ]}
            onPress={() => setUserType('caregiver')}
          >
            <Text
              style={[
                styles.userTypeText,
                { color: userType === 'caregiver' ? colors.primary : colors.textDim }
              ]}
            >
              {t('auth.caregiver')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t('auth.name')}
            </Text>
            <View
              style={[
                styles.inputContainer,
                { backgroundColor: colors.card, borderColor: errors.name ? colors.error : 'transparent' }
              ]}
            >
              <User size={20} color={colors.textDim} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder={t('auth.namePlaceholder')}
                placeholderTextColor={colors.textDim}
                value={name}
                onChangeText={setName}
              />
            </View>
            {errors.name ? (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.name}
              </Text>
            ) : null}
          </View>

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

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t('auth.confirmPassword')}
            </Text>
            <View
              style={[
                styles.inputContainer,
                { backgroundColor: colors.card, borderColor: errors.confirmPassword ? colors.error : 'transparent' }
              ]}
            >
              <Lock size={20} color={colors.textDim} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder={t('auth.confirmPasswordPlaceholder')}
                placeholderTextColor={colors.textDim}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff size={20} color={colors.textDim} />
                ) : (
                  <Eye size={20} color={colors.textDim} />
                )}
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.confirmPassword}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: colors.primary }]}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>
              {t('auth.createAccount')}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.textDim }]}>
              {t('auth.haveAccount')}
            </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={[styles.loginLink, { color: colors.primary }]}>
                  {t('auth.login')}
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textDim }]}>
            {t('auth.termsAgreement')}
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
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 24,
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
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
  },
  userTypeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
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
  registerButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
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