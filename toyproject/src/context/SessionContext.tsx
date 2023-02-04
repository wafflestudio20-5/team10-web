import React, { createContext, useContext, useState, useEffect } from "react";
import { CardColor, SubjectType, User } from "../lib/types";
import {
  apiGetUserInfo,
  apiLogin,
  apiLogout,
  apiRefreshToken,
  apiSocialLogout,
} from "../lib/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from "axios";

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
  colors: CardColor[];
  setColors: React.Dispatch<CardColor[]>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("refresh") !== null
  );
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [colors, setColors] = useState<CardColor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!isLoggedIn) {
        return;
      }
      try {
        const localRefresh = localStorage.getItem("refresh");
        const localUserId = Number(localStorage.getItem("userId"));
        const res = await getRefreshToken(localRefresh ? localRefresh : "temp"); //렌더링 시 refreshToken 요청
        // console.log(res.data.access);
        if (res.status === 200) {
          const resUser = await apiGetUserInfo(localUserId, res.data.access); //이 작업을 위해선 userId가 필요한데 우선 local Storage에 저장
          setUser(resUser.data);
          setColors(
            resUser.data.classes.map((c: SubjectType): CardColor => {
              return {
                id: c.id,
                color: "#97bdf5",
              };
            })
          );
        } else {
          console.log(res);
          setIsLoggedIn(false);
        }
      } catch (err: any) {
        setIsLoggedIn(false);
        // const errorMessage = err.response.data.code;
        toast("세션이 만료되었습니다.", {
          position: "top-center",
          theme: "colored",
        });
        localStorage.removeItem("refresh");
        navigate("/login");
      }
    })();
  }, []);

  //refresh token 을 통해 access token을 받아오고 local storage에 저장
  const getRefreshToken = async (refreshToken: string) => {
    const res = await apiRefreshToken(refreshToken);
    setToken(res.data.access); //setToken 여기서 하나 밖에서 해주나 별 차이가 없음
    localStorage.setItem("refresh", res.data.refresh);
    return res;
  };

  const login = async (email: string, password: string): Promise<any> => {
    try {
      const loginRes = await apiLogin(email, password);
      setToken(loginRes.data.token.access_token);
      localStorage.setItem("refresh", loginRes.data.token.refresh_token); //우선 로컬storage에 refresh 저장해둠
      localStorage.setItem("userId", loginRes.data.token.user_id);
      const userInfoRes = await apiGetUserInfo(
        loginRes.data.token.user_id,
        loginRes.data.token.access_token
      );
      setUser(userInfoRes.data);
      setColors(
        userInfoRes.data.classes.map((c: SubjectType): CardColor => {
          return {
            id: c.id,
            color: "#97bdf5",
          };
        })
      );
      setIsLoggedIn(true);
      navigate("/");
    } catch (err: any) {
      if (Object.keys(err.response.data).includes("non_field_errors")) {
        toast("이메일 또는 비밀번호가 틀렸습니다.", {
          position: "top-center",
          theme: "colored",
        });
      } else if (Object.keys(err.response.data).includes("password")) {
        toast("비밀번호를 입력하세요.", {
          position: "top-center",
          theme: "colored",
        });
      }
    }
  };

  const logout = async (token: string) => {
    try {
      // const localRefresh = localStorage.getItem('refresh');
      // const resToken = await getRefreshToken(
      //   localRefresh ? localRefresh : 'temp'
      // );
      // if (user?.is_social_login === true) {
      //   const res = await apiSocialLogout(resToken.data.access);
      //   console.log(res);
      //   setUser(null);
      //   setToken(null);
      //   navigate('/login/');
      //   localStorage.removeItem('refresh');
      //   setIsLoggedIn(false);
      //어떤 로그아웃 페이지로 이동}
      // } else {
      // const res = await apiLogout(resToken.data.access);
      setUser(null);
      setToken(null);
      navigate("/login/");
      localStorage.removeItem("refresh");
      setIsLoggedIn(false);
      // }
    } catch (err) {
      return console.log(err);
    }
  };

  const refreshUserInfo = async (token: string) => {
    const localUserId = Number(localStorage.getItem("userId"));
    const userInfoRes = await apiGetUserInfo(localUserId, token);
    setUser(userInfoRes.data);
    setColors(
      userInfoRes.data.classes.map((c: SubjectType): CardColor => {
        return {
          id: c.id,
          color: "#97bdf5",
        };
      })
    );
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
        colors,
        setColors,
        setIsLoggedIn,
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
