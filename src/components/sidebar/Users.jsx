import React from "react";
import { Link } from "react-router-dom";
import styles from "./SidebarRight.module.css";
export const Users = ({ data = [], isFollowing, handleClick }) => {
  return data.map((user) => {
    const following = isFollowing(user.followers);
    return (
      <Link
        key={user._id}
        to={`/home/profile/${user._id}`}
        className={styles.request}
      >
        <div className={styles.profile}>
          <div className={styles.profileImg}>
            <img src={user.photo.secure_url} alt="profile" />
          </div>
          <div className={styles.profileHandle}>
            <h4>{user.name}</h4>
            <p className="text-gray">@{user.username}</p>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={(e) =>{
            e.preventDefault()
            handleClick(user._id, following)
          }}
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      </Link>
    );
  });
};
