import React from 'react';
import styles from './PostingBoard.module.scss';
import { useBoardContext } from '../../../context/BoardContext';

export default function PostingBoard() {
  const { handleInputContent, handleInputTitle } = useBoardContext();

  //   const onChangeInput = (e: React.ChangeEventHandler<HTMLInputElement>) => {
  //     console.log(e.target.value);
  //   };

  return (
    <div className={styles.container}>
      <header>
        <h2>게시글 작성</h2>
        <div className={styles['button-container']}>
          <button className={styles.cancel}>취소</button>
          <button className={styles.submit}>등록</button>
        </div>
      </header>
      <body>
        <div className={styles['title-container']}>
          <div className={styles.title}>제목</div>
          <div className={styles.content}>내용</div>
        </div>
        <div className={styles['input-container']}>
          <input
            placeholder='제목 입력'
            //   onChange={onChangeInput}
          ></input>
          <textarea placeholder='내용 입력'></textarea>
        </div>
      </body>
    </div>
  );
}
