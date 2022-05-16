import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deleteComment,
} from "../../features/comment/comment-slice";
import { formatDate } from "../../utils/utils";
import styles from "./Comment.module.css";
import { CommentForm } from "./CommentForm";
import { MdClose } from "react-icons/md";
export const Comment = ({ comment, comments }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const canModify = user._id === comment.user;
  const commentId = comment._id;
  const canReply = comment.parentId === null;
  const handleDelete = () => {
    dispatch(deleteComment(comment._id));
  };

  const replies = comments.filter((comment) => comment.parentId === commentId);

  const handleRepy = (text) => {
    if (!text) return;
    dispatch(
      addComment({ parentId: comment._id, body: text, postId: comment.post })
    );
    setShowReplyForm(false);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.profileImg}>
        <img src={comment.photoUrl} alt="profile" />
      </div>
      <div>
        <div className={styles.commentBody}>
          <div className={styles.flex}>
            <p className={styles.userName}>{comment.userName}</p>
            <p className="text-gray">{formatDate(comment.createdAt)}</p>
          </div>
          <p>{comment.body}</p>
        </div>
        <div>
          {showReplyForm ? (
            <div className={styles.replyForm}>
              <button
                className="transparent"
                onClick={() => setShowReplyForm(false)}
              >
                <MdClose size={20} />
              </button>
              <CommentForm handleSubmit={handleRepy} />
            </div>
          ) : (
            <div className={styles.actionButton}>
              {canReply && (
                <button onClick={() => setShowReplyForm(true)}>Reply</button>
              )}
              {canModify && (
                <>
                  <button>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </>
              )}
            </div>
          )}
          {replies.length !== 0 &&
            replies.map((comment) => {
              return <Comment comment={comment} comments={[]} />;
            })}
        </div>
      </div>
    </div>
  );
};
