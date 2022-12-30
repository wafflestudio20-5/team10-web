import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Assignment.module.scss";

export interface AssignmentInterface {
    name: string,
    dueDate: string,
    maxGrade: number
}

export interface UserAssignmentInterface {
    assignment: AssignmentInterface,
    isGraded: boolean,
    grade: number,
}

const Assignment = ({assignment}: {assignment: UserAssignmentInterface}) => {
    return (
        <div className={styles.assignment}>

        </div>
    )
}

export default function AssignmentBlock({sort, assignments}: { sort: string, assignments: UserAssignmentInterface[] }) {
    return (
        <div>
            {
                assignments.map((assignment) => <Assignment assignment={assignment}/>)
            }
        </div>
    )
}