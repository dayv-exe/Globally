import { useSelector } from "react-redux";
import searchImgDark from "../Images/dark_search.png";
import searchImgLight from "../Images/light_search.png";

const Searchbar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  return (
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
        // value={searchFilter}
        // onChange={(e) => setSearchFilter(e.target.value)}
      />
    </div>
  );
};