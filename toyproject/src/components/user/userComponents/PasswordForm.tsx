import React, { useState } from 'react';
import styles from './PasswordForm.module.scss';
import axios from 'axios';
import { auth, url } from '../../../lib/api';
import { useSessionContext } from '../../../context/SessionContext';
import { toast } from 'react-toastify';
export default function PasswordForm({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [passwordBox, setPasswordBox] = useState<boolean>(false);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwConfirm, setNewPwConfirm] = useState('');
  const { token } = useSessionContext();

  const handleCurPw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurPw(event.target.value);
  };

  const handleNewPw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPw(event.target.value);
  };

  const handleNewPwConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPwConfirm(event.target.value);
  };

  const togglePasswordBox = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPasswordBox((prev) => !prev);
  };

  let hiddenPassword = '';
  for (let i = 0; i < content.length; i++) {
    hiddenPassword += '*';
  }

  const changePassword = async (curPw: string, newPw: string) => {
    const res = await axios({
      method: 'post',
      url: url('/authentication/change-password/'),
      data: {
        password: curPw,
        new_password: newPw,
      },
      withCredentials: true,
      headers: auth(token),
    });
    return res;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPw.length === 0) {
      toast('새 비밀번호를 입력해주십시오.', {
        position: 'top-center',
        theme: 'colored',
      });
      return;
    } else if (newPw !== newPwConfirm) {
      toast('새 비밀번호를 확인해주십시오', {
        position: 'top-center',
        theme: 'colored',
      });
      return;
    }
    try {
      const res = await changePassword(curPw, newPw);
      setNewPw('');
      setNewPwConfirm('');
      setPasswordBox((prev) => !prev);
      toast('비밀번호 변경 완료', {
        position: 'top-center',
        theme: 'colored',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data.error, {
          position: 'top-center',
          theme: 'colored',
        });
      } else {
        toast('unknown error', {
          position: 'top-center',
          theme: 'colored',
        });
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.wrapper}>
        <div className={styles.title}>{title}</div>
        {!passwordBox && (
          <div className={styles.content}>
            {hiddenPassword}
            <div className={styles.edit}>
              <button onClick={togglePasswordBox}>편집</button>
            </div>
          </div>
        )}
        {passwordBox && (
          <div className={styles.content}>
            <div className={styles.container}>
              이전 비밀번호:
              <input type={'password'} onChange={handleCurPw}></input>새
              비밀번호:
              <input type={'password'} onChange={handleNewPw}></input>새
              비밀번호 확인:
              <input type={'password'} onChange={handleNewPwConfirm}></input>
              <div className={styles['button-container']}>
                <button
                  className={styles['cancel-button']}
                  onClick={togglePasswordBox}
                  type='button'
                >
                  취소
                </button>
                <button className={styles['submit-button']} type='submit'>
                  저장
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
