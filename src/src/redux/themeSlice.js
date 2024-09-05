import { createSlice } from "@reduxjs/toolkit";

function getTheme() {
  if (JSON.parse(window.localStorage.getItem("theme"))) {
    return JSON.parse(window.localStorage.getItem("theme"));
  } else {
    return "light";
  }
}

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: getTheme(),
  },
  reducers: {
    setThemeTo: (state, action) => {
      state.theme = action.payload;
      window.localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { setThemeTo } = themeSlice.actions;

export default themeSlice.reducer;
