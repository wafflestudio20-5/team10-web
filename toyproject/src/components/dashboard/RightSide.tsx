import styles from "./RightSide.module.scss";

export const RightSide = () => {
  return (
    <div className={styles.wrapper}>
      <h2>할 일</h2>
      <section>
        <ul>
          <li>뒤풀이 야무지게 하기</li>
          <li>넷플릭스 보기</li>
          <li>해외여행 가기</li>
        </ul>
      </section>
      <h2>최근 피드백</h2>
      <span>공부를 열심히 하자</span>
    </div>
  );
};
