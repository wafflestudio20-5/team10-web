import React, { useState } from 'react';
import styles from './SocialSignUpPage.module.scss';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { apiSignUp } from '../../lib/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faMinus } from '@fortawesome/free-solid-svg-icons';
import loginHeader from '../../resources/loginHeader.png';
import headerStyles from './LoginPage.module.scss';
import { SignUpRequestBody } from '../../lib/types';

export default function SocialSignUpPage() {
  //소셜로그인 완료시 => userid, access, refreshtoken 발급
  //userid, accesstoken으로 user정보 받아올 수 있고 그걸 여기 띄운다
  //그 외 받아오지 못한 정보를 추가로 입력 후 dashboard로 navigate

  //sign up page에서 이름, 학번만 있으면 될 것 같은데
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<SignUpRequestBody>({
    email: '',
    password: '',
    username: '',
    student_id: '',
    is_professor: false,
  });

  const [firstStudent_id, setFirstStudent_id] = useState<string>('');
  const [lastStudent_id, setLastStudent_id] = useState<string>('');
  const [idOfEmail, setIdOfEmail] = useState<string>('');
  const [domainOfEmail, setDomainOfEmail] = useState<string>('');
  const nav = useNavigate();

  const signUp = (userinfo: SignUpRequestBody) =>
    apiSignUp(
      userinfo.email,
      userinfo.password,
      userinfo.username,
      userinfo.student_id,
      userinfo.is_professor
    )
      .then((res) => {
        setCurrentStage(currentStage + 1);
      })
      .catch((err) => {
        console.log(err.response.data);
        if (Object.keys(err.response.data).includes('password')) {
          if (
            err.response.data.password?.includes(
              'This password is too short. It must contain at least 8 characters.'
            )
          ) {
            toast('비밀번호는 최소 8글자 이상으로 입력해주세요.', {
              position: 'top-center',
              theme: 'colored',
            });
          }
          if (
            err.response.data.password?.includes('This password is too common.')
          ) {
            toast('비밀번호는 너무 흔하지 않은 조합으로 입력해주세요.', {
              position: 'top-center',
              theme: 'colored',
            });
          }
          if (
            err.response.data.password?.includes(
              'This password is entirely numeric.'
            )
          ) {
            toast('숫자로만 구성된 비밀번호는 사용할 수 없습니다.', {
              position: 'top-center',
              theme: 'colored',
            });
          }
          if (
            err.response.data.password?.includes('This field may not be blank.')
          ) {
            toast('비밀번호는 반드시 입력해야 합니다.', {
              position: 'top-center',
              theme: 'colored',
            });
          }
        }
        if (Object.keys(err.response.data).includes('student_id')) {
          if (
            err.response.data.student_id?.includes(
              'This field may not be blank.'
            )
          ) {
            toast('학번은 반드시 입력해야 합니다.', {
              position: 'top-center',
              theme: 'colored',
            });
          }
          if (
            err.response.data.student_id?.includes(
              'student_id should be 10 length' ||
                'student_id form should be XXXX-XXXXX'
            )
          ) {
            toast('학번은 XXXX-XXXXX 형식의 숫자열로 입력해주세요.', {
              position: 'top-center',
              theme: 'colored',
            });
          }
          if (
            err.response.data.student_id?.includes(
              'already existing student_id'
            )
          ) {
            toast('이미 존재하는 학번입니다.', {
              position: 'top-center',
              theme: 'colored',
            });
          }
        }
        if (Object.keys(err.response.data).includes('email')) {
          if (
            err.response.data.email?.includes('This field may not be blank.')
          ) {
            toast('이메일은 반드시 입력해야 합니다.', {
              position: 'top-center',
              theme: 'colored',
            });
          }
          if (
            err.response.data.email?.includes('Enter a valid email address.')
          ) {
            toast('유효한 이메일 주소를 입력해주세요.', {
              position: 'top-center',
              theme: 'colored',
            });
          }
          if (
            err.response.data.email?.includes(
              'user with this email already exists.'
            )
          ) {
            toast('이미 존재하는 이메일입니다.', {
              position: 'top-center',
              theme: 'colored',
            });
          }
        }
        if (Object.keys(err.response.data).includes('username')) {
          if (
            err.response.data.username?.includes('This field may not be blank.')
          ) {
            toast('이름은 반드시 입력해야 합니다.', {
              position: 'top-center',
              theme: 'colored',
            });
          }
        }
      });

  return (
    <div className={styles.signup}>
      <header className={styles.header}>
        <a href='https://my.snu.ac.kr'>
          <img src={loginHeader} alt='Login Header' title='Login Header' />
        </a>
      </header>
      <div className={styles.signup}>
        <h2>개인정보 입력</h2>
        <div className={styles.notice}>
          ※ 인적정보가 등록된 구성원만 계정 신청을 할 수 있습니다.
        </div>
        <ul className={styles.user_wrapper}>
          <li
            className={styles.usertype}
            onClick={() =>
              setUserInfo({
                ...userInfo,
                is_professor: !userInfo.is_professor,
              })
            }
          >
            <div className={styles.radio}>
              <div
                className={!userInfo.is_professor ? styles.on : styles.inner}
              ></div>
            </div>
            <img
              src={
                !userInfo.is_professor
                  ? 'https://nsso.snu.ac.kr/sso/resources/snu/usr/images/student_on.svg'
                  : 'https://nsso.snu.ac.kr/sso/resources/snu/usr/images/student.svg'
              }
              alt='student'
              className={styles.image}
            />
            <h4>학생 ∙ 졸업생</h4>
          </li>
          <li
            className={styles.usertype}
            onClick={() =>
              setUserInfo({
                ...userInfo,
                is_professor: !userInfo.is_professor,
              })
            }
          >
            <div className={styles.radio}>
              <div
                className={userInfo.is_professor ? styles.on : styles.inner}
              ></div>
            </div>
            <img
              src={
                userInfo.is_professor
                  ? 'https://nsso.snu.ac.kr/sso/resources/snu/usr/images/teacher_on.svg'
                  : 'https://nsso.snu.ac.kr/sso/resources/snu/usr/images/teacher.svg'
              }
              alt='professor'
              className={styles.image}
            />
            <h4>교직원</h4>
          </li>
        </ul>
        <div className={styles.userinfo}>
          <div className={styles.wrapper}>
            <p className={styles.title}>이름</p>
            <input
              type='text'
              placeholder='홍길동'
              className={styles.input}
              onChange={(event) =>
                setUserInfo({ ...userInfo, username: event.target.value })
              }
            />
          </div>
          <div className={styles.wrapper}>
            <p className={styles.title}>학번</p>
            <div className={styles.email}>
              <input
                type='text'
                placeholder='2022'
                className={`${styles.input} ${styles.short}`}
                onChange={(event) => {
                  setFirstStudent_id(event.target.value);
                  setUserInfo({
                    ...userInfo,
                    student_id: `${event.target.value}-${lastStudent_id}`,
                  });
                }}
              />

              <FontAwesomeIcon icon={faMinus} className={styles.minus} />
              <input
                type='text'
                placeholder='12345'
                className={`${styles.input} ${styles.short}`}
                onChange={(event) => {
                  setLastStudent_id(event.target.value);
                  setUserInfo({
                    ...userInfo,
                    student_id: `${firstStudent_id}-${event.target.value}`,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <button
          className={styles.next}
          onClick={() => {
            signUp(userInfo);
          }}
        >
          다음
        </button>
      </div>
      )
      <footer className={headerStyles.footer}>
        <address>
          <p className={headerStyles.copyright}>
            COPYRIGHT (C)2022 SEOUL NATIONAL UNIVERSITY. ALL RIGHTS RESERVED
          </p>
          08826 서울특별시 관악구 관악로 1 서울대학교 TEL 02-880-5114 FAX
          02-885-5272
        </address>
      </footer>
      <ToastContainer />
    </div>
  );
}
