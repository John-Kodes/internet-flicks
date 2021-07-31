import styles from "@/styles/EndMessage.module.scss";

const EndMessage = ({ totalResults }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.text}>
        You have seen all {totalResults} result{totalResults > 1 && "s"}
      </h2>
    </div>
  );
};

export default EndMessage;
