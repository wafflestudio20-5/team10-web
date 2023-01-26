import React, { useEffect, useState } from 'react';
import styles from './SelectSubjectPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import SubjectList from '../SubjectList';
import { UserBar } from '../../UserBar/UserBar';
import axios from 'axios';
import { url } from 'inspector';
import { apiGetSubjects } from '../../../lib/api';
import { useSessionContext } from '../../../context/SessionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSubjectContext } from '../../../context/SubjectContext';
import { SubjectType } from '../../../lib/types';
import { ToastContainer } from 'react-toastify';

const isEnrolled = (
  mySubjects: SubjectType[] | undefined,
  subject: SubjectType
) => {
  if (!mySubjects) return false;
  for (const elem of mySubjects) {
    if (elem.id === subject.id) return true;
  }
  return false;
};

export default function SelectSubjectPage() {
  const [searchValue, setSearchValue] = useState('');
  const [subjects, setSubjects] = useState<SubjectType[]>();
  const [totalNum, setTotalNum] = useState<number>(0);
  const { token } = useSessionContext();
  const { mySubjects, previousApi, nextApi } = useSubjectContext();
  //ToDO
  //sever 연결되면
  //subjects useSubjectContext에서 가져와보기

  useEffect(() => {
    (async () => {
      if (token) {
        const res = await apiGetSubjects(token, 1);
        setSubjects(res.data.results);
        setTotalNum(res.data.count);
      }
    })();
  }, [token]);

  const goToPage = async (
    event: React.MouseEvent<HTMLButtonElement>,
    page: number
  ) => {
    event.preventDefault();
    const res = await apiGetSubjects(token, page);
    setSubjects(res.data.results);
  };

  const buttonCount = Math.ceil(totalNum / 10);

  return (
    <div className={styles.wrapper}>
      <SideNavBar />
      <div className={styles.body}>
        <header>
          <FontAwesomeIcon icon={faBars} className={styles.bars} />
          <h1>강좌검색</h1>
          <UserBar></UserBar>
        </header>
        <section>
          <div className={styles.search}>
            <input
              className={styles.searchbar}
              placeholder='전체 강좌 검색은 돋보기 버튼을 클릭하세요 (아직 검색 안돼요)'
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={styles.icon}
              />
            </button>
          </div>
          <article>
            <div className={styles.index}>
              <b className={styles.name}>교과목명</b>
              <b className={styles.professor}>담당교수</b>
              <b className={styles.enroll}>신청</b>
            </div>
            {subjects &&
              subjects.map((subject) => {
                return (
                  <SubjectList
                    key={subject.id}
                    classId={subject.id}
                    name={subject.name}
                    professor='안동하' // temporary
                    isEnrolled={isEnrolled(mySubjects, subject)}
                  ></SubjectList>
                );
              })}
          </article>
          <div className={styles['button-container']}>
            {Array.from({ length: buttonCount }).map((_, idx) => (
              <button
                className={styles['nav-button']}
                key={idx}
                onClick={(event) => goToPage(event, idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}
