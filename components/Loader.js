import styles from "@/styles/Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.text}>Loading more results...</h2>
    </div>
  );
};

export default Loader;
