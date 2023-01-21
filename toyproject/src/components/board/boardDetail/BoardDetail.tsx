import React, { useState } from "react";
import styles from "./BoardDetail.module.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import { Post } from "../../../lib/types";
import { apiPostList } from "../../../lib/api";
import { useSessionContext } from "../../../context/SessionContext";
import { useSubjectContext } from "../../../context/SubjectContext";
import { boardIdentifier } from "../boardList/BoardList";

export default function BoardDetail() {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const { token } = useSessionContext();
  const { curSubject } = useSubjectContext();
  const [reply, setReply] = useState("");

  const handleInputReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //fetch 함수부분
    setReply("");
  };

  //useEffect로 호출하기?

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit}>
        <header>
          <h2>{boardIdentifier(category)} 게시판</h2>
          <Link to={`/${curSubject?.name}/${category}`}>
            <button className={styles.listButton}>목록</button>
          </Link>
        </header>
        <section>
          <h2>강의자료 어쩌구 저쩌구</h2>
          <div className={styles.explainContainer}>
            <div className={styles.flex}>
              <div className={styles.contentName}>작성자:</div>
              <div className={styles.content}> 안광휘</div>
              <div className={styles.contentName}>등록일시:</div>
              <div className={styles.content}>2022-12-12</div>
            </div>
            <div className={styles.flex}>
              <div className={styles.contentName}>조회수:</div>
              <div className={styles.content}>10</div>
            </div>
          </div>
          <article>본문</article>
          {/* 여기 previous id 혹은 본문 받아서 연결해야 함*/}
          <div className={styles.previousContainer}>
            <div className={styles.previousTitle}>이전글</div>
            <div className={styles.previous}>어쩌구 저쩌구</div>
          </div>
        </section>
        <footer>
          <h3>댓글</h3>
          <textarea
            placeholder={"댓글입력"}
            onChange={handleInputReply}
          ></textarea>
          <button className={styles.commentButton}>댓글등록</button>
        </footer>
      </form>
    </div>
  );
}
