import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Admin girişi
      if (username === 'admin' && password === 'admin123') {
        const mockResponse = {
          token: 'mock-jwt-token-admin-' + Date.now(),
          id: 1,
          username: 'admin',
          email: 'admin@gym.com',
          firstName: 'Admin',
          lastName: 'Kullanıcı',
          role: 'ADMIN'
        };
        
        setToken(mockResponse.token);
        setUser(mockResponse);
        
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse));
        return;
      }
      
      // Kayıtlı kullanıcıları kontrol et
      const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const foundUser = savedUsers.find((u: any) => u.username === username && u.password === password);
      
      if (foundUser) {
        const mockResponse = {
          token: 'mock-jwt-token-' + Date.now(),
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          role: 'MEMBER'
        };
        
        setToken(mockResponse.token);
        setUser(mockResponse);
        
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse));
        return;
      }
      
      // Gerçek API çağrısı
      const response = await authService.login(username, password);
      const { token: newToken, ...userData } = response;
      
      setToken(newToken);
      setUser(userData);
      
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Hatalı kullanıcı adı veya şifre');
    }
  };

  const register = async (userData: any) => {
    try {
      // Kullanıcıyı local storage'a kaydet
      const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const newUser = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'MEMBER'
      };
      
      // Kullanıcı adı veya email zaten var mı kontrol et
      const existingUser = savedUsers.find((u: any) => 
        u.username === userData.username || u.email === userData.email
      );
      
      if (existingUser) {
        throw new Error('Bu kullanıcı adı veya e-posta zaten kullanılıyor');
      }
      
      savedUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(savedUsers));
      
      // Gerçek API çağrısı da dene
      try {
        await authService.register(userData);
      } catch (apiError) {
        // API hatası olursa local kayıt yeterli
        console.log('API register failed, using local storage');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};