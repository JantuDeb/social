import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import { SidebarLeft } from "../../components/sidebar/SidebarLeft";
import { SidebarRight } from "../../components/sidebar/SidebarRight";
import styles from "./Home.module.css";
export const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className={styles.container}>
          <SidebarLeft />
          <Outlet />
          <SidebarRight />
        </div>
      </main>
    </>
  );
};
