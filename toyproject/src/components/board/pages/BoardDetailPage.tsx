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
>>>>>>> bf6caf5 (refactor / boardDetailPage 댓글 작성시 함수 부분 생성)

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
