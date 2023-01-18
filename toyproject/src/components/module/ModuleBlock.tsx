import styles from "./ModuleBlock.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretRight,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export interface ModuleInterface {
  id: number;
  name: string;
  contents: string[];
}

const Module = ({
  module,
  openedToggles,
  handleSingleToggle,
}: {
  module: ModuleInterface;
  openedToggles: boolean[];
  handleSingleToggle: (id: number) => void;
}) => {
  return (
    <div className={styles.moduleContainer}>
      <header onClick={() => handleSingleToggle(module.id)}>
        <FontAwesomeIcon
          icon={openedToggles[module.id] ? faCaretDown : faCaretRight}
          className={styles.caret}
        />
        {module.name}
      </header>

      <article
        className={
          openedToggles[module.id]
            ? styles.contentContainerShow
            : styles.contentContainer
        }
      >
        {module.contents.map((content) => (
          <section
            key={content}
            className={
              openedToggles[module.id] ? styles.contentShow : styles.content
            }
          >
            <FontAwesomeIcon icon={faPaperclip} className={styles.paperClip} />
            <span>{content}</span>
          </section>
        ))}
      </article>
      {/* )} */}
    </div>
  );
};

export default function ModuleBlock() {
  const modules = [
    // 예시 모듈 데이터
    { id: 0, name: "1주차", contents: ["Lecture note 1", "Lecture note 2"] },
    { id: 1, name: "2주차", contents: ["Lecture note 3", "Lecture note 4"] },
    { id: 2, name: "3주차", contents: ["Lecture note 5", "Lecture note 6"] },
  ];

  // module의 개수와 같은 개수의 1로 이루어진 배열 생성 (처음에는 모든 모듈이 열려 있는 상태)
  // 모듈(토글)이 열려 있으면 1, 아니면 0
  const [openedToggles, setOpenedToggles] = useState<boolean[]>(
    Array(modules.length).fill(true)
  );

  // 각 모듈 헤더 클릭 시 접고 펼치기
  const handleSingleToggle = (id: number) => {
    const newOpenedToggles = [
      ...openedToggles.slice(0, id),
      !openedToggles[id],
      ...openedToggles.slice(id + 1),
    ];
    setOpenedToggles(newOpenedToggles);
  };

  // 하나라도 펼쳐진 모듈이 있으면 모든 모듈 접기, 모두 접혀있으면 모든 모듈 펼치기
  const handleAllToggle = () => {
    if (openedToggles.includes(true)) {
      const newOpenedToggles = Array(modules.length).fill(false);
      setOpenedToggles(newOpenedToggles);
    } else {
      const newOpenedToggles = Array(modules.length).fill(true);
      setOpenedToggles(newOpenedToggles);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerbar}>
        <button onClick={handleAllToggle}>
          {openedToggles.includes(true) ? "모든 모듈 접기" : "모든 모듈 펼치기"}
        </button>
      </div>
      <article>
        {modules.map((module) => (
          <Module
            key={module.id}
            module={module}
            openedToggles={openedToggles}
            handleSingleToggle={handleSingleToggle}
          />
        ))}
      </article>
    </div>
  );
}
