import React, { useState } from 'react';
import styles from './SelectSubjectPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import SubjectList from '../SubjectList';
import { UserBar } from '../../UserBar/UserBar';
import Searchbar from '../../Searchbar';

const initialSubject = [
  {
    id: 1,
    name: '동서양 명작 읽기',
    professor: '공자',
    is_chosen: false,
  },
  {
    id: 2,
    name: '컴퓨터 공부',
    professor: '맹자',
    is_chosen: false,
  },
];

export default function SelectSubjectPage() {
  const [searchValue, setSearchValue] = useState('');

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
          {initialSubject &&
            initialSubject.map((subject) => {
              return (
                <SubjectList
                  key={subject.id}
                  name={subject.name}
                  professor={subject.professor}
                  is_chosen={subject.is_chosen}
                ></SubjectList>
              );
            })}
        </section>
      </div>
    </div>
  );
}
