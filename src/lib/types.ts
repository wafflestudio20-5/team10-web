// 학생 user 정보 (로그인 했을 때 날아오는 response body)
export type User = {
  id: Number;
  email: string;
  username: string;
  student_id: string;
  is_professor: boolean;
  is_superuser: boolean;
  classes: SubjectType[];
  token: string | null;
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

// 수강생 목록에서 user의 정보
export interface StudentsOfSubject {
  id: number;
  username: string;
  student_id: string;
  is_professor: boolean;
}

export type SubjectType = {
  id: number;
  name: string;
  created_by: {
    username: string;
  };
};

export type Post = {
  id: number;
  title: string;
  content: string;
  created_by: StudentsOfSubject;
  created_at: string;
};

export type Comment = {
  id: number;
  content: string;
  created_by: StudentsOfSubject;
  created_at: string;
};

export type PostDetail = Post & {
  comment: Comment[];
};

export interface AssignmentInterface {
  id: number;
  lecture: number;
  name: string;
  due_date: string;
  max_grade: number;
  weight: number;
  file: string | null;
  category: string;
}

export interface UserAssignmentInterface {
  assignment: AssignmentInterface;
  is_submitted: boolean;
  is_graded: boolean;
  score: number;
}

export interface UserScoreInterface {
  id: number;
  is_submitted: boolean;
  is_graded: boolean;
  score: number;
}
