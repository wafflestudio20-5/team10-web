import React, { useState, useEffect } from "react";
import styles from "./SubjectList.module.scss";
import { useSessionContext } from "../../context/SessionContext";
import { toast } from "react-toastify";
import { ModalInfo } from "./page/SelectSubjectPage";
import { useSubjectContext } from "../../context/SubjectContext";

type SubjectListType = {
  classId: number;
  name: string;
  professor: string;
  isEnrolled: boolean | undefined;
  toggleModal: () => void;
  handleModal: (info: ModalInfo) => void;
};

export default function SubjectList({
  classId,
  name,
  professor,
  isEnrolled,
  toggleModal,
  handleModal,
}: SubjectListType) {
  const { token } = useSessionContext();
  const { mySubjects } = useSubjectContext();
  const [subjectEnrolled, setSubjectEnrolled] = useState(isEnrolled);
  useEffect(() => {
    if (mySubjects?.find((subject) => subject.id === classId)) {
      setSubjectEnrolled(true);
    } else {
      setSubjectEnrolled(false);
    }
  }, [token, mySubjects]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{name}</div>
      <div className={styles.professor}>{professor}</div>
      <div className={styles.enroll}>
        {subjectEnrolled ? (
          <button
            className={styles.drop}
            onClick={() => {
              handleModal({
                classId: classId,
                name: name,
                type: "drop",
              });
              toggleModal();
            }}
          >
            수강취소
          </button>
        ) : (
          <button
            onClick={() => {
              handleModal({
                classId: classId,
                name: name,
                type: "enroll",
              });
              toggleModal();
            }}
          >
            수강신청
          </button>
        )}
      </div>
    </div>
  );
}
