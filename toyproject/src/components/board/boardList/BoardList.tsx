import React, { useState, useEffect } from 'react';
import styles from './BoardList.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PostinPostList } from '../../../lib/types';
import { boardIdentifier } from '../../../lib/formatting';
import {
  apiGetPostList,
  apiGetSubjectInfo,
  apiRefreshToken,
} from '../../../lib/api';
import { useSessionContext } from '../../../context/SessionContext';
import { timestampToDateWithDash } from '../../../lib/formatting';
import Searchbar from '../../Searchbar';

type BoardListType = {
  category: string;
};

export default function BoardList({ category }: BoardListType) {
  const { token, setToken, user, getRefreshToken } = useSessionContext();
  const { subjectid } = useParams();

  const [postList, setPostList] = useState<PostinPostList[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [totalNum, setTotalNum] = useState<number>(0);
  const [activeButton, setActiveButton] = useState({ activate: 0 });

  const navigate = useNavigate();

  const getPostList = (
    token: string | null,
    class_id: number,
    category: string,
    page: number
  ) => {
    apiGetPostList(token, class_id, category, page)
      .then((res) => {
        setPostList(res.data.results);
        setTotalNum(res.data.count);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    (async () => {
      const id = Number(subjectid);
      const localRefreshToken = localStorage.getItem('refresh');
      const resToken = await getRefreshToken(
        localRefreshToken ? localRefreshToken : 'temp'
      );
      getPostList(resToken.data.access, id, category, 1);
      const res = await apiGetSubjectInfo(resToken.data.access, id);
      setSubTitle(res.data.name);
    })();
  }, [subjectid]);

  const goToPage = async (
    event: React.MouseEvent<HTMLButtonElement>,
    page: number,
    idx: number
  ) => {
    const id = Number(subjectid);
    event.preventDefault();
    getPostList(token, id, category, page);
    setActiveButton({ ...activeButton, activate: idx });
  };

  const buttonCount = Math.ceil(totalNum / 10);

  return (
    <div className={styles.wrapper}>
      <header>
        <h2>{boardIdentifier(category)} 게시판</h2>
        {category === 'announcements' ? (
          user?.is_professor === true && (
            <Link to={`/${subjectid}/${category}/new`}>
              <button className={styles.createButton}>글쓰기</button>
            </Link>
          )
        ) : (
          <Link to={`/${subjectid}/${category}/new`}>
            <button className={styles.createButton}>글쓰기</button>
          </Link>
        )}
        {/* {category === "questions" && user?.is_professor === false && (
          <Link to={`/${subjectid}/${category}/new`}>
            <button className={styles.createButton}>글쓰기</button>
          </Link>
        )} */}
      </header>
      <div className={styles.explain}>
        {subTitle}의 {boardIdentifier(category)}게시판입니다.
      </div>
      <div className={styles.searchContainer}>
        검색결과 - {postList.length}개
        <Searchbar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          inputPlaceHolder='검색어 입력'
        />
      </div>
      <section>
        <div className={styles.category}>
          <span>No</span>
          <span>제목</span>
          <span>작성자</span>
          <span>등록일시</span>
          <span>조회수</span>
        </div>
        <ul>
          {postList.map((post, idx) => {
            return (
              <li key={post.id}>
                <span>{postList.length - idx}</span>
                <span
                  className={styles.title}
                  onClick={() =>
                    navigate(`/${subjectid}/${category}/${post.id}`)
                  }
                >
                  <span className={styles.literalTitle}>{post.title}</span>
                  <span
                    className={styles.commentCount}
                  >{` (${post.comment_count})`}</span>
                </span>
                <span>{post.created_by.username}</span>
                <span>
                  {timestampToDateWithDash(Number(post?.created_at), 'date')}
                </span>
                <span>{post.hits}</span>
              </li>
            );
          })}
        </ul>
      </section>
      <footer>
        <div className={styles['button-container']}>
          {Array.from({ length: buttonCount }).map((_, idx) => (
            <button
              className={`${styles['nav-button']} ${
                activeButton.activate === idx ? styles['active'] : ''
              }`}
              key={idx}
              onClick={(event) => goToPage(event, idx + 1, idx)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
