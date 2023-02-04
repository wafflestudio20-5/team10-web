import { useState, useEffect } from "react";
import styles from "./BoardDetail.module.scss";
import CommentArea from "./Comment/CommentArea";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PostDetail, PostForPrevAndNex } from "../../../lib/types";
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
  const { token, user, getRefreshToken } = useSessionContext();
  const { subjectid } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostDetail>();
  const [prevPost, setPrevPost] = useState<PostForPrevAndNex>();
  const [nextPost, setNextPost] = useState<PostForPrevAndNex>();

  // 게시글 세부사항 불러오기
  const getPost = (token: string | null, post_id: number, category: string) => {
    apiGetPost(token, post_id, category)
      .then((res) => {
        console.log(res.data);
        setPost(res.data.post_info);
        setPrevPost(res.data.prev_post);
        setNextPost(res.data.next_post);
      })
      .catch((err) =>
        toast("게시글을 불러오지 못했습니다. 다시 시도해주세요.", {
          position: "top-center",
          theme: "colored",
        })
      );
  };

  useEffect(() => {
    (async () => {
      try {
        getPost(token, postId, category);
      } catch {
        const localRefreshToken = localStorage.getItem("refresh");
        const resToken = await getRefreshToken(
          localRefreshToken ? localRefreshToken : "temp"
        );
        const newToken = resToken.data.access;
        getPost(newToken, postId, category);
      }
    })();
  }, [token, postId]);

  // 게시글 삭제하기
  const deletePost = async (
    token: string | null,
    post_id: number | undefined,
    category: string
  ) => {
    const localRefresh = localStorage.getItem("refresh");
    const res = await getRefreshToken(localRefresh ? localRefresh : "temp");
    await apiDeletePost(res.data.access, post_id, category);
    toast("게시글을 성공적으로 삭제했습니다.", {
      position: "top-center",
      theme: "colored",
      autoClose: 1000,
    });
    navigate(-1);
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
        {user?.id === post?.created_by.id && (
          <div className={styles.buttons}>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${subjectid}/${category}/${postId}/edit`, {
                  state: { getPost: getPost },
                });
              }}
            >
              수정
            </button>
            <button
              onClick={async (e) => {
                e.preventDefault();
                await deletePost(token, post?.id, category);
              }}
            >
              삭제
            </button>
          </div>
        )}
        {nextPost?.title !== "" && (
          <div
            className={styles.previousContainer}
            onClick={() =>
              navigate(`/${subjectid}/${category}/${nextPost?.id}`)
            }
          >
            <div className={styles.previous}>다음글</div>
            <div className={styles.previousTitle}>
              <span className={styles.literalTitle}>{nextPost?.title}</span>
              <span
                className={styles.commentCount}
              >{`(${nextPost?.comment_count})`}</span>
            </div>
          </div>
        )}
        {prevPost?.title !== "" && (
          <div
            className={styles.previousContainer}
            onClick={() =>
              navigate(`/${subjectid}/${category}/${prevPost?.id}`)
            }
          >
            <div className={styles.previous}>이전글</div>
            <div className={styles.previousTitle}>
              <span className={styles.literalTitle}>{prevPost?.title}</span>
              <span
                className={styles.commentCount}
              >{`(${prevPost?.comment_count})`}</span>
            </div>
          </div>
        )}
      </section>
      <CommentArea
        getPost={getPost}
        postId={postId}
        category={category}
        post={post}
      />
      <ToastContainer />
    </div>
  );
}
