import React from 'react';
import SubjectTemplate from "../SubjectTemplate";
import styles from "./AssignmentDetailsPage.module.scss"

export default function AssignmentDetailsPage() {
    return (
        <SubjectTemplate subject="와플학개론" page="과제" content="토이프로젝트">
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <header className={styles.header}>
                        <p className={styles.title}>
                            과제 제목
                        </p>
                        <button className={styles.submit}>
                            과제 제출하기
                        </button>
                    </header>
                    <ul className={styles.details}>

                    </ul>
                    <article className={styles.content}>
                        과제 세부 정보
                    </article>
                </div>
                <div className={styles.right}>

                </div>
            </div>
        </SubjectTemplate>
    )
}