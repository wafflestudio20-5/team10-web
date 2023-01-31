import styles from "./Content.module.scss";

export default function Content({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{title}</div>
      <div className={styles.content}>{content}</div>
      <div></div>
    </div>
  );
}
