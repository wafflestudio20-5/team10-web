import styles from "./CheckList.module.scss";

export default function CheckList({
  scales,
  handleScales,
}: {
  scales: number[];
  handleScales: (index: number, scale: number) => void;
}) {
  return (
    <div className={styles["grid-container"]}>
      <div className={styles.title1}>평가문항</div>
      <div className={styles.title2}>답변</div>
      <EvaluateList></EvaluateList>
      <EvaluateArticleAndCheckList
        index={1}
        content={"이 강의는 전체적으로 만족스러웠다."}
        scales={scales}
        handleScales={handleScales}
      />
      <EvaluateArticleAndCheckList
        index={2}
        content={"강의 준비와 강의 내용이 충실하였다."}
        scales={scales}
        handleScales={handleScales}
      />
      <EvaluateArticleAndCheckList
        index={3}
        content={"교육 방법이 효과적이었다."}
        scales={scales}
        handleScales={handleScales}
      />
      <EvaluateArticleAndCheckList
        index={4}
        content={"이 강의는 매우 만족스러우므로 주위에 수강을 권고하겠다."}
        scales={scales}
        handleScales={handleScales}
      />
      <EvaluateArticleAndCheckList
        index={5}
        content={"과제나 시험에 대한 담당 강의자의 피드백은 도움이 되었다."}
        scales={scales}
        handleScales={handleScales}
      />
      <EvaluateArticleAndCheckList
        index={6}
        content={"강의자는 결강 없이 수업을 충실히 진행하였다."}
        scales={scales}
        handleScales={handleScales}
      />
      <EvaluateArticleAndCheckList
        index={7}
        content={"이 강의를 통해 내 역량이 향상되었다."}
        scales={scales}
        handleScales={handleScales}
      />
    </div>
  );
}

const EvaluateList = () => {
  return (
    <>
      <div className={styles.list}>매우그렇다</div>
      <div className={styles.list}>그렇다</div>
      <div className={styles.list}>보통이다</div>
      <div className={styles.list}>그렇지않다</div>
      <div className={styles.list}>매우그렇지않다</div>
    </>
  );
};

const EvaluateArticleAndCheckList = ({
  index,
  content,
  scales,
  handleScales,
}: {
  index: number;
  content: string;
  scales: number[];
  handleScales: (index: number, scale: number) => void;
}) => {
  return (
    <>
      <div className={styles.item}>{index}</div>
      <div className={styles.question}>{content}</div>
      <div className={styles.item}>
        <input
          type='checkbox'
          checked={scales[index - 1] === 5}
          onChange={(e) => {
            scales[index - 1] === 5
              ? handleScales(index, 0)
              : handleScales(index, 5);
          }}
        ></input>
      </div>
      <div className={styles.item}>
        <input
          type='checkbox'
          checked={scales[index - 1] === 4}
          onChange={(e) => {
            scales[index - 1] === 4
              ? handleScales(index, 0)
              : handleScales(index, 4);
          }}
        ></input>
      </div>
      <div className={styles.item}>
        <input
          type='checkbox'
          checked={scales[index - 1] === 3}
          onChange={(e) => {
            scales[index - 1] === 3
              ? handleScales(index, 0)
              : handleScales(index, 3);
          }}
        ></input>
      </div>
      <div className={styles.item}>
        <input
          type='checkbox'
          checked={scales[index - 1] === 2}
          onChange={(e) => {
            scales[index - 1] === 2
              ? handleScales(index, 0)
              : handleScales(index, 2);
          }}
        ></input>
      </div>
      <div className={styles.item}>
        <input
          type='checkbox'
          checked={scales[index - 1] === 1}
          onChange={(e) => {
            scales[index - 1] === 1
              ? handleScales(index, 0)
              : handleScales(index, 1);
          }}
        ></input>
      </div>
    </>
  );
};
