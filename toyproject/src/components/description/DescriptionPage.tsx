import styles from "./DescriptionPage.module.scss";
import { SideNavBar } from "../sideNavbar/SideNavBar";
import { UserBar } from "../UserBar/UserBar";

export default function DescriptionPage() {
  return (
    <div className={styles.wrapper}>
      <SideNavBar />
      <div className={styles.body}>
        <header>
          <h1>이용안내</h1>
          <UserBar />
        </header>
        <article>
          <section>
            <h3>수강신청 / 수강취소 방법</h3>
            <p>서울대학교 eTL → 사이드 메뉴 → 수강신청 → 수강신청 / 수강취소</p>
            <p>
              1. 수강신청 기간에 사이드 메뉴에서 <b>'강좌 검색'</b> 클릭 <br />
              2. 수강하고자 하는 강좌를 검색 <br />
              3. <b>'수강신청'</b> 버튼 클릭 (수강신청된 강좌는 자동으로
              대시보드에 나타납니다) <br />
              4. 수강신청을 취소하고자 하는 경우, <b>‘수강취소’</b> 버튼 클릭
              (수강취소된 강좌는 자동으로 대시보드에서 사라집니다)
              <br />
            </p>
          </section>
          <section>
            <h3>강의평가 방법</h3>
            <p>
              서울대학교 eTL → 사이드 메뉴 → 과목 → 강의 평가 → 각 과목 강의
              평가
            </p>
            <p>
              1. 강의평가 기간에 사이드 메뉴에서 <b>'과목'</b> 클릭 <br />
              2. 수강 중인 강좌 중 평가하고자 하는 강의의 <b>'강의평가'</b> 버튼
              클릭 <br />
              3. 강의평가 내용을 입력 후 <b>'확정'</b> 버튼 클릭 <br />
              4. 뒤로 돌아가려면 <b>'취소'</b> 버튼을 클릭 <br />
              5. 확정 후 과목 평가 여부가 변경됩니다 (강의평가 확정 후에는 수정
              불가능)
              <br />
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
