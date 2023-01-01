import React, {useState} from 'react';
import styles from './SubjectTemplate.module.scss';
import {SideNavBar} from "./sideNavbar/SideNavBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faChevronRight} from "@fortawesome/free-solid-svg-icons";

const ListElement = ({ current, name }: { current: string; name: string }) => {
  return (
    <li className={current === name ? styles.current : undefined}>
      {name}
      {current === name && (
        <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
      )}
    </li>
  );
};

export default function SubjectTemplate({
  subject,
  page,
  content,
  children,
}: {
  subject: string; // 과목명
  page: string; // 세부 페이지 종류 (ex. 모듈, 게시판, 과제 등등)
  content?: string | undefined; // 세부 항목의 제목 (ex. 게시글 제목. 페이지의 메인 화면이면 undefined)
  children?: React.ReactNode;
}) {
  const [toggleNav, setToggleNav] = useState<boolean>(true);
  const pages = ["모듈", "게시판", "강의계획서", "수강생", "과제", "성적"];

  return (
    <div className={styles.wrapper}>
      <SideNavBar />
      <div className={styles.right}>
        <header className={styles.header}>
          <FontAwesomeIcon
            icon={faBars}
            className={styles.nav_icon}
            onClick={() => setToggleNav(!toggleNav)}
          />
          <p className={styles.title}>{subject}</p>
          <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
          <p className={styles.title}>{page}</p>
          {content && (
            <div className={`${styles.header} ${styles.content}`}>
              <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
              <p className={styles.title}>{content}</p>
            </div>
          )}
        </header>
        <div className={styles.body}>
          {toggleNav && (
            <nav className={styles.nav}>
              <p className={styles.semester}>2022년 2학기</p>
              <ul>
                <ListElement current={page} name='모듈' />
                <ListElement current={page} name='게시판' />
                <ListElement current={page} name='강의계획서' />
                <ListElement current={page} name='수강생' />
                <ListElement current={page} name='과제' />
                <ListElement current={page} name='성적' />
              </ul>
            </nav>
          )}
          <article>{children}</article>
        </div>
      </div>
    </div>
  );
}
