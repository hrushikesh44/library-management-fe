// import { createContext, useContext, useEffect, useState } from 'react';
// import { parseJwt } from '../services/jwtParser';

// type Role = 'admin' | 'librarian' | 'user';

// interface AuthState {
//   token: string | null;
//   roles: Role[];
//   isAuthenticated: boolean;
//   login: (token: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthState | null>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [auth, setAuth] = useState<Omit<AuthState, 'login' | 'logout'>>({
//     token: null,
//     roles: [],
//     isAuthenticated: false,
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('Authorization');
//     if (!token) return;

//     const payload = parseJwt(token.replace('Bearer ', ''));

//     setAuth({
//       token,
//       roles: payload.roles ?? [],
//       isAuthenticated: true,
//     });
//   }, []);

//   const login = (token: string) => {
//     localStorage.setItem('Authorization', token);

//     const payload = parseJwt(token.replace('Bearer ', ''));

//     setAuth({
//       token,
//       roles: payload.roles ?? [],
//       isAuthenticated: true,
//     });
//   };

//   const logout = () => {
//     localStorage.removeItem('Authorization');
//     setAuth({
//       token: null,
//       roles: [],
//       isAuthenticated: false,
//     });
//   };

//   return (
//     <AuthContext.Provider value={{ ...auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
//   return ctx;
// };


import { createContext, useContext, useState } from 'react';
import { parseJwt } from '../services/jwtParser';

export type Role = 'admin' | 'librarian' | 'user';

interface AuthState {
  token: string | null;
  roles: Role[];
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Omit<AuthState, 'login' | 'logout'>>(() => {
    const stored = localStorage.getItem('Authorization');
    if (!stored) {
      return {
        token: null,
        roles: [],
        isAuthenticated: false,
      };
    }

    const token = stored.replace('Bearer ', '');
    const payload = parseJwt(token);

    return {
      token,
      roles: (payload.roles ?? []) as Role[],
      isAuthenticated: true,
    };
  });

  const login = (token: string) => {
    localStorage.setItem('Authorization', `Bearer ${token}`);

    const payload = parseJwt(token);

    setAuth({
      token,
      roles: (payload.roles ?? []) as Role[],
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('Authorization');

    setAuth({
      token: null,
      roles: [],
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};
