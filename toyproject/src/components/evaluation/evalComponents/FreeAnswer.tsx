import React from 'react';
import styles from './FreeAnswer.module.scss';

export default function FreeAnswer() {
  return (
    <div className={styles.grid}>
      <div className={styles.item}>1</div>
      <div className={styles.question}>
        이 강의에서 좋았던 점을 적어 주십시오.
      </div>
      <div className={styles.textarea}>
        <textarea></textarea>
      </div>
      <div className={styles.item}>2</div>
      <div className={styles.question}>
        이 강의에서 개선할 점이 있다면 적어 주십시오.
      </div>
      <div className={styles.textarea}>
        <textarea></textarea>
      </div>
    </div>
  );
}
