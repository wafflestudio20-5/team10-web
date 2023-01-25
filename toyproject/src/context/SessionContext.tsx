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
  refreshUserInfo: (token: string) => void;
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
        const res = await getRefreshToken(localRefresh); //렌더링 시 refreshToken 요청
        if (res.status === 200) {
          const resUser = await apiGetUserInfo(localUserId, res.data.access); //이 작업을 위해선 userId가 필요한데 우선 local Storage에 저장..?
          setUser(resUser.data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        setIsLoggedIn(false);
        toast('로그인 후 이용해주세요');
        navigate('/login');
        console.error(e);
      }
    })();
  }, []);

  const getRefreshToken = async (token: string | null) => {
    const res = await apiRefreshToken(token);
    setToken(res.data.access); //setToken 밖으로 뺐더니 lifecycle 로 인한 오류 발생(다른 api 요청 이후 set하게 됨)
    localStorage.setItem('refresh', res.data.refresh);
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
    } catch (err: any) {
      console.log(err.response.data.non_field_errors);
      const errorMessage = err.response.data.non_field_errors;
      toast(errorMessage[0], {
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
      localStorage.removeItem('refresh');
    } catch (err) {
      return console.log(err);
    }
  };

  const refreshUserInfo = async (token: string) => {
    const localUserId = Number(localStorage.getItem('userId'));
    const userInfoRes = await apiGetUserInfo(localUserId, token);
    setUser(userInfoRes.data);
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
        refreshUserInfo,
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
