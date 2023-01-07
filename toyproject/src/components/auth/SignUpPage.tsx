import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ToastContainer, toast } from "react-toastify";
import styles from "./SignUp.module.scss";
import headerStyles from "./LoginPage.module.scss";
import { Term1, Term2, Term3 } from "../TermsOfService.js";
import loginHeader from "../../resources/loginHeader.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faMinus } from "@fortawesome/free-solid-svg-icons";

/** 이용 약관 */
interface Term {
  title: string;
  content: JSX.Element;
}

// 학번 양식 (정규표현식)
const studentIdRegex: RegExp = /\d{4}-\d{5}/;

/** 회원 가입하는 유저 정보 양식 */
interface UserInfo {
  email: string;
  password: string;
  student_id: string;
  username: string;
  is_professor: boolean;
  is_staff: boolean;
}

const TermsElement = ({
  currentStage,
  setCurrentStage,
}: {
  currentStage: number;
  setCurrentStage: React.Dispatch<number>;
}) => {
  const termsOfService: Term[] = [
    {
      title: "서울대학교 계정 관리 지침",
      content: (
        <ReactMarkdown className={styles.content}>{Term1}</ReactMarkdown>
      ),
    },
    {
      title: "서울대학교 포털 운영 지침",
      content: (
        <ReactMarkdown className={styles.content}>{Term2}</ReactMarkdown>
      ),
    },
    {
      title: "개인정보 수집∙이용 및 제공에 대한 안내",
      content: (
        <ReactMarkdown className={styles.content}>{Term3}</ReactMarkdown>
      ),
    },
  ];
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [checkedArr, setCheckedArr] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  useEffect(() => {
    setCheckedAll(checkedArr[0] && checkedArr[1] && checkedArr[2]);
  });

  return (
    <div className={styles.tos}>
      <div className={`${styles.header} ${styles.all}`}>
        <input
          type='checkbox'
          checked={checkedAll}
          onChange={() => {
            checkedAll
              ? setCheckedArr([false, false, false])
              : setCheckedArr([true, true, true]);
          }}
        />
        <p className={`${styles.title} ${styles.all}`}>
          서울대학교 운영지침과 개인정보 수집 및 이용에 모두 동의합니다.
        </p>
      </div>
      <div className={styles.header}>
        <input
          type='checkbox'
          checked={checkedArr[0]}
          onChange={() =>
            setCheckedArr([!checkedArr[0], checkedArr[1], checkedArr[2]])
          }
        />
        <p className={styles.title}>{termsOfService[0].title}</p>
      </div>
      {termsOfService[0].content}
      <div className={styles.header}>
        <input
          type='checkbox'
          checked={checkedArr[1]}
          onChange={() =>
            setCheckedArr([checkedArr[0], !checkedArr[1], checkedArr[2]])
          }
        />
        <p className={styles.title}>{termsOfService[1].title}</p>
      </div>
      {termsOfService[1].content}
      <div className={styles.header}>
        <input
          type='checkbox'
          checked={checkedArr[2]}
          onChange={() =>
            setCheckedArr([checkedArr[0], checkedArr[1], !checkedArr[2]])
          }
        />
        <p className={styles.title}>{termsOfService[2].title}</p>
      </div>
      {termsOfService[2].content}
      <button
        className={styles.next}
        onClick={() => {
          checkedAll
            ? setCurrentStage(currentStage + 1)
            : toast("동의를 선택하면 다음 단계로 이동합니다.", {
                position: "top-center",
                theme: "colored",
              });
        }}
      >
        다음
      </button>
    </div>
  );
};

const ProgressElement = ({ currentStage }: { currentStage: number }) => {
  return (
    <ol className={styles.progress}>
      <li
        className={
          currentStage === 0 ? `${styles.step} ${styles.active}` : styles.step
        }
      >
        <div className={styles.cropper}>
          <img
            src={
              "https://nsso.snu.ac.kr/sso/resources/snu/usr/images/img_step01.png"
            }
            alt='운영방침 동의'
            className={styles.logo}
          />
        </div>
        운영방침 동의
      </li>
      <img
        src={
          "https://nsso.snu.ac.kr/sso/resources/snu/usr/images/step_arrow.png"
        }
        alt='arrow'
        className={styles.arrow}
      />
      <li
        className={
          currentStage === 1 ? `${styles.step} ${styles.active}` : styles.step
        }
      >
        <div className={styles.cropper}>
          <img
            src={
              "https://nsso.snu.ac.kr/sso/resources/snu/usr/images/img_step04.png"
            }
            alt='운영방침 동의'
            className={styles.logo}
          />
        </div>
        정보입력
      </li>
      <img
        src={
          "https://nsso.snu.ac.kr/sso/resources/snu/usr/images/step_arrow.png"
        }
        alt='arrow'
        className={styles.arrow}
      />
      <li
        className={
          currentStage === 2 ? `${styles.step} ${styles.active}` : styles.step
        }
      >
        <div className={styles.cropper}>
          <img
            src={
              "https://nsso.snu.ac.kr/sso/resources/snu/usr/images/img_step05.png"
            }
            alt='운영방침 동의'
            className={styles.logo}
          />
        </div>
        완료
      </li>
    </ol>
  );
};

export default function SignUpPage() {
  /** 현재 회원가입 진행 상황 */
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
    student_id: "",
    username: "",
    is_professor: false,
    is_staff: false,
  });
  const [pwChecking, setPwChecking] = useState<boolean>(false);
  const [pwRepeat, setPwRepeat] = useState<string>("");
  const [customEmail, setCustomEmail] = useState<boolean>(false);
  const nav = useNavigate();

  return (
    <div className={styles.signup}>
      <header className={styles.header}>
        <a href='https://my.snu.ac.kr'>
          <img src={loginHeader} alt='Login Header' title='Login Header' />
        </a>
      </header>
      <ProgressElement currentStage={currentStage} />
      {currentStage === 0 ? (
        <TermsElement
          currentStage={currentStage}
          setCurrentStage={setCurrentStage}
        />
      ) : currentStage === 1 ? (
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
                    ? "https://nsso.snu.ac.kr/sso/resources/snu/usr/images/student_on.svg"
                    : "https://nsso.snu.ac.kr/sso/resources/snu/usr/images/student.svg"
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
                    ? "https://nsso.snu.ac.kr/sso/resources/snu/usr/images/teacher_on.svg"
                    : "https://nsso.snu.ac.kr/sso/resources/snu/usr/images/teacher.svg"
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
                  // onChange setUserInfo expected
                />
                <FontAwesomeIcon icon={faMinus} className={styles.at} />
                <input
                  type='text'
                  placeholder='12345'
                  className={`${styles.input} ${styles.short}`}
                  // onChange setUserInfo expected
                />
              </div>
            </div>
            <div className={styles.wrapper}>
              <p className={styles.title}>이메일</p>
              <div className={styles.email}>
                <input
                  type='text'
                  placeholder='wafflestudio'
                  className={`${styles.input} ${styles.short}`}
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, email: event.target.value })
                  }
                />
                <FontAwesomeIcon icon={faAt} className={styles.at} />
                {!customEmail && (
                  <select className={`${styles.input} ${styles.short}`}>
                    <option value='snu.ac.kr'>snu.ac.kr</option>
                    <option value='gmail.com'>gmail.com</option>
                    <option value='naver.com'>naver.com</option>
                    <option value='yahoo.com'>yahoo.com</option>
                    <option value='daum.net'>daum.net</option>
                    <option value='narasarang.or.kr'>narasarang.or.kr</option>
                    <option>직접 입력</option>
                  </select>
                )}
              </div>
            </div>
            <div className={styles.wrapper}>
              <p className={styles.title}>비밀번호</p>
              <input
                type='password'
                className={styles.input}
                onChange={(event) =>
                  setUserInfo({ ...userInfo, password: event.target.value })
                }
              />
            </div>
            <div className={styles.wrapper}>
              <p className={styles.title}>비밀번호 확인</p>
              <div className={styles.repeat}>
                <input
                  type='password'
                  className={styles.input}
                  onChange={(event) => {
                    setPwChecking(true);
                    setPwRepeat(event.target.value);
                  }}
                />
                {pwChecking ? (
                  <img
                    className={styles.alert}
                    src={
                      pwRepeat === userInfo.password
                        ? "https://cdn-icons-png.flaticon.com/512/5610/5610944.png"
                        : "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                    }
                    alt='비밀번호 확인'
                  />
                ) : null}
              </div>
            </div>
          </div>
          <button
            className={styles.next}
            onClick={() => setCurrentStage(currentStage + 1)}
          >
            다음
          </button>
        </div>
      ) : (
        <div className={styles.signup}>
          <h2 className={styles.done}>회원가입이 완료되었습니다.</h2>
          <button className={styles.next} onClick={() => nav("/login")}>
            돌아가기
          </button>
        </div>
      )}
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
