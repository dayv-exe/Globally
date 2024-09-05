import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountry } from "../redux/selectedCountrySlice";

const BorderCountry = ({ details, useMobileStyle = false }) => {
  // get country name and flag from country code
  const dispatch = useDispatch();

  return (
    <div
      className={`${
        useMobileStyle ? "border-country-mobile" : "border-country"
      }`}
      title={details.name}
      onClick={() => {
        dispatch(setCountry(details));
      }}
      style={{
        cursor: "pointer",
      }}
    >
      <img src={details.flag} alt="" />
      <p className="overflow-txt">{details.name}</p>
    </div>
  );
};

const BorderingCountries = ({ useMobileStyle = false }) => {
  const data = useSelector((state) => state.selectedCountry.allCountries);
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  const selectedDetails = useSelector((state) => state.selectedCountry.details);
  const [borderingCountriesList, setBorderingCountriesList] = useState([]);

  function getBorderCountriesDetails(code) {
    let index = data.findIndex((country) => country.alpha3Code === code);
    if (index < 0) return null;
    return data[index];
  }

  function setBorderCountries() {
    if (!selectedDetails.borders) return;

    let bc = [];
    selectedDetails.borders.forEach((countryCode) => {
      if (getBorderCountriesDetails(countryCode))
        bc.push(getBorderCountriesDetails(countryCode));
    });
    setBorderingCountriesList(bc);
  }

  useEffect(() => {
    if (!data || !selectedDetails) return;

    setBorderingCountriesList([]);
    setBorderCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDetails]);

  return (
    <>
      {borderingCountriesList && borderingCountriesList.length > 0 && (
        <div
          className={`${
            useMobileStyle ? "border-countries-mobile" : "border-countries"
          } country-detail ${
            isDark ? "light" : "dark"
          }-element flex-cntr-space-between-column`}
        >
          <div className="left-border">
            <p>Bordering Countries: </p>
          </div>

          <div className="right-border">
            {borderingCountriesList.map((country) => (
              <BorderCountry
                details={country}
                useMobileStyle={useMobileStyle}
                key={country.name}
              />
            ))}
          </div>
        </div>
      )}

      {useMobileStyle && borderingCountriesList && borderingCountriesList.length < 1 && (
        <p className={`${theme}-text thick-text center-cont-text`}>
          No bordering countries.
        </p>
      )}
    </>
  );
};

export default BorderingCountries;
