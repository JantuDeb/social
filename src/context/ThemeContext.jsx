import { createContext, useContext, useState } from "react";
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState("16px");
  const [color, setColor] = useState(252);
  const [mode, setMode] = useState("bg1");

  const changeFontSize = (size) => {
    document.querySelector("html").style.fontSize = fontSize;
    setFontSize(size);
  };

  const changeColor = (color)=>{
    document
        .querySelector(":root")
        .style.setProperty("--color-primary-hue", color);
        setColor(color)
  }

  const changeLisghtness = (mode) => {
    let darkColorLightness; // = localStorage.getItem("darkColorLightness");
    let lightColorLightness; // = localStorage.getItem("lightColorLightness");
    let whiteColorLightness; //= localStorage.getItem("whiteColorLightness");
    if (mode === "bg1") {
      darkColorLightness = "17%";
      lightColorLightness = "95%";
      whiteColorLightness = "100%";
    } else if (mode === "bg2") {
      darkColorLightness = "95%";
      lightColorLightness = "15%";
      whiteColorLightness = "20%";
    } else {
      darkColorLightness = "95%";
      lightColorLightness = "0%";
      whiteColorLightness = "10%";
    }
    const root = document.querySelector(":root");
    root.style.setProperty("--light-color-lightness", lightColorLightness);
    root.style.setProperty("--dark-color-lightness", darkColorLightness);
    root.style.setProperty("--white-color-lightness", whiteColorLightness);
    setMode(mode);
  };
  return (
    <ThemeContext.Provider value={{ mode, changeLisghtness, fontSize, color, changeFontSize, changeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export { ThemeProvider };
