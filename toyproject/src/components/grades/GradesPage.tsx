import SubjectTemplate from "../SubjectTemplate";
import styles from "./GradesPage.module.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSessionContext } from "../../context/SessionContext";

export default function GradesPage() {
  const { subjectname } = useParams();
  const { user } = useSessionContext();

  const [assignments, setAssignments] = useState([
    {
      id: 0,
      name: "과제1",
      dueDate: "2023.01.01.",
      status: "done",
      grade: 50,
      maxGrade: 100,
    },
    {
      id: 1,
      name: "과제2",
      dueDate: "2023.01.01.",
      status: "done",
      grade: 100,
      maxGrade: 100,
    },
  ]);

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
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td className={styles.name}>
                {assignment.name}
                <br />
                <span>과제</span>
              </td>
              <td className={styles.dueDate}>{assignment.dueDate}</td>
              <td className={styles.status}>{assignment.status}</td>
              <td className={styles.grade}>{assignment.grade}</td>
              <td className={styles.maxGrade}>{assignment.maxGrade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SubjectTemplate>
  );
}
