import axios from 'axios';
// import { useCallback, useEffect, useRef, useState } from "react";
import { SignUpRequestBody, User } from './types';

export const url = (path: string, param?: Record<string, string>) => {
  return `https://etl-dxnn.onrender.com${path}`;
};

export const auth = (token: string | null) => ({
  Authorization: `Token ${token}`,
});

export const apiSignUp = (
  email: string,
  password: string,
  username: string,
  student_id: string,
  is_professor: boolean
) => {
  return axios.post<SignUpRequestBody>(
    url('/authentication/signup/'),
    { email, password, username, student_id, is_professor },
    { withCredentials: true }
  );
};

export const apiLogin = (email: string, password: string) => {
  return axios.post<User>(
    url('/authentication/login/'),
    { email, password },
    { withCredentials: true }
  );
};

export const apiLogout = (token: string) => {
  return axios.get(url('/authentication/logout/'), {
    withCredentials: true,
    headers: auth(token),
  });
};

//전체 과목 목록을 가져오는 api, 수업 등록에 사용
export const apiSubjects = async (token: string | null) => {
  return await axios.get(url('/etl/class/'), {
    withCredentials: true,
    headers: auth(token),
  });
};
//과목 등록 api
export const enrollSubjects = async (
  token: string | null,
  class_id: number
) => {
  return await axios({
    method: 'post',
    url: url('/etl/class/enroll'),
    data: {
      class_id,
    },
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiStudentsOfSubject = async (
  token: string | null,
  id: number
) => {
  return await axios.get(url(`/etl/class/${id}/user-list/`), {
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiAssignments = async (
  token: string | null,
  class_id: number
) => {
  return await axios.get(url(`/etl/assignments/class/${class_id}`), {
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiAssignmentScore = async (
  token: string | null,
  assignment_id: number
) => {
  return await axios({
    method: 'get',
    url: url(`/etl/assignments/${assignment_id}`),
    withCredentials: true,
    headers: auth(token),
  });
};

//kakaotalk social login 관련 변수

const CLIENT_ID = '9abd4a226f299f3b2c393cc8dd0b9ed8';
const REDIRECT_URI = 'http://localhost:3000/kakaoLogin';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const kakaoLogin = () => {
  return axios({});
};
