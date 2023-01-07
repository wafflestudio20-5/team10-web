import React from 'react';
import BoardNav from '../boardNav/BoardNav';
import SubjectTemplate from '../../SubjectTemplate';
import { useParams } from 'react-router-dom';

function BoardNavPage() {
  const { subjectname } = useParams();

  return (
    <SubjectTemplate
      subject={subjectname as string}
      page='게시판'
      content={undefined}
    >
      <BoardNav></BoardNav>
    </SubjectTemplate>
  );
}

export default BoardNavPage;
