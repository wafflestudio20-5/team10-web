import React from 'react';
import styles from "./SubjectList.module.scss"
import {useSessionContext} from "../../context/SessionContext";
import {apiEnrollClass} from "../../lib/api";
import {toast} from "react-toastify";

type SubjectListType = {
    classId: number,
    name: string,
    professor: string
    isEnrolled: boolean | undefined
};

export default function SubjectList({classId, name, professor, isEnrolled}: SubjectListType) {
    const {token, user, setUser} = useSessionContext();
    const enroll = (token: string | null, classId: number) => {
        apiEnrollClass(token, classId)
            .then((r) => {
                toast("신청되었습니다!");
                // setUser({...user, classes: r.data.classes})
            })
            .catch((r) => console.log(r));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>{name}</div>
            <div className={styles.professor}>{professor}</div>
            <div className={styles.enroll}>
                {
                    isEnrolled ? <p>수강중</p> : <button onClick={() => {
                        enroll(token, classId);
                    }}>수강신청</button>
                }
            </div>
        </div>
    );
}
