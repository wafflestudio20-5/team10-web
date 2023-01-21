import React, { useEffect, useState } from "react";
import AssignmentBlock from "./AssignmentBlock";
import styles from "./AssignmentPage.module.scss";
import SubjectTemplate from "../SubjectTemplate";
import { useParams } from "react-router-dom";
import {
  AssignmentInterface,
  UserAssignmentInterface,
  AssignmentBlockInterface,
} from "../../lib/types";
import { apiAssignments, apiAssignmentScore } from "../../lib/api";
import { useSessionContext } from "../../context/SessionContext";
import { useSubjectContext } from "../../context/SubjectContext";

export default function AssignmentPage() {
  const { token } = useSessionContext();
  const { curSubject } = useSubjectContext();
  const { subjectname } = useParams();
  const [isCategorized, setIsCategorized] = useState(true);
  // const [assignmentsByTime, setAssignmentsByTime] = useState<AssignmentInterface>({
  //     assignments: []
  // });
  const [assignmentBlocks, setAssignmentBlocks] = useState<
    AssignmentBlockInterface[]
  >([]);

  const getAllAssignments = (token: string | null, class_id: number) => {
    apiAssignments(token, class_id)
      .then((r) => {
        getAssignmentScore(token, r.data);
      })
      .catch((r) => console.log(r));
  };

  const getAssignmentScore = (
    token: string | null,
    assignments: AssignmentInterface[]
  ) => {
    assignments.map((assignment) => {
      apiAssignmentScore(token, assignment.id)
        .then((r) => {
          let temp: UserAssignmentInterface[] = new Array(assignments.length);
          temp[assignments.indexOf(assignment)] = {
            assignment: assignment,
            is_submitted: r.data.is_submitted,
            is_graded: r.data.is_graded,
            score: r.data.score,
          };
          setAssignmentBlocks([
            {
              category: "과제", // category 생기면 바꿀 예정
              assignments: temp,
            },
          ]);
        })
        .catch((r) => console.log(r));
    });
  };

  useEffect(() => {
    if (token) {
      curSubject && getAllAssignments(token, curSubject.id);
    }
  }, [token, setAssignmentBlocks]);

  return (
    <SubjectTemplate
      subject={subjectname as string}
      page='과제'
      content={undefined}
    >
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <input placeholder='과제 검색' />
          <button
            className={isCategorized ? undefined : styles.categorized}
            onClick={() => setIsCategorized(!isCategorized)}
          >
            마감순으로 보기
          </button>
          <button
            className={isCategorized ? styles.categorized : undefined}
            onClick={() => setIsCategorized(!isCategorized)}
          >
            유형별로 보기
          </button>
        </header>
        {assignmentBlocks.map((elem) => (
          <AssignmentBlock key={elem.category} assignmentBlock={elem} />
        ))}
      </div>
    </SubjectTemplate>
  );
}
