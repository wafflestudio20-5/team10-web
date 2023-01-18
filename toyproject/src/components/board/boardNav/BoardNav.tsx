import React from 'react';
import styles from './BoardNav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardList,
  faClipboardQuestion,
} from '@fortawesome/free-solid-svg-icons';
export default function BoardNav() {
<<<<<<< Updated upstream
=======
  const { subjectname } = useParams();
  console.log(subjectname);

>>>>>>> Stashed changes
  return (
    <div className={styles.wrapper}>
      <h2>전체 게시판</h2>
      <nav>
        <ul>
          <li>
            <FontAwesomeIcon icon={faClipboardList} size='lg'></FontAwesomeIcon>
            &nbsp; 공지 게시판
          </li>
          <li>
            <FontAwesomeIcon icon={faClipboardQuestion} size='lg' />
            &nbsp; qna 게시판
          </li>
        </ul>
      </nav>
    </div>
  );
}
