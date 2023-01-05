import { Link } from 'react-router-dom';
import { useState } from 'react';

import loginHeader from '../../resources/loginHeader.png';
import google from '../../resources/google.png';
import styles from './LoginPage.module.scss';
import { GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 api 호출
    // 메인 화면으로 전환
    console.log(ID, password);
    setID('');
    setPassword('');
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
            <Link to='/login/new'>
              <button className={styles.signUpButton}>회원가입</button>
            </Link>
          </section>
          <section className={styles.socialLogin}>
            <h3>
              소셜 로그인 서비스
              <p>
                ※ 서울대학교 구성원 중 계정에 소셜 로그인 정보를 등록한 사용자만
                이용하실 수 있습니다.
              </p>
            </h3>
            {/* <a>
              <img src={google} alt='google' title='google' />
              <span>구글</span>
            </a> */}
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            ></GoogleLogin>
          </section>
        </article>
      </div>
      <footer className={styles.footer}>
        <address>
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
export default LoginPage;
