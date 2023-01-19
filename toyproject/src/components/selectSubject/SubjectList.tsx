import React from 'react';
import styles from "./SubjectList.module.scss"

type SubjectListType = {
    name: string,
    professor: string
};

export default function SubjectList({name, professor}: SubjectListType) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>{name}</div>
            <div className={styles.professor}>{professor}</div>
            <div className={styles.enroll}>
                <button>수강신청</button>
            </div>
        </div>
    );
}
