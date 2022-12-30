import React from 'react';
import styles from './BoardDetail.module.scss';
export default function BoardDetail() {
  return (
    <div className={styles.wrapper}>
      <h2>백엔드에서 과목 정보를 받아옵니다</h2>
      <div> ~ 게시판입니다. 공지 및 각종 질문을 올리는 곳입니다.</div>
      <div>검색결과</div>
      <body>
        <header>no, 제목, 작성자, 등록일시, 조회수</header>
        <ul>
          <li>여기에 컴포넌트를 return해야 할 것같음</li>
        </ul>
      </body>
      <div>여기에 bottom nav button</div>
    </div>
  );
}
