import React from 'react';
import styles from './EvaluationDetailPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import { useSubjectContext } from '../../../context/SubjectContext';
export default function EvaluationDetailPage() {
  const { curSubject } = useSubjectContext();

  //매우그렇다 부분은 component로 관리

  return (
    <div className={styles.wrapper}>
      <SideNavBar></SideNavBar>
      <div className={styles.right}>
        <div className={styles.header}>강의 평가</div>
        <div className={styles['sub-title']}>
          {`${curSubject?.name}`} 강의평가
        </div>
        <div>공통 및 선택 문항</div>
      </div>
    </div>
  );
}

const EvaluateList = () => {
  return (
    <>
      <div className={styles['table-cell']}></div>
      <div className={styles['table-cell']}></div>

      <div className={styles['table-cell']}>매우그렇다</div>
      <div className={styles['table-cell']}>그렇다</div>
      <div className={styles['table-cell']}>보통이다</div>
      <div className={styles['table-cell']}>그렇지않다</div>
      <div className={styles['table-cell']}>매우그렇지않다</div>
    </>
  );
};

const EvaluateCheckList = () => {
  return (
    <>
      <div className={styles['table-cell']}>
        <input type='checkbox'></input>{' '}
      </div>
      <div className={styles['table-cell']}>
        <input type='checkbox'></input>{' '}
      </div>
      <div className={styles['table-cell']}>
        <input type='checkbox'></input>{' '}
      </div>
      <div className={styles['table-cell']}>
        <input type='checkbox'></input>{' '}
      </div>
      <div className={styles['table-cell']}>
        <input type='checkbox'></input>{' '}
      </div>
    </>
  );
};
