import React, { useEffect, useState } from 'react';
import styles from './subjectModal.module.scss';
import { ReactComponent as CloseButton } from '../../../svg/close.svg';

type SubjectModalType = {
  closeSubjectModal: () => void;
  isOpen: boolean;
};

export const SubjectModal = ({
  isOpen,
  closeSubjectModal,
}: SubjectModalType) => {
  // 현재 트랜지션 효과를 보여주고 있는 중이라는 상태 값
  // const [animate, setAnimate] = useState(false);
  // // 실제 컴포넌트가 사라지는 시점을 지연시키기 위한 값
  // const [visible, setVisible] = useState(isOpen); //이 모달이 열릴땐 true 상태

  // useEffect(() => {
  //   //close 버튼을 눌렀을 때
  //   if (visible && !isOpen) {
  //     setAnimate(true);
  //     setTimeout(() => setAnimate(false), 250);
  //   }
  //   setAnimate(isOpen);
  // }, [visible, isOpen]);

  // if (!animate && !visible) return null;

  return (
    // <div
    //   className={
    //     isOpen ? `${styles['modal']}` : `${styles['modal']} ${styles['close']}`
    //   }
    // >
    <div className={styles.modal}>
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
