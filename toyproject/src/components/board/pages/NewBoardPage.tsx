import React from 'react';
import PostingBoard from '../boardNew/PostingBoard';
import SubjectTemplate from '../../SubjectTemplate';

export default function NewBoardPage() {
  return (
    <SubjectTemplate subject='와플학개론' page='게시판' content={undefined}>
      <PostingBoard></PostingBoard>
    </SubjectTemplate>
  );
}
