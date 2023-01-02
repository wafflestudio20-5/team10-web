import React, {useEffect, useState} from 'react';
import AssignmentBlock from "./AssignmentBlock";
import styles from "./AssignmentPage.module.scss";
import SubjectTemplate from "../SubjectTemplate";
import {useParams} from "react-router-dom";
import {AssigmentBlockInterface} from "./AssignmentBlock";

export default function AssignmentPage() {

    const {subjectName} = useParams<string>();
    const [isCategorized, setIsCategorized] = useState(true);
    const [assignmentsByTime, setAssignmentsByTime] = useState<AssigmentBlockInterface>({
        category: "마감일 순",
        assignments: []
    });

    // 테스트용 임시데이터
    const assignments: AssigmentBlockInterface[] = [
        {
            category: "Exam",
            assignments: [
                {
                    assignment: {name: "Exam1", dueDate: "2022년 12월 25일 23:59", maxGrade: 90, weight: 30},
                    isGraded: true,
                    grade: 80,
                },
                {
                    assignment: {name: "Exam2", dueDate: "2023년 2월 1일 23:59", maxGrade: 120, weight: 20},
                    isGraded: false,
                    grade: -1,
                }
            ]
        },
        {
            category: "Programming",
            assignments: [
                {
                    assignment: {name: "토이프로젝트", dueDate: "2023년 2월 4일 23:59", maxGrade: 100, weight: 50},
                    isGraded: true,
                    grade: 100,
                }
            ]
        }
    ]

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
                    assignments.map((elem) => <AssignmentBlock assignmentBlock={elem}/>)
                }
            </div>
        </SubjectTemplate>
    )
}

