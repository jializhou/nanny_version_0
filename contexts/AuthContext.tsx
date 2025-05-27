import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useTranslation } from 'react-i18next';
import supabase from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

// User type definition
interface Profile {
  id: string;
  name: string;
  email: string;
  profile_image?: string;
  user_type: 'employer' | 'caregiver';
}

// Auth context interface
interface AuthContextType {
  user: Profile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, userType: 'employer' | 'caregiver') => Promise<void>;
  logout: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of routes that don't require authentication
const publicRoutes = ['/', '/browse'];

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();
  const { t } = useTranslation();

  // Check if the current route is public
  const isPublicRoute = () => {
    const path = '/' + segments.join('/');
    return publicRoutes.includes(path);
  };

  useEffect(() => {
    // Set up Supabase auth state listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchProfile(session.user);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchProfile(session.user);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile from Supabase
  const fetchProfile = async (authUser: User) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) throw error;

      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle routing based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup && !isPublicRoute()) {
      // Redirect to login if not authenticated and not on a public or auth route
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
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
    userType: 'employer' | 'caregiver'
  ) => {
    try {
      setIsLoading(true);
      
      // Sign up the user
      const { data: { user: newUser }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;
      if (!newUser) throw new Error('User creation failed');

      // Create the user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: newUser.id,
            name,
            email,
            user_type: userType,
          }
        ]);

      if (profileError) throw profileError;
    } catch (error) {
      setIsLoading(false);
      Alert.alert(t('auth.error'), t('auth.registerError'));
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
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