import React from 'react';

type SubjectListType = {
  name: string;
  professor: string;
  is_chosen: boolean;
};

export default function SubjectList({
  name,
  professor,
  is_chosen,
}: SubjectListType) {
  return (
    <div>
      {name},{professor},
      {is_chosen ? <button>수강 취소</button> : <button>수강 신청</button>}
    </div>
  );
}
