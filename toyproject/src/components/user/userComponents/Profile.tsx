import React from 'react';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <div className={styles['svg-container']}>
        <FontAwesomeIcon icon={faUser} size='5x' color='#D9D9D9' />
      </div>
      <div className={styles.hide}>hi</div>
      <div className={styles.user}>안동하(학번 이거도 userContext로)</div>
    </div>
  );
}
