import React from 'react';
import BoardHeader from './boardHeader/BoardHeader';
import BoardSideBar from './boardSideBar/BoardSideBar';
import Board from './board/Board';
import { SideNavBar } from '../sideNavbar/SideNavBar';
import styles from './BoardPage.module.scss';

function BoardPage() {
  return (
    <div className='wrapper'>
      <SideNavBar></SideNavBar>
      <section>
        <BoardHeader></BoardHeader>
        <div className={styles.body}>
          <BoardSideBar></BoardSideBar>
          <Board></Board>
        </div>
      </section>
    </div>
  );
}

export default BoardPage;
