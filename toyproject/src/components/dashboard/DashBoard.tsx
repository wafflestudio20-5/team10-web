import styles from "./DashBoard.module.scss";
import { Cards } from "../cards/Cards";
import { UserBar } from "../UserBar/UserBar";

export const DashBoard = () => {
  return (
    <div className={styles.wrapper}>
      <header>
        <h1>대시보드</h1>
        <UserBar />
      </header>
      <section>
        <Cards />
      </section>
    </div>
  );
};
