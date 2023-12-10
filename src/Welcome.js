import React from "react";
import { Link } from "react-router-dom";
import ExpenseTracker from "./ExpenseTracker";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "./Redux/theme";
import { authActions } from "./Redux/auth";
import { expensesAction } from "./Redux/expenses";
// import "./welcome.css";

const Welcome = () => {
  const dispatch = useDispatch();

  // As initialState is "light". So we are using state.theme in useSelector.
  // If it would be like initialState :{ theme: "light" } then we will be using state.theme.theme in useSelector.

  const theme = useSelector((state) => state.theme);
  const isPremium = useSelector((state) => state.isPremium.isPremium);

  console.log(theme);

  const verifyEmailHandle = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBQGXF7XQ8qN-fY8qT8f7SuuJiwrIRZjsY`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("token"),
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const logoutHandle = () => {
    dispatch(authActions.logout());
    dispatch(expensesAction.removeExpense());
  };

  const toggleThemeHandle = () => {
    dispatch(themeActions.toggleTheme());
  };
  return (
    <div className={`mt-2 ${theme === "dark" ? "bg-secondary" : ""}`}>
      <div className="d-flex justify-content-end mb-2">
        {isPremium && (
          <div style={{ marginRight: "10px" }}>
            <button className="btn btn-dark" onClick={toggleThemeHandle}>
              Toggle Theme
            </button>
          </div>
        )}
        <Link to="/logout" className="btn btn-dark" onClick={logoutHandle}>
          Logout
        </Link>
      </div>

      <div className="row">
        <div className="col-md-9">
          <h4>Welcome to Expense Tracker</h4>
        </div>
        <div className="col-md-3 text-right">
          <span>
            Your profile is Incomplete <br />
            <span>
              <Link to="/complete">Complete Now</Link>
            </span>
          </span>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={verifyEmailHandle}
      >
        Verify Email
      </button>
      <div className="mt-5">
        <ExpenseTracker />
      </div>
    </div>
  );
};

export default Welcome;
