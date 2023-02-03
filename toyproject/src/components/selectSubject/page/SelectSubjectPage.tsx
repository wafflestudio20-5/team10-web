import React, { useEffect, useState } from 'react';
import styles from './SelectSubjectPage.module.scss';
import { SideNavBar } from '../../sideNavbar/SideNavBar';
import SubjectList from '../SubjectList';
import { UserBar } from '../../UserBar/UserBar';
import { url } from 'inspector';
import { apiDropClass, apiEnrollClass, apiGetSubjects } from '../../../lib/api';
import { useSessionContext } from '../../../context/SessionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSubjectContext } from '../../../context/SubjectContext';
import { SubjectType } from '../../../lib/types';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

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
  type: 'enroll' | 'drop';
};

export default function SelectSubjectPage() {
  const [searchValue, setSearchValue] = useState('');
  const [subjects, setSubjects] = useState<SubjectType[]>();
  const [totalNum, setTotalNum] = useState<number>(0);
  const [activeButton, setActiveButton] = useState({ activate: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo | undefined>(undefined);
  const [curPage, setCurPage] = useState<number>(1);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModal = (info: ModalInfo) => {
    setModalInfo(info);
  };

  const { token, refreshUserInfo, getRefreshToken } = useSessionContext();
  const { mySubjects, previousApi, nextApi } = useSubjectContext();
  //ToDO
  //sever 연결되면
  //subjects useSubjectContext에서 가져와보기
  const navigate = useNavigate();

  const enroll = async (token: string | null, classId: number) => {
    const localRefresh = localStorage.getItem('refresh');
    const res = await getRefreshToken(localRefresh ? localRefresh : 'temp');
    // await apiEnrollClass(res.data.access, classId);
    await apiEnrollClass(res.data.access, classId);
    toast('신청되었습니다!', { position: 'top-center', theme: 'colored' });
    await refreshUserInfo(res.data.access!);
    setActiveButton({ ...activeButton, activate: 0 });

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
        toast('드랍되었습니다!', { position: 'top-center', theme: 'colored' });
        // setUser({...user, classes: r.data.classes})
      })
      .then((r) => {
        refreshUserInfo(token!); //!를 삽입함으로서 token이 항상 존재한다는 걸 알릴 수 있다.
        setActiveButton({ ...activeButton, activate: 0 });
      })
      .catch((r) => console.log(r));
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetSubjects(token, 1, searchValue);
        //while문으로 결과 null이면 page 하나씩 적게 요청하도록 할 수 있긴 한데.
        setSubjects(res.data.results);
        setTotalNum(res.data.count);
      } catch (err: any) {
        if (err.response.status === 401) {
          const localRefreshToken = localStorage.getItem('refresh');
          const resToken = await getRefreshToken(
            localRefreshToken ? localRefreshToken : 'temp'
          );
          const newToken = resToken.data.access;
          const res = await apiGetSubjects(newToken, 1, searchValue);
          setSubjects(res.data.results);
          setTotalNum(res.data.count);
        }
      }
    })();
  }, [token, searchValue]);

  const goToPage = async (
    event: React.MouseEvent<HTMLButtonElement>,
    page: number,
    idx: number
  ) => {
    event.preventDefault();
    const res = await apiGetSubjects(token, page, searchValue);
    setSubjects(res.data.results);
    setActiveButton({ ...activeButton, activate: idx });
    // setCurPage(page);
  };

  const buttonCount = Math.ceil(totalNum / 10);

  return (
    <div className={styles.selectSubjectPagewrapper}>
      <SideNavBar />
      <div className={styles.body}>
        <header>
          <FontAwesomeIcon icon={faBars} className={styles.bars} />
          <h1>수강신청</h1>
          <UserBar />
        </header>
        <section>
          <div className={styles.search}>
            <input
              value={searchValue}
              className={styles.searchbar}
              placeholder='수업명을 검색하세요'
              onChange={(e) => setSearchValue(e.target.value)}
            />
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        className={styles.modal}
      >
        <article>
          <div>
            <b>{modalInfo?.name}</b>
            <br />
            과목을 {modalInfo?.type === 'enroll'
              ? '수강 신청'
              : '수강 취소'}{' '}
            하시겠습니까?
          </div>
        </article>
        <footer>
          <button className={styles.cancel} onClick={toggleModal}>
            취소
          </button>
          <button
            className={styles.ok}
            onClick={(e) => {
              e.preventDefault();
              modalInfo?.type === 'enroll'
                ? enroll(token, modalInfo?.classId)
                : drop(token, modalInfo?.classId ? modalInfo.classId : -1);
              toggleModal();
            }}
          >
            확인
          </button>
        </footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}
