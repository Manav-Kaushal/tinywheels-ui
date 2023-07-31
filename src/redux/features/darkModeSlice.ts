import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode:
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("darkMode") as string)) ||
    false,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("darkMode", JSON.stringify(state.mode));
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
