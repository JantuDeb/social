import React from "react";
import styles from "./Input.module.css";
const Input = ({
  inputChangeHandler,
  name,
  value,
  placeholder,
  type = "text",
  disable = false,
  showLabel = true,
}) => {
  return (
    <div className={styles.inputGroup}>
      {showLabel && (
        <label htmlFor={name} className="label">
          {placeholder}
        </label>
      )}
      <input
        type={type}
        id={name}
        className={styles.input}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={inputChangeHandler}
        disabled={disable}
        autoFocus
      />
    </div>
  );
};

export default Input;
