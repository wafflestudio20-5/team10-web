import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Assignment.module.scss";
import {faCaretDown, faCaretRight, faPenToSquare, faFileExport} from "@fortawesome/free-solid-svg-icons";

export interface AssignmentInterface {      // Assignment-Unique
    name: string,
    dueDate: string,
    maxGrade: number,
    weight: number
}

export interface UserAssignmentInterface {
    assignment: AssignmentInterface,
    isGraded: boolean,
    grade: number,
}

export interface AssigmentBlockInterface {
    category: string,
    assignments: UserAssignmentInterface[]
}

const Assignment = ({assignment}: {assignment: UserAssignmentInterface}) => {
    return (
        <div className={styles.assignment}>

        </div>
    )
}

export default function AssignmentBlock({assignmentBlock}: { assignmentBlock: AssigmentBlockInterface }) {
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
                assignmentBlock.assignments.map((elem) => <Assignment assignment={elem}/>)
            }
        </div>
    )
}