import React from 'react';

type Subject = {
  id: number;
  name: string;
};

type SubjectType = {
  subject: Subject;
};

export const Subject = ({ subject }: SubjectType) => {
  return <>{subject.name}</>;
};
