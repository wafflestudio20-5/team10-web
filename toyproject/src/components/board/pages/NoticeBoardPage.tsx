import React from 'react';
import styles from './NoticeBoardPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import BoardHeader from '../boardHeader/BoardHeader';
import BoardDetail from '../boardDetail/BoardDetail';
import SubjectTemplate from '../../SubjectTemplate';

export default function NoticeBoardPage() {
  return (
    <SubjectTemplate subject='와플학개론' page='과제' content={undefined}>
      {/* props전달하여 boarddetail 컴포넌트 재사용 하기 */}
      <BoardDetail></BoardDetail>
    </SubjectTemplate>
  );
}
