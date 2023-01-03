import React from 'react';
import styles from './Card.module.scss';
import { Navigate, useNavigate } from 'react-router-dom';

type subject = {
  id: number;
  name: string;
};

type CardType = {
  subject: subject;
};

export const Card = ({ subject }: CardType) => {
  const navigate = useNavigate();

  const goToBoardNav = () => {
    navigate(`/${subject.name}/boardnav`);
  };

  return (
    <div className={styles['card-container']}>
      <div className={styles['card-color']} onClick={goToBoardNav}></div>
      <section>
        <a href={`/${subject.name}/boardnav`}>{subject.name}</a>
      </section>
    </div>
  );
};
