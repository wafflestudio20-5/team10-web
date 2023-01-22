import React from 'react';
import styles from './FreeAnswer.module.scss';

type FreeAnswerType = {
  handleGoodPoint: (input: string) => void;
  handleBadPoint: (input: string) => void;
};

export default function FreeAnswer({
  handleGoodPoint,
  handleBadPoint,
}: FreeAnswerType) {
  const onChangeGoodPoint = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    handleGoodPoint(event.target.value);
  };

  const onChangeBadPoint = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    handleBadPoint(event.target.value);
  };

  return (
    <div className={styles.grid}>
      <div className={styles.item}>1</div>
      <div className={styles.question}>
        이 강의에서 좋았던 점을 적어 주십시오.
      </div>
      <div className={styles.textarea}>
        <textarea onChange={onChangeGoodPoint}></textarea>
      </div>
      <div className={styles.item}>2</div>
      <div className={styles.question}>
        이 강의에서 개선할 점이 있다면 적어 주십시오.
      </div>
      <div className={styles.textarea}>
        <textarea onChange={onChangeBadPoint}></textarea>
      </div>
    </div>
  );
}
