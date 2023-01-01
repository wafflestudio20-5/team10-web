import React from 'react';
import styles from './PostingBoard.module.scss';

export default function PostingBoard() {
  return (
    <div className={styles.container}>
      <header>
        <h2>게시글 작성</h2>
        <div className={styles['button-container']}>
          <button>취소</button>
          <button>등록</button>
        </div>
      </header>
      <body>
        <div className={styles.name}>제목 내용 파일첨부</div>
        <div className={styles['input-container']}> 여기 본문</div>
      </body>
    </div>
  );
}
