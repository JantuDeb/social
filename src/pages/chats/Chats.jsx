import React, { useState } from "react";
import { Message } from "../../components/message/Message";
import styles from "./Chats.module.css";
import { FiSend } from "react-icons/fi";
export const Chats = () => {
  const [userId, setUserId] = useState(1);
  return (
    <div className={styles.chats}>
      <div className={styles.users}>
        {[1, 2, 3, 4, 5].map((p) => {
          return (
            <div
              key={p}
              onClick={() => setUserId(p)}
              className={`${styles.people} ${
                userId === p ? styles.active : ""
              }`}
            >
              <div className={styles.profile}>
                <div className={styles.profileImg}>
                  <img src="assets/img-profile.png" alt="profile" />
                </div>
                <div className={styles.profileHandle}>
                  <h4>Jantu Deb</h4>
                  <p className="text-gray">@jantu</p>
                </div>
              </div>
              {/* <p className="text-gray">Jul 5, 2022</p> */}
            </div>
          );
        })}
      </div>

      <div className={styles.chat}>
        <div className={styles.messages}>
          {[1, 2, 3, 4, 5].map((message, index) => (
            <Message key={message} own={index % 2 === 0 ? true : false} />
          ))}
        </div>
        <div className={styles.searchBar}>
          <input
            type="text"
            name="search"
            placeholder="Write a comment"
            className={styles.inputSearch}
          />
          <FiSend size={20} />
        </div>
      </div>
    </div>
  );
};
