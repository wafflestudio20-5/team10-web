import React from 'react';
import styles from './SelectSubjectPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import SubjectList from '../SubjectList';
import { UserBar } from '../../UserBar/UserBar';
export default function SelectSubjectPage() {
  return (
    <div className={styles.wrapper}>
      <SideNavBar />
      <div className={styles.body}>
        <header>
          <h1>강좌 선택</h1>
          <UserBar></UserBar>
        </header>
        <SubjectList></SubjectList>
      </div>
    </div>
  );
}
