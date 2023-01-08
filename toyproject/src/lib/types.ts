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
