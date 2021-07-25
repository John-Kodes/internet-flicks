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

const LoginPage = () => {
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
    const tokenRes = await fetch(
      `${TMDB_API}/authentication/token/new${API_KEY}`
    );
    const tokenObject = await tokenRes.json();

    const token = tokenObject.request_token;

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
