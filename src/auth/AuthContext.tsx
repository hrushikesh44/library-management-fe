import { createContext, useContext, useState } from 'react';
import type { AuthContextType, User } from './auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if(!ctx){
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return ctx
}