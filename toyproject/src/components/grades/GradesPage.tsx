import SubjectTemplate from '../SubjectTemplate';
import styles from './GradesPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSessionContext } from '../../context/SessionContext';
import {
  apiAssignments,
  apiAssignmentScore,
  apiAssignmentTotalScore,
} from '../../lib/api';
import { AssignmentInterface, UserScoreInterface } from '../../lib/types';
import dayjs from 'dayjs';

export default function GradesPage() {
  const { subjectid } = useParams();

  const { user } = useSessionContext();
  const { token, getRefreshToken } = useSessionContext();

  const [assignments, setAssignments] = useState<AssignmentInterface[]>([]);
  const [scores, setScores] = useState<UserScoreInterface[]>([]);

  const id = Number(subjectid);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const assignRes = await apiAssignments(token, id); //token을 이전거를 사용하게 된다.
      setAssignments(assignRes.data);
      const scoreRes = await apiAssignmentTotalScore(token, id);
      setScores(scoreRes.data);
    })();
  }, [subjectid, token]);

  return (
    <SubjectTemplate
      subject={subjectid as string}
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
            assignments.map((assignment, assignmentIdx) => {
              const timestamp = Number(assignment.due_date);
              const date = dayjs(timestamp).format('YYYY-MM-DD');
              return (
                <tr key={assignment.id}>
                  <td className={styles.name}>{assignment.name}</td>
                  <td className={styles.dueDate}>{date}</td>
                  <td className={styles.status}>
                    {scores.map((score, scoreIdx) => {
                      if (scoreIdx === assignmentIdx) {
                        return score.is_submitted ? '제출됨' : '제출되지 않음';
                      }
                    })}
                  </td>
                  <td className={styles.grade}>
                    {scores.map((score, scoreIdx) => {
                      if (scoreIdx === assignmentIdx) {
                        return score.score;
                      }
                    })}
                  </td>
                  <td className={styles.maxGrade}>{assignment.max_grade}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </SubjectTemplate>
  );
}
