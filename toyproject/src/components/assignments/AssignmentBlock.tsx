import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Assignment.module.scss";
import {
    faCaretDown,
    faCaretRight,
    faPenToSquare,
    faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {timestampToDateWithLetters} from "../../lib/formatting";
import {
    UserAssignmentInterface,
} from "../../lib/types";

const Assignment = ({
                        assignment,
                    }: {
    assignment: UserAssignmentInterface;
}) => {
    const navigate = useNavigate();
    return (
        <div
            className={styles.assignment}
            onClick={() => navigate(assignment.assignment.id.toString())}
        >
            <FontAwesomeIcon icon={faPenToSquare} className={styles.pen_icon}/>
            <div className={styles.right}>
                <p className={styles.top}>{assignment.assignment.name}</p>
                <p className={styles.bottom}>
                    <b>마감 </b>
                    {timestampToDateWithLetters(assignment.assignment.due_date) + "  |  "}
                    {assignment.is_submitted ? "제출됨  |  " : "제출하지 않음  |  "}
                    {assignment.is_graded
                        ? "" + assignment.score + "/" + assignment.assignment.max_grade
                        : "채점되지 않음"}
                </p>
            </div>
        </div>
    );
};

export default function AssignmentBlock({isCategorized, assignmentBlock}: {
    isCategorized: boolean,
    assignmentBlock: UserAssignmentInterface[]
}) {
    const [toggleOpen, setToggleOpen] = useState<boolean>(true);
    return (
        <div className={styles.block}>
            <header className={styles.header}>
                <button
                    className={styles.toggle}
                    onClick={() => setToggleOpen(!toggleOpen)}
                >
                    <FontAwesomeIcon
                        icon={toggleOpen ? faCaretDown : faCaretRight}
                        className={styles.arrow}
                    />
                    <p className={styles.category}>{isCategorized ? assignmentBlock[0].assignment.category : "마감일 순"}</p>
                    <FontAwesomeIcon icon={faFileExport} className={styles.icon}/>
                </button>
                <div className={styles.weight}>전체 비중의 {
                    assignmentBlock.map((elem) => elem.assignment.weight*100)
                        .reduce((sum, weight) => sum + weight)
                }%</div>
            </header>
            {toggleOpen &&
                assignmentBlock.map((elem) => (
                    <Assignment key={elem.assignment.id} assignment={elem}/>
                ))}
        </div>
    );
}
