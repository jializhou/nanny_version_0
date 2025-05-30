import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Switch,
  Alert,
  Pressable
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Briefcase, Search, User, Settings, Shield, Heart, Star, LogOut } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import LanguageToggle from '@/components/LanguageToggle';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, logout } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    Alert.alert('测试', '退出按钮被点击了');
    if (logout) {
      logout();
      router.replace('/(auth)/login');
    } else {
      Alert.alert('错误', 'logout 函数未定义');
    }
  };

  const handlePostJob = () => {
    router.push('/(forms)/post-job');
  };

  const handleFindWork = () => {
    router.push('/(forms)/find-work');
  };

  const handleFavorites = () => {
    router.push('/(user)/favorites');
  };

  const handleReviews = () => {
    router.push('/(user)/reviews');
  };

  if (!user) {
    return (
      <ScrollView 
        style={{ ...styles.container, backgroundColor: colors.background }}
        contentContainerStyle={styles.guestContent}
      >
        <View style={styles.guestHeader}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg' }}
            style={styles.guestAvatar}
          />
          <Text style={{ ...styles.guestTitle, color: colors.text }}>
            {t('profile.welcome')}
          </Text>
          <Text style={{ ...styles.guestSubtitle, color: colors.textDim }}>
            {t('profile.guestMessage')}
          </Text>
        </View>

        <View style={styles.guestActions}>
          <TouchableOpacity
            style={{ ...styles.loginButton, backgroundColor: colors.primary }}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              {t('auth.login')}
            </Text>
          </TouchableOpacity>

          <Link href="/register" asChild>
            <TouchableOpacity
              style={{ ...styles.registerButton, borderColor: colors.primary }}
            >
              <Text style={{ ...styles.registerButtonText, color: colors.primary }}>
                {t('auth.register')}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.languageSection}>
          <Text style={{ ...styles.languageLabel, color: colors.text }}>
            {t('profile.language')}:
          </Text>
          <LanguageToggle />
        </View>

        <Text style={{ ...styles.version, color: colors.textDim }}>
          {t('profile.version')} 1.0.0
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView 
      style={{ ...styles.container, backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image 
            source={{ 
              uri: user.profileImage || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' 
            }} 
            style={styles.profileImage} 
          />
          <View style={styles.profileInfo}>
            <Text style={{ ...styles.name, color: colors.text }}>
              {user.name}
            </Text>
            <Text style={{ ...styles.email, color: colors.textDim }}>
              {user.email}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={{ ...styles.sectionTitle, color: colors.text }}>
          {t('profile.account')}
        </Text>
        
        <TouchableOpacity 
          style={{ ...styles.menuItem, backgroundColor: colors.card }}
          onPress={() => {
            // @ts-ignore
            router.push('/(user)/personal-info');
          }}
        >
          <User size={20} color={colors.primary} />
          <Text style={{ ...styles.menuText, color: colors.text }}>
            {t('profile.personalInfo')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{ ...styles.menuItem, backgroundColor: colors.card }}
          onPress={() => router.push('/(user)/payment-methods' as any)}
        >
          <Settings size={20} color={colors.primary} />
          <Text style={{ ...styles.menuText, color: colors.text }}>
            支付方式
          </Text>
        </TouchableOpacity>
        
        <View style={{ ...styles.menuItemSwitch, backgroundColor: colors.card }}>
          <View style={styles.menuItemLeft}>
            <Shield size={20} color={colors.primary} />
            <Text style={{ ...styles.menuText, color: colors.text }}>
              {t('profile.notifications')}
            </Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#d1d1d1', true: colors.primaryLight }}
            thumbColor={notifications ? colors.primary : '#f4f3f4'}
            ios_backgroundColor="#d1d1d1"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={{ ...styles.sectionTitle, color: colors.text }}>
          {t('profile.activity')}
        </Text>

        <TouchableOpacity 
          style={{ ...styles.menuItem, backgroundColor: colors.card }}
          onPress={handlePostJob}
        >
          <Briefcase size={20} color={colors.primary} />
          <Text style={{ ...styles.menuText, color: colors.text }}>
            招聘阿姨
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{ ...styles.menuItem, backgroundColor: colors.card }}
          onPress={handleFindWork}
        >
          <Search size={20} color={colors.primary} />
          <Text style={{ ...styles.menuText, color: colors.text }}>
            阿姨求职
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{ ...styles.menuItem, backgroundColor: colors.card }}
          onPress={handleFavorites}
        >
          <Heart size={20} color={colors.accent} />
          <Text style={{ ...styles.menuText, color: colors.text }}>
            {t('profile.favorites')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{ ...styles.menuItem, backgroundColor: colors.card }}
          onPress={handleReviews}
        >
          <Star size={20} color="#FFD700" />
          <Text style={{ ...styles.menuText, color: colors.text }}>
            {t('profile.reviews')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.languageSection}>
        <Text style={{ ...styles.languageLabel, color: colors.text }}>
          {t('profile.language')}:
        </Text>
        <LanguageToggle />
      </View>

      {user && (
        <Pressable 
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logoutButton,
            {
              backgroundColor: pressed ? colors.error : 'transparent',
              borderColor: colors.error,
            }
          ]}
        >
          <Text style={[styles.logoutText, { color: colors.error }]}>
            退出登录
          </Text>
        </Pressable>
      )}

      <Text style={{ ...styles.version, color: colors.textDim }}>
        {t('profile.version')} 1.0.0
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
  guestContent: {
    padding: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  guestHeader: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  guestAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  guestTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  guestSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  guestActions: {
    width: '100%',
    paddingHorizontal: 32,
    marginBottom: 40,
  },
  loginButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  registerButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  registerButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: Platform.OS === 'ios' ? 8 : 0,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 12,
  },
  languageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  languageLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginRight: 12,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  logoutButton: {
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});