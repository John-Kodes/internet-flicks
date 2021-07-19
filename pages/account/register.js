// React and Next
import { useState, useEffect, useContext } from "react";
import Link from "next/dist/client/link";
// NPM
import { FaUser } from "react-icons/fa";
// Styles
import styles from "@/styles/accountPage.module.scss";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          <FaUser /> Register
        </h1>
        <form className={styles.form}>
          <div className={styles.inputBox}>
            <label htmlFor="username" className={styles.label}>
              USERNAME
            </label>
            <input
              className={styles.field}
              type="text"
              name="username"
              id="username"
              placeholder="HeleneTheSurgeon"
            />
          </div>
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
          <div className={styles.inputBox}>
            <label htmlFor="confirmPassword" className={styles.label}>
              CONFIRM PASSWORD
            </label>
            <input
              className={styles.field}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
            />
          </div>
          <button className={styles.loginBtn} type="submit">
            LOGIN
          </button>
          <div className={styles.register}>
            Already have an account?{" "}
            <Link href="/account/login">
              <a className={styles.link}>Login</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
