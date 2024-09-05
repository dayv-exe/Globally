import { useDispatch, useSelector } from "react-redux";
import { setActiveLink } from "../redux/pageSlice";
import BorderingCountries from "./BorderingCountries";
import CountryDetails from "./CountryDetails";

const Aside = () => {
  const theme = useSelector((state) => state.theme.theme);
  const activeLink = useSelector((state) => state.page.page.link);
  const LINKS = useSelector((state) => state.page.page.links);
  const dispatch = useDispatch();

  function mouseEnterFunc(targetElement) {
    // add link-hover to classlist

    if (
      targetElement.classList.contains("active-light") ||
      targetElement.classList.contains("active-dark")
    )
      return;
    targetElement.classList.add(`link-hover-${theme}`);
  }

  function mouseLeaveFunc(targetElement) {
    // remove link-hover from classlist

    if (targetElement.classList.contains("link-hover-light")) {
      targetElement.classList.remove("link-hover-light");
    } else if (targetElement.classList.contains("link-hover-dark")) {
      targetElement.classList.remove("link-hover-dark");
    }
  }

  return (
    <aside className="top-div">
      {/* <nav className="flex-cntr-end-row">
        <button
          className={`desktop-nav ${theme}-text ${
            activeLink === LINKS[0] ? `active-${theme}` : ""
          }`}
          onMouseEnter={(e) => {
            mouseEnterFunc(e.target);
          }}
          onMouseLeave={(e) => {
            mouseLeaveFunc(e.target);
          }}
          onClick={() => {
            dispatch(setActiveLink(0));
          }}
        >
          Countries
        </button>
        <button
          className={`desktop-nav ${theme}-text ${
            activeLink === LINKS[1] ? `active-${theme}` : ""
          }`}
          onMouseEnter={(e) => {
            mouseEnterFunc(e.target);
          }}
          onMouseLeave={(e) => {
            mouseLeaveFunc(e.target);
          }}
          onClick={() => {
            dispatch(setActiveLink(1));
          }}
        >
          Rivers
        </button>
        <button
          className={`desktop-nav ${theme}-text ${
            activeLink === LINKS[2] ? `active-${theme}` : ""
          }`}
          onMouseEnter={(e) => {
            mouseEnterFunc(e.target);
          }}
          onMouseLeave={(e) => {
            mouseLeaveFunc(e.target);
          }}
          onClick={() => {
            dispatch(setActiveLink(2));
          }}
        >
          Peaks
        </button>
        <button
          className={`desktop-nav ${theme}-text ${
            activeLink === LINKS[3] ? `active-${theme}` : ""
          }`}
          onMouseEnter={(e) => {
            mouseEnterFunc(e.target);
          }}
          onMouseLeave={(e) => {
            mouseLeaveFunc(e.target);
          }}
          onClick={() => {
            dispatch(setActiveLink(3));
          }}
        >
          Wonders
        </button>
      </nav> */}
      <div className="country-details">
        <CountryDetails />
        <BorderingCountries />
        
      </div>
    </aside>
  );
};

export default Aside;
