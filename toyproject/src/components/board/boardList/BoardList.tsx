import React, { useState, useEffect } from "react";
import styles from "./BoardList.module.scss";
import { Link, useParams } from "react-router-dom";
import { Post } from "../../../lib/types";
import { apiPostList } from "../../../lib/api";
import { useSessionContext } from "../../../context/SessionContext";
import { useSubjectContext } from "../../../context/SubjectContext";

type BoardListType = {
  category: string;
};

export default function BoardList({ category }: BoardListType) {
  const { subjectname } = useParams();
  const { token } = useSessionContext();
  const { curSubject } = useSubjectContext();
  const [postList, setPostList] = useState<Post[]>([]);

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
        <h2>{subjectname} - 과목 게시판</h2>
        <Link to={`/${subjectname}/board/new`}>
          <button className={styles.createButton}>글쓰기</button>
        </Link>
      </header>
      <div className={styles.explain}>
        {subjectname}의 게시판입니다. 공지 및 각종 질문을 올리는 곳입니다.
      </div>
      <div className={styles.searchContainer}>
        검색결과 - number 개<input placeholder='검색어입력'></input>
      </div>
      <section>
        <div className={styles.category}>
          <span className={styles.no}>no</span>
          <span className={styles.title}>제목</span>
          <span className={styles.username}>작성자</span>
          <span className={styles.created_at}>등록일시</span>
          <span className={styles.viewed}>조회수</span>
        </div>
        <ul>
          {postList.map((post) => {
            return (
              <li key={post.id}>
                <span className={styles.no}>{post.id}</span>
                <span className={styles.title} key={post.id}>
                  <Link to={`/${subjectname}/${category}/${post.id}`}>
                    {post.title}
                  </Link>
                </span>
                <span className={styles.username} key={post.id}>
                  {post.created_by.username}
                </span>
                <span className={styles.created_at} key={post.id}>
                  {post.created_at}
                </span>
                <span className={styles.viewed} key={post.id}>
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
