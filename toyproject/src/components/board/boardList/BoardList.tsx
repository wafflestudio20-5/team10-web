import React from "react";
import styles from "./BoardList.module.scss";
import { Link, useParams } from "react-router-dom";

type Writing = {
  id: number;
  title: string;
  username: string;
  created_at: string; //임시
  viewed: number; //구현할 건지 백엔드와 의논
};

type BoardListType = {
  category: string;
};

const InitialWritings: Writing[] = [
  {
    id: 1,
    title: "첫번째",
    username: "광휘",
    created_at: "2023-01-01",
    viewed: 1,
  },
  {
    id: 2,
    title: "새해복",
    username: "광휘",
    created_at: "2023-01-01",
    viewed: 1,
  },
  {
    id: 3,
    title: "많이받으세요",
    username: "광휘",
    created_at: "2023-01-01",
    viewed: 1,
  },
];

export default function BoardList({ category }: BoardListType) {
  const { subjectname } = useParams();

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
          {InitialWritings.map((item) => {
            return (
              <li key={item.id}>
                <span className={styles.no}>{item.id}</span>
                <span className={styles.title} key={item.id}>
                  <Link to={`/${subjectname}/${category}/${item.id}`}>
                    {item.title}
                  </Link>
                </span>
                <span className={styles.username} key={item.id}>
                  {item.username}
                </span>
                <span className={styles.created_at} key={item.id}>
                  {item.created_at}
                </span>
                <span className={styles.viewed} key={item.id}>
                  {item.viewed}
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
