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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelected, setIsSelected] = useState<number>(0);
  const [aniState, setAniState] = useState(false);
  const openSubjectModal = () => {
    setIsModalOpen(true);
  };
  const closeSubjectModal = () => {
    setAniState(true);
    setTimeout(() => {
      setAniState(false);
      setIsModalOpen(false);
    }, 500);
    setIsSelected(0);
  };

  const openAuthModal = () => {
    console.log('auth');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles['logo-container']}>
          <img src={snulogo} alt='snulogo'></img>
        </div>
        <div
          className={`${styles['button-container']} ${
            isSelected === 1 ? styles['selected'] : ''
          }`}
          onClick={() => setIsSelected(1)}
        >
          <UserIcon></UserIcon>
          계정
        </div>
        <div
          className={`${styles['button-container']} ${
            isSelected === 2 ? styles['selected'] : ''
          }`}
          onClick={() => {
            setIsSelected(2);
            closeSubjectModal();
          }}
        >
          <DashBoard></DashBoard>
          대시보드
        </div>
        <div
          className={`${styles['button-container']} ${
            isSelected === 3 ? styles['selected'] : ''
          }`}
          onClick={() => {
            setIsSelected(3);
            openSubjectModal();
          }}
        >
          <Book></Book>
          과목
        </div>
        <div
          className={`${styles['button-container']} ${
            isSelected === 4 ? styles['selected'] : ''
          }`}
          onClick={() => {
            setIsSelected(4);
            closeSubjectModal();
          }}
        >
          <Calender></Calender>
          캘린더
        </div>
        <div
          className={`${styles['button-container']} ${
            isSelected === 5 ? styles['selected'] : ''
          }`}
          onClick={() => {
            setIsSelected(5);
            closeSubjectModal();
          }}
        >
          <Question></Question>
          이용안내
        </div>
      </div>
      {isModalOpen && (
        <SubjectModal
          isModalOpen={isModalOpen}
          aniState={aniState}
          closeSubjectModal={closeSubjectModal}
        ></SubjectModal>
      )}
    </div>
  );
};
