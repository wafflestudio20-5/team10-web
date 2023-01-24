import React from 'react';
import styles from './BoardNav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardList,
  faClipboardQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
export default function BoardNav() {
  const { subjectname } = useParams();

  return (
    <div className={styles.wrapper}>
      <h2>전체 게시판</h2>
      <nav>
        <ul>
          <li>
            <Link to={`/${subjectname}/announcements`}>
              <FontAwesomeIcon
                icon={faClipboardList}
                size='lg'
              ></FontAwesomeIcon>
              &nbsp;<span> 공지 게시판</span>
            </Link>
          </li>
          <li>
            <Link to={`/${subjectname}/questions`}>
              <FontAwesomeIcon icon={faClipboardQuestion} size='lg' />
              &nbsp; Q&A 게시판
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
