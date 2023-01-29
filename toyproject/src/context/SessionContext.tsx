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
import { Axios, AxiosResponse } from 'axios';

type SessionContextType = {
  isLoggedIn: boolean;
  user: User | null;
  setUser: React.Dispatch<User | null>;
  token: string | null;
  login: (username: string, password: string) => Promise<any>;
  logout: (token: string) => Promise<any>;
  refreshUserInfo: (token: string) => void;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  getRefreshToken: (refreshToken: string) => Promise<AxiosResponse<any, any>>;
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
        const res = await getRefreshToken(localRefresh ? localRefresh : 'temp'); //렌더링 시 refreshToken 요청
        if (res.status === 200) {
          const resUser = await apiGetUserInfo(localUserId, res.data.access); //이 작업을 위해선 userId가 필요한데 우선 local Storage에 저장..?
          setUser(resUser.data);
          setIsLoggedIn(true);
        } else {
          console.log(res);
          setIsLoggedIn(false);
          // navigate('/login');
        }
      } catch (err: any) {
        setIsLoggedIn(false);
        const errorMessage = err.response.data.code;
        toast(errorMessage);
        // navigate('/login');
      }
    })();
  }, []);

  const getRefreshToken = async (refreshToken: string) => {
    const res = await apiRefreshToken(refreshToken);
    setToken(res.data.access); //setToken 여기서 하나 밖에서 해주나 별 차이가 없음
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
        setToken,
        getRefreshToken,
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
