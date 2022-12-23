import React from 'react';
import styles from './dashBoard.module.scss';
import { Cards } from '../cards/cards';

export const DashBoard = () => {
  return (
    <div className={styles.wrapper}>
      <h1>대시보드</h1>
      <section>
        <Cards />
      </section>
    </div>
  );
};
