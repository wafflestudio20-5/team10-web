import styles from './UserBar.module.scss';
import { useSessionContext } from '../../context/SessionContext';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ID } from '../../lib/api';

export const UserBar = () => {
  const { user, token, logout } = useSessionContext();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <span className={styles.welcome}>{user?.username}님, 환영합니다.</span>
      <button
        className={styles.logoutButton}
        onClick={(e) => {
          if (user?.is_social_login === true) {
            window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=http://waffletoyproject10.s3-website.ap-northeast-2.amazonaws.com/authentication/logout/`;
          } else {
            logout(token as string);
          }
        }}
      >
        로그아웃
      </button>
    </div>
  );
};
