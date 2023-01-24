import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../lib/types';
import {
  apiGetUserInfo,
  apiLogin,
  apiLogout,
  apiRefreshToken,
} from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type SessionContextType = {
  isLoggedIn: boolean;
  user: User | null;
  setUser: React.Dispatch<User | null>;
  token: string | null;
  login: (username: string, password: string) => Promise<any>;
  logout: (token: string) => Promise<any>;
};

const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const localRefresh = localStorage.getItem('refresh');
        const localUserId = Number(localStorage.getItem('userId'));
        const res = await getRefreshToken(localRefresh); //렌더링 시 refreshToken 요청, 우선 false return하게 임의로 구현해둠
        if (res !== undefined) {
          setToken(res.data.access);
          const resUser = await apiGetUserInfo(localUserId, res.data.access); //이 작업을 위해선 userId가 필요한데 우선 local Storage에 저장..?
          setUser(resUser.data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        if (!res) {
          toast('로그인 후 이용해주세요');
          navigate('/login');
        }
      } catch (e) {
        setIsLoggedIn(false);
        console.error(e);
      }
    })();
  }, []);

  const getRefreshToken = async (token: string | null) => {
    const res = await apiRefreshToken(token);
    return res;
  };

  const login = async (email: string, password: string): Promise<any> => {
    try {
      const loginRes = await apiLogin(email, password);
      setToken(loginRes.data.token.access_token);
      setRefreshToken(loginRes.data.token.refresh_token);
      localStorage.setItem('refresh', loginRes.data.token.refresh_token); //우선 로컬storage에 refresh 저장해둠
      localStorage.setItem('userId', loginRes.data.token.user_id);
      const userInfoRes = await apiGetUserInfo(
        loginRes.data.token.user_id,
        loginRes.data.token.access_token
      );
      setUser(userInfoRes.data);
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
        setUser,
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
