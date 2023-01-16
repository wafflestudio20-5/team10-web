import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSessionContext } from '../context/SessionContext';
import { apiSubjects } from '../lib/api';

type SubjectType = { id: number; name: string };

type SubjectContextType = {
  subjects: SubjectType[] | undefined;
};

const SubjectContext = createContext<SubjectContextType>(
  {} as SubjectContextType
);

//default 붙이면 prettier 이상하게 적용됨
export function SubjectProvider({ children }: { children: React.ReactNode }) {
  const { token } = useSessionContext();
  const [subjects, setSubjects] = useState<SubjectType[] | undefined>(
    undefined
  );

  const getSubjects = (token: string | null) => {
    apiSubjects(token)
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (token) getSubjects(token);
  }, [token]);

  return (
    <SubjectContext.Provider value={{ subjects }}>
      {children}
    </SubjectContext.Provider>
  );
}

export const useSubjectContext = () => useContext(SubjectContext);
