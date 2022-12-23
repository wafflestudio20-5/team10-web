import React from 'react';
import styles from './dashBoard.module.scss';
import { Subjects } from '../subjects/subjects';

export const DashBoard = () => {
  return (
    <div className={styles.wrapper}>
      <h1>대시보드</h1>
      <section>
        <Subjects />
      </section>
    </div>
  );
};
