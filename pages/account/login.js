// React and Next
import { useState, useEffect, useContext } from "react";
import Link from "next/dist/client/link";
// Components
import Layout from "@/components/Layout";
// NPM
import { FaUser } from "react-icons/fa";
// Styles
import styles from "@/styles/accountPage.module.scss";

const LoginPage = () => {
  return (
    <Layout useNav={false}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            <FaUser /> Login
          </h1>
          <form className={styles.form}>
            <div className={styles.inputBox}>
              <label htmlFor="email" className={styles.label}>
                EMAIL
              </label>
              <input
                className={styles.field}
                type="email"
                name="email"
                id="email"
                placeholder="Helene@email.com"
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="password" className={styles.label}>
                PASSWORD
              </label>
              <input
                className={styles.field}
                type="password"
                name="password"
                id="password"
              />
            </div>
            <button className={styles.loginBtn} type="submit">
              LOGIN
            </button>
            <div className={styles.register}>
              Don't have an account?{" "}
              <Link href="/account/register">
                <a className={styles.link}>Register</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
