import React from 'react';
import { Card } from './Card';
import styles from './Cards.module.scss';

const subjects = [
  {
    id: 1,
    name: '논리와 비판적 사고',
  },
  {
    id: 2,
    name: '컴퓨터구조',
  },
  { id: 3, name: '와플학개론' },
  { id: 4, name: '와플학개론' },
  { id: 5, name: '와플학개론' },
  { id: 6, name: '와플학개론' },
];

export const Cards = () => {
  return (
    <div className={styles['cards-container']}>
      {subjects.map((subject) => {
        return <Card key={subject.id} subject={subject}></Card>;
      })}
    </div>
  );
};
