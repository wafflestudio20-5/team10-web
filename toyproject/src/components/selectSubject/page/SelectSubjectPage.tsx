import React, { useEffect, useState } from "react";
import styles from "./SelectSubjectPage.module.scss";
import { SideNavBar } from "../../sideNavbar/SideNavBar";
import SubjectList from "../SubjectList";
import { UserBar } from "../../UserBar/UserBar";
import { url } from "inspector";
import { apiDropClass, apiEnrollClass, apiGetSubjects } from "../../../lib/api";
import { useSessionContext } from "../../../context/SessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSubjectContext } from "../../../context/SubjectContext";
import { SubjectType } from "../../../lib/types";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const isEnrolled = (
  mySubjects: SubjectType[] | undefined,
  subject: SubjectType
) => {
  if (!mySubjects) return false;
  for (const elem of mySubjects) {
    if (elem.id === subject.id) return true;
  }
  return false;
};

export type ModalInfo = {
  classId: number;
  name: string;
  type: "enroll" | "drop";
};

export default function SelectSubjectPage() {
  const [searchValue, setSearchValue] = useState("");
  const [subjects, setSubjects] = useState<SubjectType[]>();
  const [totalNum, setTotalNum] = useState<number>(0);
  const [activeButton, setActiveButton] = useState({ activate: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo | undefined>(undefined);
  const [curPage, setCurPage] = useState<number>(1);
  const [buttonCount, setbuttonCount] = useState<number>(1);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModal = (info: ModalInfo) => {
    setModalInfo(info);
  };

  let timer: any = null;

  const throttling = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        setSearchValue(event.target.value);
        console.log(searchValue);
      }, 500);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    throttling(event);
  };

  const { token, refreshUserInfo, getRefreshToken } = useSessionContext();
  const { mySubjects } = useSubjectContext();

  const enroll = async (token: string | null, classId: number) => {
    const localRefresh = localStorage.getItem("refresh");
    const res = await getRefreshToken(localRefresh ? localRefresh : "temp");
    await apiEnrollClass(res.data.access, classId);
    toast("신청되었습니다!", { position: "top-center", theme: "colored" });
    await refreshUserInfo(res.data.access!);
  };

  const drop = (token: string | null, classId: number) => {
    apiDropClass(token, classId)
      .then((r) => {
        toast("드랍되었습니다!", { position: "top-center", theme: "colored" });
      })
      .then((r) => {
        refreshUserInfo(token!); //!를 삽입함으로서 token이 항상 존재한다는 걸 알릴 수 있다.
      })
      .catch((r) => console.log(r));
  };

  useEffect(() => {
    (async () => {
      try {
        const initRes = await apiGetSubjects(token, 1, searchValue);
        if (initRes.data.count < curPage) {
          const newRes = await apiGetSubjects(token, 1, searchValue);
          setSubjects(newRes.data.results);
          setTotalNum(initRes.data.count);
          const btnCount = Math.ceil(initRes.data.count / 10);
          setbuttonCount(btnCount);
        } else {
          const res = await apiGetSubjects(token, curPage, searchValue);
          setSubjects(res.data.results);
          setTotalNum(res.data.count);
          const btnCount = Math.ceil(res.data.count / 10);
          setbuttonCount(btnCount);
        }
      } catch (err: any) {
        if (err.response.status === 401) {
          const localRefreshToken = localStorage.getItem("refresh");
          const resToken = await getRefreshToken(
            localRefreshToken ? localRefreshToken : "temp"
          );
          const newToken = resToken.data.access;
          const initRes = await apiGetSubjects(newToken, 1, searchValue);
          if (initRes.data.count < curPage) {
            const newRes = await apiGetSubjects(newToken, 1, searchValue);
            setSubjects(newRes.data.results);
            setTotalNum(initRes.data.count);
            const btnCount = Math.ceil(initRes.data.count / 10);
            setbuttonCount(btnCount);
          } else {
            const res = await apiGetSubjects(newToken, curPage, searchValue);
            setSubjects(res.data.results);
            setTotalNum(res.data.count);
            const btnCount = Math.ceil(res.data.count / 10);
            setbuttonCount(btnCount);
            setSubjects(res.data.results);
            setTotalNum(res.data.count);
          }
        }
      }
    })();
  }, [token, searchValue, buttonCount]);

  useEffect(() => {
    setCurPage(1);
    setActiveButton({ ...activeButton, activate: 0 });
  }, [searchValue]);

  const goToPage = async (
    event: React.MouseEvent<HTMLButtonElement>,
    page: number,
    idx: number
  ) => {
    event.preventDefault();
    const res = await apiGetSubjects(token, page, searchValue);
    setSubjects(res.data.results);
    setActiveButton({ ...activeButton, activate: idx });
    setCurPage(page);
  };

  return (
    <div className={styles.selectSubjectPagewrapper}>
      <SideNavBar />
      <div className={styles.body}>
        <header>
          <h1>수강신청</h1>
          <UserBar />
        </header>
        <section>
          <div className={styles.search}>
            <input
              className={styles.searchbar}
              placeholder='수업명을 검색하세요'
              onChange={handleInputChange}
            />
          </div>
          <article>
            <div className={styles.index}>
              <b className={styles.name}>교과목명</b>
              <b className={styles.professor}>담당교수</b>
              <b className={styles.enroll}>신청</b>
            </div>
            {subjects &&
              subjects.map((subject) => {
                return (
                  <SubjectList
                    key={subject.id}
                    classId={subject.id}
                    name={subject.name}
                    professor={subject.created_by.username}
                    isEnrolled={isEnrolled(mySubjects, subject)}
                    toggleModal={toggleModal}
                    handleModal={handleModal}
                  ></SubjectList>
                );
              })}
            <div className={styles["button-container"]}>
              {Array.from({ length: buttonCount }).map((_, idx) => (
                <button
                  className={`${styles["nav-button"]} ${
                    activeButton.activate === idx ? styles["active"] : ""
                  }`}
                  key={idx}
                  onClick={(event) => goToPage(event, idx + 1, idx)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </article>
        </section>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        className={styles.modal}
      >
        <article>
          <div>
            <b>{modalInfo?.name}</b>
            <br />
            과목을 {modalInfo?.type === "enroll"
              ? "수강 신청"
              : "수강 취소"}{" "}
            하시겠습니까?
          </div>
        </article>
        <footer>
          <button className={styles.cancel} onClick={toggleModal}>
            취소
          </button>
          <button
            className={styles.ok}
            onClick={(e) => {
              e.preventDefault();
              modalInfo?.type === "enroll"
                ? enroll(token, modalInfo?.classId)
                : drop(token, modalInfo?.classId ? modalInfo.classId : -1);
              toggleModal();
            }}
          >
            확인
          </button>
        </footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}
