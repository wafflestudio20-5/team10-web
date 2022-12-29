import React from 'react';
import styles from './authModal.module.scss';
import { ReactComponent as CloseButton } from '../../../svg/close.svg';

type AuthModalType = {
  closeAuthModal: () => void;
  aniState: boolean;
};

export const AuthModal = ({ aniState, closeAuthModal }: AuthModalType) => {
  return (
    <div
      className={`${styles['modal']} ${
        aniState ? styles['close'] : styles['modal']
      }`}
    >
      <CloseButton
        width='15px'
        height='15px'
        onClick={closeAuthModal}
      ></CloseButton>
      <header>계정</header>
      <section>
        <ul>
          <li>개인정보 수정</li>
          <li>뭐 다른거 ?</li>
        </ul>
      </section>
      <footer>여기가 바닥</footer>
    </div>
  );
};
