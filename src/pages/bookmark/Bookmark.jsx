import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/loader/Loader";
import { Post } from "../../components/post/Post";
import { fetchBookmarks } from "../../features/bookmarks/bookmark-slice";
import styles from "../explore/Explore.module.css";
export const Bookmark = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  const { bookmarks, bookmarkFetchStatus } = useSelector(
    (state) => state.bookmark
  );

  return bookmarkFetchStatus === "loading" ? (
    <Loader />
  ) : (
    <div className={styles.posts}>
      {bookmarks.map((bookmark) => (
        <Post key={bookmark._id} post={bookmark.post} bookmark={true} />
      ))}
    </div>
  );
};
