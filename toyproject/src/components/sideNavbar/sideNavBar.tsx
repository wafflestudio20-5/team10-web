import React, { useState } from 'react';
import styles from './sideNavBar.module.scss';
import book from '../../svg/book.svg';
import calendar from '../../svg/calendar.svg';
import dashboard from '../../svg/dashboard.svg';
import question from '../../svg/question.svg';
import snulogo from '../../svg/snulogo.svg';
import userIcon from '../../svg/userIcon.svg';
import { SubjectModal } from './modal/subjectModal';

export const SideNavBar = () => {
  const [isModal, setIsModal] = useState(false);

  const openSubjectModal = () => {
    setIsModal(true);
  };
  const closeSubjectModal = () => {
    setIsModal(false);
  };

  const openAuthModal = () => {
    console.log('auth');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.buttonContainer}>
          {/* <img src={snulogo} alt='snulogo'></img> */}
          로고
        </div>
        <div className={styles.buttonContainer}>
          <img src={userIcon} alt='userIcon'></img>
          계정
        </div>
        <div className={styles.buttonContainer}>
          <img src={dashboard} alt='dashboard'></img>
          대시보드
        </div>
        <div className={styles.buttonContainer} onClick={openSubjectModal}>
          {/* <img src={book} alt='book'></img> */}
          과목
        </div>
        <div className={styles.buttonContainer}>
          {/* <img src={calendar} alt='calendar'></img> */}
          캘린더
        </div>
        <div className={styles.buttonContainer}>
          <img src={question} alt='question'></img>
          이용안내
        </div>
      </div>
      {isModal && (
        <SubjectModal closeSubjectModal={closeSubjectModal}></SubjectModal>
      )}
    </div>
  );
};
