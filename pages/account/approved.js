import { useContext, useEffect } from "react";
// Context
import Context from "@/context/Context";
// Components
import Layout from "@/components/Layout";
// Styles
import styles from "@/styles/approved.module.scss";

const ApprovedPage = ({ approved, token }) => {
  const { createUserSessionId, userLoggedIn, sessionId } = useContext(Context);

  const testHandler = () => {
    console.log(userLoggedIn, sessionId);
  };

  useEffect(() => {
    if (userLoggedIn) return;
    console.log(token);
    createUserSessionId(token);
    console.log(sessionId);
  }, []);

  return (
    <Layout useNav={false}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>Approved!</h1>
          <h2 onClick={testHandler}>test</h2>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = ({ query }) => {
  const { approved, request_token: token } = query;

  console.log(approved, token);
  return {
    props: { approved, token },
  };
};

export default ApprovedPage;
