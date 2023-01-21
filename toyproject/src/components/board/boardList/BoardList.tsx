import React, { useState, useEffect } from "react";
import styles from "./BoardList.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Post } from "../../../lib/types";
import { apiPostList } from "../../../lib/api";
import { useSessionContext } from "../../../context/SessionContext";
import { useSubjectContext } from "../../../context/SubjectContext";

type BoardListType = {
  category: string;
};

export function boardIdentifier(category: string) {
  if (category === "announcements") {
    return "공지";
  } else {
    return "Q&A";
  }
}

export default function BoardList({ category }: BoardListType) {
  const { token } = useSessionContext();
  const { curSubject } = useSubjectContext();
  const [postList, setPostList] = useState<Post[]>([]);
  const navigate = useNavigate();

  const getPostList = (
    token: string | null,
    class_id: number,
    category: string
  ) => {
    apiPostList(token, class_id, category)
      .then((res) => {
        setPostList(res.data.results);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    curSubject && getPostList(token, curSubject.id, category);
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <h2>{boardIdentifier(category)} 게시판</h2>
        <Link to={`/${curSubject?.name}/board/new`}>
          <button className={styles.createButton}>글쓰기</button>
        </Link>
      </header>
      <div className={styles.explain}>
        {curSubject?.name}의 {boardIdentifier(category)}게시판입니다.
      </div>
      <div className={styles.searchContainer}>
        검색결과 - {postList.length}개<input placeholder='검색어입력'></input>
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
          {postList.map((post) => {
            return (
              <li>
                <span key={post.id}>{post.id}</span>
                <span
                  className={styles.title}
                  key={`${post.title}${post.title}`}
                  onClick={() =>
                    navigate(`/${curSubject?.name}/${category}/${post.id}`)
                  }
                >
                  {post.title}
                </span>
                <span key={`${post.title}${post.created_by.username}`}>
                  {post.created_by.username}
                </span>
                <span key={`${post.title}${post.created_at}`}>
                  {post.created_at}
                </span>
                {/* <span key={post.viewed}>
                  {post.viewed}
                  조회수
                </span> */}
              </li>
            );
          })}
        </ul>
      </section>
      <footer></footer>
    </div>
  );
}
