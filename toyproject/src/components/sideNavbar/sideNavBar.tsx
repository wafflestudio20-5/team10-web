import React, { useState } from 'react';
import styles from './sideNavBar.module.scss';
import { ReactComponent as Book } from '../../svg/book.svg';
import { ReactComponent as Calender } from '../../svg/calendar.svg';
import { ReactComponent as DashBoard } from '../../svg/dashboard.svg';
import { ReactComponent as Question } from '../../svg/question.svg';
import snulogo from '../../svg/snulogo.svg';
import { ReactComponent as UserIcon } from '../../svg/userIcon.svg';
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
        <div className={styles.logoContainer}>
          <img src={snulogo} alt='snulogo'></img>
        </div>
        <div className={styles.buttonContainer}>
          <UserIcon></UserIcon>
          계정
        </div>
        <div className={styles.buttonContainer}>
          <DashBoard></DashBoard>
          대시보드
        </div>
        <div className={styles.buttonContainer} onClick={openSubjectModal}>
          <Book></Book>
          과목
        </div>
        <div className={styles.buttonContainer}>
          <Calender></Calender>
          캘린더
        </div>
        <div className={styles.buttonContainer}>
          <Question></Question>
          이용안내
        </div>
      </div>
      {isModal && (
        <SubjectModal closeSubjectModal={closeSubjectModal}></SubjectModal>
      )}
    </div>
  );
};
