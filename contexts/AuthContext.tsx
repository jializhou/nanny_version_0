import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// User type definition
interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  profileImage?: string;
  userType?: 'employer' | 'caregiver';
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  register: (name: string, email: string, password: string, userType: 'employer' | 'caregiver') => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USER_STORAGE_KEY = '@auth_user';
const TOKEN_STORAGE_KEY = '@auth_token';
const SESSION_TIMESTAMP_KEY = '@auth_session_timestamp';

// Session duration in milliseconds (12 hours)
const SESSION_DURATION = 12 * 60 * 60 * 1000;

// List of routes that don't require authentication
const publicRoutes = ['/', '/browse', '/login', '/register'];

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();
  const { t } = useTranslation();

  // Check if the current route is public
  const isPublicRoute = () => {
    const path = '/' + segments.join('/');
    return publicRoutes.includes(path);
  };

  // Check if the session is still valid
  const isSessionValid = async () => {
    try {
      const timestamp = await AsyncStorage.getItem(SESSION_TIMESTAMP_KEY);
      if (!timestamp) return false;

      const lastActivity = parseInt(timestamp, 10);
      const now = Date.now();
      return now - lastActivity < SESSION_DURATION;
    } catch (error) {
      console.error('Error checking session validity:', error);
      return false;
    }
  };

  // Update the session timestamp
  const updateSessionTimestamp = async () => {
    try {
      await AsyncStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error('Error updating session timestamp:', error);
    }
  };

  // Load the persisted user data
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const sessionValid = await isSessionValid();
        if (!sessionValid) {
          await AsyncStorage.multiRemove([USER_STORAGE_KEY, TOKEN_STORAGE_KEY, SESSION_TIMESTAMP_KEY]);
          setUser(null);
          setIsLoading(false);
          return;
        }

        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          updateSessionTimestamp();
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Handle routing based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup && !isPublicRoute()) {
      // Redirect to login if not authenticated and not on a public or auth route
      router.replace('/login');
    } else if (user && inAuthGroup) {
      // Redirect to home if authenticated but still on an auth screen
      router.replace('/(tabs)');
    }
  }, [user, segments, isLoading]);

  // Login function
  const login = async (token: string, userData: User) => {
    try {
      // Store user data, token and session timestamp
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
      await updateSessionTimestamp();
      
      setUser(userData);
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('登录失败', '请稍后重试');
    }
  };

  // Register function
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    userType: 'employer' | 'caregiver'
  ) => {
    try {
      setIsLoading(true);
      
      // Mock API call - In a real app, this would call your registration API
      setTimeout(async () => {
        // Mock successful registration and login
        const mockUser: User = {
          id: '1',
          name: name,
          email: email,
          profileImage: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg',
          userType: userType,
        };
        
        const mockToken = 'mock_token_' + Date.now();
        
        // Store user data and session timestamp
        await login(mockToken, mockUser);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(t('auth.error'), t('auth.registerError'));
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // 清除存储
      await AsyncStorage.multiRemove([
        USER_STORAGE_KEY,
        TOKEN_STORAGE_KEY,
        SESSION_TIMESTAMP_KEY
      ]);

      // 清除用户状态
      setUser(null);
      
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error; // 抛出错误让调用者处理
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}