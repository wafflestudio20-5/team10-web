import axios from "axios";
// import { useCallback, useEffect, useRef, useState } from "react";
import { SignUpRequestBody, User } from "./types";

const url = (path: string, param?: Record<string, string>) => {
  return `https://etl-dxnn.onrender.com${path}`;
};

const auth = (token: string | null) => ({ Authorization: `Token ${token}` });

export const apiSignUp = (
  email: string,
  password: string,
  username: string,
  student_id: string,
  is_professor: boolean
) => {
  return axios.post<SignUpRequestBody>(
    url("/authentication/signup/"),
    { email, password, username, student_id, is_professor },
    { withCredentials: true }
  );
};

export const apiLogin = (email: string, password: string) => {
  return axios.post<User>(
    url("/authentication/login/"),
    { email, password },
    { withCredentials: true }
  );
};

export const apiLogout = (token: string) => {
  return axios.get(url("/authentication/logout/"), {
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiSubjects = async (token: string | null) => {
  return await axios.get(url("/etl/class/list/"), {
    withCredentials: true,
    headers: auth(token),
  });
};

//kakaotalk social login 관련 변수

const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const kakaoLogin = () => {
  return axios({});
};
