import React from 'react';
import BoardList from '../boardList/BoardList';
import SubjectTemplate from '../../SubjectTemplate';
import { useParams } from 'react-router-dom';

export default function NoticeBoardPage() {
  const { subjectname } = useParams();

  return (
    <SubjectTemplate subject={`${subjectname}`} page='게시판' content={'공지'}>
      {/* props전달하여 boardlist 컴포넌트 재사용 하기 */}
      <BoardList category='noticeboard'></BoardList>
    </SubjectTemplate>
  );
}
