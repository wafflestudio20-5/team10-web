import React from "react";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";
import { useSubjectContext } from "../../context/SubjectContext";

type subject = {
  id: number;
  name: string;
};

type CardType = {
  subject: subject;
};

export const Card = ({ subject }: CardType) => {
  const navigate = useNavigate();
  const { handleClick } = useSubjectContext();

  const goToModule = () => {
    navigate(`/${subject.name}/`);
  };

  return (
    <div
      className={styles["card-container"]}
      onClick={() => {
        navigate(`/${subject.name}/`);
        handleClick(subject.id);
      }}
    >
      <div className={styles["card-color"]}></div>
      <section>{subject.name}</section>
    </div>
  );
};
