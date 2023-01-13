import { createContext, useContext, useState } from "react";
import { User } from "../lib/types";
import { apiLogin } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SessionContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<any>;
  handleGoogleToken: (input: string | undefined) => void;
};

const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLogggedIn] = useState(false);
  const [googleToken, setGoogleToken] = useState<string | undefined>("");
  const [user, setUser] = useState<User | null>(null);

  const handleGoogleToken = (input: string | undefined) => {
    setGoogleToken(input);
  };

  const navigate = useNavigate();
  const login = (email: string, password: string): Promise<any> => {
    return apiLogin(email, password)
      .then((res) => {
        setUser(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast("이메일 또는 비밀번호가 틀렸습니다.", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, user, login, handleGoogleToken }}
    >
      {children}
      <ToastContainer />
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(SessionContext);
}
