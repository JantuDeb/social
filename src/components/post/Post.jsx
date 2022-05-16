import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { BiBookmark } from "react-icons/bi";
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from "react-icons/ai";
import styles from "./Post.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBookmarks,
  removeBookmarks,
} from "../../features/bookmarks/bookmark-slice";
import {
  deletePost,
  disLikePost,
  likePost,
} from "../../features/post/post-slice";
import { Comments } from "../comment/Comments";
import {
  addComment,
  fetchComments,
} from "../../features/comment/comment-slice";
import { CommentForm } from "../comment/CommentForm";
import { formatDate } from "../../utils/utils";

export const Post = ({ post, bookmark = false }) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComments(post._id));
  }, [dispatch, post._id]);

  const user = useSelector((state) => state.auth.user);
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);

  const handleBookmarkClick = () => {
    if (bookmark) dispatch(removeBookmarks(post._id));
    else dispatch(addToBookmarks(post._id));
  };

  const isLiked = post.likes.includes(user._id);
  const isbookMarked = bookmarks.some((book) => book.post._id === post._id);
  const likeClikeHandler = () => {
    if (!isLiked) dispatch(likePost(post._id));
    else dispatch(disLikePost(post._id));
  };

  const addCommentHandler = (text) => {
    dispatch(addComment({ postId: post._id, body: text }));
    setShowComments(true);
  };

  return (
    post && (
      <div className={styles.post}>
        <div className={styles.head}>
          <Link
            to={`/home/profile/${post?.user?._id}`}
            className={styles.profile}
          >
            <div className={styles.profileImg}>
              <img src={post?.user?.photo?.secure_url} alt="profile" />
            </div>
            <div className={styles.profileHandle}>
              <h4>{post?.user?.name}</h4>
              <p className="text-gray">
                {post?.user?.location}, {formatDate(post.createdAt)}
              </p>
            </div>
          </Link>
          {post.user._id === user._id && (
            <button
              className="transparent"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <MdDeleteOutline size={20} />
            </button>
          )}
        </div>
        {post?.image?.url && (
          <div className={styles.media}>
            <img src={post?.image?.url} alt="post" />
          </div>
        )}
        <div className={styles.description}>
          <p>{post?.description}</p>
          <p className={styles.tags}>
            {post?.tags?.map((tag,index) => (
              <span key={index}>{tag}</span>
            ))}
          </p>
        </div>
        <div className={styles.actionButtons}>
          <div className={styles.actionButtonRight}>
            <button className="transparent" onClick={likeClikeHandler}>
              <AiOutlineHeart size={20} color={isLiked ? "red" : "black"} />
            </button>
            <button
              className="transparent"
              onClick={() => setShowComments((v) => !v)}
            >
              <AiOutlineMessage size={20} />
            </button>
            <AiOutlineShareAlt size={20} />
          </div>
          <button className="transparent" onClick={handleBookmarkClick}>
            <BiBookmark
              size={20}
              color={bookmark || isbookMarked ? "#2563eb" : ""}
            />
          </button>
        </div>
        <CommentForm handleSubmit={addCommentHandler} />
        {showComments && <Comments postId={post._id} />}
      </div>
    )
  );
};
