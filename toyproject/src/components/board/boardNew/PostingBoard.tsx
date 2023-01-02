import React from 'react';
import styles from './PostingBoard.module.scss';
import { useBoardContext } from '../../../context/BoardContext';
import { useNavigate } from 'react-router-dom';

export default function PostingBoard() {
  const { handleInputContent, handleInputTitle } = useBoardContext();
  const navigate = useNavigate();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputTitle(e.target.value);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputContent(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <header>
          <h2>게시글 작성</h2>
          <div className={styles['button-container']}>
            <button className={styles.cancel} onClick={goBack}>
              취소
            </button>
            <button className={styles.submit}>등록</button>
          </div>
        </header>
        <body>
          <div className={styles['title-container']}>
            <div className={styles.title}>제목</div>
            <div className={styles.content}>내용</div>
          </div>
          <div className={styles['input-container']}>
            <input placeholder='제목 입력' onChange={onChangeTitle}></input>
            <textarea
              placeholder='내용 입력'
              onChange={onChangeContent}
            ></textarea>
          </div>
        </body>
      </form>
    </div>
  );
}
