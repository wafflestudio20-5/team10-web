import React from 'react';
import { Card } from './card';
import styles from './cards.module.scss';

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
];

export const Cards = () => {
  return (
    <div className={styles.cardsContainer}>
      {subjects.map((subject) => {
        return <Card key={subject.id} subject={subject}></Card>;
      })}
    </div>
  );
};
