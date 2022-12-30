import React from 'react';
import BoardHeader from './boardHeader/BoardHeader';
import BoardSideBar from './boardSideBar/BoardSideBar';
import BoardNav from './boardNav/BoardNav';
import { SideNavBar } from '../sideNavbar/SideNavBar';
import styles from './BoardNavPage.module.scss';

function BoardNavPage() {
  return (
    <div className='wrapper'>
      <SideNavBar></SideNavBar>
      <section>
        <BoardHeader></BoardHeader>
        <div className={styles.body}>
          <BoardSideBar></BoardSideBar>
          <BoardNav></BoardNav>
        </div>
      </section>
    </div>
  );
}

export default BoardNavPage;
