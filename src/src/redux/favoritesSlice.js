import { createSlice } from "@reduxjs/toolkit";

function getFavorites() {
  if (JSON.parse(window.localStorage.getItem("favorites"))) {
    return JSON.parse(window.localStorage.getItem("favorites"));
  } else {
    return [];
  }
}

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    countries: getFavorites(),
  },
  reducers: {
    toggleFavorites: (state, action) => {
      const favs = state.countries;

      if (favs.includes(action.payload)) {
        // if the country already exists as favorite, remove

        let _temp = [];
        favs.forEach((country) => {
          if (country === action.payload) return;
          _temp.push(country);
        });

        state.countries = _temp;
      } else {
        // if the country does not exist as favorite, add

        state.countries = [...favs, action.payload];
      }

      window.localStorage.setItem("favorites", JSON.stringify(state.countries));
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
