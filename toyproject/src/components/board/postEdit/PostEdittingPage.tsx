import { useState, useEffect } from "react";
import styles from "./PostEdittingPage.module.scss";
import SubjectTemplate from "../../SubjectTemplate";
import { boardIdentifier } from "../../../lib/formatting";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSessionContext } from "../../../context/SessionContext";
import { apiPatchPost, apiGetPost } from "../../../lib/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostEdittingPage() {
  const { subjectid } = useParams();
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const postId = Number(location.pathname.split("/")[3]);
  const { token } = useSessionContext();
  const [titleEditInput, setTitleEditInput] = useState("");
  const [contentEditInput, setContentEditInput] = useState("");
  const navigate = useNavigate();

  // 게시글 내용 불러오기
  const getPostContent = (
    token: string | null,
    post_id: number,
    category: string
  ) => {
    apiGetPost(token, post_id, category)
      .then((res) => {
        setTitleEditInput(res.data.title);
        setContentEditInput(res.data.content);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (token) {
      getPostContent(token, postId, category);
    }
  }, [token]);

  // titleEditInput 상자 관리
  const handleTitleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitleEditInput(e.target.value);
  };

  // contentEditInput 상자 관리
  const handleContentEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setContentEditInput(e.target.value);
  };

  // 게시글 올리기
  const editPost = (
    token: string | null,
    post_id: number,
    title: string,
    content: string,
    category: string
  ) => {
    apiPatchPost(token, post_id, title, content, category)
      .then((res) => {
        toast("게시글을 성공적으로 수정했습니다.", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
        });
        setTitleEditInput("");
        setContentEditInput("");
        // navigate(-1);
        goBack();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast("수정할 제목과 내용을 입력하세요.", {
            position: "top-center",
            theme: "colored",
          });
        }
      });
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <SubjectTemplate
      subject={`${subjectid as string}`}
      page='게시판'
      content={boardIdentifier(category)}
    >
      <div className={styles.container}>
        <form>
          <header>
            <h2>게시글 수정</h2>
            <div className={styles.buttonContainer}>
              <button className={styles.cancel} onClick={goBack}>
                취소
              </button>
              <input
                type='submit'
                className={styles.submit}
                value='등록'
                onClick={(e) => {
                  e.preventDefault();
                  editPost(
                    token,
                    Number(postId),
                    titleEditInput,
                    contentEditInput,
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
                value={titleEditInput}
                onChange={handleTitleEditInput}
                className={styles.titleInput}
              ></input>
              <input
                placeholder='내용 입력'
                value={contentEditInput}
                onChange={handleContentEditInput}
                className={styles.contentInput}
              ></input>
            </div>
          </section>
        </form>
        <ToastContainer />
      </div>
    </SubjectTemplate>
  );
}