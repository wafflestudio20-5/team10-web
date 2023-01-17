import React, {useEffect, useState} from 'react';
import AssignmentBlock from "./AssignmentBlock";
import styles from "./AssignmentPage.module.scss";
import SubjectTemplate from "../SubjectTemplate";
import {useParams} from "react-router-dom";
import {AssignmentInterface, UserAssignmentInterface, AssignmentBlockInterface} from "./AssignmentBlock";
import {apiAssignments, apiAssignmentScore} from "../../lib/api";
import {useSessionContext} from "../../context/SessionContext";
import {useSubjectContext} from "../../context/SubjectContext";

export default function AssignmentPage() {

    const {token} = useSessionContext();
    const {curSubject} = useSubjectContext();
    const {subjectName} = useParams<string>();
    const [isCategorized, setIsCategorized] = useState(true);
    // const [assignmentsByTime, setAssignmentsByTime] = useState<AssignmentInterface>({
    //     assignments: []
    // });
    const [assignments, setAssignments] = useState<AssignmentInterface[]>([]);
    const [userAssignments, setUserAssignments] = useState<UserAssignmentInterface[]>([]);
    const [assignmentBlocks, setAssignmentBlocks] = useState<AssignmentBlockInterface[]>([
        {
            category: "과제",
            assignments: [],
        },
    ])

    const getAllAssignments = (token: string | null, class_id: number) => {
        apiAssignments(token, class_id)
            .then(r => {
                console.log("succeed");
                setAssignments(r.data);
            })
            .catch(r => console.log("fail"))
    }

    const getAssignmentScore = (token: string | null, assignments: AssignmentInterface[]) => {
        setUserAssignments([]);
        assignments.map(assignment => {
            apiAssignmentScore(token, assignment.id)
                .then(r => setUserAssignments(userAssignments.concat([{
                    assignment: assignment,
                    is_submitted: r.data.is_submitted,
                    is_graded: r.data.is_graded,
                    score: r.data.score
                }])))
                .catch(r => console.log(r));
        })
    }

    useEffect(() => {
        if (token) {
            curSubject && getAllAssignments(token, curSubject.id);
            console.log(assignments);
            curSubject && getAssignmentScore(token, assignments);
            curSubject && setAssignmentBlocks([{
                category: "과제",
                assignments: userAssignments,
            }]);
        }
    }, [token, setAssignments, setAssignmentBlocks, setUserAssignments])

    // 테스트용 임시데이터
    // const assignments: AssigmentBlockInterface[] = [
    //     {
    //         category: "Exam",
    //         assignments: [
    //             {
    //                 assignment: {name: "Exam1", dueDate: "2022년 12월 25일 23:59", maxGrade: 90, weight: 30},
    //                 isGraded: true,
    //                 grade: 80,
    //             },
    //             {
    //                 assignment: {name: "Exam2", dueDate: "2023년 2월 1일 23:59", maxGrade: 120, weight: 20},
    //                 isGraded: false,
    //                 grade: -1,
    //             }
    //         ]
    //     },
    //     {
    //         category: "Programming",
    //         assignments: [
    //             {
    //                 assignment: {name: "토이프로젝트", dueDate: "2023년 2월 4일 23:59", maxGrade: 100, weight: 50},
    //                 isGraded: true,
    //                 grade: 100,
    //             }
    //         ]
    //     }
    // ]

    useEffect(() => {
        // 마감일 순 정렬 알고리즘 (아직 Date format 확정이 안돼서 구현불가)
    }, [])

    return (
        <SubjectTemplate subject="와플학개론" page="과제" content={undefined}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <input placeholder="과제 검색"/>
                    <button className={isCategorized ? undefined : styles.categorized}
                            onClick={() => setIsCategorized(!isCategorized)}>마감순으로 보기
                    </button>
                    <button className={isCategorized ? styles.categorized : undefined}
                            onClick={() => setIsCategorized(!isCategorized)}>유형별로 보기
                    </button>
                </header>
                {
                    assignmentBlocks.map((elem) => <AssignmentBlock assignmentBlock={elem}/>)
                }
            </div>
        </SubjectTemplate>
    )
}

