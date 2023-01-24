import axios from 'axios';
// import { useCallback, useEffect, useRef, useState } from "react";
import { SignUpRequestBody, User } from './types';

export const url = (path: string, param?: Record<string, string>) => {
  return `http://etlclonetoyproject-env.eba-a6rqj2ev.ap-northeast-2.elasticbeanstalk.com${path}`;
};

export const auth = (token: string | null) => ({
  Authorization: `Bearer ${token}`,
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
  return axios.post(
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

export const apiRefreshToken = (token: string | null) => {
  return axios({
    method: 'post',
    url: url('/authentication/token/refresh/'),
    data: {
      refresh: token,
    },
    withCredentials: true,
  });
};

export const apiGetUserInfo = (user_id: number, token: string) => {
  return axios({
    method: 'get',
    url: url(`/authentication/user/${user_id}`),
    headers: auth(token),
    withCredentials: true,
  });
};

//전체 과목 목록을 가져오는 api, 수업 등록에 사용
export const apiGetSubjects = async (token: string | null) => {
  return await axios.get(url('/etl/classes/'), {
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiGetSubjectName = async (token: string | null) => {
  return await axios({
    method: 'get',
    url: url(''),
    data: {},
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

// 수강생 목록 api
export const apiGetStudentsOfSubject = async (
  token: string | null,
  id: number
) => {
  return await axios.get(url(`/etl/class/${id}/user-list/`), {
    withCredentials: true,
    headers: auth(token),
  });
};

// 게시글 목록 (category = 'announcements' or 'questions')
export const apiGetPostList = async (
  token: string | null,
  class_id: number,
  category: string
) => {
  return await axios({
    method: 'get',
    url: url(`/etl/class/${class_id}/${category}/`),
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiGetPost = async (
  token: string | null,
  post_id: number,
  category: string
) => {
  const modifiedCategory = category.slice(0, -1);
  return await axios({
    method: 'get',
    url: url(`/etl/${modifiedCategory}/${post_id}/`),
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiPostReply = async (
  token: string | null,
  post_id: number,
  category: string
) => {
  const modifiedCategory = category.slice(0, -1);
  return await axios({
    method: 'get',
    url: url(`/etl/${modifiedCategory}/${post_id}`),
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiAssignments = async (
  token: string | null,
  class_id: number
) => {
  return await axios.get(url(`/etl/assignments/class/${class_id}/`), {
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
    url: url(`/etl/assignments/${assignment_id}/score/`),
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiAssignmentTotalScore = async (
  token: string | null,
  class_id: number
) => {
  return await axios({
    method: 'get',
    url: url(`/etl/assignments/class/${class_id}/totalscore/`),
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiEnrollClass = async (
  token: string | null,
  class_id: number
) => {
  return await axios({
    method: 'post',
    url: url(`/etl/class/enroll/`),
    data: {
      class_id,
    },
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiDropClass = async (token: string | null, class_id: number) => {
  return await axios({
    method: 'post',
    url: url(`/etl/class/drop/`),
    data: {
      class_id,
    },
    withCredentials: true,
    headers: auth(token),
  });
};

//kakaotalk social login 관련 변수

const CLIENT_ID = '9abd4a226f299f3b2c393cc8dd0b9ed8';
const REDIRECT_URI = 'http://localhost:3000/authentication/kakao/callback/';
// const REDIRECT_URI = url('/authentication/kakao/login');

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const kakaoLogin = () => {
  return axios({});
};
