import React from 'react';
import { Subject } from './subject';

type Subject = {
  id: number;
  name: string;
};

const subjects: Subject[] = [
  {
    id: 1,
    name: '논리와 비판적 사고',
  },
  {
    id: 2,
    name: '컴퓨터구조',
  },
  { id: 3, name: '와플학개론' },
];

export const Subjects = () => {
  return (
    <>
      {subjects.map((subject) => {
        return <Subject key={subject.id} subject={subject}></Subject>;
      })}
    </>
  );
};
