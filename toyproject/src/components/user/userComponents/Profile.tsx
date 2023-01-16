import React from 'react';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSessionContext } from '../../../context/SessionContext';

export default function Profile() {
  const { user } = useSessionContext();

  return (
    <div className={styles.profileContainer}>
      <div className={styles['svg-container']}>
        <FontAwesomeIcon icon={faUser} size='5x' color='#D9D9D9' />
        <div className={styles.hide}></div>
      </div>
      <div className={styles.user}>
        {user?.username}
        {` (${user?.student_id})`}
      </div>
    </div>
  );
}
