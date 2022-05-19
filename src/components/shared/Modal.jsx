import React from "react";
import styles from "./Modal.module.css";

export const Modal = ({ children, setShowModal }) => {
  const closeModal = (e) => {
    if (e.target.tagName === "DIV") {
      setShowModal(false);
    }
  };
  return (
    <div className={styles.modalContainer} onClick={closeModal}>
      <div className={styles.modal} onClick={(e)=>e.stopPropagation()}>{children}</div>
    </div>
  );
};
