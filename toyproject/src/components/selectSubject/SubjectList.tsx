import React, {useState} from 'react';
import styles from './SubjectList.module.scss';
import {useSessionContext} from '../../context/SessionContext';
import {apiDropClass, apiEnrollClass} from '../../lib/api';
import {toast} from 'react-toastify';

type SubjectListType = {
    classId: number;
    name: string;
    professor: string;
    isEnrolled: boolean | undefined;
};

export default function SubjectList({
                                        classId,
                                        name,
                                        professor,
                                        isEnrolled,
                                    }: SubjectListType) {
    const {token, user, setUser, refreshUserInfo} = useSessionContext();
    const [subjectEnrolled, setSubjectEnrolled] = useState(isEnrolled);

    const enroll = (token: string | null, classId: number) => {
        apiEnrollClass(token, classId)
            .then((r) => {
                toast('신청되었습니다!');
                // setUser({...user, classes: r.data.classes})
            })
            .then((r) => {
                setSubjectEnrolled((prev) => !prev);
                refreshUserInfo(token!); //!를 삽입함으로서 token이 항상 존재한다는 걸 알릴 수 있다.
            })
            .catch((r) => console.log(r));
    };

    const drop = (token: string | null, classId: number) => {
        apiDropClass(token, classId)
            .then((r) => {
                toast('드랍되었습니다!');
                // setUser({...user, classes: r.data.classes})
            })
            .then((r) => {
                setSubjectEnrolled((prev) => !prev);
                refreshUserInfo(token!); //!를 삽입함으로서 token이 항상 존재한다는 걸 알릴 수 있다.
            })
            .catch((r) => console.log(r));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>{name}</div>
            <div className={styles.professor}>{professor}</div>
            <div className={styles.enroll}>
                {subjectEnrolled ? (
                    <button className={styles.drop} onClick={() => {
                        drop(token, classId);
                    }}>수강취소</button>
                ) : (
                    <button onClick={() => {
                        enroll(token, classId);
                    }}>수강신청</button>
                )}
            </div>
        </div>
    );
}
