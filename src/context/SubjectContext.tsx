import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiGetSubjects } from '../lib/api';
import { useSessionContext } from '../context/SessionContext';
import { SubjectType } from '../lib/types';

type SubjectContextType = {
  subjects: SubjectType[] | undefined;
  mySubjects: SubjectType[] | undefined;
  curSubject: SubjectType | undefined;
  handleClick: (subject: SubjectType) => void;
  getSubjects: (token: string | null, page: number | null) => void;
  nextApi: string | null;
  previousApi: string | null;
};

const SubjectContext = createContext<SubjectContextType>(
  {} as SubjectContextType
);

//default 붙이면 prettier 이상하게 적용됨
export function SubjectProvider({ children }: { children: React.ReactNode }) {
  const { token, user } = useSessionContext();

  //페이지네이션에 사용해야겠다.
  const [subjects, setSubjects] = useState<SubjectType[] | undefined>(
    undefined
  );

  const [curSubject, setCurSubject] = useState<SubjectType | undefined>(
    undefined
  );
  const [nextApi, setNextApi] = useState('');
  const [previousApi, setPreviousApi] = useState('');

  const getSubjects = async (token: string | null, page: number | null) => {
    try {
      const res = await apiGetSubjects(token, page);
      setNextApi(res.data.next && res.data.next.match(/page=([^&]+)/)[1]);
      setPreviousApi(
        res.data.previous && res.data.previous.match(/page=([^&]+)/)[1]
      );
      setSubjects(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (token) getSubjects(token, '');
  // }, [token]);

  const mySubjects = user?.classes;

  const handleClick = (subject: SubjectType) => {
    setCurSubject(subject);
  };

  const enrollClass = () => {};

  const dropClass = () => {};

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        mySubjects,
        curSubject,
        handleClick,
        getSubjects,
        nextApi,
        previousApi,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

export const useSubjectContext = () => useContext(SubjectContext);
