import styles from "./SubjectModal.module.scss";
import { ReactComponent as CloseButton } from "../../../svg/close.svg";
import { useSubjectContext } from "../../../context/SubjectContext";
import { Link } from "react-router-dom";

type SubjectModalType = {
  closeSubjectModal: () => void;
  aniState: boolean;
};

export const SubjectModal = ({
  aniState,
  closeSubjectModal,
}: SubjectModalType) => {
  const { mySubjects, handleClick } = useSubjectContext();

  return (
    <div
      className={`${styles["modal"]} ${
        aniState ? styles["close"] : styles["modal"]
      }`}
    >
      <CloseButton
        width='15px'
        height='15px'
        onClick={closeSubjectModal}
      ></CloseButton>
      <header>과목</header>
      <section>
        <ul>
          {mySubjects &&
            mySubjects.map((subject) => {
              return (
                <li className={styles.subjectname} key={subject.id}>
                  <Link
                    to={`/${subject.id}`}
                    onClick={() => {
                      handleClick(subject);
                      closeSubjectModal();
                    }}
                  >
                    <span>{subject.name}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </section>

      <button>
        <Link to='/evaluation'>강의평가</Link>
      </button>
    </div>
  );
};
