import React from 'react';
import { SideNavBar } from '../sideNavbar/SideNavBar';
import { DashBoard } from './DashBoard';
import { RightSide } from './RightSide';
import styles from './DashBoardPage.module.scss';
export default function DashBoardPage() {
  return (
    <div className={styles.wrapper}>
      <SideNavBar />
      <div className={styles.body}>
        <DashBoard />
        <RightSide />
      </div>
    </div>
  );
}
