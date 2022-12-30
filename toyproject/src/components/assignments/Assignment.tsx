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

export function Assignment({}) {

}