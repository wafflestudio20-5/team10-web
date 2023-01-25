import React from 'react';
import styles from './Card.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSubjectContext } from '../../context/SubjectContext';
import { SubjectType } from '../../lib/types';

type CardType = {
  subject: SubjectType;
};

export const Card = ({ subject }: CardType) => {
  const navigate = useNavigate();
  const { handleClick } = useSubjectContext();

  return (
    <div
      className={styles.cardContainer}
      onClick={() => {
        navigate(`/${subject.id}/`);
        handleClick(subject);
      }}
    >
      <div className={styles.cardColor}></div>
      <section>{subject.name}</section>
    </div>
  );
};
