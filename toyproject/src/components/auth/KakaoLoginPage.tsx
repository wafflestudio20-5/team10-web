import React, { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from './KakaoLoginPage.module.scss';

export default function KakaoLoginPage() {
  let code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  useEffect(() => {
    //login
    //set user state
    //dashboard로 redirect
  });

  return (
    <div className={styles.wrapper}>
      <ClipLoader loading={true} color={'#0F0F6E'} size={60}></ClipLoader>
    </div>
  );
}
