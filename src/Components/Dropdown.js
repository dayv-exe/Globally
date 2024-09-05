import { useContext, useState } from "react";
import { useSelector } from "react-redux";

import regionImgLight from "../Images/light_region.png";
import regionImgDark from "../Images/dark_region.png";
import { regionContext } from "./Main";

const Dropdown = ({ defaultTxt = "Select", options = [] }) => {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  //const selectedTxt = useRef(defaultTxt);
  const region = useContext(regionContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={`drop-down-cont flex-cntr-cntr-column`}>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className={`drop-down flex-cntr-cntr-row ${isDark ? "light" : "dark"}-element`}
      >
        <img src={isDark ? regionImgLight : regionImgDark} alt="" />
        <p className="drop-down-txt overflow-txt">
          {!region.val ? defaultTxt : region.val}
        </p>
      </button>
      <div className="drop-down-opt-cont">
      {showDropdown && (
        <div className={`drop-down-opt flex-left-cntr-column ${isDark ? "light" : "dark"}-element`}>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                region.set(opt);
                setShowDropdown(false);
              }}
              className={`option overflow-txt ${isDark ? "light" : "dark"}-element`}
              title={opt}
            >
              {opt}
            </button>
          ))}
          <button
            onClick={() => {
              region.set("");
              setShowDropdown(false);
            }}
            title="All Regions"
            className={`option overflow-txt ${isDark ? "light" : "dark"}-element`}
          >
            All
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Dropdown;
