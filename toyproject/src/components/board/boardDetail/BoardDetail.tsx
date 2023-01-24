import React, { useState, useEffect } from "react";
import styles from "./BoardDetail.module.scss";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PostDetail } from "../../../lib/types";
import {
  apiGetPost,
  apiPostReply,
  apiPatchReply,
  apiDeleteReply,
  apiDeletePost,
} from "../../../lib/api";
import { timestampToDateWithDash } from "../../../lib/formatting";
import { useSessionContext } from "../../../context/SessionContext";
import { useSubjectContext } from "../../../context/SubjectContext";
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
  const [reply, setReply] = useState("");
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
    getPost(token, postId, category);
  }, []);

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

  // 댓글 인풋 상자 관리
  const handleInputReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setReply(e.target.value);
  };

  // 댓글 달기
  const postReply = (
    token: string | null,
    post_id: number,
    content: string
  ) => {
    apiPostReply(token, post_id, content)
      .then((res) => {
        getPost(token, postId, category);
        setReply("");
      })
      .catch((err) => console.log(err));
  };

  // 댓글 수정
  const editReply = (
    token: string | null,
    comment_id: number,
    content: string
  ) => {
    apiPatchReply(token, comment_id, content)
      .then((res) => {
        getPost(token, postId, category);
        setReply("");
      })
      .catch((err) => console.log(err));
  };

  // 댓글 삭제
  const deleteReply = (token: string | null, comment_id: number) => {
    apiDeleteReply(token, comment_id)
      .then((res) => {
        getPost(token, postId, category);
        setReply("");
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
            <div className={styles.content}>조회수</div>
          </div>
        </div>
        <article>{post?.content}</article>
        <div className={styles.buttons}>
          <button
            onClick={(e) => {
              e.preventDefault();
              // editReply(token, comment.id, reply);
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
      <footer>
        <h3>
          <span>댓글</span>
          <button className={styles.numberOfComment}>
            {post?.comment?.length}
          </button>
        </h3>
        {post?.comment?.map((comment) => {
          return (
            <section key={comment.id}>
              <div className={styles.commentCreaterInfo}>
                <span>
                  {`${comment.created_by.username}(${comment.created_by.student_id})`}
                </span>
                <div className={styles.content}>
                  {timestampToDateWithDash(Number(comment?.created_at), "date")}
                  {` `}
                  <FontAwesomeIcon
                    icon={faClock}
                    className={styles.clockIcon}
                  />
                  {` `}
                  {timestampToDateWithDash(Number(comment?.created_at), "time")}
                </div>
                <div className={styles.commentButtons}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      editReply(token, comment.id, reply);
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteReply(token, comment.id);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <p>{comment.content}</p>
            </section>
          );
        })}
        <form>
          <input
            placeholder={"댓글 입력"}
            value={reply}
            onChange={handleInputReply}
            className={styles.replyInput}
          />
          <input
            type='submit'
            className={styles.commentButton}
            value='댓글 등록'
            onClick={(e) => {
              e.preventDefault();
              postReply(token, postId, reply);
            }}
          />
        </form>
      </footer>
      <ToastContainer />
    </div>
  );
}
