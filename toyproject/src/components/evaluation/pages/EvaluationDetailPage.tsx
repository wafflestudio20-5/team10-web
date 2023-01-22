import React, { useState } from 'react';
import styles from './EvaluationDetailPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import { useSubjectContext } from '../../../context/SubjectContext';
import CheckList from '../evalComponents/CheckList';
import FreeAnswer from '../evalComponents/FreeAnswer';
export default function EvaluationDetailPage() {
  const { curSubject } = useSubjectContext();

  const [goodPoint, setGoodPoint] = useState('');
  const [badPoint, setBadPoint] = useState('');

  const handleGoodPoint = (input: string) => {
    setGoodPoint(input);
  };

  const handleBadPoint = (input: string) => {
    setBadPoint(input);
  };

  return (
    <div className={styles.wrapper}>
      <SideNavBar></SideNavBar>
      <div className={styles.right}>
        <div className={styles.header}>강의 평가</div>
        <div className={styles['sub-title']}>
          {`${curSubject?.name}`} 강의평가
        </div>
        <div className={styles.body}>
          <div className={styles.title}>공통 및 선택 문항</div>
          <CheckList></CheckList>
          <FreeAnswer
            handleGoodPoint={handleGoodPoint}
            handleBadPoint={handleBadPoint}
          ></FreeAnswer>
          <div className={styles['button-container']}>
            <button className={styles.submit}>확정</button>
          </div>
        </div>
      </div>
    </div>
  );
}
