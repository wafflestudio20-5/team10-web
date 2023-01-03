import React from 'react';
import BoardDetail from '../boardDetail/BoardDetail';
import SubjectTemplate from '../../SubjectTemplate';
import { useParams } from 'react-router-dom';
export default function QnABoardPage() {
  const { subjectname } = useParams();

  return (
    <SubjectTemplate subject={`${subjectname}`} page='게시판' content={'Q&A'}>
      {/* props 전달하여 boardDetail 부분 재사용하기 */}
      <BoardDetail></BoardDetail>
    </SubjectTemplate>
  );
}
