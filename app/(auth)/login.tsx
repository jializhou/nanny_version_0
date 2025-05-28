import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { Phone, Lock, Eye, EyeOff } from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import LanguageToggle from '@/components/LanguageToggle';
import { sendVerificationCode, verifyCodeAndLogin, loginWithWechat } from '@/services/auth';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { login } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ phone: '', code: '', password: '' });
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { phone: '', code: '', password: '' };

    if (!phoneNumber) {
      newErrors.phone = '请输入手机号';
      isValid = false;
    } else if (!/^1[3-9]\d{9}$/.test(phoneNumber)) {
      newErrors.phone = '请输入有效的手机号';
      isValid = false;
    }

    if (isCodeSent && !verificationCode) {
      newErrors.code = '请输入验证码';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSendCode = async () => {
    if (phoneNumber && /^1[3-9]\d{9}$/.test(phoneNumber)) {
      setIsLoading(true);
      try {
        const success = await sendVerificationCode(phoneNumber);
        if (success) {
          setIsCodeSent(true);
          setCountdown(60);
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          Alert.alert('发送失败', '请稍后重试');
        }
      } catch (error) {
        Alert.alert('发送失败', '请稍后重试');
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(prev => ({ ...prev, phone: '请输入有效的手机号' }));
    }
  };

  const handlePhoneLogin = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await verifyCodeAndLogin(phoneNumber, verificationCode);
        if (response) {
          // 登录成功，更新认证状态
          login(response.token, response.user);
          // 导航到主页
          router.replace('/(tabs)');
        } else {
          Alert.alert('登录失败', '验证码错误或已过期');
        }
      } catch (error) {
        Alert.alert('登录失败', '请稍后重试');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleWechatLogin = async () => {
    setIsLoading(true);
    try {
      const response = await loginWithWechat();
      if (response) {
        // 登录成功，更新认证状态
        login(response.token, response.user);
        // 导航到主页
        router.replace('/(tabs)');
      } else {
        Alert.alert('微信登录', '微信登录功能开发中');
      }
    } catch (error) {
      Alert.alert('登录失败', '请稍后重试');
    } finally {
      setIsLoading(false);
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
        <View style={styles.languageToggleContainer}>
          <LanguageToggle />
        </View>

        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            欢迎回来
          </Text>
          <Text style={[styles.subtitle, { color: colors.textDim }]}>
            请登录您的账号
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              手机号
            </Text>
            <View
              style={[
                styles.inputContainer,
                { backgroundColor: colors.card, borderColor: errors.phone ? colors.error : 'transparent' }
              ]}
            >
              <Phone size={20} color={colors.textDim} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="请输入手机号"
                placeholderTextColor={colors.textDim}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={11}
              />
            </View>
            {errors.phone ? (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.phone}
              </Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              验证码
            </Text>
            <View style={styles.codeContainer}>
              <View
                style={[
                  styles.codeInputContainer,
                  { backgroundColor: colors.card, borderColor: errors.code ? colors.error : 'transparent' }
                ]}
              >
                <TextInput
                  style={[styles.codeInput, { color: colors.text }]}
                  placeholder="请输入验证码"
                  placeholderTextColor={colors.textDim}
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.sendCodeButton,
                  { backgroundColor: countdown > 0 ? colors.textDim : colors.primary }
                ]}
                onPress={handleSendCode}
                disabled={countdown > 0}
              >
                <Text style={styles.sendCodeText}>
                  {countdown > 0 ? `${countdown}秒后重发` : '发送验证码'}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.code ? (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.code}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.primary }]}
            onPress={handlePhoneLogin}
          >
            <Text style={styles.loginButtonText}>
              登录
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.textDim }]} />
            <Text style={[styles.dividerText, { color: colors.textDim }]}>或</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.textDim }]} />
          </View>

          <TouchableOpacity
            style={[styles.wechatButton, { backgroundColor: '#07C160' }]}
            onPress={handleWechatLogin}
          >
            <Text style={styles.wechatButtonText}>
              微信登录
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={[styles.registerText, { color: colors.textDim }]}>
              还没有账号？
            </Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text style={[styles.registerLink, { color: colors.primary }]}>
                  立即注册
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textDim }]}>
            登录即表示同意《用户协议》和《隐私政策》
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
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  codeInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  codeInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  sendCodeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendCodeText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  loginButton: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  wechatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  wechatButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  registerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  registerLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  footer: {
    marginTop: 40,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});