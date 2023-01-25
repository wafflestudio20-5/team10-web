import React, { useState, useEffect } from 'react';
import styles from './BoardList.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Post } from '../../../lib/types';
import { boardIdentifier } from '../../../lib/formatting';
import { apiGetPostList, apiGetSubjectInfo } from '../../../lib/api';
import { useSessionContext } from '../../../context/SessionContext';
import { timestampToDateWithDash } from '../../../lib/formatting';
import Searchbar from '../../Searchbar';

type BoardListType = {
  category: string;
};

export default function BoardList({ category }: BoardListType) {
  const { token } = useSessionContext();
  const { subjectid } = useParams();
  const [postList, setPostList] = useState<Post[]>([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const getPostList = (
    token: string | null,
    class_id: number,
    category: string
  ) => {
    apiGetPostList(token, class_id, category)
      .then((res) => {
        setPostList(res.data.results);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    (async () => {
      const id = Number(subjectid);
      getPostList(token, id, category);
      const res = await apiGetSubjectInfo(token, id);
      setSubTitle(res.data.name);
    })();
  }, [subjectid, token]);

  return (
    <div className={styles.wrapper}>
      <header>
        <h2>{boardIdentifier(category)} 게시판</h2>
        <Link to={`/${subjectid}/${category}/new`}>
          <button className={styles.createButton}>글쓰기</button>
        </Link>
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
                  {post.title}
                  {` `}
                  {/* {post.댓글개수} */}
                </span>
                <span>{post.created_by.username}</span>
                <span>
                  {timestampToDateWithDash(Number(post?.created_at), 'date')}
                </span>
                <span>
                  {/* {post.viewed} */}
                  조회수
                </span>
              </li>
            );
          })}
        </ul>
      </section>
      <footer></footer>
    </div>
  );
}