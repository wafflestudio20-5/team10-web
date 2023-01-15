import React, { useState } from 'react';
import styles from './PasswordForm.module.scss';
export default function PasswordForm({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [passwordBox, setPasswordBox] = useState<boolean>(false);

  const togglePasswordBox = () => {
    setPasswordBox((prev) => !prev);
  };

  let hiddenPassword = '';
  for (let i = 0; i < content.length; i++) {
    hiddenPassword += '*';
  }

  return (
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
            <input placeholder='기존 비밀번호' type={'password'}></input>
            <input placeholder='새 비밀번호' type={'password'}></input>
            <div className={styles['button-container']}>
              <button onClick={togglePasswordBox}>취소</button>
              <button>저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
