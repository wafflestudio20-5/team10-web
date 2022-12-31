import React from 'react';
import styles from './BoardSideBar.module.scss';

export default function BoardSideBar() {
  return (
    <div className={styles.wrapper}>
      <ul>
        <li>홈</li>
        <li>게시판</li>
        <li>강의계획서</li>
        <li>수강생</li>
        <li>모듈</li>
        <li>과제</li>
        <li>성적</li>
      </ul>
    </div>
  );
}
