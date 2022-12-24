import React from 'react';
import styles from './subjectModal.module.scss';

type SubjectModalType = {
  closeSubjectModal: () => void;
};

export const SubjectModal = ({ closeSubjectModal }: SubjectModalType) => {
  return (
    <div className={styles.modal}>
      <span className={styles.closeButton} onClick={closeSubjectModal}>
        닫기 버튼
      </span>
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
