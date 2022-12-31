import React from 'react';
import { SideNavBar } from '../sideNavbar/SideNavBar';
import BoardHeader from './boardHeader/BoardHeader';
import BoardDetail from './boardDetail/BoardDetail';
import BoardSideBar from './boardSideBar/BoardSideBar';
import styles from './QnABoardPage.module.scss';
export default function QnABoardPage() {
  return (
    <div className='wrapper'>
      <SideNavBar></SideNavBar>
      <section>
        <BoardHeader></BoardHeader>
        <div className={styles.body}>
          <BoardSideBar></BoardSideBar>
          {/* props 전달하여 boardDetail 부분 재사용하기 */}
          <BoardDetail></BoardDetail>
        </div>
      </section>
    </div>
  );
}
