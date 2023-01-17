import React, { useEffect, useState } from 'react';
import styles from './SelectSubjectPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import SubjectList from '../SubjectList';
import { UserBar } from '../../UserBar/UserBar';
import Searchbar from '../../Searchbar';
import axios from 'axios';
import { url } from 'inspector';
import { apiSubjects } from '../../../lib/api';
import { useSessionContext } from '../../../context/SessionContext';

type subject = {
  id: number;
  name: string;
  created_by: string | { username: string };
};

export default function SelectSubjectPage() {
  const [searchValue, setSearchValue] = useState('');
  const [subjects, setSubjects] = useState<subject[]>();
  const { token } = useSessionContext();
  //전체 과목 받아오기 useEffect
  // enroll, drop은 여기서만 사용하니 굳이 api.ts에 정의해둘 필요 없을 것 같음

  useEffect(() => {
    (async () => {
      const subjects = await apiSubjects(token);
      setSubjects(subjects.data);
    })();
  }, []);

  return (
    <div className={styles.wrapper}>
      <SideNavBar />
      <div className={styles.body}>
        <header>
          <h1>강좌 선택</h1>
          <UserBar></UserBar>
        </header>
        <section>
          <Searchbar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            inputPlaceHolder='전체 강좌 검색은 돋보기 버튼을 클릭하세요'
          />
          {subjects &&
            subjects.map((subject) => {
              return (
                <SubjectList
                  key={subject.id}
                  name={subject.name}
                  created_by={subject.created_by}
                ></SubjectList>
              );
            })}
        </section>
      </div>
    </div>
  );
}