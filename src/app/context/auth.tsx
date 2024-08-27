'use client'
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { authUser, createUser, isSessionValid, signUserOut } from '@/app/actions/auth';
import { FormState } from '@/app/lib/definitions';
import { usePathname, useRouter } from 'next/navigation';
import { authMandatoryPaths } from '@/middleware';

const AuthContext = createContext({
  isAuthenticated: false,
  signup: (fs: FormState, fd: FormData): any => {},
  signin: (fs: FormState, fd: FormData): any => {},
  signout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    isSessionValid().then((authenticated: boolean) => {
      setIsAuthenticated(authenticated);
    });
  }, []);

  const signup = async (formState: FormState, formData: FormData) => {
    const err = await createUser(formData);
    if (err) {
      return err;
    }
    setIsAuthenticated(true);
    router.push('/');
  }

  const signin = async (formState: FormState, formData: FormData) => {
    const err = await authUser(formData);
    if (err) {
      return err;
    }
    setIsAuthenticated(true);
    router.push('/');
  }

  const signout = async () => {
    await signUserOut();
    setIsAuthenticated(false);
    if (authMandatoryPaths.includes(pathname)) {
      router.push('/');
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signup, signin, signout}}>
      {children}
    </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
