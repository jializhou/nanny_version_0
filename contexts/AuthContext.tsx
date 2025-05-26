import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

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

  // Load the user data
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        loadUserProfile(session);
      } else {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        loadUserProfile(session);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load user profile from Supabase
  const loadUserProfile = async (session: Session) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      if (profile) {
        setUser({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          profileImage: profile.profile_image || undefined,
          userType: profile.user_type,
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
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
      console.error('Error during login:', error);
      Alert.alert(t('auth.error'), t('auth.loginError'));
    } finally {
      setIsLoading(false);
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
      
      const { data: { user: authUser }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;
      if (!authUser) throw new Error('No user returned after signup');

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authUser.id,
          name,
          email,
          user_type: userType,
        });

      if (profileError) throw profileError;
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert(t('auth.error'), t('auth.registerError'));
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
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