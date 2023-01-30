import React, { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from './KakaoLoginPage.module.scss';
import axios from 'axios';
import { apiKakaoLogin, url } from '../../lib/api';

export default function KakaoLoginPage() {
  useEffect(() => {
    (async () => {
      let code = new URL(window.location.href).searchParams.get('code');
      const res = await apiKakaoLogin(code!);
      console.log(res);
    })();
  }, []);

  return (
    <div className={styles.wrapper}>
      <ClipLoader loading={true} color={'#0F0F6E'} size={60}></ClipLoader>
    </div>
  );
}
