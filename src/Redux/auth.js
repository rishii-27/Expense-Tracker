import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  email: localStorage.getItem("user"),
  isLoggedIn: false,
  token: null,
  userId: null,
};

console.log(initialAuthState);

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      // Assuming you have access to enteredEmail and enteredPassword in your action payload
      const { data } = action.payload;

      const cleanEmail = data.email.replace("@", "").replace(".", "");

      localStorage.setItem("user", cleanEmail);
      state.isLoggedIn = true;
      state.token = data.idToken;
      state.userId = data.localId;
    },
    logout(state) {
      localStorage.removeItem("user");

      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
    },
    signUp(state, action) {
      const { enteredEmail, enteredPassword } = action.payload;

      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
