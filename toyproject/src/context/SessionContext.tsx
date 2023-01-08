import { createContext, useContext, useState, PropsWithChildren } from "react";
import { User } from "../lib/types";
import { apiLogin } from "../lib/api";

type SessionContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
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

  const login = (email: string, password: string) => {
    apiLogin(email, password)
      .then((res) => {
        setUser(res.data);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => navigate("/"));
  };

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, user, login, handleGoogleToken }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(SessionContext);
}
