import React from 'react';
import BoardDetail from '../boardDetail/BoardDetail';
import SubjectTemplate from '../../SubjectTemplate';
export default function QnABoardPage() {
  return (
    <SubjectTemplate subject='와플학개론' page='게시판' content={'Q&A'}>
      {/* props 전달하여 boardDetail 부분 재사용하기 */}
      <BoardDetail></BoardDetail>
    </SubjectTemplate>
  );
}
