import React, { createContext, useContext, useState } from 'react';

type SubjectType = { id: number; name: string };

const initialSubjects: SubjectType[] = [
  {
    id: 1,
    name: '논리와 비판적 사고',
  },
  {
    id: 2,
    name: '컴퓨터구조',
  },
  { id: 3, name: '심리학개론' },
  { id: 4, name: '꿀잼과목' },
  { id: 5, name: '그림그리기' },
  { id: 6, name: '틀린그림찾기' },
];

type SubjectContextType = {
  subjects: SubjectType[] | undefined;
};

const SubjectContext = createContext<SubjectContextType>(
  {} as SubjectContextType
);

//default 붙이면 prettier 이상하게 적용됨
export function SubjectProvider({ children }: { children: React.ReactNode }) {
  const [subjects, setSubjects] = useState<SubjectType[] | undefined>(
    initialSubjects
  );

  return (
    <SubjectContext.Provider value={{ subjects }}>
      {children}
    </SubjectContext.Provider>
  );
}

export const useSubjectContext = () => useContext(SubjectContext);
