import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { BiBookmark } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

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
import { Modal } from "../shared/Modal";
import { PostForm } from "../forms/PostForm";

export const Post = ({ post, bookmark = false }) => {
  const [showComments, setShowComments] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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

  const hideActionmenu = (e) => {
    if (e.target.tagName === "DIV") {
      setShowActionMenu(false);
    }
  };
  return (
    <>
      {post && (
        <div className={styles.post} onClick={hideActionmenu}>
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
              <div className={styles.actionMenuContainer}>
                <button
                  className="transparent"
                  onClick={() => setShowActionMenu(true)}
                >
                  <BsThreeDotsVertical size={20} />
                </button>
                {showActionMenu && (
                  <div className={styles.actionMenuButtons}>
                    <button
                      className="transparent"
                      onClick={() => {
                        setShowActionMenu(false);
                        setShowEditModal(true);
                      }}
                    >
                      <FiEdit size={20} /> Edit
                    </button>
                    <button
                      className="transparent"
                      onClick={() => dispatch(deletePost(post._id))}
                    >
                      <MdDeleteOutline size={20} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
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
              {post?.tags?.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </p>
          </div>
          <div className={styles.actionButtons}>
            <div className={styles.actionButtonRight}>
              <button className="transparent" onClick={likeClikeHandler}>
                {isLiked ? (
                  <AiFillHeart size={20} color="red" />
                ) : (
                  <AiOutlineHeart size={20} />
                )}
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
      )}
      {showEditModal && (
        <Modal setShowModal={setShowEditModal}>
          <div>
            <div className={styles.modalHeader}>
              <h2>Edit Post</h2>
              <button
                className={styles.btnClose}
                onClick={() => setShowEditModal(false)}
              >
                <IoCloseSharp size={25} />
              </button>
            </div>
            <PostForm post={post} closeModal={setShowEditModal} editing />
          </div>
        </Modal>
      )}
    </>
  );
};
