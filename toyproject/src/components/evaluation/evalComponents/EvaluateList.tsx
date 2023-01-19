import React from 'react';
import styles from './EvaluateList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

type EvalType = {
  name: string;
  professor: string;
};

export default function EvaluateList({ name, professor }: EvalType) {
  return (
    <li className={styles.wrapper}>
      <FontAwesomeIcon icon={faSquare} color={'#97BDF5'} />
      <div className={styles.subject}>{name}</div>
      <div className={styles.professor}>{professor}</div>
      <button className={styles.evaluation}>강의 평가</button>
    </li>
  );
}
