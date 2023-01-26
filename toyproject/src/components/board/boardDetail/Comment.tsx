import React, { useState } from "react";
import styles from "./Comment.module.scss";
import { PostDetail } from "../../../lib/types";
import { apiPostReply, apiPatchReply, apiDeleteReply } from "../../../lib/api";
import { timestampToDateWithDash } from "../../../lib/formatting";
import { useSessionContext } from "../../../context/SessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import "react-toastify/dist/ReactToastify.css";

type CommentPropsType = {
  getPost: (token: string | null, post_id: number, category: string) => void;
  postId: number;
  category: string;
  post: PostDetail | undefined;
};

export default function Comment({
  getPost,
  postId,
  category,
  post,
}: CommentPropsType) {
  const [reply, setReply] = useState("");
  const { token } = useSessionContext();

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
    <div className={styles.commentWrapper}>
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
                <FontAwesomeIcon icon={faClock} className={styles.clockIcon} />
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
    </div>
  );
}
