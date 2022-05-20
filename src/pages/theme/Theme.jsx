import React, { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Theme.module.css";
export const Theme = () => {
  const sizes = ["10px", "13px", "16px", "19px", "22px"];
  const colors = [252, 52, 352, 152, 202];
  const bgClasses = [
    { title: "Light", bg: "bg1" },
    { title: "Dim", bg: "bg2" },
    { title: "Dark", bg: "bg3" },
  ];

  const {color, fontSize,mode,changeLisghtness, changeColor, changeFontSize} = useTheme();

  console.log(mode);
  useEffect(() => {
    document.querySelector("html").style.fontSize = fontSize;
  }, [fontSize]);

  return (
    <div className={styles.theme}>
      <h2>Customize your view</h2>
      <p className="text-gray">Manage your font size, color and background.</p>
      <div className={styles.fontSize}>
        <h4>Font Size</h4>
        <div className={styles.sizeContainer}>
          <h6>Aa</h6>
          <div className={`${styles.chooseFontSize} choose-size`}>
            {sizes.map((size) => {
              return (
                <span
                  onClick={() => changeFontSize(size)}
                  className={`${size === fontSize ? "active" : ""}`}
                ></span>
              );
            })}
          </div>
          <h3>Aa</h3>
        </div>
      </div>

      <div className={styles.color}>
        <h4>Color</h4>
        <div className={`${styles.chooseColor} choose-color`}>
          {colors.map((col, i) => {
            let colorObj = styles[`color${i + 1}`];
            return (
              <span
                onClick={() => changeColor(col)}
                className={`${colorObj} ${col === color ? "active" : ""}`}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.background}>
        <h4>Background</h4>
        <div className={`${styles.chooseBg} choose-bg`}>
          {bgClasses.map(({title,bg}) => {
            return (
              <div
                onClick={() => {
                  changeLisghtness(bg);
                }}
                className={`${styles[bg]} ${mode === bg ? "active" : ""}`}
              >
                {/* <span className={styles.circle}></span> */}
                <h5>{title}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
