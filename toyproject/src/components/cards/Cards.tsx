import { Card } from "./Card";
import styles from "./Cards.module.scss";
import { useSubjectContext } from "../../context/SubjectContext";

export const Cards = () => {
  const { mySubjects } = useSubjectContext();

  return (
    <div className={styles.cardsContainer}>
      {mySubjects &&
        mySubjects.map((subject) => {
          return <Card key={subject.id} subject={subject}></Card>;
        })}
    </div>
  );
};
