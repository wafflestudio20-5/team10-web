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
  const { token, getRefreshToken } = useSessionContext();
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
        setTitleEditInput(res.data.post_info.title);
        setContentEditInput(res.data.post_info.content);
      })
      .catch((err) =>
        toast("게시글의 내용을 불러오지 못했습니다. 다시 시도해주세요.", {
          position: "top-center",
          theme: "colored",
        })
      );
  };
  useEffect(() => {
    (async () => {
      try {
        getPostContent(token, postId, category);
      } catch {
        const localRefreshToken = localStorage.getItem("refresh");
        const resToken = await getRefreshToken(
          localRefreshToken ? localRefreshToken : "temp"
        );
        const newToken = resToken.data.access;
        getPostContent(newToken, postId, category);
      }
    })();
  }, [token]);

  // titleEditInput 상자 관리
  const handleTitleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitleEditInput(e.target.value);
  };

  // contentEditInput 상자 관리
  const handleContentEditInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setContentEditInput(e.target.value);
  };

  // 게시글 올리기
  const editPost = async (
    token: string | null,
    post_id: number,
    title: string,
    content: string,
    category: string
  ) => {
    try {
      const localRefresh = localStorage.getItem("refresh");
      const res = await getRefreshToken(localRefresh ? localRefresh : "temp");
      apiPatchPost(res.data.access, post_id, title, content, category);
      toast("게시글을 성공적으로 수정했습니다.", {
        position: "top-center",
        theme: "colored",
        autoClose: 1000,
      });
      setTitleEditInput("");
      setContentEditInput("");
      navigate(-1);
    } catch (err: any) {
      if (err.response.status === 400) {
        toast("수정할 제목과 내용을 입력하세요.", {
          position: "top-center",
          theme: "colored",
        });
      }
    }
  };

  const goBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
                onClick={async (e) => {
                  e.preventDefault();
                  await editPost(
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
              <textarea
                placeholder='내용 입력'
                value={contentEditInput}
                onChange={handleContentEditInput}
                className={styles.contentInput}
              ></textarea>
            </div>
          </section>
        </form>
        <ToastContainer />
      </div>
    </SubjectTemplate>
  );
}
