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
            <div className={styles.professor}>담당교수명</div>
            <div className={styles.evaluation}>강의평가</div>
          </div>
          <ul>
            <EvaluateList name={'수학장인'} professor={'대머리'}></EvaluateList>
            <EvaluateList name={'과학장인'} professor={'대머리'}></EvaluateList>
            <EvaluateList name={'국어장인'} professor={'대머리'}></EvaluateList>
            <EvaluateList name={'사회장인'} professor={'대머리'}></EvaluateList>
          </ul>
          {mySubjects &&
            mySubjects.map((subject) => {
              return (
                <EvaluateList
                  key={subject.id}
                  name={subject.name}
                  professor={subject.created_by.username}
                ></EvaluateList>
              );
            })}
        </div>
      </div>
    </div>
  );
}
