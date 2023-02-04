import axios from 'axios';
// import { useCallback, useEffect, useRef, useState } from "react";
import { Post, PostDetail, SignUpRequestBody } from './types';

export const url = (path: string, param?: Record<string, string>) => {
  return `http://etlclone-env.eba-dxtv92ct.ap-northeast-2.elasticbeanstalk.com${path}`;
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

export const apiSocialLogout = (token: string) => {
  return axios({
    method: 'get',
    url: url('/authentication/kakao/logout/'),
    withCredentials: true,
    // headers: auth(token),
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

export const apiPatchUserInfo = (
  user_id: string | null,
  token: string,
  username: string,
  student_id: string,
  is_professor: boolean,
  is_social_login: boolean
) => {
  return axios({
    method: 'patch',
    url: url(`/authentication/user/${user_id}/`),
    headers: auth(token),
    data: {
      username,
      student_id,
      is_professor,
      is_social_login,
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
export const apiGetSubjects = async (
  token: string | null,
  page: number,
  searchValue: string
) => {
  if (searchValue) {
    return await axios({
      method: 'get',
      url: url(`/etl/classes/?name=${searchValue}&page=${page}`),
      withCredentials: true,
      headers: auth(token),
    });
  } else {
    return await axios({
      method: 'get',
      url: url(`/etl/classes/?page=${page}`),
      withCredentials: true,
      headers: auth(token),
    });
  }
};

// export const apiGetSubjects = async (
//   token: string | null,
//   page: number | null,
//   searchValue: string
// ) => {
//   if (searchValue) {
//     return await axios({
//       method: "get",
//       url: url(page ? `/etl/classes/?page=${page}` : `/etl/classes/`),
//       withCredentials: true,
//       headers: auth(token),
//     });
//   } else {
//     return await axios({
//       method: "get",
//       url: url(page ? `/etl/classes/?page=${page}` : `/etl/classes/`),
//       withCredentials: true,
//       headers: auth(token),
//     });
//   }
// };

export const apiGetSubjectInfo = async (token: string | null, id: number) => {
  return await axios({
    method: 'get',
    url: url(`/etl/class/${id}`),
    withCredentials: true,
    headers: auth(token),
  });
};

// 수강생 목록 api
export const apiGetStudentsOfSubject = async (
  token: string | null,
  id: number,
  page: number
  // searchValue: string
) => {
  // if (searchValue) {
  return await axios.get(url(`/etl/class/${id}/user-list/?page=${page}`), {
    withCredentials: true,
    headers: auth(token),
  });
  // } else {
  //   return await axios.get(url(`/etl/class/${id}/user-list/?page=${page}`), {
  //     withCredentials: true,
  //     headers: auth(token),
  //   });
  // }
};

// 게시글 목록 (category = 'announcements' or 'questions')
export const apiGetPostList = async (
  token: string | null,
  class_id: number,
  category: string,
  page: number,
  searchValue: string
) => {
  if (searchValue) {
    return await axios({
      method: 'get',
      url: url(
        `/etl/class/${class_id}/${category}/?name=${searchValue}&page=${page}`
      ),
      withCredentials: true,
      headers: auth(token),
    });
  } else {
    return await axios({
      method: 'get',
      url: url(`/etl/class/${class_id}/${category}/?page=${page}`),
      withCredentials: true,
      headers: auth(token),
    });
  }
};

// 게시글 세부 내용 가져오기
export const apiGetPost = async (
  token: string | null,
  post_id: number,
  category: string
) => {
  const modifiedCategory = category.slice(0, -1);
  return await axios.get(url(`/etl/${modifiedCategory}/${post_id}/`), {
    withCredentials: true,
    headers: auth(token),
  });
};

// 새 게시글 올리기
export const apiPostNewPost = async (
  token: string | null,
  class_id: number,
  title: string,
  content: string,
  category: string
) => {
  return await axios.post<Post>(
    url(`/etl/class/${class_id}/${category}/`),
    { title, content },
    {
      withCredentials: true,
      headers: auth(token),
    }
  );
};

// 게시글 수정
export const apiPatchPost = async (
  token: string | null,
  post_id: number,
  title: string,
  content: string,
  category: string
) => {
  const modifiedCategory = category.slice(0, -1);
  return await axios.patch<PostDetail>(
    url(`/etl/${modifiedCategory}/${post_id}/`),
    { title, content },
    {
      withCredentials: true,
      headers: auth(token),
    }
  );
};

// 게시글 삭제
export const apiDeletePost = async (
  token: string | null,
  post_id: number | undefined,
  category: string
) => {
  const modifiedCategory = category.slice(0, -1);
  return await axios.delete(url(`/etl/${modifiedCategory}/${post_id}/`), {
    withCredentials: true,
    headers: auth(token),
  });
};

// 게시글에 댓글 달기
export const apiPostReply = async (
  token: string | null,
  post_id: number,
  content: string
) => {
  return await axios.post<Comment>(
    url(`/etl/post/${post_id}/comments/`),
    { content },
    {
      withCredentials: true,
      headers: auth(token),
    }
  );
};

// 게시글 댓글 수정
export const apiPatchReply = async (
  token: string | null,
  comment_id: number,
  content: string
) => {
  return await axios.patch<Comment>(
    url(`/etl/comment/${comment_id}/`),
    { content },
    {
      withCredentials: true,
      headers: auth(token),
    }
  );
};

// 게시글에 댓글 삭제
export const apiDeleteReply = async (
  token: string | null,
  comment_id: number
) => {
  return await axios.delete(url(`/etl/comment/${comment_id}/`), {
    withCredentials: true,
    headers: auth(token),
  });
};

//

export const apiAssignments = async (
  token: string | null,
  class_id: number
) => {
  return await axios.get(url(`/etl/assignments/class/${class_id}/`), {
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiBye = async (token: string | null, id: Number) => {
  return await axios({
    method: 'delete',
    url: url(`/authentication/user/${id}/`),
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

export const apiAllAssignmentScore = async (
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

export const apiSubmitAssignment = async (
  token: string | null,
  assignment_id: number,
  file: FormData | null
) => {
  return await axios({
    method: 'PATCH',
    url: url(`/etl/assignments/${assignment_id}/upload/`),
    data: file,
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiGetSubmittedAssignment = async (
    token: string | null,
    assignment_id: number,
    user_id: number,
) => {
  return await axios({
    method: 'GET',
    url: url(`/etl/assignments/${assignment_id}/user/${user_id}/download/`),
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiUploadImage = async (
  token: string | null,
  file: FormData | null
) => {
  return await axios({
    method: 'PATCH',
    url: url(`/authentication/profile/`),
    data: file,
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiDownloadImage = async (token: string | null) => {
  return await axios({
    method: 'GET',
    url: url(`/authentication/profile/download/`),
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

//모듈 api

export const apiGetModules = async (token: string | null, class_id: number) => {
  return await axios({
    method: 'get',
    url: url(`/etl/module/class/${class_id}/`),
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiGetFile = async (
  file: string,
  token: string | null,
  filename: string,
  extension: string
) => {
  try {
    const response = await axios({
      url: file,
      method: 'get',
      responseType: 'blob', // important
      withCredentials: true,
      // headers: auth(token),
    });
    const url_1 = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url_1;
    link.setAttribute('download', `${filename}`);
    document.body.appendChild(link);
    link.click();
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const apiEvaluate = async (
    token: string | null,
    class_id: number,
    scales: number[],
    goodPoint: string,
    badPoint: string,
    student_id: Number | undefined
) => {
  return await axios({
    method: 'post',
    url: url(`/etl/evaluation/class/${class_id}/`),
    data: {
      choice_1: scales[0],
      choice_2: scales[1],
      choice_3: scales[2],
      choice_4: scales[3],
      choice_5: scales[4],
      choice_6: scales[5],
      choice_7: scales[6],
      descriptive_1: goodPoint,
      descriptive_2: badPoint,
      lecture: class_id,
      student: student_id,
    },
    withCredentials: true,
    headers: auth(token),
  });
};

export const apiKakaoLogin = async (code: string | null) => {
  return await axios({
    method: 'post',
    url: url('/authentication/kakao/callback/'),
    data: {
      code: code,
    },
    withCredentials: true,
  });
};

//kakaotalk social login 관련 변수
export const CLIENT_ID = '52dd93ef1080aec2f79528f6aa8a9d68';
// const CLIENT_ID = '9abd4a226f299f3b2c393cc8dd0b9ed8';
// export const REDIRECT_URI =
// 'http://localhost:3000/authentication/kakao/callback/';
const REDIRECT_URI =
  'http://waffletoyproject10.s3-website.ap-northeast-2.amazonaws.com/authentication/kakao/callback/';
// "http://dvn7ib10xdyoj.cloudfront.net/authentication/kakao/callback/";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const kakaoLogin = () => {
  return axios({});
};
