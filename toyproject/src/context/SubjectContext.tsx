import React, { createContext, useState } from 'react';

const initialSubjects = [
  {
    id: 1,
    name: '논리와 비판적 사고',
  },
  {
    id: 2,
    name: '컴퓨터구조',
  },
  { id: 3, name: '와플학개론' },
  { id: 4, name: '와플학개론' },
  { id: 5, name: '와플학개론' },
  { id: 6, name: '와플학개론' },
];

type SubjectType = { id: number; name: string };

type SubjectContextType = {
  subjects: SubjectType[] | undefined;
};

const SubjectContext = createContext<SubjectContextType>(
  {} as SubjectContextType
);

export default function SubjectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subjects, setSubjects] = useState<SubjectType[] | undefined>(
    initialSubjects
  );

  return (
    <SubjectContext.Provider value={{ subjects }}>
      {children}
    </SubjectContext.Provider>
  );
}
