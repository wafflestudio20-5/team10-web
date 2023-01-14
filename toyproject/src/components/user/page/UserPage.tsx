import React from 'react';
import styles from './UserPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import Content from '../userComponents/Content';
import Profile from '../userComponents/Profile';

export default function UserPage() {
  return (
    <div className={styles.wrapper}>
      <SideNavBar />
      <div className={styles.right}>
        <div className={styles.header}>username의 계정</div>
        <div className={styles.body}>
          <Profile></Profile>
          <div className={styles.title}>개인정보</div>
          <Content
            title={'전체이름:'}
            content={'안동하, 나중에 usercontext로 수정'}
          />
          <Content title={'이메일 주소'} content={'2019dahn@snu.ac.kr'} />
          <Content title={'학번'} content={'2019dahn@snu.ac.kr'} />
          <Content title={'비밀번호'} content={'qwer1234'} />
          <Content title={'언어'} content={'i18n-js라이브러리 추후 사용?'} />
          <Content title={'표준 시간대'} content={'회의로 결정'} />
        </div>
      </div>
    </div>
  );
}
