import React, {useEffect, useState} from 'react';
import AssignmentBlock from './AssignmentBlock';
import styles from './AssignmentPage.module.scss';
import SubjectTemplate from '../SubjectTemplate';
import {useParams} from 'react-router-dom';
import {
    AssignmentInterface,
    UserAssignmentInterface,
} from '../../lib/types';
import {apiAssignments, apiAssignmentScore} from '../../lib/api';
import {useSessionContext} from '../../context/SessionContext';

function sortByCategory(assignments: UserAssignmentInterface[]) {
    for (const assignment of assignments) {

    }
}

export default function AssignmentPage() {
    const {token} = useSessionContext();
    const {subjectid} = useParams();
    const [isCategorized, setIsCategorized] = useState(true);
    // const [assignmentsByTime, setAssignmentsByTime] = useState<AssignmentInterface>({
    //     assignments: []
    // });
    const [assignments, setAssignments] = useState<UserAssignmentInterface[]>([]);
    const [assignmentBlocks, setAssignmentBlocks] = useState<{
        category: string,
        assignments: UserAssignmentInterface[]
    }[]>([]);

    const getAllAssignments = (token: string | null, class_id: number) => {
        apiAssignments(token, class_id)
            .then((r) => {
                setAssignments(new Array(r.data.length));
                getAssignmentScore(token, {...r.data, category: "과제"}); // 임시방편
            })
            .catch((r) => console.log(r));
    };

    const getAssignmentScore = (
        token: string | null,
        data: AssignmentInterface[]
    ) => {
        data.map((assignment) => {
            apiAssignmentScore(token, assignment.id)
                .then((r) => {
                    let temp: UserAssignmentInterface[] = [...assignments];
                    temp[data.indexOf(assignment)] = {
                        assignment: assignment,
                        is_submitted: r.data.is_submitted,
                        is_graded: r.data.is_graded,
                        score: r.data.score,
                    };
                    console.log(temp);
                    setAssignments(temp);
                    })
                .catch((r) => console.log(r));
        });
    };

    useEffect(() => {
        const id = Number(subjectid);
        if (token) {
            getAllAssignments(token, id);
        }
    }, [token, setAssignmentBlocks]);

    return (
        <SubjectTemplate
            subject={subjectid as string}
            page='과제'
            content={undefined}
        >
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <input placeholder='과제 검색'/>
                    <button
                        className={isCategorized ? undefined : styles.categorized}
                        onClick={() => setIsCategorized(!isCategorized)}
                    >
                        마감순으로 보기
                    </button>
                    <button
                        className={isCategorized ? styles.categorized : undefined}
                        onClick={() => setIsCategorized(!isCategorized)}
                    >
                        유형별로 보기
                    </button>
                </header>
                {assignmentBlocks.map((elem) => (
                    <AssignmentBlock key={elem.category} assignmentBlock={elem.assignments}/>
                ))}
            </div>
        </SubjectTemplate>
    );
}
