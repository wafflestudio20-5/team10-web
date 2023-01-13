// 학생 user 정보 (로그인 했을 때 날아오는 response body)
export type User = {
  email: string;
  password: string;
  username: string;
  student_id: string;
  is_professor: boolean;
  is_superuser: boolean;
  classes: [
    {
      name: string;
    }
  ];
};

// 이용 약관
export interface Term {
  title: string;
  content: JSX.Element;
}

// 회원 가입하는 유저 정보 양식
export interface SignUpRequestBody {
  email: string;
  password: string;
  username: string;
  student_id: string;
  is_professor: boolean;
}
