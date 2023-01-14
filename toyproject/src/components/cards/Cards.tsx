import React from 'react';
import { Card } from './Card';
import styles from './Cards.module.scss';
import { useSubjectContext } from '../../context/SubjectContext';

export const Cards = () => {
  const { subjects } = useSubjectContext();

  return (
    <div className={styles['cards-container']}>
      {subjects &&
        subjects.map((subject) => {
          return <Card key={subject.id} subject={subject}></Card>;
        })}
    </div>
  );
};
