import React from "react";
import "./Button.css";
const Button = ({ loading, text, clickHandler, btnStyle="btn btn-primary" ,disabled=false}) => {
  return (
    <button className={`${btnStyle} ${loading? "btn-loading":""}`} onClick={clickHandler} disabled={disabled}>
      <span className="btn-text">{text}</span>
    </button>
  );
};

export default Button;
