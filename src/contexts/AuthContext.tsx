
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types/customer';
import { getUsers, saveUsers, getCurrentUser, setCurrentUser } from '../utils/localStorage';
import { validateEmail } from '../utils/validation';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      setCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    if (!validateEmail(email)) {
      return false;
    }

    const users = getUsers();
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      id: `USER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email,
      password,
      name,
      createdAt: new Date(),
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    setUser(newUser);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
  };

  const resetPassword = async (email: string, newPassword: string): Promise<boolean> => {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
      return false;
    }

    users[userIndex].password = newPassword;
    saveUsers(users);
    
    if (user && user.email === email) {
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      setCurrentUser(updatedUser);
    }
    
    return true;
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex === -1) {
      return false;
    }

    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;
    saveUsers(users);
    setUser(updatedUser);
    setCurrentUser(updatedUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      resetPassword,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
