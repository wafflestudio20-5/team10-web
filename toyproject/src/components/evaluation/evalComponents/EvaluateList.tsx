import React from 'react';
import styles from './EvaluateList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSubjectContext } from '../../../context/SubjectContext';

type SubjectType = {
  id: number;
  name: string;
  created_by: {
    username: string;
  };
  is_evaluated: boolean;
};

type EvalType = {
  subject: SubjectType;
};

export default function EvaluateList({ subject }: EvalType) {
  const { handleClick } = useSubjectContext();

  const navigate = useNavigate();

  const goToDetailPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleClick(subject);
    navigate(`/evaluation/${subject.id}`);
  };

  return (
    <li className={styles.wrapper}>
      <FontAwesomeIcon icon={faSquare} color={'#97BDF5'} />
      <div className={styles.subject}>{subject.name}</div>
      <div className={styles.professor}>{subject.created_by.username}</div>
      <div className={styles.evaluated}>
        {subject.is_evaluated ? '평가 완료' : '평가 미완료'}
        {/* 미구현 */}
      </div>
      <div className={styles.evaluation}>
        {subject.is_evaluated ? (
          <div>확정됨</div>
        ) : (
          <button onClick={goToDetailPage}>강의 평가</button>
        )}
      </div>
    </li>
  );
}
