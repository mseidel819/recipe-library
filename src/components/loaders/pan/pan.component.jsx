import styles from "./pan.module.css";

const PanLoader = () => (
  <div className={styles.loader}>
    <div className={styles.panWrapper}>
      <div className={styles.pan}>
        <div className={styles.food}></div>
        <div className={styles.panBase}></div>
        <div className={styles.panHandle}></div>
      </div>
      <div className={styles.panShadow}></div>
    </div>
  </div>
);

export default PanLoader;
