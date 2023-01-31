import React, { useState } from 'react';
import styles from './CommentBlock.module.scss';
import { Comment } from '../../../../lib/types';
import { CommentAreaPropsType } from './CommentArea';
import { apiPatchReply, apiDeleteReply } from '../../../../lib/api';
import { timestampToDateWithDash } from '../../../../lib/formatting';
import { useSessionContext } from '../../../../context/SessionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CommentPropsType = CommentAreaPropsType & {
  comment: Comment;
};

export default function CommentBlock({
  getPost,
  postId,
  category,
  comment,
}: CommentPropsType) {
  const [commentUpdating, setCommentUpdating] = useState(false);
  const [commentEditInput, setCommentEditInput] = useState(comment.content);
  const { token, user, getRefreshToken } = useSessionContext();

  // 댓글 수정 인풋 상자 관리
  const handleCommentEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCommentEditInput(e.target.value);
  };

  // 댓글 수정
  const editComment = async (
    token: string | null,
    comment_id: number,
    content: string
  ) => {
    try {
      const localRefresh = localStorage.getItem('refresh');
      const res = await getRefreshToken(localRefresh ? localRefresh : 'temp');
      await apiPatchReply(res.data.access, comment_id, content);
      await getPost(res.data.access, postId, category);
      setCommentEditInput(content);
      setCommentUpdating(false);
    } catch (err: any) {
      if (err.response.status === 400) {
        toast('수정할 댓글 내용을 입력하세요.', {
          position: 'top-center',
          theme: 'colored',
        });
      }
    }
  };

  // 댓글 삭제
  const deleteComment = async (token: string | null, comment_id: number) => {
    try {
      const localRefresh = localStorage.getItem('refresh');
      const res = await getRefreshToken(localRefresh ? localRefresh : 'temp');
      await apiDeleteReply(res.data.access, comment_id);
      await getPost(res.data.access, postId, category);
    } catch (e) {
      console.log(e);
    }
  };

  return commentUpdating ? (
    <div key={comment.id} className={styles.commentBlockWrapper}>
      <div className={styles.commentCreaterInfo}>
        <span>
          {`${comment.created_by.username}(${comment.created_by.student_id})`}
        </span>
        <div className={styles.content}>
          {timestampToDateWithDash(Number(comment?.created_at), 'date')}
          {` `}
          <FontAwesomeIcon icon={faClock} className={styles.clockIcon} />
          {` `}
          {timestampToDateWithDash(Number(comment?.created_at), 'time')}
        </div>
      </div>
      <div className={styles.commentInputContainer}>
        <form>
          <input
            placeholder={'댓글 입력'}
            value={commentEditInput}
            onChange={handleCommentEditInput}
            className={styles.commentEditInput}
          />
          <div className={styles.editButtons}>
            <button
              className={styles.editButton}
              onClick={(e) => {
                e.preventDefault();
                setCommentEditInput(comment.content);
                setCommentUpdating(false);
              }}
            >
              취소
            </button>
            <input
              type='submit'
              className={styles.editButton}
              value='완료'
              onClick={async (e) => {
                e.preventDefault();
                await editComment(token, comment.id, commentEditInput);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div key={comment.id} className={styles.commentBlockWrapper}>
      <div className={styles.commentCreaterInfo}>
        <span>
          {`${comment.created_by.username}(${comment.created_by.student_id})`}
        </span>
        <div className={styles.content}>
          {timestampToDateWithDash(Number(comment?.created_at), 'date')}
          {` `}
          <FontAwesomeIcon icon={faClock} className={styles.clockIcon} />
          {` `}
          {timestampToDateWithDash(Number(comment?.created_at), 'time')}
        </div>
        {comment.created_by.id === user?.id && (
          <div className={styles.commentButtons}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setCommentUpdating(true);
              }}
            >
              수정
            </button>
            <button
              onClick={async (e) => {
                e.preventDefault();
                await deleteComment(token, comment.id);
              }}
            >
              삭제
            </button>
          </div>
        )}
      </div>
      <p>{comment.content}</p>
      <ToastContainer />
    </div>
  );
}
