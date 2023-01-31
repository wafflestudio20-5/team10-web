import React, {useState} from 'react';
import styles from './UserPage.module.scss';
import contentStyles from '../userComponents/Content.module.scss'
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import Content from '../userComponents/Content';
import Profile from '../userComponents/Profile';
import PasswordForm from '../userComponents/PasswordForm';
import { useSessionContext } from '../../../context/SessionContext';
import {apiBye} from "../../../lib/api";
import {useNavigate} from "react-router-dom";
import Modal from "react-modal";

export default function UserPage() {
  const { user, token } = useSessionContext();
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const bye = (token: string | null, id: Number) => {
    apiBye(token, id)
        .then(() => nav('/login'))
        .catch((r) => console.log(r))
  }

  return (
    <div className={styles.wrapper}>
      <SideNavBar />
      <div className={styles.right}>
        <div className={styles.header}>{user?.username}의 계정</div>
        <div className={styles.body}>
          <Profile></Profile>
          <div className={styles.title}>개인정보</div>
          <Content title={'전체이름:'} content={`${user?.username}`} />
          <Content title={'이메일 주소'} content={`${user?.email}`} />
          <Content title={'학번'} content={`${user?.student_id}`} />
          {/*return에 userpassword가 없어 다음과 같이 ui 로 보여지게 함*/}
          <PasswordForm title={'비밀번호'} content={'********'} />{' '}
          <div className={contentStyles.wrapper}>
            <div className={contentStyles.content}>자퇴 신청</div>
            <button className={styles.button} onClick={() => {
              user && bye(token, user.id)
            }}>자퇴</button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={toggleModal} className={styles.modal}>
        TEST MODAL
        <button onClick={toggleModal}>Close</button>
      </Modal>
    </div>
  );
}
