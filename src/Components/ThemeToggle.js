import lightMoon from "../Images/light_moon.png";
import lightSun from "../Images/light_sun.png";
import darkMoon from "../Images/dark_moon.png";
import darkSun from "../Images/dark_sun.png";
import { useDispatch, useSelector } from "react-redux";
import { setThemeTo } from "../redux/themeSlice";

const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  const dispatch = useDispatch();

  return (
    <div className="toggle-cont flex-cntr-cntr-row">
      <img className="theme-toggle-img" src={!isDark ? darkSun : lightSun} alt="light" />
      <div className={`center flex-cntr-cntr-row`}>
        <input
          type="checkbox"
          checked={theme === "dark"}
          className={`theme-toggle`}
          onChange={() => {
            const toggle = document.getElementsByClassName("theme-toggle")[0];
            if (toggle.checked) {
              dispatch(setThemeTo("dark"));
              return;
            }

            dispatch(setThemeTo("light"));
          }}
        />
      </div>
      <img className="theme-toggle-img" src={!isDark ? darkMoon : lightMoon} alt="dark" />
    </div>
  );
};

export default ThemeToggle;
