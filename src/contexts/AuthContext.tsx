import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, AuthUser, LoginCredentials } from '../services/authService';
import { message } from 'antd';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('=== INITIALIZING AUTH CONTEXT ===');
      
      try {
        const token = authService.getAuthToken();
        const user = authService.getCurrentUser();
        console.log('Found existing token:', !!token);
        console.log('Found existing user:', !!user);
        
        if (token && user) {
          console.log('Valid auth data found, setting user state');
          setUser(user);
        } else {
          console.log('No valid auth data found');
        }
        
      } catch (error) {
        console.error('Error during auth initialization:', error);
        authService.logout();
      } finally {
        console.log('Auth initialization complete, setting loading to false');
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Setup auto-refresh for tokens
    authService.setupAutoRefresh();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    console.log('AuthContext login called with:', { userId: credentials.userId });
    setIsLoading(true);
    try {
      const result = await authService.login(credentials);
      console.log('AuthContext received result from authService:', result);
      
      if (result.success) {
        console.log('AuthContext - Login successful, setting user:', result.user);
        setUser(result.user || null);
        message.success(result.message);
        return true;
      } else {
        console.log('AuthContext - Login failed:', result.message);
        message.error(result.message);
        return false;
      }
    } catch (error) {
      console.error('AuthContext - Login exception:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      message.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      message.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout API fails, clear local state
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = () => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && authService.isAuthenticated(),
    isLoading,
    login,
    logout,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};