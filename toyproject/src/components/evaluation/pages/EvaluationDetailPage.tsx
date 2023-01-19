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
        <div className={styles.table}>
          <div className={styles['table-row']}>
            <div className={styles['table-cell']}>
              <div className={styles['title-answer']}>평가문항</div>
            </div>
            <div className={styles['table-cell']}></div>
            <div className={styles['table-cell']}>답변</div>
          </div>
          <EvaluateList></EvaluateList>
          <div className={styles['table-row']}>
            <div className={styles['table-cell']}>1.</div>
            <div className={styles['table-cell']}>
              이 강의는 전체적으로 만족스러웠다.
            </div>
            <EvaluateCheckList></EvaluateCheckList>
          </div>
          <div className={styles['table-row']}>
            <div className={styles['table-cell']}>2.</div>
            <div className={styles['table-cell']}>
              강의 준비와 강의 내용이 충실하였다.
            </div>
            <EvaluateCheckList></EvaluateCheckList>
          </div>
          <div className={styles['table-row']}>
            <div className={styles['table-cell']}>3.</div>
            <div className={styles['table-cell']}>교욱방법이 효과적이었다.</div>
            <EvaluateCheckList></EvaluateCheckList>
          </div>
          <div className={styles['table-row']}>
            <div className={styles['table-cell']}>4.</div>
            <div className={styles['table-cell']}>
              이 강의는 매우 만족스러우므로 주위에 수강을 권고하겠다.
            </div>
            <EvaluateCheckList></EvaluateCheckList>
          </div>
          <div className={styles['table-row']}>
            <div className={styles['table-cell']}>5.</div>
            <div className={styles['table-cell']}>
              과제나 시험에 대한 담당 강의자의 피드백은 도움이 되었다.
            </div>
            <EvaluateCheckList></EvaluateCheckList>
          </div>
          <div className={styles['table-row']}>
            <div className={styles['table-cell']}>6.</div>
            <div className={styles['table-cell']}>
              강의자는 결강 없이 충실히 진행되었다.
            </div>
            <EvaluateCheckList></EvaluateCheckList>
          </div>
          <div className={styles['table-row']}>
            <div className={styles['table-cell']}>7.</div>
            <div className={styles['table-cell']}>
              이 강의를 통해 내 역량이 향상되었다.
            </div>
            <EvaluateCheckList></EvaluateCheckList>
          </div>
        </div>
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
