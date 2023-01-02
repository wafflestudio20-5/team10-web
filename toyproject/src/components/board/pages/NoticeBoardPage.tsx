import React from 'react';
import BoardDetail from '../boardDetail/BoardDetail';
import SubjectTemplate from '../../SubjectTemplate';

export default function NoticeBoardPage() {
  return (
    <SubjectTemplate subject='와플학개론' page='게시판' content={'공지'}>
      {/* props전달하여 boarddetail 컴포넌트 재사용 하기 */}
      <BoardDetail></BoardDetail>
    </SubjectTemplate>
  );
}
