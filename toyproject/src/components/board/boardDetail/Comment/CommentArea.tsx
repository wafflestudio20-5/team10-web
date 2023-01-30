import React, { useState } from 'react';
import styles from './CommentArea.module.scss';
import CommentBlock from './CommentBlock';
import { PostDetail } from '../../../../lib/types';
import { apiPostReply } from '../../../../lib/api';
import { useSessionContext } from '../../../../context/SessionContext';

export type CommentAreaPropsType = {
  getPost: (token: string | null, post_id: number, category: string) => void;
  postId: number;
  category: string;
  post: PostDetail | undefined;
};

export default function CommentArea({
  getPost,
  postId,
  category,
  post,
}: CommentAreaPropsType) {
  const [commentInput, setCommentInput] = useState('');
  const { token, getRefreshToken } = useSessionContext();

  // 댓글 인풋 상자 관리
  const handleCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCommentInput(e.target.value);
  };

  // 댓글 달기
  const postComment = (
    token: string | null,
    post_id: number,
    content: string
  ) => {
    const localRefresh = localStorage.getItem('refresh');
    getRefreshToken(localRefresh ? localRefresh : 'temp')
      .then((res) => {
        apiPostReply(res.data.access, post_id, content);
      })
      .then((res) => {
        getPost(token, postId, category);
        setCommentInput('');
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
          <CommentBlock
            key={comment.id}
            getPost={getPost}
            postId={postId}
            category={category}
            post={post}
            comment={comment}
          />
        );
      })}
      <form>
        <input
          placeholder={'댓글 입력'}
          value={commentInput}
          onChange={handleCommentInput}
          className={styles.commentInput}
        />
        <input
          type='submit'
          className={styles.commentButton}
          value='댓글 등록'
          onClick={(e) => {
            e.preventDefault();
            postComment(token, postId, commentInput);
          }}
        />
      </form>
    </div>
  );
}
