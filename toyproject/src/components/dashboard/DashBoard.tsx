import React from "react";
import styles from "./DashBoard.module.scss";
import { Cards } from "../cards/Cards";
import { useSessionContext } from "../../context/SessionContext";
import { User } from "../../lib/types";
import { SessionProvider } from "../../context/SessionContext";

export const DashBoard = () => {
  const { user } = useSessionContext();
  const loginTest = (user: User | null) => {
    if (user) {
      return user.email;
    }
  };

  return (
    <SessionProvider>
      <div className={styles.wrapper}>
        <h1>
          대시보드
          <span>{loginTest(user)}</span>
        </h1>

        <section>
          <Cards />
        </section>
      </div>
    </SessionProvider>
  );
};
