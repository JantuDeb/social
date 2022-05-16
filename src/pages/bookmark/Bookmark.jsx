import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/post/Post";
import { fetchBookmarks } from "../../features/bookmarks/bookmark-slice";
import styles from "../explore/Explore.module.css";
export const Bookmark = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  const bookmarks = useSelector((state) => state.bookmark.bookmarks);
  return (
    <div className={styles.posts}>
      {bookmarks.map((bookmark) => {
        console.log(bookmark);
        return <Post key={bookmark._id} post={bookmark.post} bookmark={true} />;
      })}
    </div>
  );
};
