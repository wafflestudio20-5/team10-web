import React, { useEffect, useState } from 'react';
import SubjectTemplate from '../SubjectTemplate';
import styles from './AssignmentDetailsPage.module.scss';
import { useParams } from 'react-router-dom';
import { apiAssignmentScore, auth, url } from '../../lib/api';
import { useSessionContext } from '../../context/SessionContext';
import { UserAssignmentInterface } from '../../lib/types';
import { timestampToDateWithLetters } from '../../lib/formatting';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

export const apiAssignment = async (
  token: string | null,
  assignment_id: number
) => {
  return await axios({
    method: 'get',
    url: url(`/etl/assignments/${assignment_id}/`),
    withCredentials: true,
    headers: auth(token),
  });
};

const isOpen = (due_date: string): boolean => {
  const timestamp = parseInt(due_date);
  return timestamp - Date.now() > 0;
};

export default function AssignmentDetailsPage() {
  const { token } = useSessionContext();
  const { subjectid, assignmentID } = useParams();
  const [userAssignment, setUserAssignment] =
    useState<UserAssignmentInterface>();

  useEffect(() => {
    apiAssignment(token, parseInt(assignmentID as string))
      .then((a) => {
        apiAssignmentScore(token, a.data.id)
          .then((b) => {
            setUserAssignment({
              assignment: a.data,
              is_submitted: b.data.is_submitted,
              is_graded: b.data.is_graded,
              score: b.data.score,
            });
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }, [token]);

  return (
    <SubjectTemplate
      subject={subjectid as string}
      page='과제'
      content={userAssignment?.assignment.name}
    >
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <header className={styles.header}>
            <p className={styles.title}>{userAssignment?.assignment.name}</p>
            <button className={styles.submit}>과제 제출하기</button>
          </header>
          <ul className={styles.details}>
            <b>마감</b>
            <li>
              {timestampToDateWithLetters(
                userAssignment?.assignment.due_date as string
              )}
            </li>
            <b>만점</b>
            <li>{userAssignment?.assignment.max_grade}</li>
            <b>파일</b>
            <li>
              {userAssignment?.assignment.file
                ? userAssignment?.assignment.file
                : '파일 없음'}
            </li>
          </ul>
          <article className={styles.content}>내용 없음</article>
        </div>
        <div className={styles.right}>
          <header>마감 여부</header>
          {isOpen(userAssignment?.assignment.due_date as string) ? (
            <b>
              <FontAwesomeIcon icon={faCircleCheck} className={styles.fa} />
              제출 가능
            </b>
          ) : (
            <b className={styles.closed}>
              <FontAwesomeIcon icon={faCircleXmark} className={styles.fa} />
              마감
            </b>
          )}
          <header>제출물</header>
          {userAssignment?.is_submitted ? (
            <b>
              <FontAwesomeIcon icon={faCircleCheck} className={styles.fa} />
              제출됨
              {userAssignment?.assignment.file
                ? userAssignment?.assignment.file
                : '파일 없음'}
            </b>
          ) : (
            <b className={styles.closed}>
              <FontAwesomeIcon icon={faCircleXmark} className={styles.fa} />
              제출하지 않음
            </b>
          )}
          <header>성적</header>
          {userAssignment?.is_graded ? (
            <b className={styles.score}>{'' + userAssignment?.score + '점'}</b>
          ) : (
            <b className={styles.score}>채점되지 않음</b>
          )}
        </div>
      </div>
    </SubjectTemplate>
  );
}
