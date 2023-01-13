import React from "react";
import styles from "./Card.module.scss";
import { Navigate, useNavigate } from "react-router-dom";

type subject = {
  id: number;
  name: string;
};

type CardType = {
  subject: subject;
};

export const Card = ({ subject }: CardType) => {
  const navigate = useNavigate();

  const goToModule = () => {
    navigate(`/${subject.name}/`);
  };

  return (
    <div className={styles["card-container"]}>
      <div className={styles["card-color"]} onClick={goToModule}></div>
      <section>
        <a href={`/${subject.name}/`}>{subject.name}</a>
      </section>
    </div>
  );
};
