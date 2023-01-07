<<<<<<< HEAD
import React from "react";
import { useParams } from "react-router-dom";
import BoardDetail from "../boardDetail/BoardDetail";
import SubjectTemplate from "../../SubjectTemplate";
=======
import React from 'react';
import { useParams } from 'react-router-dom';
import BoardDetail from '../boardDetail/BoardDetail';
import SubjectTemplate from '../../SubjectTemplate';
>>>>>>> 27d4df1 (feat / boardDetailPage css 완성)

export default function BoardDetailPage() {
  const { subjectname } = useParams();

  return (
    <SubjectTemplate
      subject={subjectname as string}
      page='게시판'
      content={undefined}
    >
      <BoardDetail></BoardDetail>
    </SubjectTemplate>
  );
}
