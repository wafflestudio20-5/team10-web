import React from 'react';

type SubjectListType = {
  name: string;
  created_by: string | { username: string };
};

export default function SubjectList({ name, created_by }: SubjectListType) {
  return (
    <div>
      {name}
      <button>수강 취소</button> <button>수강 신청</button>
    </div>
  );
}
