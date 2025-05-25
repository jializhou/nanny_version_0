import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Platform
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { 
  User, 
  Settings, 
  Heart, 
  Star, 
  LogOut, 
  CreditCard as Edit2, 
  Shield,
  Briefcase,
  Search
} from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const [notifications, setNotifications] = useState(true);
  
  const handleLogout = () => {
    Alert.alert(
      t('profile.logoutTitle'),
      t('profile.logoutMessage'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.logout'),
          onPress: () => logout(),
          style: 'destructive',
        },
      ]
    );
  };

  const handlePostJob = () => {
    router.push('/profile/post-job');
  };

  const handleFindWork = () => {
    router.push('/profile/find-work');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image 
            source={{ 
              uri: user?.profileImage || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' 
            }} 
            style={styles.profileImage} 
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.name, { color: colors.text }]}>
              {user?.name || '游客'}
            </Text>
            <Text style={[styles.email, { color: colors.textDim }]}>
              {user?.email || '未登录'}
            </Text>
          </View>
        </View>
        <TouchableOpacity 
          style={[styles.editButton, { backgroundColor: colors.primary }]}
        >
          <Edit2 size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          招聘/求职
        </Text>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: colors.card }]}
          onPress={handlePostJob}
        >
          <Briefcase size={20} color={colors.primary} />
          <Text style={[styles.menuText, { color: colors.text }]}>
            招聘阿姨
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: colors.card }]}
          onPress={handleFindWork}
        >
          <Search size={20} color={colors.primary} />
          <Text style={[styles.menuText, { color: colors.text }]}>
            阿姨求职
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('profile.account')}
        </Text>
        
        <View style={[styles.menuItem, { backgroundColor: colors.card }]}>
          <User size={20} color={colors.primary} />
          <Text style={[styles.menuText, { color: colors.text }]}>
            {t('profile.personalInfo')}
          </Text>
        </View>
        
        <View style={[styles.menuItem, { backgroundColor: colors.card }]}>
          <Settings size={20} color={colors.primary} />
          <Text style={[styles.menuText, { color: colors.text }]}>
            {t('profile.preferences')}
          </Text>
        </View>
        
        <View style={[styles.menuItemSwitch, { backgroundColor: colors.card }]}>
          <View style={styles.menuItemLeft}>
            <Shield size={20} color={colors.primary} />
            <Text style={[styles.menuText, { color: colors.text }]}>
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
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('profile.activity')}
        </Text>
        
        <View style={[styles.menuItem, { backgroundColor: colors.card }]}>
          <Heart size={20} color={colors.accent} />
          <Text style={[styles.menuText, { color: colors.text }]}>
            {t('profile.favorites')}
          </Text>
        </View>
        
        <View style={[styles.menuItem, { backgroundColor: colors.card }]}>
          <Star size={20} color="#FFD700" />
          <Text style={[styles.menuText, { color: colors.text }]}>
            {t('profile.reviews')}
          </Text>
        </View>
      </View>

      <View style={styles.languageSection}>
        <Text style={[styles.languageLabel, { color: colors.text }]}>
          {t('profile.language')}:
        </Text>
        <LanguageToggle />
      </View>

      <TouchableOpacity 
        style={[styles.logoutButton, { borderColor: colors.error }]}
        onPress={handleLogout}
      >
        <LogOut size={20} color={colors.error} />
        <Text style={[styles.logoutText, { color: colors.error }]}>
          {t('profile.logout')}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.version, { color: colors.textDim }]}>
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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  languageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  languageLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});