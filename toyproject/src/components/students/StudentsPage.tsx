import SubjectTemplate from "../SubjectTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./StudentsPage.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Searchbar from "../Searchbar";

export default function StudentsPage() {
  const { subjectname } = useParams();

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");

  const [students, setStudents] = useState([
    { id: 0, name: "김가영", subject: subjectname, type: "student" },
    { id: 1, name: "김나영", subject: subjectname, type: "student" },
    { id: 2, name: "이가영", subject: subjectname, type: "professor" },
    { id: 3, name: "김다영", subject: subjectname, type: "student" },
    { id: 4, name: "김라영", subject: subjectname, type: "student" },
  ]);

  const filterStudents = () => {
    if (searchValue) {
      setStudents(
        students.filter((student) => student.name.includes(searchValue))
      );
    }
    if (searchType) {
      setStudents(students.filter((student) => student.type === searchType));
    }
  };

  useEffect(() => {
    filterStudents();
  }, [searchValue, searchType]);

  return (
    <SubjectTemplate subject={subjectname as string} page='수강생'>
      <section>
        <Searchbar searchValue={searchValue} setSearchValue={setSearchValue} />
        <select
          className={styles.typeSearchbar}
          value={searchType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            e.preventDefault();
            setSearchType(e.target.value);
          }}
        >
          <option value=''>모든 역할</option>
          <option value='student'>학생</option>
          <option value='professor'>교수</option>
        </select>
      </section>

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
          {students.map((student) => (
            <tr key={student.id}>
              <td className={styles.pic}>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className={styles.circleUser}
                />
              </td>
              <td className={styles.name}>{student.name}</td>
              <td className={styles.subject}>{student.subject}</td>
              <td className={styles.type}>{student.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SubjectTemplate>
  );
}
