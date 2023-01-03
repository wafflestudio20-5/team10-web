import React from 'react';
import PostingBoard from '../boardNew/PostingBoard';
import SubjectTemplate from '../../SubjectTemplate';
import { useParams } from 'react-router-dom';

export default function NewBoardPage() {
  const { subjectname } = useParams();

  return (
    <SubjectTemplate
      subject={`${subjectname as string}`}
      page='게시판'
      content={undefined}
    >
      <PostingBoard></PostingBoard>
    </SubjectTemplate>
  );
}
