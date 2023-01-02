import React from 'react';
import BoardNav from '../boardNav/BoardNav';
import SubjectTemplate from '../../SubjectTemplate';

function BoardNavPage() {
  return (
    <SubjectTemplate subject='와플학개론' page='과제' content={undefined}>
      <BoardNav></BoardNav>
    </SubjectTemplate>
  );
}

export default BoardNavPage;
