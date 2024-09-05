import { createSlice } from "@reduxjs/toolkit";
const LINKS = ["countries", "rivers", "peaks", "wonders", "blank"];
const FETCH_URLS = [
  "https://restcountries.com/v2/all",
  "ldb-river",
  "ldb-peaks",
  "ldb-wonders",
  "blank",
];

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    page: { link: LINKS[0], links: LINKS, fetchUrl: FETCH_URLS[0] },
  },
  reducers: {
    setActiveLink: (state, action) => {
      state.page.link = LINKS[action.payload];
      state.page.fetchUrl = FETCH_URLS[action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActiveLink } = pageSlice.actions;

export default pageSlice.reducer;
