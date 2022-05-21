import React from "react";
import styles from "./Navbar.module.css";
// import { FcSearch } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/auth-slice";
import { Link, useNavigate } from "react-router-dom";
export const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2>Social</h2>
        {/* <div className={styles.searchBar}>
          <FcSearch size={20} />
          <input
            type="text"
            name="search"
            placeholder="Search for a friend or post"
            className={styles.inputSearch}
          />
        </div> */}

        <div className={styles.create}>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
          <Link to={`/home/profile/${user._id}`} className={styles.profileImg}>
            <img
              src={user?.photo?.secure_url}
              alt="profile"
              className={styles.image}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
