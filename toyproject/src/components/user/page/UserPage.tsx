import React, { useEffect, useState } from "react";
import styles from "./UserPage.module.scss";
import contentStyles from "../userComponents/Content.module.scss";
import { SideNavBar } from "../../sideNavbar/SideNavBar";
import Content from "../userComponents/Content";
import Profile from "../userComponents/Profile";
import { UserBar } from "../../UserBar/UserBar";
import PasswordForm from "../userComponents/PasswordForm";
import { useSessionContext } from "../../../context/SessionContext";
import { apiBye, apiDownloadImage } from "../../../lib/api";
import { useNavigate } from "react-router-dom";
import { ImageModal } from "../userComponents/ImageModal";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { ProfilePicture } from "../../../lib/types";

export default function UserPage() {
  const { user, token } = useSessionContext();
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [byeModalOpen, setByeModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<ProfilePicture | null>(null);

  const toggleImageModal = () => {
    setImageFile(null);
    setIsModalOpen(!isModalOpen);
  };

  const toggleByeModal = () => {
    setByeModalOpen(!byeModalOpen);
  };

  const bye = (token: string | null, id: Number) => {
    apiBye(token, id)
      .then(() => nav("/login"))
      .catch((r) => console.log(r));
  };

  useEffect(() => {
    apiDownloadImage(token)
      .then((r) => {
        console.log(r.data);
        setProfile(r.data);
      })
      .catch((r) => console.log(r));
  }, []);

  return (
    <div
      className={styles.wrapper}
      onDragEnter={(e) => e.preventDefault()}
      onDragExit={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
    >
      <SideNavBar />
      <div className={styles.right}>
        <div className={styles.header}>
          <h1>{user?.username}의 계정</h1>
          <UserBar />
        </div>
        <div className={styles.body}>
          <Profile
            toggleModal={toggleImageModal}
            image={profile?.download_link}
          ></Profile>
          <div className={styles.title}>개인정보</div>
          <Content title={"전체이름:"} content={`${user?.username}`} />
          <Content title={"이메일 주소"} content={`${user?.email}`} />
          <Content title={"학번"} content={`${user?.student_id}`} />
          {/*return에 userpassword가 없어 다음과 같이 ui 로 보여지게 함*/}
          <PasswordForm title={"비밀번호"} content={"********"} />{" "}
          <div className={contentStyles.wrapper}>
            <div className={contentStyles.content}>자퇴 신청</div>
            <div className={contentStyles.buttonWrapper}>
              <button
                className={styles.button}
                onClick={() => {
                  user && toggleByeModal();
                }}
              >
                자퇴
              </button>
            </div>
          </div>
        </div>
      </div>
      <ImageModal
        isModalOpen={isModalOpen}
        toggleModal={toggleImageModal}
        imageFile={imageFile}
        setImageFile={setImageFile}
        setProfile={setProfile}
      />
      <Modal
        isOpen={byeModalOpen}
        onRequestClose={toggleByeModal}
        className={styles.byeModal}
      >
        <article>
          <div>
            <b>정말로 자퇴하시겠습니까?</b>
            <br />이 과정은 되돌릴 수 없습니다.
          </div>
        </article>
        <footer>
          <button className={styles.cancel} onClick={toggleByeModal}>
            취소
          </button>
          <button
            className={styles.ok}
            onClick={() => {
              user && bye(token, user.id);
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
