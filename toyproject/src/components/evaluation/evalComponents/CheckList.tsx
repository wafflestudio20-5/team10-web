import React from 'react';
import styles from './CheckList.module.scss';

export default function CheckList() {
  return (
    <div className={styles['grid-container']}>
      <div className={styles.title1}>평가문항</div>
      <div className={styles.title2}>답변</div>
      <EvaluateList></EvaluateList>
      <EvaluateArticleAndCheckList
        index={1}
        content={'이 강의는 전체적으로 만족스러웠다.'}
      />
      <EvaluateArticleAndCheckList
        index={2}
        content={'강의 준비와 강의 내용이 충실하였다.'}
      />
      <EvaluateArticleAndCheckList
        index={3}
        content={'교육 방법이 효과적이었다.'}
      />
      <EvaluateArticleAndCheckList
        index={4}
        content={'이 강의는 매우 만족스러우므로 주위에 수강을 권고하겠다.'}
      />
      <EvaluateArticleAndCheckList
        index={5}
        content={'과제나 시험에 대한 담당 강의자의 피드백은 도움이 되었다.'}
      />
      <EvaluateArticleAndCheckList
        index={6}
        content={'강의자는 결강 없이 충실히 진행되었다.'}
      />
      <EvaluateArticleAndCheckList
        index={7}
        content={'이 강의를 통해 내 역량이 향상되었다.'}
      />
    </div>
  );
}

const EvaluateList = () => {
  return (
    <>
      <div className={styles.item}>매우그렇다</div>
      <div className={styles.item}>그렇다</div>
      <div className={styles.item}>보통이다</div>
      <div className={styles.item}>그렇지않다</div>
      <div className={styles.item}>매우그렇지않다</div>
    </>
  );
};

const EvaluateArticleAndCheckList = ({
  index,
  content,
}: {
  index: number;
  content: string;
}) => {
  return (
    <>
      <div className={styles.item}>{index}.</div>
      <div className={styles.item}>{content}</div>
      <div className={styles.item}>
        <input type='checkbox'></input>
      </div>
      <div className={styles.item}>
        <input type='checkbox'></input>
      </div>
      <div className={styles.item}>
        <input type='checkbox'></input>
      </div>
      <div className={styles.item}>
        <input type='checkbox'></input>
      </div>
      <div className={styles.item}>
        <input type='checkbox'></input>
      </div>
    </>
  );
};
