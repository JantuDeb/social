import React, { useState } from "react";
import styles from "./PostForm.module.css";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FaHashtag } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import Input from "../shared/Input";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/post/post-slice";
import Button from "../loader/Button";
import EmojiPicker from "emoji-picker-react";

export const PostForm = () => {
  const initialState = {
    description: "",
    image: "",
    tags: [],
  };
  const [postData, setPostData] = useState(initialState);
  const [imgUrl, setImgUrl] = useState("");
  const [tag, setTag] = useState("");
  const [showInputTag, setShowInputTag] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.post.postCreateStatus);

  const imageFileHandler = (e) => {
    setPostData({ ...postData, image: e.target.files[0] });
    const fileReader = new FileReader();
    fileReader.onload = function (ev) {
      setImgUrl(ev.target.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const addTag = () => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
    setTag("");
    setShowInputTag(false);
  };

  const handleInputChange = (e) => {
    setPostData((data) => ({ ...data, description: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
      if (key === "tags") {
        value.forEach((v) => {
          formData.append("tags", v);
        });
      } else {
        formData.append(key, value);
      }
    });
    try {
      dispatch(createPost(formData)).unwrap();
      setPostData(initialState);
      setImgUrl("");
    } catch (error) {
      console.log(error);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    event.preventDefault();
    setPostData((data) => ({
      ...data,
      description: data.description + emojiObject.emoji,
    }));
    setShowEmoji(false);
  };

  return (
    <form className={styles.postForm}>
      <div className={styles.inputBox}>
        <div className={styles.profileImg}>
          <img src={user?.photo?.secure_url} alt="profile" />
        </div>
        <textarea
          onChange={handleInputChange}
          value={postData.description}
          type="text"
          name="description"
          id="create-post"
          rows={3}
          className={styles.input}
          placeholder="What's on your mind? "
        />
      </div>
      {imgUrl && <img src={imgUrl} alt="banner" className={styles.banner} />}
      {postData.tags.map((tag, index) => (
        <span key={tag + index} className={styles.tag}>
          {tag}
        </span>
      ))}
      {showInputTag && (
        <div className={styles.tagInput}>
          <Input
            name="tag"
            value={tag}
            placeholder="Add tag"
            showLabel={false}
            inputChangeHandler={(e) => setTag(e.target.value)}
          />
          <button
            onClick={addTag}
            className="btn bg-secondary my-2 radius-sm"
            type="button"
          >
            Add
          </button>
        </div>
      )}
      <div className={styles.formFooter}>
        <div className={styles.footerInputBox}>
          <div className={styles.fileInput}>
            <input
              type="file"
              id="file"
              className={styles.file}
              onChange={imageFileHandler}
            />
            <label htmlFor="file">
              <HiOutlinePhotograph size={20} />
            </label>
          </div>
          <button
            className={styles.btnTransparent}
            onClick={() => setShowInputTag((v) => !v)}
            type="button"
          >
            <FaHashtag size={20} />
          </button>
          <button
            className={styles.btnTransparent}
            onClick={() => setShowEmoji((v) => !v)}
            type="button"
          >
            <GrEmoji size={20} />
          </button>
        </div>
        <Button
          disabled={status === "loading"}
          loading={status === "loading"}
          text="Post"
          clickHandler={handleSubmit}
          btnStyle="btn btn-primary"
        />
      </div>
      {showEmoji && (
        <div className={styles.emojiContainer}>
          <EmojiPicker onEmojiClick={onEmojiClick} disableSearchBar />
        </div>
      )}
    </form>
  );
};
