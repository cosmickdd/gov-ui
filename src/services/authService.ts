// Base API URLs
const API_BASE_URL = 'https://blue-carbon-server-production.up.railway.app/api';

// Auth interfaces
export interface LoginCredentials {
  userId: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    user?: {
      id: string;
      userId: string;
      role?: string;
      name?: string;
      email?: string;
    };
    accessToken?: string;
    refreshToken?: string;
  };
  token?: string; // Fallback if token is at root level
}

export interface AuthUser {
  id: string;
  userId: string;
  role?: string;
  name?: string;
  email?: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'gov_auth_token';
  private readonly REFRESH_TOKEN_KEY = 'gov_refresh_token';
  private readonly USER_KEY = 'gov_user_data';

  // Login with userId and password
  async login(credentials: LoginCredentials): Promise<{ success: boolean; message: string; user?: AuthUser }> {
    try {
      console.log('=== LOGIN ATTEMPT START ===');
      console.log('Attempting login with:', { userId: credentials.userId });
      console.log('API URL:', `${API_BASE_URL}/gov/auth/login`);
      
      const startTime = Date.now();
      
      const response = await fetch(`${API_BASE_URL}/gov/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: credentials.userId,
          password: credentials.password,
        }),
      });

      const endTime = Date.now();
      console.log(`Login API call took: ${endTime - startTime}ms`);
      console.log('Login response status:', response.status);
      console.log('Login response ok:', response.ok);
      
      // Parse response regardless of status code to get error details
      const data = await response.json().catch(() => ({}));
      console.log('Login response data:', data);

      if (!response.ok) {
        console.log('LOGIN FAILED - Response not ok');
        throw new Error(data.message || `Login failed with status: ${response.status}`);
      }

      console.log('LOGIN SUCCESS - Response ok');
      
      // Handle successful response
      if (data.success !== false) {
        console.log('LOGIN SUCCESS - Data success check passed');
        
        // Extract token from various possible locations in response
        const token = data.token || data.data?.token || data.data?.accessToken || data.accessToken;
        const refreshToken = data.refreshToken || data.data?.refreshToken;
        const user = data.user || data.data?.user || {
          id: credentials.userId,
          userId: credentials.userId,
          role: 'admin',
          name: 'Government User'
        };

        console.log('Extracted token:', token ? 'Present' : 'Missing');
        console.log('Extracted user:', user);

        if (token) {
          console.log('LOGIN SUCCESS - Token found, storing auth data');
          
          // Store authentication data securely
          this.setToken(token);
          if (refreshToken) {
            this.setRefreshToken(refreshToken);
          }
          if (user) {
            this.setUser(user);
          }

          const result = {
            success: true,
            message: data.message || 'Login successful',
            user: user,
          };
          
          console.log('LOGIN SUCCESS - Returning result:', result);
          console.log('=== LOGIN ATTEMPT END - SUCCESS ===');
          
          return result;
        } else {
          console.log('LOGIN FAILED - No token found in response');
          throw new Error('No authentication token received from server');
        }
      } else {
        console.log('LOGIN FAILED - Data success was false');
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('LOGIN ERROR - Exception caught:', error);
      console.log('=== LOGIN ATTEMPT END - ERROR ===');
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed. Please try again.',
      };
    }
  }

  // Logout user
  async logout(): Promise<void> {
    console.log('=== LOGOUT CALLED ===');
    try {
      // Call logout API if available
      const token = this.getToken();
      if (token) {
        console.log('Calling logout API with token');
        await fetch(`${API_BASE_URL}/gov/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }).catch(() => {
          // Ignore logout API errors, still clear local storage
          console.log('Logout API call failed, continuing with local cleanup');
        });
      } else {
        console.log('No token found for logout API call');
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear local storage
      console.log('Clearing authentication data');
      this.clearAuthData();
      console.log('=== LOGOUT COMPLETE ===');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    console.log('=== CHECKING AUTHENTICATION ===');
    console.log('Token exists:', !!token);
    console.log('User exists:', !!user);
    console.log('Is authenticated:', !!(token && user));
    return !!(token && user);
  }

  // Get current user
  getCurrentUser(): AuthUser | null {
    return this.getUser();
  }

  // Get authentication token
  getAuthToken(): string | null {
    return this.getToken();
  }

  // Refresh authentication token
  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/gov/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data: LoginResponse = await response.json();
      const newToken = data.data?.token || data.data?.accessToken || data.token;

      if (newToken) {
        this.setToken(newToken);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearAuthData();
      return false;
    }
  }

  // Private methods for token management
  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private setUser(user: AuthUser): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private getUser(): AuthUser | null {
    try {
      const userData = localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Auto-refresh token before it expires
  setupAutoRefresh(): void {
    // Attempt to refresh token every 30 minutes
    setInterval(() => {
      if (this.isAuthenticated()) {
        this.refreshToken().catch(() => {
          // If refresh fails, user will be logged out on next API call
        });
      }
    }, 30 * 60 * 1000); // 30 minutes
  }
}

// Export singleton instance
export const authService = new AuthService();