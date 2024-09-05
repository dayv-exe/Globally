import rightArrow from "../Images/light_right.png";
import favoriteImgLight from "../Images/light_fav.png";
import favoriteImgSelected from "../Images/favorite_selected.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorites } from "../redux/favoritesSlice";
import { setCountry } from "../redux/selectedCountrySlice";
import { separate } from "../Functions/separateNums";

const Country = ({ componentType, componentDetails }) => {
  const theme = useSelector((state) => state.theme.theme);
  const favorites = useSelector((state) => state.favorites.countries);
  const isDark = theme === "dark";

  const dispatch = useDispatch();
  const checkFavorite = () =>
    favorites.includes(componentDetails.name) && favorites.length > 0;
  const isFavorite = checkFavorite();

  return (
    <div
      className={`country flex-cntr-cntr-column ${
        isDark ? "country-bg-dark" : "country-bg-light"
      }`}
      onClick={() => {
        dispatch(setCountry(componentDetails));
      }}
      style={{
        backgroundImage: `url(${componentDetails.flags.svg})`,
        border: `.1rem solid ${
          !isDark
            ? "var(--dark-element-bg-color)"
            : "var(--light-element-bg-color)"
        }`,
      }}
    >
      <div className="c-top flex-top-space-between-row">
        <div className="flag-cont flex-cntr-cntr-row">
          {/* <img loading="lazy" src={componentDetails.flags.sv} alt="flag" /> */}
          <p
            className="country-code overflow-txt darkened-bg"
            title={`Country code`}
          >
            {componentDetails.alpha3Code}
          </p>
        </div>

        <button className="more-info" title={`More info`}>
          <img className="darkened-bg" src={rightArrow} alt="more" />
        </button>
      </div>
      <div className="c-cntr flex-cntr-cntr-column">
        <p
          className="country-name overflow-txt darkened-bg-black"
          title={`${componentDetails.name}`}
        >
          {componentDetails.name}
        </p>
        {componentDetails.capital && (
          <p
            className="country-capital overflow-txt darkened-bg-black"
            title={`Capital city: ${componentDetails.capital}`}
          >
            {componentDetails.capital}
          </p>
        )}
      </div>
      <div className="c-bottom flex-bottom-space-between-row">
        <p
          className="country-population overflow-txt darkened-bg"
          title={`Population`}
        >{`Pop:  ${separate(componentDetails.population)}`}</p>
        <img
          className="darkened-bg"
          title={`${isFavorite ? "Remove from favorites" : "Add to favorites"}`}
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(toggleFavorites(componentDetails.name))}
          src={isFavorite ? favoriteImgSelected : favoriteImgLight}
          alt={`${isFavorite ? "remove from favorites" : "add to favorites"}`}
        />
      </div>
    </div>
  );
};

export default Country;
