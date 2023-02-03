import { SideNavBar } from '../sideNavbar/SideNavBar';
import { DashBoard } from './DashBoard';
import { RightSide } from './RightSide';
import styles from './DashBoardPage.module.scss';
export default function DashBoardPage() {
  //수업 목록 확인하기 보기 기능
  return (
    <div className={styles.wrapper}>
      <SideNavBar />
      <div className={styles.body}>
        <DashBoard />
        <RightSide />
      </div>
    </div>
  );
}
