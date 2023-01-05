import React, { createContext, useContext, useState } from 'react';

type SessionContextType = {
  isLoggedIn: boolean;
};

const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLogggedIn] = useState(false);

  return (
    <SessionContext.Provider value={{ isLoggedIn }}></SessionContext.Provider>
  );
}

export const useSessionContext = () => useContext(SessionContext);
