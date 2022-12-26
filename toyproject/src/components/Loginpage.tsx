// import { Link } from "react-router-dom";
import { useState } from "react";

import loginHeader from "../resources/loginHeader.png";
import kakao from "../resources/kakao.png";
import styles from "./LoginHeader.module.scss";

function Loginpage() {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 api 호출
    // 메인 화면으로 전환
    console.log(ID, password);
    setID("");
    setPassword("");
  };

  return (
    <div>
      <header className={styles.header}>
        <a href='https://my.snu.ac.kr'>
          <img
            src={loginHeader}
            className={styles.img}
            alt='Login Header'
            title='Login Header'
          />
        </a>
      </header>
      <div className={styles.content}>
        <article className={styles.loginform}>
          <section className={styles.logincontainer}>
            <form>
              <input
                type='text'
                className={styles.idAndPwInput}
                placeholder='아이디'
                value={ID}
                onChange={(e) => setID(e.target.value)}
              />
              <input
                type='password'
                className={styles.idAndPwInput}
                placeholder='비밀번호'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type='submit'
                className={styles.loginButton}
                value='로그인'
                onClick={handleSubmit}
              />
            </form>
          </section>
          <section className={styles.socialLogin}>
            <h3 className={styles.socialLoginHeader}>
              소셜 로그인 서비스
              <p className={styles.socialLoginDescription}>
                ※ 서울대학교 구성원 중 계정에 소셜 로그인 정보를 등록한 사용자만
                이용하실 수 있습니다.
              </p>
            </h3>
            <a className={styles.kakaoLogin}>
              <img
                src={kakao}
                className={styles.kakaoimg}
                alt='kakao'
                title='kakao'
              />
              <span className={styles.kakaoText}>카카오</span>
            </a>
          </section>
        </article>
      </div>
      <footer className={styles.footer}>
        <address className={styles.address}>
          <p className={styles.copyright}>
            COPYRIGHT (C)2022 SEOUL NATIONAL UNIVERSITY. ALL RIGHTS RESERVED
          </p>
          08826 서울특별시 관악구 관악로 1 서울대학교 TEL 02-880-5114 FAX
          02-885-5272
        </address>
      </footer>
    </div>
  );
}
export default Loginpage;
