// React and Next
import { useState, useContext } from "react";
import { useRouter } from "next/router";
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
  const { createGuestSessionId, setUserLoggedIn } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [warningMessage, setWarningMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const router = useRouter();

  const guestHandler = () => {
    createGuestSessionId();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login();
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
      setWarningMessage("");
      // For the Context
      setUserLoggedIn(true);

      setLoginSuccess(true);
      router.push("/browse");
    } else {
      setWarningMessage(accountData.message);
    }
  };

  return (
    <Layout useNav={false}>
      <div className={styles.container}>
        {loginSuccess && (
          <div className={styles.successBox}>
            <p>
              Login was successful!
              <br />
              You will be redirected to the browsing page.
            </p>
          </div>
        )}
        {warningMessage && (
          <div className={styles.errorBox}>
            <p>
              <span>*</span> {warningMessage}
            </p>
          </div>
        )}
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
                type="password"
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
            Don't have an account?{" "}
            <a href="https://www.themoviedb.org/signup" target="_blank">
              Register in TMDb
            </a>{" "}
            <br />
            Continue as <a onClick={guestHandler}>Guest</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
