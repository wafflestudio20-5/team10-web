import React from 'react';
import styles from './BoardDetail.module.scss';

export default function BoardDetail() {
  //useEffect로 호출하기?

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>제목</h1>
        <button className={styles['list-button']}>목록</button>
      </header>
      <section>
        <h2>강의자료 어쩌구 저쩌구</h2>
        <div className={styles['explain-container']}>
          <div className={styles.flex}>
            <div className={styles['content-name']}>작성자:</div>
            <div className={styles['content']}> 안광휘</div>
            <div className={styles['content-name']}>등록일시:</div>
            <div className={styles['content']}>2022-12-12</div>
          </div>
          <div className={styles.flex}>
            <div className={styles['content-name']}>조회수:</div>
            <div className={styles['content']}>10</div>
          </div>
        </div>
        <article>본문</article>
        <div className={styles['previous-container']}>
          <div className={styles['previous-title']}>이전글</div>
          <div className={styles.previous}>어쩌구 저쩌구</div>
        </div>
      </section>
      <footer>
        <h3>댓글</h3>
        <textarea placeholder={'댓글입력'}></textarea>
        <button className={styles['comment-button']}>댓글등록</button>
      </footer>
    </div>
  );
}
