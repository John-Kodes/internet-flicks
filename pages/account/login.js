// React and Next
import { useState, useEffect, useContext } from "react";
import Link from "next/dist/client/link";
// Context
import Context from "@/context/Context";
// Config
import { API_KEY, TMDB_API, NEXT_URL } from "@/config/index";
// Components
import Layout from "@/components/Layout";
// NPM
import { FaUser } from "react-icons/fa";
// Styles
import styles from "@/styles/LoginPage.module.scss";

const LoginPage = ({ approved, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { createGuestSessionId } = useContext(Context);

  const submitHandler = (e) => {
    e.preventDefault();
    login();
  };

  const guestHandler = () => {
    createGuestSessionId();
  };

  // login
  const login = async () => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        token,
      }),
    });

    const accountData = await res.json();

    console.log(accountData);

    if (accountData.success) {
      console.log("%c success", "color: lime;");
      console.log(accountData);
    } else {
      console.log(accountData);
    }
  };

  return (
    <Layout useNav={false}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>
            <FaUser /> Login
          </h2>

          <form onSubmit={submitHandler} className={styles.form}>
            <div className={styles.inputBox}>
              <label htmlFor="username" className={styles.label}>
                USERNAME
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="helene_dm"
                required
                className={styles.field}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="password" className={styles.label}>
                PASSWORD
              </label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="password123"
                required
                className={styles.field}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className={styles.btn}>LOG IN</button>
          </form>
          <p>
            Continue as <a onClick={guestHandler}>Guest</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;

export const getServerSideProps = ({ query, req }) => {
  const { approved, request_token: token } = query;

  console.log(req.headers.cookie);

  return {
    props: { approved, token },
  };
};

// ////////////////////////////////////////////////////////////////////////
// let token = "";
// // create request token
// const reqToken = async () => {
//   const res = await fetch(`${TMDB_API}/authentication/token/new${API_KEY}`);
//   const tokenObject = await res.json();

//   token = tokenObject.request_token;
// };

// reqToken();

// // Asking user for permission to use their account in your website
// const askPermission = async () => {
//   if (!window) return;

//   const url = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${NEXT_URL}/account/approved`;

//   window.open(url, "_blank");
// };

// // creating session ID (be careful with URLs)

// const createSessionId = async () => {
//   const res = await fetch(
//     `${TMDB_API}/authentication/session/new${API_KEY}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         request_token: token,
//       }),
//     }
//   );

//   const sessionId = await res.json();

//   if (sessionId.session_id) {
//     console.log("%c success", "color: lime;", sessionId.session_id);
//     return sessionId.session_id;
//   } else {
//     console.log(sessionId);
//   }
// };
