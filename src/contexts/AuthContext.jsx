import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const STORAGE_USER = "caminho-reino-user";
const STORAGE_USERS = "caminho-reino-users"; // Armazena todos os usuários cadastrados

// Carregar usuário atual logado
const loadUser = () => {
  try {
    const stored = localStorage.getItem(STORAGE_USER);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch {
    return null;
  }
};

// Carregar todos os usuários registrados
const loadAllUsers = () => {
  try {
    const stored = localStorage.getItem(STORAGE_USERS);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  } catch {
    return [];
  }
};

// Salvar usuário atual logado
const saveUser = (user) => {
  localStorage.setItem(STORAGE_USER, JSON.stringify(user));
};

// Salvar usuário no banco de dados
const saveUserToDatabase = (user) => {
  const allUsers = loadAllUsers();
  const existingIndex = allUsers.findIndex(u => u.email === user.email);
  
  if (existingIndex >= 0) {
    allUsers[existingIndex] = user;
  } else {
    allUsers.push(user);
  }
  
  localStorage.setItem(STORAGE_USERS, JSON.stringify(allUsers));
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = loadUser();
    if (storedUser) {
      setUser(storedUser);
      setProgress(storedUser.progress || null);
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    try {
      setError(null);
      
      // Validações
      if (!name || !email || !password) {
        setError('Preencha todos os campos');
        return { success: false };
      }
      
      if (password.length < 6) {
        setError('Senha deve ter pelo menos 6 caracteres');
        return { success: false };
      }
      
      // Verificar se email já existe
      const allUsers = loadAllUsers();
      if (allUsers.some(u => u.email === email)) {
        setError('Email já cadastrado');
        return { success: false };
      }
      
      // Criar novo usuário
      const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: btoa(password), // Codificar senha (não é seguro, apenas para demo)
        isAnonymous: false,
        createdAt: new Date().toISOString(),
        progress: {
          quests_completed: 0,
          badges: 0,
          study_time: 0,
          points: 0
        }
      };
      
      // Salvar no banco de dados e fazer login
      saveUserToDatabase(newUser);
      saveUser(newUser);
      setUser(newUser);
      setProgress(newUser.progress);
      
      return { success: true, user: newUser };
    } catch (err) {
      setError(err.message);
      return { success: false };
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      
      if (!email || !password) {
        setError('Preencha email e senha');
        return { success: false };
      }
      
      // Buscar usuário no banco de dados
      const allUsers = loadAllUsers();
      const foundUser = allUsers.find(u => u.email === email);
      
      if (!foundUser) {
        setError('Email não encontrado');
        return { success: false };
      }
      
      // Verificar senha
      const decodedPassword = atob(foundUser.password);
      if (decodedPassword !== password) {
        setError('Senha incorreta');
        return { success: false };
      }
      
      // Fazer login
      saveUser(foundUser);
      setUser(foundUser);
      setProgress(foundUser.progress || null);
      
      return { success: true, user: foundUser };
    } catch (err) {
      setError(err.message);
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_USER);
    setUser(null);
    setProgress(null);
    setError(null);
  };

  const updateProgress = (newProgress) => {
    if (user) {
      const updated = { ...user, progress: newProgress };
      setUser(updated);
      setProgress(newProgress);
      saveUser(updated);
      saveUserToDatabase(updated);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      progress,
      loading,
      error,
      register,
      login,
      logout,
      updateProgress,
      isAuthenticated: !!user && !user.isAnonymous
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
