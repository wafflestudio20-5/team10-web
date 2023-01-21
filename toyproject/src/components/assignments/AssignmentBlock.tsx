import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Assignment.module.scss";
import {faCaretDown, faCaretRight, faPenToSquare, faFileExport} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

export interface AssignmentInterface {      // Assignment-Unique
    id: number,
    lecture: number,
    name: string,
    due_date: string,
    max_grade: number,
    weight: number
    file: string | null,
}

export interface UserAssignmentInterface {
    assignment: AssignmentInterface,
    is_submitted: boolean,
    is_graded: boolean,
    score: number,
}

export interface AssignmentBlockInterface {
    category: string,
    assignments: UserAssignmentInterface[],
}

const dateTimeFormat = (timestamp: string): string => {
    const date = new Date(parseInt(timestamp));
    console.log(date.toDateString());
    return "" + date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일"
}

const Assignment = ({assignment}: { assignment: UserAssignmentInterface }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.assignment} onClick={() => navigate(assignment.assignment.name)}>
            <FontAwesomeIcon icon={faPenToSquare} className={styles.pen_icon}/>
            <div className={styles.right}>
                <p className={styles.top}>{assignment.assignment.name}</p>
                <p className={styles.bottom}>
                    <b>마감  </b>
                    {dateTimeFormat(assignment.assignment.due_date) + "  |  "}
                    {
                        assignment.is_graded
                            ? "" + assignment.score + "/" + assignment.assignment.max_grade
                            : "채점되지 않음"
                    }
                </p>
            </div>
        </div>
    )
}

export default function AssignmentBlock({assignmentBlock}: { assignmentBlock: AssignmentBlockInterface }) {
    const [toggleOpen, setToggleOpen] = useState<boolean>(true);
    return (
        <div className={styles.block}>
            <header className={styles.header}>
                <button className={styles.toggle} onClick={() => setToggleOpen(!toggleOpen)}>
                    <FontAwesomeIcon icon={toggleOpen ? faCaretDown : faCaretRight} className={styles.arrow}/>
                    <p className={styles.category}>{assignmentBlock.category}</p>
                    <FontAwesomeIcon icon={faFileExport} className={styles.icon}/>
                </button>
                <div className={styles.weight}>
                    전체 비중의 XX%
                </div>
            </header>
            {
                toggleOpen &&
                assignmentBlock.assignments.map((elem) => <Assignment key={elem.assignment.id} assignment={elem}/>)
            }
        </div>
    )
}