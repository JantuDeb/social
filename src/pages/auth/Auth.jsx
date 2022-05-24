import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Auth.module.css";
export const Auth = () => {
  return (
    <div className={styles.conatiner}>
      <div className={styles.formContainer}>
        <div className={styles.links + " links"}>
          <NavLink to="/">Sign in</NavLink>
          <NavLink to="/signup">Sign up </NavLink>
        </div>
        <Outlet />
      </div>
      <div className={styles.pannels}>
        <h1>iONVU Connect</h1>
        <h2>See what’s happening</h2>
        <img src="assets/landing.png" alt="" />
      </div>
    </div>
  );
};
