import React from 'react';
import BoardDetail from '../boardDetail/BoardDetail';
import SubjectTemplate from '../../SubjectTemplate';
import { useParams } from 'react-router-dom';

export default function NoticeBoardPage() {
  const { subjectname } = useParams();

  return (
    <SubjectTemplate subject={`${subjectname}`} page='게시판' content={'공지'}>
      {/* props전달하여 boarddetail 컴포넌트 재사용 하기 */}
      <BoardDetail></BoardDetail>
    </SubjectTemplate>
  );
}
