import styles from './SubjectModal.module.scss';
import { ReactComponent as CloseButton } from '../../../svg/close.svg';
import { useSubjectContext } from '../../../context/SubjectContext';
import { Link } from 'react-router-dom';

type SubjectModalType = {
  closeSubjectModal: () => void;
  aniState: boolean;
};

export const SubjectModal = ({
  aniState,
  closeSubjectModal,
}: SubjectModalType) => {
  const { subjects } = useSubjectContext();

  return (
    <div
      className={`${styles['modal']} ${
        aniState ? styles['close'] : styles['modal']
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
          {subjects &&
            subjects.map((subject) => {
              return (
                <li key={subject.id}>
                  <Link to={`/${subject.name}`} onClick={closeSubjectModal}>
                    {subject.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </section>
      <footer>여기가 바닥</footer>
    </div>
  );
};
