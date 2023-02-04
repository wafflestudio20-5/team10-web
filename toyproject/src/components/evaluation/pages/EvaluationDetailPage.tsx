import React, { useEffect, useState } from 'react';
import styles from './EvaluationDetailPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import CheckList from '../evalComponents/CheckList';
import FreeAnswer from '../evalComponents/FreeAnswer';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useSessionContext } from '../../../context/SessionContext';
import {
  apiEvaluate,
  apiGetSubjectInfo,
  apiGetUserInfo,
} from '../../../lib/api';
import { CardColor, SubjectType } from '../../../lib/types';
export default function EvaluationDetailPage() {
  const [goodPoint, setGoodPoint] = useState('');
  const [badPoint, setBadPoint] = useState('');
  const [scales, setScales] = useState(new Array(7).fill(0));
  const [subjectName, setSubjectName] = useState('');
  const { subjectid } = useParams();
  const { token, getRefreshToken, user, setUser, setColors } =
    useSessionContext();
  const nav = useNavigate();

  const handleGoodPoint = (input: string) => {
    setGoodPoint(input);
  };

  const handleBadPoint = (input: string) => {
    setBadPoint(input);
  };

  const handleScales = (index: number, scale: number) => {
    let temp = [...scales];
    temp[index - 1] = scale;
    setScales(temp);
  };

  const submit = () => {
    apiEvaluate(
      token,
      parseInt(subjectid as string),
      scales,
      goodPoint,
      badPoint,
      user?.id
    )
      .then(async (r) => {
        toast('제출되었습니다!', { position: 'top-center', theme: 'colored' });
        nav('/evaluation/');
        const localRefresh = localStorage.getItem('refresh');
        const localUserId = Number(localStorage.getItem('userId'));
        const res = await getRefreshToken(localRefresh ? localRefresh : 'temp'); //렌더링 시 refreshToken 요청
        // console.log(res.data.access);
        if (res.status === 200) {
          const resUser = await apiGetUserInfo(localUserId, res.data.access); //이 작업을 위해선 userId가 필요한데 우선 local Storage에 저장
          setUser(resUser.data);
          setColors(
            resUser.data.classes.map((c: SubjectType): CardColor => {
              return {
                id: c.id,
                color: '#97bdf5',
              };
            })
          );
        }
      })
      .catch((r) => {
        toast('제출에 실패했습니다', {
          position: 'top-center',
          theme: 'colored',
        });
      });
  };

  useEffect(() => {
    (async () => {
      try {
        const id = Number(subjectid);
        const res = await apiGetSubjectInfo(token, id);
        setSubjectName(res.data.name);
      } catch {
        const id = Number(subjectid);
        const localRefreshToken = localStorage.getItem('refresh');
        const resToken = await getRefreshToken(
          localRefreshToken ? localRefreshToken : 'temp'
        );
        const newToken = resToken.data.access;
        const res = await apiGetSubjectInfo(newToken, id);
        setSubjectName(res.data.name);
      }
    })();
  }, [token, subjectid]);

  return (
    <div className={styles.wrapper}>
      <SideNavBar></SideNavBar>
      <div className={styles.right}>
        <div className={styles.header}>강의 평가</div>
        <div className={styles['sub-title']}>{`${subjectName}`} 강의평가</div>
        <div className={styles.body}>
          <div className={styles.title}>선택형 문항</div>
          <CheckList scales={scales} handleScales={handleScales}></CheckList>
          <div className={styles.title}>자유 서술형 문항</div>
          <FreeAnswer
            handleGoodPoint={handleGoodPoint}
            handleBadPoint={handleBadPoint}
          ></FreeAnswer>
          <div className={styles['button-container']}>
            <button
              className={styles.cancel}
              onClick={() => {
                nav(-1);
              }}
            >
              취소
            </button>
            <button
              className={styles.submit}
              onClick={() => {
                scales.indexOf(0) === -1
                  ? submit()
                  : toast('모든 문항에 답변해주시기 바랍니다', {
                      position: 'top-center',
                      theme: 'colored',
                    });
              }}
            >
              확정
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
