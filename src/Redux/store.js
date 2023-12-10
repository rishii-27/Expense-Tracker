import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import expensesReducer from "./expenses";
import themeReducer from "./theme";
import premiumReducer from "./premium";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    theme: themeReducer,
    isPremium: premiumReducer,
  },
});

export default store;
