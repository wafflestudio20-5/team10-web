import { Link } from "react-router-dom";
import { useState } from "react";
import loginHeader from "../../resources/loginHeader.png";
import styles from "./LoginPage.module.scss";
import { useSessionContext } from "../../context/SessionContext";
import kakaoLogin from "../../resources/kakaologin.png";
import { KAKAO_AUTH_URL } from "../../lib/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useSessionContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <header className={styles.header}>
        <a href='https://my.snu.ac.kr'>
          <img src={loginHeader} alt='Login Header' title='Login Header' />
        </a>
      </header>
      <div className={styles.content}>
        <article>
          <section className={styles.logincontainer}>
            <form>
              <input
                type='text'
                className={styles.idAndPwInput}
                placeholder='아이디'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Link to='/login/new'>
              <button className={styles.signUpButton}>회원가입</button>
            </Link>
          </section>
          <section className={styles.socialLogin}>
            <h3>
              소셜 로그인 서비스
              <p>※ 카카오 로그인 후 이름과 학번을 입력합니다.</p>
            </h3>
            <a href={KAKAO_AUTH_URL}>
              <img
                className={styles["kakao-login"]}
                src={kakaoLogin}
                alt='kakaoLogin'
              ></img>
            </a>
          </section>
        </article>
      </div>
      <footer className={styles.footer}>
        <address>
          <p className={styles.copyright}>
            COPYRIGHT (C)2022 SEOUL NATIONAL UNIVERSITY. ALL RIGHTS RESERVED
          </p>
          08826 서울특별시 관악구 관악로 1 서울대학교 TEL 02-880-5114 FAX
          02-885-5272 WAFFLE TOYPROJECT 2023.02.03
        </address>
      </footer>
    </div>
  );
}
export default LoginPage;
