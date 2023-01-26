import React, { useState, useEffect } from "react";
import styles from "./BoardDetail.module.scss";
import Comment from "./Comment";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PostDetail } from "../../../lib/types";
import { apiGetPost, apiDeletePost } from "../../../lib/api";
import { timestampToDateWithDash } from "../../../lib/formatting";
import { useSessionContext } from "../../../context/SessionContext";
import { boardIdentifier } from "../../../lib/formatting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BoardDetail() {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const postId = Number(location.pathname.split("/")[3]);
  const { token } = useSessionContext();
  const { subjectid } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostDetail>();

  // 게시글 세부사항 불러오기
  const getPost = (token: string | null, post_id: number, category: string) => {
    apiGetPost(token, post_id, category)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (token) {
      getPost(token, postId, category);
    }
  }, [token]);

  // 게시글 삭제하기
  const deletePost = (
    token: string | null,
    post_id: number | undefined,
    category: string
  ) => {
    apiDeletePost(token, post_id, category)
      .then((res) => {
        toast("게시글을 성공적으로 삭제했습니다.", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
        });
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <h2>{boardIdentifier(category)} 게시판</h2>
        <Link to={`/${subjectid}/${category}`}>
          <button className={styles.listButton}>목록</button>
        </Link>
      </header>
      <section>
        <h2>{post?.title}</h2>
        <div className={styles.explainContainer}>
          <div className={styles.flex}>
            <div className={styles.contentName}>작성자:</div>
            <div className={styles.content}>{post?.created_by.username}</div>
            <div className={styles.contentName}>등록일시:</div>
            <div className={styles.content}>
              {timestampToDateWithDash(Number(post?.created_at), "date")}
              {` `}
              <FontAwesomeIcon icon={faClock} className={styles.clockIcon} />
              {` `}

              {timestampToDateWithDash(Number(post?.created_at), "time")}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.contentName}>조회수:</div>
            <div className={styles.content}>{post?.hits}</div>
          </div>
        </div>
        <article>{post?.content}</article>
        <div className={styles.buttons}>
          <button
            onClick={(e) => {
              e.preventDefault();
              // editPost(token, comment.id, reply);
            }}
          >
            수정
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              deletePost(token, post?.id, category);
            }}
          >
            삭제
          </button>
        </div>
        <div className={styles.previousContainer}>
          <div className={styles.previousTitle}>이전글</div>
          <div className={styles.previous}>어쩌구 저쩌구</div>
        </div>
      </section>
      <Comment
        getPost={getPost}
        postId={postId}
        category={category}
        post={post}
      />
      <ToastContainer />
    </div>
  );
}
