import React from 'react';
import styles from './sideNavBar.module.scss';
import { NavBarButton } from './navBarButton';
import book from '../../svg/book.svg';
import calendar from '../../svg/calendar.svg';
import dashboard from '../../svg/dashboard.svg';
import question from '../../svg/question.svg';
import snulogo from '../../svg/snulogo.svg';
import userIcon from '../../svg/userIcon.svg';

export const SideNavBar = () => {
  return (
    <div className={styles.wrapper}>
      <NavBarButton>
        {/* <img src={snulogo} alt='snulogo'></img> */}
      </NavBarButton>
      <NavBarButton>
        <img src={userIcon} alt='userIcon'></img>
      </NavBarButton>
      <NavBarButton>
        <img src={dashboard} alt='dashboard'></img>
      </NavBarButton>
      <NavBarButton>{/* <img src={book} alt='book'></img> */}</NavBarButton>
      <NavBarButton>
        {/* <img src={calendar} alt='calendar'></img> */}
      </NavBarButton>
      <NavBarButton>
        <img src={question} alt='question'></img>
      </NavBarButton>
    </div>
  );
};
