import styles from "@/styles/EndMessage.module.scss";

const EndMessage = ({ totalResults }) => {
  console.log(totalResults);
  return (
    <div className={styles.container}>
      <h2 className={styles.text}>You have seen all {totalResults} results</h2>
    </div>
  );
};

export default EndMessage;
