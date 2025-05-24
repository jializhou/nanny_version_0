import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useTranslation } from 'react-i18next';

// User type definition
interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  userType: 'parent' | 'caregiver';
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string, userType: 'parent' | 'caregiver') => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();
  const { t } = useTranslation();

  // Check if the user is authenticated
  useEffect(() => {
    // This would typically check a token or some form of persistent storage
    // Here we're just simulating with a setTimeout
    const checkAuth = async () => {
      try {
        // Simulate a check for stored credentials
        setIsLoading(true);
        setTimeout(() => {
          // No stored user for demo purposes
          setUser(null);
          setIsLoading(false);
        }, 1000);
      } catch (e) {
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle routing based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Redirect to login if not authenticated and not already on an auth screen
      router.replace('/login');
    } else if (user && inAuthGroup) {
      // Redirect to home if authenticated but still on an auth screen
      router.replace('/');
    }
  }, [user, segments, isLoading]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Mock API call - In a real app, this would call your authentication API
      setTimeout(() => {
        // Mock successful login
        const mockUser: User = {
          id: '1',
          name: 'Sarah Johnson',
          email: email,
          profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
          userType: 'parent',
        };
        
        setUser(mockUser);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(t('auth.error'), t('auth.loginError'));
    }
  };

  // Register function
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    userType: 'parent' | 'caregiver'
  ) => {
    try {
      setIsLoading(true);
      
      // Mock API call - In a real app, this would call your registration API
      setTimeout(() => {
        // Mock successful registration and login
        const mockUser: User = {
          id: '1',
          name: name,
          email: email,
          profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
          userType: userType,
        };
        
        setUser(mockUser);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(t('auth.error'), t('auth.registerError'));
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
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