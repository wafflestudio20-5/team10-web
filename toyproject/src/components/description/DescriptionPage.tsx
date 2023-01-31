import styles from "./DescriptionPage.module.scss";
import { SideNavBar } from "../sideNavbar/SideNavBar";
export default function DescriptionPage() {
  return (
    <div className={styles.wrapper}>
      <SideNavBar></SideNavBar>
      {`이용안내 페이지입니다.\n
      저희 힘들게 만들었어요ㅜㅜ\n
      이쁘게 봐주세용><`}
    </div>
  );
}
