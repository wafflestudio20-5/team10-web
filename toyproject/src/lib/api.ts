import axios from 'axios';
// import { useCallback, useEffect, useRef, useState } from "react";
import { User } from './types';

const url = (path: string, param?: Record<string, string>) => {
  return (
    // (process.env.NODE_ENV === "production"
    //   ?
    `https://virtserver.swaggerhub.com/LimSusu/asdfds/1.0.0${path}`
    // : path) + (param ? "?" + new URLSearchParams(param).toString() : "")
  );
};

const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const apiLogin = (email: string, password: string) => {
  return axios.post<User>(
    url('/authentication/login/'),
    { email, password },
    { withCredentials: true }
  );
};
