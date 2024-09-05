import closeLight from "../Images/light_close_popup.png";
import closeDark from "../Images/dark_close_popup.png";
import { useSelector } from "react-redux";

const HelpPopUp = ({closePopUp}) => {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <div className={`help-popup flex-cntr-cntr-column ${theme}-element`}>
      <div
        className="top-help flex-cntr-space-between-row"
        style={{
          borderBottom: `.1rem solid ${
            theme === "dark"
              ? "var(--dark-element-bg-color)"
              : "var(--light-element-bg-color)"
          }`,
        }}
      >
        <p className="help-title">Info:</p>
        <button className="help-close-btn" onClick={closePopUp}>
          <img src={!isDark ? closeLight : closeDark} alt="" />
        </button>
      </div>
      <div className="bottom-help flex-cntr-cntr-column">
        <p>
          This site uses data provided by an API from{" "}
          <a href="https://restcountries.com/">REST Countries</a>. Please
          consider visiting their site and donating.
        </p>
      </div>
    </div>
  );
};

export default HelpPopUp;
