import React, { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from './KakaoLoginPage.module.scss';
import axios from 'axios';
import { apiGetUserInfo, apiKakaoLogin, url } from '../../lib/api';
import { useNavigate } from 'react-router-dom';
import { useSessionContext } from '../../context/SessionContext';
import { CardColor, SubjectType } from '../../lib/types';

export default function KakaoLoginPage() {
  const { setToken, setUser, setColors, setIsLoggedIn } = useSessionContext();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let code = new URL(window.location.href).searchParams.get('code');
      console.log(code);
      const res = await apiKakaoLogin(code);
      setToken(res.data.access_token);
      localStorage.setItem('refresh', res.data.refresh_token); //우선 로컬storage에 refresh 저장해둠
      localStorage.setItem('userId', res.data.user);
      const userInfoRes = await apiGetUserInfo(
        res.data.user,
        res.data.access_token
      );
      console.log(userInfoRes);

      if (userInfoRes.data.username === null) {
        navigate('/login/social');
      } else {
        setIsLoggedIn(true);
        setUser(userInfoRes.data);
        setColors(
          userInfoRes.data.classes.map((c: SubjectType): CardColor => {
            return {
              id: c.id,
              color: '#97bdf5',
            };
          })
        );
        navigate('/');
      }
      //refreshtoken, access token 저장하기
      console.log(res);
    })();
  }, []);

  return (
    <div className={styles.wrapper}>
      <ClipLoader loading={true} color={'#0F0F6E'} size={60}></ClipLoader>
    </div>
  );
}
