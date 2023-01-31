import React, {useEffect, useState} from 'react';
import styles from './EvaluationDetailPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import CheckList from '../evalComponents/CheckList';
import FreeAnswer from '../evalComponents/FreeAnswer';
import {useNavigate, useParams} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
export default function EvaluationDetailPage() {
  const [goodPoint, setGoodPoint] = useState('');
  const [badPoint, setBadPoint] = useState('');
  const [scales, setScales] = useState(new Array(7).fill(0));
  const { subjectid } = useParams();
  const nav = useNavigate();

  const handleGoodPoint = (input: string) => {
    setGoodPoint(input);
  };

  const handleBadPoint = (input: string) => {
    setBadPoint(input);
  };

  const handleScales = (index: number, scale: number) => {
    let temp = [...scales];
    temp[index-1] = scale;
    setScales(temp);
  }

  const submit = () => {
    // 아직 강의평가 제출 api가 없음
    // scales, goodPoint, badPoint 이용해서 제출
    toast("제출되었습니다!", {position: "top-center", theme: "colored"});
    nav("/");
  }

  return (
    <div className={styles.wrapper}>
      <SideNavBar></SideNavBar>
      <div className={styles.right}>
        <div className={styles.header}>강의 평가</div>
        <div className={styles['sub-title']}>{`${subjectid}`} 강의평가</div>
        <div className={styles.body}>
          <div className={styles.title}>공통 및 선택 문항</div>
          <CheckList scales={scales} handleScales={handleScales}></CheckList>
          <FreeAnswer
            handleGoodPoint={handleGoodPoint}
            handleBadPoint={handleBadPoint}
          ></FreeAnswer>
          <div className={styles['button-container']}>
            <button className={styles.submit} onClick={() => {
              scales.indexOf(0) === -1 ? submit() : toast("모든 문항에 답변해주시기 바랍니다", {position: "top-center", theme: "colored"});
            }}>확정</button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
