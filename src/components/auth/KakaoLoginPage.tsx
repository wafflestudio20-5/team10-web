import React, { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from './KakaoLoginPage.module.scss';
import axios from 'axios';
import { KAKAO_AUTH_URL, url } from '../../lib/api';

export default function KakaoLoginPage() {
  let code = new URL(window.location.href).searchParams.get('code');

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios({
  //         method: 'get',
  //         // url: url(`/authentication/kakao/login/`),
  //         url: KAKAO_AUTH_URL,
  //         data: {
  //           grant_type: 'authorization_code',
  //           client_id: '52dd93ef1080aec2f79528f6aa8a9d68',
  //           redirection_uri:
  //             'http://localhost:3000/authentication/kakao/callback/',
  //           code: code,
  //         },
  //         withCredentials: true,
  //       });
  //       console.log(res);
  //     } catch {}
  //   })();
  // }, []);
  console.log(code);

  return (
    <div className={styles.wrapper}>
      <ClipLoader loading={true} color={'#0F0F6E'} size={60}></ClipLoader>
    </div>
  );
}
