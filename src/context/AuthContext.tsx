import { createContext, useContext, useState,type ReactNode } from 'react';



interface AuthContextType {
  name: string| null;
  token: string | null;
  login: (name: string | null, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  const login = (name: string | null, token: string) => {
    setName(name);
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setName(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ name, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — use this anywhere to get auth state
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};