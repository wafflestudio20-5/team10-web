import React from 'react';
import styles from './NoticeBoardPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import BoardHeader from '../boardHeader/BoardHeader';
import BoardSideBar from '../boardSideBar/BoardSideBar';
import BoardDetail from '../boardDetail/BoardDetail';

export default function NoticeBoardPage() {
  return (
    <div className='wrapper'>
      <SideNavBar></SideNavBar>
      <section>
        <BoardHeader></BoardHeader>
        <div className={styles.body}>
          <BoardSideBar></BoardSideBar>
          {/* props전달하여 boarddetail 컴포넌트 재사용 하기 */}
          <BoardDetail></BoardDetail>
        </div>
      </section>
    </div>
  );
}
