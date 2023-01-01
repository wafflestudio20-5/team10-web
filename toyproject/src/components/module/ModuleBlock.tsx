import styles from "./ModuleBlock.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPaperclip } from "@fortawesome/free-solid-svg-icons";

export interface ModuleInterface {
  name: string;
  contents: string[];
}

const Module = ({ module }: { module: ModuleInterface }) => {
  return (
    <div className={styles.moduleContainer}>
      <header>
        <FontAwesomeIcon icon={faCaretDown} className={styles.caretDown} />
        {module.name}
      </header>

      {module.contents.map((content) => (
        <article>
          <FontAwesomeIcon icon={faPaperclip} className={styles.paperClip} />
          <span>{content}</span>
        </article>
      ))}
    </div>
  );
};

export default function ModuleBlock() {
  const modules = [
    { name: "1주차", contents: ["Lecture note 1", "Lecture note 1"] },
    { name: "2주차", contents: ["Lecture note 3", "Lecture note 4"] },
  ];
  return (
    <div className={styles.wrapper}>
      {modules.map((module) => (
        <Module module={module} />
      ))}
    </div>
  );
}
