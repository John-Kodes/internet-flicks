import { useContext } from "react";
// Context
import Context from "@/context/Context";
// Components
import Layout from "@/components/Layout";
// styles
import styles from "@/styles/MyListPage.module.scss";

const MyListPage = () => {
  const { userData } = useContext(Context);

  const testArr = [];

  for (let i = 0; i < 10; i++) {
    testArr.push(<div className={styles.test} key={i} />);
  }

  console.log(userData);
  return (
    <Layout category={userData.name || userData.username + "'s list"}>
      <div className={styles.container}>{[...testArr]}</div>
    </Layout>
  );
};

export default MyListPage;
