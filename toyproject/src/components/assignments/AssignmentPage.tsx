import React, { useEffect, useState } from 'react';
import AssignmentBlock from './AssignmentBlock';
import styles from './AssignmentPage.module.scss';
import SubjectTemplate from '../SubjectTemplate';
import { useNavigate, useParams } from 'react-router-dom';
import { AssignmentInterface, UserAssignmentInterface } from '../../lib/types';
import {
  apiAssignments,
  apiAssignmentScore,
  apiAllAssignmentScore,
} from '../../lib/api';
import { useSessionContext } from '../../context/SessionContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function sortByCategory(assignments: UserAssignmentInterface[]) {
  for (const assignment of assignments) {
  }
}

interface Score {
  id: number;
  is_submitted: boolean;
  is_graded: boolean;
  score: number;
}

export default function AssignmentPage() {
  const { token, getRefreshToken } = useSessionContext();
  const { subjectid } = useParams();
  const [isCategorized, setIsCategorized] = useState(true);
  // const [assignmentsByTime, setAssignmentsByTime] = useState<AssignmentInterface>({
  //     assignments: []
  // });
  const [assignments, setAssignments] = useState<AssignmentInterface[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [userAssignments, setUserAssignments] = useState<
    UserAssignmentInterface[]
  >([]);
  const [categoryBlocks, setCategoryBlocks] = useState<
    {
      category: string;
      assignments: UserAssignmentInterface[];
    }[]
  >([]);
  const navigate = useNavigate();

  const getAllAssignments = (token: string | null, class_id: number) => {
    apiAssignments(token, class_id)
      .then((r) => {
        setAssignments(r.data);
        console.log(r.data);
        getAssignmentScore(token, class_id);
      })
      .catch((r) => console.log(r));
  };

  const getAssignmentScore = (token: string | null, class_id: number) => {
    apiAllAssignmentScore(token, class_id)
      .then((r) => {
        setScores(r.data);
        console.log(r.data);
        setUserAssignments(
          assignments.map((a) => {
            let index = scores.findIndex((s) => s.id === a.id);
            return {
              assignment: a,
              is_submitted: scores[index].is_submitted,
              is_graded: scores[index].is_graded,
              score: scores[index].score,
            };
          })
        );
      })
      .catch((r) => console.log(r));
  };

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const id = Number(subjectid);
        getAllAssignments(token, id);
      } catch {
        const id = Number(subjectid);
        const localRefreshToken = localStorage.getItem('refresh');
        const resToken = await getRefreshToken(
          localRefreshToken ? localRefreshToken : 'temp'
        );
        const newToken = resToken.data.access;
        getAllAssignments(newToken, id);
      }
    })();
  }, [setAssignments, setScores, setCategoryBlocks, token]);

  return (
    <SubjectTemplate
      subject={subjectid as string}
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
        {categoryBlocks.map((elem) => (
          <AssignmentBlock
            key={elem.category}
            assignmentBlock={elem.assignments}
          />
        ))}
      </div>
    </SubjectTemplate>
  );
}
