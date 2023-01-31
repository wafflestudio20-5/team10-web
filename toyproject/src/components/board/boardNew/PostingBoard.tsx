import { useState } from "react";
import styles from "./PostingBoard.module.scss";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSessionContext } from "../../../context/SessionContext";
import { apiPostNewPost } from "../../../lib/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostingBoard() {
  const { subjectid } = useParams();
  const { token, getRefreshToken } = useSessionContext();
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const navigate = useNavigate();

  // titleInput 상자 관리
  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitleInput(e.target.value);
  };

  // contentInput 상자 관리
  const handleContentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContentInput(e.target.value);
  };

  // 게시글 올리기
  const postNewPost = async (
    token: string | null,
    class_id: number,
    title: string,
    content: string,
    category: string
  ) => {
    const localRefresh = localStorage.getItem("refresh");
    const res = await getRefreshToken(localRefresh ? localRefresh : "temp");
    await apiPostNewPost(res.data.access, class_id, title, content, category);
    toast("게시글을 성공적으로 등록했습니다.", {
      position: "top-center",
      theme: "colored",
      autoClose: 1000,
    });
    setTitleInput("");
    setContentInput("");
    navigate(-1);
  };

  const goBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <form>
        <header>
          <h2>게시글 작성</h2>
          <div className={styles.buttonContainer}>
            <button className={styles.cancel} onClick={goBack}>
              취소
            </button>
            <input
              type='submit'
              className={styles.submit}
              value='등록'
              onClick={async (e) => {
                e.preventDefault();
                await postNewPost(
                  token,
                  Number(subjectid),
                  titleInput,
                  contentInput,
                  category
                );
              }}
            />
          </div>
        </header>
        <section>
          <div className={styles.titleContainer}>
            <span className={styles.title}>제목</span>
            <span className={styles.content}>내용</span>
          </div>
          <div className={styles.inputContainer}>
            <input
              placeholder='제목 입력'
              value={titleInput}
              onChange={handleTitleInput}
              className={styles.titleInput}
            />
            <textarea
              placeholder='내용 입력'
              value={contentInput}
              onChange={handleContentInput}
              className={styles.contentInput}
            />
          </div>
        </section>
      </form>
      <ToastContainer />
    </div>
  );
}
