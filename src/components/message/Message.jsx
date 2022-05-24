import React from "react";
import styles from "./Message.module.css";
export const Message = ({ own }) => {
  return (
    <div
      className={
        own ? `${styles.message} ${styles.ownMessage}` : styles.message
      }
    >
      <div className={styles.profileImg}>
        <img src="assets/img-profile.png" alt="profile" />
      </div>
      <div className={own ? `${styles.text} ${styles.ownText}` : styles.text}>
        This is a chat Message
      </div>
    </div>
  );
};
