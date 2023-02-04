import React from "react";
import SubjectTemplate from "../SubjectTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./StudentsPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Searchbar from "../Searchbar";
import { useSessionContext } from "../../context/SessionContext";
import { StudentsOfSubject } from "../../lib/types";
import { apiGetStudentsOfSubject, apiGetSubjectInfo } from "../../lib/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import circleUser from "../../resources/circle-user-solid.svg";

export default function StudentsPage() {
  const { token, getRefreshToken } = useSessionContext();
  const { subjectid } = useParams();

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");
  const [students, setStudents] = useState<StudentsOfSubject[] | undefined>([]);
  const [studentsToShow, setStudentsToShow] = useState<
    StudentsOfSubject[] | undefined
  >(students);
  const [subTitle, setSubTitle] = useState("");
  const [totalNum, setTotalNum] = useState<number>(0);
  const [activeButton, setActiveButton] = useState({ activate: 0 });

  const navigate = useNavigate();

  const getStudentsOfSubject = (
    token: string | null,
    id: number,
    page: number
  ) => {
    apiGetStudentsOfSubject(token, id, page)
      .then((res) => {
        setStudents(res.data.results);
        setTotalNum(res.data.count);
      })
      .catch((err) =>
        toast("수강생 목록을 불러오지 못했습니다. 다시 시도해주세요.", {
          position: "top-center",
          theme: "colored",
        })
      );
  };

  useEffect(() => {
    (async () => {
      try {
        const id = Number(subjectid);
        const res = await apiGetSubjectInfo(token, id);
        setSubTitle(res.data.name);
        getStudentsOfSubject(token, id, 1);
      } catch {
        const id = Number(subjectid);
        const localRefreshToken = localStorage.getItem("refresh");
        const resToken = await getRefreshToken(
          localRefreshToken ? localRefreshToken : "temp"
        );
        const newToken = resToken.data.access;
        const res = await apiGetSubjectInfo(newToken, id);
        setSubTitle(res.data.name);
        getStudentsOfSubject(newToken, id, 1);
      }
    })();
  }, [subjectid, token]);

  const filterStudents = () => {
    let filteredStudents = students;
    if (searchType === "student") {
      filteredStudents = filteredStudents?.filter(
        (student) => !student.is_professor
      );
    } else if (searchType === "professor") {
      filteredStudents = filteredStudents?.filter(
        (student) => student.is_professor
      );
    }
    filteredStudents = filteredStudents?.filter((student) =>
      student.username?.includes(searchValue)
    );
    setStudentsToShow(filteredStudents);
  };
  useEffect(() => {
    filterStudents();
  }, [students, searchValue, searchType]);

  const handleType = (type: boolean) => {
    if (type === true) {
      return "교수자";
    } else if (type === false) {
      return "학생";
    }
  };

  const buttonCount = Math.ceil(totalNum / 10);

  const goToPage = async (
    event: React.MouseEvent<HTMLButtonElement>,
    page: number,
    idx: number
  ) => {
    const id = Number(subjectid);
    event.preventDefault();
    getStudentsOfSubject(token, id, page);
    setActiveButton({ ...activeButton, activate: idx });
  };
  const imageErrorHandler = (e: any) => {
    e.target.src = circleUser;
  };
  return (
    <SubjectTemplate subject={subjectid as string} page='수강생'>
      <section className={styles.section}>
        <Searchbar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          inputPlaceHolder='사용자 검색'
        />
        <select
          className={styles.typeSearchbar}
          value={searchType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            e.preventDefault();
            setSearchType(e.target.value);
          }}
        >
          <option value='every'>모든 역할</option>
          <option value='student'>학생</option>
          <option value='professor'>교수</option>
        </select>
      </section>

      {studentsToShow && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.pic}></th>
              <th className={styles.name}>이름</th>
              <th className={styles.subject}>과목</th>
              <th className={styles.type}>역할</th>
            </tr>
          </thead>
          <tbody>
            {studentsToShow?.map((student) => (
              <tr key={student.id}>
                <td className={styles.pic}>
                  {student.profile ? (
                    <img
                      src={student.profile}
                      alt='img'
                      className={styles.circleUser}
                      onError={imageErrorHandler}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className={styles.circleUser}
                    />
                  )}
                </td>
                <td className={styles.name}>{student.username}</td>
                <td className={styles.subject}>{subTitle}</td>
                <td className={styles.type}>
                  {handleType(student.is_professor)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
      <ToastContainer />
    </SubjectTemplate>
  );
}
