import React from 'react';
import styles from './NewBoardPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import BoardHeader from '../boardHeader/BoardHeader';
import BoardSideBar from '../boardSideBar/BoardSideBar';
import PostingBoard from '../boardNew/PostingBoard';

export default function NewBoardPage() {
  return (
    <div className={styles.wrapper}>
      <SideNavBar></SideNavBar>
      <section>
        <BoardHeader></BoardHeader>
        <div className={styles.body}>
          <BoardSideBar></BoardSideBar>
          <PostingBoard></PostingBoard>
        </div>
      </section>
    </div>
  );
}
