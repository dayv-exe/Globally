import helpImgDark from "../Images/dark_help.png";
import helpImgLight from "../Images/light_help.png";
import { useSelector } from "react-redux";
import { separate } from "../Functions/separateNums";
import BorderingCountries from "./BorderingCountries";

const Detail = ({ title = "", info = "" }) => {
  return (
    <div className="d-cont flex-cntr-cntr-column">
      <p className="d-title  overflow-txt-height" title={title}>
        {title}
      </p>
      <p className="d-info  overflow-txt-height" title={info}>
        {info}
      </p>
    </div>
  );
};

const CountryDetails = ({ useMobileStyle, showBorders }) => {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  const activeLink = useSelector((state) => state.page.page.link);
  const LINKS = useSelector((state) => state.page.page.links);

  const details = useSelector((state) => state.selectedCountry.details);

  function convertToSeparatedWords(list = []) {
    // returns a string containing all the elements in an array separated by commas
    // for languages.name only!!!

    let modList = "";

    for (let i = 0; i < list.length; i++) {
      if (i === list.length - 1) {
        modList += list[i].name;
      } else {
        modList += list[i].name + ", ";
      }
    }

    return modList;
  }

  function convertCallingCodesToSeparateWords(list = []) {
    let modList = "";

    for (let i = 0; i < list.length; i++) {
      if (i === list.length - 1) {
        modList += "+" + list[i];
      } else {
        modList += "+" + list[i] + ", ";
      }
    }

    return modList;
  }

  function correctWord() {
    if (activeLink === LINKS[0]) return "a country";
    if (activeLink === LINKS[1]) return "a river";
    if (activeLink === LINKS[2]) return "a peak";
    if (activeLink === LINKS[3]) return "a world wonder";
  }

  // capital, pop, region, official name, currency, languages, border, dialing code

  const langs = convertToSeparatedWords(details.languages);
  const currencies = convertToSeparatedWords(details.currencies);
  const dialingCodes = convertCallingCodesToSeparateWords(details.callingCodes);

  return (
    <>
      {details.name && (
        <div
          className={`${
            useMobileStyle ? "country-detail-mobile" : "country-detail"
          } flex-cntr-cntr-row ${isDark ? "light" : "dark"}-element`}
        >
          {(!showBorders || !useMobileStyle) && (
            <>
              <div className="details-left flex-cntr-cntr-column">
                <img
                  src={details.flags.svg}
                  alt=""
                  className={`${
                    useMobileStyle ? "country-flag-mobile" : "country-flag"
                  }`}
                />
                <p
                  className="country-name overflow-txt-height"
                  title={details.name}
                >
                  {details.name}
                </p>
              </div>
              <div className="details-right flex-start-cntr-row">
                <div className="details-cont">
                  <Detail title="Capital" info={details.capital || "-"} />
                  <Detail
                    title="Population"
                    info={separate(details.population) || "-"}
                  />
                  <Detail title="Region" info={details.region || "-"} />
                  <Detail title="Dialing Codes" info={dialingCodes || "-"} />
                  <Detail title="Currency" info={currencies || "-"} />
                  <Detail title="Languages" info={langs || "-"} />
                  <Detail
                    title="Native Name"
                    info={details.nativeName || "-"}
                  />
                  <Detail
                    title="Subregion"
                    info={details.subregion || "-"}
                  />
                </div>
              </div>
            </>
          )}

          {showBorders && useMobileStyle && (
            <BorderingCountries useMobileStyle={useMobileStyle} />
          )}

          {!useMobileStyle && (
            <div className="d-opt flex-cntr-cntr-row">
              <button
                className="help"
                title="This site uses data from REST Countries API. Please consider visiting their site and donating."
              >
                <img src={isDark ? helpImgLight : helpImgDark} alt="" />
              </button>
            </div>
          )}
        </div>
      )}

      {!details.name && (
        <p
          className={`select-country-prompt overflow-txt ${theme}-text`}
        >{`Select ${correctWord()} to learn more.`}</p>
      )}
    </>
  );
};

export default CountryDetails;
