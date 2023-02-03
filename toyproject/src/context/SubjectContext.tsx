import React, { createContext, useContext, useEffect, useState } from "react";
import { apiGetSubjectInfo, apiGetSubjects } from "../lib/api";
import { useSessionContext } from "../context/SessionContext";
import { SubjectType } from "../lib/types";
import { AxiosResponse } from "axios";

type SubjectContextType = {
  subjects: SubjectType[] | undefined;
  mySubjects: SubjectType[] | undefined;
  curSubject: SubjectType | undefined;
  handleClick: (subject: SubjectType) => void;
  nextApi: string | null;
  previousApi: string | null;
  getSubjectInfo: (id: number) => Promise<AxiosResponse<any, any>>;
};

const SubjectContext = createContext<SubjectContextType>(
  {} as SubjectContextType
);

//default 붙이면 prettier 이상하게 적용됨
export function SubjectProvider({ children }: { children: React.ReactNode }) {
  const { token, user, getRefreshToken } = useSessionContext();

  //페이지네이션에 사용해야겠다.
  const [subjects, setSubjects] = useState<SubjectType[] | undefined>(
    undefined
  );

  const [curSubject, setCurSubject] = useState<SubjectType | undefined>(
    undefined
  );
  const [nextApi, setNextApi] = useState("");
  const [previousApi, setPreviousApi] = useState("");

  const mySubjects = user?.classes;

  const handleClick = (subject: SubjectType) => {
    setCurSubject(subject);
  };

  //subjectTemplate에서 사용
  const getSubjectInfo = async (id: number) => {
    const localRefreshToken = localStorage.getItem("refresh");
    const resToken = await getRefreshToken(
      localRefreshToken ? localRefreshToken : "temp"
    );
    const res = await apiGetSubjectInfo(resToken.data.access, id);
    return res;
  };

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        mySubjects,
        curSubject,
        handleClick,
        nextApi,
        previousApi,
        getSubjectInfo,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

export const useSubjectContext = () => useContext(SubjectContext);
