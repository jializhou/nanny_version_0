import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// User type definition
interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  userType: 'employer' | 'caregiver';
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string, userType: 'employer' | 'caregiver') => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USER_STORAGE_KEY = '@auth_user';
const SESSION_TIMESTAMP_KEY = '@auth_session_timestamp';

// Session duration in milliseconds (12 hours)
const SESSION_DURATION = 12 * 60 * 60 * 1000;

// List of routes that don't require authentication
const publicRoutes = ['/', '/browse'];

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

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

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Load the persisted user data
  useEffect(() => {
    const loadUser = async () => {
      if (!isMounted) return;

      try {
        const sessionValid = await isSessionValid();
        if (!sessionValid) {
          await AsyncStorage.multiRemove([USER_STORAGE_KEY, SESSION_TIMESTAMP_KEY]);
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
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadUser();
  }, [isMounted]);

  // Handle routing based on auth state
  useEffect(() => {
    if (!isMounted || isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup && !isPublicRoute()) {
      router.replace('/login');
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, segments, isLoading, isMounted]);

  // Login function
  const login = async (email: string, password: string) => {
    if (!isMounted) return;

    try {
      setIsLoading(true);
      
      // Mock API call - In a real app, this would call your authentication API
      const mockUser: User = {
        id: '1',
        name: 'Sarah Johnson',
        email: email,
        profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        userType: 'employer',
      };
      
      // Store user data and session timestamp
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      await updateSessionTimestamp();
      
      if (isMounted) {
        setUser(mockUser);
        setIsLoading(false);
      }
    } catch (error) {
      if (isMounted) {
        setIsLoading(false);
        Alert.alert(t('auth.error'), t('auth.loginError'));
      }
    }
  };

  // Register function
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    userType: 'employer' | 'caregiver'
  ) => {
    if (!isMounted) return;

    try {
      setIsLoading(true);
      
      // Mock API call - In a real app, this would call your registration API
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        userType: userType,
      };
      
      // Store user data and session timestamp
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      await updateSessionTimestamp();
      
      if (isMounted) {
        setUser(mockUser);
        setIsLoading(false);
      }
    } catch (error) {
      if (isMounted) {
        setIsLoading(false);
        Alert.alert(t('auth.error'), t('auth.registerError'));
      }
    }
  };

  // Logout function
  const logout = async () => {
    if (!isMounted) return;

    try {
      await AsyncStorage.multiRemove([USER_STORAGE_KEY, SESSION_TIMESTAMP_KEY]);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
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