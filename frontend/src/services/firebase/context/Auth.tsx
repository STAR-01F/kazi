import React, {createContext, useState, useEffect} from 'react';
import {User, onAuthStateChanged} from 'firebase/auth';
import {auth} from '..';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isVerified: boolean;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as User | null);
      setLoading(false);
      if(currentUser && currentUser.emailVerified) {
        setIsVerified(true);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{user, loading, isVerified}}>
      {children}
    </AuthContext.Provider>
  );
};
