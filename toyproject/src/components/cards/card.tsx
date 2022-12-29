import React from 'react';
import styles from './Card.module.scss';

type subject = {
  id: number;
  name: string;
};

type CardType = {
  subject: subject;
};

export const Card = ({ subject }: CardType) => {
  return (
    <div className={styles['card-container']}>
      <div className={styles['card-color']}></div>
      <section>
        <a href='www.naver.com'>{subject.name}</a>
      </section>
    </div>
  );
};
