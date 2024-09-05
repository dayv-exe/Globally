import { useDispatch, useSelector } from "react-redux";
import Country from "./Country";
import Dropdown from "./Dropdown";
import FavCheckbox from "./FavCheckbox";
import ThemeToggle from "./ThemeToggle";
import searchImgLight from "../Images/light_search.png";
import searchImgDark from "../Images/dark_search.png";
import scrollToTopImg from "../Images/light_scroll_to_top.png";
import helpImgDark from "../Images/dark_help.png";
import helpImgLight from "../Images/light_help.png";
import lightHideDesc from "../Images/light_hide_description.png";
import darkHideDesc from "../Images/dark_hide_description.png";

// #region MOBILE NAV IMG

// import countriesDark from "../Images/nav/dark_countries.png";
// import riversDark from "../Images/nav/dark_rivers.png";
// import peaksDark from "../Images/nav/dark_peak.png";
// import wondersDark from "../Images/nav/dark_wonders.png";

// import countriesLight from "../Images/nav/light_countries.png";
// import riversLight from "../Images/nav/light_rivers.png";
// import peaksLight from "../Images/nav/light_peak.png";
// import wondersLight from "../Images/nav/light_wonders.png";
// import { setActiveLink } from "../redux/pageSlice";
import useFetch from "../hooks/useFetch";
import { createContext, useEffect, useState } from "react";
import { setAllCountries, setCountry } from "../redux/selectedCountrySlice";
import CountryDetails from "./CountryDetails";

// #endregion

export const regionContext = createContext();
export const favContext = createContext();

const Main = () => {
  const fetchUrl = useSelector((state) => state.page.page.fetchUrl);
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Polar"];

  const details = useSelector((state) => state.selectedCountry.details);

  const activeLink = useSelector((state) => state.page.page.link);
  const LINKS = useSelector((state) => state.page.page.links);
  const dispatch = useDispatch();

  const { data, isPending, error, refresh } = useFetch(fetchUrl, true);
  const [curData, setCurData] = useState();
  const favorites = useSelector((state) => state.favorites.countries);
  const selectedDetails = useSelector((state) => state.selectedCountry.details);

  const [regionFilter, setRegionFilter] = useState();
  const [favFilter, setFavFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const regionContextVal = { val: regionFilter, set: setRegionFilter };
  const favoriteContextVal = { val: favFilter, set: setFavFilter };

  const [showBorders, setShowBorders] = useState(() => false);

  function correctWord() {
    if (activeLink === LINKS[0]) return "countries";
    if (activeLink === LINKS[1]) return "rivers";
    if (activeLink === LINKS[2]) return "peaks";
    if (activeLink === LINKS[3]) return "worlds' wonders";
  }

  function arrayObjsIncludes(list = [], searchStr) {
    let verdict = false;
    list.forEach((obj) => {
      if (obj.toLowerCase().includes(searchStr)) verdict = true;
    });

    return verdict;
  }

  function languagesIncludes(list = [], searchStr) {
    let verdict = false;
    list.forEach((lang) => {
      if (lang.name.toLowerCase().includes(searchStr)) verdict = true;
    });

    return verdict;
  }

  function filterCountries(country) {
    const searchStr = searchFilter.toLowerCase();

    const searchConditions = searchFilter
      ? (country.name && country.name.toLowerCase().includes(searchStr)) ||
        (country.alpha3Code &&
          country.alpha3Code.toLowerCase().includes(searchStr)) ||
        (country.capital &&
          country.capital.toLowerCase().includes(searchStr)) ||
        (country.subregion &&
          country.subregion.toLowerCase().includes(searchStr)) ||
        (country.region && country.region.toLowerCase().includes(searchStr)) ||
        (country.demonym &&
          country.demonym.toLowerCase().includes(searchStr)) ||
        (country.languages &&
          country.languages.length > 0 &&
          languagesIncludes(country.languages, searchStr)) ||
        (country.altSpellings &&
          country.altSpellings.length > 0 &&
          arrayObjsIncludes(country.altSpellings, searchStr))
      : true;

    const regionConditions = regionFilter
      ? country.region &&
        country.region.toLowerCase() === regionFilter.toLowerCase()
      : true;

    const favConditions = favFilter ? favorites.includes(country.name) : true;

    const conditions = searchConditions && regionConditions && favConditions;
    return conditions;
  }

  function scrollToTop() {
    const m = document.getElementsByClassName("countries-cont")[0];
    if (!m) return;
    m.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    if (!data) {
      setCurData(null);
      return;
    }

    dispatch(setAllCountries(data));

    setCurData(data.filter((country) => filterCountries(country)));
    dispatch(setCountry({}));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchFilter, regionFilter, favFilter]);

  useEffect(() => {
    setShowBorders(false);
  }, [selectedDetails]);

  useEffect(() => {
    dispatch(setCountry({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLink]);

  return (
    <main className="top-div main-div">
      <header className="flex-cntr-space-between-row">
        <a href="/" className={`site-title ${theme}-text overflow-txt`}>
          globally
        </a>
        <ThemeToggle />
      </header>

      <div className="filters-cont">
        <div
          className={`search-bar ${
            isDark ? "light" : "dark"
          }-element flex-cntr-start-row`}
          title="Search for countries by name, capital, code, region, demonym, and languages."
        >
          <img src={!isDark ? searchImgDark : searchImgLight} alt="search" />
          <input
            type="search"
            className={`search-txt ${theme}-text overflow-txt`}
            placeholder="Search"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
        <div className="region-fav flex-cntr-space-between-row">
          <regionContext.Provider value={regionContextVal}>
            <Dropdown defaultTxt="Region" options={REGIONS} />
          </regionContext.Provider>
          <favContext.Provider value={favoriteContextVal}>
            <FavCheckbox />
          </favContext.Provider>
        </div>
        {(regionFilter || favFilter || searchFilter) && (
          <div className="clear-all-filters-cont">
            <button
              className={`clear-all-filters ${theme}-text`}
              onClick={() => {
                setRegionFilter();
                setFavFilter(false);
                setSearchFilter("");
                scrollToTop();
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      <div
        className="countries-cont"
        onScroll={() => {
          const sttBtn = document.getElementsByClassName("scroll-to-top")[0];
          const m = document.getElementsByClassName("countries-cont")[0];

          if (m.scrollTop < 1) {
            if (sttBtn.classList.contains("stt-enter"))
              sttBtn.classList.remove("stt-enter");

            if (!sttBtn.classList.contains("stt-exit"))
              sttBtn.classList.add("stt-exit");
          } else {
            if (!sttBtn.classList.contains("stt-enter"))
              sttBtn.classList.add("stt-enter");

            if (sttBtn.classList.contains("stt-exit"))
              sttBtn.classList.remove("stt-exit");
          }
        }}
      >
        {curData &&
          curData.map((c) => (
            <Country
              componentType={"countries"}
              componentDetails={c}
              key={c.name}
            />
          ))}
        {error && (
          <div className="flex-cntr-cntr-column fetch-status-cont">
            <p
              className={`fetch-status-txt ${theme}-text`}
            >{`Failed to load ${correctWord()}.`}</p>

            <button
              className="basic-btn"
              onClick={() => {
                // window.location.reload();
                refresh();
              }}
            >
              Retry
            </button>
          </div>
        )}
        {data && curData && curData.length < 1 && (
          <p className={`fetch-status-txt ${theme}-text`}>No results.</p>
        )}
        {isPending && (
          <p className={`fetch-status-txt ${theme}-text`}>Loading...</p>
        )}
      </div>

      {/* <div
        className={`mobile-nav ${
          isDark ? "light" : "dark"
        }-element flex-cntr-cntr-column`}
      >
        <div className={`nav flex-cntr-space-between-row`}>
          <button
            className={`mobile-nav-btn ${
              activeLink === LINKS[0] ? `active-mobile-${theme}` : ""
            }`}
            onClick={() => {
              dispatch(setActiveLink(0));
            }}
          >
            <p className={`${theme}-text`}>Countries</p>
            <img src={isDark ? countriesLight : countriesDark} alt="" />
          </button>

          <button
            className={`mobile-nav-btn ${
              activeLink === LINKS[1] ? `active-mobile-${theme}` : ""
            }`}
            onClick={() => {
              dispatch(setActiveLink(1));
            }}
          >
            <p className={`${theme}-text`}>Rivers</p>
            <img src={isDark ? riversLight : riversDark} alt="" />
          </button>
          <button
            className={`mobile-nav-btn ${
              activeLink === LINKS[2] ? `active-mobile-${theme}` : ""
            }`}
            onClick={() => {
              dispatch(setActiveLink(2));
            }}
          >
            <p className={`${theme}-text`}>Peaks</p>
            <img src={isDark ? peaksLight : peaksDark} alt="" />
          </button>
          <button
            className={`mobile-nav-btn ${
              activeLink === LINKS[3] ? `active-mobile-${theme}` : ""
            }`}
            onClick={() => {
              dispatch(setActiveLink(3));
            }}
          >
            <p className={`${theme}-text`}>Wonders</p>
            <img src={isDark ? wondersLight : wondersDark} alt="" />
          </button>
        </div>
      </div> */}

      {details && details.name && (
        <div
          className={`mobile-country-details flex-cntr-cntr-column ${theme}-background`}
        >
          <div className="flex-cntr-space-between-row mobile-opt">
            <button
              className="hide-mobile-details"
              onClick={() => {
                dispatch(setCountry({}));
              }}
            >
              <img src={isDark ? lightHideDesc : darkHideDesc} alt="" />
            </button>

            <button
              className="help"
              title="This site uses data from REST Countries API. Please consider visiting their site and donating."
            >
              <img src={isDark ? helpImgLight : helpImgDark} alt="" />
            </button>
          </div>
          <CountryDetails useMobileStyle showBorders={showBorders} />

          <button
            className={`view-details-toggle ${theme}-element`}
            onClick={() => {
              setShowBorders((prev) => !prev);
            }}
          >
            {showBorders ? "Country Details" : "Bordering Countries"}
          </button>
        </div>
      )}

      <button
        className={`scroll-to-top flex-cntr-cntr-column stt-exit`}
        onClick={() => {
          scrollToTop();
        }}
      >
        <img src={scrollToTopImg} alt="scroll to top" />
      </button>
    </main>
  );
};

export default Main;
