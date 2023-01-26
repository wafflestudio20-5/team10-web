import styles from "./UserBar.module.scss";
import { useSessionContext } from "../../context/SessionContext";

export const UserBar = () => {
  const { user, token, logout } = useSessionContext();

  return (
    <div className={styles.wrapper}>
      <span className={styles.welcome}>{user?.username}님, 환영합니다.</span>
      <button
        className={styles.logoutButton}
        onClick={(e) => {
          logout(token as string);
        }}
      >
        로그아웃
      </button>
    </div>
  );
};
