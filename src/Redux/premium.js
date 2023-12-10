import { createSlice } from "@reduxjs/toolkit";

const premium = createSlice({
  name: "user",
  initialState: {
    isPremium: false,
  },
  reducers: {
    updateUserPremiumStatus: (state, action) => {
      state.isPremium = action.payload;
    },
  },
});

export const premiumActions = premium.actions;
export default premium.reducer;
