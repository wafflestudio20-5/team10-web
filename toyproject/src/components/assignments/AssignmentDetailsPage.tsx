import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
    useRef,
} from 'react';
import SubjectTemplate from '../SubjectTemplate';
import styles from './AssignmentDetailsPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import {
  apiAssignmentScore,
  apiAssignments,
  apiGetFile,
  auth,
  url,
  apiUploadImage,
  apiSubmitAssignment, apiGetSubmittedAssignment,
} from '../../lib/api';
import { useSessionContext } from '../../context/SessionContext';
import { UserAssignmentInterface } from '../../lib/types';
import { timestampToDateWithLetters } from '../../lib/formatting';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

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

const DownloadFile = ({
  file,
  token,
}: {
  file: string;
  token: string | null;
}) => {
  const originalFileURL = decodeURI(file);
  const urlParams = originalFileURL.split('assignments/')[1].split('?X-Amz')[0];
  const parts = urlParams.split('.');
  const extension = parts[parts.length - 1];
  const handleDownload = async (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    await apiGetFile(file, token, urlParams, extension);
  };

  return (
    <span className={styles.download} onClick={handleDownload}>
      {urlParams}
    </span>
  );
};

export default function AssignmentDetailsPage() {
  const { token, getRefreshToken, user } = useSessionContext();
  const { subjectid, assignmentID } = useParams();
  const [userAssignment, setUserAssignment] =
    useState<UserAssignmentInterface>();
  const [submitFile, setSubmitFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement | null >(null);
  const [submittedFile, setSubmittedFile] = useState<string | null>(null);
  const navigate = useNavigate();

  const onUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[];
      if (e.type === 'drop') {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }
      setSubmitFile(selectFiles[0]);
    },
    [submitFile]
  );

  const onSubmission = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (submitFile) {
      const formData = new FormData(formRef.current ? formRef.current : undefined);
      formData.append('file', submitFile);
      apiSubmitAssignment(token, userAssignment?.assignment.id as number, formData)
        .then(() => {
          setSubmitFile(null);
          setUserAssignment(userAssignment ? {...userAssignment, is_submitted: true} : undefined)
          toast('?????????????????????!', {
            position: 'top-center',
            theme: 'colored',
          });
        })
        .catch((r) => {
          toast('????????? ??????????????????', {
            position: 'top-center',
            theme: 'colored',
          });
          console.log(r);
        });
    }
  };

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await apiAssignment(
          token,
          parseInt(assignmentID as string)
        );
        const a = await apiAssignmentScore(token, res.data.id);
        setUserAssignment({
          assignment: res.data,
          is_submitted: a.data.is_submitted,
          is_graded: a.data.is_graded,
          score: a.data.score,
        });
      } catch {
        const localRefreshToken = localStorage.getItem('refresh');
        const resToken = await getRefreshToken(
          localRefreshToken ? localRefreshToken : 'temp'
        );
        const newToken = resToken.data.access;
        const res = await apiAssignment(
          token,
          parseInt(assignmentID as string)
        );
        const a = await apiAssignmentScore(newToken, res.data.id);
        setUserAssignment({
          assignment: res.data,
          is_submitted: a.data.is_submitted,
          is_graded: a.data.is_graded,
          score: a.data.score,
        });
      }
    })();
  }, [token]);

  useEffect(() => {
    if (userAssignment){
      apiGetSubmittedAssignment(token, userAssignment.assignment.id, Number(user?.id))
          .then((r) => {
            setSubmittedFile(r.data.url)
          })
          .catch((r) => console.log(r))
    }
  }, [userAssignment])

  return (
    <SubjectTemplate
      subject={subjectid as string}
      page='??????'
      content={userAssignment?.assignment.name}
    >
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <header className={styles.header}>
            <p className={styles.title}>{userAssignment?.assignment.name}</p>
            {submitFile ? (
              <div className={styles.headerSubmit}>
                <p className={styles.fileName}>{submitFile.name}</p>
                <form
                  name='assignment'
                  encType='multipart/form-data'
                  onSubmit={(e) => onSubmission(e)}
                >
                  <input
                    type='submit'
                    style={{ display: 'none' }}
                    id='fileSubmit'
                    accept='image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv'
                  />
                  <label htmlFor='fileSubmit' className={styles.submit}>
                    <p>??????</p>
                  </label>
                </form>
              </div>
            ) : (
              <div>
                <form
                    name="submit"
                    encType='multipart/form-data'
                    ref={formRef}
                >
                  <input
                      type='file'
                      id='fileUpload'
                      style={{ display: 'none' }}
                      accept='image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv'
                      onChange={onUpload}
                  />
                  <label htmlFor='fileUpload' className={styles.upload}>
                    <p>
                      {userAssignment?.is_submitted
                          ? '?????? ????????????'
                          : '?????? ????????????'}
                    </p>
                  </label>
                </form>
              </div>
            )}
          </header>
          <ul className={styles.details}>
            <b>??????</b>
            <li>
              {timestampToDateWithLetters(
                userAssignment?.assignment.due_date as string
              )}
            </li>
            <b>??????</b>
            <li>{userAssignment?.assignment.max_grade}</li>
            <b>??????</b>
            <li>
              {userAssignment?.assignment.file ? (
                <DownloadFile
                  file={userAssignment?.assignment.file}
                  token={token}
                ></DownloadFile>
              ) : (
                '?????? ??????'
              )}
            </li>
          </ul>
          <article className={styles.content}>?????? ??????</article>
        </div>
        <div className={styles.right}>
          <header>?????? ??????</header>
          {isOpen(userAssignment?.assignment.due_date as string) ? (
            <b>
              <FontAwesomeIcon icon={faCircleCheck} className={styles.fa} />
              ?????? ??????
            </b>
          ) : (
            <b className={styles.closed}>
              <FontAwesomeIcon icon={faCircleXmark} className={styles.fa} />
              ??????
            </b>
          )}
          <header>?????????</header>
          {userAssignment?.is_submitted ? (
              <div>
                <b>
                  <FontAwesomeIcon icon={faCircleCheck} className={styles.fa} />
                  ?????????
                </b>
                {
                  submittedFile ?
                      <a className={styles.link} onClick={() => window.open(submittedFile, '_blank')}>
                        ????????? ??????<br/><br/>
                      </a> : null
                }
              </div>
          ) : (
            <b className={styles.closed}>
              <FontAwesomeIcon icon={faCircleXmark} className={styles.fa} />
              ???????????? ??????
            </b>
          )}
          <header>??????</header>
          {userAssignment?.is_graded ? (
            <b className={styles.score}>{'' + userAssignment?.score + '???'}</b>
          ) : (
            <b className={styles.score}>???????????? ??????</b>
          )}
        </div>
      </div>
    </SubjectTemplate>
  );
}
