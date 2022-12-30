import React from 'react';
import styles from './BoardDetailPage.module.scss';
import { SideNavBar } from '../sideNavbar/SideNavBar';
import BoardHeader from './boardHeader/BoardHeader';
import BoardDetail from './boardDetail/BoardDetail';
import BoardSideBar from './boardSideBar/BoardSideBar';

export default function BoardDetailPage() {
  return (
    <div className='wrapper'>
      <SideNavBar></SideNavBar>
      <section>
        <BoardHeader></BoardHeader>
        <div className={styles.body}>
          <BoardSideBar></BoardSideBar>
          <BoardDetail></BoardDetail>
        </div>
      </section>
    </div>
  );
}
