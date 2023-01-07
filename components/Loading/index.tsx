import styles from "../../styles/Home.module.css";

export default function Loading() {
  return (
    <div className={styles.backdrop}>
      <h1>
        Loading<span className={styles.animationdots}>...</span>
      </h1>
    </div>
  );
}
