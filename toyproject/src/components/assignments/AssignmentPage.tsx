import React, { useEffect, useState } from 'react';
import AssignmentBlock from './AssignmentBlock';
import styles from './AssignmentPage.module.scss';
import SubjectTemplate from '../SubjectTemplate';
import { useNavigate, useParams } from 'react-router-dom';
import { AssignmentInterface, UserAssignmentInterface } from '../../lib/types';
import {
  apiAssignments,
  apiAllAssignmentScore,
} from '../../lib/api';
import { useSessionContext } from '../../context/SessionContext';

function sortByCategory(assignments: UserAssignmentInterface[]) {
  for (const assignment of assignments) {
  }
}

interface Score {
  id: number;
  assignment: number;
  is_submitted: boolean;
  is_graded: boolean;
  score: number;
}

interface categorizedAssignments {
  category: string;
  assignments: UserAssignmentInterface[];
}

export default function AssignmentPage() {
  const { token, getRefreshToken } = useSessionContext();
  const { subjectid } = useParams();

  /** states */
  const [isCategorized, setIsCategorized] = useState(true);
  const [assignments, setAssignments] = useState<AssignmentInterface[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [userAssignments, setUserAssignments] = useState<UserAssignmentInterface[]>([]);
  const [assignmentsByCategory, setAssignmentsByCategory] = useState<categorizedAssignments[]>([]);
  const [assignmentsByTime, setAssignmentsByTime] = useState<categorizedAssignments[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const getAllAssignments = (token: string | null, class_id: number) => {
    apiAssignments(token, class_id)
      .then((r) => {
        setAssignments(r.data);
        getAssignmentScore(token, class_id);
      })
      .catch((r) => console.log(r));
  };

  const getAssignmentScore = (token: string | null, class_id: number) => {
    apiAllAssignmentScore(token, class_id)
      .then((r) => {
        setScores(r.data);
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
  }, [setAssignments, setScores, setAssignmentsByCategory, token]);

  useEffect(() => {
    const searchResult = assignments.filter((a) => a.name.includes(searchValue));
    assignments && scores && setUserAssignments(
        searchResult.map((a) => {
          let index = scores.findIndex((s) => s.assignment === a.id);
          return {
            assignment: a,
            is_submitted: scores[index]?.is_submitted,
            is_graded: scores[index]?.is_graded,
            score: scores[index]?.score,
          };
        })
    );
    const duplicatedCategories = userAssignments.map(u => u.assignment.category);
    const uniqueCategories = duplicatedCategories.filter((elem, idx) => {
      return duplicatedCategories.indexOf(elem) === idx;
    });
    setAssignmentsByCategory(uniqueCategories.map((cat) => {
      return {
        category: cat,
        assignments: userAssignments.filter((u) => u.assignment.category === cat)
      }
    }));
    const copy = [...userAssignments];
    copy.sort((u: UserAssignmentInterface) => parseInt(u.assignment.due_date));
    setAssignmentsByTime([{
      category: "마감일 순",
      assignments: copy
    }])
  }, [assignments, scores, searchValue, setSearchValue])

  return (
    <SubjectTemplate
      subject={subjectid as string}
      page='과제'
      content={undefined}
    >
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <input placeholder='과제 검색' onChange={(e) => setSearchValue(e.target.value)}/>
          <button
            className={isCategorized ? undefined : styles.categorized}
            onClick={() => setIsCategorized(false)}
          >
            마감순으로 보기
          </button>
          <button
            className={isCategorized ? styles.categorized : undefined}
            onClick={() => setIsCategorized(true)}
          >
            유형별로 보기
          </button>
        </header>
        {
          isCategorized ?
          assignmentsByCategory.map((elem) => (
            <AssignmentBlock
                isCategorized={true}
              key={elem.category}
              assignmentBlock={elem.assignments}
            />
          )) :
              assignmentsByTime.map((elem) => (
                  <AssignmentBlock
                      isCategorized={false}
                      key={elem.category}
                      assignmentBlock={elem.assignments}
                  />
              ))
        }
      </div>
    </SubjectTemplate>
  );
}
