import React from "react";
import styles from "./Stories.module.css";

export const Stories = () => {
  return (
    <div className={styles.stories}>
      {[1, 2, 3, 4, 5,6].map(() => {
        return (
          <div className={styles.story}>
            <div className={styles.background}>
              <img src="https://picsum.photos/200/400" alt="" />
            </div>
            <div className={styles.profileImg}>
              <img src="assets/img-1.jpg" alt="profile" />
            </div>
            <div className={styles.content}>
              <p className={styles.userName}>User Name</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
