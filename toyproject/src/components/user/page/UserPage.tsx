import React from 'react';
import styles from './UserPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import Content from '../userComponents/Content';
import Profile from '../userComponents/Profile';
import PasswordForm from '../userComponents/PasswordForm';
import { useSessionContext } from '../../../context/SessionContext';

export default function UserPage() {
  const { user } = useSessionContext();

  return (
    <div className={styles.wrapper}>
      <SideNavBar />
      <div className={styles.right}>
        <div className={styles.header}>{user?.username}의 계정</div>
        <div className={styles.body}>
          <Profile></Profile>
          <div className={styles.title}>개인정보</div>
          <Content title={'전체이름:'} content={`${user?.username}`} />
          <Content title={'이메일 주소'} content={`${user?.email}`} />
          <Content title={'학번'} content={`${user?.student_id}`} />
          {/*return에 userpassword가 없어 다음과 같이 ui 로 보여지게 함*/}
          <PasswordForm title={'비밀번호'} content={'********'} />{' '}
        </div>
      </div>
    </div>
  );
}
