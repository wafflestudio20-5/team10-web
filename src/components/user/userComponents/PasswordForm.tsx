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
  const [newPw, setNewPw] = useState('');
  const { token } = useSessionContext();

  const handleNewPw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPw(event.target.value);
  };

  const togglePasswordBox = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPasswordBox((prev) => !prev);
  };

  let hiddenPassword = '';
  for (let i = 0; i < content.length; i++) {
    hiddenPassword += '*';
  }

  const changePassword = async (newPw: string) => {
    const res = await axios({
      method: 'post',
      url: url('/authentication/change-password/'),
      data: {
        new_password: newPw,
      },
      withCredentials: true,
      headers: auth(token),
    });
    return res;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await changePassword(newPw);
      setNewPw('');
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
              {/* 이전 비밀번호:
              <input type={'password'} onChange={handlePreviousPw}></input> */}
              새 비밀번호:
              <input type={'password'} onChange={handleNewPw}></input>
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
