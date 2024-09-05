import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import pageReducer from "./pageSlice";
import favoritesReducer from "./favoritesSlice";
import selectedCountryReducer from "./selectedCountrySlice";

export default configureStore({
  reducer: {
    theme: themeReducer,
    page: pageReducer,
    favorites: favoritesReducer,
    selectedCountry: selectedCountryReducer,
  },
});
