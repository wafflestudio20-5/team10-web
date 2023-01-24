import React from 'react';
import PostingBoard from '../boardNew/PostingBoard';
import SubjectTemplate from '../../SubjectTemplate';
import { useParams } from 'react-router-dom';

export default function NewBoardPage() {
  const { subjectid } = useParams();

  return (
    <SubjectTemplate
      subject={`${subjectid as string}`}
      page='게시판'
      content={undefined}
    >
      <PostingBoard></PostingBoard>
    </SubjectTemplate>
  );
}
