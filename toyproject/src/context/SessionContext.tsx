import { createContext, useContext, useState } from 'react';
import { User } from '../lib/types';
import { apiLogin, apiLogout } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type SessionContextType = {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<any>;
  logout: (token: string) => Promise<any>;
};

const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLogggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();
  const login = async (email: string, password: string): Promise<any> => {
    try {
      const res = await apiLogin(email, password);
      setUser(res.data);
      setToken(res.data.token);
      navigate('/');
    } catch (err) {
      console.log(err);
      toast('이메일 또는 비밀번호가 틀렸습니다.', {
        position: 'top-center',
        theme: 'colored',
      });
    }
  };

  const logout = async (token: string) => {
    try {
      const res = await apiLogout(token);
      setUser(null);
      setToken(null);
      navigate('/login/');
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
      <ToastContainer />
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(SessionContext);
}
