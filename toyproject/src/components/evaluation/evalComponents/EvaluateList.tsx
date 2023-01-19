import React from 'react';
import styles from './EvaluateList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

type EvalType = {
  id: number;
  name: string;
  professor: string;
};

export default function EvaluateList({ id, name, professor }: EvalType) {
  const navigate = useNavigate();

  const goToDetailPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/evaluation/${id}`);
  };

  return (
    <li className={styles.wrapper}>
      <FontAwesomeIcon icon={faSquare} color={'#97BDF5'} />
      <div className={styles.subject}>{name}</div>
      <div className={styles.professor}>{professor}</div>
      <div className={styles.evaluation}>
        <button onClick={goToDetailPage}>강의 평가</button>
      </div>
    </li>
  );
}
