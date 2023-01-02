import React from 'react';
import styles from './BoardNav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardList,
  faClipboardQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export default function BoardNav() {
  return (
    <div className={styles.wrapper}>
      <h2>전체 게시판</h2>
      <nav>
        <ul>
          <li>
            <Link to='/:subjectname/noticeboard'>
              <FontAwesomeIcon
                icon={faClipboardList}
                size='lg'
              ></FontAwesomeIcon>
              &nbsp; 공지 게시판
            </Link>
          </li>
          <li>
            <Link to='/:subjectname/qnaboard'>
              <FontAwesomeIcon icon={faClipboardQuestion} size='lg' />
              &nbsp; qna 게시판
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
