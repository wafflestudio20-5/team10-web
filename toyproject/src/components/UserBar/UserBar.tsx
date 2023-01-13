import styles from "./UserBar.module.scss";
import { useSessionContext } from "../../context/SessionContext";

export const UserBar = () => {
  const { user } = useSessionContext();

  return (
    <div className={styles.wrapper}>
      <span className={styles.welcome}>{user?.email}님, 환영합니다.</span>
      <button className={styles.logoutButton}>로그아웃</button>
    </div>
  );
};
