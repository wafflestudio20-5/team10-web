import styles from './subjectModal.module.scss';
import { ReactComponent as CloseButton } from '../../../svg/close.svg';

type SubjectModalType = {
  closeSubjectModal: () => void;
  aniState: boolean;
  isModalOpen: boolean;
};

export const SubjectModal = ({
  isModalOpen,
  aniState,
  closeSubjectModal,
}: SubjectModalType) => {
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
          <li>논비사</li>
          <li>논비사</li>
          <li>논비사</li>
          <li>논비사</li>
          <li>논비사</li>
        </ul>
      </section>
      <footer>여기가 바닥</footer>
    </div>
  );
};
