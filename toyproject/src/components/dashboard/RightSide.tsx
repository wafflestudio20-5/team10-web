import React from 'react';
import styles from './RightSide.module.scss';

export const RightSide = () => {
  return (
    <div className={styles.wrapper}>
      <h2>할 일</h2>
      <section>
        <ul>
          <li>수업 OT 공지</li>
          <li>퀴즈 공지</li>
        </ul>
      </section>
      <h2>최근 피드백</h2>
      공부를 열심히 하자
    </div>
  );
};
