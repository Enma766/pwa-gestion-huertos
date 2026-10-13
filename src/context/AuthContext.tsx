import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'huerto_pwa_registered_users';
const CURRENT_USER_KEY = 'huerto_pwa_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedSession = localStorage.getItem(CURRENT_USER_KEY);
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
  }, []);

  const register = (username: string, email: string, password: string): boolean => {
    const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const users = rawUsers ? JSON.parse(rawUsers) : [];

    // Validar si el correo ya existe
    if (users.some((u: { email: string }) => u.email.toLowerCase() === email.toLowerCase())) {
      return false;
    }

    const newUser: User = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      avatarUrl: ''
    };

    // Guardar usuario junto con su contraseña simulada en la lista local
    users.push({ ...newUser, password });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    // Iniciar sesión automáticamente
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const users = rawUsers ? JSON.parse(rawUsers) : [];

    const found = users.find(
      (u: { email: string; password: string }) =>
        u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (found) {
      const sessionUser: User = {
        id: found.id,
        username: found.username,
        email: found.email,
        avatarUrl: found.avatarUrl || ''
      };
      setUser(sessionUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));

    // Actualizar también en la lista de registrados
    const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (rawUsers) {
      const users = JSON.parse(rawUsers);
      const index = users.findIndex((u: User) => u.id === user.id);
      if (index !== -1) {
        users[index] = { ...users[index], ...updatedData };
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};