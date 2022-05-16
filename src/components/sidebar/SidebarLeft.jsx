import React from "react";
import styles from "./SidebarLeft.module.css";
import { BiEnvelope } from "react-icons/bi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { RiPaletteLine } from "react-icons/ri";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { VscCompass } from "react-icons/vsc";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export const SidebarLeft = () => {
  const user = useSelector((state) => state.auth.user);
  const sidebarItems = [
    { title: "Home", path: "/home/feed", icon: <AiOutlineHome size={18} /> },
    { title: "Explore", path: "/home/explore", icon: <VscCompass size={18} /> },
    {
      title: "Discover",
      path: "/home/discover",
      icon: <MdOutlinePeopleAlt size={18} />,
    },
    {
      title: "Chats",
      path: "/home/chats",
      icon: <BiEnvelope size={18} />,
      count: true,
    },
    {
      title: "Bookmarks",
      path: "/home/bookmarks",
      icon: <BsFillJournalBookmarkFill size={18} />,
    },
    { title: "Theme", path: "/home/theme", icon: <RiPaletteLine size={18} /> },
    {
      title: "Settings",
      path: "/home/settings",
      icon: <AiOutlineSetting size={18} />,
    },
  ];
  return (
    <aside className={styles.left}>
      <Link to={`/home/profile/${user._id}`} className={styles.profile}>
        <div className={styles.profileImg}>
          <img src={user?.photo?.secure_url} alt="profile" />
        </div>
        <div className={styles.profileHandle}>
          <h4>{user.name}</h4>
          <p className="text-gray">@{user.username}</p>
        </div>
      </Link>

      <div className={styles.sidebarWrapper}>
        <ul className={styles.leftList}>
          {sidebarItems.map(({ title, path, icon, count }) => {
            return (
              <NavLink
                key={path}
                to={path}
                className={
                  path === "/home/discover"
                    ? `${styles.discover} ${styles.leftListItem}`
                    : styles.leftListItem
                }
              >
                <span className={styles.iconWrapper}>
                  {icon}
                  {count && <small className={styles.count}>9+</small>}
                </span>
                <h3>{title}</h3>
              </NavLink>
            );
          })}
        </ul>
      </div>
      <button className={`${styles.btnCreate} btn btn-primary`}>Create</button>
    </aside>
  );
};
