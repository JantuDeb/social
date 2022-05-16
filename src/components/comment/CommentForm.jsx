import React, { useState } from "react";
import styles from "./Comment.module.css";
import { FiSend } from "react-icons/fi";
export const CommentForm = ({ handleSubmit }) => {
  const [text, settext] = useState("");
  const handleButtonClick = (e) => {
    e.preventDefault();
    handleSubmit(text);
    settext("")
  };
  return (
    <form className={styles.commentForm} onSubmit={handleButtonClick}>
      <input
        type="text"
        name="comment"
        placeholder="Write a comment"
        value={text}
        onChange={(e)=>settext(e.target.value)}
        className={styles.inputSearch}
      />
      <button className="transparent">
        <FiSend size={20} />
      </button>
    </form>
  );
};
