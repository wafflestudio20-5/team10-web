import { useState } from "react";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";
import { useSubjectContext } from "../../context/SubjectContext";
import { SubjectType } from "../../lib/types";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSessionContext } from "../../context/SessionContext";

type CardType = {
  subject: SubjectType;
};

export const Card = ({ subject }: CardType) => {
  const navigate = useNavigate();
  const { handleClick } = useSubjectContext();
  const { colors, setColors } = useSessionContext();
  const [togglePalette, setTogglePalette] = useState<boolean>(false);

  // const [color, setColor] = useState<string>("#97bdf5");

  const index = colors.findIndex((c) => c.id === subject.id);
  const color = colors.at(index)?.color;
  const handleColor = (color: string) => {
    let temp = [...colors];
    temp[index] = {
      id: subject.id,
      color: color,
    };
    setColors(temp);
    setTogglePalette(false);
  };

  return (
    <div className={styles.cardContainer}>
      <div
        className={styles.cardColor}
        style={{ backgroundColor: color }}
        onClick={() => {
          navigate(`/${subject.id}/`);
          handleClick(subject);
        }}
      ></div>
      <section
        onClick={() => {
          navigate(`/${subject.id}/`);
          handleClick(subject);
        }}
      >
        <div className={styles.title}>{subject.name}</div>
      </section>
      <footer>
        {togglePalette && (
          <div className={styles.palette}>
            <div
              className={styles.circle}
              style={{ backgroundColor: "#fc777a" }}
              onClick={() => handleColor("#fc777a")}
            ></div>
            <div
              className={styles.circle}
              style={{ backgroundColor: "#e6d753" }}
              onClick={() => handleColor("#e6d753")}
            ></div>
            <div
              className={styles.circle}
              style={{ backgroundColor: "#5fea9e" }}
              onClick={() => handleColor("#5fea9e")}
            ></div>
            <div
              className={styles.circle}
              style={{ backgroundColor: "#97bdf5" }}
              onClick={() => handleColor("#97bdf5")}
            ></div>
            <div
              className={styles.circle}
              style={{ backgroundColor: "#5fcbed" }}
              onClick={() => handleColor("#5fcbed")}
            ></div>
            <div
              className={styles.circle}
              style={{ backgroundColor: "#decbed" }}
              onClick={() => handleColor("#decbed")}
            ></div>
            <div
              className={styles.circle}
              style={{ backgroundColor: "#8182ed" }}
              onClick={() => handleColor("#8182ed")}
            ></div>
          </div>
        )}
        <FontAwesomeIcon
          icon={faPalette}
          className={styles.fa}
          style={{ color: color }}
          onClick={() => setTogglePalette(!togglePalette)}
        />
      </footer>
    </div>
  );
};
