import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/post/Post";
import { fetchAllPosts, selectPost } from "../../features/post/post-slice";
import { getSortedPosts } from "../../utils/utils";
import styles from "./Explore.module.css";
import { sortReducer } from "./sort-reducer";

export const Explore = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const posts = useSelector(selectPost);

  const [state, sortDispatch] = useReducer(sortReducer, {
    sortBy: "new",
  });

  const handleSelectChange = (e) => {
    const value = e.target.value;
    sortDispatch({ type: "SORT_BY_DATE", payload: value.toLowerCase() });
  };

  const sortedPosts = getSortedPosts(posts, state);

  return (
    <div className={styles.posts}>
      <div className={styles.sort}>
        <p>Sort by: </p>
        <select onChange={handleSelectChange}>
          <option> New </option>
          <option> Old </option>
          <option> Trending </option>
        </select>
      </div>
      {sortedPosts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};
