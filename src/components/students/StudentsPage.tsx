import React from 'react';
import SubjectTemplate from '../SubjectTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import styles from './StudentsPage.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Searchbar from '../Searchbar';
import { useSessionContext } from '../../context/SessionContext';
import { StudentsOfSubject } from '../../lib/types';
import { apiGetStudentsOfSubject, apiGetSubjectInfo } from '../../lib/api';

export default function StudentsPage() {
  const { token } = useSessionContext();
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');
  const { subjectid } = useParams();

  const [students, setStudents] = useState<StudentsOfSubject[] | undefined>([]);
  const [studentsToShow, setStudentsToShow] = useState<
    StudentsOfSubject[] | undefined
  >(students);
  const [subTitle, setSubTitle] = useState('');

  const getStudentsOfSubject = (token: string | null, id: number) => {
    apiGetStudentsOfSubject(token, id)
      .then((res) => {
        setStudents(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    (async () => {
      const id = Number(subjectid);
      if (token) {
        const res = await apiGetSubjectInfo(token, id);
        setSubTitle(res.data.name);
        getStudentsOfSubject(token, id);
      }
    })();
  }, [token, subjectid]);

  const filterStudents = () => {
    let filteredStudents = students;
    if (searchType === 'student') {
      filteredStudents = filteredStudents?.filter(
        (student) => !student.is_professor
      );
    } else if (searchType === 'professor') {
      filteredStudents = filteredStudents?.filter(
        (student) => student.is_professor
      );
    }
    filteredStudents = filteredStudents?.filter((student) =>
      student.username?.includes(searchValue)
    );
    setStudentsToShow(filteredStudents);
  };

  useEffect(() => {
    filterStudents();
  }, [students, searchValue, searchType]);

  const handleType = (type: boolean) => {
    if (type === true) {
      return '교수자';
    } else if (type === false) {
      return '학생';
    }
  };
  return (
    <SubjectTemplate subject={subjectid as string} page='수강생'>
      <section>
        <Searchbar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          inputPlaceHolder='사용자 검색'
        />
        <select
          className={styles.typeSearchbar}
          value={searchType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            e.preventDefault();
            setSearchType(e.target.value);
          }}
        >
          <option value='every'>모든 역할</option>
          <option value='student'>학생</option>
          <option value='professor'>교수</option>
        </select>
      </section>

      {studentsToShow && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.pic}></th>
              <th className={styles.name}>이름</th>
              <th className={styles.subject}>과목</th>
              <th className={styles.type}>역할</th>
            </tr>
          </thead>
          <tbody>
            {studentsToShow?.map((student) => (
              <tr key={student.id}>
                <td className={styles.pic}>
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className={styles.circleUser}
                  />
                </td>
                <td className={styles.name}>{student.username}</td>
                <td className={styles.subject}>{subTitle}</td>
                <td className={styles.type}>
                  {handleType(student.is_professor)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </SubjectTemplate>
  );
}
