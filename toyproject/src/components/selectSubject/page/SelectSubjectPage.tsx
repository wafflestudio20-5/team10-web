import React, { useEffect, useState } from 'react';
import styles from './SelectSubjectPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import SubjectList from '../SubjectList';
import { UserBar } from '../../UserBar/UserBar';
import axios from 'axios';
import { url } from 'inspector';
import {apiDropClass, apiEnrollClass, apiGetSubjects} from '../../../lib/api';
import { useSessionContext } from '../../../context/SessionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSubjectContext } from '../../../context/SubjectContext';
import { SubjectType } from '../../../lib/types';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Modal from "react-modal";

const isEnrolled = (
  mySubjects: SubjectType[] | undefined,
  subject: SubjectType
) => {
  if (!mySubjects) return false;
  for (const elem of mySubjects) {
    if (elem.id === subject.id) return true;
  }
  return false;
};

export type ModalInfo = {
  classId: number;
  name: string;
  type: "enroll" | "drop";
}

export default function SelectSubjectPage() {
  const [searchValue, setSearchValue] = useState('');
  const [subjects, setSubjects] = useState<SubjectType[]>();
  const [totalNum, setTotalNum] = useState<number>(0);
  const [activeButton, setActiveButton] = useState({ activate: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo | undefined>(undefined);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleModal = (info: ModalInfo) => {
    setModalInfo(info);
  }

  const { token, refreshUserInfo, getRefreshToken } = useSessionContext();
  const { mySubjects, previousApi, nextApi } = useSubjectContext();
  //ToDO
  //sever 연결되면
  //subjects useSubjectContext에서 가져와보기
  const navigate = useNavigate();

  const enroll = async (token: string | null, classId: number) => {
    const localRefresh = localStorage.getItem('refresh');
    const res = await getRefreshToken(localRefresh ? localRefresh : 'temp');
    await apiEnrollClass(res.data.access, classId);
    await apiEnrollClass(res.data.access, classId);
    toast('신청되었습니다!');
    await refreshUserInfo(res.data.access!);
    // .then((r) => {
    //     toast('신청되었습니다!');
    //     // setUser({...user, classes: r.data.classes})
    // })
    // .then((r) => {
    //     setSubjectEnrolled((prev) => !prev);
    //     refreshUserInfo(token!); //!를 삽입함으로서 token이 항상 존재한다는 걸 알릴 수 있다.
    // })
    // .catch((r) => console.log(r));
  };

  const drop = (token: string | null, classId: number) => {
    apiDropClass(token, classId)
        .then((r) => {
          toast('드랍되었습니다!');
          // setUser({...user, classes: r.data.classes})
        })
        .then((r) => {
          refreshUserInfo(token!); //!를 삽입함으로서 token이 항상 존재한다는 걸 알릴 수 있다.
        })
        .catch((r) => console.log(r));
  };

  useEffect(() => {
    (async () => {
      const res = await apiGetSubjects(token, 1);
      setSubjects(res.data.results);
      setTotalNum(res.data.count);
    })();
  }, [token]);

  const goToPage = async (
    event: React.MouseEvent<HTMLButtonElement>,
    page: number,
    idx: number
  ) => {
    event.preventDefault();
    const res = await apiGetSubjects(token, page);
    setSubjects(res.data.results);
    setActiveButton({ ...activeButton, activate: idx });
  };

  const buttonCount = Math.ceil(totalNum / 10);

  return (
    <div className={styles.selectSubjectPagewrapper}>
      <SideNavBar />
      <div className={styles.body}>
        <header>
          <FontAwesomeIcon icon={faBars} className={styles.bars} />
          <h1>강좌검색</h1>
          <UserBar></UserBar>
        </header>
        <section>
          <div className={styles.search}>
            <input
              className={styles.searchbar}
              placeholder='전체 강좌 검색은 돋보기 버튼을 클릭하세요 (아직 검색 안돼요)'
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={styles.icon}
              />
            </button>
          </div>
          <article>
            <div className={styles.index}>
              <b className={styles.name}>교과목명</b>
              <b className={styles.professor}>담당교수</b>
              <b className={styles.enroll}>신청</b>
            </div>
            {subjects &&
              subjects.map((subject) => {
                return (
                  <SubjectList
                    key={subject.id}
                    classId={subject.id}
                    name={subject.name}
                    professor={subject.created_by.username}
                    isEnrolled={isEnrolled(mySubjects, subject)}
                    toggleModal={toggleModal}
                    handleModal={handleModal}
                  ></SubjectList>
                );
              })}
            <div className={styles['button-container']}>
              {Array.from({ length: buttonCount }).map((_, idx) => (
                <button
                  className={`${styles['nav-button']} ${
                    activeButton.activate === idx ? styles['active'] : ''
                  }`}
                  key={idx}
                  onClick={(event) => goToPage(event, idx + 1, idx)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </article>
        </section>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={toggleModal} className={styles.modal}>
        <article>
          <div><b>{modalInfo?.name}</b><br/>과목을 {modalInfo?.type === "enroll" ? "수강 신청" : "수강 취소"} 하시겠습니까?</div>
        </article>
        <footer>
          <button className={styles.cancel} onClick={toggleModal}>취소</button>
          <button className={styles.ok} onClick={() => {
            modalInfo?.type === "enroll" ? enroll(token, modalInfo?.classId) : drop(token, modalInfo?.classId ? modalInfo.classId : -1);
            toggleModal()
          }}>확인</button>
        </footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}
