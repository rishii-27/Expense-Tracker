import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    toggleTheme: (state) => {
      return state === "light" ? "dark" : "light";
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
