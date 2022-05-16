import React from "react";
import styles from "./Navbar.module.css";
import { FcSearch } from "react-icons/fc";
import { useSelector } from "react-redux";
export const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2>Social</h2>
        <div className={styles.searchBar}>
          <FcSearch size={20}/>
          <input
            type="text"
            name="search"
            placeholder="Search for a friend or post"
            className={styles.inputSearch}
          />
        </div>

        <div className={styles.create}>
          <button className="btn btn-primary" htmlFor="create-post">
            Create
          </button>
          <div className={styles.profileImg}>
            <img
              src={user?.photo?.secure_url}
              alt="profile"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
