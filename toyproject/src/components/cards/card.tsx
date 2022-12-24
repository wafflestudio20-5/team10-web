import React from 'react';
import styles from './card.module.scss';

type subject = {
  id: number;
  name: string;
};

type CardType = {
  subject: subject;
};

export const Card = ({ subject }: CardType) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardColor}></div>
      <section>
        <a href='www.naver.com'>{subject.name}</a>
      </section>
    </div>
  );
};
