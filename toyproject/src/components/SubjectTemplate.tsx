import React, { useEffect, useState } from 'react';
import styles from './SubjectTemplate.module.scss';
import { SideNavBar } from './sideNavbar/SideNavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { UserBar } from './UserBar/UserBar';
import { apiGetSubjectInfo } from '../lib/api';
import { useSessionContext } from '../context/SessionContext';

const ListElement = ({ current, name }: { current: string; name: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pages = ['모듈', '게시판', '수강생', '과제', '성적'];
  const address = ['', '/boardnav', '/students', '/assignments', '/grades'];
  const subject = location.pathname.split('/')[1];

  return (
    <li
      className={current === name ? styles.current : undefined}
      onClick={() => navigate('../' + subject + address[pages.indexOf(name)])}
    >
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
  subject: string; // id로 수정됨
  page: string; // 세부 페이지 종류 (ex. 모듈, 게시판, 과제 등등)
  content?: string | undefined; // 세부 항목의 제목 (ex. 게시글 제목. 페이지의 메인 화면이면 undefined)
  children?: React.ReactNode;
}) {
  const { token, getRefreshToken } = useSessionContext();
  const [toggleNav, setToggleNav] = useState<boolean>(true);
  const [title, setTitle] = useState('');

  const pages = ['모듈', '게시판', '수강생', '과제', '성적'];
  const address = ['', '/boardnav', '/students', '/assignments', '/grades'];
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        const id = Number(subject);
        const res = await apiGetSubjectInfo(token, id);
        setTitle(res.data.name);
      } catch {
        const id = Number(subject);
        const localRefreshToken = localStorage.getItem('refresh');
        const resToken = await getRefreshToken(
          localRefreshToken ? localRefreshToken : 'temp'
        );
        const newToken = resToken.data.access;
        const res = await apiGetSubjectInfo(newToken, id);
        setTitle(res.data.name);
      }
    })();
  }, [token]);

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
          <Link to={`/${subject}`}>
            <p className={styles.title}>{title}</p>
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
          <Link to={'../' + subject + address[pages.indexOf(page)]}>
            <p className={styles.title}>{page}</p>
          </Link>
          {content && (
            <div className={`${styles.header} ${styles.content}`}>
              <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
              <p className={styles.contentTitle}>{content}</p>
            </div>
          )}
          <UserBar />
        </header>
        <div className={styles.body}>
          {toggleNav && (
            <nav className={styles.nav}>
              <p className={styles.semester}>2022년 2학기</p>
              <ul>
                <ListElement current={page} name='모듈' />
                <ListElement current={page} name='게시판' />
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
