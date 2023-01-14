import React from 'react';
import styles from './UserPage.module.scss';
import { SideNavBar } from '../sideNavbar/SideNavBar';

export default function UserPage() {
  return (
    <div className={styles.wrapper}>
      <SideNavBar />
      <div className={styles.body}>
        <div className={styles.header}>username의 계정</div>
      </div>
    </div>
  );
}
