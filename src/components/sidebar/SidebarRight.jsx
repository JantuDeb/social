import React, { useCallback, useEffect, useReducer, useState } from "react";
import styles from "./SidebarRight.module.css";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowers,
  fetchFollowings,
  fetchPeoples,
  follow,
  unFollow,
} from "../../features/followers/followers-slice";
import { Users } from "./Users";
import { searchReducer } from "./search-reducer";
import { debounce } from "../../utils/utils";
import axios from "axios";
import { axiosConfig } from "../../config/axios-config";

export const SidebarRight = () => {
  const [searchState, searchDispatch] = useReducer(searchReducer, {
    users: [],
    searchString: "",
  });

  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState("Followers");

  const searchUsers = async (text) => {
    if (text === "") return dispatch({ type: "RESET" });
    try {
      const { data } = await axios.get(
        "/search_users?username=" + text,
        axiosConfig
      );
      console.log(data.users);
      searchDispatch({
        type: "SET_USER",
        payload: {
          users: data.users,
        },
      });
    } catch (error) {
      console.log(error);
      // searchDispatch({ type: "RESET" });
    }
  };

  useEffect(() => {
    dispatch(fetchFollowers());
    dispatch(fetchFollowings());
    dispatch(fetchPeoples());
  }, [dispatch]);

  const followers = useSelector((state) => state.follow.followers);
  const followings = useSelector((state) => state.follow.followings);
  const peoples = useSelector((state) => state.follow.peoples);
  const user = useSelector((state) => state.auth.user);

  const isFollowing = (followers) => followers.includes(user._id);

  const handleFollowUnfollow = (id, following) => {
    if (following) dispatch(unFollow(id));
    else dispatch(follow(id));
  };

  const currentPageData = currentPage === "Followers" ? followers : followings;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCallback = useCallback(debounce(searchUsers, 400), []);

  const inputSearchHandler = (e) => {
    searchDispatch({ type: "SET_TEXT", payload: { text: e.target.value } });
    // debounce(searchUsers(e.target.value), 500);
    debouncedCallback(e.target.value);
  };

  return (
    <aside className={styles.right}>
      <div className={styles.message}>
        <div className={styles.categories}>
          {["Followers", "Followings"].map((page) => {
            return (
              <button
                key={page}
                className={`transparent ${styles.category} ${
                  currentPage === page ? styles.activeCategory : ""
                }`}
                onClick={() => setcurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
        <div className={styles.peoples}>
          {currentPageData.map((user) => {
            const following = isFollowing(user.followers);
            return (
              <Link
                key={user._id}
                to={`/home/profile/${user._id}`}
                className={styles.people}
              >
                <div className={styles.profile}>
                  <div className={styles.profileImg}>
                    <img src={user?.photo?.secure_url} alt="profile" />
                  </div>
                  <div className={styles.profileHandle}>
                    <h4>{user?.name}</h4>
                    <p className="text-gray">@{user.username}</p>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFollowUnfollow(user._id, following);
                  }}
                >
                  {following ? "Unfollow" : "Follow"}
                </button>
              </Link>
            );
          })}
        </div>
      </div>

      <div className={styles.friendRequests}>
        <h4 className={styles.heading}>Discover People</h4>
        <div className={styles.searchBar}>
          <BiSearch size={20} />
          <input
            type="text"
            name=""
            value={searchState.searchString}
            onChange={inputSearchHandler}
            placeholder="Search people"
            className={styles.inputSearch}
          />
        </div>
        <div className={styles.requests}>
          <Users
            data={searchState.searchString === "" ? peoples : searchState.users}
            isFollowing={isFollowing}
            handleClick={handleFollowUnfollow}
          />
        </div>
      </div>
    </aside>
  );
};
