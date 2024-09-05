import { useContext } from "react";
import favImgLight from "../Images/light_fav.png";
import favImgDark from "../Images/dark_fav.png";
import { useSelector } from "react-redux";
import { favContext } from "./Main";

const FavCheckbox = () => {
  const favorites = useContext(favContext);
  const theme = useSelector(state => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <button onClick={() => favorites.set(prev => !prev)} className={`favorites drop-down-cont drop-down flex-cntr-cntr-row ${isDark ? "light" : "dark"}-element${favorites.val ? " favorites-selected" : ""}`} title={favorites.val ? "Show all countries" : "Show favorite countries"}>
      <img src={isDark ? favImgLight : favImgDark} alt="" />
      <p className="overflow-txt">Favorites</p>
    </button>
  );
}
 
export default FavCheckbox;