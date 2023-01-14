import React from 'react';
import styles from './UserPage.module.scss';
import { SideNavBar } from '../sideNavbar/SideNavBar';

export default function UserPage() {
  return (
    <div className={styles.wrapper}>
      <SideNavBar />
      <div className={styles.body}>
        <div className={styles.header}>username의 계정</div>
        <div>전체이름</div>
        <div>이메일 주소</div>
        <div>학번</div>
        <div>비밀번호, 컴포넌트로 제작</div>
        <div>언어, i18n-js 라이브러리 추후 사용</div>
        <div>표준 시간대, 회의로 결정</div>
      </div>
    </div>
  );
}
