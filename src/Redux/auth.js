import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
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

      state.isLoggedIn = true;
      state.token = data.idToken;
      state.userId = data.localId;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
    },
    signUp(state, action) {
      const { enteredEmail, enteredPassword } = action.payload;

      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQGXF7XQ8qN-fY8qT8f7SuuJiwrIRZjsY`,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("User has successfully signed up", data);

          state.isLoggedIn = false;
          state.token = null;
          state.userId = null;
        });
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
