import { useSelector } from "react-redux";
import { Comment } from "./Comment";
// import styles from "./Comment.module.css";
export const Comments = ({ postId }) => {
  // console.log(value);

  const allComments = useSelector((state) => state.comment.comments).filter(
    (comment) => comment.post === postId
  );

  const comments = allComments.filter((comment) => comment.parentId === null);

  if(comments.length===0){
    return <p>No comments to display</p>
  }
  return comments.map((comment) => {
    return <Comment key={comment._id} comment={comment} comments={allComments} />;
  });
};
