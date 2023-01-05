import React, { createContext, useContext, useState } from 'react';

type SessionContextType = {
  isLoggedIn: boolean;
  handleGoogleToken: (input: string | undefined) => void;
};

const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLogggedIn] = useState(false);
  const [googleToken, setGoogleToken] = useState<string | undefined>('');

  const handleGoogleToken = (input: string | undefined) => {
    setGoogleToken(input);
  };

  return (
    <SessionContext.Provider value={{ isLoggedIn, handleGoogleToken }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSessionContext = () => useContext(SessionContext);
