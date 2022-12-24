import React from 'react';
import styles from './navBarButton.module.scss';

export const NavBarButton = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.buttonContainer}>{children}</div>;
};
