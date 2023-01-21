import React from 'react';
import styles from './EvaluationPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import { useSubjectContext } from '../../../context/SubjectContext';
import EvaluateList from '../evalComponents/EvaluateList';
export default function EvaluationPage() {
  const { mySubjects } = useSubjectContext();

  return (
    <div className={styles.wrapper}>
      <SideNavBar></SideNavBar>
      <div className={styles.right}>
        <div className={styles.header}>강의 평가</div>
        <div className={styles['sub-title']}>강의평가대상 교과목 목록</div>
        <div className={styles.list}>
          <div className={styles['title-container']}>
            <div className={styles.subject}>교과목명</div>
            <div className={styles.professor}>담당교수</div>
            <div className={styles.evaluated}>평가여부</div>
            <div className={styles.evaluation}>강의평가</div>
          </div>
          <ul>
            {mySubjects &&
              mySubjects.map((subject) => {
                return (
                  <EvaluateList
                    key={subject.id}
                    subject={subject}
                  ></EvaluateList>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
