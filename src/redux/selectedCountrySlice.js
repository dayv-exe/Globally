import { createSlice } from "@reduxjs/toolkit";

export const selectedCountrySlice = createSlice({
  name: "selectedCountry",
  initialState: {
    details: {},
    allCountries: [],
  },
  reducers: {
    setCountry: (state, action) => {
      state.details = action.payload;
    },
    setAllCountries: (state, action) => {
      state.allCountries = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCountry, setAllCountries } = selectedCountrySlice.actions;

export default selectedCountrySlice.reducer;
