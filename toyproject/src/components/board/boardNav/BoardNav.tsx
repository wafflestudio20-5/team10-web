import React from 'react';
import styles from './BoardNav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
export default function BoardNav() {
  return (
    <div className={styles.wrapper}>
      <h2>전체 게시판</h2>
      <nav>
        <ul>
          <FontAwesomeIcon icon={faClipboardQuestion} />
          <li>공지 게시판</li>
          <li>qna 게시판</li>
        </ul>
      </nav>
    </div>
  );
}
