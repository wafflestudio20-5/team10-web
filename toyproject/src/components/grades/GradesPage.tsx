import SubjectTemplate from '../SubjectTemplate';
import styles from './GradesPage.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSessionContext } from '../../context/SessionContext';
import { apiAssignments, apiAssignmentScore } from '../../lib/api';
import { useSubjectContext } from '../../context/SubjectContext';
import { AssignmentInterface } from '../../lib/types';

export default function GradesPage() {
  const { subjectname } = useParams();
  const { user } = useSessionContext();
  const { curSubject } = useSubjectContext();
  const { token } = useSessionContext();
  console.log(curSubject);

  const [assignments, setAssignments] = useState<AssignmentInterface[]>([]);

  const id = curSubject?.id ?? 0;

  useEffect(() => {
    (async () => {
      const res = await apiAssignments(token, id);
      console.log(res.data);
      setAssignments(res.data);
    })();
  }, []);

  //useEffect로 과제별 성적 받아오기
  //api.ts에 정의해두기

  return (
    <SubjectTemplate
      subject={subjectname as string}
      page='성적'
      content={`${user?.username} (${user?.student_id})`}
    >
      <h1
        className={styles.h1}
      >{`${user?.username} (${user?.student_id})의 성적`}</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.name}>이름</th>
            <th className={styles.dueDate}>마감</th>
            <th className={styles.status}>상태</th>
            <th className={styles.grade}>점수</th>
            <th className={styles.maxGrade}>총점</th>
          </tr>
        </thead>
        <tbody>
          {assignments &&
            assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className={styles.name}>
                  {assignment.name}
                  <br />
                  <span>과제</span>
                </td>
                <td className={styles.dueDate}>{assignment.due_date}</td>
                <td className={styles.status}>과제 상태 아직 연결 안함</td>
                <td className={styles.grade}>과제 점수 아직 연결 안함</td>
                <td className={styles.maxGrade}>{assignment.max_grade}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </SubjectTemplate>
  );
}
